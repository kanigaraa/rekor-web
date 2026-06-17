import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  divisions,
  mockApplications,
  type MockApplication,
} from "@/lib/recruitment-mock-data";

const summaryCards = [
  {
    title: "Total Pendaftar",
    value: mockApplications.length,
  },
  {
    title: "Terkirim",
    value: countByStatus("SUBMITTED"),
  },
  {
    title: "Direview",
    value: countByStatus("UNDER_REVIEW"),
  },
  {
    title: "Diterima",
    value: countByStatus("ACCEPTED"),
  },
  {
    title: "Ditolak",
    value: countByStatus("REJECTED"),
  },
];

export default function AdminApplicationsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <PageHeader
          title="Kelola Pendaftar"
          description="Pantau dan kelola status pendaftaran Open Recruitment BEM UPNVJ."
        />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {summaryCards.map((card) => (
            <Card key={card.title} className="shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-text-muted">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-text-primary">
                  {card.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="shadow-none">
          <CardContent className="space-y-5 pt-6">
            {/* TODO: Integrate filters and status changes with /api/admin/applications once the API is ready. */}
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
                <option value="ACCEPTED">Diterima</option>
                <option value="REJECTED">Ditolak</option>
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
                <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                  <thead className="bg-surface-muted text-xs uppercase text-text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nama</th>
                      <th className="px-4 py-3 font-semibold">
                        Bidang/Kementerian/Biro
                      </th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Nilai</th>
                      <th className="px-4 py-3 font-semibold">
                        Tanggal submit
                      </th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface">
                    {mockApplications.map((application) => (
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
                          {application.score ?? "-"}
                        </td>
                        <td className="px-4 py-4 text-text-secondary">
                          {application.submittedAt}
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/admin/applications/${application.id}`}
                            tabIndex={-1}
                          >
                            <Button variant="outline" className="h-9">
                              Detail
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

function countByStatus(status: MockApplication["status"]) {
  return mockApplications.filter((application) => application.status === status)
    .length;
}
