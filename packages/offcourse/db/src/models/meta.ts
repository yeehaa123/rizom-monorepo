import { metaData } from "../schema"
import { db } from "..";
import { RepositoryMetaData } from "@offcourse/schema";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertMetaEntry = (entry: RepositoryMetaData) => {
  const value = metaInsertSchema.parse(entry);
  return db.insert(metaData).values(value).onConflictDoNothing()
}

export const getMetaEntry = async () => {
  const entries = await db.select().from(metaData)
  return entries[0];
}
export const metaInsertSchema = createInsertSchema(metaData);
export const metaSelectSchema = createSelectSchema(metaData);
