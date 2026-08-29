"use server";

import { requireAuth } from "../auth";
import { submitQuiz } from "../services/quiz.service";

export async function submitQuizAction(
  quizId: string,
  answers: Record<string, string[]>
) {
  const user = await requireAuth();
  return submitQuiz(user.id, quizId, answers);
}
