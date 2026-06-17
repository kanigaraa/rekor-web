import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  // Enable SSL for Supabase connections (pooler or direct)
  const isSupabase = connectionString.includes("supabase.com") || connectionString.includes("supabase.co");
  const adapter = new PrismaPg({
    connectionString,
    ...(isSupabase && {
      ssl: { rejectUnauthorized: false },
    }),
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
