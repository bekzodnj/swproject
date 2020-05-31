import { GET_SCHEDULE, CREATE_SCHEDULE } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCHEDULE:
      return payload;

    case CREATE_SCHEDULE:
      return [...state, payload];

    default:
      return state;
  }
}
