import { querySchema, QueryType } from '@offcourse/schema';
import { ResponseType } from '@offcourse/schema';
import { getUserRecords } from './models/userRecord';
import { getCourses } from './models/course';

export async function handleQuery(body: string) {
  const query = querySchema.parse(body);
  const { type, payload } = query;
  switch (type) {
    case QueryType.FETCH_USER_RECORDS: {
      const userRecords = await getUserRecords(payload);
      return {
        type: ResponseType.FETCHED_USER_RECORDS,
        payload: userRecords
      }
    }
    case QueryType.FETCH_USER_COURSES: {
      const courses = await getCourses();
      return {
        type: ResponseType.FETCHED_USER_COURSES,
        payload: courses
      }
    }
  }
}
