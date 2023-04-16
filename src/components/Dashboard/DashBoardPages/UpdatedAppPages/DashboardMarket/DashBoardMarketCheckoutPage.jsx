import React, { useState, useEffect } from "react";
import "./DashboardMarketStyles/MarketCheckout.css";
import Blockies from "react-blockies";
import { GET_UPLOADED_PRODUCT_BY_ID } from "../../../../../services/productServices";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CALL_CHECK_USER_AND_MEMBERSHIP } from "../../../../../services/userServices";
import { numberWithCommas } from "../../../../static/static";
import { PROCESS_PRODUCT_PURCHASE } from "../../../../../services/productServices";
import { BuyIndirectProduct, BuyDirectProduct } from "../../../../../web3";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const DashBoardMarketCheckoutPage = ({ match }) => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const [productDetail, setProductDetail] = useState({ final_amount: "0" });
  const [productImage, setProductImage] = useState("");
  const [nonMembershipFee, setNonMembershipFee] = useState(0);
  const [numDivsToDuplicate, setNumDivsToDuplicate] = useState(0);
  const [checkedMetamask, setCheckedMetamask] = useState(false);
  const [checkedFort, setCheckedFort] = useState(false);
  const [txnHash, setTxnHash] = useState("");
  const { productId, product_count, productName } = match.params;

  console.log(productId, product_count, productName);
  const purchaseProductWeb2 = async () => {
    let product_id = productDetail.product_id;
    const res = await PROCESS_PRODUCT_PURCHASE({
      numDivsToDuplicate,
      txnHash,
      product_id,
      user: account,
      order_type: productDetail.productType,
    });
    if (res.success) {
      console.log(res);
    } else {
      console.log(res);
    }
  };
  const PurchaseProduct = async () => {
    // / BUY WITH BLOCKCHAIN
    if (productDetail.productType == "INDIRECT") {
      const res = await BuyIndirectProduct(
        productDetail.index_id,
        numDivsToDuplicate,
        library.getSigner()
      );
      console.log(res, "indirect");
    } else {
      const res = await BuyDirectProduct(
        productDetail.index_id,
        numDivsToDuplicate,
        library.getSigner()
      );
      console.log(res, "direct");
    }
  };

  useEffect(() => {
    setNumDivsToDuplicate(parseInt(product_count));
  }, []);

  const DeleteProduct = () => {
    console.log(numDivsToDuplicate - 1);
    setNumDivsToDuplicate(numDivsToDuplicate - 1);
    // return numDivsToDuplicate - 1;
  };
  useEffect(() => {
    ///call the api to populate the data
    const fetchData = async () => {
      const response = await GET_UPLOADED_PRODUCT_BY_ID(productId);
      if (response.success) {
        setProductDetail(response.data);
        const prodImage = JSON.parse(response.data.product_images);
        setProductImage(prodImage[0]);
        console.log(prodImage);
        console.log(response.data);
      }
    };

    fetchData();
  }, []);
  const divToDuplicate = (
    <div className="checkoutPage_body2_area_body_cont1">
      <div className="checkoutPage_body2_area_body_cont1_image_div">
        <img
          src={productImage}
          alt=""
          className="checkoutPage_body2_area_body_cont1_image"
        />
      </div>
      <div className="checkoutPage_body2_area_body_cont1_text">
        <div className="checkoutPage_body2_area_body_cont1_text_title">
          {productDetail.product_name}
        </div>
        <div className="checkoutPage_body2_area_body_cont1_text_para1">
          <div className="checkoutPage_body2_area_body_cont1_text_para1_title">
            Seller
          </div>
          {productDetail.productType === "DIRECT" ? (
            <div className="checkoutPage_body2_area_body_cont1_text_para1_para">
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
            </div>
          ) : productDetail.productType === "INDIRECT" ? (
            <div className="checkoutPage_body2_area_body_cont1_text_para1_para">
              <img
                src="/img/martgpt_logo_icon.svg"
                alt=""
                className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash_span_img"
              />
              {`${"MartGpt".slice(0, 6)}...${"MartGpt".slice(20, 24)}`}
            </div>
          ) : null}
        </div>
        <div className="checkoutPage_body2_area_body_cont1_text_para1">
          <div className="checkoutPage_body2_area_body_cont1_text_para1_title">
            Type
          </div>
          <div className="checkoutPage_body2_area_body_cont1_text_para1_para">
            {productDetail.productType}
          </div>
        </div>
        <div className="checkoutPage_body2_area_body_cont1_text_amount">
          {numberWithCommas(parseFloat(productDetail.final_amount).toFixed(2))}{" "}
          eusd
        </div>
      </div>
      <button
        className="remove_prod_btn"
        onClick={DeleteProduct}
        disabled={numDivsToDuplicate === 1 ? true : false}
      >
        <DeleteForeverIcon className="remove_prod_btn_icon" />
      </button>
    </div>
  );
  const duplicatedDivs = Array.from(
    { length: numDivsToDuplicate },
    (_, index) => <div key={index}>{divToDuplicate}</div>
  );
  //   const fetchData = async () => {

  //   };
  useEffect(async () => {
    if (account) {
      const response = await CALL_CHECK_USER_AND_MEMBERSHIP(account);
      console.log(response.data);
      if (response.data.userMembership === true) {
        setNonMembershipFee(
          0 * parseInt(productDetail.final_amount * numDivsToDuplicate)
        );
        return;
      }

      if (response.data.userMembership === false) {
        setNonMembershipFee(
          0.03 * parseInt(productDetail.final_amount * numDivsToDuplicate)
        );
        return;
      }
      return;
    }
  }, [account]);
  const SubTotal = productDetail.final_amount * numDivsToDuplicate;
  const Total = nonMembershipFee + SubTotal;
  const checkedMetamaskBox = () => {
    setCheckedMetamask(true);
    setCheckedFort(false);
  };
  const checkedFortBox = () => {
    setCheckedFort(true);
    setCheckedMetamask(false);
  };
  return (
    <div className="other2 asset_other2">
      <section className="product_detail_section ">
        <div className="container">
          <div className="checkoutPage_header">Checkout</div>
          <div className="checkoutPage_body">
            <div className="checkoutPage_body1">
              <div className="checkoutPage_body1_cont1">
                <div className="checkoutPage_body1_cont1_head">
                  <span className="checkoutPage_body1_cont1_head_span">
                    Billing Info{" "}
                  </span>
                  <div className="checkoutPage_body1_cont1_body_btn_div">
                    <button className="checkoutPage_body1_cont1_body_btn">
                      Update
                    </button>
                  </div>
                </div>
                <div className="checkoutPage_body1_cont1_body">
                  <div className="checkoutPage_body1_cont1_body_body1">
                    <div className="checkoutPage_body1_cont1_body_cont1">
                      Personal Details
                    </div>
                    <div className="checkoutPage_body1_cont1_body_cont1_body">
                      <span className="checkoutPage_body1_cont1_body_cont1_body_span">
                        Name: John Doe{" "}
                      </span>
                      <span className="checkoutPage_body1_cont1_body_cont1_body_span">
                        Phone No: +234 816 402 0234
                      </span>
                    </div>
                  </div>
                </div>
                <div className="checkoutPage_body1_cont1_body">
                  <div className="checkoutPage_body1_cont1_body_body1">
                    <div className="checkoutPage_body1_cont1_body_cont1">
                      Shipping Address
                    </div>
                    <div className="checkoutPage_body1_cont1_body_cont1_body">
                      <span>
                        8b lord emmanuel drive Rumomasi Port-Harcourt Rivers
                        State Nigeria
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkoutPage_body1_cont1">
                <div className="checkoutPage_body1_cont1">
                  <div className="checkoutPage_body1_cont1_head">
                    Choose Payment Method
                  </div>
                  <div className="payment_method_div">
                    <div
                      className={
                        checkedMetamask == true
                          ? "payment_method_div_cont1_active"
                          : "payment_method_div_cont1"
                      }
                      onClick={checkedMetamaskBox}
                    >
                      <div className="payment_method_div_cont1_div1">
                        <input
                          type="radio"
                          id="radio-1"
                          name="radio"
                          checked={checkedMetamask}
                          onChange={checkedMetamaskBox}
                        />
                        <label
                          className="payment_method_area1_cont1_label"
                          for="radio-1"
                        ></label>
                      </div>
                      <div className="payment_method_div_cont1_div2">
                        {" "}
                        Pay Via Metamask
                      </div>
                    </div>
                    <div
                      className={
                        checkedFort == true
                          ? "payment_method_div_cont1_active"
                          : "payment_method_div_cont1"
                      }
                      onClick={checkedFortBox}
                    >
                      <div className="payment_method_div_cont1_div1">
                        <input
                          type="radio"
                          id="radio-2"
                          name="radio"
                          checked={checkedFort}
                          onChange={checkedFortBox}
                        />
                        <label
                          className="payment_method_area1_cont1_label"
                          for="radio-2"
                        ></label>
                      </div>
                      <div className="payment_method_div_cont1_div2">
                        {" "}
                        Pay Via Fort
                      </div>
                    </div>
                  </div>
                  {/* ========== */}
                  {/* ========== */}
                  {/* ========== */}
                  {/* ========== */}
                  <div className="proceedToPayDiv">
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">Item(s)</div>
                      <div className="proceedToPayDiv1_value">
                        {numDivsToDuplicate}
                      </div>
                    </div>
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">Sub Total</div>
                      <div className="proceedToPayDiv1_value">
                        {numberWithCommas(SubTotal)} eusd
                      </div>
                    </div>
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">
                        Non Membership Fee
                      </div>
                      <div className="proceedToPayDiv1_value">
                        {numberWithCommas(nonMembershipFee)} eusd
                      </div>
                    </div>
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">Total</div>
                      <div className="proceedToPayDiv1_value">
                        {numberWithCommas(Total)} eusd
                      </div>
                    </div>
                    <div className="proceedToPayDiv_btn_div">
                      {checkedMetamask === true ? (
                        <button
                          className="proceedToPayDiv_btn"
                          onClick={PurchaseProduct}
                        >
                          Checkout Metamask
                        </button>
                      ) : checkedFort === true ? (
                        <button className="proceedToPayDiv_btn">
                          Checkout Fort
                        </button>
                      ) : (
                        <button className="proceedToPayDiv_btn" disabled>
                          Select Payment Method
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkoutPage_body2">
              <div className="checkoutPage_body2_area">
                <div className="checkoutPage_body2_area_title">
                  Your Order
                  <span className="checkoutPage_body2_area_title_span">
                    {numDivsToDuplicate} item(s)
                  </span>
                </div>
                <div className="checkoutPage_body2_area_body">
                  {duplicatedDivs}
                </div>
                <div className="checkoutPage_body2_area_total">
                  <div className="checkoutPage_body2_area_total_title">
                    Sub Total
                  </div>
                  <div className="checkoutPage_body2_area_total_amount">
                    {numberWithCommas(SubTotal)} eusd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardMarketCheckoutPage;
