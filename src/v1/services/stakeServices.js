import axios from "axios";
import {
  GET_ALL_UPLOADED_PRODUCTS_ROUTE,
  GET_TVL_CHART,
  GET_TVL_CHART_ROUTE,
  GET_TVL_ROUTE,
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
    return err.response;
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
export const GET_TVL = async () => {
  try {
    const response = await axios.get(`${GET_TVL_ROUTE}`, null, config);
    return response.data.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const GET_CHART_TVL = async () => {
  try {
    const response = await axios.get(`${GET_TVL_CHART_ROUTE}`, null, config);
    return response.data.data;
  } catch (err) {
    return err.repsonse;
  }
};
