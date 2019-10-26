import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
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

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    if (!edit) {
      history.push("/dashboard");
    }
    dispatch(setAlert(edit ? "Profile edited" : "Profile created", "success"));
  } catch (err) {
    const errors = err.response.data.erorrs;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// calling /profile/experience api
export const addExperience = (formData, history) = async dispatch =>{
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });


    history.push("/dashboard");

    dispatch(setAlert('Experience added', 'success'));
  } catch (err) {
    const errors = err.response.data.erorrs;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// adding Education
// calling /profile/experience api
export const addEducation = (formData, history) = async dispatch =>{
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });


    history.push("/dashboard");

    dispatch(setAlert('Education added', 'success'));
  } catch (err) {
    const errors = err.response.data.erorrs;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}