import type { CheckpointQuery, Course } from "@offcourse/schema";
import { db } from "../";
import { eq, and } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { completionTable } from "../schema"
import { getCourses, insertCourse } from "./course";
import { insertBookmark } from "./bookmark"

export const getFollowedCourses = async () => {
  const data = await db.selectDistinct({ courseId: completionTable.courseId })
    .from(completionTable)
  const courseIds = data.map(({ courseId }) => courseId);
  return await getCourses({ courseIds });
}

export const getCompletion = (payload: Course & { checkpointId: string }) => {
  return db.select()
    .from(completionTable)
    .where(and(
      eq(completionTable.courseId, payload.courseId),
      eq(completionTable.checkpointId, payload.checkpointId)
    ))
}

export const insertCompletion = (checkpointQuery: CheckpointQuery) => {
  const completedAt = new Date()
  const value = completionInsertSchema.parse({ ...checkpointQuery, completedAt });
  return db.insert(completionTable)
    .values(value)
    .onConflictDoNothing()
}

export const deleteCompletion = (checkpointQuery: CheckpointQuery) => {
  return db.delete(completionTable)
    .where(and(
      eq(completionTable.courseId, checkpointQuery.courseId),
      eq(completionTable.checkpointId, checkpointQuery.checkpointId)
    ))
}

export const toggleCompletion = async (payload: Course & { checkpointId: string }) => {
  const data = await getCompletion(payload);
  try {
    if (data[0]) {
      await deleteCompletion(payload)
      return;
    }
    return db.batch([
      insertCourse(payload),
      insertBookmark(payload)
    ]);
  } catch (e) {
    console.log("BOOKMARK ERROR", e);
  }
}

export const completionInsertSchema = createInsertSchema(completionTable);
export const completionSelectSchema = createSelectSchema(completionTable);
