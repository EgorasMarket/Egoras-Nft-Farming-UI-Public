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
import UserDetailsLinks from "./UserDetailsLinks";
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
  DISPLAY_NEW_USER_PRODUCTS_CALL,
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
const DashBoardP2PUserSales = () => {
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
  const [activeTab, setActiveTab] = useState("buyer");
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const [uploadedProduct, setUploadedProducts] = useState([]);

  useEffect(() => {
    console.log("kddd_____");
    const fetchData = async () => {
      const response = await DISPLAY_NEW_USER_PRODUCTS_CALL(account);
      console.log(response.data, "goody");

      if (response.data) {
        setUploadedProducts(response.data);
      }
    };

    fetchData();
  }, [account]);

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
    if (currentPage === "/app/user/p2p_sales") {
      setActiveLink("p2p");
      return;
    }
  });
  const buyOrders = [
    {
      id: "1",
      img: "/img/img5.png",
      name: "Hisense Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Pending",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "2",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Pending",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "3",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Shipped",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "4",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Pending",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "5",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Shipped",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "6",
      img: "/img/img5.png",
      name: "Samsung Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Shipped",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
  ];
  const toggleActiveTab = (e) => {
    let active = e.currentTarget.id;
    setActiveTab(active);
  };
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
            <UserDetailsLinks activeLink={activeLink} />
            <div className="BuyerSellerDiv">
              <div className="BuyerSellerDiv_tabs">
                <div
                  id="buyer"
                  className={
                    activeTab === "buyer"
                      ? "BuyerSellerDiv_tab1_active"
                      : "BuyerSellerDiv_tab1"
                  }
                  onClick={toggleActiveTab}
                >
                  Buy Orders
                </div>
                <div
                  id="seller"
                  className={
                    activeTab === "seller"
                      ? "BuyerSellerDiv_tab1_active"
                      : "BuyerSellerDiv_tab1"
                  }
                  onClick={toggleActiveTab}
                >
                  Sell Orders
                </div>
              </div>
              {activeTab === "buyer" ? (
                <div className="BuyerSellerDiv_body">
                  <div className="BuyerSellerDiv_body_div1">
                    <div className="BuyerSellerDiv_body_div1_text">
                      Buyer Overview
                    </div>
                    <div className="lending_area1">
                      <div className="lending_area1_cont1_user">
                        <div className="lending_area1_cont1_body_1">
                          <div className="lending_area1_cont1_heading">
                            Total amount of items bought
                          </div>
                          <div className="lending_area1_cont1_body_txt">
                            180
                            <span className="usd_sign"> items</span>
                          </div>
                        </div>
                        <div className="lending_area1_cont1_body_1">
                          <HelpOutlineIcon className="help_outline" />
                          <div className="helper_txt_div">
                            This is the total value of all the assets in the
                            lending pool.
                          </div>
                        </div>
                      </div>

                      <div className="lending_area1_cont1_user">
                        <div className="lending_area1_cont1_body_1">
                          <div className="lending_area1_cont1_heading">
                            Total price of items Bought
                          </div>
                          <div className="lending_area1_cont1_body_txt">
                            100,000<span className="usd_sign"> eusd</span>
                          </div>
                        </div>
                        <div className="lending_area1_cont1_body_1">
                          <HelpOutlineIcon className="help_outline" />
                          <div className="helper_txt_div">
                            This is the total value of all the assets in the
                            lending pool.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="BuyerSellerDiv_body_div2">
                    <div className="BuyerSellerDiv_body_div2_tab_area">
                      <div className="filter_table_area_1">Buy Orders</div>
                      <div className="filter_table_area_2 filter_table_area_2b">
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
                          Shipped
                        </div>
                        <div
                          id="approve"
                          className={
                            activeBtn == "approve"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Approved
                        </div>
                      </div>
                    </div>
                    <div className="BuyerSellerDiv_body_div2_body">
                      <table className="assets-table">
                        <thead className="assets-category-titles">
                          <tr className="assets">
                            <th className="assets-category-titles-heading1 left">
                              Product Name
                            </th>
                            <th className="assets-category-titles-heading1">
                              Amount
                            </th>
                            <th className="assets-category-titles-heading1 ">
                              Seller
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
                        {buyOrders.length <= 0 ? (
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
                              ? buyOrders
                                  .filter(
                                    (person) => person.status == "Pending"
                                  )
                                  .map((asset) => {
                                    //   var percentage = (asset.funded / asset.amount) * 100;
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.product_id}
                                      >
                                        <td className="assets-category-data branch_name_title">
                                          <div className="assets-data">
                                            <div className="assets-data-pool_name">
                                              {asset.name}
                                              <span className="poolName_txt">
                                                {asset.time}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {numberWithCommas(
                                            parseInt(asset.amount).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.seller.slice(
                                            0,
                                            6
                                          )}...${asset.seller.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.status}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.txHash != null
                                            ? `${asset.txHash.slice(
                                                0,
                                                6
                                              )}...${asset.txHash.slice(
                                                63,
                                                66
                                              )}`
                                            : "N/A"}
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
                                          <ArrowForwardIosIcon />
                                        </td>
                                      </tr>
                                    );
                                  })
                              : activeBtn === "All"
                              ? buyOrders.map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.name}
                                            <span className="poolName_txt">
                                              {asset.time}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.amount).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.seller.slice(
                                          0,
                                          6
                                        )}...${asset.seller.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.txHash.slice(
                                          0,
                                          6
                                        )}...${asset.txHash.slice(63, 66)}`}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })
                              : activeBtn === "Closed"
                              ? buyOrders
                                  .filter(
                                    (person) => person.status == "Shipped"
                                  )
                                  .map((asset) => {
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.id}
                                      >
                                        <td className="assets-category-data branch_name_title">
                                          <div className="assets-data">
                                            <div className="assets-data-pool_name">
                                              {asset.name}
                                              <span className="poolName_txt">
                                                {asset.time}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {numberWithCommas(
                                            parseInt(asset.amount).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.seller.slice(
                                            0,
                                            6
                                          )}...${asset.seller.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.status}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.txHash.slice(
                                            0,
                                            6
                                          )}...${asset.txHash.slice(63, 66)}`}
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
              ) : (
                <div className="BuyerSellerDiv_body">
                  <div className="BuyerSellerDiv_body_header">
                    Seller's Overview
                  </div>
                  <div className="BuyerSellerDiv_body_Balance">
                    <div className="BuyerSellerDiv_body_Balance_head">
                      Locked Balance:
                    </div>
                    <div className="BuyerSellerDiv_body_Balance_body">
                      <div className="BuyerSellerDiv_body_Balance_body1">
                        200,000.00 eusd
                      </div>{" "}
                      <div className="BuyerSellerDiv_body_Balance_body2">
                        ~$ 200,000.00
                      </div>
                    </div>
                  </div>
                  <div className="lending_area1">
                    <div className="lending_area1_cont1_user">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total items uploaded
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          250
                          <span className="usd_sign"> items</span>
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total value of all the assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>
                    <div className="lending_area1_cont1_user">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total amount uploaded
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          100,000.00
                          <span className="usd_sign"> eusd</span>
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total value of all the assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>

                    <div className="lending_area1_cont1_user">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total items sold
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          100<span className="usd_sign"> items</span>
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total value of all the assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>
                    <div className="lending_area1_cont1_user">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total amount sold
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          60,000.00<span className="usd_sign"> eusd</span>
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total value of all the assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="BuyerSellerDiv_body_div2">
                    <div className="BuyerSellerDiv_body_div2_tab_area">
                      <div className="filter_table_area_1">
                        Uploaded Product s
                      </div>
                      <div className="filter_table_area_2 filter_table_area_2b">
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
                          Ordered
                        </div>
                        <div
                          id="shipped"
                          className={
                            activeBtn == "shipped"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Shipped
                        </div>
                        <div
                          id="approve"
                          className={
                            activeBtn == "approve"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Approved
                        </div>
                      </div>
                    </div>
                    <div className="BuyerSellerDiv_body_div2_body">
                      <table className="assets-table">
                        <thead className="assets-category-titles">
                          <tr className="assets">
                            <th className="assets-category-titles-heading1 left">
                              Product Name
                            </th>
                            <th className="assets-category-titles-heading1">
                              Amount
                            </th>
                            <th className="assets-category-titles-heading1 ">
                              Seller
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
                        {buyOrders.length <= 0 ? (
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
                              ? buyOrders
                                  .filter(
                                    (person) => person.status == "Pending"
                                  )
                                  .map((asset) => {
                                    //   var percentage = (asset.funded / asset.amount) * 100;
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.product_id}
                                      >
                                        <td className="assets-category-data branch_name_title">
                                          <div className="assets-data">
                                            <div className="assets-data-pool_name">
                                              {asset.name}
                                              <span className="poolName_txt">
                                                {asset.time}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {numberWithCommas(
                                            parseInt(asset.amount).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.seller.slice(
                                            0,
                                            6
                                          )}...${asset.seller.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.status}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.txHash != null
                                            ? `${asset.txHash.slice(
                                                0,
                                                6
                                              )}...${asset.txHash.slice(
                                                63,
                                                66
                                              )}`
                                            : "N/A"}
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
                                          <ArrowForwardIosIcon />
                                        </td>
                                      </tr>
                                    );
                                  })
                              : activeBtn === "All"
                              ? buyOrders.map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.name}
                                            <span className="poolName_txt">
                                              {asset.time}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.amount).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.seller.slice(
                                          0,
                                          6
                                        )}...${asset.seller.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.txHash.slice(
                                          0,
                                          6
                                        )}...${asset.txHash.slice(63, 66)}`}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })
                              : activeBtn === "approve"
                              ? buyOrders
                                  .filter(
                                    (person) => person.status == "Shipped"
                                  )
                                  .map((asset) => {
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.id}
                                      >
                                        <td className="assets-category-data branch_name_title">
                                          <div className="assets-data">
                                            <div className="assets-data-pool_name">
                                              {asset.name}
                                              <span className="poolName_txt">
                                                {asset.time}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {numberWithCommas(
                                            parseInt(asset.amount).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.seller.slice(
                                            0,
                                            6
                                          )}...${asset.seller.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.status}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.txHash.slice(
                                            0,
                                            6
                                          )}...${asset.txHash.slice(63, 66)}`}
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
              )}
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

export default DashBoardP2PUserSales;
