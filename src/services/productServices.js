import axios from "axios";
import {
  GET_ALL_UPLOADED_PRODUCTS_ROUTE,
  FETCH_PRODUCT_BRANDS,
  FETCH_PRODUCT_CATEGORIES,
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
