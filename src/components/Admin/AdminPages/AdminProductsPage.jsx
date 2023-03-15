import React, { useState, useEffect, useContext, useRef } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "../AdminStyles/adminSellersPage.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EastIcon from "@mui/icons-material/East";
// import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
// import CloseIcon from "@mui/icons-material/Close";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../AdminStyles/adminProductPage.css";
import axios from "axios";
import { API_URL } from "../../../actions/types";
import { config } from "../../../actions/Config";
import { numberWithCommas } from "../../../static";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { parseEther, formatEther } from "@ethersproject/units";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
} from "../../../web3";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import add from "date-fns/add/index";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const AdminProductsPage = () => {
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
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [saleDetails, setSaleDetails] = useState("");
  const [editProductDiv, setEditProductDiv] = useState("");
  const [activeLink, setActiveLink] = useState("abstract-link");
  const [activeMenu, setActiveMenu] = useState("details-accord  ");
  const [prodName, setProdName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [new_brand, setNew_brand] = useState("");
  const [new_category, setNew_category] = useState("");
  const [saleAmount, setSaleAmount] = useState();
  const [newProducts, setNewProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [prodSpecification, setProdSpecification] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [imageSrc3, setImageSrc3] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const [addBrand, setAddBrand] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
  const sendProductToBlockchain = async (prodId) => {
    const conCatProdName = ` ${prodName}_${prodId}`;
    const res = await listProduct(
      conCatProdName,
      saleAmount,
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");

    // if (check.status == true) {
    //   let ret = await lendUS(
    //     txnhash,
    //     parseEther(formData.BackAmount.toString(), "wei").toString(),
    //     currentTarget,
    //     library.getSigner()
    //   );
    //   console.log(ret.status);
    //   if (ret.status == true) {
    //   } else if (ret.status == false) {
    //   }
    // } else {
    // }
  };
  const UploadProduct = async () => {
    const formData = new FormData();

    const element = document.getElementById("product_image");
    const element2 = document.getElementById("product_image2");
    const element3 = document.getElementById("product_image3");
    const file = element.files[0];
    const file2 = element2.files[0];
    const file3 = element3.files[0];
    formData.append("product_id", editProductDiv);
    formData.append("product_image", file);
    formData.append("product_image2", file2);
    formData.append("product_image3", file3);
    formData.append("product_name", prodName);
    formData.append("product_brand", new_brand);
    formData.append("product_category", new_category);
    formData.append("product_spec", prodSpecification);
    formData.append("product_details", product_details);
    formData.append("amount", parseInt(saleAmount));
    formData.append("adminAddr", "0x02828942wqo22713563");
    console.log(
      editProductDiv,
      file,
      file2,
      file3,
      prodName,
      new_brand,
      new_category,
      prodSpecification,
      saleAmount,
      product_details
    );
    try {
      const res = await axios.put(
        API_URL + "/product/update/new/product",
        formData,
        config
      );
      console.log(res, "somto");
      // if (res.status === 200) {
      //   sendProductToBlockchain(res.data.data.product_id);
      //   return;
      // }
    } catch (err) {
      console.log(err);
    }
  };
  const handleNameChange = (event) => {
    setProdName(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleNewBrandChange = (event) => {
    setNew_brand(event.target.value);
    console.log(event.target.value);
  };
  const handleNewCategoryChange = (event) => {
    setNew_category(event.target.value);
    console.log(event.target.value);
    // new_category, setNew_category
  };
  const addNewBrand = () => {
    allBrands.push({ product_brand: new_brand });
    setAddBrand(!addBrand);
    // new_brand, setNew_brand
  };
  const addNewCategory = () => {
    allCategories.push({ product_category: new_category });
    setAddCategory(!addCategory);
    // new_brand, setNew_brand
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
  const handleProdSpecChange = (event) => {
    setProdSpecification(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const SalableProduct = [
    {
      id: "1",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "3",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "4",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "5",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "6",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "7",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "8",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "9",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "10",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "11",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "12",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "13",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "14",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "15",
      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "Nil",
      UploadDate: "Nil",
      UploadingStatus: "Pending",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "16",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      Uploader: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      UploadingStatus: "Uploaded",
      UploadDate: "2/19/2023",

      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
  ];
  const ToggleSaleDetails = (e) => {
    setSaleDetails(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };
  const CloseSaleDetails = (e) => {
    setSaleDetails("");
  };
  const ToggleEditProduct = (e) => {
    setEditProductDiv(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };
  const CloseEditProduct = (e) => {
    setEditProductDiv("");
    console.log(e.currentTarget.id);
  };
  const toggleActive = (e) => {
    let link = e.currentTarget.id;
    setActiveLink(link);

    setActiveMenu("notDetails-accord ");

    console.log(e.currentTarget.id);
  };

  const toggleActiveDrop = () => {
    setActiveMenu("details-accord ");
  };
  const toggleAddCategory = () => {
    setAddCategory(!addCategory);
  };
  const toggleAddBrand = () => {
    setAddBrand(!addBrand);
  };
  const onEditorStateChange = (editorState) => {
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setFormData({ ...formData, product_details: text });
    setEditorState(editorState);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(API_URL + "/product/new", null, config);

      // console.log(res.data.data);
      setNewProducts(res.data.data);
      // newProducts, setNewProducts
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        API_URL + "/product/all-brands",
        null,
        config
      );

      console.log(res.data.data.allBrands);
      setAllBrands(res.data.data.allBrands);
      // allBrands, setAllBrands
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        API_URL + "/product/all-categories",
        null,
        config
      );

      console.log(res.data.data.allCategories);
      setAllCategories(res.data.data.allCategories);
      // allCategories, setAllCategories
    }

    fetchData();
  }, []);

  const handleCenter = (event) => {
    setNew_brand(event.target.value || "");
    console.log(event.target.value);
  };

  const handleCenter2 = (event) => {
    setNew_category(event.target.value || "");
    console.log(event.target.value);
  };

  const classes = useStyles();
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="sellers_overview_area">
            <div className="lending_area1">
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Products Approved
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(parseInt(lockedValue).toFixed(2))}{" "}
                    <span className="usd_sign">NGN</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total Engn funded to all assets in the lending
                    pool.
                  </div>
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Products Uploaded
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(parseInt(lockedValue / 570).toFixed(2))}{" "}
                    <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total Engn funded to all assets in the lending
                    pool.
                  </div>
                </div>
              </div>

              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Products Awaiting upload
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(
                      parseInt(totalLendingCapacity).toFixed(2)
                    )}{" "}
                    <span className="usd_sign">NGN</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total value of all the assets in the lending
                    pool.
                  </div>
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="table_body">
              <div className="filter_table_area">
                <div className="filter_table_area_1">All Approved Products</div>
                <div className="filter_table_area_1_search">
                  {/* <div className="dashboardMarketPlaceHeader_div1"> */}
                  <input
                    type="search"
                    placeholder="Search products"
                    name=""
                    id=""
                    className="dashboardMarketPlaceHeader_div1_search_input"
                  />
                  <SearchOutlinedIcon className="dashboardMarketPlaceHeader_div1_search_input_icon" />
                  {/* </div> */}
                </div>
              </div>
              <div className="filter_table_area">
                <div className="filter_table_area_1"></div>
                <div className="filter_table_area_2">
                  <div
                    id="Ongoing"
                    className={
                      activeBtn == "Ongoing"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Pending
                  </div>
                  <div
                    id="All"
                    className={
                      activeBtn == "All"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    All
                  </div>
                  <div
                    id="Closed"
                    className={
                      activeBtn == "Closed"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Uploaded
                  </div>
                </div>
              </div>
              <table className="assets-table">
                <thead className="assets-category-titles">
                  <tr className="assets">
                    <th className="assets-category-titles-heading1 left">
                      Product Name
                    </th>
                    <th className="assets-category-titles-heading1">
                      Sales Amount
                    </th>
                    <th className="assets-category-titles-heading1 ">Seller</th>
                    <th className="assets-category-titles-heading1  ">
                      Upload Status
                    </th>
                    <th className="assets-category-titles-heading1  ">
                      Uploader
                    </th>
                    <th className="assets-category-titles-heading1  ">
                      Upload Date
                    </th>
                  </tr>
                </thead>

                {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================

                
              </div> */}
                {newProducts.length <= 0 ? (
                  <div className="no_loans_div">
                    <div className="no_loans_div_cont">
                      <Nodata />
                      No Pools yet.
                    </div>{" "}
                  </div>
                ) : (
                  <tbody
                    className="assets-table-body popular-categories transitionMe"
                    id="popular-categories"
                  >
                    {" "}
                    {/* =============== */}
                    {/* =============== */}
                    {/* =============== */}
                    {newProducts.map((asset) => {
                      //   var percentage = (asset.funded / asset.amount) * 100;
                      return (
                        <tr
                          className="assets-category-row  transitionMe"
                          id={asset.product_id}
                          onClick={ToggleSaleDetails}
                          // onClick={() => {
                          //   ToggleSaleDetails();
                          // }}
                        >
                          <td className="assets-category-data branch_name_title">
                            <div className="assets-data">
                              <div className="assets-data-pool_name">
                                {asset.product_name}
                              </div>
                            </div>
                          </td>
                          <td className="assets-category-data1b stable-content branch_apy">
                            {numberWithCommas(
                              parseInt(asset.user_amount).toFixed(0)
                            )}{" "}
                            Eusd
                          </td>
                          <td className="assets-category-data1b stable-content branch_apy">
                            {asset.user_wallet != null
                              ? `${asset.user_wallet.slice(
                                  0,
                                  6
                                )}...${asset.user_wallet.slice(39, 42)}`
                              : "N/A"}
                          </td>
                          <td className="assets-category-data1b stable-content branch_apy">
                            {asset.status}
                          </td>
                          <td className="assets-category-data1b stable-content branch_apy">
                            {asset.personnel != null ? (
                              <>
                                {`${asset.personnel.slice(
                                  0,
                                  6
                                )}...${asset.personnel.slice(39, 42)}`}
                              </>
                            ) : (
                              <>{asset.personnel}</>
                            )}
                          </td>
                          <td className="assets-category-data1b stable-content branch_apy">
                            {asset.createdAt}
                          </td>
                          <td className="assets-category-data-last branch_loan_action">
                            <ArrowForwardIosIcon />
                          </td>
                        </tr>
                      );
                    })}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
      {saleDetails == ""
        ? null
        : newProducts.map((data) => (
            <>
              {data.product_id == saleDetails ? (
                <div className="saleDetailsDiv">
                  <div
                    className="saleDetailsDiv_close_div"
                    onClick={CloseSaleDetails}
                  ></div>
                  <div
                    className="saleDetailsDiv_area_closeIcon_div"
                    onClick={CloseSaleDetails}
                  >
                    <CloseIcon className="saleDetailsDiv_area_closeIcon" />
                    Close
                  </div>
                  <div className="saleDetailsDiv_area">
                    <div className="saleDetailsDiv_area_1">
                      <div className="saleDetailsDiv_area_1_title">
                        Products Details
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Images
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body"></div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.product_name}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Amount
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {numberWithCommas(
                            parseInt(data.user_amount).toFixed(0)
                          )}{" "}
                          Eusd
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Brand Name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.product_brand}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Condition
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.product_condition}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Status
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.status}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Txn Hash
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {/* {data.txnHash} */}
                          N/A
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Upload Date
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.createdAt}
                        </div>
                      </div>
                    </div>
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    <div className="saleDetailsDiv_area_1">
                      <div className="saleDetailsDiv_area_1_title">
                        Seller's Details
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Full name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          John Doe
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Wallet Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.Seller}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Phone number
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          +234 8164020234
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Residential Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          8b Lord emmanuel drive Port Harcourt Rivers State
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Country opf Residence
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          Nigeria
                        </div>
                      </div>
                    </div>

                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    <div className="approveProdButton">
                      <button
                        className="approveProdButton_btn"
                        id={data.product_id}
                        onClick={ToggleEditProduct}
                      >
                        Edit Product
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ))}

      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {editProductDiv == ""
        ? null
        : newProducts.map((data) => (
            <>
              {data.product_id == editProductDiv ? (
                <div className="editProductDiv">
                  <div
                    className="editProductDiv_close_div"
                    onClick={CloseEditProduct}
                  ></div>
                  <div className="editProductDiv_area">
                    <CloseIcon
                      className="editProductDiv_area_closeIcon"
                      onClick={CloseEditProduct}
                    />
                    <div className="sell_container">
                      <div className="sell_container_header">Edit Product</div>
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
                            <div className="sell_container_body_cont1_img_display_cont_1 sell_container_body_cont1_img_display_cont_1_last">
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
                              defaultValue={data.product_name}
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
                              Product Brand*
                            </div>{" "}
                            The Brand of the product user uploads for sale.
                          </div>
                          <div className="sell_container_body_cont1_title_div">
                            <select
                              name=""
                              id=""
                              className="sell_container_body_cont1_title_div_input"
                              onChange={handleCenter}
                            >
                              {allBrands.map((option) => (
                                <option
                                  key={option.product_brand}
                                  value={option.product_brand}
                                  // onClick={(e) =>
                                  //   getCatName(option.product_brand)
                                  // }
                                >
                                  {option.product_brand}
                                </option>
                              ))}
                            </select>

                            <button
                              className="add_category_btn"
                              onClick={toggleAddBrand}
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
                        {/* ========================= */}
                        {/* ========================= */}
                        <div className="sell_container_body_cont1">
                          <div className="sell_container_body_cont1_txt">
                            <div className="sell_container_body_cont1_txt_heading">
                              Product Amount*
                            </div>{" "}
                            The amount of items that can be minted. No gas cost
                            to you!
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
                              defaultValue={data.user_amount}
                            />
                          </div>
                        </div>
                        <div className="sell_container_body_cont1">
                          <div className="sell_container_body_cont1_txt">
                            <div className="sell_container_body_cont1_txt_heading">
                              Product Category*
                            </div>{" "}
                            The amount of items that can be minted. No gas cost
                            to you!
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
                        {/* ========================= */}
                        {/* ========================= */}
                        {/* ========================= */}
                        <div className="sell_container_body_cont1">
                          <div className="sell_container_body_cont1_txt">
                            <div className="sell_container_body_cont1_txt_heading">
                              Product Specifications*
                            </div>{" "}
                            The description will be included on the item's
                            detail page underneath its image. Markdown syntax is
                            supported.
                          </div>
                          <div className="sell_container_body_cont1_title_div">
                            <textarea
                              name="productCondition"
                              id="productCondition"
                              cols="30"
                              rows="10"
                              className="sell_container_body_cont1_title_div_input"
                              onChange={handleProdSpecChange}
                              value={prodSpecification}
                            ></textarea>
                          </div>
                        </div>
                        {/* ========================= */}
                        {/* ========================= */}
                        {/* ========================= */}
                        {/* ========================= */}
                        <div className="sell_container_body_cont1">
                          <div className="sell_container_body_cont1_txt">
                            <div className="sell_container_body_cont1_txt_heading">
                              Product Details*
                            </div>{" "}
                            The description will be included on the item's
                            detail page underneath its image. Markdown syntax is
                            supported.
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
                        <div className="sell_container_body_cont1">
                          <button
                            className="sell_container_body_cont1_submit_btn"
                            onClick={UploadProduct}
                          >
                            Upload Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {addCategory ? (
                    <div className="addCategoryDiv">
                      <div className="addCategoryArea">
                        <CloseIcon
                          className="addCategoryArea_closeIcon"
                          onClick={toggleAddCategory}
                        />
                        <div className="addCategoryArea1">
                          Add Product Category
                        </div>
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
                  {addBrand ? (
                    <div className="addCategoryDiv">
                      <div className="addCategoryArea">
                        <CloseIcon
                          className="addCategoryArea_closeIcon"
                          onClick={toggleAddBrand}
                        />
                        <div className="addCategoryArea1">
                          Add Product Brand
                        </div>
                        <div className="addCategoryArea2">
                          <input
                            type="text"
                            className="addCategoryArea2_input"
                            name="new_brand"
                            id="new_brand"
                            value={new_brand}
                            onChange={handleNewBrandChange}
                          />
                        </div>
                        <div className="addCategoryAreaButtonDiv">
                          <button
                            className="addCategoryAreaButton_btn"
                            onClick={addNewBrand}
                          >
                            Add Brand
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default AdminProductsPage;
