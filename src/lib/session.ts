import { createHash, randomBytes } from "node:crypto";

import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE_NAME = "rekor_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "APPLICANT" | "REVIEWER" | "ADMIN" | "SUPER_ADMIN";
};

export type ValidSession = {
  id: string;
  tokenHash: string;
  userId: string;
  expiresAt: Date;
  user: SessionUser;
};

export function generateSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    null
  );
}

export async function createSession(userId: string, request: Request) {
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: {
      tokenHash,
      userId,
      expiresAt,
      userAgent: request.headers.get("user-agent"),
      ipAddress: getClientIp(request),
    },
  });

  return { token, expiresAt };
}

export async function getSessionToken(request?: NextRequest) {
  if (request) {
    return request.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;
  }

  return (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function getValidSession(token: string | null) {
  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return session;
}

export async function deleteSession(token: string | null) {
  if (!token) {
    return;
  }

  await prisma.session.deleteMany({
    where: { tokenHash: hashSessionToken(token) },
  });
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  expiresAt: Date,
) {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
