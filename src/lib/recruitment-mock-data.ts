import type { ApplicationStatus } from "@/components/ui/status-badge";

export type MockApplication = {
  id: string;
  fullName: string;
  phone: string;
  major: string;
  batch: string;
  division: string;
  motivation: string;
  cvUrl: string;
  portfolioUrl?: string;
  status: ApplicationStatus;
  submittedAt: string;
  score?: number;
  reviewerNote?: string;
};

export const divisions = [
  "Biro Kesekretariatan",
  "Biro Keuangan dan Pendanaan",
  "Biro Media dan Informasi",
  "Kementerian Advokasi dan Kesejahteraan Mahasiswa",
  "Kementerian Sosial Politik",
  "Kementerian Ekonomi Kreatif",
  "Departemen Kajian Strategis",
  "Departemen Kemitraan Strategis",
];

export const mockApplications: MockApplication[] = [
  {
    id: "app-001",
    fullName: "Khaliz Kanigara",
    phone: "08123456789",
    major: "Sistem Informasi",
    batch: "2024",
    division: "Biro Media dan Informasi",
    motivation:
      "Saya ingin mengembangkan kemampuan komunikasi dan berkontribusi dalam publikasi kegiatan BEM UPNVJ.",
    cvUrl: "https://example.com/khaliz-cv.pdf",
    portfolioUrl: "https://example.com/khaliz-portfolio",
    status: "SUBMITTED",
    submittedAt: "16 Juni 2026",
  },
  {
    id: "app-002",
    fullName: "Rafid Abdan Syakur",
    phone: "082112223333",
    major: "Informatika",
    batch: "2024",
    division: "Kementerian Sosial Politik",
    motivation:
      "Saya tertarik mengikuti kajian isu kampus dan membantu program sosial politik mahasiswa.",
    cvUrl: "https://example.com/rafid-cv.pdf",
    portfolioUrl: "https://example.com/rafid-portfolio",
    status: "UNDER_REVIEW",
    submittedAt: "15 Juni 2026",
    score: 84,
    reviewerNote: "Motivasi kuat dan pengalaman organisasi cukup relevan.",
  },
  {
    id: "app-003",
    fullName: "Fathi Muhammad Luthfi",
    phone: "083144445555",
    major: "Manajemen",
    batch: "2023",
    division: "Biro Keuangan dan Pendanaan",
    motivation:
      "Saya ingin membantu pengelolaan dana kegiatan dan belajar membuat program kerja yang rapi.",
    cvUrl: "https://example.com/fathi-cv.pdf",
    status: "ACCEPTED",
    submittedAt: "14 Juni 2026",
    score: 91,
    reviewerNote: "Pemahaman bidang baik dan jawaban sangat terarah.",
  },
  {
    id: "app-004",
    fullName: "Muhammad Syauqi Rabbani",
    phone: "085677778888",
    major: "Ilmu Komunikasi",
    batch: "2024",
    division: "Departemen Kemitraan Strategis",
    motivation:
      "Saya ingin membangun relasi eksternal dan ikut mendukung kerja sama strategis BEM UPNVJ.",
    cvUrl: "https://example.com/syauqi-cv.pdf",
    portfolioUrl: "https://example.com/syauqi-portfolio",
    status: "REJECTED",
    submittedAt: "13 Juni 2026",
    score: 68,
    reviewerNote: "Perlu pengalaman tambahan untuk kebutuhan bidang ini.",
  },
];
