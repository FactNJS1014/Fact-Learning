import { getSessionUser } from "@/lib/auth";
import { getProjectBySlugForUser } from "@/lib/services/project.service";
import { Markdown } from "@/components/ui/markdown";
import { ProjectActions } from "@/components/projects/ProjectActions";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DIFFICULTY_COLORS: Record<string, string> = {
  BEGINNER: "bg-emerald-500/10 text-emerald-400",
  EASY: "bg-emerald-500/10 text-emerald-400",
  MEDIUM: "bg-amber-500/10 text-amber-400",
  HARD: "bg-orange-500/10 text-orange-400",
  EXPERT: "bg-red-500/10 text-red-400",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getSessionUser();
  if (!user) return null;

  const project = await getProjectBySlugForUser(slug, user.id);
  if (!project) notFound();

  const myProgress = project.myProgress;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-primary mb-6 block"
      >
        ← All Projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
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
          <span className="text-xs text-muted-foreground">
            • ⏱ ~{project.estimatedHours ?? 4}h
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {project.title}
        </h1>
        <p className="text-muted-foreground">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Requirements */}
        <Section title="📋 Requirements">
          <ul className="space-y-2">
            {project.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </Section>

        {/* Features */}
        <Section title="✨ Features">
          <ul className="space-y-2">
            {project.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">▸</span>
                {feat}
              </li>
            ))}
          </ul>
        </Section>

        {/* Database Design */}
        {project.dbDesign && (
          <Section title="🗄️ Database Design">
            <Markdown content={project.dbDesign} />
          </Section>
        )}

        {/* API Design */}
        {project.apiDesign && (
          <Section title="🔌 API Design">
            <Markdown content={project.apiDesign} />
          </Section>
        )}

        {/* Folder Structure */}
        {project.folderStructure && (
          <Section title="📁 Folder Structure">
            <Markdown content={project.folderStructure} />
          </Section>
        )}

        {/* Tutorial */}
        {project.tutorial && (
          <Section title="🧭 Step-by-Step Tutorial">
            <Markdown content={project.tutorial} />
          </Section>
        )}

        {/* Starter Code */}
        {project.starterCode && (
          <Section title="🚀 Starter Code">
            <Markdown content={project.starterCode} />
          </Section>
        )}

        {/* Final Result */}
        {project.finalCode && (
          <Section title="🏁 Final Result">
            <Markdown content={project.finalCode} />
          </Section>
        )}

        {/* Challenge */}
        {project.challenge && (
          <Section title="🏆 Challenge">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </Section>
        )}

        <ProjectActions
          projectId={project.id}
          status={myProgress?.status ?? "NOT_STARTED"}
          initialGithubUrl={myProgress?.githubUrl}
          initialDemoUrl={myProgress?.demoUrl}
          initialNotes={myProgress?.notes}
        />
      </div>
    </div>
  );
}