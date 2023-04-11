import { GET_USER_UPLOADED_PRODUCT } from "../services/productServices";

export const TOTAL_NUMBER_OF_ITEMS_BOUGHT = (data = []) => {
  let result = 0;
  const op = data.forEach((order) => {
    result += Number(order.sub_total);
  });

  return result;
};

export const TotalAmountSold = (data = []) => {
  let result = 0;
  const op = data.forEach((order) => {
    if (order.status === "APPROVED") {
      result += Number(order.sub_total);
    }
  });

  return result;
};
export const TotalItemSold = (data = []) => {
  let result = 0;
  const op = data.forEach((order) => {
    if (order.status === "APPROVED") {
      result++;
    }
  });

  return result;
};
export const TotalAmountUploaded = (data = []) => {
  let result = 0;
  const op = data.forEach((i) => {
    result += i.final_amount;
  });

  return parseFloat(result).toFixed(2);
};
