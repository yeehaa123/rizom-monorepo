import { db } from "../";
import { eq } from "drizzle-orm";
import type { KeyStoreEntry } from "@offcourse/schema";
import { keystoreTable } from "../schema"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertKeyStoreEntry = async (entry: KeyStoreEntry) => {
  try {
    const value = keystoreInsertSchema.parse(entry);
    await db.insert(keystoreTable).values(value).onConflictDoNothing()
    return true;
  } catch (e) {
    console.log(e);
    return false
  }
}

export const getKeyStoreEntry = async (keyId: string) => {
  const entries = await db.select({ publicKey: keystoreTable.publicKey }).from(keystoreTable)
    .where(eq(keystoreTable.keyId, keyId))
  const publicKey = entries[0]?.publicKey;
  return publicKey;
}

export const keystoreInsertSchema = createInsertSchema(keystoreTable);
export const keystoreSelectSchema = createSelectSchema(keystoreTable);
