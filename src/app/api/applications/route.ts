import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(["APPLICANT"], request);
    const body = await request.json();

    const {
      fullName,
      phone,
      major,
      batch,
      division,
      motivation,
      cvUrl,
      portfolioUrl,
    } = body;

    if (!fullName || !phone || !major || !batch || !division || !motivation) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (cvUrl && !isValidUrl(cvUrl)) {
      return NextResponse.json({ message: "Invalid CV URL" }, { status: 400 });
    }

    if (portfolioUrl && !isValidUrl(portfolioUrl)) {
      return NextResponse.json(
        { message: "Invalid Portfolio URL" },
        { status: 400 }
      );
    }

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
