import type { Course } from "@offcourse/schema";
import { courseTable } from "../schema"
import { db } from "../";
import { createInsertSchema } from 'drizzle-zod';

export const getCourses = async () => {
  const data = await db
    .select()
    .from(courseTable)
  return data.map(({ course }) => course);
}
export const insertCourse = async (course: Course) => {
  const { curator, courseId } = course;
  await db.insert(courseTable).values({
    courseId,
    curator: curator.alias,
    course
  }).onConflictDoNothing()
  return courseId;
}


export const courseInsertSchema = createInsertSchema(courseTable);
