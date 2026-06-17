import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { divisions, mockApplications } from "@/lib/recruitment-mock-data";

const reviewableApplications = mockApplications.filter((application) =>
  ["SUBMITTED", "UNDER_REVIEW"].includes(application.status),
);

export default function ReviewerApplicationsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageHeader
          title="Review Pendaftar"
          description="Lihat pendaftar yang masuk ke tahap review."
        />

        <Card className="shadow-none">
          <CardContent className="space-y-5 pt-6">
            {/* TODO: Integrate filters with GET /api/reviewer/applications once the API is ready. */}
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_280px]">
              <Input
                name="search"
                type="search"
                placeholder="Cari nama pendaftar"
                aria-label="Cari nama pendaftar"
              />
              <Select name="status" defaultValue="" aria-label="Filter status">
                <option value="">Semua status</option>
                <option value="SUBMITTED">Terkirim</option>
                <option value="UNDER_REVIEW">Direview</option>
              </Select>
              <Select
                name="division"
                defaultValue=""
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
                    {reviewableApplications.map((application) => (
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
                          {application.submittedAt}
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
