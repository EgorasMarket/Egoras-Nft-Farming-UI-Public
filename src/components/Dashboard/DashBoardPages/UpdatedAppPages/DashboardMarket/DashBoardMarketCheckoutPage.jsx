import React, { useState, useEffect } from "react";
import "./DashboardMarketStyles/MarketCheckout.css";
import Blockies from "react-blockies";
import { GET_UPLOADED_PRODUCT_BY_ID } from "../../../../../services/productServices";
import ScaleLoader from "react-spinners/ScaleLoader";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  CALL_CHECK_USER_AND_MEMBERSHIP,
  CALL_UPDATE_MY_PROFILE,
} from "../../../../../services/userServices";
import { numberWithCommas } from "../../../../static/static";
import { PROCESS_PRODUCT_PURCHASE } from "../../../../../services/productServices";
import UpdatedErrorModal from "../UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "../UpdatedSuccessErrorModals/UpdatedSuccessModal";
import { BuyIndirectProduct, BuyDirectProduct } from "../../../../../web3";
import { parseEther, formatEther } from "@ethersproject/units";
import { unlockTokenV3, checkAllowanceV3 } from "../../../../../web3";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import PayViaFortModal from "../../../../Home/MemberShip/PayViaFortModal";
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
  const [checkedFortModal, setCheckedFortModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  //   const [txnHash, setTxnHash] = useState("");
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updateProfileDiv, setUpdateProfileDiv] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successRoute, setSuccessRoute] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileDisable, setProfileDisable] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [qr_data, setQrData] = useState({});

  // const [disable, setDisable] = useState(false);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const { productId, product_count, productName } = match.params;
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const { fullName, phoneNumber, address, city, country, state, zipCode } =
    formData;
  console.log(productId, product_count, productName);
  const purchaseProductWeb2 = async (txnHash, route) => {
    let product_id = productDetail.index_id;
    console.log(
      numDivsToDuplicate,
      txnHash,
      product_id,
      account,
      productDetail.productType
    );
    const res = await PROCESS_PRODUCT_PURCHASE({
      quantity: numDivsToDuplicate,
      transactionHash: txnHash,
      product_id,
      user: account,
      order_type: productDetail.productType,
    });
    console.log(res);
    if (res.success) {
      console.log(res);
      setIsLoading(false);
      setDisabled(false);
      setSuccessModal(true);
      setSuccessRoute(route);
      setSuccessMessage(
        "You have successfully ordered " +
          numDivsToDuplicate +
          productName +
          " from " +
          productDetail.user_wallet.slice(0, 6) +
          "..." +
          productDetail.user_wallet.slice(20, 24) +
          " check your buy orders for more info on shipping and delivery."
      );
    } else {
      console.log(res);
      setErrorModal(true);
      setErrorMessage(res.errorMessage);
      setIsLoading(false);
      setDisabled(false);
    }
  };
  const PurchaseProduct = async () => {
    setIsLoading(true);
    setDisabled(true);
    // / BUY WITH BLOCKCHAIN
    if (productDetail.productType == "INDIRECT") {
      const res = await BuyIndirectProduct(
        account,
        productDetail.index_id,
        numDivsToDuplicate,
        library.getSigner()
      );
      console.log(res, "indirect");
      if (res.status === true) {
        //   setTxnHash(res.message.hash);
        purchaseProductWeb2(res.message.hash, "/app/user/sales");
      } else {
        setErrorModal(true);
        setErrorMessage(res.message);
        setIsLoading(false);
        setDisabled(false);
      }
    } else {
      const res = await BuyDirectProduct(
        account,
        productDetail.index_id,
        numDivsToDuplicate,
        library.getSigner()
      );
      console.log(res, "direct");
      if (res.status === true) {
        // setTxnHash(res.message.hash);
        purchaseProductWeb2(res.message.hash, "/app/user/p2p_sales");
      } else {
        setErrorModal(true);
        setErrorMessage(res.message);
        setIsLoading(false);
        setDisabled(false);
      }
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
      console.log(response.data.users);

      setUserDetails(response.data.users);
      if (response.data.users.phoneNumber === null) {
        setUpdateProfile(true);
      } else {
        setUpdateProfile(false);
      }
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
    setQrData({
      type: "product",
      // userWallet: account,
      data: {
        quantity: numDivsToDuplicate,
        amount: SubTotal,
        logo: productImage,
        symbol: "eusd",
        product_id: productDetail.index_id,
        user: account,
      },
    });
    setCheckedFort(true);
    setCheckedMetamask(false);
  };
  const ToggleUpdateProfileDiv = () => {
    setUpdateProfileDiv(!updateProfileDiv);
  };
  const onChangeUserDetails = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const updateProfileFunc = async () => {
    setProfileDisable(true);
    setProfileLoading(true);
    const body = JSON.stringify({
      fullname: fullName,
      phoneNumber,
      address,
      address2: city,
      country,
      state,
      zipCode,
      walletAddress: account,
    });

    const response = await CALL_UPDATE_MY_PROFILE(body);
    console.log(response);
    if (response.success === true) {
      setProfileDisable(false);
      setProfileLoading(false);
      setSuccessModal(true);
      setSuccessRoute("");
      setSuccessMessage(response.data.message);
      console.log(response.data.message);
    } else {
      setErrorModal(true);
      setErrorMessage(response.data.errorMessage);
      setProfileDisable(false);
      setProfileLoading(false);
      console.log(response.data.errorMessage);
      console.log(response);
    }
  };
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  const UnlockToken = async (e) => {
    setIsLoading(true);
    setDisabled(true);
    let ret = await unlockTokenV3(
      "0x58f66d0183615797940360a43c333a44215830ba",
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status == true) {
      setIsLoading(false);
      setDisabled(false);
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setUnlockBtn(true);
    } else {
      if (ret.message.code == 4001) {
        console.log(ret);
      }
      setErrorModal(true);
      setErrorMessage(ret.message);
      setIsLoading(false);
      setDisabled(false);
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
  const toggleCheckedFortModal = () => {
    setCheckedFortModal(!checkedFortModal);
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
                    {updateProfile ? (
                      <button
                        className="checkoutPage_body1_cont1_body_btn"
                        onClick={ToggleUpdateProfileDiv}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="checkoutPage_body1_cont1_body_btn"
                        disabled
                      >
                        Updated
                      </button>
                    )}
                  </div>
                </div>
                <div className="checkoutPage_body1_cont1_body">
                  <div className="checkoutPage_body1_cont1_body_body1">
                    <div className="checkoutPage_body1_cont1_body_cont1">
                      Personal Details
                    </div>
                    <div className="checkoutPage_body1_cont1_body_cont1_body">
                      <span className="checkoutPage_body1_cont1_body_cont1_body_span">
                        Name: {userDetails.fullName}
                      </span>
                      <span className="checkoutPage_body1_cont1_body_cont1_body_span">
                        Phone No: {userDetails.phoneNumber}
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
                        Address: {userDetails.userAddress}, City:{" "}
                        {userDetails.userAddress2}, State: {userDetails.state},{" "}
                        Country: {userDetails.country}, Postal-Code:{" "}
                        {userDetails.zipCode}
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
                      {updateProfile === true ? (
                        <button className="proceedToPayDiv_btn" disabled>
                          Update Your Billing Info
                        </button>
                      ) : (
                        <>
                          {checkedFort === true ? (
                            <button
                              className="proceedToPayDiv_btn"
                              onClick={toggleCheckedFortModal}
                            >
                              Checkout Fort
                            </button>
                          ) : checkedMetamask === true ? (
                            <>
                              {unlockBtn === false ? (
                                <button
                                  className="proceedToPayDiv_btn"
                                  disabled={Disabled}
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
                                  className="proceedToPayDiv_btn"
                                  onClick={PurchaseProduct}
                                  disabled={Disabled}
                                >
                                  {isLoading ? (
                                    <ScaleLoader
                                      color="#12111b"
                                      size={10}
                                      height={19}
                                    />
                                  ) : (
                                    <> Checkout Metamask</>
                                  )}
                                </button>
                              )}
                            </>
                          ) : (
                            <button className="proceedToPayDiv_btn" disabled>
                              Select Payment Method
                            </button>
                          )}
                        </>
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
      {updateProfileDiv ? (
        <div className="updateProfileDivModal">
          <div className="updateProfileDivModal_container">
            <div className="updateProfileDivModal_container_title">
              Update Your Profile
            </div>
            <div className="updateProfileDivModal_container_body">
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  Full Name*
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  Phone No*
                </div>
                <input
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  Address*
                </div>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  City*
                </div>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  State*
                </div>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  Country*
                </div>
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1">
                <div className="updateProfileDivModal_container_body_cont1_title">
                  Zip Code*
                </div>
                <input
                  type="text"
                  name="zipCode"
                  value={zipCode}
                  onChange={onChangeUserDetails}
                  className="updateProfileDivModal_container_body_cont1_input"
                />
              </div>
              <div className="updateProfileDivModal_container_body_cont1_btns">
                <button
                  className="updateProfileDivModal_container_body_cont1_button1"
                  disabled={profileDisable}
                  onClick={updateProfileFunc}
                >
                  {profileLoading ? (
                    <ScaleLoader color="#12111b" size={10} height={19} />
                  ) : (
                    <>Submit</>
                  )}
                </button>
                <button
                  className="updateProfileDivModal_container_body_cont1_button2"
                  onClick={ToggleUpdateProfileDiv}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {errorModal ? (
        <UpdatedErrorModal
          errorMessage={errorMessage}
          closeModal={CloseErrorModal}
        />
      ) : null}
      {successModal ? (
        <UpdatedSuccessModal
          btnRoute={true}
          successMessage={successMessage}
          route={successRoute}
        />
      ) : null}

      {checkedFortModal && (
        <PayViaFortModal
          togglePayViaFortDiv={toggleCheckedFortModal}
          message="Scan this qrcode to subscribe for your membership via FORT app."
          code="Qretyhgjhe6"
          account={account}
          data={qr_data}
          prodType={productDetail.productType}
        />
      )}
    </div>
  );
};

export default DashBoardMarketCheckoutPage;
