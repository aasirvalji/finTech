import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import entry from "./entry";

export default combineReducers({
  auth,
  alert, 
  entry
});
