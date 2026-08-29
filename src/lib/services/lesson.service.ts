import { db } from "../db";

export async function getLessonById(id: string) {
  return db.lesson.findUnique({
    where: { id },
    include: {
      module: {
        include: {
          course: true,
          lessons: {
            where: { status: "PUBLISHED" },
            orderBy: { order: "asc" },
          },
        },
      },
      exercises: { orderBy: { order: "asc" } },
      quizzes: {
        include: {
          questions: {
            include: { options: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });
}

export async function getLessonProgress(userId: string, lessonId: string) {
  return db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
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
