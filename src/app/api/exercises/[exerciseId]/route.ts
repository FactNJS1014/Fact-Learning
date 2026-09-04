import { NextRequest, NextResponse } from "next/server";
import { getExerciseById, getExerciseProgress } from "@/lib/services/exercise.service";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { exerciseId } = await params;
  const exercise = await getExerciseById(exerciseId);

  if (!exercise) {
    return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
  }

  const lesson = await db.lesson.findUnique({
    where: { id: exercise.lessonId },
    include: {
      module: {
        include: {
          course: { select: { slug: true, title: true } },
        },
      },
    },
  });

  const progress = await getExerciseProgress(user.id, exerciseId);

  return NextResponse.json({ exercise, lesson, progress });
}