import axios from "axios";
import {
  GET_ALL_UPLOADED_PRODUCTS_ROUTE,
  FETCH_PRODUCT_BRANDS,
  FETCH_PRODUCT_CATEGORIES,
  ACCEPT_OR_DECLINE_BID,
  FETCH_USER_NEW_PRODUCT,
  GET_UPLOADED_PRODUCT_BY_ID_ROUTE,
  PROCESS_PRODUCT_ORDER_ROUTE,
  AI_IMAGES,
  AI_TEXT,
  INITIALIZE_DIRECT_PRODUCT,
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

export const GET_UPLOADED_PRODUCT_BY_ID = async (id) => {
  try {
    const response = await axios.get(
      `${GET_UPLOADED_PRODUCT_BY_ID_ROUTE}/${id}`,
      null,
      config
    );

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const PROCESS_PRODUCT_PURCHASE = async (user, productId) => {
  try {
    const response = await axios.post(
      `${PROCESS_PRODUCT_ORDER_ROUTE}`,
      {
        user,
        product_id: productId,
      },
      config
    );

    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};

export const CALL_INITIALIZE_DIRECT_PRODUCT = async (formData) => {
  console.log(formData);
  try {
    const response = await axios.post(
      `${INITIALIZE_DIRECT_PRODUCT}`,
      formData,
      config
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.repsonse);
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

export const CALL_AI_TEXT = async (content) => {
  console.log("____HHHH_____");
  const body = JSON.stringify({
    content,
  });
  try {
    const response = await axios.post(AI_TEXT, body, config);
    console.log(response);

    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const CALL_AI_IMAGES = async (content) => {
  console.log("____HHHH_____");
  const body = JSON.stringify({
    content,
  });
  try {
    const response = await axios.post(AI_IMAGES, body, config);
    console.log(response);

    return response.data;
  } catch (err) {
    return err.response;
  }
};
