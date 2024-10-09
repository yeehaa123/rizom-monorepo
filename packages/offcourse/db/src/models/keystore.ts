import { db } from "../";
import type { KeyStoreEntry } from "@offcourse/schema";
import { keystore } from "../schema"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertKeyStoreEntry = async (entry: KeyStoreEntry) => {
  const value = keystoreInsertSchema.parse(entry);
  await db.insert(keystore).values(value).onConflictDoNothing()
  return true;
}

export const keystoreInsertSchema = createInsertSchema(keystore);
export const keystoreSelectSchema = createSelectSchema(keystore);
