import { getCourseBySlug, getCourseProgress, enrollCourse } from "@/lib/services/course.service";
import { getSessionUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { LanguageLogo } from "@/components/ui/language-logo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return {
    title: course ? `${course.title} — FactLearning` : "Course Not Found",
    description: course?.description,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const authUser = await getSessionUser();

  let enrollmentData: {
    status: string;
    progress: number;
  } | null = null;

  if (authUser) {
    const cp = await getCourseProgress(authUser.id, course.id);
    if (cp) {
      enrollmentData = { status: cp.status, progress: cp.progress };
    }
  }

  const totalLessons = course.modules.reduce(
    (acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length,
    0
  );

  async function handleEnroll() {
    "use server";
    if (!authUser) redirect("/login");
    await enrollCourse(authUser.id, course!.id);
    redirect(`/courses/${slug}`);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/courses" className="hover:text-primary">
          Courses
        </Link>
        <span>/</span>
        <span className="text-foreground">{course.title}</span>
      </div>

      {/* Header */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
            <LanguageLogo src={course.languageIcon} alt={course.title} size="xl" className="drop-shadow-lg" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  course.level === "BASIC"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : course.level === "INTERMEDIATE"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {course.level}
              </span>
              <span className="text-sm text-muted-foreground">
                {course.category.name}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {course.title}
            </h1>
            <p className="text-muted-foreground">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>📚 {totalLessons} lessons</span>
              <span>⏱ {course.estimatedHours || "~4h"} hours</span>
              <span>👤 {course.instructorName || "FactLearning"}</span>
              <span>enrolled</span>
            </div>
          </div>
        </div>

        {/* Enrollment / Progress */}
        <div className="mt-6 pt-6 border-t border-border">
          {enrollmentData ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Your Progress
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(enrollmentData.progress)}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary h-2.5 rounded-full animate-progress"
                  style={{ width: `${enrollmentData.progress}%` }}
                />
              </div>
              <Link
                href={`/courses/${slug}/lessons`}
                className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                CONTINUE LEARNING
              </Link>
            </div>
          ) : authUser ? (
            <form action={handleEnroll}>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                ENROLL COURSE
              </button>
            </form>
          ) : (
            <Link
              href={`/login?redirect=/courses/${slug}`}
              className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              LOGIN TO ENROLL
            </Link>
          )}
        </div>
      </div>

      {/* Requirements & Objectives */}
      {(course.requirements?.length > 0 || course.objectives?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {course.requirements?.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {course.requirements.map((req: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {course.objectives?.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-2">
                {course.objectives.map((obj: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5">✓</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Curriculum */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Curriculum</h2>
        <div className="space-y-4">
          {course.modules.map((mod: { id: string; title: string; description: string | null; lessons: { id: string; title: string; estimatedMinutes: number | null; exercises: unknown[]; quizzes: unknown[] }[] }, modIndex: number) => (
            <div key={mod.id} className="border border-border rounded-lg overflow-hidden">
              <div className="bg-secondary px-4 py-3">
                <h3 className="font-semibold text-foreground text-sm">
                  Module {modIndex + 1}: {mod.title}
                </h3>
                {mod.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {mod.description}
                  </p>
                )}
              </div>
              <div className="divide-y divide-border">
                {mod.lessons.map((lesson, lessonIndex: number) => (
                  <Link
                    key={lesson.id}
                    href={
                      authUser
                        ? `/courses/${slug}/lessons/${lesson.id}`
                        : `/courses/${slug}`
                    }
                    className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-6">
                        {lessonIndex + 1}.
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {lesson.estimatedMinutes && (
                            <span className="text-xs text-muted-foreground">
                              {lesson.estimatedMinutes} min
                            </span>
                          )}
                          {lesson.exercises.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              · {lesson.exercises.length} exercises
                            </span>
                          )}
                          {lesson.quizzes.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              · Quiz
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-muted-foreground">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
