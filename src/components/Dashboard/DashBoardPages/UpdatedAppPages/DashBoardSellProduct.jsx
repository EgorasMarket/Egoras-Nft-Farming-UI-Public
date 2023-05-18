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
import DirectUpload from "./DirectUpload";
import IndirectUpload from "../IndirectUpload";
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
  CALL_IMG_CMS,
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
  const [prodAmount, setProdAmount] = useState("");
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
  const [inputCount, setInputCount] = useState(1);
  const [route, setRoute] = useState("");
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
    console.log(productType);
    console.log(conCatProdName);

    // let res;

    if (activeSaleTab == "direct") {
      let setPass = true;
      const res = await listProduct(
        conCatProdName,
        parseEther(prodAmount.toString(), "wei").toString(),
        setPass,
        prodCount,
        library.getSigner()
      );
      console.log(res, "somto8uhhhg");
      console.log(res.status, "somto8uhhhg");

      if (res.status == true) {
        setIsLoading(false);
        setDisable(false);
        setSuccessModal(true);
        setRoute("/app/user/p2p_sales");
        setSuccessMessage(
          "You've successfully placed " + prodName + " for sale"
        );
      } else {
        setErrorModal(true);
        setErrorMessage(res.message);
        setIsLoading(false);
        setDisable(false);
      }
    } else {
      let setPass = false;
      const res = await listProduct(
        conCatProdName,
        parseEther(saleAmount.toString(), "wei").toString(),
        setPass,
        prodCount,
        library.getSigner()
      );
      console.log(res, "somto8uhhhg");
      console.log(res.status, "somto8uhhhg");

      if (res.status == true) {
        setIsLoading(false);
        setDisable(false);
        setSuccessModal(true);
        setRoute("/app/user/sales");
        setSuccessMessage(
          "You've successfully placed " + prodName + " for sale"
        );
      } else {
        setErrorModal(true);
        setErrorMessage(res.message);
        setIsLoading(false);
        setDisable(false);
      }
    }

    // console.log(res, "somto8uhhhg");
    // console.log(res.status, "somto8uhhhg");
    // console.log(res.status, "somto8uhhhg");
  };

  const handleImgCms = async () => {
    const formData = new FormData();
    console.log(activeSaleTab, account, "______UUUUUU");

    const element = document.getElementById("product_image");
    const element2 = document.getElementById("product_image2");
    const element3 = document.getElementById("product_image3");
    const file = element.files[0];
    const file2 = element2.files[0];
    const file3 = element3.files[0];
    formData.append("product_image", file);
    formData.append("product_image2", file2);
    formData.append("product_image3", file3);

    const res = await CALL_IMG_CMS(formData);
    // console.log(res);

    if (res.success == true) {
      console.log("okkk");
      return res.data;
    } else {
      console.log("Not Ok");
    }
  }

  const UploadProduct = async () => {

    setIsLoading(true);
    setDisable(true);
    let img_cms = await handleImgCms();

    console.log(img_cms);
    const formData = new FormData();
    console.log(activeSaleTab, account, "______UUUUUU");

    formData.append("product_image", img_cms.image_1);
    formData.append("product_image2", img_cms.image_2);
    formData.append("product_image3", img_cms.image_3);
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
        } else {
          setIsLoading(false);
          setDisable(false);
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
        } else {
          setIsLoading(false);
          setDisable(false);
        }
      } catch (err) {
        console.log(err.response);
        console.log(err);
        console.log(err.message);
        if (err.message == "Network Error") {
          setErrorModal(true);
          setErrorMessage(err.message);
          setIsLoading(false);
          setDisable(false);
        } else {
          setErrorModal(true);
          setErrorMessage(err.response.data.errorMessage);
          setIsLoading(false);
          setDisable(false);
        }
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
    console.log(response, "goody");

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
      let text = draftToHtml(convertToRaw(contentState));
      console.log(text);
      setEditorState(EditorState.createWithContent(contentState));
      const targetSection = document.querySelector("#target-section");
      targetSection.scrollIntoView({ behavior: "smooth" });
      setFormData({ ...formData, product_details: text });
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
  // const handleProdSpecChange = (event) => {
  //   setProdSpec(event.target.value);
  //   console.log(event.target.value);
  //   //console.log(event.target.value);
  // };
  const handleProdCountChange = (event) => {
    setProdCount(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await GET_CATEGORIES();

      console.log(res.data.allCategories);
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

    console.log(editorState.getCurrentContent());

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
  const handleInputChange = (event, i) => {
    const inputValues = [];
    for (let j = 0; j < inputCount; j++) {
      const name = document.getElementById(`name-${j}`).value;
      const value = document.getElementById(`value-${j}`).value;
      inputValues.push(`${name}:${value}`);
    }
    //  console.log();
    let concatenatedValues = inputValues.join(",");
    setProdSpec(concatenatedValues);
  };

  const inputDivs = [];
  for (let i = 0; i < inputCount; i++) {
    inputDivs.push(
      <div className="sell_container_prod_spec_input_divs" key={i}>
        <input
          type="text"
          className="sell_container_prod_spec_input_div1"
          id={`name-${i}`}
          onChange={(event) => handleInputChange(event, i)}
        />
        -
        <input
          type="text"
          className="sell_container_prod_spec_input_div1"
          id={`value-${i}`}
          onChange={(event) => handleInputChange(event, i)}
        />
      </div>
    );
  }
  const AddInputCount = () => {
    setInputCount(inputCount + 1);
  };
  useEffect(() => {
    console.log(prodSpec);
  }, [prodSpec]);

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
              <DirectUpload
                Disable={Disable}
                UploadProduct={UploadProduct}
                isLoading={isLoading}
                onEditorStateChange={onEditorStateChange}
                // handleProdSpecChange={handleProdSpecChange}
                account={account}
                prodSpec={prodSpec}
                toggleAddCategory={toggleAddCategory}
                handleProdStateChange={handleProdStateChange}
                prodCount={prodCount}
                handleCenter2={handleCenter2}
                allCategories={allCategories}
                editorState={editorState}
                brandName={brandName}
                handleSaleAmountChange={handleSaleAmountChange}
                handleProdCountChange={handleProdCountChange}
                prodAmount={prodAmount}
                imageSrc3={imageSrc3}
                handleRemoveClick3={handleRemoveClick3}
                handleBrandNameChange={handleBrandNameChange}
                fileInputRef3={fileInputRef3}
                handleImageSelect3={handleImageSelect3}
                handleClick3={handleClick3}
                imageSrc2={imageSrc2}
                handleRemoveClick2={handleRemoveClick2}
                handleRemoveClick={handleRemoveClick}
                fileInputRef2={fileInputRef2}
                handleImageSelect2={handleImageSelect2}
                handleClick2={handleClick2}
                handleClick={handleClick}
                imageSrc={imageSrc}
                generateAI={generateAI}
                isLoading2={isLoading2}
                fileInputRef={fileInputRef}
                handleImageSelect={handleImageSelect}
                handleNameChange={handleNameChange}
                prodName={prodName}
                inputDivs={inputDivs}
                AddInputCount={AddInputCount}
              />
            ) : (
              <IndirectUpload
                Disable={Disable}
                UploadProduct={UploadProduct}
                isLoading={isLoading}
                saleAmount={saleAmount}
                handleProdConditionChange={handleProdConditionChange}
                prodCondition={prodCondition}
                account={account}
                brandName={brandName}
                handleProdCountChange={handleProdCountChange}
                prodCount={prodCount}
                handleSaleAmountChange={handleSaleAmountChange}
                handleRemoveClick3={handleRemoveClick3}
                handleNameChange={handleNameChange}
                prodName={prodName}
                handleBrandNameChange={handleBrandNameChange}
                handleClick3={handleClick3}
                imageSrc3={imageSrc3}
                imageSrc2={imageSrc2}
                handleRemoveClick2={handleRemoveClick2}
                fileInputRef3={fileInputRef3}
                handleImageSelect3={handleImageSelect3}
                fileInputRef={fileInputRef}
                handleImageSelect={handleImageSelect}
                imageSrc={imageSrc}
                handleClick={handleClick}
                handleRemoveClick={handleRemoveClick}
                fileInputRef2={fileInputRef2}
                handleImageSelect2={handleImageSelect2}
                handleClick2={handleClick2}
              />
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
          route={route}
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
