import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireRole(["APPLICANT"], request);

    const existingApplication = await prisma.application.findFirst({
      where: { applicantId: user.id },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    if (existingApplication.status !== "DRAFT") {
      return NextResponse.json(
        { message: "Application is already submitted or processed" },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: { id: existingApplication.id },
      data: {
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "SUBMIT_APPLICATION",
        description: "Applicant submitted application",
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
