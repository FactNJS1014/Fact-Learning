import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">F</span>
        </div>
        <span className="text-2xl font-bold text-foreground">
          Fact<span className="text-primary">Learning</span>
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
