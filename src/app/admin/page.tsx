import { getAdminStats } from "@/lib/services/user.service";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Users",
            value: stats.totalUsers,
            icon: "👥",
          },
          {
            label: "Active Users",
            value: stats.activeUsers,
            icon: "✅",
          },
          {
            label: "Total Courses",
            value: stats.totalCourses,
            icon: "📚",
          },
          {
            label: "Total Lessons",
            value: stats.totalLessons,
            icon: "📝",
          },
          {
            label: "Enrollments",
            value: stats.totalEnrollments,
            icon: "📋",
          },
          {
            label: "Completion Rate",
            value: `${stats.courseCompletionRate}%`,
            icon: "📈",
          },
          {
            label: "Quiz Attempts",
            value: stats.totalQuizAttempts,
            icon: "🧪",
          },
          {
            label: "Courses Completed",
            value: stats.completedEnrollments,
            icon: "🎓",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5"
          >
            <span className="text-2xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
