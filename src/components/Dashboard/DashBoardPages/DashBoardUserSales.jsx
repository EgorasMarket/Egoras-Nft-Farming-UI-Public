import React, { useState, useEffect, useContext } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EastIcon from "@mui/icons-material/East";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { numberWithCommas } from "../../../static";
import Nodata from "./nodataComponent/Nodata";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Link } from "react-router-dom";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  GET_ALL_UPLOADED_PRODUCTS,
  ACCEPT_BID,
} from "../../../services/productServices";
import { DISPLAY_NEW_PRODUCTS_CALL } from "../../../services/adminServices";
import { AcceptBid } from "../../../web3";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const DashBoardUserSales = () => {
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
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  // const [totalLendingCount, setTotalLendingCount] = useState(0);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [indexId, setIndexId] = useState(null);
  const [saleDetails, setSaleDetails] = useState("");
  const [activeLink, setActiveLink] = useState("abstract-link");
  const [activeMenu, setActiveMenu] = useState("details-accord  ");
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
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "17",

      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "18",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "19",

      ProductName: "Iphone 13pro max",
      ProductStatus: "Pending",
      Date: "2/19/2023",
      Amount: 600,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "20",

      ProductName: "Hp Elite Book",
      ProductStatus: "Approved",
      Date: "2/19/2023",
      Amount: 100,
      BiddingStatus: "Nil",
      BiddingAmount: 0,
      Seller: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
  ];

  const [uploadedProduct, setUploadedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DISPLAY_NEW_PRODUCTS_CALL();
      console.log(response.data, "goody");

      if (response.data) {
        setUploadedProducts(response.data);
      }
    };

    fetchData();
  }, []);

  const handleAcceptBid = async (action) => {
    // AcceptBid
    console.log(account, saleDetails, action);

    if (action == 1) {
      const res = await AcceptBid(indexId, library.getSigner());
      console.log(res, "somto8uhhhg");
    } else {
      const offChainRes = await ACCEPT_BID(account, saleDetails, action);
      console.log(offChainRes);
    }

    // console.log(res.status, "somto8uhhhg");
  };
  const ToggleSaleDetails = (product_id, index_id) => {
    setSaleDetails(product_id);
    setIndexId(index_id);
    console.log(product_id);
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

  const classes = useStyles();
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
      return;
    }
    if (currentPage === "/app/user/referral") {
      setActiveLink("referral");
      return;
    }
    if (currentPage === "/app/user/sales") {
      setActiveLink("sales");
      return;
    }
  });
  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className=" no-bg no_paddd ">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="pool_lending_pages_links">
              <Link
                to="/app/user"
                className={
                  activeLink === "poolDetails"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <DashboardIcon className="asset_overview_link_icon" />
                User Details
              </Link>
              <Link
                to="/app/user/referral"
                className={
                  activeLink === "referral"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <GroupAddIcon className="asset_overview_link_icon" />
                Referral
              </Link>
              <Link
                to="/app/user/sales"
                className={
                  activeLink === "sales"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <TrendingDownIcon className="asset_overview_link_icon" />
                Sales
              </Link>
            </div>
            <div className="sellers_overview_area">
              <div className="lending_area1">
                <div className="lending_area1_cont1">
                  <div className="lending_area1_cont1_body_1">
                    <div className="lending_area1_cont1_heading">
                      Total Products uploaded for sale
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
                      Total Products Approved
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
                      Total Amount Products Uploaded
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

                <div className="lending_area1_cont1">
                  <div className="lending_area1_cont1_body_1">
                    <div className="lending_area1_cont1_heading">
                      Total Amount Products Approved
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
                  <div className="filter_table_area_1">Uploaded Sales</div>
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
                      Approved
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
                      <th className="assets-category-titles-heading1 ">
                        Seller
                      </th>
                      <th className="assets-category-titles-heading1 ">
                        Bidding Status
                      </th>
                      <th className="assets-category-titles-heading1 ">
                        Bidding Amount
                      </th>
                      <th className="assets-category-titles-heading1  ">
                        Product Status
                      </th>
                      <th className="assets-category-titles-heading1 ">
                        Txn hash
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
                  {uploadedProduct.length <= 0 ? (
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
                      {activeBtn === "Ongoing"
                        ? uploadedProduct
                            .filter((person) => person.status == "NEW")
                            .map((asset) => {
                              //   var percentage = (asset.funded / asset.amount) * 100;
                              return (
                                <tr
                                  className="assets-category-row  transitionMe"
                                  id={asset.product_id}
                                  // onClick={ToggleSaleDetails}
                                  onClick={() => {
                                    ToggleSaleDetails(
                                      asset.product_id,
                                      asset.index_id
                                    );
                                  }}
                                >
                                  <td className="assets-category-data branch_name_title">
                                    <div className="assets-data">
                                      <div className="assets-data-pool_name">
                                        {asset.product_name}
                                        <span className="poolName_txt">
                                          {asset.createdAt}
                                        </span>
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
                                    {`${asset.user_wallet.slice(
                                      0,
                                      6
                                    )}...${asset.user_wallet.slice(39, 42)}`}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.bidAmount != null
                                      ? asset.bidStatus
                                      : "N/A"}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.bidAmount != null
                                      ? numberWithCommas(
                                          parseInt(asset.bidAmount).toFixed(0) +
                                            " Eusd"
                                        )
                                      : "N/A"}{" "}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.status == "NEW"
                                      ? "Pending Approval"
                                      : asset.status}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {/* {`${asset.txnHash.slice(
                                      0,
                                      6
                                    )}...${asset.txnHash.slice(63, 66)}`} */}
                                    {"N/A"}
                                  </td>
                                  <td className="assets-category-data-last branch_loan_action">
                                    <ArrowForwardIosIcon />
                                  </td>
                                </tr>
                              );
                            })
                        : activeBtn === "All"
                        ? uploadedProduct.map((asset) => {
                            return (
                              <tr
                                className="assets-category-row  transitionMe"
                                id={asset.id}
                                onClick={ToggleSaleDetails}
                              >
                                <td className="assets-category-data branch_name_title">
                                  <div className="assets-data">
                                    <div className="assets-data-pool_name">
                                      {asset.ProductName}
                                      <span className="poolName_txt">
                                        {asset.Date}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {numberWithCommas(
                                    parseInt(asset.Amount).toFixed(0)
                                  )}{" "}
                                  Eusd
                                </td>
                                {/* <td className="assets-category-data1b stable-content branch_apy">
                                  {`${asset.Seller.slice(
                                    0,
                                    6
                                  )}...${asset.Seller.slice(39, 42)}`}
                                </td> */}
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {asset.BiddingStatus}
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {asset.BiddingAmount} Eusd
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {asset.ProductStatus}
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {`${asset.txnHash.slice(
                                    0,
                                    6
                                  )}...${asset.txnHash.slice(63, 66)}`}
                                </td>
                                <td className="assets-category-data-last branch_loan_action">
                                  <ArrowForwardIosIcon />
                                </td>
                              </tr>
                            );
                          })
                        : activeBtn === "Closed"
                        ? uploadedProduct
                            .filter(
                              (person) => person.ProductStatus == "Approved"
                            )
                            .map((asset) => {
                              return (
                                <tr
                                  className="assets-category-row  transitionMe"
                                  id={asset.id}
                                  onClick={ToggleSaleDetails}
                                >
                                  <td className="assets-category-data branch_name_title">
                                    <div className="assets-data">
                                      <div className="assets-data-pool_name">
                                        {asset.ProductName}
                                        <span className="poolName_txt">
                                          {asset.Date}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {numberWithCommas(
                                      parseInt(asset.Amount).toFixed(0)
                                    )}{" "}
                                    Eusd
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {`${asset.Seller.slice(
                                      0,
                                      6
                                    )}...${asset.Seller.slice(39, 42)}`}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.BiddingStatus}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.BiddingAmount} Eusd
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.ProductStatus}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {`${asset.txnHash.slice(
                                      0,
                                      6
                                    )}...${asset.txnHash.slice(63, 66)}`}
                                  </td>
                                  <td className="assets-category-data-last branch_loan_action">
                                    <ArrowForwardIosIcon />
                                  </td>
                                </tr>
                              );
                            })
                        : null}
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
        </div>
      </section>
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {saleDetails == ""
        ? null
        : uploadedProduct.map((data) => (
            <>
              {data.product_id === saleDetails ? (
                <div className="saleDetailsDiv">
                  <div
                    className="saleDetailsDiv_close_div"
                    onClick={ToggleSaleDetails}
                  ></div>
                  <div
                    className="saleDetailsDiv_area_closeIcon_div"
                    onClick={ToggleSaleDetails}
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
                          {"N/A"}
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
                          {data.fullName}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Wallet Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.user_wallet}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Phone number
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.phoneNumber}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Residential Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.userAddress}
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
                    <div className="saleDetailsDiv_area_1">
                      <div className="saleDetailsDiv_area_1_title">
                        Bidding Action
                      </div>
                      {data.bidAmount != null ? (
                        <>
                          <div className="saleDetailsDiv_area_1_div1">
                            <div className="saleDetailsDiv_area_1_div1_title">
                              Bidding Status
                            </div>
                            <div className="saleDetailsDiv_area_1_div1_body">
                              {data.bidStatus}
                            </div>
                          </div>
                          <div className="saleDetailsDiv_area_1_div1">
                            <div className="saleDetailsDiv_area_1_div1_title">
                              Bidding Amount
                            </div>
                            <div className="saleDetailsDiv_area_1_div1_body">
                              {data.bidAmount}
                            </div>
                          </div>
                          <div className="acceptDeclineBidButtons">
                            <button
                              // onClick={handleAcceptBid}
                              onClick={() => {
                                handleAcceptBid(1);
                              }}
                              className="acceptDeclineBidButtons_accept"
                            >
                              Accept Bid
                            </button>
                            <button
                              onClick={() => {
                                handleAcceptBid(0);
                              }}
                              className="acceptDeclineBidButtons_decline"
                            >
                              Decline Bid
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="saleDetailsDiv_area_1_div1">
                          <div className="saleDetailsDiv_area_1_div1_title">
                            No bidding for this product yet
                          </div>
                        </div>
                      )}
                    </div>
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                  </div>
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default DashBoardUserSales;
