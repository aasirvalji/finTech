import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    //if token is in storage
    axios.defaults.headers.common["x-auth-token"] = token; //set axios header as token
  } else {
    delete axios.defaults.headers.common["x-auth-token"]; //else remove token from header
  }
};

export default setAuthToken;
