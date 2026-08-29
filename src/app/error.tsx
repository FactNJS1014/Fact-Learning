"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <span className="text-5xl block mb-4">⚠️</span>
        <h1 className="text-xl font-bold text-foreground mb-2">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
