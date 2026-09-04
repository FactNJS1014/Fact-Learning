"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./theme-provider";
import { logoutAction } from "@/lib/actions/auth.actions";
import { getUnreadCountAction } from "@/lib/actions/notification.actions";

interface NavbarProps {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
    xp: number;
    level: number;
  } | null;
  unreadCount?: number;
}

export function Navbar({ user, unreadCount: initialUnread = 0 }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // The unread badge is fetched after hydration so the server layout only
  // needs one session lookup (the count is not on the render critical path).
  const [unreadCount, setUnreadCount] = useState(initialUnread);
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getUnreadCountAction()
      .then((count) => {
        if (!cancelled) setUnreadCount(count);
      })
      .catch(() => {
        // Session errors are handled elsewhere; keep the badge hidden.
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-nav-bg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Fact<span className="text-primary">Learning</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "/dashboard", label: "Dashboard", icon: "📊" },
                { href: "/courses", label: "Courses", icon: "📚" },
                { href: "/learning", label: "My Learning", icon: "🎯" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="mr-1">⚙️</span>
                  Admin
                </Link>
              )}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <Link
                  href="/notifications"
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {user.firstName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Level {user.level} · {user.xp} XP
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
                  >
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </Link>
                </div>

                {/* Logout */}
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-sm"
                    title="Logout"
                  >
                    🚪
                  </button>
                </form>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Mobile Bottom Navigation
export function MobileNav({ user }: { user?: NavbarProps["user"] }) {
  const pathname = usePathname();

  if (!user) return null;

  const items = [
    { href: "/dashboard", label: "Home", icon: "🏠" },
    { href: "/courses", label: "Courses", icon: "📚" },
    { href: "/learning", label: "Learning", icon: "🎯" },
    { href: "/notifications", label: "Alerts", icon: "🔔" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-nav-bg backdrop-blur-md safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
