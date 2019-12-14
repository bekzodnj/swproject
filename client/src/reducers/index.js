import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import events from "./events";
import services from "./services";
import enrolled from "./enrolled";

import new_events from "./new_events";
import student_auth from "./student/auth";
import student_profile from "./student/profile";

export default combineReducers({
  alert,
  auth,
  profile,
  events,
  services,
  enrolled,

  new_events,
  student_auth,
  student_profile
});
