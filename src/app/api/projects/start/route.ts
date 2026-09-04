import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { upsertProjectProgress } from "@/lib/services/project.service";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let projectId: string;
  try {
    const body = await request.json();
    projectId = String(body.projectId ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const project = await db.project.findFirst({
    where: { id: projectId, status: "PUBLISHED" },
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  await upsertProjectProgress(user.id, projectId, { status: "IN_PROGRESS" });

  return NextResponse.json({ success: true });
}