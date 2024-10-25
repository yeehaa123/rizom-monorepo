import type { CheckpointQuery, Course } from "@offcourse/schema";
import { db } from "../";
import { eq, and } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { completionTable } from "../schema"
import { insertCourse } from "./course";

export const insertCompletion = async (checkpointQuery: CheckpointQuery) => {
  const completedAt = new Date()
  const value = completionInsertSchema.parse({ ...checkpointQuery, completedAt });
  await db.insert(completionTable).values(value).onConflictDoNothing()
  return completedAt;
}

export const deleteCompletion = async (checkpointQuery: CheckpointQuery) => {
  try {
    await db.delete(completionTable)
      .where(and(
        eq(completionTable.courseId, checkpointQuery.courseId),
        eq(completionTable.checkpointId, checkpointQuery.checkpointId)
      ))
  } catch (e) {
    console.log("DELETE BOOKMARK ERROR", e);
  }
}

export const toggleCompletion = async (payload: Course & { checkpointId: string }) => {
  const data = await db.select().from(completionTable)
    .where(and(
      eq(completionTable.courseId, payload.courseId),
      eq(completionTable.checkpointId, payload.checkpointId)
    ))
  if (data[0]) {
    deleteCompletion(payload)
    return;
  }
  insertCompletion(payload)
  insertCourse(payload)
  return payload.checkpointId;
}

export const completionInsertSchema = createInsertSchema(completionTable);
export const completionSelectSchema = createSelectSchema(completionTable);
