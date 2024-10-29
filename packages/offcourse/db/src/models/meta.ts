import { metaData } from "../schema"
import { db } from "..";
import { RepositoryMetaData } from "@offcourse/schema";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertMetaEntry = async (entry: RepositoryMetaData) => {
  const value = metaInsertSchema.parse(entry);
  await db.insert(metaData).values(value).onConflictDoNothing()
  return value;
}

export const getMetaEntry = async () => {
  const entries = await db.select().from(metaData)
  return entries[0];
}
export const metaInsertSchema = createInsertSchema(metaData);
export const metaSelectSchema = createSelectSchema(metaData);
