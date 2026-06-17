"use client";

import { useEffect, useState, type FormEvent } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";

type UserRole = "APPLICANT" | "REVIEWER" | "ADMIN" | "SUPER_ADMIN";

type User = {
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

export function AdminUsersClient({ userName, role }: { userName: string, role: DashboardRole }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleRoleChange(e: FormEvent, userId: string) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newRole = formData.get("role") as string;
    
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as UserRole } : u));
        alert("Role berhasil diubah");
      } else {
        const err = await res.json();
        alert("Gagal mengubah role: " + err.message);
      }
    } catch (err) {
      alert("Error: " + err);
    }
  }

  return (
    <DashboardShell role={role} userName={userName} activeHref="/admin/users">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageHeader
          title="Kelola User"
          description="Atur role pengguna Rekor."
        />

        <Card className="shadow-none">
          <CardContent className="pt-6">
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
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">Memuat...</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">Tidak ada user.</td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr
                          key={u.id}
                          className="transition-colors hover:bg-surface-muted/60"
                        >
                          <td className="px-4 py-4 font-medium text-text-primary">
                            {u.name}
                          </td>
                          <td className="px-4 py-4 text-text-secondary">
                            {u.email}
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={roleVariant[u.role]}>
                              {u.role}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-text-secondary">
                            {new Date(u.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-4">
                            <form className="flex items-center gap-2" onSubmit={(e) => handleRoleChange(e, u.id)}>
                              <Select
                                name="role"
                                defaultValue={u.role}
                                aria-label={`Role ${u.name}`}
                                className="h-9 w-40"
                              >
                                {roles.map((r) => (
                                  <option key={r} value={r}>
                                    {r}
                                  </option>
                                ))}
                              </Select>
                              <Button type="submit" variant="outline" className="h-9">
                                Simpan
                              </Button>
                            </form>
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
