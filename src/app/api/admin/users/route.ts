import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["SUPER_ADMIN"], request);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
