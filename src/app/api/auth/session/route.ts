import { NextResponse } from "next/server";
import { getSessionUser, getSessionExpiry } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const expiresAt = await getSessionExpiry();

  return NextResponse.json({
    user,
    expiresAt: expiresAt?.toISOString(),
  });
}
