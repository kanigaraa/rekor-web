import { Pool } from "pg";
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
  
  const pool = new Pool({
    connectionString,
    ...(isSupabase && {
      ssl: { rejectUnauthorized: false },
    }),
  });

  // Handle idle pool client errors to prevent crash loops
  pool.on("error", (err) => {
    console.error("Unexpected error on idle pg client:", err);
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
