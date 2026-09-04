import { getSessionUser } from "@/lib/auth";
import { getProjectsForUser } from "@/lib/services/project.service";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Real World Projects",
  description:
    "Build real applications for every technology with step-by-step tutorials.",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  BEGINNER: "bg-emerald-500/10 text-emerald-400",
  EASY: "bg-emerald-500/10 text-emerald-400",
  MEDIUM: "bg-amber-500/10 text-amber-400",
  HARD: "bg-orange-500/10 text-orange-400",
  EXPERT: "bg-red-500/10 text-red-400",
};

const STATUS_LABEL: Record<string, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

export default async function ProjectsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const projects = await getProjectsForUser(user.id);

  const completed = projects.filter((p) => p.status === "COMPLETED").length;
  const inProgress = projects.filter((p) => p.status === "IN_PROGRESS").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Real World Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Learn by building. Each project includes requirements, database &
            API design, step-by-step tutorial, and starter code.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-card border border-border rounded-lg text-center">
            <p className="text-xl font-bold text-foreground">
              {projects.length}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="px-4 py-2 bg-card border border-border rounded-lg text-center">
            <p className="text-xl font-bold text-amber-400">{inProgress}</p>
            <p className="text-xs text-muted-foreground">In progress</p>
          </div>
          <div className="px-4 py-2 bg-card border border-border rounded-lg text-center">
            <p className="text-xl font-bold text-emerald-400">{completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <span className="text-4xl block mb-3">🚀</span>
          <p className="text-muted-foreground">No projects started yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete lessons to unlock real world projects
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="p-5 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      DIFFICULTY_COLORS[project.difficulty]
                    }`}
                  >
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.course.title}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  ⏱ ~{project.estimatedHours ?? 4}h
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    project.status === "COMPLETED"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : project.status === "IN_PROGRESS"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {STATUS_LABEL[project.status]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}