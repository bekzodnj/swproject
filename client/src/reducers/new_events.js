import {
  GET_NEW_EVENTS,
  UPDATE_NEW_EVENTS,
  CLEAR_NEW_EVENTS
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NEW_EVENTS:
      return [...state];

    case UPDATE_NEW_EVENTS:
      return [...state, payload];

    case CLEAR_NEW_EVENTS:
      return [];

    default:
      return state;
  }
}
