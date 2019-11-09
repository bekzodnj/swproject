import { GET_EVENTS, UPDATE_EVENTS } from "./types";

// get all events
export const getEvents = () => async dispatch => {
  try {
    dispatch({
      type: GET_EVENTS
    });
  } catch (err) {}
};

// update events object
export const updateEvents = (start, end) => async dispatch => {
  try {
    const title = window.prompt("New Event name");

    //if not empty then create new event
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
