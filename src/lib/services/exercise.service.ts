import { db } from "../db";

export async function getExercisesByLesson(lessonId: string) {
  return db.exercise.findMany({
    where: { lessonId },
    orderBy: { order: "asc" },
  });
}

export async function getExerciseProgress(userId: string, exerciseId: string) {
  return db.exerciseProgress.findUnique({
    where: { userId_exerciseId: { userId, exerciseId } },
  });
}

export async function completeExercise(userId: string, exerciseId: string) {
  const exercise = await db.exercise.findUnique({
    where: { id: exerciseId },
  });

  if (!exercise) {
    return { error: "Exercise not found" };
  }

  const existing = await db.exerciseProgress.findUnique({
    where: { userId_exerciseId: { userId, exerciseId } },
  });

  if (existing?.status === "COMPLETED") {
    return { progress: existing };
  }

  const progress = await db.exerciseProgress.upsert({
    where: { userId_exerciseId: { userId, exerciseId } },
    create: {
      userId,
      exerciseId,
      status: "COMPLETED",
      submittedAt: new Date(),
      completedAt: new Date(),
    },
    update: {
      status: "COMPLETED",
      submittedAt: new Date(),
      completedAt: new Date(),
    },
  });

  // Award XP
  await db.user.update({
    where: { id: userId },
    data: { xp: { increment: 20 } },
  });

  await db.userStats.upsert({
    where: { userId },
    create: { userId, exercisesCompleted: 1 },
    update: { exercisesCompleted: { increment: 1 } },
  });

  return { progress };
}

export async function getExerciseById(id: string) {
  return db.exercise.findUnique({
    where: { id },
    include: { lesson: true },
  });
}
