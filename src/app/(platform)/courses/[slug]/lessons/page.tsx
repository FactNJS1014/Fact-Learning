import { getCourseBySlug, getCourseProgress } from "@/lib/services/course.service";
import { getSessionUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const authUser = await getSessionUser();
  if (!authUser) redirect("/login");

  // Check enrollment
  const enrollment = await getCourseProgress(authUser.id, course.id);

  // Find first incomplete lesson or first lesson
  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
  );

  if (allLessons.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">No lessons available yet.</p>
      </div>
    );
  }

  // Redirect to first lesson
  redirect(`/courses/${slug}/lessons/${allLessons[0].id}`);
}
