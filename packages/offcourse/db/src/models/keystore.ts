import { db } from "../";
import type { KeyStoreEntry } from "@offcourse/schema";
import { keystoreTable } from "../schema"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertKeyStoreEntry = async (entry: KeyStoreEntry) => {
  const value = keystoreInsertSchema.parse(entry);
  await db.insert(keystoreTable).values(value).onConflictDoNothing()
  return true;
}

export const keystoreInsertSchema = createInsertSchema(keystoreTable);
export const keystoreSelectSchema = createSelectSchema(keystoreTable);
