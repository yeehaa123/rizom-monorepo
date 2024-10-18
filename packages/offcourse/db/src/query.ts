import { Query, QueryType } from '@offcourse/schema';
import { ResponseType } from '@offcourse/schema';
import { getUserRecords } from './models/userRecord';
import { getCourses } from './models/course';
import { getRepositoryEntry } from './models/repository';

export async function handleQuery(query: Query) {
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
    case QueryType.GET_REGISTRY_FROM_OAUTH: {
      const entry = await getRepositoryEntry(payload);

      return entry
        ? {
          type: ResponseType.RETRIEVED_REGISTRY_ENTRY,
          payload: entry
        }
        : {
          type: ResponseType.REGISTRY_ENTRY_NOT_FOUND,
          payload: undefined
        }
    }
    default: {
      return {
        type: ResponseType.NO_OP,
        payload: undefined
      }
    }
  }
}
