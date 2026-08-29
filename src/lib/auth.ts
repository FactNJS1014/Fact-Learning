import { db } from "./db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const SESSION_COOKIE_NAME = "factlearn_session";
const TOKEN_MAX_AGE = 86400; // 1 day in seconds

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "USER" | "INSTRUCTOR" | "ADMIN";
  avatarUrl: string | null;
  xp: number;
  level: number;
  currentStreak: number;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = uuidv4();
  const expiresAt = new Date(Date.now() + TOKEN_MAX_AGE * 1000);

  await db.session.create({
    data: {
      sessionToken,
      userId,
      expiresAt,
    },
  });

  return sessionToken;
}

export async function setSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_MAX_AGE,
    path: "/",
  });
}

export async function getSessionUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) return null;

    const session = await db.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session) return null;

    // Check expiration
    if (new Date() > session.expiresAt) {
      await db.session.delete({ where: { id: session.id } });
      return null;
    }

    if (!session.user.isActive) return null;

    return {
      id: session.user.id,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      username: session.user.username,
      email: session.user.email,
      role: session.user.role,
      avatarUrl: session.user.avatarUrl,
      xp: session.user.xp,
      level: session.user.level,
      currentStreak: session.user.currentStreak,
    };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await db.session.deleteMany({ where: { sessionToken } });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionExpiry(): Promise<Date | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) return null;

    const session = await db.session.findUnique({
      where: { sessionToken },
    });

    if (!session) return null;

    return session.expiresAt;
  } catch {
    return null;
  }
}
