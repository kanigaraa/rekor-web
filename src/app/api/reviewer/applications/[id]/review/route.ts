import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await requireRole(["REVIEWER", "ADMIN", "SUPER_ADMIN"], request);
    const resolvedParams = await params;

    const body = await request.json();
    const { score, note } = body;

    if (
      score === undefined ||
      typeof score !== "number" ||
      score < 0 ||
      score > 100
    ) {
      return NextResponse.json(
        { message: "Score must be a number between 0 and 100" },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    if (
      application.status !== "SUBMITTED" &&
      application.status !== "UNDER_REVIEW"
    ) {
      return NextResponse.json(
        { message: "Application is not reviewable" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        applicationId: application.id,
        reviewerId: user.id,
        score,
        note: note || null,
      },
    });

    await prisma.application.update({
      where: { id: application.id },
      data: {
        status: "UNDER_REVIEW",
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "REVIEW_APPLICATION",
        description: `Review submitted for application ${application.id}`,
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
