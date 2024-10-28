import type { CourseCardState } from "@/types"
import type { Course, CourseQuery, CheckpointQuery, AuthState, Note, RepositoryMetaData } from "@offcourse/schema";
import { ActionType } from "@offcourse/schema"
import { reducer } from "./reducer"
import { initialize } from "./cardState"
import { useImmerReducer } from 'use-immer';
import { query, command, findCard } from "./helpers";
import { QueryType } from "@offcourse/schema";
import { responder } from "./responder";
import { authenticate, logout, redirectToGitHub } from "./auth";
import { useEffect } from "react";

export type StoreCardState = Omit<CourseCardState, "actions" | "auth">

export type OffcourseState = {
  cards: StoreCardState[],
  auth: AuthState | undefined,
  repositories: RepositoryMetaData[]
}
export type OffcourseOptions = {}

export function useOffcourse(data: Course | Course[], { }: OffcourseOptions) {
  const [state, _dispatch] = useImmerReducer(reducer, data, initialize);
  const dispatch = command(state, _dispatch);
  const respond = responder(dispatch);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const authResponse = await authenticate();
    if (authResponse) {
      respond(authResponse);
      const payload = { courseIds: state.cards.map(({ courseId }) => courseId) }
      const response = await query({ type: QueryType.FETCH_USER_RECORDS, payload });
      respond(response);
    }
  }

  const toggleBookmark = (query: CourseQuery) => {
    const card = findCard(state, query);
    if (card) {
      dispatch({
        type: ActionType.TOGGLE_BOOKMARK, payload: card.course
      })
    }
  }

  const toggleCheckpoint = (query: CheckpointQuery) => {
    const card = findCard(state, query);
    if (card) {
      dispatch({
        type: ActionType.TOGGLE_CHECKPOINT,
        payload: {
          ...card.course,
          checkpointId: query.checkpointId
        }
      })
    }
  }

  const showCuratorOverlay = async (arg: CourseQuery) => {
    const card = findCard(state, arg);
    if (card) {
      const response = await query({
        type: QueryType.GET_REGISTRY_METADATA,
        payload: {
          repository: "http://localhost:4321/offcourse"
        }
        // payload: card.course.curator
      });
      respond(response);
      dispatch({
        type: ActionType.SHOW_CURATOR_OVERLAY, payload: arg
      })
    }
  }

  const signOut = async () => {
    const response = await logout();
    respond(response);
    const { origin, pathname } = window.location;
    window.location.href = `${origin}${pathname}`;
  }

  const showCheckpointOverlay = (payload: CheckpointQuery) =>
    dispatch({ type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload })

  const showAuthOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_AUTH_OVERLAY, payload })

  const showUserOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_USER_OVERLAY, payload })


  const showShareOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_SHARE_OVERLAY, payload })

  const showNotesOverlay = (payload: CourseQuery) =>
    // get note then show...
    dispatch({ type: ActionType.SHOW_NOTES_OVERLAY, payload })

  const hideOverlay = async (payload: CourseQuery) =>
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })

  const addNote = (payload: CourseQuery & Note) =>
    dispatch({ type: ActionType.ADD_NOTE, payload })

  const signIn = async (query: CourseQuery) => redirectToGitHub(query)

  const actions = {
    addNote,
    toggleBookmark,
    toggleCheckpoint,
    signIn,
    signOut,
    hideOverlay,
    showAuthOverlay,
    showUserOverlay,
    showNotesOverlay,
    showCheckpointOverlay,
    showCuratorOverlay,
    showShareOverlay,
  }

  return { state, actions }
}
