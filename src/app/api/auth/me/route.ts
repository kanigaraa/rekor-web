import { NextResponse, type NextRequest } from "next/server";

import { authErrorResponse, requireUser, toPublicUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(request);

    return NextResponse.json({
      message: "Authenticated",
      data: toPublicUser(user),
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
