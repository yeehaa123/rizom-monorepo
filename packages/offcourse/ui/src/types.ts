import type {
  Course,
  CourseQuery,
  CheckpointQuery,
  AuthState,
  Checkpoint as CheckpointType,
  Note,
  RepositoryMetaData
} from "@offcourse/schema";

export enum CardModes {
  NORMAL = "NONE",
  AUTH = "AUTH",
  CURATOR = "CURATOR",
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
  showCuratorOverlay: (arg: CourseQuery) => void
  showNotesOverlay: (arg: CourseQuery) => void
  hideOverlay: (arg: CourseQuery) => void
  addNote: (arg: Note & CourseQuery & { checkpointId?: string }) => void;
}

export type CourseCardState = {
  courseId: string,
  course: Course,
  cardState: CardState,
  repository: RepositoryMetaData | undefined,
  auth: AuthState | undefined,
  actions: CardActions
}
