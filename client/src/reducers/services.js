import {
  GET_SERVICES,
  UPDATE_SERVICES,
  CLEAR_SERVICES
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES:
      return payload;

    case UPDATE_SERVICES:
      return [...state, payload];

    case CLEAR_SERVICES:
      return [];

    default:
      return state;
  }
}
