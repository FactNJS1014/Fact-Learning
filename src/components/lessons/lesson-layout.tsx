"use client";

import { useState } from "react";
import Link from "next/link";

interface SidebarLesson {
  id: string;
  title: string;
  order: number;
  estimatedMinutes: number | null;
}

interface LessonLayoutProps {
  courseSlug: string;
  courseTitle: string;
  moduleTitle: string;
  lessons: SidebarLesson[];
  currentLessonId: string;
  lessonTitle: string;
  initiallyCompleted: boolean;
  children: React.ReactNode;
}

export function LessonLayout({
  courseSlug,
  courseTitle,
  moduleTitle,
  lessons,
  currentLessonId,
  lessonTitle,
  initiallyCompleted,
  children,
}: LessonLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch(
        `/api/courses/lessons/${currentLessonId}/complete`,
        { method: "POST" }
      );
      const data = await res.json();
      if (data.success) setCompleted(true);
    } finally {
      setSaving(false);
    }
  };

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
            href={`/courses/${courseSlug}`}
            className="text-sm text-muted-foreground hover:text-primary mb-4 block"
          >
            ← {courseTitle}
          </Link>
          <h3 className="font-semibold text-foreground text-sm mb-3">
            {moduleTitle}
          </h3>
          <div className="space-y-1">
            {lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/courses/${courseSlug}/lessons/${lesson.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  lesson.id === currentLessonId
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
            aria-label="Toggle lesson navigation"
          >
            ☰
          </button>
          <h2 className="text-sm font-medium text-foreground truncate">
            {lessonTitle}
          </h2>
          <div className="flex items-center gap-2">
            {completed ? (
              <span className="text-xs text-emerald-400 font-medium">
                ✓ Completed
              </span>
            ) : (
              <button
                onClick={handleComplete}
                disabled={saving}
                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Mark Complete"}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">{children}</div>
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