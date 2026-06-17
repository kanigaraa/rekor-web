import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

import { toPublicUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  getClientIp,
  setSessionCookie,
} from "@/lib/session";

type RegisterBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

function getRegisterInput(body: RegisterBody) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  return { name, email, password };
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as RegisterBody | null;

  if (!body) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const { name, email, password } = getRegisterInput(body);

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
  }

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
}
