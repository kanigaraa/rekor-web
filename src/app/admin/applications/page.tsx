import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminApplicationsClient } from "./admin-applications-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function AdminApplicationsPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/dashboard");
  }

  return <AdminApplicationsClient userName={user.name} role={user.role as DashboardRole} />;
}
