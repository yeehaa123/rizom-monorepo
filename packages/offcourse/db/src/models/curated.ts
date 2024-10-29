import { Course, CourseQuery } from "@offcourse/schema";
import { db } from "../";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { insertCourse } from "./course";
import { curatedTable } from "../schema";

export const insertCurated = async (courseQuery: CourseQuery) => {
  const curatedAt = new Date()
  const value = curatedInsertSchema.parse({ ...courseQuery, curatedAt });
  await db.insert(curatedTable).values(value).onConflictDoNothing()
  return curatedAt;
}

export const insertCuratedCourse = async (course: Course) => {
  insertCurated(course)
  insertCourse(course)
  return course.courseId;
}
export const curatedInsertSchema = createInsertSchema(curatedTable);
export const curatedSelectSchema = createSelectSchema(curatedTable);
