import axios from "axios";
import {
  FETCH_TRADABLE_PRODUCTS_ROUTE,
  GET_NEW_PRODUCTS_ROUTE,
  POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE,
  GET_ALL_APPROVED_PRODUCTS_ROUTE,
  UPDATE_EXISTING_PRODUCT,
} from "../core/ApiRoutes";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const DISPLAY_NEW_PRODUCTS_CALL = async () => {
  try {
    const response = await axios.get(GET_NEW_PRODUCTS_ROUTE, null, config);
    console.log(response.data);
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

export const GET_ALL_APPROVED_PRODUCTS = async () => {
  try {
    const response = await axios.get(
      GET_ALL_APPROVED_PRODUCTS_ROUTE,
      null,
      config
    );

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const ADMIN_FETCH_TRADABLE_PRODUCTS = async () => {
  try {
    const response = await axios.get(
      FETCH_TRADABLE_PRODUCTS_ROUTE,
      null,
      config
    );

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const CALL_UPDATE_EXISTING_PRODUCT = async (formData) => {
  try {
    const response = await axios.put(UPDATE_EXISTING_PRODUCT, formData, config);

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
