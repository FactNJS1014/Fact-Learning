import { NextRequest, NextResponse } from "next/server";
import { getQuizById } from "@/lib/services/quiz.service";
import { getSessionUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId } = await params;
  const quiz = await getQuizById(quizId);

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  // Strip correct answers for client
  const safeQuiz = {
    ...quiz,
    questions: quiz.questions.map((q) => ({
      ...q,
      options: q.options.map((o) => ({
        id: o.id,
        text: o.text,
        // Don't send isCorrect to client
      })),
    })),
  };

  return NextResponse.json({ quiz: safeQuiz });
}
