import type { CourseQuery, Note } from "@offcourse/schema";
import { noteTable } from "../schema"
import { db } from "../";
import { createInsertSchema } from 'drizzle-zod';

export const insertNote = async ({ note, courseId, checkpointId }: Note & CourseQuery & { checkpointId?: string }) => {
  const annotatedAt = new Date()
  const value = { note, annotatedAt, courseId, checkpointId };
  await db.insert(noteTable).values(value).onConflictDoNothing()
  return annotatedAt;
}


export const noteInsertSchema = createInsertSchema(noteTable);
