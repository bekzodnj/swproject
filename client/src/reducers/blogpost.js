import { GET_POSTS, UPDATE_POST, CLEAR_POSTS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return payload;

    case UPDATE_POST:
      return [...state, payload];

    case CLEAR_POSTS:
      return [];

    default:
      return state;
  }
}
