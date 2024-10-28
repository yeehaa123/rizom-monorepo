import { Query, QueryType } from '@offcourse/schema';
import { ResponseType } from '@offcourse/schema';
import { getUserRecords } from './models/userRecord';
import { getCourses } from './models/course';
import { getRepositoryEntry } from './models/repository';

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
    case QueryType.FETCH_USER_COURSES: {
      const courses = await getCourses();
      return {
        type: ResponseType.FETCHED_USER_COURSES,
        payload: courses
      }
    }
    case QueryType.GET_REGISTRY_METADATA: {
      const courses = await getCourses();
      return {
        type: ResponseType.RETRIEVED_REPOSITORY_METADATA,
        payload: {
          alias: "Yeehaa",
          repository: "https://yeehaa.io/offcourse",
          curator: "Jan Hein Hoogstad",
          description: "I am an entrepreneur, thinker, and coder. Nowadays, I like to call myself an ecosystem architect. Concretely, this means that I bring people together around common values, discover a shared vision, and translate this into effective ecosystems.",
          socials: {
            linkedin: "https://www.linkedin.com/in/yeehaa/",
            github: "https://www.github.com/yeehaa123/",
            instagram: "https://www.instagram.com/yeehaa12345/"
          },
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
