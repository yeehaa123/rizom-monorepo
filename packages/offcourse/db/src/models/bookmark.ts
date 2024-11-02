import type { Course, CourseQuery, CoursesQuery } from "@offcourse/schema";
import { db } from "../";
import { eq, inArray } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { bookmarkTable } from "../schema"
import { getCourses, insertCourse } from "./course";

export const getBookmarkedCourses = async () => {
  const data = await db
    .select()
    .from(bookmarkTable)
  const courseIds = data.map(({ courseId }) => courseId);
  return await getCourses({ courseIds });
}

export const getBookmarks = ({ courseIds }: CoursesQuery) => {
  return db.select()
    .from(bookmarkTable)
    .where(inArray(bookmarkTable.courseId, courseIds))
    .all();
}

export const getBookmark = ({ courseId }: CourseQuery) => {
  return db.select()
    .from(bookmarkTable)
    .where(eq(bookmarkTable.courseId, courseId))
}

export const insertBookmark = (courseQuery: CourseQuery) => {
  const bookmarkedAt = new Date()
  const value = bookmarkInsertSchema.parse({ ...courseQuery, bookmarkedAt });
  return db.insert(bookmarkTable)
    .values(value)
    .onConflictDoNothing()
}


export const insertBookmarkedCourse = (course: Course) => {
  return db.batch([
    insertCourse(course),
    insertBookmark(course)
  ]);
}

export const deleteBookmark = (courseQuery: CourseQuery) => {
  return db.delete(bookmarkTable)
    .where(eq(bookmarkTable.courseId, courseQuery.courseId))
}

export const toggleBookmark = async (course: Course) => {
  const data = await getBookmark(course);
  try {
    if (data[0]) {
      await deleteBookmark(course)
      return;
    }

    await insertBookmarkedCourse(course);
    return course.courseId;
  } catch (e) {
    console.log("DELETE BOOKMARK ERROR", e);
  }
}

export const bookmarkInsertSchema = createInsertSchema(bookmarkTable);
export const bookmarkSelectSchema = createSelectSchema(bookmarkTable);
