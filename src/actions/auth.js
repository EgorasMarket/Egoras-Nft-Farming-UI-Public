import axios from "axios";
// import { setAlert } from "./alert";
// import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

import { USER_LOADED, AUTH_ERROR, API_URL as api_url } from "./types";
// import setAuthToken from "../utils/setAuthToken";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  console.log(localStorage.WA_ST, "okkkkkkk");

  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }

  // const res = await axios.get(api_url2 + "/v1/user/info");
  // // //console.log(res, 'lllll');
  // // //console.log("Yes I call You because i can", res.data);
  // dispatch({
  //   type: USER_LOADED,
  //   payload: res.data,
  // });

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
    //console.log("not registered");
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
