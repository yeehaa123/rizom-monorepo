import type { Course, CourseQuery, CoursesQuery } from "@offcourse/schema";
import { db } from "../";
import { eq, inArray } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { bookmarkTable } from "../schema"
import { insertCourse } from "./course";


export const getBookmarks = async ({ courseIds }: CoursesQuery) => {
  console.log(courseIds);
  return await db
    .select()
    .from(bookmarkTable)
    .where(inArray(bookmarkTable.courseId, courseIds))
    .all();
}

export const insertBookmark = async (courseQuery: CourseQuery) => {
  const bookmarkedAt = new Date()
  const value = bookmarkInsertSchema.parse({ ...courseQuery, bookmarkedAt });
  await db.insert(bookmarkTable).values(value).onConflictDoNothing()
  return bookmarkedAt;
}

export const deleteBookmark = async (courseQuery: CourseQuery) => {
  try {
    await db.delete(bookmarkTable)
      .where(eq(bookmarkTable.courseId, courseQuery.courseId))
  } catch (e) {
    console.log("DELETE BOOKMARK ERROR", e);
  }
}

export const toggleBookmark = async (course: Course) => {
  const data = await db.select()
    .from(bookmarkTable)
    .where(eq(bookmarkTable.courseId, course.courseId))
  if (data[0]) {
    deleteBookmark(course)
    return;
  }
  insertBookmark(course)
  insertCourse(course)
  return course.courseId;
}

export const insertBookmarkedCourse = async (course: Course) => {
  insertBookmark(course)
  insertCourse(course)
  return course.courseId;
}

export const bookmarkInsertSchema = createInsertSchema(bookmarkTable);
export const bookmarkSelectSchema = createSelectSchema(bookmarkTable);
