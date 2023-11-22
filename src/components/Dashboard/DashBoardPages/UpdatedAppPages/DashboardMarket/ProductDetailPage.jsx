import React, { useEffect, useState, useCallback } from "react";
// import { API_URL2 as api_url2 } from "../../../../actions/types";
// import axios from "axios";
import ImageGallery from "react-image-gallery";
import Lottie from "lottie-react";

import StarRating from "@rubenvara/react-star-rating";
import Blockies from "react-blockies";

import deliveryIcon from "../../../../../LottieFiles/loadingIcon/deliveryIcon.json";
import storeIcon from "../../../../../LottieFiles/loadingIcon/storeIcon.json";
import walletIcon from "../../../../../LottieFiles/loadingIcon/walletIcon.json";

import { numberWithCommas } from "../../../../../static";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";

import { ShimmerText, ShimmerPostDetails } from "react-shimmer-effects";
import "./DashboardMarketStyles/PowerDetailPage.css";
import "./DashboardMarketStyles/updatedItemDetailPage.css";
import {
  GET_UPLOADED_PRODUCT_BY_ID,
  PROCESS_PRODUCT_PURCHASE,
} from "../../../../../services/productServices";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { checkAllowanceV3, unlockTokenV3 } from "../../../../../web3/index";
import { ConvertToNGN } from "../../../../../utils/helper";

const ProductDetailPage = ({ match }) => {
  const context = useWeb3React();
  const {
    // connector,
    library,
    // chainId,
    account,
    // activate,
    // deactivate,
    // active,
    // error,
  } = context;
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState({ final_amount: "0" });
  const [image, setProductImages] = useState([]);
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [newSpec, setSpecification] = useState([]);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentCountry, setCurrentCountry] = useState("");
  useEffect(() => {
    let age = localStorage.getItem("mTYx");
    console.log(age);
    setCurrentCountry(age);
  }, []);
  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  useEffect(() => {
    const { address, name } = match.params;
    console.log(match.params, "goodluck ");

    ///call the api to populate the data

    const fetchData = async () => {
      const response = await GET_UPLOADED_PRODUCT_BY_ID(address);

      if (response.success) {
        setLoading(false);
        setProductDetail(response.data);
        const img = JSON.parse(response.data.product_images);
        console.log(response.data.product_images);
        console.log(response.data);
        const myArray = response.data.product_specifications;
        const splitMyArray = myArray.split(",");
        setSpecification(splitMyArray);
        console.log(myArray);
        console.log(splitMyArray);
        for (const data of img) {
          const payload = {
            original: "https://ellaa.org/" + data,
            thumbnail: "https://ellaa.org/" + data,
          };
          image.push(payload);
          console.log(payload);
        }

        console.log(image);
      }
    };

    fetchData();

    //use the adress and make the API call
  }, []);

  const UnlockToken = async (e) => {
    setIsLoading(true);
    setDisable(true);
    let ret = await unlockTokenV3(
      "0x58f66d0183615797940360a43c333a44215830ba",
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setUnlockBtn(true);
    } else {
      if (ret.message.code == 4001) {
        console.log(ret);
      }
      console.log(ret);
    }
  };
  useEffect(
    async (e) => {
      if (account) {
        let check = await checkAllowanceV3(
          "0x58f66d0183615797940360a43c333a44215830ba",
          account,
          parseEther(productDetail.final_amount.toString(), "wei").toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },

    [account, unLockCheckStatus, productDetail]
  );

  if (loading)
    return (
      <div className="other2 asset_other2">
        <div className="product_detail_section no-bg no_pad">
          <div className="container">
            <ShimmerPostDetails card cta variant="SIMPLE" />

            <div className="updated_itemdisplay">
              <div className="updated_itemdisplay_area1"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (loading === false)
    return (
      <div className="other2 asset_other2">
        <section className="product_detail_section no-bg no_pad">
          <div className="container">
            <div className="updated_itemdisplay">
              <div className="updated_itemdisplay_area1">
                {/* {moreImg.length === 0 ? (
                                <img src={payload.product_image} alt="" />
                            ) : ( */}
                <ImageGallery
                  items={image}
                  // thumbnailPosition="left"
                  showBullets={false}
                  showFullscreenButton={false}
                  autoPlay={true}
                  showThumbnails={false}
                />
                {/* )} */}
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}

              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="updated_itemdisplay_area2">
                <div className="updated_itemdisplay_area2_cont1" id="addItem">
                  <div className="updated_itemdisplay_area2_cont1_condition_tag_div">
                    <a
                      href=""
                      className="updated_itemdisplay_area2_cont1_product_name_link"
                    >
                      {/* {match.params.productName} */}
                      {productDetail.product_brand}
                    </a>
                  </div>
                  <div className="updated_itemdisplay_area2_cont1_product_name">
                    {/* {match.params.productName} */}
                    {productDetail.product_name}
                  </div>
                  <div className="updated_itemdisplay_area2_cont1_rating_div">
                    {/* <span className="updated_itemdisplay_area2_cont1_rating_div1_productCode">
                      {/* {payload.p_code} - {payload.product_category_code} */}
                    {/* {productDetail.index_id}
                    </span> */}
                    <StarRating
                      rating={4.35}
                      style={{ marginBottom: "0px !important" }}
                    />
                  </div>
                  {/* <div className="updated_itemdisplay_area2_cont1_rating_div">
                    <span className="estimated_delivery">Est. Delivery:</span>
                    <span className="estimated_delivery">Within 14days</span>
                  </div> */}
                </div>
                <div className="Updated_itemdisplay_payment_proceed_div_2">
                  <div className="power_details_series">
                    <div className="power_details_series_cont1">Type</div>
                    <div className="power_details_series_cont2">
                      {productDetail.productType}
                    </div>
                  </div>
                  <hr />
                  <div className="power_details_series">
                    <div className="power_details_series_cont1">Seller</div>
                    <div className="power_details_series_cont2">
                      {productDetail.productType === "DIRECT" ? (
                        <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                          <Blockies
                            seed={productDetail.user_wallet}
                            size={8}
                            scale={4}
                            className="blockies_icon2"
                          />
                          {`${productDetail.user_wallet.slice(
                            0,
                            6
                          )}...${productDetail.user_wallet.slice(20, 24)}`}
                        </span>
                      ) : productDetail.productType === "INDIRECT" ? (
                        <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span">
                          <img
                            src="/img/martgpt_logo_icon.svg"
                            alt=""
                            className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span_img"
                          />
                          {`${"MartGpt".slice(0, 6)}...${"MartGpt".slice(
                            20,
                            24
                          )}`}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="add_quantity_div">
                  <div className="add_quantity_div1">
                    <div className="quantity_div_title">Quantity:</div>
                    <div className="quantity_div_body">
                      {productDetail.quantity == 0 ? (
                        <button
                          className="quantity_div_body_btn_substract"
                          onClick={decreaseQuantity}
                          disabled={true}
                        >
                          -
                        </button>
                      ) : (
                        <button
                          className="quantity_div_body_btn_substract"
                          onClick={decreaseQuantity}
                          disabled={quantity === 1 ? true : false}
                        >
                          -
                        </button>
                      )}

                      <button className="quantity_div_body_btn_Amount">
                        {productDetail.quantity == 0 ? "0" : quantity}
                      </button>

                      {productDetail.quantity == 0 ? (
                        <button
                          className="quantity_div_body_btn_Add"
                          onClick={IncreaseQuantity}
                          disabled={true}
                        >
                          +
                        </button>
                      ) : (
                        <button
                          className="quantity_div_body_btn_Add"
                          onClick={IncreaseQuantity}
                          disabled={
                            quantity === productDetail.quantity ? true : false
                          }
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="add_quantity_div2">
                    <div className="quantity_div_item_avl_title">
                      Items Available:
                    </div>
                    <div className="quantity_div_item_avl_para">
                      {numberWithCommas(parseInt(productDetail.quantity))}{" "}
                      item(s)
                    </div>
                  </div>
                </div>
                <div className="power_details_details_div">
                  <div className="power_details_details_div_Head">
                    Specifications
                  </div>
                  {newSpec.map((data) => {
                    let eee = data.split(":");
                    console.log(eee);
                    return (
                      <div className="power_details_details_div_cont1">
                        <div className="power_details_details_div_cont1_div1">
                          {eee[0]}
                        </div>
                        <div className="power_details_details_div_cont1_div2">
                          {eee[1]}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}

                {/* =========== */}
                {/* =========== */}
                {/* =========== */}

                {/* =========== */}
                {/* =========== */}
                {/* =========== */}

                <div className="Updated_itemdisplay_payment_proceed_div">
                  <div className="Updated_itemdisplay_payment_proceed_div_1">
                    <Lottie
                      animationData={walletIcon}
                      loop={true}
                      autoPlay={true}
                      className="Updated_itemdisplay_payment_proceed_div_1_cont1_icon"
                      preserveAspectRatio="xMidYMid meet"
                    />
                    <div className="Updated_itemdisplay_payment_proceed_div_1_cont1">
                      <div className="Updated_itemdisplay_payment_proceed_div_1_cont1_txt">
                        One-time payment
                      </div>
                      <div className="Updated_itemdisplay_payment_proceed_div_1_cont2">
                        Pay via your Metamask wallet or Fort.
                      </div>
                    </div>
                  </div>
                </div>

                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}

                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                <div className="Updated_itemdisplay_payment_proceed_div_2">
                  <div className="Updated_itemdisplay_payment_proceed_div_2_area1">
                    {productDetail.product_name}
                  </div>

                  <hr />
                  <div className="proceedToPayDiv1">
                    <div className="proceedToPayDiv1_title">Item(s)</div>
                    <div className="proceedToPayDiv1_value">{quantity}</div>
                  </div>
                  <div className="Updated_itemdisplay_payment_proceed_div_2_area5">
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area1">
                      Sub Total
                    </div>
                    <div>
                      {currentCountry === "Nigeria" ? (
                        <span>
                          &#8358;{" "}
                          {ConvertToNGN(
                            parseFloat(quantity * productDetail.final_amount)
                          )}
                        </span>
                      ) : (
                        <span>
                          &#x24;{" "}
                          {numberWithCommas(
                            parseFloat(
                              quantity * productDetail.final_amount
                            ).toFixed(0)
                          )}
                        </span>
                      )}
                      <span style={{ fontSize: "12px", color: "#85a393" }}>
                        {" ~"}
                        {numberWithCommas(
                          parseFloat(
                            quantity * productDetail.final_amount
                          ).toFixed(0)
                        )}{" "}
                        eusd
                      </span>
                    </div>
                  </div>
                  <div className="Updated_itemdisplay_payment_proceed_div_payment_way_div">
                    <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
                      <a
                        href={`/app/product/checkout/${productDetail.product_id}/${quantity}/${productDetail.product_name}`}
                      >
                        <button
                          className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn"
                          // onClick={PurchaseProduct}
                        >
                          Proceed to checkout
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="product_detail_section no-bg no_pad">
          <div className="container">
            <div className="product_specifications_area">
              <div className="product_specifications_area_head">
                <div
                  className="product_specifications_area_head_tab_active"
                  id="details"
                >
                  Product details
                </div>
              </div>
              <div
                className="product_specifications_area_body"
                dangerouslySetInnerHTML={{
                  __html: productDetail.product_details,
                }}
              />
            </div>
          </div>
        </section>
      </div>
    );
};

export default ProductDetailPage;
