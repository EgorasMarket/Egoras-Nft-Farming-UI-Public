import axios from "axios";
import {
  GET_NEW_PRODUCTS_ROUTE,
  POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE,
} from "../core/ApiRoutes";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const DISPLAY_NEW_PRODUCTS_CALL = async () => {
  try {
    const response = await axios.get(GET_NEW_PRODUCTS_ROUTE, null, config);

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const POPULATE_ADMIN_PRODUCT_DASHBOARD = async () => {
  try {
    const response = await axios.get(
      POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE,
      null,
      config
    );

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
