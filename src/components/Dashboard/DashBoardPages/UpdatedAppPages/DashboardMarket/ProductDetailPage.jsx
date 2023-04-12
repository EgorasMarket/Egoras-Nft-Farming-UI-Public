import React, { useEffect, useState, useCallback } from "react";
// import { API_URL2 as api_url2 } from "../../../../actions/types";
// import axios from "axios";
import ImageGallery from "react-image-gallery";
import Lottie from "lottie-react";

import StarRating from "@rubenvara/react-star-rating";

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
import {
  BuyIndirectProduct,
  BuyDirectProduct,
  checkAllowanceV3,
  unlockTokenV3,
} from "../../../../../web3/index";
import {
  checkAllowanceSwap,
  unlockSwapToken,
} from "../../../../../web3/index2";

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
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
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
        for (const data of img) {
          const payload = {
            original: data,
            thumbnail: data,
          };
          image.push(payload);
        }

        console.log(image);
      }
    };

    fetchData();

    //use the adress and make the API call
  }, []);

  const PurchaseProduct = async () => {
    console.log(productDetail.productType, account, "PurchaseProduct");

    let quantity = 1;
    let transactionHash = "0x6ED527b0a92f117f4a4E05a6dF9313CDd4a6aB412";
    let product_id = productDetail.index_id;

    const res = await PROCESS_PRODUCT_PURCHASE({
      quantity,
      transactionHash,
      product_id,
      user: account,
      order_type: "DIRECT",
    });

    if (res.success) {
      alert("successful purchase");
    }
    /// BUY WITH BLOCKCHAIN

    // if (productDetail.productType == "INDIRECT") {
    //   res = await BuyIndirectProduct(
    //     productDetail.index_id,
    //     quantity,
    //     library.getSigner()
    //   );
    // } else {
    //   res = await BuyDirectProduct(
    //     productDetail.index_id,
    //     quantity,
    //     library.getSigner()
    //   );
    // }

    // console.log(res);
    // if (res.status == true) {
    //   console.log("Success message");
    // } else {
    //   console.log("Error occured from Blockchain");
    // }

    // const response = await GET_UPLOADED_PRODUCT_BY_ID(address);

    // if (response.success) {
    //   setLoading(false);
    //   setProductDetail(response.data);
    //   const img = JSON.parse(response.data.product_images);
    //   for (const data of img) {
    //     const payload = {
    //       original: data,
    //       thumbnail: data,
    //     };
    //     image.push(payload);
    //   }

    //   console.log(image);
    // }
  };
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
        <div className="collateral-assets-section no-bg no_pad">
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
        <section className="collateral-assets-section no-bg no_pad">
          <div className="container">
            <div className="updated_itemdisplay">
              <div className="updated_itemdisplay_area1">
                {/* {moreImg.length === 0 ? (
                                <img src={payload.product_image} alt="" />
                            ) : ( */}
                <ImageGallery
                  items={image}
                  thumbnailPosition="left"
                  showBullets={true}
                  showFullscreenButton={false}
                  autoPlay={true}
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
                      {productDetail.product_name}
                    </a>
                  </div>
                  <div className="updated_itemdisplay_area2_cont1_product_name">
                    {/* {match.params.productName} */}
                    {productDetail.product_name}
                  </div>
                  <div className="updated_itemdisplay_area2_cont1_rating_div">
                    <span className="updated_itemdisplay_area2_cont1_rating_div1_productCode">
                      {/* {payload.p_code} - {payload.product_category_code} */}
                      5678g8
                    </span>
                    <StarRating
                      rating={4.35}
                      style={{ marginBottom: "0px !important" }}
                    />
                  </div>
                  <div className="updated_itemdisplay_area2_cont1_rating_div">
                    <span className="estimated_delivery">
                      Est. Delivery: Within 14days
                    </span>
                  </div>
                </div>
                <div className="power_details_series">
                  <div className="power_details_series_cont1">Series</div>
                  <div className="power_details_series_cont2">Hybrid</div>
                </div>
                {/* <hr /> */}
                {/* <div className="add_quantity_div">
                <div className="add_quantity_div1">
                  <div className="quantity_div_title">Quantity:</div>
                  <div className="quantity_div_body">
                    {payload.unitCount == 0 ? (
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
                      {payload.unitCount == 0 ? "0" : quantity}
                    </button>

                    {payload.unitCount == 0 ? (
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
                        disabled={quantity === payload.unitCount ? true : false}
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
                    {numberWithCommas(parseInt(payload.unitCount))}
                    item(s)
                  </div>
                </div>
              </div> */}
                <div className="power_details_details_div">
                  <div className="power_details_details_div_Head">
                    Specifications
                  </div>
                  {/* {newSpec.map((data) => {
                  let eee = data.split(":");
                  // console.log(eee);
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
                })} */}
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
                        Pay via your Egoras wallet or Fort. Excludes taxes and
                        shipping.
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
                    {/* {match.params.productName} */}
                    Iphone 13pro max
                  </div>

                  <div className="Updated_itemdisplay_payment_proceed_div_2_area3">
                    <Lottie
                      animationData={storeIcon}
                      loop={true}
                      autoPlay={true}
                      className="Updated_itemdisplay_payment_proceed_div_2_area3_icon"
                      preserveAspectRatio="xMidYMid meet"
                    />

                    <span className="Updated_itemdisplay_payment_proceed_div_2_area3_txt">
                      In-Store Pickup: Available
                    </span>
                  </div>
                  <div className="Updated_itemdisplay_payment_proceed_div_2_area4">
                    <Lottie
                      animationData={deliveryIcon}
                      loop={true}
                      autoPlay={true}
                      className="Updated_itemdisplay_payment_proceed_div_2_area4_icon"
                      preserveAspectRatio="xMidYMid slice"
                    />

                    <span className="Updated_itemdisplay_payment_proceed_div_2_area4_txt">
                      Payment on devilery: Available
                    </span>
                  </div>
                  <div className="Updated_itemdisplay_payment_proceed_div_2_area5">
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area1">
                      Unit Price
                    </div>
                    {/* {authState.subscription_status === "INACTIVE" ||
                  authState.subscription_status === undefined ? (
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area2">
                      ₦{numberWithCommas(parseFloat(payload.amount).toFixed(2))}
                    </div>
                  ) : (
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area2">
                      ₦{numberWithCommas(parseFloat(payload.amount).toFixed(2))}
                    </div>
                  )} */}
                    ₦600,000
                  </div>
                  <div className="Updated_itemdisplay_payment_proceed_div_2_area5">
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area1">
                      Sub Total
                    </div>
                    {/* {authState.subscription_status === "INACTIVE" ||
                  authState.subscription_status === undefined ? (
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area2">
                      ₦
                      {numberWithCommas(
                        parseFloat(payload.amount * quantity).toFixed(2)
                      )}
                    </div>
                  ) : (
                    <div className="Updated_itemdisplay_payment_proceed_div_2_area5_area2">
                      ₦
                      {numberWithCommas(
                        parseFloat(payload.amount * quantity).toFixed(2)
                      )}
                    </div>
                  )} */}
                    ₦600,000
                  </div>

                  <div className="Updated_itemdisplay_payment_proceed_div_payment_way_div">
                    <div className="Updated_itemdisplay_payment_proceed_div_payment_way_div_head">
                      Choose Payment Method
                    </div>
                    {/* {auth.user === null ? (
                    <button
                      className="continue_to_checkout_btn"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Join now to access
                    </button>
                  ) : authState.subscription_status === "INACTIVE" &&
                    auth.user !== null ? (
                    <button
                      className="continue_to_checkout_btn"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Join now to access
                    </button>
                  ) : (
                    <div className="Updated_itemdisplay_payment_proceed_div_payment_way">
                      <div
                        className={
                          activeBg2 === "smart_pay"
                            ? "Updated_itemdisplay_payment_proceed_div_payment_way_cont1_active"
                            : "Updated_itemdisplay_payment_proceed_div_payment_way_cont1"
                        }
                        id="smart_pay"
                        onClick={changeBg2}
                      >
                        <span className="pay_via_check_mark_div">
                          Pay via Smart Balance
                        </span>
                      </div>
                      <div
                        // className=""
                        className={
                          activeBg2 === "egoWallet"
                            ? "Updated_itemdisplay_payment_proceed_div_payment_way_cont1_active"
                            : "Updated_itemdisplay_payment_proceed_div_payment_way_cont1"
                        }
                        id="egoWallet"
                        onClick={changeBg2}
                      >
                        <span className="pay_via_check_mark_div">
                          Pay via Flutterwave
                        </span>
                      </div>
                    </div>
                  )} */}
                    <div
                      className="Updated_itemdisplay_payment_proceed_div_payment_way_cont1_active"
                      id="smart_pay"
                    >
                      <span className="pay_via_check_mark_div">
                        Pay via Smart Balance
                      </span>
                    </div>

                    <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
                      {unlockBtn === false ? (
                        <button
                          disabled={disable}
                          className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn"
                          onClick={UnlockToken}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Approve EUSD </span>
                          )}
                        </button>
                      ) : (
                        <button
                          className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn"
                          onClick={PurchaseProduct}
                          // disabled={true}
                        >
                          Purchase
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="collateral-assets-section no-bg no_pad">
          <div className="container">
            <div className="product_specifications_area">
              <div className="product_specifications_area_head">
                <div
                  className="product_specifications_area_head_tab_active"
                  // onClick={changeBg}
                  id="details"
                >
                  Product details
                </div>
                {/* <div
                className={
                  activeBg === "spec"
                    ? "product_specifications_area_head_tab_active"
                    : "product_specifications_area_head_tab"
                }
                // onClick={changeBg}
                id="spec"
              >
                Specifications
              </div> */}
              </div>
              <div
                className="product_specifications_area_body"
                dangerouslySetInnerHTML={{
                  __html: productDetail.product_details,
                }}
              />
              {/* {productDetail.product_details} */}
            </div>
          </div>
        </section>
      </div>
    );
};

// const mapStateToProps1 = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default PowerDetailPage;
export default ProductDetailPage;
