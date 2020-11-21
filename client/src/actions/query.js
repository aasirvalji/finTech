import axios from "axios";
import { setAlert } from "./alert";
import {
  SET_QUERY,
  SET_DATE,
} from "./types";

// Get current users profile
export const setQuery = (data) => async (dispatch) => {
  try {
    console.log(data);
    // dispatch({
    //   type: SET_DATE,
    //   payload: data //returns profile data from backend
    // });
  } catch (err) {
    dispatch({
      type: SET_QUERY,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

