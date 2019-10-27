import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import events from "./events";

export default combineReducers({
  alert,
  auth,
  profile,
  events
});
