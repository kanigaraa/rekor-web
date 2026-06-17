import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MyApplicationClient } from "./my-application-client";
import type { DashboardRole } from "@/components/layout/sidebar";

export default async function MyApplicationPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <MyApplicationClient userName={user.name} role={user.role as DashboardRole} />;
}
