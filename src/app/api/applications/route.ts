import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

import { applicationSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(["APPLICANT"], request);
    const json = await request.json().catch(() => null);
    const parsed = applicationSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      major,
      batch,
      division,
      motivation,
      cvUrl,
      portfolioUrl,
    } = parsed.data;

    const existingApplication = await prisma.application.findFirst({
      where: { applicantId: user.id },
    });

    if (existingApplication && existingApplication.status !== "DRAFT") {
      return NextResponse.json(
        { message: "Cannot edit an application that is already submitted" },
        { status: 400 }
      );
    }

    const applicationData = {
      fullName,
      phone,
      major,
      batch,
      division,
      motivation,
      cvUrl: cvUrl || null,
      portfolioUrl: portfolioUrl || null,
      status: "DRAFT" as const,
    };

    let application;
    let action: "CREATE_APPLICATION" | "UPDATE_APPLICATION";

    if (existingApplication) {
      application = await prisma.application.update({
        where: { id: existingApplication.id },
        data: applicationData,
      });
      action = "UPDATE_APPLICATION";
    } else {
      application = await prisma.application.create({
        data: {
          ...applicationData,
          applicantId: user.id,
        },
      });
      action = "CREATE_APPLICATION";
    }

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action,
        description: `Applicant ${action === "CREATE_APPLICATION" ? "created" : "updated"} application draft`,
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json(application, {
      status: existingApplication ? 200 : 201,
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
