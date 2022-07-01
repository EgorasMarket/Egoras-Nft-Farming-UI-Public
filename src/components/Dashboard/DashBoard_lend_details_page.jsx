import React, { useState, useEffect } from "react";
import "../../css/dashboardLend_details_page.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Accordion from "../Accordion";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import CloseIcon from "@mui/icons-material/Close";
// import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CopyAllIcon from "@mui/icons-material/CopyAll";
const DashBoard_lend_details_page = () => {
  const [activeLink, setActiveLink] = useState("");
  const [assetModal, setAssetModal] = React.useState(false);
  const [backModal, setBackModal] = React.useState(false);
  const toggleAssetModal = () => {
    setAssetModal(!assetModal);
    // setBackModal(!backModal);
  };

  const toggleBackModal = () => {
    setBackModal(!backModal);
    setAssetModal(!assetModal);
  };
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const currentPage = window.location.pathname;
  useEffect(() => {
    if (currentPage === "/dashboard/lend/pool/detail") {
      setActiveLink("Overview");
    } else if (currentPage === "/dashboard/lend/pool/detail/branch/asset") {
      setActiveLink("Asset");
    }
  });

  // const toggleImgDiv = () => {
  //   setImgDiv(!imgDiv);
  // };

  // const ChangeAssetDetailModal = (e) => {
  //   let currentTarget = e.currentTarget.id;
  //   console.log(currentTarget);
  //   setAssetDetailModal(currentTarget);
  // };
  // const closeAssetDetailModal = () => {
  //   setAssetDetailModal(0);
  //   console.log("i am not here");
  // };
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const assets2 = [
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 2,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 3,
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 4,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 5,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 6,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 7,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 8,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 9,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 10,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 11,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 12,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 13,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 14,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
    {
      id: 15,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Closed",
    },
    {
      id: 16,

      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Fee: "13.10",
      Status: "Ongoing",
    },
  ];
  return (
    <div className="other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}

      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="pool_lending_pages_links">
              <Link
                to="/dashboard/lend/pool/detail"
                className={
                  activeLink === "Overview"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <DashboardIcon className="asset_overview_link_icon" />
                Overview
              </Link>
              {/* <span class="vertical_ruleB"></span> */}
              <Link
                to="/dashboard/lend/pool/detail/branch/asset"
                className={
                  activeLink === "Asset"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <InventoryIcon className="asset_overview_link_icon" />
                Assets
              </Link>
              {/* <span class="vertical_ruleB"></span> */}
              <Link
                to="/dashboard/lend/pool/detail/transactions"
                className="pool_lend_details_link"
              >
                <ReceiptIcon className="asset_overview_link_icon" />
                Transactions
              </Link>
            </div>
            <div className="pool_detail_heading">
              <div className="pool_detail_heading_area1">
                <img
                  src="/img/pool_asset_icon.png"
                  alt=""
                  className="pool_detail_heading_area1_img"
                />
                <div className="pool_detail_heading_area1_txt_cont">
                  <div className="pool_detail_heading_area1_txt_cont_1">
                    Branch Series 3 (1754 Factory){" "}
                    {/* <div className="pool_detail_investmentcapacity_box">
                      {" "}
                      41.2M Engn
                    </div> */}
                  </div>
                  <div className="pool_detail_heading_area1_txt_cont_2">
                    Overview
                  </div>
                </div>
              </div>
              <div className="pool_detail_heading_area1_invest_btn_div">
                <button
                  className="pool_detail_heading_area1_invest_btn"
                  onClick={toggleAssetModal}
                >
                  Lend
                </button>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="pool_detail_sub_area1">
              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  Emerging Market Consumer Loans
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Asset Type
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  3 months
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Asset Maturity
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  10.75 <span className="asset_symbol"> %</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Senior APY(30 days)
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  48.45 <span className="asset_symbol"> %</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Junior APY(90 days)
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  8,336,195 <span className="asset_symbol"> Engn</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Pool Value
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="Asset_Originator_Details_cont">
              <div className="Asset_Originator_Details_cont_heading">
                Asset Originator Details
              </div>
              <div className="Asset_Originator_Details_cont_body">
                <div className="Asset_Originator_Details_cont_body_head_img_cont">
                  <img
                    src="/img/branch_detail_img.png"
                    className="Asset_Originator_Details_cont_body_head_img"
                  />
                </div>
                <div className="Asset_Originator_Details_cont_body_txt">
                  Branch is a financial technology company that lends money to
                  consumers using machine learning algorithms to determine
                  credit worthiness via customers' smartphones. Branch was
                  founded in 2015 and has operations in Kenya, Nigeria,
                  Tanzania, Mexico and India, and has since originated over
                  $500M in loans to over 4 millions borrowers. This Tinlake pool
                  will consist of tranches of a secured non convertible
                  debenture with a maturity of 3 years backed by a portfolio of
                  loans made to customers.The current weighted average loan
                  balance is $49 (ranging from $6 to $2,500) with average
                  maturity of 70 days.
                </div>
                <div className="Asset_Originator_Details_cont_body_issuer_cont">
                  <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                    Issuer
                  </div>
                  <div className="Asset_Originator_Details_cont_body_issuer_cont_txt">
                    1754 Factory Series 3
                  </div>
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}

            <div className="pool_status">
              <div className="pool_status_cont_heading">Pool Status</div>
              <div className="pool_status_Details_cont_body">
                <div className="pool_status_Details_cont_body1">
                  <div className="pool_status_Details_cont_body1_cont1">
                    <div className="pool_status_Details_cont_body1_head">
                      Assets
                    </div>
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Asset value
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        8,336,195 Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Average financing fee
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        13.0%
                      </div>
                    </div>
                    <hr className="custom_hr" />

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Average maturity
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        3 months
                      </div>
                    </div>
                  </div>
                  <div className="pool_status_Details_cont_body1_cont2">
                    <div className="pool_status_Details_cont_body1_head">
                      Liquidity
                    </div>

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Available Liquidity
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        0 Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Cash Drag
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        0%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* ================================================= */}
      {/* ================================================= */}
      {/* ================================================= */}

      {assetModal === true ? (
        <div
          className="asset_list_modal
      "
        >
          <div className="asset_list_modal_container">
            {/* <div className="asset_list_body"> */}
            <div className="asset_list_txt">
              Asset List{" "}
              <CloseIcon
                className="closeBackModalIcon"
                onClick={toggleAssetModal}
              />
            </div>
            <div className="asset_list_body_head2">
              {/* <div className="asset_list_body_head_tab1">Asset Id</div> */}
              <div className="asset_list_body_head_tab1">Asset Name</div>
              <div className="asset_list_body_head_tab3">Date & Time</div>
              <div className="asset_list_body_head_tab4">Maturity Date</div>
              <div className="asset_list_body_head_tab5">Amount(Engn)</div>
              <div className="asset_list_body_head_tab6">Financing Fee</div>
              <div className="asset_list_body_head_tab7">Action</div>
            </div>
            <div className="asset_list_body_body_cont">
              {activeBtn === "Ongoing"
                ? assets2
                    .filter((person) => person.Status == "Ongoing")
                    .map((data) => (
                      <div
                        className="asset_list_body_body_cont_1"
                        id={data.id}
                        // onClick={ChangeAssetDetailModal}
                      >
                        {/* <div className="asset_list_body_body_cont_1a">
                                {data.id}
                              </div> */}
                        <div className="asset_list_body_body_cont_1a">
                          {data.PoolName}
                        </div>

                        <div className="asset_list_body_body_cont_1c">
                          {data.Date}
                        </div>
                        <div className="asset_list_body_body_cont_1d">
                          {data.EndDate}
                        </div>
                        <div className="asset_list_body_body_cont_1e">
                          {data.Amount}
                        </div>
                        <div className="asset_list_body_body_cont_1f">
                          {data.Fee}%
                        </div>
                        <div className="asset_list_body_body_cont_1g">
                          <button
                            onClick={toggleBackModal}
                            className="back_btn"
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    ))
                : null}
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : null}

      {backModal === true ? (
        <div className="bacModal_div">
          <div className="back_modal_container">
            <div className="back_modal_cont">
              <CloseIcon
                className="closeBackModalIcon"
                onClick={toggleBackModal}
              />
              <div className="back_modal_heading">Back this pool</div>

              <div className="back_Modal_input_area">
                <div className="back_modal_input_amnt_head">Input amount</div>
                <span className="input_space">
                  <AccountBalanceWalletIcon className="input_dollar_sign" />
                  <input
                    type="number"
                    className="back_modal_input"
                    placeholder="0.00 Engn"
                  />
                  <div className="back_modal_input_amnt_head_minimum">
                    Minimum Amount: 50,000.00 Engn
                  </div>
                </span>
              </div>
              <div className="amount_earned_mnthly">
                Expected APY:
                <span className="amount_earned_mnthly_value"> 13%</span>
              </div>
              <div className="back_loan_btn_div">
                <button className="back_loan_btn">Fund</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard_lend_details_page;
