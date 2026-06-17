import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ActivityLogsClient } from "./activity-logs-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function ActivityLogsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return <ActivityLogsClient userName={user.name} role={user.role as DashboardRole} />;
}
