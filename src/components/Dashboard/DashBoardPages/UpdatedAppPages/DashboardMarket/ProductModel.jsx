import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ProductModel = ({
  id,
  img,
  title,
  amount,
  txnHash,
  numberWithCommas,
}) => {
  let fff = JSON.parse(img);
  console.log(fff);
  // console.log(img);
  // console.log(fff[1]);
  // console.log(fff[1]);
  // console.log(fff[1]);
  return (
    <div className="dashboardMarketPlaceBody2_div1_body_card" key={id}>
      <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
        <img
          src={fff[0]}
          alt=""
          className="dashboardMarketPlaceBody2_div1_body_card_img"
        />
      </div>
      <div className="dashboardMarketPlaceBody2_div1_body_card_body">
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
          {title}
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
          {/* {amount} eUSD */}
          {numberWithCommas(parseFloat(amount).toFixed(2))} eUSD
          <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount_span">
            {" "}
            ~ (₦{amount * 750})
          </span>{" "}
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
          {`${txnHash.slice(0, 6)}...${txnHash.slice(63, 66)}`}
          <OpenInNewIcon className="tx_hash_link_icon" />
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
          <a href={`/app/market/product/details/${txnHash}/${title}`}>
            {" "}
            <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
              Purchase
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
