import { GET_EVENTS, UPDATE_EVENTS, CLEAR_EVENTS } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return payload;

    case UPDATE_EVENTS:
      return [...state, payload];

    case CLEAR_EVENTS:
      return [];

    default:
      return state;
  }
}
