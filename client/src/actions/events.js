import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EVENTS,
  UPDATE_EVENTS,
  CLEAR_NEW_EVENTS,
  GET_NEW_EVENTS,
  UPDATE_NEW_EVENTS,
  EDIT_EVENTS
} from "./types";

// get all events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events/me");

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// Create an event=update events object
export const updateEvents = (
  formData,
  start,
  end,
  history
) => async dispatch => {
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
        payload: res.data
      });

      history.push("/dashboard");
      dispatch(setAlert("Event created", "success"));

      dispatch({
        type: CLEAR_NEW_EVENTS
      });

      dispatch({
        type: GET_EVENTS
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

export const editEvents = (formData, event_id, history) => async dispatch => {
  try {
    if (formData.title) {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post(
        `/api/events/edit/${event_id}`,
        formData,
        config
      );

      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });

      history.push("/dashboard");
      dispatch(setAlert("Event edited", "success"));

      dispatch({
        type: CLEAR_NEW_EVENTS
      });

      dispatch({
        type: GET_EVENTS
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// delete event
export const deleteEvent = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/events/${id}`);

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });

    history.push("/dashboard");
    dispatch(setAlert("Event deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// temp buffer events in calendar
export const getNewEvents = () => async dispatch => {
  try {
    dispatch({
      type: GET_NEW_EVENTS
    });
  } catch (err) {}
};

// temporary buffer events in calendar
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
