import { NextRequest, NextResponse } from "next/server";
import { getLessonById, getLessonProgress } from "@/lib/services/lesson.service";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  const { slug, lessonId } = await params;
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify lesson belongs to the course
  const course = await db.course.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // Check enrollment
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
  });

  if (!enrollment) {
    return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
  }

  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  // Verify lesson belongs to the course
  if (lesson.module.courseId !== course.id) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const progress = await getLessonProgress(user.id, lessonId);

  // Start progress if not started
  if (!progress) {
    await db.lessonProgress.create({
      data: {
        userId: user.id,
        lessonId,
        status: "IN_PROGRESS",
        startedAt: new Date(),
        lastAccessedAt: new Date(),
      },
    });
  } else {
    await db.lessonProgress.update({
      where: { id: progress.id },
      data: { lastAccessedAt: new Date() },
    });
  }

  return NextResponse.json({ lesson, progress });
}
