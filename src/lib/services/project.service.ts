import { db } from "../db";
import type { ProjectStatus } from "@prisma/client";

export async function getProjectsForUser(userId: string) {
  const projects = await db.project.findMany({
    where: { status: "PUBLISHED" },
    include: {
      course: { select: { id: true, title: true, slug: true } },
      progress: { where: { userId }, take: 1 },
    },
    orderBy: [{ course: { title: "asc" } }, { order: "asc" }],
  });

  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    difficulty: p.difficulty,
    estimatedHours: p.estimatedHours,
    technologies: p.technologies,
    order: p.order,
    course: p.course,
    status: p.progress[0]?.status ?? "NOT_STARTED",
    startedAt: p.progress[0]?.startedAt ?? null,
    completedAt: p.progress[0]?.completedAt ?? null,
  }));
}

export async function getProjectBySlugForUser(slug: string, userId: string) {
  const project = await db.project.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          level: true,
        },
      },
      progress: { where: { userId } },
    },
  });

  if (!project) return null;

  return {
    ...project,
    myProgress: project.progress[0] ?? null,
  };
}

export async function upsertProjectProgress(
  userId: string,
  projectId: string,
  data: {
    status?: ProjectStatus;
    githubUrl?: string | null;
    demoUrl?: string | null;
    notes?: string | null;
  }
) {
  const existing = await db.projectProgress.findUnique({
    where: { userId_projectId: { userId, projectId } },
  });

  const payload: {
    status?: ProjectStatus;
    githubUrl?: string | null;
    demoUrl?: string | null;
    notes?: string | null;
    startedAt?: Date;
    completedAt?: Date | null;
  } = { ...data };

  if (data.status === "IN_PROGRESS" && !existing?.startedAt) {
    payload.startedAt = new Date();
  }
  if (data.status === "COMPLETED") {
    payload.completedAt = new Date();
  }
  if (existing && data.status && data.status !== "COMPLETED") {
    payload.completedAt = null;
  }

  return db.projectProgress.upsert({
    where: { userId_projectId: { userId, projectId } },
    create: {
      userId,
      projectId,
      status: data.status ?? "IN_PROGRESS",
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
      notes: data.notes,
      startedAt: new Date(),
      completedAt: data.status === "COMPLETED" ? new Date() : null,
    },
    update: payload,
  });
}

export async function getMyProjects(userId: string) {
  return db.projectProgress.findMany({
    where: { userId, status: { not: "NOT_STARTED" } },
    include: {
      project: {
        include: { course: { select: { title: true, slug: true } } },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}