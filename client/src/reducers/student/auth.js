import {
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_USER_LOADED,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STUDENT_ACCOUNT_DELETED
} from "../../actions/student/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  student: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        student: payload
      };

    case STUDENT_REGISTER_SUCCESS:
    case STUDENT_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case STUDENT_REGISTER_FAIL:
    case STUDENT_AUTH_ERROR:
    case STUDENT_LOGIN_FAIL:
    case STUDENT_LOGOUT:
    case STUDENT_ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
