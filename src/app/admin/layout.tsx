import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h1 className="text-xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access the admin panel.
          </p>
          <Link href="/dashboard" className="text-primary text-sm hover:underline mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/courses", label: "Courses", icon: "📚" },
    { href: "/admin/lessons", label: "Lessons", icon: "📝" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="md:w-56 shrink-0">
          <h2 className="text-lg font-bold text-foreground mb-4">Admin</h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
