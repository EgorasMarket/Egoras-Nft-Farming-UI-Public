import React from "react";

const ProductModel = ({
    product_name
}) => {
  return (
    <div className="dashboardMarketPlaceBody2_div1_body_card" key={data.id}>
      <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
        <img
          src={data.img}
          alt=""
          className="dashboardMarketPlaceBody2_div1_body_card_img"
        />
      </div>
      <div className="dashboardMarketPlaceBody2_div1_body_card_body">
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
          {product_name}
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
          {data.amount} eUSD
          <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount_span">
            {" "}
            ~ (₦{data.amount * 750})
          </span>{" "}
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
          {`${data.txnHash.slice(0, 6)}...${data.txnHash.slice(63, 66)}`}
          <OpenInNewIcon className="tx_hash_link_icon" />
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
          <a href={`/app/market/product/details/${data.txnHash}/${data.title}`}>
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
