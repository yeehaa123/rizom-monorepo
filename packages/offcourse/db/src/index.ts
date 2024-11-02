import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
  // @ts-ignore
  url: process.env.TURSO_DATABASE_URL || import.meta.env.TURSO_DB_URL,
  // @ts-ignore
  authToken: process.env.TURSO_AUTH_TOKEN! || import.meta.env.TURSO_DB_AUTH_TOKEN,

});


export const db = drizzle(turso);
