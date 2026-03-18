import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// ✅ DATABASE_URL を変数として定義します
const connectionString = "postgresql://postgres:Prisma2026Success@db.ceurhcohawkvlbgqezuj.supabase.co:5432/postgres";

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // ✅ 'datasources' ではなく、このフラットな書き方が v7.5.0 のバリデーションを抜ける鍵です
    datasourceUrl: connectionString,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;