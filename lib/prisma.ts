import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient to prevent multiple instances during development
export const db = globalThis.prisma || new PrismaClient();

// Only assign the prisma instance to globalThis in non-production environments
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
