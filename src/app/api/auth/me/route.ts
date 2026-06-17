import { NextResponse, type NextRequest } from "next/server";

import { getCurrentUser, toPublicUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Authenticated",
    data: toPublicUser(user),
  });
}
