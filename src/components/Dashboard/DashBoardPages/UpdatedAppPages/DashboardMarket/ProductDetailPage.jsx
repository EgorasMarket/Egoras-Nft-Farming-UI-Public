import React, { useEffect, useState, useCallback } from "react";
// import { API_URL2 as api_url2 } from "../../../../actions/types";
// import axios from "axios";
import ImageGallery from "react-image-gallery";
import Lottie from "lottie-react";
// import SoldOutDiv from "../SoldOut/SoldOutDiv";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import StarRating from "@rubenvara/react-star-rating";
// import { connect, useDispatch } from "react-redux";
// import UpdatedLoginComponent from "../Login/UpdatedLoginComponent";
import deliveryIcon from "../../../../../LottieFiles/loadingIcon/deliveryIcon.json";
import storeIcon from "../../../../../LottieFiles/loadingIcon/storeIcon.json";
import walletIcon from "../../../../../LottieFiles/loadingIcon/walletIcon.json";
// import Accordion from "../item_details_page/Accordion";
// import { numberWithCommas } from "../../../../static";
import { numberWithCommas } from "../../../../../static";
// import Carousel from "react-multi-carousel";
// import { UpdatedMarketCard } from "../UpdatedMarketPage/UpdatedMarketCard/UpdatedMarketCard";

import "./DashboardMarketStyles/PowerDetailPage.css";
import "./DashboardMarketStyles/updatedItemDetailPage.css";

const ProductDetailPage = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // console.log(match.params.productName);
  // const [payload, setPayload] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  // const [loginSuccess, setLoginSuccess] = useState(false);
  // const [purchaseCount, setPurchaseCount] = useState(0);
  // const [shortId, setShortId] = useState("");

  // const [activeBg, setActiveBg] = useState("details");
  // const [activeBg2, setActiveBg2] = useState("egoWallet");
  // const [newSpec, setSpecification] = useState([]);
  // const [componentLoading, setComponentLoading] = useState(false);
  // const [moreImg, setMoreImg] = useState([]);
  // const [authState, setAuthState] = useState({});
  // const [loginModal, setLoginModal] = useState(false);

  // console.log(match.params.productCategory)
  const images = [
    {
      original: "/img/dummyMarketImages/PhoneDummyImage.png",
      thumbnail: "/img/dummyMarketImages/PhoneDummyImage.png",
    },
    {
      original: "/img/dummyMarketImages/PhoneDummyImage.png",
      thumbnail: "/img/dummyMarketImages/PhoneDummyImage.png",
    },
    {
      original: "/img/dummyMarketImages/PhoneDummyImage.png",
      thumbnail: "/img/dummyMarketImages/PhoneDummyImage.png",
    },
  ];

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
                items={images}
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
                    Iphone 13pro max
                  </a>
                </div>
                <div className="updated_itemdisplay_area2_cont1_product_name">
                  {/* {match.params.productName} */}
                  Iphone 13pro max
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
              // dangerouslySetInnerHTML={{ __html: payload.product_details }}
            />
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
