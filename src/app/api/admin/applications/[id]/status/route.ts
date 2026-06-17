import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";
import { updateStatusSchema } from "@/lib/validations";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await requireRole(["ADMIN", "SUPER_ADMIN"], request);
    const resolvedParams = await params;

    const json = await request.json().catch(() => null);
    const parsed = updateStatusSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const { status } = parsed.data;

    const application = await prisma.application.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    const updatedApplication = await prisma.application.update({
      where: { id: application.id },
      data: { status },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "UPDATE_STATUS",
        description: `Status updated to ${status} for application ${application.id}`,
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
