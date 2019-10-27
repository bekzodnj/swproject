import { GET_EVENTS, UPDATE_EVENTS } from "./types";

export const getEvents = () => async dispatch => {
  let a = 0;
  try {
    dispatch({
      type: GET_EVENTS
    });
  } catch (err) {}
};

export const updateEvents = (start, end) => async dispatch => {
  try {
    const title = window.prompt("New Event name");

    if (title) {
      const res = {
        title,
        start,
        end
      };

      dispatch({
        type: UPDATE_EVENTS,
        payload: res
      });

      dispatch({
        type: GET_EVENTS
      });
    }
  } catch (err) {}
};
