import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";

type ActivityAction =
  | "REGISTER"
  | "LOGIN"
  | "LOGOUT"
  | "SUBMIT_APPLICATION"
  | "REVIEW_APPLICATION"
  | "UPDATE_STATUS"
  | "CHANGE_ROLE";

type MockActivityLog = {
  id: string;
  date: string;
  user: string;
  action: ActivityAction;
  description: string;
  ipAddress: string;
};

const actionOptions: ActivityAction[] = [
  "REGISTER",
  "LOGIN",
  "LOGOUT",
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
  SUBMIT_APPLICATION: "default",
  REVIEW_APPLICATION: "warning",
  UPDATE_STATUS: "default",
  CHANGE_ROLE: "warning",
};

// TODO: Replace mock logs with GET /api/admin/activity-logs once the API is ready.
const mockActivityLogs: MockActivityLog[] = [
  {
    id: "log-001",
    date: "17 Juni 2026, 09:12",
    user: "Khaliz Kanigara",
    action: "SUBMIT_APPLICATION",
    description: "Mengirim form pendaftaran.",
    ipAddress: "192.168.1.24",
  },
  {
    id: "log-002",
    date: "17 Juni 2026, 10:03",
    user: "Rafid Abdan Syakur",
    action: "REVIEW_APPLICATION",
    description: "Menyimpan review pendaftar.",
    ipAddress: "192.168.1.31",
  },
  {
    id: "log-003",
    date: "17 Juni 2026, 10:41",
    user: "Fathi Muhammad Luthfi",
    action: "UPDATE_STATUS",
    description: "Mengubah status pendaftaran menjadi diterima.",
    ipAddress: "192.168.1.18",
  },
  {
    id: "log-004",
    date: "17 Juni 2026, 11:05",
    user: "Muhammad Syauqi Rabbani",
    action: "CHANGE_ROLE",
    description: "Mengubah role pengguna menjadi reviewer.",
    ipAddress: "192.168.1.42",
  },
  {
    id: "log-005",
    date: "17 Juni 2026, 11:28",
    user: "Adla Fayyaz",
    action: "LOGIN",
    description: "Masuk ke akun Rekor.",
    ipAddress: "192.168.1.56",
  },
];

export default function ActivityLogsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageHeader
          title="Activity Log"
          description="Riwayat aktivitas penting di sistem Rekor."
        />

        <Card className="shadow-none">
          <CardContent className="space-y-5 pt-6">
            {/* TODO: Connect action filter to GET /api/admin/activity-logs once the API is ready. */}
            <div className="flex flex-col gap-2 sm:max-w-xs">
              <label
                htmlFor="action"
                className="text-sm font-medium text-text-primary"
              >
                Filter action
              </label>
              <Select id="action" name="action" defaultValue="">
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
                    {mockActivityLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="transition-colors hover:bg-surface-muted/60"
                      >
                        <td className="px-4 py-4 text-text-secondary">
                          {log.date}
                        </td>
                        <td className="px-4 py-4 font-medium text-text-primary">
                          {log.user}
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={actionVariant[log.action]}>
                            {log.action}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-text-secondary">
                          {log.description}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-text-muted">
                          {log.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
