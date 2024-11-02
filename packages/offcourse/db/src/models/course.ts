import type { Course, CoursesQuery } from "@offcourse/schema";
import { courseTable } from "../schema"
import { db } from "../";
import { inArray } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const _getCourses = (args?: CoursesQuery) => {
  return args
    ? db.select()
      .from(courseTable)
      .where(inArray(courseTable.courseId, args.courseIds))
    : db.select()
      .from(courseTable)
}

export const getCourses = async (args?: CoursesQuery) => {
  const data = await _getCourses(args);
  return data.map(({ course }) => course);
}

export const insertCourse = (course: Course) => {
  const { curator, courseId } = course;
  return db.insert(courseTable).values({
    courseId,
    curator: curator.alias,
    course
  }).onConflictDoNothing()
}

export const courseInsertSchema = createInsertSchema(courseTable);
export const courseSelectSchema = createSelectSchema(courseTable);
