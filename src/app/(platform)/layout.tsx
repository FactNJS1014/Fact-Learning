import { getSessionUser } from "@/lib/auth";
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

  return (
    <div className="min-h-screen flex flex-col">
      <SessionWarning />
      {/* The unread badge lazy-loads in the client (Navbar), keeping this
          layout to a single session lookup on the critical path. */}
      <Navbar user={user} />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileNav user={user} />
    </div>
  );
}
