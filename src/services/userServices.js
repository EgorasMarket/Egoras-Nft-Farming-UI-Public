import axios from "axios";
import { CHECK_USER_AND_MEMBERSHIP, ADD_USER_ADDRESS } from "../core/ApiRoutes";
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
