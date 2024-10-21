import type { CourseCardState } from "@/types"
import type { Course, CourseQuery, CheckpointQuery, AuthState, Note } from "@offcourse/schema";
import { ActionType } from "@offcourse/schema"
import { reducer } from "./reducer"
import { initialize } from "./cardState"
import { useImmerReducer } from 'use-immer';
import { query, command, findCard } from "./helpers";
import { QueryType } from "@offcourse/schema";
import { responder } from "./responder";
import { authenticate, logout, redirectToGitHub } from "./auth";
import { useEffect } from "react";

export type StoreCardState = Omit<CourseCardState, "actions">
export type OffcourseState = {
  cards: StoreCardState[],
  auth: AuthState | undefined
}

export type Options = {
}

export function useOffcourse(data: Course | Course[], { }: Options) {
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

  const toggleBookmark = (payload: CourseQuery) => {
    const card = findCard(state, payload);
    if (card) {
      const { affordances } = card.cardState;
      const { canFollow } = affordances;
      if (!canFollow) {
        return showInfoOverlay(payload);
      }
      card.cardState.isBookmarked
        ? dispatch({ type: ActionType.REMOVE_BOOKMARK, payload })
        : dispatch({
          type: ActionType.ADD_BOOKMARK,
          payload: {
            ...payload,
            course: card.course
          }
        })
    }
  }

  const toggleCheckpoint = (payload: CheckpointQuery) => {
    const card = findCard(state, payload);
    const checkpointId = payload.checkpointId
    if (card) {
      const { completed, affordances } = card.cardState;
      const { canFollow } = affordances;
      if (!canFollow) {
        return showInfoOverlay(payload);
      }
      const isCompleted = completed.find(id => id === checkpointId)
      isCompleted
        ? dispatch({ type: ActionType.UNCOMPLETE_CHECKPOINT, payload })
        : dispatch({
          type: ActionType.COMPLETE_CHECKPOINT,
          payload: {
            ...payload,
            course: card.course
          }
        })
    }
  }

  const showCheckpointOverlay = (payload: CheckpointQuery) =>
    dispatch({ type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload })

  const showInfoOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_INFO_OVERLAY, payload })

  const showNotesOverlay = (payload: CourseQuery) => {
    const card = findCard(state, payload);
    if (card) {
      const { affordances } = card.cardState;
      const { canFollow } = affordances;
      if (!canFollow) {
        return showInfoOverlay(payload);
      }
      dispatch({ type: ActionType.SHOW_NOTES_OVERLAY, payload })
    }
  }

  const hideCheckpointOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
    dispatch({ type: ActionType.UNSELECT_CHECKPOINT, payload })
  }

  const hideOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
  }

  const addNote = (payload: CourseQuery & Note) => {
    dispatch({ type: ActionType.ADD_NOTE, payload })
  }

  const signIn = async (query: CourseQuery) => {
    redirectToGitHub(query)
  }

  const signOut = async () => {
    const response = await logout();
    respond(response);
    const { origin, pathname } = window.location;
    window.location.href = `${origin}${pathname}`;
  }

  const actions = {
    addNote,
    toggleBookmark,
    toggleCheckpoint,
    signIn,
    signOut,
    hideOverlay,
    showInfoOverlay,
    showNotesOverlay,
    showCheckpointOverlay,
    hideCheckpointOverlay
  }

  return { state, actions }
}
