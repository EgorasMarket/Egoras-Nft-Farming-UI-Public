import axios from "axios";
import {
  FETCH_TRADABLE_PRODUCTS_ROUTE,
  GET_NEW_PRODUCTS_ROUTE,
  POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE,
  UPDATE_EXISTING_PRODUCT,
  ADMIN_PLACE_BID,
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

export const ADMIN_FETCH_TRADABLE_PRODUCTS = async () => {
  console.log("suik_____");
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

export const CALL_ADMIN_PLACE_BID = async (
  amount,
  admin_address,
  product_id
) => {
  const body = JSON.stringify({
    amount,
    admin_address,
    product_id,
  });
  // console.log(body);
  try {
    const response = await axios.post(ADMIN_PLACE_BID, body, config);
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err);
    return err.repsonse;
  }
};
