import { db } from "../db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

export type CourseQueryParams = {
  category?: string;
  level?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export async function getCourses(params?: CourseQueryParams) {
  const rawPage = params?.page ?? 1;
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;
  const limit = params?.limit || 12;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  // No status filter = all statuses (used by the admin list, which must see
  // drafts to publish them). Student-facing callers pass "PUBLISHED"
  // explicitly.
  if (params?.status) {
    where.status = params.status;
  }

  if (params?.category) {
    where.category = { slug: params.category };
  }

  if (params?.level) {
    where.level = params.level;
  }

  if (params?.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
    ];
  }

  // Fetch the page and the total in parallel. Avoid nesting `modules -> lessons`
  // in the include: Prisma resolves each nested level with a separate sequential
  // round-trip to the database (one query per level), which is very slow on a
  // remote Neon connection. Instead count published lessons in a single
  // aggregate query keyed by courseId.
  const [courses, total] = await Promise.all([
    db.course.findMany({
      where,
      include: {
        category: true,
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.course.count({ where }),
  ]);

  const lessonCountById = new Map<string, number>();
  if (courses.length > 0) {
    const rows = await db.$queryRaw<
      Array<{ courseId: string; lessonCount: number }>
    >`
      SELECT m."courseId" AS "courseId", COUNT(l.id)::int AS "lessonCount"
      FROM "Lesson" l
      INNER JOIN "Module" m ON m."id" = l."moduleId"
      WHERE l."status" = 'PUBLISHED'
        AND m."courseId" IN (${Prisma.join(courses.map((c) => c.id))})
      GROUP BY m."courseId"
    `;
    for (const row of rows) lessonCountById.set(row.courseId, row.lessonCount);
  }

  return {
    courses: courses.map((course) => ({
      ...course,
      lessonCount: lessonCountById.get(course.id) ?? 0,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Cached catalog listing for student-facing pages. The course catalog is
 * identical for every visitor, so it can live in Next's data cache instead of
 * hitting the remote Neon database on every request. Revalidates at most every
 * 60 seconds; tag is "course-catalog" for on-demand invalidation from admin
 * mutations. Admin pages should keep using the uncached `getCourses`.
 */
export const getCourseCatalog = (params?: CourseQueryParams) =>
  unstable_cache(
    async () =>
      getCourses({
        ...params,
        status: params?.status ?? "PUBLISHED",
      }),
    ["course-catalog", JSON.stringify(params ?? {})],
    { revalidate: 60, tags: ["course-catalog"] }
  )();

/**
 * Cached category list for the catalog filter bar (changes rarely).
 */
export const getCourseCategories = () =>
  unstable_cache(
    async () => getCategories(),
    ["course-categories"],
    { revalidate: 300, tags: ["course-categories"] }
  )();

export async function getCourseBySlug(slug: string) {
  return db.course.findUnique({
    where: { slug },
    include: {
      category: true,
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { status: "PUBLISHED" },
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              slug: true,
              estimatedMinutes: true,
              order: true,
              exercises: { select: { id: true } },
              quizzes: { select: { id: true } },
            },
          },
        },
      },
    },
  });
}

export async function getCourseById(id: string) {
  return db.course.findUnique({
    where: { id },
    include: {
      category: true,
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              exercises: true,
              quizzes: true,
            },
          },
        },
      },
    },
  });
}

export async function enrollCourse(userId: string, courseId: string) {
  // Check if already enrolled
  const existing = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (existing) {
    return { error: "Already enrolled" };
  }

  const enrollment = await db.enrollment.create({
    data: {
      userId,
      courseId,
      status: "ACTIVE",
    },
  });

  // Update stats
  await db.userStats.upsert({
    where: { userId },
    create: { userId, coursesEnrolled: 1 },
    update: { coursesEnrolled: { increment: 1 } },
  });

  return { enrollment };
}

export async function getCourseProgress(userId: string, courseId: string) {
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  if (!enrollment) return null;

  // Get total lessons count using _count
  const totalLessons = await db.lesson.count({
    where: {
      module: { courseId },
      status: "PUBLISHED",
    },
  });

  // Get completed lessons count
  const completedLessons = await db.lessonProgress.count({
    where: {
      userId,
      lesson: { module: { courseId } },
      status: "COMPLETED",
    },
  });

  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  // Update enrollment progress
  if (enrollment.progress !== progress) {
    await db.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress,
        lastAccessedAt: new Date(),
        ...(progress === 100 ? { completedAt: new Date() } : {}),
      },
    });
  }

  return {
    ...enrollment,
    progress,
    totalLessons,
    completedLessons,
  };
}

export async function getUserEnrollments(userId: string) {
  return db.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          category: true,
          modules: {
            include: {
              lessons: { where: { status: "PUBLISHED" } },
            },
          },
        },
      },
    },
    orderBy: { lastAccessedAt: "desc" },
  });
}

export async function getCategories() {
  return db.courseCategory.findMany({
    include: {
      _count: { select: { courses: true } },
    },
    orderBy: { name: "asc" },
  });
}
