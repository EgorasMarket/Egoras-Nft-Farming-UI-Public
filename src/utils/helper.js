import { GET_USER_UPLOADED_PRODUCT } from "../services/productServices";

export const TOTAL_NUMBER_OF_ITEMS_BOUGHT = (data = []) => {
  console.log(data);
  let result = {};
  let sub_total = 0;
  let prodCount = 0;
  const op = data.forEach((order, i) => {
    if (order.status === "APPROVED") {
      console.log(prodCount++);
      prodCount = prodCount++;
      sub_total += Number(order.sub_total);
      result = {
        sub_total: sub_total,
        prodCount: prodCount,
      };
    } else {
      result = {
        sub_total: sub_total,
        prodCount: prodCount,
      };
    }
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
    console.log(i.final_amount);
    result += parseInt(i.final_amount);
  });

  return parseFloat(result).toFixed(2);
};
