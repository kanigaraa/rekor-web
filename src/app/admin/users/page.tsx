import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminUsersClient } from "./admin-users-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return <AdminUsersClient userName={user.name} role={user.role as DashboardRole} />;
}
