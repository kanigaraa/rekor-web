import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await requireRole(["REVIEWER", "ADMIN", "SUPER_ADMIN"], request);
    
    // In Next 15+, params is a Promise. In Next 14, it is an object.
    const resolvedParams = await params;

    const application = await prisma.application.findUnique({
      where: {
        id: resolvedParams.id,
      },
      include: {
        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
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
        { message: "Application is not in a reviewable state" },
        { status: 403 }
      );
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
