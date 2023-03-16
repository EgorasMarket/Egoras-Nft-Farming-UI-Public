import axios from "axios";
import { GET_ALL_UPLOADED_PRODUCTS_ROUTE } from "../core/ApiRoutes";
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
