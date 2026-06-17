import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ApplyClient } from "./apply-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function ApplyPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <ApplyClient userName={user.name} role={user.role as DashboardRole} />;
}
