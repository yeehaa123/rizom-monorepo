import type { Action } from "@offcourse/schema";
import type { OffcourseState } from "./store";
import { ActionType } from "@offcourse/schema";
import { CardModes } from "../types";
import { findCard, getCheckpoint } from "./helpers";
import { initialCardState, updateAffordances, updateUserRecord } from "./cardState";

export function reducer(state: OffcourseState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.COMPLETE_CHECKPOINT: {
      const card = findCard(state, payload);
      const { checkpointId } = payload;
      if (card) {
        card.cardState.completed = [...card.cardState.completed, checkpointId]
      }
      break;
    }
    case ActionType.UNCOMPLETE_CHECKPOINT: {
      const card = findCard(state, payload);
      const { checkpointId } = payload;
      if (card) {
        const completed = card.cardState.completed.filter(id => id !== checkpointId);
        card.cardState.completed = completed
      }
      break;
    }
    case ActionType.ADD_NOTE: {
      const card = findCard(state, payload);
      if (card) {
        const { notes } = card.cardState;
        card.cardState.notes = [payload, ...notes]
      }
      break;
    }
    case ActionType.ADD_BOOKMARK: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.isBookmarked = true
      }
      break;
    }
    case ActionType.REMOVE_BOOKMARK: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.isBookmarked = false
      }
      break;
    }
    case ActionType.SHOW_CHECKPOINT_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        const checkpoint = getCheckpoint(card, payload); if (checkpoint) {
          card.cardState.cardMode = CardModes.CHECKPOINT;
          card.cardState.selectedCheckpoint = checkpoint;
        }
      }
      break;
    }
    case ActionType.SHOW_AUTH_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.AUTH;
      }
      break;
    }
    case ActionType.SHOW_USER_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.USER;
      }
      break;
    }
    case ActionType.SHOW_SHARE_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.SHARE;
      }
      break;
    }
    case ActionType.SHOW_NOTES_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.NOTES;
      }
      break;
    }
    case ActionType.HIDE_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.NORMAL;
      }
      break;
    }
    case ActionType.UNSELECT_CHECKPOINT: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.selectedCheckpoint = undefined
      }
      break;
    }
    case ActionType.ADD_AUTH_DATA: {
      state.auth = payload
      state.cards.forEach(card => {
        card.cardState.userName = payload.userName;
        card.cardState.repository = payload.repository;
        card.cardState.cardMode = CardModes.NORMAL;
        card.cardState.affordances = updateAffordances(payload);
      })
      break;
    }
    case ActionType.LOG_OUT: {
      state.auth = undefined
      state.cards.forEach(card => {
        card.cardState = initialCardState;
      })
      break;
    }
    case ActionType.ADD_USER_DATA: {
      payload.map((record) => {
        const card = findCard(state, record);
        if (card) {
          card.cardState = updateUserRecord(card.cardState, record);
        }
      })
      break;
    }
  }
}
