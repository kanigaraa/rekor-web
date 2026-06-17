import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ReviewerApplicationDetailClient } from "./reviewer-application-detail-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function ReviewerApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user || (user.role !== "REVIEWER" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/dashboard");
  }

  return <ReviewerApplicationDetailClient applicationId={id} userName={user.name} role={user.role as DashboardRole} />;
}
