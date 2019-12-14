import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_SERVICES,
  UPDATE_SERVICES,
  GET_ENROLLED,
  UPDATE_ENROLLED,
  CLEAR_ENROLLED
} from "./types";

// get all events
export const getServices = () => async dispatch => {
  try {
    const res = await axios.get("/api/services/me");

    dispatch({
      type: GET_SERVICES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// for student viewing
export const getAllServices = () => async dispatch => {
  try {
    const res = await axios.get("/api/services");

    dispatch({
      type: GET_SERVICES,
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
export const updateServices = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/services", formData, config);

    dispatch({
      type: UPDATE_SERVICES,
      payload: res.data
    });

    history.push("/services");
    dispatch(setAlert("Event created", "success"));

    dispatch({
      type: GET_SERVICES
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// export const editServices = (formData, event_id, history) => async dispatch => {
//   try {
//     if (formData.title) {
//       const config = {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       };

//       const res = await axios.post(
//         `/api/events/edit/${event_id}`,
//         formData,
//         config
//       );

//       dispatch({
//         type: GET_EVENTS,
//         payload: res.data
//       });

//       history.push("/dashboard");
//       dispatch(setAlert("Event edited", "success"));

//       dispatch({
//         type: CLEAR_NEW_EVENTS
//       });

//       dispatch({
//         type: GET_EVENTS
//       });
//     }
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
//     }
//   }
// };

// delete event
export const deleteService = id => async dispatch => {
  try {
    let res = window.confirm("Are you sure?");

    if (res) {
      await axios.delete(`/api/services/${id}`);
      const res = await axios.get("/api/services/me");

      dispatch({
        type: GET_SERVICES,
        payload: res.data
      });

      dispatch(setAlert("Event deleted", "success"));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

/////////////////// enrolled

// Create an event=update events object
export const createEnrolled = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // console.log(formData);

    const res = await axios.post("/api/enrolled", formData, config);

    dispatch({
      type: UPDATE_ENROLLED,
      payload: res.data
    });

    history.push("/student-dashboard");
    dispatch(setAlert("Enrollment created", "success"));

    dispatch({
      type: GET_ENROLLED
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// student view enrols by him
export const getEnrolled = () => async dispatch => {
  try {
    const res = await axios.get("/api/enrolled/me");

    dispatch({
      type: GET_ENROLLED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// teacher view enrols by him
export const getEnrolledTeacher = () => async dispatch => {
  try {
    const res = await axios.get("/api/enrolled/teacher/me");

    dispatch({
      type: GET_ENROLLED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }
  }
};

// // temp buffer events in calendar
// export const getNewEvents = () => async dispatch => {
//   try {
//     dispatch({
//       type: GET_NEW_EVENTS
//     });
//   } catch (err) {}
// };

// // temporary buffer events in calendar
// export const updateNewEvents = (start, end) => async dispatch => {
//   try {
//     const title = "New Event";

//     //if not empty then create new event
//     if (title) {
//       const res = {
//         title,
//         start,
//         end
//       };
//       console.log("action", res);
//       dispatch({
//         type: UPDATE_NEW_EVENTS,
//         payload: res
//       });

//       dispatch({
//         type: GET_NEW_EVENTS
//       });
//     }
//   } catch (err) {}
// };
