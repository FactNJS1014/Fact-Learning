import { db } from "../db";
import { unstable_cache } from "next/cache";

/**
 * Lesson content (title, markdown, module, siblings, exercises, quizzes) is
 * identical for every user, so it lives in Next's data cache and skips the
 * remote Neon database on repeat views. Avoid nested `include`s — Prisma
 * resolves each nesting level as a separate sequential round-trip — so the
 * pieces are fetched in parallel instead. Revalidates at most every 60s;
 * tag "lesson-content" for on-demand invalidation from admin mutations.
 */
export const getLessonContent = unstable_cache(
  async (id: string) => {
    const [lesson, exercises, quizzes] = await Promise.all([
      db.lesson.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          videoUrl: true,
          order: true,
          estimatedMinutes: true,
          moduleId: true,
          module: {
            select: {
              id: true,
              title: true,
              courseId: true,
              course: { select: { slug: true, title: true } },
            },
          },
        },
      }),
      db.exercise.findMany({
        where: { lessonId: id },
        orderBy: { order: "asc" },
        select: { id: true, title: true, description: true, points: true },
      }),
      db.quiz.findMany({
        where: { lessonId: id },
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          title: true,
          _count: { select: { questions: true } },
        },
      }),
    ]);

    if (!lesson) return null;

    // Sibling lessons (sidebar + prev/next) depend on the module id, so they
    // run after the parallel batch above — two short trips instead of ~6.
    const lessons = await db.lesson.findMany({
      where: { moduleId: lesson.moduleId, status: "PUBLISHED" },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        order: true,
        estimatedMinutes: true,
      },
    });

    return {
      ...lesson,
      exercises,
      quizzes: quizzes.map((q) => ({
        id: q.id,
        title: q.title,
        questionCount: q._count.questions,
      })),
      module: { ...lesson.module, lessons },
    };
  },
  ["lesson-content"],
  { revalidate: 60, tags: ["lesson-content"] }
);

export async function getLessonProgress(userId: string, lessonId: string) {
  return db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });
}

/**
 * Single-upsert "view" record: creates an IN_PROGRESS row on first visit and
 * bumps lastAccessedAt afterwards. One query, safe to call on every lesson
 * render.
 */
export async function recordLessonView(userId: string, lessonId: string) {
  return db.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: {
      userId,
      lessonId,
      status: "IN_PROGRESS",
      startedAt: new Date(),
      lastAccessedAt: new Date(),
    },
    update: { lastAccessedAt: new Date() },
  });
}

export async function markLessonComplete(userId: string, lessonId: string) {
  const existing = await db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  if (existing?.status === "COMPLETED") {
    return { progress: existing };
  }

  const progress = await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: {
      userId,
      lessonId,
      status: "COMPLETED",
      progress: 100,
      startedAt: new Date(),
      completedAt: new Date(),
      lastAccessedAt: new Date(),
    },
    update: {
      status: "COMPLETED",
      progress: 100,
      completedAt: new Date(),
      lastAccessedAt: new Date(),
    },
  });

  // Award XP
  await db.user.update({
    where: { id: userId },
    data: {
      xp: { increment: 10 },
      lastStudiedAt: new Date(),
    },
  });

  // Update user stats
  await db.userStats.upsert({
    where: { userId },
    create: { userId, lessonsCompleted: 1 },
    update: { lessonsCompleted: { increment: 1 } },
  });

  // Check course progress for completion
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });

  if (lesson) {
    const courseId = lesson.module.courseId;
    const courseLessons = await db.lesson.findMany({
      where: {
        module: { courseId },
        status: "PUBLISHED",
      },
    });

    const completedCount = await db.lessonProgress.count({
      where: {
        userId,
        lessonId: { in: courseLessons.map((l) => l.id) },
        status: "COMPLETED",
      },
    });

    const totalLessons = courseLessons.length;
    const progressPercent =
      totalLessons > 0
        ? Math.round((completedCount / totalLessons) * 100)
        : 0;

    // Update enrollment
    await db.enrollment.updateMany({
      where: { userId, courseId },
      data: {
        progress: progressPercent,
        lastAccessedAt: new Date(),
        ...(progressPercent === 100 ? { completedAt: new Date() } : {}),
      },
    });

    if (progressPercent === 100) {
      // Award course completion XP
      await db.user.update({
        where: { id: userId },
        data: { xp: { increment: 100 } },
      });

      await db.userStats.upsert({
        where: { userId },
        create: { userId, coursesCompleted: 1 },
        update: { coursesCompleted: { increment: 1 } },
      });
    }
  }

  return { progress };
}

export async function updateStreak(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const now = new Date();
  const lastStudied = user.lastStudiedAt;

  if (!lastStudied) {
    await db.user.update({
      where: { id: userId },
      data: { currentStreak: 1, longestStreak: 1, lastStudiedAt: now },
    });
    return;
  }

  const diffMs = now.getTime() - lastStudied.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 1) {
    const newStreak = user.currentStreak + 1;
    const newLongest = Math.max(newStreak, user.longestStreak);
    await db.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastStudiedAt: now,
      },
    });
  } else if (diffDays > 1) {
    await db.user.update({
      where: { id: userId },
      data: { currentStreak: 1, lastStudiedAt: now },
    });
  }
  // diffDays === 0 means same day, no change
}
