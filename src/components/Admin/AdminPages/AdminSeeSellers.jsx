import React, { useState, useEffect, useContext } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "../AdminStyles/adminSellersPage.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import { API_URL } from "../../../actions/types";
import { config } from "../../../actions/Config";
import { validateAdmin } from "../../../actions/admin";
// import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
import { numberWithCommas } from "../../../static";
import CloseIcon from "@mui/icons-material/Close";
import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { placeBid } from "../../../web3";

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const AdminSeeSellers = () => {
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
  const [adminStatus, setAdminStatus] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
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
  const ToggleSaleDetails = (e) => {
    setSaleDetails(e.currentTarget.id);
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

  useEffect(
    async (e) => {
      if (account) {
        let response = await validateAdmin(account);
        const adminStatus = response.message.data.data.adminStatus;
        console.log(adminStatus, "acct acct acct acct ");
        setAdminStatus(adminStatus);
        // if (payload == null) {
        //   setStatus("");
        // } else {
        //   setStatus(() => payload.kyc_status);
        // }
      }
    },
    [account]
  );

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        API_URL + "/product/new/zero-tradable",
        null,
        config
      );

      console.log(res.data.data);
      setNewProducts(res.data.data);
      // newProducts, setNewProducts
    }

    fetchData();
  }, []);

  const BidForProduct = async () => {
    // const res = await placeBid(
    //   parseEther(monthlyPlan.toString(), "wei").toString(),
    //   parseEther(semiAnnuallyPlan.toString(), "wei").toString(),
    //   parseEther(AnnuallyPlan.toString(), "wei").toString(),
    //   REACT_APP_EGC_ADDRESS,
    //   REACT_APP_EUSD_ADDRESS,
    //   library.getSigner()
    // );
    // console.log(res, "somto8uhhhg");
    // console.log(res.status, "somto8uhhhg");
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
                    <th className="assets-category-titles-heading1 ">Seller</th>
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
                    {activeBtn === "Ongoing"
                      ? newProducts
                          .filter((person) => person.status == "NEW")
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
                                  {asset.BiddingStatus}
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {asset.user_amount} Eusd
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {asset.status}
                                </td>
                                <td className="assets-category-data1b stable-content branch_apy">
                                  {/* {`${asset.txnHash.slice(
                                  0,
                                  6
                                )}...${asset.txnHash.slice(63, 66)}`} */}
                                  {"Coming soon"}
                                </td>
                                <td className="assets-category-data-last branch_loan_action">
                                  <ArrowForwardIosIcon />
                                </td>
                              </tr>
                            );
                          })
                      : activeBtn === "All"
                      ? SalableProduct.map((asset) => {
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
                      : activeBtn === "Closed"
                      ? SalableProduct.filter(
                          (person) => person.ProductStatus == "Approved"
                        ).map((asset) => {
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
      </section>
      {SalableProduct.map((data) => (
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
                      {data.ProductName}
                    </div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Product Amount
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      {data.Amount} Eusd
                    </div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Product Brand Name
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">Apple</div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Product Condition
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      Cracked screen.
                    </div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Product Status
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      {data.ProductStatus}
                    </div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Product Txn Hash
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      {data.txnHash}
                    </div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Upload Date
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      {data.Date}
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
                <div className="saleDetailsDiv_area_1">
                  <div className="saleDetailsDiv_area_1_title">
                    Bidding Action
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Bidding Status
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      {data.BiddingStatus}
                    </div>
                  </div>
                  <div className="saleDetailsDiv_area_1_div1">
                    <div className="saleDetailsDiv_area_1_div1_title">
                      Bidding Amount
                    </div>
                    <div className="saleDetailsDiv_area_1_div1_body">
                      {data.BiddingAmount}
                    </div>
                  </div>
                  <div className="PlaceBidDiv">
                    <Accordion>
                      <AccordionSummary
                        onClick={toggleActiveDrop}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography
                          className={classes.heading}
                          onClick={toggleActiveDrop}
                        >
                          Place A Bid{" "}
                        </Typography>
                      </AccordionSummary>
                      <div className={activeMenu}>
                        <AccordionDetails>
                          <div className="PlaceBidDiv_area">
                            <div className="PlaceBidDiv_Body">
                              <div className="PlaceBidDiv_Body_1">
                                <div className="PlaceBidDiv_Body_1_title">
                                  Bid Amount
                                </div>
                                <input
                                  type="number"
                                  className="PlaceBidDiv_Body_1_input"
                                />
                              </div>
                              <div className="PlaceBidDiv_ButtonDiv">
                                <button className="PlaceBidDiv_Button">
                                  Place a Bid
                                </button>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </div>
                    </Accordion>
                  </div>
                </div>
                {/* ================ */}
                {/* ================ */}
                {/* ================ */}
                {/* ================ */}
                {/* ================ */}
                {/* ================ */}
                <div className="approveProdButton">
                  <button className="approveProdButton_btn">Approve</button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default AdminSeeSellers;
