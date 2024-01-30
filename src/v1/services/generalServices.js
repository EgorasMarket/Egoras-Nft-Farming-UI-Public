import axios from "axios";
import {
  GET_ALL_UPLOADED_PRODUCTS_ROUTE,
  GET_EGC_PRICE_COINGEKO,
  GET_EGC_PRICE_COINGEKO_ROUTE,
  GET_TVL_ROUTE,
  GOOGLE_QRCODE_GENERATOR_LINK,
  NEW_QR_LINK_ROUTE,
  POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE,
  POPULATE_STAKE_INFO_ROUTE,
} from "../core/ApiRoutes";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
let egc_usd;

export const GET_COIN_GEKO_PRICE_IN_USD = async () => {
  try {
    const response = await axios.get(
      `${GET_EGC_PRICE_COINGEKO_ROUTE}`,
      null,
      config
    );
    console.log(response);
    console.log(response.data.data, "egc_usd_price");
    return response.data.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

export const GENERATE_QR_CODE_LINK = async (data) => {
  try {
    const response = await axios.post(
      `${NEW_QR_LINK_ROUTE}`, data);
    return response.data;
  } catch (err) {
    return err.response || err.message;
  }
};


export const GENERATE_QR_CODE_DATA = async (payload) => {
  try {
    const response = await axios.get(
      `${GOOGLE_QRCODE_GENERATOR_LINK}`,
      {
        params: {
          cht: "qr",
          chs: "100x100",
          chl: "sample text",
        },
      },
      config
    );
    console.log(response, "qr code");
    return response.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

// let string2 =
//   "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
// await fetch(string2)
//   .then((resp) => resp.json())
//   .then((data) => {
//     const egc_usd_val = data["egoras-credit"].usd;
//     console.log(egc_usd_val);
//     setEgcUsdVal(() => egc_usd_val);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
