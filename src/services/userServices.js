import axios from "axios";
import {
  CHECK_USER_AND_MEMBERSHIP,
  ADD_USER_ADDRESS,
  UPDATE_MY_PROFILE,
  LOCATION_API,
} from "../core/ApiRoutes";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CALL_ADD_USER_ADDRESS = async (user) => {
  try {
    const body = JSON.stringify({
      userAddress: user,
    });
    const response = await axios.post(`${ADD_USER_ADDRESS}`, body, config);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const CALL_CHECK_USER_AND_MEMBERSHIP = async (user) => {
  try {
    const response = await axios.get(
      `${CHECK_USER_AND_MEMBERSHIP}/${user}`,
      null,
      config
    );
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const CALL_UPDATE_MY_PROFILE = async (payload) => {
  console.log(payload);
  try {
    const response = await axios.post(`${UPDATE_MY_PROFILE}`, payload, config);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const CALL_GET_USER_LOCATION = async () => {
  let lc = localStorage.getItem("mTYx");
  console.log(lc);
  try {
    const response = await axios.get(`${LOCATION_API}`, null, config);
    console.log(response.data.country_code);

    localStorage.setItem("mTYx", response.data.country_name);
    return response.data;
  } catch (err) {
    console.log(err);
    localStorage.setItem("mTYx", "!Nigeria");
    return err.response;
  }
};
