import { db } from "../db";
import {
  hashPassword,
  verifyPassword,
  createSession,
  setSessionCookie,
  destroySession,
} from "../auth";

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) {
  try {
    // Check if email or username already exists
    const existing = await db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existing) {
      if (existing.email === data.email) {
        return { error: "Email already registered" };
      }
      return { error: "Username already taken" };
    }

    const passwordHash = await hashPassword(data.password);

    const user = await db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        passwordHash,
        role: "USER",
      },
    });

    // Create user stats
    await db.userStats.create({
      data: { userId: user.id },
    });

    // Create session
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      error:
        "Unable to connect to the database. Please make sure the database is running and try again.",
    };
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  try {
    // Find user by email or username
    const user = await db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.email }],
      },
    });

    if (!user) {
      return { error: "Invalid credentials" };
    }

    if (!user.isActive) {
      return { error: "Account is deactivated" };
    }

    const isValid = await verifyPassword(data.password, user.passwordHash);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("[AUTH] Login error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return {
      error: `Database error: ${errMsg}`,
    };
  }
}

export async function logoutUser() {
  await destroySession();
}
