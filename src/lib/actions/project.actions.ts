"use server";

import { requireAuth } from "../auth";
import { upsertProjectProgress } from "../services/project.service";
import { db } from "../db";
import { z } from "zod";

const updateSchema = z.object({
  projectId: z.string().min(1),
  status: z.enum(["IN_PROGRESS", "COMPLETED"]),
  githubUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
});

export async function startProjectAction(projectId: string) {
  const user = await requireAuth();

  // Verify the project exists and is published
  const project = await db.project.findFirst({
    where: { id: projectId, status: "PUBLISHED" },
  });
  if (!project) throw new Error("Project not found");

  return upsertProjectProgress(user.id, projectId, {
    status: "IN_PROGRESS",
  });
}

export async function updateProjectProgressAction(
  input: z.infer<typeof updateSchema>
) {
  const user = await requireAuth();
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid project update data");
  }

  const { projectId, status, githubUrl, demoUrl, notes } = parsed.data;

  // Ownership + publish check
  const project = await db.project.findFirst({
    where: { id: projectId, status: "PUBLISHED" },
  });
  if (!project) throw new Error("Project not found");

  return upsertProjectProgress(user.id, projectId, {
    status,
    githubUrl: githubUrl ?? undefined,
    demoUrl: demoUrl ?? undefined,
    notes: notes ?? undefined,
  });
}