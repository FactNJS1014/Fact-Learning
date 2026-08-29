import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { markLessonComplete, updateStreak } from "@/lib/services/lesson.service";
import { checkAndAwardAchievements } from "@/lib/services/achievement.service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;

  const result = await markLessonComplete(user.id, lessonId);
  await updateStreak(user.id);
  await checkAndAwardAchievements(user.id);

  return NextResponse.json({ success: true, progress: result.progress });
}
