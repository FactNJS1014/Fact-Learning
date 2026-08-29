import { getUserEnrollments } from "@/lib/services/course.service";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";
import { LanguageLogo } from "@/components/ui/language-logo";

export const dynamic = "force-dynamic";

export const metadata = { title: "My Learning" };

export default async function LearningPage() {
  const authUser = await getSessionUser();
  if (!authUser) return null;

  const enrollments = await getUserEnrollments(authUser.id);

  const active = enrollments.filter((e) => e.status === "ACTIVE" && e.progress < 100);
  const completed = enrollments.filter((e) => e.status === "COMPLETED" || e.progress === 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        My Learning
      </h1>

      {/* In Progress */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          In Progress ({active.length})
        </h2>
        {active.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <span className="text-4xl block mb-3">📖</span>
            <p className="text-muted-foreground">No courses in progress</p>
            <Link href="/courses" className="text-primary text-sm hover:underline mt-2 inline-block">
              Browse Courses →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((enrollment) => {
              const course = enrollment.course;
              return (
                <Link
                  key={enrollment.id}
                  href={`/courses/${course.slug}`}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <LanguageLogo src={course.languageIcon} alt={course.title} size="sm" />
                    <div>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{course.level}</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.round(enrollment.progress || 0)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(enrollment.progress || 0)}%
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Completed */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4">
          Completed ({completed.length})
        </h2>
        {completed.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <span className="text-4xl block mb-3">🎓</span>
            <p className="text-muted-foreground">No completed courses yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((enrollment) => {
              const course = enrollment.course;
              return (
                <Link
                  key={enrollment.id}
                  href={`/courses/${course.slug}`}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <LanguageLogo src={course.languageIcon} alt={course.title} size="sm" />
                    <div>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{course.level}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">✓ Completed</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
