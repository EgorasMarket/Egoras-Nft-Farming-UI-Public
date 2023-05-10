import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Blockies from "react-blockies";

export const ProductModel2 = ({
  id,
  img,
  title,
  amount,
  numberWithCommas,
  seller,
  prodState,
  productType,
  productQuantity,
}) => {
  // let fff = JSON.parse(img);
  // console.log(fff);
  // console.log(id);
  // console.log(fff[1]);
  // console.log(fff[1]);
  // console.log(fff[1]);
  return (
    <>
      <div className="dashboardMarketPlaceBody2_div1_body_card2" key={id}>
        {productQuantity === 0 ? (
          <div className="out_of_stock_div"> Out of stock</div>
        ) : null}
        <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
          <div className="prodState_div">{prodState}</div>
          <img
            src={img}
            alt=""
            className="dashboardMarketPlaceBody2_div1_body_card_img"
          />
          {/* <img
            src={fff[0]}
            alt=""
            className="dashboardMarketPlaceBody2_div1_body_card_img"
          /> */}
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body">
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
            {title}
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
            {/* {amount} eUSD */}
            {numberWithCommas(parseFloat(amount).toFixed(2))} eUSD
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
            {productType === "DIRECT" ? (
              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                <Blockies
                  seed={seller}
                  size={8}
                  scale={4}
                  className="blockies_icon2"
                />
                {`${seller.slice(0, 6)}...${seller.slice(24, 26)}`}
              </span>
            ) : (
              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                <img
                  src="/img/martgpt_logo_icon.svg"
                  alt=""
                  className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span_img"
                />
                {`${"MartGpt".slice(0, 6)}...${"MartGpt".slice(24, 26)}`}
              </span>
            )}
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
            {productQuantity === 0 ? (
              <button
                className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn"
                disabled
              >
                Sold Out
              </button>
            ) : (
              <a href={`/app/market/product/details/${id}/${title}`}>
                {" "}
                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                  Purchase
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductModelList = ({
  id,
  img,
  title,
  amount,
  numberWithCommas,
  seller,
  prodState,
  productType,
  productQuantity,
}) => {
  let fff = JSON.parse(img);
  console.log(fff);
  console.log(id);
  console.log(fff[1]);
  console.log(fff[1]);
  console.log(fff[1]);
  return (
    <>
      <div className="dashboardMarketPlaceBody2_div1_body_card_list" key={id}>
        {productQuantity === 0 ? (
          <div className="out_of_stock_div"> Out of stock</div>
        ) : null}
        <div className="dashboardMarketPlaceBody2_div1_body_card_img_div_list">
          <div className="prodState_div">{prodState}</div>

          <img
            src={fff[0]}
            alt=""
            className="dashboardMarketPlaceBody2_div1_body_card_img_list"
          />
        </div>
        <div className="dashboardMarketPlaceBody2_div1_body_card_body_list">
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
            {title}
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
            {/* {amount} eUSD */}
            {numberWithCommas(parseFloat(amount).toFixed(2))} eUSD
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
            {productType === "DIRECT" ? (
              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                <Blockies
                  seed={seller}
                  size={8}
                  scale={4}
                  className="blockies_icon2"
                />
                {`${seller.slice(0, 6)}...${seller.slice(24, 26)}`}
              </span>
            ) : (
              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                <img
                  src="/img/martgpt_logo_icon.svg"
                  alt=""
                  className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span_img"
                />
                {`${"MartGpt".slice(0, 6)}...${"MartGpt".slice(24, 26)}`}
              </span>
            )}
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
            {productQuantity === 0 ? (
              <button
                className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn"
                disabled
              >
                Sold Out
              </button>
            ) : (
              <a href={`/app/market/product/details/${id}/${title}`}>
                {" "}
                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                  Purchase
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductModel = ({
  id,
  img,
  title,
  amount,
  numberWithCommas,
  seller,
  prodState,
  productType,
  productQuantity,
}) => {
  let fff = JSON.parse(img);
  console.log(fff);
  console.log(id);
  console.log(fff[1]);
  console.log(fff[1]);
  console.log(fff[1]);
  return (
    <>
      <div className="dashboardMarketPlaceBody2_div1_body_card" key={id}>
        {productQuantity === 0 ? (
          <div className="out_of_stock_div"> Out of stock</div>
        ) : null}
        <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
          <div className="prodState_div">{prodState}</div>

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
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
            {productType === "DIRECT" ? (
              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                <Blockies
                  seed={seller}
                  size={8}
                  scale={4}
                  className="blockies_icon2"
                />
                {`${seller.slice(0, 6)}...${seller.slice(24, 26)}`}
              </span>
            ) : (
              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                <img
                  src="/img/martgpt_logo_icon.svg"
                  alt=""
                  className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span_img"
                />
                {`${"MartGpt".slice(0, 6)}...${"MartGpt".slice(24, 26)}`}
              </span>
            )}
          </div>
          <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
            {productQuantity === 0 ? (
              <button
                className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn"
                disabled
              >
                Sold Out
              </button>
            ) : (
              <a href={`/app/market/product/details/${id}/${title}`}>
                {" "}
                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                  Purchase
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModel;
