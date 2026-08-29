import { db } from "../db";

export async function submitQuiz(
  userId: string,
  quizId: string,
  answers: Record<string, string[]>
) {
  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: { options: true },
      },
    },
  });

  if (!quiz) {
    return { error: "Quiz not found" };
  }

  let totalPoints = 0;
  let earnedPoints = 0;

  for (const question of quiz.questions) {
    totalPoints += question.points;
    const correctOptions = question.options
      .filter((o) => o.isCorrect)
      .map((o) => o.id)
      .sort();
    const userAnswers = (answers[question.id] || []).sort();

    if (
      correctOptions.length === userAnswers.length &&
      correctOptions.every((id, i) => id === userAnswers[i])
    ) {
      earnedPoints += question.points;
    }
  }

  const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
  const passed = percentage >= quiz.passScore;

  const attempt = await db.quizAttempt.create({
    data: {
      quizId,
      userId,
      answers,
      score: earnedPoints,
      percentage,
      passed,
      startedAt: new Date(),
      completedAt: new Date(),
    },
  });

  // Award XP if passed
  if (passed) {
    await db.user.update({
      where: { id: userId },
      data: { xp: { increment: 30 } },
    });

    await db.userStats.upsert({
      where: { userId },
      create: { userId, quizzesPassed: 1, totalQuizScore: percentage },
      update: {
        quizzesPassed: { increment: 1 },
        totalQuizScore: { increment: percentage },
      },
    });
  }

  return {
    attempt,
    score: earnedPoints,
    totalPoints,
    percentage,
    passed,
    quiz,
  };
}

export async function getQuizAttempts(userId: string, quizId: string) {
  return db.quizAttempt.findMany({
    where: { userId, quizId },
    orderBy: { completedAt: "desc" },
  });
}

export async function getQuizById(id: string) {
  return db.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        include: { options: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      },
      lesson: true,
    },
  });
}
