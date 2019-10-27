import { GET_EVENTS, UPDATE_EVENTS } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return [...state];

    case UPDATE_EVENTS:
      return [...state, payload];

    default:
      return state;
  }
}
