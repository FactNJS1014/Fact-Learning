import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { upsertProjectProgress } from "@/lib/services/project.service";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    projectId?: string;
    status?: string;
    githubUrl?: string | null;
    demoUrl?: string | null;
    notes?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const projectId = String(body.projectId ?? "");
  const status = body.status;

  if (!projectId || !status || !["IN_PROGRESS", "COMPLETED"].includes(status)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // URL validation
  const urls = [body.githubUrl, body.demoUrl].filter((u): u is string => !!u);
  for (const url of urls) {
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 }
      );
    }
  }

  const project = await db.project.findFirst({
    where: { id: projectId, status: "PUBLISHED" },
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  await upsertProjectProgress(user.id, projectId, {
    status: status as "IN_PROGRESS" | "COMPLETED",
    githubUrl: body.githubUrl ?? undefined,
    demoUrl: body.demoUrl ?? undefined,
    notes: body.notes ?? undefined,
  });

  return NextResponse.json({ success: true });
}