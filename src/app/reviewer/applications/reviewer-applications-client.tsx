"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { StatusBadge, type ApplicationStatus } from "@/components/ui/status-badge";

type Application = {
  id: string;
  fullName: string;
  division: string;
  status: ApplicationStatus;
  updatedAt: string;
};

const divisions = [
  "Biro Kesekretariatan",
  "Biro Keuangan dan Pendanaan",
  "Biro Media dan Informasi",
  "Kementerian Advokasi dan Kesejahteraan Mahasiswa",
  "Kementerian Sosial Politik",
  "Kementerian Ekonomi Kreatif",
  "Departemen Kajian Strategis",
  "Departemen Kemitraan Strategis",
];

export function ReviewerApplicationsClient({ userName, role }: { userName: string, role: DashboardRole }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/reviewer/applications");
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = applications.filter((app) => {
    if (search && !app.fullName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && app.status !== statusFilter) return false;
    if (divisionFilter && app.division !== divisionFilter) return false;
    return true;
  });

  return (
    <DashboardShell role={role} userName={userName} activeHref="/reviewer/applications">
      <div className="space-y-6">
        <PageHeader
          title="Review Pendaftar"
          description="Lihat pendaftar yang masuk ke tahap review."
        />

        <Card className="shadow-none">
          <CardContent className="space-y-5 pt-6">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_280px]">
              <Input
                name="search"
                type="search"
                placeholder="Cari nama pendaftar"
                aria-label="Cari nama pendaftar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select name="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter status">
                <option value="">Semua status</option>
                <option value="SUBMITTED">Terkirim</option>
                <option value="UNDER_REVIEW">Direview</option>
              </Select>
              <Select
                name="division"
                value={divisionFilter}
                onChange={(e) => setDivisionFilter(e.target.value)}
                aria-label="Filter bidang/kementerian/biro"
              >
                <option value="">Semua bidang</option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </Select>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-surface-muted text-xs uppercase text-text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nama</th>
                      <th className="px-4 py-3 font-semibold">
                        Bidang/Kementerian/Biro
                      </th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">
                        Tanggal submit
                      </th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">Memuat...</td>
                      </tr>
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">Tidak ada data.</td>
                      </tr>
                    ) : (
                      filtered.map((application) => (
                        <tr
                          key={application.id}
                          className="transition-colors hover:bg-surface-muted/60"
                        >
                          <td className="px-4 py-4 font-medium text-text-primary">
                            {application.fullName}
                          </td>
                          <td className="px-4 py-4 text-text-secondary">
                            {application.division}
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={application.status} />
                          </td>
                          <td className="px-4 py-4 text-text-secondary">
                            {new Date(application.updatedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/reviewer/applications/${application.id}`}
                              tabIndex={-1}
                            >
                              <Button variant="outline" className="h-9">
                                Review
                              </Button>
                            </Link>
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
