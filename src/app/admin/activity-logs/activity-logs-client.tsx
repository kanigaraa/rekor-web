"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";

type ActivityAction =
  | "REGISTER"
  | "LOGIN"
  | "LOGOUT"
  | "CREATE_APPLICATION"
  | "UPDATE_APPLICATION"
  | "SUBMIT_APPLICATION"
  | "REVIEW_APPLICATION"
  | "UPDATE_STATUS"
  | "CHANGE_ROLE";

type ActivityLog = {
  id: string;
  createdAt: string;
  action: ActivityAction;
  description: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  user?: {
    name: string;
  } | null;
};

const actionOptions: ActivityAction[] = [
  "REGISTER",
  "LOGIN",
  "LOGOUT",
  "CREATE_APPLICATION",
  "UPDATE_APPLICATION",
  "SUBMIT_APPLICATION",
  "REVIEW_APPLICATION",
  "UPDATE_STATUS",
  "CHANGE_ROLE",
];

const actionVariant: Record<
  ActivityAction,
  "default" | "secondary" | "success" | "warning" | "info"
> = {
  REGISTER: "success",
  LOGIN: "info",
  LOGOUT: "secondary",
  CREATE_APPLICATION: "secondary",
  UPDATE_APPLICATION: "info",
  SUBMIT_APPLICATION: "default",
  REVIEW_APPLICATION: "warning",
  UPDATE_STATUS: "default",
  CHANGE_ROLE: "warning",
};

export function ActivityLogsClient({ userName, role }: { userName: string, role: DashboardRole }) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/activity-logs");
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = logs.filter((log) => {
    if (actionFilter && log.action !== actionFilter) return false;
    return true;
  });

  return (
    <DashboardShell role={role} userName={userName} activeHref="/admin/activity-logs">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageHeader
          title="Activity Log"
          description="Riwayat aktivitas penting di sistem Rekor."
        />

        <Card className="shadow-none">
          <CardContent className="space-y-5 pt-6">
            <div className="flex flex-col gap-2 sm:max-w-xs">
              <label
                htmlFor="action"
                className="text-sm font-medium text-text-primary"
              >
                Filter action
              </label>
              <Select id="action" name="action" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
                <option value="">Semua action</option>
                {actionOptions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </Select>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                  <thead className="bg-surface-muted text-xs uppercase text-text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Tanggal</th>
                      <th className="px-4 py-3 font-semibold">User</th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                      <th className="px-4 py-3 font-semibold">Deskripsi</th>
                      <th className="px-4 py-3 font-semibold">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">Memuat...</td>
                      </tr>
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">Tidak ada log.</td>
                      </tr>
                    ) : (
                      filtered.map((log) => (
                        <tr
                          key={log.id}
                          className="transition-colors hover:bg-surface-muted/60"
                        >
                          <td className="px-4 py-4 text-text-secondary">
                            {new Date(log.createdAt).toLocaleString("id-ID", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-4 font-medium text-text-primary">
                            {log.user?.name || "System/Unknown"}
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={actionVariant[log.action]}>
                              {log.action}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-text-secondary">
                            {log.description || "-"}
                          </td>
                          <td className="px-4 py-4 font-mono text-xs text-text-muted">
                            {log.ipAddress || "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
