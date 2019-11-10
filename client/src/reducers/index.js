import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import events from "./events";
import new_events from "./new_events";

export default combineReducers({
  alert,
  auth,
  profile,
  events,
  new_events
});
