import { CollectionType, Query, QueryType } from '@offcourse/schema';
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
    case QueryType.enum.FETCH_USER_RECORDS: {
      if (isAuthorized) {
        const userRecords = await getUserRecords(payload);
        return {
          type: ResponseType.enum.FETCHED_USER_RECORDS,
          payload: userRecords
        }
      }
      return {
        type: ResponseType.enum.NO_OP,
        payload: undefined
      }
    }
    case QueryType.enum.GET_COURSES: {
      const courses = await {
        [CollectionType.enum.ALL]: getCourses,
        [CollectionType.enum.CURATED]: getCuratedCourses,
        [CollectionType.enum.FOLLOWED]: getFollowedCourses,
        [CollectionType.enum.BOOKMARKED]: getBookmarkedCourses
      }[payload]()
      return {
        type: ResponseType.enum.RETRIEVED_COURSES,
        payload: courses
      }
    }
    case QueryType.enum.GET_REGISTRY_METADATA: {
      const courses = await getCourses();
      const meta = await getMetaEntry();
      return {
        type: ResponseType.enum.RETRIEVED_REPOSITORY_METADATA,
        payload: {
          ...payload,
          ...meta,
          coursesCurated: courses.slice(0, 3),
          coursesFollowed: courses.slice(3, 6)
        }
      }
    }
    case QueryType.enum.GET_REGISTRY_FROM_OAUTH: {
      const entry = await getRepositoryEntry(payload);
      return entry
        ? {
          type: ResponseType.enum.RETRIEVED_REGISTRY_ENTRY,
          payload: entry
        }
        : {
          type: ResponseType.enum.REGISTRY_ENTRY_NOT_FOUND,
          payload: undefined
        }
    }
  }
}
