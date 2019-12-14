import axios from "axios";
import { setAlert } from "../alert";

import {
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_USER_LOADED,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STUDENT_CLEAR_PROFILE
} from "../student/types";

import setAuthToken from "../../utils/setAuthToken";
import { CLEAR_PROFILE } from "../types";

//
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/studentsAuth");

    dispatch({
      type: STUDENT_USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STUDENT_AUTH_ERROR
    });
  }
};

// Register user
export const register = ({
  name,
  email,
  password,
  secretQuestion,
  secretAnswer
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
    secretAnswer
  });

  try {
    const res = await axios.post("/api/students", body, config);

    dispatch({
      type: STUDENT_REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.erorrs;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: STUDENT_REGISTER_FAIL
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
    const res = await axios.post("/api/studentsAuth", body, config);

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(el => dispatch(setAlert(el.msg, "danger")));
    }

    dispatch({
      type: STUDENT_LOGIN_FAIL
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
      type: STUDENT_LOGIN_FAIL
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
      type: STUDENT_LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: STUDENT_CLEAR_PROFILE });
  dispatch({ type: STUDENT_LOGOUT });
};
