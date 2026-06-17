import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

import { toPublicUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  getClientIp,
  setSessionCookie,
} from "@/lib/session";

import { registerSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = registerSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0].message }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "APPLICANT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "REGISTER",
        description: "User registered.",
        ipAddress: getClientIp(request),
        userAgent: request.headers.get("user-agent"),
      },
    });

    const { token, expiresAt } = await createSession(user.id, request);
    const response = NextResponse.json({
      message: "Register success",
      data: toPublicUser(user),
    });

    setSessionCookie(response, token, expiresAt);

    return response;
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
