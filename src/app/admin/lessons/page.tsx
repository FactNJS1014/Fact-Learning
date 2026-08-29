import { Metadata } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Manage Lessons" };

export default async function AdminLessonsPage() {
  const lessons = await db.lesson.findMany({
    include: {
      module: {
        include: { course: { select: { title: true, slug: true } } },
      },
      _count: { select: { exercises: true, quizzes: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">
        Manage Lessons
      </h1>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Lesson
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Course
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Exercises
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Quizzes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.estimatedMinutes || "?"} min
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-sm">
                    {lesson.module.course.title}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        lesson.status === "PUBLISHED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {lesson._count.exercises}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {lesson._count.quizzes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
