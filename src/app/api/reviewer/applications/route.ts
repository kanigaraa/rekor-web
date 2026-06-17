import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["REVIEWER", "ADMIN", "SUPER_ADMIN"], request);

    const applications = await prisma.application.findMany({
      where: {
        status: {
          in: ["SUBMITTED", "UNDER_REVIEW"],
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
