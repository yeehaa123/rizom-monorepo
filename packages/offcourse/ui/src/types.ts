import type {
  Course,
  CourseQuery,
  CheckpointQuery,
  AuthState,
  Checkpoint as CheckpointType,
  Note
} from "@offcourse/schema";

export enum CardModes {
  NORMAL = "NONE",
  AUTH = "AUTH",
  USER = "USER",
  CHECKPOINT = "CHECKPOINT",
  NOTES = "NOTES",
  SHARE = "SHARE"
}

export type Affordances = {
  canAuthenticate: boolean,
  canBookmark: boolean,
  canFollow: boolean,
  canAnnotate: boolean,
}

export type CardState = {
  userName: string | undefined,
  repository: string | undefined,
  isBookmarked: boolean,
  isFollowed: boolean,
  completed: string[],
  notes: Note[],
  cardMode: CardModes,
  selectedCheckpoint: CheckpointType | undefined,
  affordances: Affordances,
}

export type CardActions = {
  signIn: (arg: CourseQuery) => void,
  signOut: () => void,
  toggleBookmark: (arg: CourseQuery) => void,
  toggleCheckpoint: (arg: CheckpointQuery) => void,
  showCheckpointOverlay: (arg: CheckpointQuery) => void
  showAuthOverlay: (arg: CourseQuery) => void
  showShareOverlay: (arg: CourseQuery) => void
  showUserOverlay: (arg: CourseQuery) => void
  showNotesOverlay: (arg: CourseQuery) => void
  hideOverlay: (arg: CourseQuery) => void
  hideCheckpointOverlay: (arg: CourseQuery) => void
  addNote: (arg: Note & CourseQuery) => void;
}

export type CourseCardState = {
  courseId: string,
  course: Course,
  cardState: CardState,
  authData?: AuthState,
  actions: CardActions
}
