import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PROGRAMMING_LANGUAGES } from "@/lib/utils";
import { LanguageLogo } from "@/components/ui/language-logo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">
                  F
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Fact<span className="text-primary">Learning</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Learn Programming.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Build Real Skills. From Basic to Advanced.
            </p>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Master 16+ programming languages with structured courses,
              interactive exercises, quizzes, and real-world projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                START LEARNING
              </Link>
              <Link
                href="/courses"
                className="border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">
          Master Popular Languages
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          From frontend frameworks to backend systems, mobile development to
          systems programming — we&apos;ve got you covered.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {PROGRAMMING_LANGUAGES.map((lang) => (
            <Link
              key={lang.name}
              href="/courses"
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex justify-center mb-2"><LanguageLogo src={lang.logo} alt={lang.name} size="lg" /></div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {lang.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Why FactLearning?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📖",
              title: "Structured Learning Paths",
              desc: "Basic → Intermediate → Advanced courses for every language.",
            },
            {
              icon: "🧪",
              title: "Interactive Exercises",
              desc: "Practice with hands-on exercises and real code examples.",
            },
            {
              icon: "🏆",
              title: "Track Your Progress",
              desc: "XP system, achievements, streaks, and certificates.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-2xl p-8 text-center"
            >
              <span className="text-4xl block mb-4">{feature.icon}</span>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>© 2026 FactLearning. Free Programming Education Platform.</p>
        </div>
      </footer>
    </div>
  );
}
