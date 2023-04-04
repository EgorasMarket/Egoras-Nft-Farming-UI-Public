import React, { useState, useRef, useEffect } from "react";
import "./UpdatedAppPagesStyles/dashboardSellProduct.css";
import { API_URL } from "../../../../actions/types";
import axios from "axios";
import { Connect } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { config } from "../../../../actions/Config";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedSuccessModal from "./UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "./UpdatedSuccessErrorModals/UpdatedErrorModal";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  listProduct,
  lendUS,
  takeDividend,
  takeBackLoan,
  getTotalLended,
  getInvestorsDividend,
  userStats,
  system,
  burnAccumulatedDividend,
  checkAllowance,
  unluckToken,
  lend,
  getUserStats,
  transactReceipt,
  getPrice,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
  checkAllowanceL,
  unluckToken2,
  getEgcSmartContractBalnce,
} from "../../../../web3/index";
// import {
//   lendUS,
//   takeDividend,
//   takeBackLoan,
//   getTotalLended,
//   getInvestorsDividend,
//   userStats,
//   system,
//   burnAccumulatedDividend,
//   checkAllowance,
//   unluckToken,
//   lend,
//   getUserStats,
//   transactReceipt,
//   getPrice,
//   getTickerInfo,
//   tokenBalance,
//   open,
//   getLatestLoan,
//   repay,
//   topup,
//   draw,
//   checkAllowanceL,
//   unluckToken2,
//   getEgcSmartContractBalnce,
// } from "../../web3/index";

const DashBoardSellProduct = () => {
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
  const [prodName, setProdName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [saleAmount, setSaleAmount] = useState();
  const [prodCondition, setProdCondition] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [imageSrc3, setImageSrc3] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const fileInputRef3 = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveClick = () => {
    setImageSrc("");
  };
  const handleImageSelect2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc2(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveClick2 = () => {
    setImageSrc2("");
  };
  const handleImageSelect3 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc3(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveClick3 = () => {
    setImageSrc3("");
  };
  const sendProductToBlockchain = async (
    prodId,
    productType,
    productQuantity
  ) => {
    const conCatProdName = ` ${prodName}_${prodId}`;

    const res = await listProduct(
      conCatProdName,
      parseEther(saleAmount.toString(), "wei").toString(),
      productType,
      productQuantity,
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");

    if (res.status == true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage("You've successfully placed " + prodName + " for sale");
    } else {
      setErrorModal(true);
      setErrorMessage(res.message);
      setIsLoading(false);
      setDisable(false);
    }
  };
  const UploadProduct = async () => {
    setIsLoading(true);
    setDisable(true);
    const formData = new FormData();

    let productType = true;
    let productQuantity = 1;

    let setProductType = "";

    if (productType == true) {
      setProductType = "DIRECT";
    } else {
      setProductType = "INDIRECT";
    }

    console.log(account);

    const element = document.getElementById("product_image");
    const element2 = document.getElementById("product_image2");
    const element3 = document.getElementById("product_image3");
    const file = element.files[0];
    const file2 = element2.files[0];
    const file3 = element3.files[0];
    formData.append("product_image", file);
    formData.append("product_image2", file2);
    formData.append("product_image3", file3);
    formData.append("product_name", prodName);
    formData.append("product_brand", brandName);
    formData.append("product_condition", prodCondition);
    formData.append("userAddress", account);
    formData.append("amount", saleAmount);
    formData.append("productType", setProductType);
    formData.append("productQuantity", productQuantity);
    console.log(formData);
    try {
      const res = await axios.post(
        API_URL + "/product/initialize/add/product",
        formData,
        config
      );
      console.log(res, "somto");
      if (res.status === 200) {
        sendProductToBlockchain(
          res.data.data.product_id,
          productType,
          productQuantity
        );
        return;
      }
    } catch (err) {
      console.log(err);
      console.log(err);
      setErrorModal(true);
      setErrorMessage(err.response.data.errorMessage);
      setIsLoading(false);
      setDisable(false);
    }
  };
  const handleNameChange = (event) => {
    setProdName(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleSaleAmountChange = (event) => {
    setSaleAmount(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleProdConditionChange = (event) => {
    setProdCondition(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  useEffect(() => {
    if (
      prodName == "" ||
      brandName == "" ||
      saleAmount == "" ||
      prodCondition == "" ||
      imageSrc == "" ||
      imageSrc2 == "" ||
      imageSrc3 == ""
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    prodName,
    brandName,
    saleAmount,
    prodCondition,
    imageSrc,
    imageSrc2,
    imageSrc3,
  ]);
  const CloseSuccessModal = () => {
    setSuccessModal(false);
  };  
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="sell_container">
            <div className="sell_container_header">Upload Item For Sale</div>
            <div className="sell_container_body">
              <div className="sell_container_body_cont1">
                <div className="sell_container_body_cont1_txt">
                  <div className="sell_container_body_cont1_txt_heading">
                    Image*
                  </div>{" "}
                  File types supported: JPG, PNG, SVG. Max size: 2 MB
                </div>
                <div className="sell_container_body_cont1_img_display_cont">
                  <div className="sell_container_body_cont1_img_display_cont_1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageSelect}
                      id="product_image"
                    />
                    <div className="sell_container_body_cont1_img_display_cont_divs">
                      {imageSrc === "" ? (
                        <div
                          onClick={handleClick}
                          className="sell_container_body_cont1_img_display_cont_div1"
                        >
                          <ImageIcon className="sell_container_body_cont1_img_display_cont_div1_icon" />
                        </div>
                      ) : null}

                      {imageSrc === "" ? null : (
                        <div className="sell_container_body_cont1_img_display_cont_div2">
                          <img
                            src={imageSrc}
                            alt="Selected image"
                            className="sell_container_body_cont1_img_display_cont_div2_img"
                          />
                        </div>
                      )}
                      {imageSrc === "" ? null : (
                        <CloseIcon
                          onClick={handleRemoveClick}
                          className="sell_container_body_cont1_img_display_cont_divs_close_icon"
                        />
                      )}
                    </div>
                  </div>
                  <div className="sell_container_body_cont1_img_display_cont_1">
                    <input
                      type="file"
                      ref={fileInputRef2}
                      style={{ display: "none" }}
                      onChange={handleImageSelect2}
                      id="product_image2"
                    />
                    <div className="sell_container_body_cont1_img_display_cont_divs">
                      {imageSrc2 === "" ? (
                        <div
                          onClick={handleClick2}
                          className="sell_container_body_cont1_img_display_cont_div1"
                        >
                          <ImageIcon className="sell_container_body_cont1_img_display_cont_div1_icon" />
                        </div>
                      ) : null}

                      {imageSrc2 === "" ? null : (
                        <div className="sell_container_body_cont1_img_display_cont_div2">
                          <img
                            src={imageSrc2}
                            alt="Selected image"
                            className="sell_container_body_cont1_img_display_cont_div2_img"
                          />
                        </div>
                      )}
                      {imageSrc2 === "" ? null : (
                        <CloseIcon
                          onClick={handleRemoveClick2}
                          className="sell_container_body_cont1_img_display_cont_divs_close_icon"
                        />
                      )}
                    </div>
                  </div>
                  <div className="sell_container_body_cont1_img_display_cont_1">
                    <input
                      type="file"
                      ref={fileInputRef3}
                      style={{ display: "none" }}
                      onChange={handleImageSelect3}
                      id="product_image3"
                    />
                    <div className="sell_container_body_cont1_img_display_cont_divs">
                      {imageSrc3 === "" ? (
                        <div
                          onClick={handleClick3}
                          className="sell_container_body_cont1_img_display_cont_div1"
                        >
                          <ImageIcon className="sell_container_body_cont1_img_display_cont_div1_icon" />
                        </div>
                      ) : null}

                      {imageSrc3 === "" ? null : (
                        <div className="sell_container_body_cont1_img_display_cont_div2">
                          <img
                            src={imageSrc3}
                            alt="Selected image"
                            className="sell_container_body_cont1_img_display_cont_div2_img"
                          />
                        </div>
                      )}
                      {imageSrc3 === "" ? null : (
                        <CloseIcon
                          onClick={handleRemoveClick3}
                          className="sell_container_body_cont1_img_display_cont_divs_close_icon"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="sell_container_body_cont1">
                <div className="sell_container_body_cont1_txt">
                  <div className="sell_container_body_cont1_txt_heading">
                    Name*
                  </div>{" "}
                </div>
                <div className="sell_container_body_cont1_title_div">
                  <input
                    onChange={handleNameChange}
                    name="productName"
                    id="productName"
                    type="text"
                    placeholder="Product name"
                    className="sell_container_body_cont1_title_div_input"
                    value={prodName}
                  />
                </div>
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="sell_container_body_cont1">
                <div className="sell_container_body_cont1_txt">
                  <div className="sell_container_body_cont1_txt_heading">
                    Brand Name*
                  </div>{" "}
                  The Brand of the product user uploads for sale.
                </div>
                <div className="sell_container_body_cont1_title_div">
                  <input
                    id="brandName"
                    name="brandName"
                    type="text"
                    placeholder="Brand name"
                    className="sell_container_body_cont1_title_div_input"
                    onChange={handleBrandNameChange}
                    value={brandName}
                  />
                </div>
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="sell_container_body_cont1">
                <div className="sell_container_body_cont1_txt">
                  <div className="sell_container_body_cont1_txt_heading">
                    Sale Amount*
                  </div>{" "}
                  The amount of items that can be minted. No gas cost to you!
                </div>
                <div className="sell_container_body_cont1_title_div">
                  <input
                    id="prodAmount"
                    name="prodAmount"
                    type="text"
                    placeholder="Product amount"
                    className="sell_container_body_cont1_title_div_input"
                    onChange={handleSaleAmountChange}
                    value={saleAmount}
                  />
                </div>
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}

              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="sell_container_body_cont1">
                <div className="sell_container_body_cont1_txt">
                  <div className="sell_container_body_cont1_txt_heading">
                    Product Condition*
                  </div>{" "}
                  The description will be included on the item's detail page
                  underneath its image. Markdown syntax is supported.
                </div>
                <div className="sell_container_body_cont1_title_div">
                  <textarea
                    name="productCondition"
                    id="productCondition"
                    cols="30"
                    rows="10"
                    className="sell_container_body_cont1_title_div_input"
                    onChange={handleProdConditionChange}
                    value={prodCondition}
                  ></textarea>
                </div>
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="sell_container_body_cont1">
                {!account ? (
                  <button
                    disabled={true}
                    className="sell_container_body_cont1_submit_btn"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <button
                    disabled={Disable}
                    className="sell_container_body_cont1_submit_btn"
                    onClick={UploadProduct}
                  >
                    {isLoading ? (
                      <ScaleLoader color="#24382b" size={10} height={20} />
                    ) : (
                      <> Upload Product</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
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
          route="/app/user/sales"
        />
      ) : null}
    </div>
  );
};

export default DashBoardSellProduct;
