import { getDashboardStats } from "@/lib/services/user.service";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";
import { LanguageLogo } from "@/components/ui/language-logo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const authUser = await getSessionUser();
  if (!authUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <span className="text-4xl block mb-4">🔒</span>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Please log in
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            You need to be logged in to view the dashboard.
          </p>
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  let dashboardData;
  try {
    dashboardData = await getDashboardStats(authUser.id);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <span className="text-4xl block mb-4">⚠️</span>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Unable to load dashboard
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            There was a problem loading your data. Please try again.
          </p>
          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const { user, stats, activeEnrollments, completedEnrollments, continueLearning, notifications } =
    dashboardData;

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <span className="text-4xl block mb-4">👤</span>
          <h1 className="text-xl font-bold text-foreground mb-2">
            User not found
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            We couldn&apos;t find your user data. Please try logging in again.
          </p>
          <Link
            href="/login"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {user.firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Keep up the great work! You&apos;re on a {user.currentStreak} day streak.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Courses Enrolled",
            value: stats?.coursesEnrolled || 0,
            icon: "📚",
          },
          {
            label: "Lessons Completed",
            value: stats?.lessonsCompleted || 0,
            icon: "✅",
          },
          {
            label: "Total XP",
            value: user.xp,
            icon: "⚡",
          },
          {
            label: "Current Streak",
            value: `${user.currentStreak} days`,
            icon: "🔥",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <span className="text-2xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      {continueLearning.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Continue Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {continueLearning.map((enrollment) => {
              const course = enrollment.course;
              const totalLessons = course.modules.reduce(
                (acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length,
                0
              );
              const progressPercent = Math.round(enrollment.progress || 0);

              return (
                <Link
                  key={enrollment.id}
                  href={`/courses/${course.slug}`}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <LanguageLogo src={course.languageIcon} alt={course.title} size="sm" />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{course.level}</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full animate-progress"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {progressPercent}% complete
                    </span>
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      Continue →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* My Learning Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">My Learning</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Courses</span>
              <span className="font-medium text-foreground">
                {activeEnrollments.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completed Courses</span>
              <span className="font-medium text-foreground">
                {completedEnrollments.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Exercises Done</span>
              <span className="font-medium text-foreground">
                {stats?.exercisesCompleted || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Quizzes Passed</span>
              <span className="font-medium text-foreground">
                {stats?.quizzesPassed || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Learning Hours</span>
              <span className="font-medium text-foreground">
                {stats?.learningHours || 0}h
              </span>
            </div>
          </div>
          <Link
            href="/learning"
            className="block text-center text-primary text-sm font-medium mt-4 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Recent Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Recent Notifications
          </h2>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No notifications yet
            </p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="text-lg mt-0.5">
                    {notif.type === "ACHIEVEMENT"
                      ? "🏆"
                      : notif.type === "QUIZ_RESULT"
                      ? "📝"
                      : notif.type === "COURSE_COMPLETED"
                      ? "🎓"
                      : "🔔"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/notifications"
            className="block text-center text-primary text-sm font-medium mt-4 hover:underline"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Level Progress</h2>
          <span className="text-sm text-muted-foreground">
            Level {user.level} · {user.xp} XP
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full animate-progress"
            style={{ width: `${((user.xp % 100) / 100) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {100 - (user.xp % 100)} XP to Level {user.level + 1}
        </p>
      </div>
    </div>
  );
}
