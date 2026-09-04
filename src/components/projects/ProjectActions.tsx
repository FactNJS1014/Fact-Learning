"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface ProjectActionsProps {
  projectId: string;
  status: string;
  initialGithubUrl?: string | null;
  initialDemoUrl?: string | null;
  initialNotes?: string | null;
}

export function ProjectActions({
  projectId,
  status,
  initialGithubUrl,
  initialDemoUrl,
  initialNotes,
}: ProjectActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState(initialGithubUrl ?? "");
  const [demoUrl, setDemoUrl] = useState(initialDemoUrl ?? "");
  const [notes, setNotes] = useState(initialNotes ?? "");
  const router = useRouter();

  const start = () => {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/projects/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        setError(data.error ?? "Something went wrong");
      }
    });
  };

  const complete = () => {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/projects/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          status: "COMPLETED",
          githubUrl: githubUrl || null,
          demoUrl: demoUrl || null,
          notes: notes || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        setError(data.error ?? "Something went wrong");
      }
    });
  };

  return (
    <div className="mt-8 bg-card border border-border rounded-xl p-6">
      <h3 className="font-bold text-foreground mb-4">Project Progress</h3>

      {status === "NOT_STARTED" ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Ready to build? Start the project and track your progress here.
          </p>
          <button
            onClick={start}
            disabled={isPending}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Starting..." : "Start Project"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              status === "COMPLETED"
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status === "COMPLETED" ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            {status === "COMPLETED" ? "Completed" : "In progress"}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">
                GitHub URL
              </span>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/you/repo"
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">
                Live Demo URL
              </span>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://yourapp.com"
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs text-muted-foreground mb-1 block">
              Notes
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="What did you learn? What would you improve?"
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            onClick={complete}
            disabled={isPending}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isPending
              ? "Saving..."
              : status === "COMPLETED"
                ? "Update Progress"
                : "Mark as Completed"}
          </button>
        </div>
      )}
    </div>
  );
}