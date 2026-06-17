import { NextResponse, type NextRequest } from "next/server";

import { canAccessPath, getRequiredRolesForPath } from "@/lib/rbac";
import { getValidSession, SESSION_COOKIE_NAME } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiredRoles = getRequiredRolesForPath(pathname);

  if (!requiredRoles) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;
  const session = await getValidSession(token);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (!canAccessPath(pathname, session.user.role)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apply/:path*",
    "/my-application/:path*",
    "/reviewer/:path*",
    "/admin/:path*",
  ],
};
