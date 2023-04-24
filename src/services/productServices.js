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
  GET_USERS_BUY_ORDER_ROUTE,
  GET_USERS_SELL_ORDER_ROUTE,
  SELLER_MARK_AS_SHIPPED_ROUTE,
  BUYER_MARK_PRODUCT_AS_RECIEVED,
  USER_INDIRECT_PRODUCTS_STATS,
  USER_INDIRECT_BUY_ORDER,
  SELLER_LOCKED_FUNDS,
  EXPRESS_BUY_ORDER_STATS,
  USER_DIRECT_PRODUCTS,
  FETCH_USER_NEW_DIRECT_PRODUCT,
  // DIRECT_BUY_ORDER_STATS,
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
export const FETCH_USER_BUY_ORDER = async (account) => {
  try {
    const response = await axios.get(`${GET_USERS_BUY_ORDER_ROUTE}/${account}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return err.repsonse;
  }
};
export const CALL_USER_INDIRECT_PRODUCTS_STATS = async (account) => {
  try {
    const response = await axios.get(
      `${USER_INDIRECT_PRODUCTS_STATS}/${account}`
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const FETCH_USER_SELL_ORDER = async (account) => {
  try {
    const response = await axios.get(
      `${GET_USERS_SELL_ORDER_ROUTE}/${account}`
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const CALL_USER_INDIRECT_BUY_ORDER = async (account) => {
  try {
    const response = await axios.get(`${USER_INDIRECT_BUY_ORDER}/${account}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const CALL_SELLER_LOCKED_FUNDS = async (account) => {
  try {
    const response = await axios.get(`${SELLER_LOCKED_FUNDS}/${account}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const CALL_EXPRESS_BUY_ORDER_STATS = async (account) => {
  try {
    const response = await axios.get(`${EXPRESS_BUY_ORDER_STATS}/${account}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const CALL_USER_DIRECT_PRODUCTS = async (account) => {
  try {
    const response = await axios.get(`${USER_DIRECT_PRODUCTS}/${account}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err.repsonse;
  }
};
export const MARK_PRODUCT_AS_SHIPPED = async (payload) => {
  try {
    const response = await axios.post(SELLER_MARK_AS_SHIPPED_ROUTE, payload);
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
};
export const MARK_PRODUCT_AS_RECIEVED = async (payload) => {
  try {
    const response = await axios.post(BUYER_MARK_PRODUCT_AS_RECIEVED, payload);
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
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

export const GET_USER_UPLOADED_PRODUCT = async (address) => {
  try {
    const response = await axios.get(
      `${GET_ALL_UPLOADED_PRODUCTS_ROUTE}/${address}`,
      null,
      config
    );

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

export const PROCESS_PRODUCT_PURCHASE = async (payload) => {
  try {
    const response = await axios.post(
      `${PROCESS_PRODUCT_ORDER_ROUTE}`,
      payload,
      config
    );

    return response.data;
  } catch (err) {
    console.log(err.response);
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

export const DISPLAY_NEW_USER_DIRECT_PRODUCTS_CALL = async (account) => {
  console.log("____HHHH_____");
  try {
    const response = await axios.get(
      FETCH_USER_NEW_DIRECT_PRODUCT + "/" + account,
      null,
      config
    );
    console.log(response);

    return response.data;
  } catch (err) {
    console.log(err);
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
