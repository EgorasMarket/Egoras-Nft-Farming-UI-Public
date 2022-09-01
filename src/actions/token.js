import axios from "axios";
import { API_URL as api_url } from "./types";
import { config } from "./Config";

const getAuthUserStats = async (account) => {
  try {
    let result;
    result = await axios.get(
      api_url + "/api/user/fetch/user/by/address/" + account,
      null,
      config
    );
    console.log(result);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
export { getAuthUserStats };
