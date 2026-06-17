import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ReviewerApplicationsClient } from "./reviewer-applications-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function ReviewerApplicationsPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "REVIEWER" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/dashboard");
  }

  return <ReviewerApplicationsClient userName={user.name} role={user.role as DashboardRole} />;
}
