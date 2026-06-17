import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { SessionUser } from "@/lib/session";
import { getSessionToken, getValidSession } from "@/lib/session";
import { isRoleAllowed, type Role } from "@/lib/rbac";

export class AuthError extends Error {
  status: 401 | 403;

  constructor(status: 401 | 403, message: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export function toPublicUser(user: SessionUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function getCurrentUser(request?: NextRequest) {
  const token = await getSessionToken(request);
  const session = await getValidSession(token);

  return session?.user ?? null;
}

export async function requireUser(request?: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw new AuthError(401, "Unauthorized");
  }

  return user;
}

export async function requireRole(
  allowedRoles: readonly Role[],
  request?: NextRequest,
) {
  const user = await requireUser(request);

  if (!isRoleAllowed(user.role, allowedRoles)) {
    throw new AuthError(403, "Forbidden");
  }

  return user;
}

export function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  throw error;
}
