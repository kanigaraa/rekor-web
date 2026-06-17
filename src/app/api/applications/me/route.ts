import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(["APPLICANT"], request);

    const application = await prisma.application.findFirst({
      where: { applicantId: user.id },
      include: {
        reviews: true,
      },
    });

    if (!application) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
