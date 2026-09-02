import { getSessionUser } from "@/lib/auth";
import { getUnreadCount } from "@/lib/services/notification.service";
import { redirect } from "next/navigation";
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { SessionWarning } from "@/components/ui/session-warning";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  let unreadCount = 0;
  try {
    unreadCount = await getUnreadCount(user.id);
  } catch {
    // Silently handle notification count errors
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SessionWarning />
      <Navbar user={user} unreadCount={unreadCount} />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileNav user={user} />
    </div>
  );
}
