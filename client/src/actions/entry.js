import axios from "axios";
import { setAlert } from "./alert";
import {
 GET_ENTRIES,
 CREATE_ENTRY, 
 GET_ENTRY,
 ENTRY_ERROR,
 GET_PROFILE,
 CLEAR_PROFILE
} from "./types";

import { getCurrentProfile } from './profile'

// Get posts
export const getEntries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/entries");

    dispatch({
      type: GET_ENTRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ENTRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addEntry = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    console.log(formData, 'reached')
    const res = await axios.post("/api/entries", formData, config);
    console.log(res.data)
    dispatch({
      type: CREATE_ENTRY,
      payload: res.data,
    });

    // causes profile refetch on profile-dependent pages
    dispatch({
      type: CLEAR_PROFILE,
    });
    // getCurrentProfile();

    dispatch(setAlert("Entry Created", "success"));
  } catch (err) {
    dispatch({
      type: ENTRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getEntry = (formData) => async (dispatch) => {

}

// // Get post
// export const getPost = (id) => async (dispatch) => {
//   //id of the post
//   try {
//     const res = await axios.get(`/api/posts/${id}`);

//     dispatch({
//       type: GET_POST,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

