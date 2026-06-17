import { z } from "zod";
import { ApplicationStatus, Role } from "@/generated/prisma/client";

export const registerSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export const applicationSchema = z.object({
  fullName: z.string().min(1, "Nama lengkap tidak boleh kosong"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  major: z.string().min(1, "Jurusan tidak boleh kosong"),
  batch: z.string().min(4, "Angkatan tidak valid"),
  division: z.string().min(1, "Bidang tidak boleh kosong"),
  motivation: z.string().min(10, "Motivasi terlalu singkat"),
  cvUrl: z.string().url("URL CV tidak valid"),
  portfolioUrl: z.string().url("URL portofolio tidak valid").optional().or(z.literal("")),
});

export const reviewSchema = z.object({
  score: z.number().min(0, "Skor minimal 0").max(100, "Skor maksimal 100"),
  note: z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
});

export const updateRoleSchema = z.object({
  role: z.nativeEnum(Role),
});
