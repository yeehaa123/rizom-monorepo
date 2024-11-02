import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { config } from 'dotenv';
config({ path: '.env' });

const turso = createClient({
  // @ts-ignore
  url: import.meta.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});


export const db = drizzle(turso);
