import { GET_EVENTS, UPDATE_EVENTS } from "../actions/types";

const initialState = {
  events: [
    {
      title: "Read"
    }
  ]
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state
      };

    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload]
      };

    default:
      return state;
  }
}
