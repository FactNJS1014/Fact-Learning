import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, username, email, password } = body;

    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const result = await registerUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
