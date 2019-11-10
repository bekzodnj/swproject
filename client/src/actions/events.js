import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EVENTS,
  UPDATE_EVENTS,
  SAVE_EVENTS,
  GET_NEW_EVENTS,
  UPDATE_NEW_EVENTS
} from "./types";

// get all events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events/me");

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {}
};

// update events object
export const updateEvents = (formData, start, end) => async dispatch => {
  try {
    // const title = window.prompt("New Event name");

    //if not empty then create new event
    if (formData.title) {
      const data = {
        ...formData,
        start,
        end
      };
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post("/api/events", data, config);

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

//
export const getNewEvents = () => async dispatch => {
  try {
    dispatch({
      type: GET_NEW_EVENTS
    });
  } catch (err) {}
};

//
export const updateNewEvents = (start, end) => async dispatch => {
  try {
    const title = "New Event";

    //if not empty then create new event
    if (title) {
      const res = {
        title,
        start,
        end
      };
      console.log("action", res);
      dispatch({
        type: UPDATE_NEW_EVENTS,
        payload: res
      });

      dispatch({
        type: GET_NEW_EVENTS
      });
    }
  } catch (err) {}
};
