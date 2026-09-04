import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/courses",
  "/learning",
  "/bookmarks",
  "/notifications",
  "/profile",
  "/settings",
  "/playground",
  "/admin",
  "/projects",
  "/exercises",
  "/progress",
  "/quizzes",
];

const publicRoutes = ["/", "/api/auth/login", "/api/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("factlearn_session")?.value;

  // Check if route requires auth
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isApiRoute = pathname.startsWith("/api/");

  // NOTE: /login and /register are NOT redirected here based on cookie
  // presence. The (auth) layout validates the session against the database
  // (getSessionUser) and redirects genuinely logged-in users to /dashboard.
  // Redirecting on cookie presence alone bounces users with an expired or
  // stale session into an infinite /register -> /dashboard -> /login loop.

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For API routes that are protected
  if (isApiRoute && !isPublicRoute && !sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self';"
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
