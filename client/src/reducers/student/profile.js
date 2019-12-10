import {
  STUDENT_GET_PROFILE,
  STUDENT_PROFILE_ERROR,
  STUDENT_CLEAR_PROFILE,
  STUDENT_UPDATE_PROFILE,
  STUDENT_GET_PROFILES
} from "../../actions/student/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_GET_PROFILE:
    case STUDENT_UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case STUDENT_GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case STUDENT_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case STUDENT_CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
