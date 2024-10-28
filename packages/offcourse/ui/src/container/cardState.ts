import type { Course, AuthState, UserRecord } from "@offcourse/schema";
import { CardModes, CardState } from "../types";
type OffCourseData = Course | Course[]

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}

const initialAffordances = {
  canAuthenticate: true,
  canBookmark: false,
  canFollow: false,
  canEdit: false,
  canAnnotate: false
}


export const initialCardState = {
  isBookmarked: false,
  isFollowed: false,
  isCurated: false,
  completed: [],
  notes: [],
  selectedCheckpoint: undefined,
  cardMode: CardModes.NORMAL,
  affordances: initialAffordances
}

export function updateAffordances(auth: AuthState) {
  if (auth) {
    return {
      ...initialAffordances,
      canBookmark: true,
      canFollow: true,
      canAnnotate: true
    }
  }
  return initialAffordances;
}

export function updateUserRecord(
  cardState: CardState,
  { isBookmarked, isFollowed, completed, notes }: UserRecord
) {
  return {
    ...cardState,
    isBookmarked,
    isFollowed,
    completed,
    notes,
  }
}

export function initialize(data: OffCourseData) {
  const courses = isCourse(data) ? [data] : [...data];
  const cards = courses.map(course => {
    return {
      courseId: course.courseId,
      repository: undefined,
      course,
      cardState: initialCardState
    }
  })
  return { cards, auth: undefined, repositories: [] };
}
