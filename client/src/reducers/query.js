import {
    SET_QUERY,
  } from "../actions/types";
  
  const initialState = {
    query: '',
    date: '',
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_QUERY:
        return {
            ...state,
            query: payload.query,
            date: payload.date,
        };
      default:
        return state;
    }
  }
  