import { db } from "../db";

export async function getCourses(params?: {
  category?: string;
  level?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (params?.status) {
    where.status = params.status;
  } else {
    where.status = "PUBLISHED";
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

  const [courses, total] = await Promise.all([
    db.course.findMany({
      where,
      include: {
        category: true,
        modules: {
          select: {
            id: true,
            lessons: {
              where: { status: "PUBLISHED" },
              select: { id: true },
            },
          },
        },
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.course.count({ where }),
  ]);

  return {
    courses: courses.map((course) => ({
      ...course,
      lessonCount: course.modules.reduce(
        (acc, m) => acc + m.lessons.length,
        0
      ),
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

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
