import type { NextRequest } from "next/server";

import type { SessionUser } from "@/lib/session";
import { getSessionToken, getValidSession } from "@/lib/session";

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
