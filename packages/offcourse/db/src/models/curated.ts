import { Course, CourseQuery } from "@offcourse/schema";
import { db } from "../";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { getCourses, insertCourse } from "./course";
import { curatedTable } from "../schema";

export const getCuratedCourses = async () => {
  const data = await db
    .select()
    .from(curatedTable)
  const courseIds = data.map(({ courseId }) => courseId);
  return await getCourses({ courseIds });
}

export const insertCurated = (courseQuery: CourseQuery) => {
  const curatedAt = new Date()
  const value = curatedInsertSchema.parse({ ...courseQuery, curatedAt });
  return db.insert(curatedTable).values(value).onConflictDoNothing()
}

export const insertCuratedCourse = async (course: Course) => {
  await db.batch([
    insertCourse(course),
    insertCurated(course)
  ]);
  return course.courseId;
}

export const curatedInsertSchema = createInsertSchema(curatedTable);
export const curatedSelectSchema = createSelectSchema(curatedTable);
