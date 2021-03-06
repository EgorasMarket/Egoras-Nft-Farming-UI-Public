import React, { useState, useEffect } from "react";
// import "../../../css/dashboard_branch_assets.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Accordion from "../Accordion";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
const DashBoardLendingTransactions = () => {
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [activeLink, setActiveLink] = useState("");
  const [assetDetailModal, setAssetDetailModal] = useState(0);
  const currentPage = window.location.pathname;
  useEffect(() => {
    if (currentPage === "/dashboard/lend/pool/detail") {
      setActiveLink("Overview");
    } else if (currentPage === "/dashboard/lend/pool/detail/branch/asset") {
      setActiveLink("Asset");
    } else if (currentPage === "/dashboard/lend/pool/detail/transactions") {
      setActiveLink("Transaction");
    }
  });
  const data2 = [
    {
      PoolValue: 0,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 100,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 200,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4300,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4400,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4200,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4500,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4600,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4700,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4500,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4600,
      pv: 2400,
      amt: 2400,
    },

    {
      PoolValue: 4600,
      pv: 2400,
      amt: 2400,
    },
    {
      PoolValue: 4800,
      pv: 2400,
      amt: 2400,
    },
  ];
  const assets = [
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
                to="/dashboard/lend/pool/detail/branch/transactions"
                className={
                  activeLink === "Transaction"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
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
                    Transactions
                  </div>
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="pool_detail_assets_body_layer_1">
              <div className="pool_detail_assets_body_layer_1_cont1">
                <div className="pool_detail_assets_body_layer_1_cont1_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Asset Value
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    8,336,195 Engn
                  </div>
                </div>
                <div className="pool_detail_assets_body_layer_1_cont1_sub_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    Total Transactions
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1a">
                      0 Txn
                    </div>
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1b">
                      Vlue: 4,000,000 Engn
                    </div>
                  </div>
                </div>
              </div>
              <div className="pool_detail_assets_body_layer_1_cont1">
                <div className="pool_detail_assets_body_layer_1_cont1_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Transcations
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    per/day
                  </div>
                </div>
                <div className="assets_chart_area">
                  {/* <ResponsiveContainer width="100%" height="100%"> */}
                  <AreaChart
                    width={730}
                    height={150}
                    data={data2}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#60c589"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="95%"
                          stopColor="#60c589"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    {/* <XAxis dataKey="name" /> */}
                    {/* <YAxis /> */}
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="PoolValue"
                      stroke="#166235"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                  {/* </ResponsiveContainer> */}
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}

            <div className="asset_list_div">
              <div className="asset_list_heading">Transaction List </div>
              <div className="asset_list_body">
                <div className="asset_list_body_head">
                  {/* <div className="asset_list_body_head_tab1">Asset Id</div> */}
                  <div className="asset_list_body_head_tab1">Txn hash</div>
                  <div className="asset_list_body_head_tab3">Date & Time</div>
                  <div className="asset_list_body_head_tab5">Amount(Engn)</div>
                  <div className="asset_list_body_head_tab6">Financing Fee</div>
                </div>
                <div className="asset_list_body_body_cont">
                  {assets.map((data) => (
                    <div
                      className="asset_list_body_body_cont_1"
                      id={data.id}
                      //   onClick={ChangeAssetDetailModal}
                    >
                      {/* <div className="asset_list_body_body_cont_1a">
                            {data.id}
                          </div> */}
                      <div className="asset_list_body_body_cont_1a">
                        <a
                          href={`https://bscscan.com/tx/${data.txHash}`}
                          target="_blank"
                          style={{ color: "#000" }}
                        >
                          {data.txHash.substring(0, 28) + "..."}
                        </a>
                      </div>

                      <div className="asset_list_body_body_cont_1c">
                        {data.Date}
                      </div>

                      <div className="asset_list_body_body_cont_1e">
                        {data.Amount}
                      </div>
                      <div className="asset_list_body_body_cont_1f">
                        {data.Fee}%
                      </div>
                      {/* <div className="asset_list_body_body_cont_1g">
                        <button
                          className={
                            data.Status === "Ongoing"
                              ? "status_btn_ongoing"
                              : data.Status === "Closed"
                              ? "status_btn_closed"
                              : "status_btn"
                          }
                        >
                          {data.Status}
                        </button>
                      </div> */}
                      <KeyboardArrowRightIcon className="arrow_right_arrow" />
                    </div>
                  ))}
                </div>
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
    </div>
  );
};

export default DashBoardLendingTransactions;
