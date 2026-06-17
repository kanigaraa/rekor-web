import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

import { toPublicUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  getClientIp,
  setSessionCookie,
} from "@/lib/session";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

const invalidCredentialResponse = () =>
  NextResponse.json({ message: "Invalid email or password" }, { status: 401 });

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as LoginBody | null;

  if (!body) {
    return invalidCredentialResponse();
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return invalidCredentialResponse();
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return invalidCredentialResponse();
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return invalidCredentialResponse();
  }

  const { token, expiresAt } = await createSession(user.id, request);

  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: "LOGIN",
      description: "User logged in.",
      ipAddress: getClientIp(request),
      userAgent: request.headers.get("user-agent"),
    },
  });

  const response = NextResponse.json({
    message: "Login success",
    data: toPublicUser(user),
  });

  setSessionCookie(response, token, expiresAt);

  return response;
}
