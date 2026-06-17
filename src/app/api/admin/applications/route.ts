import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, authErrorResponse } from "@/lib/auth";
import type { ApplicationStatus } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"], request);

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const divisionParam = searchParams.get("division");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    if (statusParam) {
      whereClause.status = statusParam as ApplicationStatus;
    }

    if (divisionParam) {
      whereClause.division = divisionParam;
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
