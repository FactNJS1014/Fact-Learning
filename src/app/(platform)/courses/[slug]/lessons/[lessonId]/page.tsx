"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LessonData {
  id: string;
  title: string;
  content: string;
  videoUrl: string | null;
  order: number;
  module: {
    id: string;
    title: string;
    courseId: string;
    course: { slug: string; title: string };
    lessons: {
      id: string;
      title: string;
      order: number;
      estimatedMinutes: number | null;
    }[];
  };
  exercises: { id: string; title: string; description: string; points: number }[];
  quizzes: { id: string; title: string; questions: { id: string }[] }[];
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [progress, setProgress] = useState<{ status: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    params.then(({ slug, lessonId }) => {
      fetch(`/api/courses/${slug}/lessons/${lessonId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.lesson) {
            setLessonData(data.lesson);
            setProgress(data.progress);
          }
        });
    });
  }, [params]);

  const handleComplete = async () => {
    if (!lessonData) return;
    startTransition(async () => {
      const res = await fetch(`/api/courses/lessons/${lessonData.id}/complete`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setProgress({ status: "COMPLETED" });
      }
    });
  };

  if (!lessonData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  const { module: mod } = lessonData;
  const currentIndex = mod.lessons.findIndex((l) => l.id === lessonData.id);
  const prevLesson = currentIndex > 0 ? mod.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < mod.lessons.length - 1 ? mod.lessons[currentIndex + 1] : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } shrink-0 border-r border-border bg-sidebar-bg overflow-hidden transition-all hidden md:block`}
      >
        <div className="w-72 h-full overflow-y-auto p-4">
          <Link
            href={`/courses/${mod.course.slug}`}
            className="text-sm text-muted-foreground hover:text-primary mb-4 block"
          >
            ← {mod.course.title}
          </Link>
          <h3 className="font-semibold text-foreground text-sm mb-3">
            {mod.title}
          </h3>
          <div className="space-y-1">
            {mod.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/courses/${mod.course.slug}/lessons/${lesson.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  lesson.id === lessonData.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{lesson.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-16 z-10 bg-background border-b border-border px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground"
          >
            ☰
          </button>
          <h2 className="text-sm font-medium text-foreground truncate">
            {lessonData.title}
          </h2>
          <div className="flex items-center gap-2">
            {progress?.status === "COMPLETED" ? (
              <span className="text-xs text-emerald-400 font-medium">✓ Completed</span>
            ) : (
              <button
                onClick={handleComplete}
                disabled={isPending}
                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Mark Complete"}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {lessonData.title}
          </h1>

          {/* Video */}
          {lessonData.videoUrl && (
            <div className="mb-8 rounded-xl overflow-hidden border border-border">
              <iframe
                src={lessonData.videoUrl}
                className="w-full aspect-video"
                allowFullScreen
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {lessonData.content.split("\n").map((line, i) => {
              if (line.startsWith("```")) return null;
              if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold mt-8 mb-4 text-foreground">{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-foreground">{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
              if (line.startsWith("- ")) return <li key={i} className="text-muted-foreground ml-4">{line.slice(2)}</li>;
              if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-primary pl-4 text-muted-foreground italic my-4">{line.slice(2)}</blockquote>;
              if (line.trim() === "") return <br key={i} />;
              if (line.includes("`")) {
                const parts = line.split(/`([^`]+)`/);
                return (
                  <p key={i} className="text-muted-foreground mb-3 leading-relaxed">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <code key={j} className="bg-code-bg text-code-text px-1.5 py-0.5 rounded text-sm font-mono">
                          {part}
                        </code>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return <p key={i} className="text-muted-foreground mb-3 leading-relaxed">{line}</p>;
            })}
          </div>

          {/* Exercises */}
          {lessonData.exercises.length > 0 && (
            <div className="mt-12 bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">Exercises</h3>
              {lessonData.exercises.map((exercise) => (
                <div key={exercise.id} className="border border-border rounded-lg p-4 mb-3 last:mb-0">
                  <h4 className="font-medium text-foreground">{exercise.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {exercise.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-primary">+{exercise.points} XP</span>
                    <span className="text-xs text-muted-foreground">{exercise.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quizzes */}
          {lessonData.quizzes.length > 0 && (
            <div className="mt-8 bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">Quiz</h3>
              {lessonData.quizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{quiz.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {quiz.questions.length} questions
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
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
