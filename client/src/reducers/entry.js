import {
    CREATE_ENTRY, 
    GET_ENTRIES, 
    GET_ENTRY
  } from "../actions/types";
  
  const initialState = {
    entries: [],
    entry: null,
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
      case GET_ENTRIES:
        return {
          ...state,
          entries: payload,
          loading: false,
        };
      case GET_ENTRY:
        return {
          ...state,
          entry: payload,
          loading: false,
        };
      case CREATE_ENTRY:
        return {
          ...state,
          entries: [payload, ...state.entries],
          loading: false,
        };
      default:
        return state;
    }
  }
  