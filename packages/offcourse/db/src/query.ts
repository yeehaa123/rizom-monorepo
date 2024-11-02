import { Query, QueryType } from '@offcourse/schema';
import { ResponseType } from '@offcourse/schema';
import { getUserRecords } from './models/userRecord';
import { getCourses } from './models/course';
import { getRepositoryEntry } from './models/repository';
import { getMetaEntry } from './models/meta';
import { getCuratedCourses } from './models/curated';
import { getBookmarkedCourses } from './models/bookmark';
import { getFollowedCourses } from './models/completion';

export async function handleQuery(query: Query, isAuthorized: boolean) {
  const { type, payload } = query;
  switch (type) {
    case QueryType.FETCH_USER_RECORDS: {
      if (isAuthorized) {
        const userRecords = await getUserRecords(payload);
        return {
          type: ResponseType.FETCHED_USER_RECORDS,
          payload: userRecords
        }
      }
    }
    case QueryType.GET_CURATED_COURSES: {
      const courses = await getCuratedCourses();
      return {
        type: ResponseType.RETRIEVED_COURSES,
        payload: courses
      }
    }
    case QueryType.GET_ALL_COURSES: {
      const courses = await getCourses();
      return {
        type: ResponseType.RETRIEVED_COURSES,
        payload: courses
      }
    }
    case QueryType.GET_FOLLOWED_COURSES: {
      const courses = await getFollowedCourses();
      return {
        type: ResponseType.RETRIEVED_COURSES,
        payload: courses
      }
    }
    case QueryType.GET_BOOKMARKED_COURSES: {
      const courses = await getBookmarkedCourses();
      return {
        type: ResponseType.RETRIEVED_COURSES,
        payload: courses
      }
    }
    case QueryType.GET_REGISTRY_METADATA: {
      const courses = await getCourses();
      const meta = await getMetaEntry();
      return {
        type: ResponseType.RETRIEVED_REPOSITORY_METADATA,
        payload: {
          ...payload,
          ...meta,
          coursesCurated: courses.slice(0, 3),
          coursesFollowed: courses.slice(3, 6)
        }
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
