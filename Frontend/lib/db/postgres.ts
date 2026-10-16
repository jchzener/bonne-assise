import { Pool } from "pg";

const globalForPool = globalThis as unknown as { baPool?: Pool };
export const pool = globalForPool.baPool ?? new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined, max: 5 });
if (process.env.NODE_ENV !== "production") globalForPool.baPool = pool;
