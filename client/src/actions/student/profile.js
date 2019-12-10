import axios from "axios";
import { setAlert } from "../alert";

import {
  STUDENT_GET_PROFILE,
  STUDENT_GET_PROFILES,
  STUDENT_PROFILE_ERROR,
  STUDENT_UPDATE_PROFILE,
  STUDENT_CLEAR_PROFILE,
  STUDENT_ACCOUNT_DELETED
} from "../../actions/student/types";

// get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/studentProfile/me");

    dispatch({
      type: STUDENT_GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get  users profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: STUDENT_CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/studentProfile");

    dispatch({
      type: STUDENT_GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// creating new Profile or update with edit flag
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/studentProfile", formData, config);

    dispatch({
      type: STUDENT_GET_PROFILE,
      payload: res.data
    });

    if (!edit) {
      history.push("/studentDashboard");
    }
    dispatch(setAlert(edit ? "Profile edited" : "Profile created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// calling /profile/experience api
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: STUDENT_UPDATE_PROFILE,
      payload: res.data
    });

    history.push("/studentDashboard");

    dispatch(setAlert("Experience added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// adding Education
// calling /profile/experience api
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: STUDENT_UPDATE_PROFILE,
      payload: res.data
    });

    history.push("/studentDashboard");

    dispatch(setAlert("Education added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: STUDENT_UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: STUDENT_UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// delete education and profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This action can NOT be undone!")) {
    try {
      const res = await axios.delete(`/api/profile/`);

      dispatch({
        type: STUDENT_CLEAR_PROFILE
      });

      dispatch({
        type: STUDENT_ACCOUNT_DELETED
      });

      dispatch(setAlert("You account has been removed"));
    } catch (err) {
      dispatch({
        type: STUDENT_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
