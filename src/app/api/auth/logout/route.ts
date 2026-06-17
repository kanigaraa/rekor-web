import { NextResponse, type NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
  clearSessionCookie,
  deleteSession,
  getClientIp,
  getSessionToken,
} from "@/lib/session";

export async function POST(request: NextRequest) {
  const token = await getSessionToken(request);
  const user = await getCurrentUser(request);

  if (user) {
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "LOGOUT",
        description: "User logged out.",
        ipAddress: getClientIp(request),
        userAgent: request.headers.get("user-agent"),
      },
    });
  }

  await deleteSession(token);

  const response = NextResponse.json({ message: "Logout success" });
  clearSessionCookie(response);

  return response;
}
