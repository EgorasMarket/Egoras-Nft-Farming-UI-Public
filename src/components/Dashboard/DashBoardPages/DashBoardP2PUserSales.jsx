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
  DISPLAY_NEW_USER_DIRECT_PRODUCTS_CALL,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheck,
  faTruck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
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
  const [myDirectProducts2, setMyDirectProducts2] = useState([]);
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
        const temp = response.data;
        console.log(temp);
        for (const data of temp) {
          const timestamp = data.createdAt;
          const dateObj = new Date(timestamp);
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(dateObj);
          console.log(formattedDate);
          data.createdAt = formattedDate;
        }
        const myArray = response.data;
        myArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(myArray);
        setMyDirectProducts(response.data);
      }
    };

    const fetchData4 = async () => {
      console.log(account);
      const response = await DISPLAY_NEW_USER_DIRECT_PRODUCTS_CALL(account);
      console.log(response.data, "goody");

      if (response.data) {
        const temp = response.data;
        console.log(temp);
        for (const data of temp) {
          const timestamp = data.createdAt;
          const dateObj = new Date(timestamp);
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(dateObj);
          console.log(formattedDate);
          data.createdAt = formattedDate;
        }
        const myArray = response.data;
        myArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(myArray);
        setMyDirectProducts2(response.data);
      }
    };

    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
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
  const ToggleSaleDetails = (e) => {
    let id = e.currentTarget.id;
    setSaleDetails(id);
    console.log(id);
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
      console.log(res.data);
      const temp = res.data;
      console.log(temp);
      for (const data of temp) {
        const timestamp = data.createdAt;
        const dateObj = new Date(timestamp);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(dateObj);
        console.log(formattedDate);
        data.createdAt = formattedDate;
      }
      const myArray = res.data;
      myArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(myArray);
      setBuyOrders(res.data);
    };
    const fetchUserSellOrder = async () => {
      const res = await FETCH_USER_SELL_ORDER(account);
      console.log(res);
      const temp = res.data;
      console.log(temp);
      for (const data of temp) {
        const timestamp = data.createdAt;
        const dateObj = new Date(timestamp);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(dateObj);
        console.log(formattedDate);
        data.createdAt = formattedDate;
      }
      const myArray = res.data;
      myArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(myArray);
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
                  <div className="BuyerSellerDiv_body_div2a">
                    <div className="BuyerSellerDiv_body_div2_tab_area">
                      <div className="filter_table_area_1">Buy Orders</div>
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
                              Seller
                            </th>
                            <th className="assets-category-titles-heading1  ">
                              Product Status
                            </th>
                            <th className="assets-category-titles-heading1 right">
                              Txn hash
                            </th>
                          </tr>
                        </thead>
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
                            {/* =============== */}
                            {/* =============== */}
                            {/* =============== */}
                            {buyOrders.map((asset) => {
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
                                    {asset.quantity}
                                  </td>
                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {`${asset.seller.slice(
                                      0,
                                      6
                                    )}...${asset.seller.slice(39, 42)}`}
                                  </td>

                                  <td className="assets-category-data1b stable-content branch_apy">
                                    {asset.status === "PENDING" ? (
                                      <div className="pending_status_div">
                                        {asset.status}{" "}
                                        <FontAwesomeIcon
                                          className="ml-2"
                                          icon={faSpinner}
                                          spin
                                        />
                                      </div>
                                    ) : null}
                                    {asset.status === "CANCELLED" ? (
                                      <div className="declined_status_div">
                                        {asset.status}{" "}
                                        <FontAwesomeIcon
                                          className="ml-2"
                                          icon={faTimes}
                                        />
                                      </div>
                                    ) : null}
                                    {asset.status === "SHIPPED" ? (
                                      <div className="shipped_status_div">
                                        {asset.status}{" "}
                                        <FontAwesomeIcon
                                          className="ml-2"
                                          icon={faTruck}
                                        />
                                      </div>
                                    ) : null}
                                    {asset.status === "APPROVED" ? (
                                      <div className="sold_status_div">
                                        {asset.status}{" "}
                                        <FontAwesomeIcon
                                          className="ml-2"
                                          icon={faCheck}
                                        />
                                      </div>
                                    ) : null}
                                  </td>
                                  <td className="assets-category-data-last branch_loan_action">
                                    {`${asset.transactionHash.slice(
                                      0,
                                      6
                                    )}...${asset.transactionHash.slice(
                                      63,
                                      66
                                    )}`}
                                  </td>
                                  <td className="assets-category-data-last branch_loan_action">
                                    <div className="markReceivedBtn_div">
                                      {asset.status === "SHIPPED" ? (
                                        <button
                                          className="markReceivedBtn"
                                          onClick={() =>
                                            markAsRecieved(
                                              asset.id,
                                              asset.product_id,
                                              asset.tradeID
                                            )
                                          }
                                        >
                                          Approve
                                        </button>
                                      ) : (
                                        <ArrowForwardIosIcon />
                                      )}
                                    </div>
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
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
                // @todo -  sell orders
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

                          {myDirectProducts2.filter(
                            (person) => person.status == "NEW"
                          ).length <= 0 ? (
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
                              {myDirectProducts2
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
                            id="PENDING"
                            className={
                              activeBtn == "PENDING"
                                ? "filter_table_btn1_active"
                                : "filter_table_btn1"
                            }
                            onClick={toggleActiveBtn}
                          >
                            {sellOrders.filter(
                              (person) => person.status == "PENDING"
                            ).length <= 0 ? null : (
                              <div className="notify_icon_cont_div_notifyCount2">
                                {
                                  sellOrders.filter(
                                    (person) => person.status == "PENDING"
                                  ).length
                                }
                              </div>
                            )}
                            Orders
                          </div>
                          <div
                            id="CANCELLED"
                            className={
                              activeBtn == "CANCELLED"
                                ? "filter_table_btn1_active"
                                : "filter_table_btn1"
                            }
                            onClick={toggleActiveBtn}
                          >
                            {sellOrders.filter(
                              (person) => person.status == "CANCELLED"
                            ).length <= 0 ? null : (
                              <div className="notify_icon_cont_div_notifyCount2">
                                {
                                  sellOrders.filter(
                                    (person) => person.status == "CANCELLED"
                                  ).length
                                }
                              </div>
                            )}
                            Declined
                          </div>

                          <div
                            id="APPROVED"
                            className={
                              activeBtn == "APPROVED"
                                ? "filter_table_btn1_active"
                                : "filter_table_btn1"
                            }
                            onClick={toggleActiveBtn}
                          >
                            {sellOrders.filter(
                              (person) => person.status == "APPROVED"
                            ).length <= 0 ? null : (
                              <div className="notify_icon_cont_div_notifyCount2">
                                {
                                  sellOrders.filter(
                                    (person) => person.status == "APPROVED"
                                  ).length
                                }
                              </div>
                            )}
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
                              <th className="assets-category-titles-heading1 right">
                                Txn hash
                              </th>
                            </tr>
                          </thead>

                          {activeBtn === "approved_products" &&
                          myDirectProducts.filter(
                            (person) => person.status == "UPLOADED"
                          ).length <= 0 ? (
                            <>
                              <div className="no_loans_div">
                                <div className="no_loans_div_cont">
                                  <Nodata />
                                  No Pools yet.
                                </div>{" "}
                              </div>
                            </>
                          ) : (
                            <tbody
                              className="assets-table-body popular-categories transitionMe"
                              id="popular-categories"
                            >
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {activeBtn === "approved_products" &&
                                myDirectProducts
                                  .filter(
                                    (person) => person.status == "UPLOADED"
                                  )
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
                                            parseInt(asset.user_amount).toFixed(
                                              0
                                            )
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.quantity}
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
                                        <td className="assets-category-data-last branch_loan_action">
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
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                            </tbody>
                          )}
                          {/* =========== */}
                          {/* =========== */}
                          {/* =========== */}
                          {/* =========== */}
                          {/* =========== */}
                          {/* =========== */}
                          {activeBtn &&
                          sellOrders.filter(
                            (person) => person.status == activeBtn
                          ).length <= 0 ? (
                            <>
                              {activeBtn === "approved_products" ? null : (
                                <div className="no_loans_div">
                                  <div className="no_loans_div_cont">
                                    <Nodata />
                                    No Pools yet.
                                  </div>{" "}
                                </div>
                              )}
                            </>
                          ) : (
                            <tbody
                              className="assets-table-body popular-categories transitionMe"
                              id="popular-categories"
                            >
                              {" "}
                              {/* =============== */}
                              {/* =============== */}
                              {/* =============== */}
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {activeBtn === "PENDING" &&
                                sellOrders
                                  .filter(
                                    (person) => person.status == "PENDING"
                                  )
                                  .map((asset) => {
                                    //   var percentage = (asset.funded / asset.amount) * 100;
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.id}
                                        onClick={ToggleSaleDetails}
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
                                          {asset.quantity}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.user_id.slice(
                                            0,
                                            6
                                          )}...${asset.user_id.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          <div className="pending_status_div">
                                            {asset.status}{" "}
                                            <FontAwesomeIcon
                                              className="ml-2"
                                              icon={faSpinner}
                                              spin
                                            />
                                          </div>
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
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
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {/* ========= */}
                              {activeBtn === "CANCELLED" &&
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
                                            parseInt(asset.sub_total).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {asset.quantity}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.user_id.slice(
                                            0,
                                            6
                                          )}...${asset.user_id.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          <div className="declined_status_div">
                                            {asset.status}{" "}
                                            <FontAwesomeIcon
                                              className="ml-2"
                                              icon={faTimes}
                                            />
                                          </div>
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
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
                              {activeBtn === "PENDING" &&
                                sellOrders
                                  .filter(
                                    (person) => person.status == "SHIPPED"
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
                                          {asset.quantity}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.user_id.slice(
                                            0,
                                            6
                                          )}...${asset.user_id.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          <div className="shipped_status_div">
                                            {asset.status}{" "}
                                            <FontAwesomeIcon
                                              className="ml-2"
                                              icon={faTruck}
                                            />
                                          </div>
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
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
                              {activeBtn === "APPROVED" &&
                                sellOrders
                                  .filter(
                                    (person) => person.status == "APPROVED"
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
                                          {asset.quantity}
                                        </td>
                                        <td className="assets-category-data1b stable-content branch_apy">
                                          {`${asset.user_id.slice(
                                            0,
                                            6
                                          )}...${asset.user_id.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b stable-content branch_apy">
                                          <div className="sold_status_div">
                                            {asset.status}{" "}
                                            <FontAwesomeIcon
                                              className="ml-2"
                                              icon={faCheck}
                                            />
                                          </div>
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
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
                          )}
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
        : sellOrders.map((data) => (
            <>
              {data.id === saleDetails ? (
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
                        Order Details
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
                          {data.item_name}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Amount
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {numberWithCommas(parseInt(data.amount).toFixed(0))}{" "}
                          Eusd
                        </div>
                      </div>

                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Purchase Amount
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {numberWithCommas(
                            parseInt(data.sub_total).toFixed(0)
                          )}{" "}
                          Eusd
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Purchase Quantity
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.quantity}
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
                          Order Txn Hash
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.transactionHash}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Order Date
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
                        Buyer's Details
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's Full name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.fullName}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's Wallet Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.user_id}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's Phone number
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.phoneNumber}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's Residential Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.userAddress}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's City
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.userAddress}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's State of Residence
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.state}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's Country of Residence
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.country}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Buyer's Postal Code
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.zipCode}
                        </div>
                      </div>
                    </div>
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {data.status === "PENDING" ? (
                      <>
                        <div className="decline_mark_button_div">
                          <button className="decline_mark_button_div_decline">
                            {" "}
                            Decline
                          </button>
                          <button
                            className="decline_mark_button_div_mark_shipped"
                            onClick={() => markProductAsShipped(data.id)}
                          >
                            {" "}
                            Shipped
                          </button>
                        </div>
                      </>
                    ) : null}
                    {data.status === "SHIPPED" ? (
                      <div className="awaiting_btn_div">
                        <button className="awaiting_btn">
                          Awaiting Approval from Buyer
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default DashBoardP2PUserSales;
