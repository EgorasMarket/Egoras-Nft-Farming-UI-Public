import axios from "axios";
import {
  GET_ALL_UPLOADED_PRODUCTS_ROUTE,
  POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE,
  POPULATE_STAKE_INFO_ROUTE,
} from "../core/ApiRoutes";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const POPULATE_STAKE_INFO = async (user) => {
  try {
    const response = await axios.get(
      `${POPULATE_STAKE_INFO_ROUTE}/${user}`,
      null,
      config
    );
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const POPULATE_STAKE_GENERAL_INFO = async () => {
  try {
    const response = await axios.get(
      `${POPULATE_STAKE_INFO_ROUTE}`,
      null,
      config
    );
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
