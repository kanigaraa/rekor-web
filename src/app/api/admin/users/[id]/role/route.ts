import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

const ALLOWED_ROLES = ["APPLICANT", "REVIEWER", "ADMIN", "SUPER_ADMIN"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const adminUser = await requireRole(["SUPER_ADMIN"], request);
    const resolvedParams = await params;

    const body = await request.json();
    const { role } = body;

    if (!role || !ALLOWED_ROLES.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUser.id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: adminUser.id,
        action: "CHANGE_ROLE",
        description: `Role changed to ${role} for user ${targetUser.email}`,
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
