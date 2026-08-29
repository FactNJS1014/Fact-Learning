import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <span className="text-6xl block mb-4">🔍</span>
        <h1 className="text-3xl font-bold text-foreground mb-2">404</h1>
        <p className="text-muted-foreground mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
