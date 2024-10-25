import type { Action } from "@offcourse/schema";
import type { OffcourseState } from "./store";
import { ActionType } from "@offcourse/schema";
import { CardModes } from "../types";
import { findCard, getCheckpoint } from "./helpers";
import { initialCardState, updateAffordances, updateUserRecord } from "./cardState";

export function reducer(state: OffcourseState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.TOGGLE_CHECKPOINT: {
      const card = findCard(state, payload);
      const { checkpointId } = payload;
      if (card) {
        const { affordances, completed } = card.cardState;
        if (!affordances.canFollow) {
          card.cardState.cardMode = CardModes.AUTH;
          break;
        }
        const isCompleted = completed.find(id => id === checkpointId)
        if (isCompleted) {
          const newCompleted = completed.filter(id => id !== checkpointId);
          card.cardState.completed = newCompleted
        } else {
          card.cardState.completed = [...card.cardState.completed, checkpointId]
        }
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
    case ActionType.TOGGLE_BOOKMARK: {
      const card = findCard(state, payload);
      if (card) {
        const { affordances } = card.cardState;
        if (!affordances.canFollow) {
          card.cardState.cardMode = CardModes.AUTH;
          break;
        }
        card.cardState.isBookmarked = !card.cardState.isBookmarked
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
    case ActionType.SHOW_CURATOR_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.CURATOR;
      }
      break;
    }
    case ActionType.SHOW_USER_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        const { affordances } = card.cardState;
        card.cardState.cardMode = affordances.canFollow ? CardModes.USER : CardModes.AUTH
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
        const { affordances } = card.cardState;
        card.cardState.cardMode = affordances.canFollow ? CardModes.NOTES : CardModes.AUTH
      }
      break;
    }
    case ActionType.HIDE_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.cardMode = CardModes.NORMAL;
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
