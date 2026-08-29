import { NextRequest, NextResponse } from "next/server";
import { submitQuiz } from "@/lib/services/quiz.service";
import { getSessionUser } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId } = await params;
  const { answers } = await request.json();

  const result = await submitQuiz(user.id, quizId, answers);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    score: result.score,
    totalPoints: result.totalPoints,
    percentage: result.percentage,
    passed: result.passed,
  });
}
