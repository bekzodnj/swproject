import {
  GET_ENROLLED,
  UPDATE_ENROLLED,
  CLEAR_ENROLLED
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ENROLLED:
      return payload;

    case UPDATE_ENROLLED:
      return [...state, payload];

    case CLEAR_ENROLLED:
      return [];

    default:
      return state;
  }
}
