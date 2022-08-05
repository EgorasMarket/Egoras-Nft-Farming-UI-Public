import axios from "axios";
// import { setAlert } from "./alert";
// import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";
import DummyCall from "./token";
import { USER_LOADED, AUTH_ERROR, API_URL as api_url } from "./types";
// import setAuthToken from "../utils/setAuthToken";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = (account) => async (dispatch) => {
  console.log(localStorage.WA_ST, "okkkkkkk");
  console.log(account, "okkkkkkk");

  try {
    const res = await axios.get(
      api_url + "/api/user/fetch/user/by/address/" + localStorage.WA_ST
    );
    console.log(res);
    // //console.log("Yes I call You because i can", res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log("not registered");
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
