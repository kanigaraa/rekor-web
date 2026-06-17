import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";

type UserRole = "APPLICANT" | "REVIEWER" | "ADMIN" | "SUPER_ADMIN";

type MockUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

const roles: UserRole[] = ["APPLICANT", "REVIEWER", "ADMIN", "SUPER_ADMIN"];

const roleVariant: Record<
  UserRole,
  "default" | "secondary" | "success" | "warning" | "info"
> = {
  APPLICANT: "secondary",
  REVIEWER: "info",
  ADMIN: "warning",
  SUPER_ADMIN: "default",
};

// TODO: Replace mock users with GET /api/admin/users once the API is ready.
const mockUsers: MockUser[] = [
  {
    id: "user-001",
    name: "Khaliz Kanigara",
    email: "khaliz@example.com",
    role: "APPLICANT",
    createdAt: "12 Juni 2026",
  },
  {
    id: "user-002",
    name: "Rafid Abdan Syakur",
    email: "rafid@example.com",
    role: "REVIEWER",
    createdAt: "12 Juni 2026",
  },
  {
    id: "user-003",
    name: "Fathi Muhammad Luthfi",
    email: "fathi@example.com",
    role: "ADMIN",
    createdAt: "13 Juni 2026",
  },
  {
    id: "user-004",
    name: "Muhammad Syauqi Rabbani",
    email: "syauqi@example.com",
    role: "SUPER_ADMIN",
    createdAt: "13 Juni 2026",
  },
];

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageHeader
          title="Kelola User"
          description="Atur role pengguna Rekor."
        />

        <Card className="shadow-none">
          <CardContent className="pt-6">
            {/* TODO: Integrate role updates with PATCH /api/admin/users/[id]/role once the API is ready. */}
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead className="bg-surface-muted text-xs uppercase text-text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nama</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Role</th>
                      <th className="px-4 py-3 font-semibold">
                        Tanggal dibuat
                      </th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface">
                    {mockUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-surface-muted/60"
                      >
                        <td className="px-4 py-4 font-medium text-text-primary">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-text-secondary">
                          {user.email}
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={roleVariant[user.role]}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-text-secondary">
                          {user.createdAt}
                        </td>
                        <td className="px-4 py-4">
                          <form className="flex items-center gap-2">
                            <Select
                              name="role"
                              defaultValue={user.role}
                              aria-label={`Role ${user.name}`}
                              className="h-9 w-40"
                            >
                              {roles.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </Select>
                            <Button type="submit" variant="outline" className="h-9">
                              Simpan
                            </Button>
                          </form>
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
