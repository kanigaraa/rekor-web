import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminApplicationDetailClient } from "./admin-application-detail-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/dashboard");
  }

  return <AdminApplicationDetailClient applicationId={id} userName={user.name} role={user.role as DashboardRole} />;
}
