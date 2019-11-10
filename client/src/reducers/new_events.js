import {
  GET_NEW_EVENTS,
  UPDATE_NEW_EVENTS,
  SAVE_EVENT
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NEW_EVENTS:
      return [...state];

    case UPDATE_NEW_EVENTS:
      return [...state, payload];

    default:
      return state;
  }
}
