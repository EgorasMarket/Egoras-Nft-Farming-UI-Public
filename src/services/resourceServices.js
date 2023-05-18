import axios from "axios";
import { RES_API } from "../actions/types";

const customResponse = ({ message, status, data = {} }) => {
  return {
    message,
    status,
    data,
  };
};

export const addProductImage = async (formdata) => {
  try {
    const response = await axios.post(
      `${RES_API}/v1/file-upload/add`,
      formdata
    );

    console.log(response);
  } catch (error) {
    return customResponse({
      message: error.message,
      status: false,
    });
  }
};
