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
import { placeBid, approveProduct1, approveProductDirect } from "../../../web3";
import { parseEther, formatEther, parseUnits } from "@ethersproject/units";
import AdminDashboardCard from "../../cards/AdminDashboardCard";

import {
  POPULATE_ADMIN_PRODUCT_DASHBOARD,
  CALL_ADMIN_PLACE_BID,
} from "../../../services/adminServices";

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
  const { library, account } = context;
  const [adminStatus, setAdminStatus] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [newProducts, setNewProducts] = useState([]);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [productValues, setProductValues] = useState({});
  const [saleDetails, setSaleDetails] = useState("");
  const [indexId, setIndexId] = useState(null);
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
  const ToggleSaleDetails = (product_id, index_id) => {
    setSaleDetails(product_id);
    setIndexId(index_id);
    console.log(product_id, index_id);
  };

  const CloseSaleDetails = (e) => {
    setSaleDetails("");
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await POPULATE_ADMIN_PRODUCT_DASHBOARD();
      setProductValues(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  useEffect(
    async (e) => {
      if (account) {
        let response = await validateAdmin(account);
        const adminStatus = response.message.data.data.adminStatus;
        console.log(adminStatus, "acct acct acct acct ");
        setAdminStatus(adminStatus);
      }
    },
    [account]
  );

  useEffect(() => {
    console.log("dddddd");
    async function fetchData() {
      const res = await axios.get(
        API_URL + "/product/new/zero-tradable",
        null,
        config
      );

      console.log(res.data.data, "dddddd");
      setNewProducts(res.data.data);
      // newProducts, setNewProducts
    }

    fetchData();
  }, []);

  const changeBidValue = (event) => {
    setBidAmount(event.target.value);
    console.log(event.target.value);
    // new_category, setNew_category
  };

  const BidForProduct = async () => {
    console.log(indexId, bidAmount);
    const res = await placeBid(
      indexId,
      parseEther(bidAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res);
    if (res.status == true) {
      console.log("Success message");
    } else {
      console.log("Error occured from Blockchain");
    }
  };

  // const ApproveNewProd = async (id) => {
  //   console.log(id, "ApproveProductDirect");
  //   const res = await approveNewProducts(id, library.getSigner());
  //   console.log(res);
  //   if (res.status == true) {
  //     console.log("Success message");
  //   } else {
  //     console.log("Error occured from Blockchain");
  //   }
  // };

  // const ApproveProduct = async (id) => {
  //   console.log(id, "ApproveProduct");

  //   const res = await approveProduct1(id, library.getSigner());
  //   console.log(res, "somto8uhhhg");
  //   // console.log(res.status, "somto8uhhhg");
  //   setSaleDetails("");
  //   console.log(res);
  //   if (res.status == true) {
  //     console.log("Success message");
  //   } else {
  //     console.log("Error occured from Blockchain");
  //   }
  // };

  const classes = useStyles();
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="sellers_overview_area">
            <div className="lending_area1">
              <AdminDashboardCard
                title={"Total Products Approved"}
                value={productValues.approved}
                currencySymbol={"NGN"}
                detail=" This is the total Engn funded to all assets in the lendingpool."
              />
              <AdminDashboardCard
                title={"Total Products Uploaded"}
                value={productValues.uploaded}
                currencySymbol={"NGN"}
                detail="This is the total Engn funded to all assets in the lending
                pool."
              />
              <AdminDashboardCard
                title={"Total Products Awaiting upload"}
                value={productValues.unapproved}
                currencySymbol={"NGN"}
                detail="This is the total value of all the assets in the lending
                pool.."
              />
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
                    New
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
                            console.log(asset);
                            return (
                              <>
                                <tr className="assets-category-row  transitionMe">
                                  <td
                                    className="assets-category-data branch_name_title"
                                    // id={asset.product_id}
                                    // // onClick={ToggleSaleDetails}
                                    // onClick={() => {
                                    //   ToggleSaleDetails(
                                    //     asset.product_id,
                                    //     asset.index_id
                                    //   );
                                    // }}
                                  >
                                    <div className="assets-data">
                                      <div className="assets-data-pool_name">
                                        {asset.product_name}
                                        <span className="poolName_txt">
                                          {asset.createdAt}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="assets-category-data1b branch_apy"
                                    // id={asset.product_id}
                                    // // onClick={ToggleSaleDetails}
                                    // onClick={() => {
                                    //   ToggleSaleDetails(
                                    //     asset.product_id,
                                    //     asset.index_id
                                    //   );
                                    // }}
                                  >
                                    ₦
                                    {numberWithCommas(
                                      parseInt(asset.user_amount).toFixed(0)
                                    )}{" "}
                                  </td>
                                  <td
                                    className="assets-category-data1b branch_apy"
                                    // id={asset.product_id}
                                    // // onClick={ToggleSaleDetails}
                                    // onClick={() => {
                                    //   ToggleSaleDetails(
                                    //     asset.product_id,
                                    //     asset.index_id
                                    //   );
                                    // }}
                                  >
                                    {`${asset.user_wallet.slice(
                                      0,
                                      6
                                    )}...${asset.user_wallet.slice(39, 42)}`}
                                  </td>

                                  <td
                                    className="assets-category-data1b branch_apy"
                                    // id={asset.product_id}
                                    // // onClick={ToggleSaleDetails}
                                    // onClick={() => {
                                    //   ToggleSaleDetails(
                                    //     asset.product_id,
                                    //     asset.index_id
                                    //   );
                                    // }}
                                  >
                                    {asset.status}
                                  </td>
                                  <td
                                    className="assets-category-data1b branch_apy"
                                    // id={asset.product_id}
                                    // // onClick={ToggleSaleDetails}
                                    // onClick={() => {
                                    //   ToggleSaleDetails(
                                    //     asset.product_id,
                                    //     asset.index_id
                                    //   );
                                    // }}
                                  >
                                    {asset.transaction_hash != null
                                      ? `${asset.transaction_hash.slice(
                                          0,
                                          6
                                        )}...${asset.transaction_hash.slice(
                                          63,
                                          66
                                        )}`
                                      : "N/A"}
                                    {/* {"Coming soon"} */}
                                  </td>
                                  <td className="assets-category-data1b branch_apy">
                                    <div className="approveProdButton">
                                      <button
                                        className="approveProdButton_btn"
                                        disabled={false}
                                        // onClick={() =>
                                        //   ApproveNewProd(asset.index_id)
                                        // }
                                      >
                                        Approve
                                      </button>
                                    </div>
                                  </td>
                                  <td
                                    className="assets-category-data-last branch_loan_action"
                                    // id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    // onClick={() => {
                                    //   ToggleSaleDetails(
                                    //     asset.product_id,
                                    //     asset.index_id
                                    //   );
                                    // }}
                                  >
                                    <ArrowForwardIosIcon />
                                  </td>
                                </tr>
                              </>
                            );
                          })
                      : activeBtn === "Closed"
                      ? newProducts
                          .filter((person) => person.status == "UPLOADED")
                          .map((asset) => {
                            //   var percentage = (asset.funded / asset.amount) * 100;
                            console.log(asset);
                            return (
                              <>
                                <tr className="assets-category-row  transitionMe">
                                  <td
                                    className="assets-category-data branch_name_title"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    <div className="assets-data">
                                      <div className="assets-data-pool_name">
                                        {asset.product_name}
                                        <span className="poolName_txt">
                                          {asset.createdAt}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="assets-category-data1b branch_apy"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    ₦
                                    {numberWithCommas(
                                      parseInt(asset.user_amount).toFixed(0)
                                    )}{" "}
                                  </td>
                                  <td
                                    className="assets-category-data1b branch_apy"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    {`${asset.user_wallet.slice(
                                      0,
                                      6
                                    )}...${asset.user_wallet.slice(39, 42)}`}
                                  </td>

                                  <td
                                    className="assets-category-data1b branch_apy"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    {asset.status}
                                  </td>
                                  <td
                                    className="assets-category-data1b branch_apy"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    {asset.transaction_hash != null
                                      ? `${asset.transaction_hash.slice(
                                          0,
                                          6
                                        )}...${asset.transaction_hash.slice(
                                          63,
                                          66
                                        )}`
                                      : "N/A"}
                                    {/* {"Coming soon"} */}
                                  </td>
                                  <td className="assets-category-data1b branch_apy">
                                    <div className="approveProdButton">
                                      <button
                                        className="approveProdButton_btn"
                                        disabled={true}
                                      >
                                        Approved
                                      </button>
                                    </div>
                                  </td>
                                  <td
                                    className="assets-category-data-last branch_loan_action"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    <ArrowForwardIosIcon />
                                  </td>
                                </tr>
                              </>
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
      {saleDetails == ""
        ? null
        : newProducts.map((data) => (
            <>
              {data.product_id === saleDetails ? (
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
                          {data.fullname || "NOT PROVIDED"}
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
                        Bidding Actions
                      </div>
                      {data.bidStatus == null ? (
                        <div className="saleDetailsDiv_area_1_div1">
                          <div className="saleDetailsDiv_area_1_div1_title">
                            No bidding record for this product
                          </div>
                        </div>
                      ) : (
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
                        </>
                      )}

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
                                      name="bidAmount"
                                      id="bidAmount"
                                      value={bidAmount}
                                      onChange={changeBidValue}
                                    />
                                  </div>
                                  <div className="PlaceBidDiv_ButtonDiv">
                                    <button
                                      className="PlaceBidDiv_Button"
                                      onClick={BidForProduct}
                                    >
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
                  </div>
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default AdminSeeSellers;
