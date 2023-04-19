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
  FETCH_USER_BUY_ORDER,
  FETCH_USER_SELL_ORDER,
  MARK_PRODUCT_AS_SHIPPED,
  MARK_PRODUCT_AS_RECIEVED,
  GET_USER_UPLOADED_PRODUCT,
  CALL_SELLER_LOCKED_FUNDS,
  CALL_USER_DIRECT_PRODUCTS,
} from "../../../services/productServices";
import { DISPLAY_NEW_PRODUCTS_CALL } from "../../../services/adminServices";
import { AcceptBid, releaseFundsToSeller } from "../../../web3";
import {
  TOTAL_NUMBER_OF_ITEMS_BOUGHT,
  TotalAmountSold,
  TotalAmountUploaded,
  TotalItemSold,
  TotalItemsUploaded,
} from "../../../utils/helper";
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
  const [activeBtn, setActivrBtn] = useState("approved_products");
  const [indexId, setIndexId] = useState(null);
  const [saleDetails, setSaleDetails] = useState("");
  const [activeLink, setActiveLink] = useState("abstract-link");
  const [activeMenu, setActiveMenu] = useState("details-accord  ");
  const [activeTab, setActiveTab] = useState("buyer");
  const [activeSubTab, setActiveSubTab] = useState("pending");
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [myDirectProducts, setMyDirectProducts] = useState([]);
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const [uploadedProduct, setUploadedProducts] = useState([]);

  useEffect(() => {
    // console.log("kddd_____");
    const fetchData = async () => {
      const response = await DISPLAY_NEW_USER_PRODUCTS_CALL(account);
      console.log(response.data, "goody");

      if (response.data) {
        setUploadedProducts(response.data);
      }
    };
    const fetchData2 = async () => {
      const response = await CALL_SELLER_LOCKED_FUNDS(account);
      console.log(response.data, "goody");

      if (response.data) {
        setLockedValue(response.data.locked);
      }
    };
    const fetchData3 = async () => {
      console.log(account);
      const response = await CALL_USER_DIRECT_PRODUCTS(account);
      console.log(response.data, "goody");

      if (response.data) {
        setMyDirectProducts(response.data);
      }
    };

    fetchData();
    fetchData2();
    fetchData3();
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

  const markProductAsShipped = async (order_id) => {
    const call = await MARK_PRODUCT_AS_SHIPPED({ user: account, order_id });
    console.log(call);

    if (call.status == 200) {
      var row = document.getElementById(order_id);
      row.style.display = "none";
      // alert("product shipped successfully");
    }
  };
  const markAsRecieved = async (order_id, product_id, tradeID) => {
    // console.log(order_id, product_id, tradeID);
    const res = await releaseFundsToSeller(
      product_id,
      tradeID,
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    if (res.status == true) {
      // alert("product RECIEVED successfully");
      const call = await MARK_PRODUCT_AS_RECIEVED({ user: account, order_id });
      console.log(call);
      if (call.status == 200) {
        var row = document.getElementById(order_id);
        row.style.display = "none";
        // alert("product shipped successfully");
      }
    }
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

  useEffect(() => {
    const fetchUserBuyOrder = async () => {
      const res = await FETCH_USER_BUY_ORDER(account);
      console.log(res);
      setBuyOrders(res.data);
    };
    const fetchUserSellOrder = async () => {
      const res = await FETCH_USER_SELL_ORDER(account);
      console.log(res);
      setSellOrders(res.data);
    };

    const fetchStat = async () => {
      const res = await GET_USER_UPLOADED_PRODUCT(account);
      if (res.success) setUploaded(res.data.getAllUploadedProduct);
      console.log(res);
    };

    fetchStat();

    fetchUserSellOrder();

    fetchUserBuyOrder();

    //fetch buy orders for specific user
  }, [account]);

  const toggleActiveTab = (e) => {
    let active = e.currentTarget.id;
    setActiveTab(active);
  };
  const toggleActiveSubTab = (e) => {
    let active = e.currentTarget.id;
    setActiveSubTab(active);
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
                  Sale Uploads
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
                            Total number of items bought
                          </div>
                          <div className="lending_area1_cont1_body_txt">
                            {TOTAL_NUMBER_OF_ITEMS_BOUGHT(buyOrders)
                              .prodCount != null
                              ? TOTAL_NUMBER_OF_ITEMS_BOUGHT(buyOrders)
                                .prodCount
                              : 0}{" "}
                            <span className="usd_sign"> item(s)</span>
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
                            {TOTAL_NUMBER_OF_ITEMS_BOUGHT(buyOrders)
                              .sub_total != null
                              ? TOTAL_NUMBER_OF_ITEMS_BOUGHT(buyOrders)
                                .sub_total
                              : 0}{" "}
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

                        <div
                          id="cancelled"
                          className={
                            activeBtn == "cancelled"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Cancelled
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
                            {activeBtn === "Ongoing" &&
                              buyOrders
                                .filter((person) => person.status === "PENDING")
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
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sub_total).toFixed(0)
                                        )}
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
                                        {asset.transactionHash != null
                                          ? `${asset.transactionHash.slice(
                                            0,
                                            6
                                          )}...${asset.transactionHash.slice(
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
                                })}
                            {activeBtn === "All" &&
                              buyOrders.map((asset) => {
                                return (
                                  <tr
                                    className="assets-category-row  transitionMe"
                                    id={asset.id}
                                  >
                                    <td className="assets-category-data branch_name_title">
                                      <div className="assets-data">
                                        <div className="assets-data-pool_name">
                                          {asset.item_name}
                                          <span className="poolName_txt">
                                            {asset.createdAt}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="assets-category-data1b stable-content branch_apy">
                                      {numberWithCommas(
                                        parseInt(asset.sub_total).toFixed(0)
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
                                      {`${asset.transactionHash.slice(
                                        0,
                                        6
                                      )}...${asset.transactionHash.slice(
                                        63,
                                        66
                                      )}`}
                                    </td>
                                    <td className="assets-category-data-last branch_loan_action">
                                      <ArrowForwardIosIcon />
                                    </td>
                                  </tr>
                                );
                              })}
                            {activeBtn === "shipped" &&
                              buyOrders
                                .filter((person) => person.status === "SHIPPED")
                                .map((asset) => {
                                  //   var percentage = (asset.funded / asset.amount) * 100;
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sub_total).toFixed(0)
                                        )}
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
                                        {asset.transactionHash != null
                                          ? `${asset.transactionHash.slice(
                                            0,
                                            6
                                          )}...${asset.transactionHash.slice(
                                            63,
                                            66
                                          )}`
                                          : "N/A"}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <button
                                          onClick={() =>
                                            markAsRecieved(
                                              asset.id,
                                              asset.product_id,
                                              asset.tradeID
                                            )
                                          }
                                        >
                                          Recieve Product
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            {activeBtn === "approve" &&
                              buyOrders
                                .filter(
                                  (person) => person.status === "APPROVED"
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
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sub_total).toFixed(0)
                                        )}
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
                                        {asset.transactionHash != null
                                          ? `${asset.transactionHash.slice(
                                            0,
                                            6
                                          )}...${asset.transactionHash.slice(
                                            63,
                                            66
                                          )}`
                                          : "N/A"}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action"></td>
                                    </tr>
                                  );
                                })}
                            {activeBtn === "cancelled" &&
                              buyOrders
                                .filter(
                                  (person) => person.status === "CANCELLED"
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
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sub_total).toFixed(0)
                                        )}
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
                                        {asset.transactionHash != null
                                          ? `${asset.transactionHash.slice(
                                            0,
                                            6
                                          )}...${asset.transactionHash.slice(
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
              ) : (
                // @todo -  sell orders
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
                        {numberWithCommas(parseInt(lockedValue).toFixed(2))}{" "}
                      </div>{" "}
                      <div className="BuyerSellerDiv_body_Balance_body2">
                        ~$ {numberWithCommas(parseInt(lockedValue).toFixed(2))}
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
                          {uploaded.length}
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
                          {TotalAmountUploaded(uploaded)}
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
                          {TotalItemSold(sellOrders)}
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
                          Total amount sold
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          {TotalAmountSold(sellOrders)}
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
                  </div>
                  <div className="BuyerSellerDiv_body_div2_tabs">
                    <div
                      className={
                        activeSubTab === "pending"
                          ? "BuyerSellerDiv_body_div2_tabs_active"
                          : "BuyerSellerDiv_body_div2_tabs1"
                      }
                      id="pending"
                      onClick={toggleActiveSubTab}
                    >
                      Pending Products
                    </div>
                    <div
                      className={
                        activeSubTab === "uploaded"
                          ? "BuyerSellerDiv_body_div2_tabs_active"
                          : "BuyerSellerDiv_body_div2_tabs1"
                      }
                      id="uploaded"
                      onClick={toggleActiveSubTab}
                    >
                      Uploaded Products
                    </div>
                  </div>
                  {/* ====== */}
                  {/* ====== */}
                  {/* ====== */}
                  {activeSubTab === "pending" ? (
                    <div className="BuyerSellerDiv_body_div2">
                      <div className="BuyerSellerDiv_body_div2_tab_area">
                        <div className="filter_table_area_1">
                          Pending Uploads
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

                          {myDirectProducts.length <= 0 ? (
                            <div className="no_loans_div">
                              <div className="no_loans_div_cont">
                                <Nodata />
                                No Pools yet.
                              </div>
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
                              {myDirectProducts
                                .filter((person) => person.status == "NEW")
                                .map((asset) => {
                                  //   var percentage = (asset.funded / asset.amount) * 100;
                                  console.log(asset);
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
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
                                        )}...${asset.user_wallet.slice(
                                          39,
                                          42
                                        )}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.transaction_hash != null
                                          ? `${asset.transaction_hash.slice(
                                            0,
                                            6
                                          )}...${asset.transaction_hash.slice(
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
                  ) : null}
                  {/* ==================== */}
                  {/* ==================== */}
                  {/* ==================== */}
                  {/* ==================== */}
                  {/* ==================== */}
                  {activeSubTab === "uploaded" ? (
                    <div className="BuyerSellerDiv_body_div2">
                      <div className="BuyerSellerDiv_body_div2_tab_area">
                        <div className="filter_table_area_1">
                          Uploaded Products
                        </div>
                        <div className="filter_table_area_2 filter_table_area_2b">
                          <div
                            id="approved_products"
                            className={
                              activeBtn == "approved_products"
                                ? "filter_table_btn1_active"
                                : "filter_table_btn1"
                            }
                            onClick={toggleActiveBtn}
                          >
                            Products
                          </div>
                          <div
                            id="Ongoing"
                            className={
                              activeBtn == "Ongoing"
                                ? "filter_table_btn1_active"
                                : "filter_table_btn1"
                            }
                            onClick={toggleActiveBtn}
                          >
                            {sellOrders
                              .filter(
                                (person) => person.status == "PENDING"
                              ).length <= 0 ? null : <div className="notify_icon_cont_div_notifyCount2">
                              {sellOrders
                                .filter(
                                  (person) => person.status == "PENDING"
                                ).length}
                            </div>}
                            Ordered
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
                            {sellOrders
                              .filter(
                                (person) => person.status == "CANCELLED"
                              ).length <= 0 ? null : <div className="notify_icon_cont_div_notifyCount2">
                              {sellOrders
                                .filter(
                                  (person) => person.status == "CANCELLED"
                                ).length}
                            </div>}
                            Declined
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
                            {sellOrders
                              .filter(
                                (person) => person.status == "SHIPPED"
                              ).length <= 0 ? null : <div className="notify_icon_cont_div_notifyCount2">
                              {sellOrders
                                .filter(
                                  (person) => person.status == "SHIPPED"
                                ).length}
                            </div>}
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
                            {sellOrders
                              .filter(
                                (person) => person.status == "APPROVED"
                              ).length <= 0 ? null : <div className="notify_icon_cont_div_notifyCount2">
                              {sellOrders
                                .filter(
                                  (person) => person.status == "APPROVED"
                                ).length}
                            </div>}
                            Sold
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
                              <th className="assets-category-titles-heading1">
                                Quantity
                              </th>
                              <th className="assets-category-titles-heading1 ">
                                {activeBtn !== "approved_products"
                                  ? "Buyer"
                                  : "Seller"}
                              </th>
                              <th className="assets-category-titles-heading1  ">
                                {activeBtn !== "approved_products"
                                  ? " Order Status"
                                  : " Product Status"}
                              </th>
                              <th className="assets-category-titles-heading1 ">
                                Txn hash
                              </th>
                            </tr>
                          </thead>

                          <tbody
                            className="assets-table-body popular-categories transitionMe"
                            id="popular-categories"
                          >
                            {" "}
                            {/* =============== */}
                            {/* =============== */}
                            {/* =============== */}
                            {activeBtn === "approved_products" &&
                              myDirectProducts
                                .filter((person) => person.status == "UPLOADED")
                                .map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.product_id}
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
                                        {asset.quantity
                                        }
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.user_wallet.slice(
                                          0,
                                          6
                                        )}...${asset.user_wallet.slice(
                                          39,
                                          42
                                        )}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.transaction_hash != null
                                          ? `${asset.transaction_hash.slice(
                                            0,
                                            6
                                          )}...${asset.transaction_hash.slice(
                                            63,
                                            66
                                          )}`
                                          : "N/A"}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        {/* <button
                                            onClick={() =>
                                              markProductAsShipped(asset.id)
                                            }
                                          >
                                            {" "}
                                            Mark As Shipped
                                          </button> */}
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {activeBtn === "Ongoing" &&
                              sellOrders
                                .filter((person) => person.status == "PENDING")
                                .map((asset) => {
                                  //   var percentage = (asset.funded / asset.amount) * 100;
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sub_total).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.quantity
                                        }
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.user_id.slice(
                                          0,
                                          6
                                        )}...${asset.user_id.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.transactionHash != null
                                          ? `${asset.transactionHash.slice(
                                            0,
                                            6
                                          )}...${asset.transactionHash.slice(
                                            63,
                                            66
                                          )}`
                                          : "N/A"}
                                      </td>

                                      <td className="assets-category-data-last branch_loan_action">
                                        <button
                                        // onClick={() =>
                                        //   markProductAsShipped(asset.id)
                                        // }
                                        >
                                          {" "}
                                          Decline
                                        </button>
                                        <button
                                          onClick={() =>
                                            markProductAsShipped(asset.id)
                                          }
                                        >
                                          {" "}
                                          Mark As Shipped
                                        </button>
                                        {/* <ArrowForwardIosIcon /> */}
                                      </td>
                                    </tr>
                                  );
                                })}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {activeBtn === "Closed" &&
                              sellOrders
                                .filter(
                                  (person) => person.status == "CANCELLED"
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
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sum_total).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.quantity
                                        }
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.user_id.slice(
                                          0,
                                          6
                                        )}...${asset.user_id.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.transactionHash.slice(
                                          0,
                                          6
                                        )}...${asset.transactionHash.slice(
                                          63,
                                          66
                                        )}`}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {activeBtn === "shipped" &&
                              sellOrders
                                .filter((person) => person.status == "SHIPPED")
                                .map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sum_total).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.quantity
                                        }
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.user_id.slice(
                                          0,
                                          6
                                        )}...${asset.user_id.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.transactionHash.slice(
                                          0,
                                          6
                                        )}...${asset.transactionHash.slice(
                                          63,
                                          66
                                        )}`}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {/* ========= */}
                            {activeBtn === "approve" &&
                              sellOrders
                                .filter((person) => person.status == "APPROVED")
                                .map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.sum_total).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.quantity
                                        }
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.user_id.slice(
                                          0,
                                          6
                                        )}...${asset.user_id.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b stable-content branch_apy">
                                        {`${asset.transactionHash.slice(
                                          0,
                                          6
                                        )}...${asset.transactionHash.slice(
                                          63,
                                          66
                                        )}`}
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
                        </table>
                      </div>
                    </div>
                  ) : null}
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
