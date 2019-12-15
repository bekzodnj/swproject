import {
  GET_TEACHERS,
  UPDATE_TEACHERS,
  CLEAR_TEACHERS
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEACHERS:
      return payload;

    case UPDATE_TEACHERS:
      return [...state, payload];

    case CLEAR_TEACHERS:
      return [];

    default:
      return state;
  }
}
