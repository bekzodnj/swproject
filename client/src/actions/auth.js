import axios from "axios";
import { setAlert } from "./alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_EVENTS,
  CLEAR_NEW_EVENTS
} from "./types";

import { STUDENT_CLEAR_PROFILE, STUDENT_LOGOUT } from "./student/types";

import setAuthToken from "../utils/setAuthToken";

//
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register user
export const register = ({
  name,
  email,
  password,
  secretQuestion,
  secretAnswer,
  role
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    secretQuestion,
    secretAnswer,
    role
  });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.erorrs;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// password recovery
export const pass_recovery = (
  email,
  secretQuestion,
  secretAnswer,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, secretQuestion, secretAnswer });

  try {
    const res = await axios.post("/api/auth/recovery", body, config);

    history.push("/recovery/reset");
    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// reset password
export const reset_password = (
  hash,
  new_password,
  confirm_new_password,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ hash, new_password, confirm_new_password });

  try {
    const res = await axios.post("/api/auth/recovery/set", body, config);

    history.push("/dashboard");
    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    // todo create reset reducer name
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_EVENTS });
  dispatch({ type: CLEAR_NEW_EVENTS });
  dispatch({ type: LOGOUT });
  dispatch({ type: STUDENT_LOGOUT });
  dispatch({ type: STUDENT_CLEAR_PROFILE });
};
