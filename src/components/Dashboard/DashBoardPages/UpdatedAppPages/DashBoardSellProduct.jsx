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
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import UpdatedErrorModal from "./UpdatedSuccessErrorModals/UpdatedErrorModal";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

import {
  CALL_AI_TEXT,
  CALL_AI_IMAGES,
  GET_CATEGORIES,
  CALL_INITIALIZE_DIRECT_PRODUCT,
} from "../../../../services/productServices";
import { listProduct } from "../../../../web3/index";

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
  const [prodAmount, setProdAmount] = useState(null);
  const [prodCondition, setProdCondition] = useState("");
  const [prodSpec, setProdSpec] = useState("");
  const [prodCount, setProdCount] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [imageSrc3, setImageSrc3] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [new_category, setNew_category] = useState("");
  const [prodState, setProdState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [activeSaleTab, setActiveSaleTab] = useState("direct");
  const [Disable, setDisable] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [addBrand, setAddBrand] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const [formData, setFormData] = useState({
    product_details: "",
  });
  const { product_details } = formData;
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
      console.log(reader.result);
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
  const handleCenter2 = (event) => {
    setNew_category(event.target.value || "");
    console.log(event.target.value);
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
  const sendProductToBlockchain = async (prodId, productType, prodCount) => {
    const conCatProdName = ` ${prodName}_${prodId}`;

    let res;

    if (activeSaleTab == "direct") {
      res = await listProduct(
        conCatProdName,
        parseEther(prodAmount.toString(), "wei").toString(),
        productType,
        prodCount,
        library.getSigner()
      );
    } else {
      res = await listProduct(
        conCatProdName,
        parseEther(saleAmount.toString(), "wei").toString(),
        productType,
        prodCount,
        library.getSigner()
      );
    }

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
    console.log(activeSaleTab);

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
    formData.append("userAddress", account);
    formData.append("productQuantity", prodCount);

    if (activeSaleTab == "direct") {
      formData.append("product_category", new_category);
      formData.append("product_details", product_details);
      formData.append("prod_spec", prodSpec);
      formData.append("product_state", prodState);
      formData.append("product_amount", prodAmount);
      formData.append("productType", "DIRECT");

      try {
        const res = await axios.post(
          API_URL + "/product/initialize/add/product/direct",
          formData,
          config
        );
        console.log(res, "somto");
        if (res.status === 200) {
          sendProductToBlockchain(
            res.data.data.product_id,
            "DIRECT",
            prodCount
          );
          return;
        }
      } catch (err) {
        console.log(err.response);
        setErrorModal(true);
        setErrorMessage(err.response.data.errorMessage);
        setIsLoading(false);
        setDisable(false);
      }
    } else {
      formData.append("product_condition", prodCondition);
      formData.append("amount", saleAmount);
      formData.append("productType", "INDIRECT");

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
            "INDIRECT",
            prodCount
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
    }

    // console.log(
    //   prodName,
    //   file,
    //   file2,
    //   file3,
    //   brandName,
    //   prodAmount,
    //   prodCount,
    //   new_category,
    //   product_details,
    //   prodSpec,
    //   prodState + "sa"
    // );
  };

  const generateAI = async () => {
    console.log(prodName, prodCount);
    setIsLoading2(true);

    const response = await CALL_AI_TEXT(prodName);
    console.log(response.data.choices.text, "goody");

    const response1 = await CALL_AI_IMAGES(prodName);
    console.log(response1.data.data, "goody");

    if (response.data) {
      setIsLoading2(false);
      const content = {
        entityMap: {},
        blocks: [
          {
            key: "637gr",
            text: response.data.choices[0].text,
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
      };
      const contentState = convertFromRaw(content);
      console.log(contentState);
      setEditorState(EditorState.createWithContent(contentState));
      const targetSection = document.querySelector("#target-section");
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    if (response1.data) {
      async function AIimage1() {
        fetch(response1.data.data[0].url)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;
              console.log(base64data);
              setImageSrc(base64data);
            };
          });
      }
      async function AIimage2() {
        fetch(response1.data.data[1].url)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;
              console.log(base64data);
              setImageSrc2(base64data);
            };
          });
      }
      async function AIimage3() {
        fetch(response1.data.data[3].url)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;
              console.log(base64data);
              setImageSrc3(base64data);
            };
          });
      }
      AIimage1();
      AIimage2();
      AIimage3();
    }
  };

  const handleNameChange = (event) => {
    setProdName(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };

  const handleProdStateChange = (event) => {
    setProdState(event.target.value);
    console.log(event.target.value);
    // prodState, setProdState
    //console.log(event.target.value);
  };
  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleSaleAmountChange = (event) => {
    if (activeSaleTab == "direct") {
      setProdAmount(event.target.value);
    } else {
      setSaleAmount(event.target.value);
    }
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleProdConditionChange = (event) => {
    setProdCondition(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleProdSpecChange = (event) => {
    setProdSpec(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleProdCountChange = (event) => {
    setProdCount(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await GET_CATEGORIES();

      // console.log(res.data.allCategories);
      setAllCategories(res.data.allCategories);
      // allCategories, setAllCategories
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(
      prodName,
      brandName,
      prodAmount,
      prodCount,
      new_category,
      product_details,
      prodSpec,
      prodState
      // imageSrc,
      // imageSrc2,
      // imageSrc3
    );
    if (activeSaleTab == "direct") {
      if (
        prodName == "" ||
        brandName == "" ||
        prodAmount == null ||
        // prodCount == 0 ||
        new_category == "" ||
        product_details == "" ||
        prodSpec == "" ||
        prodState == "" ||
        imageSrc == "" ||
        imageSrc2 == "" ||
        imageSrc3 == ""
      ) {
        console.log("okkkkk<<<<<<<<<<<<<");
        setDisable(true);
      } else {
        console.log("______");
        setDisable(false);
      }
    } else {
      if (
        prodName == "" ||
        brandName == "" ||
        saleAmount == "" ||
        prodCondition == "" ||
        prodCount == 0 ||
        imageSrc == "" ||
        imageSrc2 == "" ||
        imageSrc3 == ""
      ) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [
    activeSaleTab,
    prodName,
    brandName,
    saleAmount,
    prodAmount,
    prodCondition,
    imageSrc,
    imageSrc2,
    imageSrc3,
    prodCount,
    new_category,
    product_details,
    prodSpec,
    prodState,
  ]);
  const CloseSuccessModal = () => {
    setSuccessModal(false);
  };  
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  const toggleActiveTab = (e) => {
    let id = e.currentTarget.id;
    setActiveSaleTab(id);
  };
  const onEditorStateChange = (editorState) => {
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setFormData({ ...formData, product_details: text });
    setEditorState(editorState);
  };
  const toggleAddBrand = () => {
    setAddBrand(!addBrand);
  };

  const toggleAddCategory = () => {
    setAddCategory(!addCategory);
  };
  const addNewCategory = () => {
    allCategories.push({ product_category: new_category });
    setAddCategory(!addCategory);
    // new_brand, setNew_brand
  };
  const handleNewCategoryChange = (event) => {
    setNew_category(event.target.value);
    console.log(event.target.value);
    // new_category, setNew_category
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
            <div className="sell_container_tabs">
              <div
                className={
                  activeSaleTab == "direct"
                    ? "sell_container_tabs_1_active"
                    : "sell_container_tabs_1"
                }
                id="direct"
                onClick={toggleActiveTab}
              >
                Direct Upload
              </div>
              <div
                className={
                  activeSaleTab == "Indirect"
                    ? "sell_container_tabs_1_active"
                    : "sell_container_tabs_1"
                }
                id="Indirect"
                onClick={toggleActiveTab}
              >
                Express Upload
              </div>
            </div>
            {activeSaleTab === "direct" ? (
              <div className="uploadDiv">
                <div className="sell_container_header">
                  Upload Items Directly For Buying.
                </div>
                <div className="sell_container_body">
                  <div className="sell_container_body_cont1">
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Product Name*
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
                      <button
                        className="sell_container_body_cont1_title_div_btn"
                        onClick={generateAI}
                      >
                        {isLoading2 ? (
                          <ScaleLoader color="#24382b" size={10} height={20} />
                        ) : (
                          <span> Generate Details </span>
                        )}
                      </button>
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
                        Image*
                      </div>{" "}
                      File types supported: JPG, PNG. Max size: 2 MB
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
                        Product Amount*
                      </div>{" "}
                      The amount of items that can be minted. No gas cost to
                      you!
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <input
                        id="prodAmount"
                        name="prodAmount"
                        type="text"
                        placeholder="Product amount"
                        className="sell_container_body_cont1_title_div_input"
                        onChange={handleSaleAmountChange}
                        value={prodAmount}
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
                  <div className="sell_container_body_cont1">
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Product Count*
                      </div>{" "}
                      The amount of items that can be minted. No gas cost to
                      you!
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <input
                        id="prodCount"
                        name="prodCount"
                        type="number"
                        placeholder="Product count"
                        className="sell_container_body_cont1_title_div_input"
                        onChange={handleProdCountChange}
                        value={prodCount}
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
                  <div className="sell_container_body_cont1">
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Product Category*
                      </div>{" "}
                      The amount of items that can be minted. No gas cost to
                      you!
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <select
                        name=""
                        id=""
                        className="sell_container_body_cont1_title_div_input"
                        onChange={handleCenter2}
                      >
                        {allCategories.map((option) => (
                          <option
                            key={option.product_category}
                            value={option.product_category}
                            // onClick={(e) =>
                            //   getCatName(option.product_brand)
                            // }
                          >
                            {option.product_category}
                          </option>
                        ))}
                      </select>

                      <button
                        className="add_category_btn"
                        onClick={toggleAddCategory}
                      >
                        +
                      </button>
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
                  <div className="sell_container_body_cont1">
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Product State*
                      </div>{" "}
                      The amount of items that can be minted. No gas cost to
                      you!
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <select
                        name=""
                        id=""
                        className="sell_container_body_cont1_title_div_input"
                        onChange={handleProdStateChange}
                      >
                        <option value=""></option>
                        <option value="1">New</option>
                        <option value="2">Refurbished</option>
                      </select>
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
                  <div
                    className="sell_container_body_cont1"
                    id="target-section"
                  >
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Product Details*
                      </div>{" "}
                      The description will be included on the item's detail page
                      underneath its image. Markdown syntax is supported.
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorStateChange}
                        placeholder="Begin Typing..."
                      />
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
                        Product Specifications*
                      </div>{" "}
                      The description will be included on the item's detail page
                      underneath its image. Markdown syntax is supported.
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <textarea
                        name="prodSpec"
                        id="prodSpec"
                        cols="30"
                        rows="10"
                        className="sell_container_body_cont1_title_div_input"
                        onChange={handleProdSpecChange}
                        value={prodSpec}
                      ></textarea>
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
            ) : (
              <div className="uploadDiv">
                <div className="sell_container_header">
                  Get Instant Cash After Evaluation.
                </div>
                <div className="sell_container_body">
                  <div className="sell_container_body_cont1">
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Image*
                      </div>{" "}
                      File types supported: JPG, PNG. Max size: 2 MB
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
                        Product Count*
                      </div>{" "}
                      The amount of items that can be minted. No gas cost to
                      you!
                    </div>
                    <div className="sell_container_body_cont1_title_div">
                      <input
                        id="prodCount"
                        name="prodCount"
                        type="number"
                        placeholder="Product count"
                        className="sell_container_body_cont1_title_div_input"
                        onChange={handleProdCountChange}
                        value={prodCount}
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
                  <div className="sell_container_body_cont1">
                    <div className="sell_container_body_cont1_txt">
                      <div className="sell_container_body_cont1_txt_heading">
                        Sale Amount*
                      </div>{" "}
                      The amount of items that can be minted. No gas cost to
                      you!
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
            )}
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
      {addBrand ? (
        <div className="addCategoryDiv_sales">
          <div className="addCategoryArea">
            <CloseIcon
              className="addCategoryArea_closeIcon"
              onClick={toggleAddBrand}
            />
            <div className="addCategoryArea1">Add Product Brand</div>
            <div className="addCategoryArea2">
              <input
                type="text"
                className="addCategoryArea2_input"
                name="new_brand"
                id="new_brand"
                // value={new_brand}
                // onChange={handleNewBrandChange}
              />
            </div>
            <div className="addCategoryAreaButtonDiv">
              <button
                className="addCategoryAreaButton_btn"
                // onClick={addNewBrand}
              >
                Add Brand
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {addCategory ? (
        <div className="addCategoryDiv_sales">
          <div className="addCategoryArea">
            <CloseIcon
              className="addCategoryArea_closeIcon"
              onClick={toggleAddCategory}
            />
            <div className="addCategoryArea1">Add Product Category</div>
            <div className="addCategoryArea2">
              <input
                type="text"
                className="addCategoryArea2_input"
                name="new_category"
                id="new_category"
                value={new_category}
                onChange={handleNewCategoryChange}
              />
            </div>
            <div className="addCategoryAreaButtonDiv">
              <button
                className="addCategoryAreaButton_btn"
                onClick={addNewCategory}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashBoardSellProduct;
