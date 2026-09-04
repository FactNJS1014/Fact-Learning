import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  getLessonContent,
  getLessonProgress,
  recordLessonView,
} from "@/lib/services/lesson.service";
import { LessonLayout } from "@/components/lessons/lesson-layout";
import { Markdown } from "@/components/ui/markdown";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;

  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  // Course lookup, lesson content (cached), per-user progress, and the
  // enrollment check all run in parallel — no sequential round-trips to Neon.
  const [course, lesson, progress, enrollment] = await Promise.all([
    db.course.findUnique({
      where: { slug },
      select: { id: true },
    }),
    getLessonContent(lessonId),
    getLessonProgress(user.id, lessonId),
    db.enrollment.findFirst({
      where: { userId: user.id, course: { slug } },
      select: { id: true },
    }),
  ]);

  if (!course || !lesson || lesson.module.courseId !== course.id) {
    notFound();
  }

  if (!enrollment) {
    redirect(`/courses/${slug}`);
  }

  // Single-upsert view record, after access checks.
  await recordLessonView(user.id, lessonId);

  const { module: mod } = lesson;
  const currentIndex = mod.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? mod.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < mod.lessons.length - 1
      ? mod.lessons[currentIndex + 1]
      : null;

  return (
    <LessonLayout
      courseSlug={mod.course.slug}
      courseTitle={mod.course.title}
      moduleTitle={mod.title}
      lessons={mod.lessons}
      currentLessonId={lesson.id}
      lessonTitle={lesson.title}
      initiallyCompleted={progress?.status === "COMPLETED"}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        {lesson.title}
      </h1>

      {/* Video */}
      {lesson.videoUrl && (
        <div className="mb-8 rounded-xl overflow-hidden border border-border">
          <iframe
            src={lesson.videoUrl}
            className="w-full aspect-video"
            allowFullScreen
          />
        </div>
      )}

      {/* Content */}
      <Markdown content={lesson.content} />

      {/* Exercises */}
      {lesson.exercises.length > 0 && (
        <div className="mt-12 bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-4">Exercises</h3>
          {lesson.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="border border-border rounded-lg p-4 mb-3 last:mb-0"
            >
              <h4 className="font-medium text-foreground">{exercise.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {exercise.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-primary">
                  +{exercise.points} XP
                </span>
                <span className="text-xs text-muted-foreground">
                  {exercise.points} points
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quizzes */}
      {lesson.quizzes.length > 0 && (
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-4">Quiz</h3>
          {lesson.quizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{quiz.title}</p>
                <p className="text-xs text-muted-foreground">
                  {quiz.questionCount} questions
                </p>
              </div>
              <Link
                href={`/quizzes/${quiz.id}`}
                className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90"
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
        {prevLesson ? (
          <Link
            href={`/courses/${mod.course.slug}/lessons/${prevLesson.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Previous: {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/courses/${mod.course.slug}/lessons/${nextLesson.id}`}
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            Next: {nextLesson.title} →
          </Link>
        ) : (
          <Link
            href={`/courses/${mod.course.slug}`}
            className="text-sm text-primary font-medium hover:underline"
          >
            Back to Course →
          </Link>
        )}
      </div>
    </LessonLayout>
  );
}