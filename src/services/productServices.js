import axios from "axios";
import {
  GET_ALL_UPLOADED_PRODUCTS_ROUTE,
  FETCH_PRODUCT_BRANDS,
  FETCH_PRODUCT_CATEGORIES,
  ACCEPT_OR_DECLINE_BID,
  FETCH_USER_NEW_PRODUCT,
} from "../core/ApiRoutes";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const GET_ALL_UPLOADED_PRODUCTS = async () => {
  try {
    const response = await axios.get(
      GET_ALL_UPLOADED_PRODUCTS_ROUTE,
      null,
      config
    );

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const GET_BRANDS = async () => {
  try {
    const response = await axios.get(FETCH_PRODUCT_BRANDS, null, config);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const GET_CATEGORIES = async () => {
  try {
    const response = await axios.get(FETCH_PRODUCT_CATEGORIES, null, config);

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const DISPLAY_NEW_USER_PRODUCTS_CALL = async (account) => {
  console.log("____HHHH_____");
  try {
    const response = await axios.get(
      FETCH_USER_NEW_PRODUCT + "/" + account,
      null,
      config
    );
    console.log(response);

    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const ACCEPT_BID = async (account, saleDetails, action) => {
  // console.log(account, saleDetails, action);
  // console.log(`${ACCEPT_OR_DECLINE_BID}/${account}/${saleDetails}/${action}`);
  try {
    console.log("ffffssss");
    const response = await axios.get(
      ACCEPT_OR_DECLINE_BID + "/" + account + "/" + saleDetails + "/" + action,
      null,
      config
    );
    console.log(response);

    return response.data;
  } catch (err) {
    console.log(err.repsonse);
    return err.repsonse;
  }
};
