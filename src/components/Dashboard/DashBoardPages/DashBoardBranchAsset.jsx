import React, { useState, useEffect, useContext } from "react";
import "../../../css/dashboard_branch_assets.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Accordion from "../Accordion";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { UserContext } from "../../context/Context";
import axios from "axios";
import { config } from "../../../actions/Config";
// import { API_URL as api_url } from "../actions/types";
import { API_URL as api_url } from "../../../actions/types";
const DashBoardBranchAsset = ({ match }) => {
  const { loans } = useContext(UserContext);
  const [txnhash, setTxnHash] = useState(match.params.branchAddress);
  const [BranchDetails, setBranchDetails] = useState({
    branchName: "",
    amount: "",
  });
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [activeLink, setActiveLink] = useState("");
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [imgDiv, setImgDiv] = useState(false);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");

  useEffect(() => {
    if (currentPage === "/dashboard/lend/pool/" + urlArr[4] + "/detail") {
      setActiveLink("Overview");
    } else if (
      currentPage ===
      "/dashboard/lend/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveLink("Asset");
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

  const toggleImgDiv = () => {
    setImgDiv(!imgDiv);
  };
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
  const ChangeAssetDetailModal = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setAssetDetailModal(currentTarget);
  };

  useEffect(() => {
    axios
      .get(api_url + "/api/lend/unique/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful333333");
        // console.log(txnhash);
        // setBranches(data.data.payload);
        setBranchDetails({
          branchName: data.data.payload[0].name,
          amount: data.data.payload[0].amount,
        });
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
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
                to={`/dashboard/lend/pool/${txnhash}/detail`}
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
                to={`/dashboard/lend/pool/detail/branch/${txnhash}/asset`}
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
                    {BranchDetails.branchName} Branch
                    {/* <div className="pool_detail_investmentcapacity_box">
                        {" "}
                        41.2M Engn
                      </div> */}
                  </div>
                  <div className="pool_detail_heading_area1_txt_cont_2">
                    Assets
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
                    Pool reserve
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1a">
                      0 Engn
                    </div>
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1b">
                      Max: 4,000,000 Engn
                    </div>
                  </div>
                </div>
              </div>
              <div className="pool_detail_assets_body_layer_1_cont1">
                <div className="pool_detail_assets_body_layer_1_cont1_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Pool Value
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Jun 3, 2022 - present
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
              <div className="asset_list_heading">
                Asset List{" "}
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
                    Ongoing
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
                    All Pools
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
                    Closed
                  </div>
                </div>
              </div>
              <div className="asset_list_body">
                <div className="asset_list_body_head">
                  {/* <div className="asset_list_body_head_tab1">Asset Id</div> */}
                  <div className="asset_list_body_head_tab1">Asset Name</div>
                  <div className="asset_list_body_head_tab3">Date & Time</div>
                  <div className="asset_list_body_head_tab4">Maturity Date</div>
                  <div className="asset_list_body_head_tab5">Amount(Engn)</div>
                  <div className="asset_list_body_head_tab6">Financing Fee</div>
                  <div className="asset_list_body_head_tab7">Status</div>
                </div>
                <div className="asset_list_body_body_cont">
                  {activeBtn === "Ongoing"
                    ? loans
                        .filter((person) => person.state == "OPEN")
                        .map((data) => (
                          <div
                            className="asset_list_body_body_cont_1"
                            id={data.newLoanID}
                            onClick={ChangeAssetDetailModal}
                          >
                            {/* <div className="asset_list_body_body_cont_1a">
                                {data.id}
                              </div> */}
                            <div className="asset_list_body_body_cont_1a">
                              {data.title.substring(0, 15) + "..."}
                            </div>

                            <div className="asset_list_body_body_cont_1c">
                              {data.createdAt.slice(0, 10)}
                            </div>
                            <div className="asset_list_body_body_cont_1d">
                              {data.createdAt.slice(0, 10)}
                            </div>
                            <div className="asset_list_body_body_cont_1e">
                              {parseInt(data.amount).toFixed()}
                            </div>
                            <div className="asset_list_body_body_cont_1f">
                              13%
                            </div>
                            <div className="asset_list_body_body_cont_1g">
                              <button
                                className={
                                  data.state === "OPEN"
                                    ? "status_btn_ongoing"
                                    : data.state === "Closed"
                                    ? "status_btn_closed"
                                    : "status_btn"
                                }
                              >
                                {data.state}
                              </button>
                            </div>
                            <KeyboardArrowRightIcon className="arrow_right_arrow" />
                          </div>
                        ))
                    : activeBtn === "All"
                    ? assets.map((data) => (
                        <div
                          className="asset_list_body_body_cont_1"
                          id={data.id}
                          onClick={ChangeAssetDetailModal}
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
                          </div>
                          <KeyboardArrowRightIcon className="arrow_right_arrow" />
                        </div>
                      ))
                    : activeBtn === "Closed"
                    ? assets
                        .filter((person) => person.Status == "Closed")
                        .map((data) => (
                          <div
                            className="asset_list_body_body_cont_1"
                            id={data.id}
                            onClick={ChangeAssetDetailModal}
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
                            </div>
                            <KeyboardArrowRightIcon className="arrow_right_arrow" />
                          </div>
                        ))
                    : null}
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
      {loans.map((data) => (
        <>
          {assetDetailModal == data.newLoanID ? (
            <div className="asset_detail_modal_div">
              <div className="asset_detail_modal_div_conts">
                <div className="asset_detail_heading" style={{ margin: "0" }}>
                  <div className="pool_detail_heading_area1">
                    <img
                      src={data.img}
                      alt=""
                      className="pool_detail_heading_area1_img"
                      onClick={toggleImgDiv}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="pool_detail_heading_area1_txt_cont">
                      <div className="pool_detail_heading_area1_txt_cont_1">
                        {data.title.substring(0, 15) + "..."}
                      </div>
                      <div className="pool_detail_heading_area1_txt_cont_2">
                        Assets {">"} Asset{data.newLoanID}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                <div className="asset_status_details_div1">
                  <div className="asset_status_details_div1_head">
                    Status{" "}
                    <div className="staus_btn_div">
                      <button
                        className={
                          data.state === "OPEN"
                            ? "status_btn_ongoing"
                            : data.state === "Closed"
                            ? "status_btn_closed"
                            : "status_btn"
                        }
                      >
                        {data.state}
                      </button>
                    </div>
                  </div>
                  <div className="asset_status_details_div1_body">
                    <div className="asset_status_details_div1_body1">
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Available for Financing
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          {parseInt(data.amount).toFixed()} Engn
                        </div>
                      </div>
                      <hr class="custom_hr"></hr>
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Outstanding
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          {data.amount - data.funded} Engn
                        </div>
                      </div>
                      <hr class="custom_hr"></hr>
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Asset Duration
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          {data.length}day(s)
                        </div>
                      </div>
                      <hr class="custom_hr"></hr>
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Amount
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          {parseInt(data.amount).toFixed()}Engn
                        </div>
                      </div>
                    </div>
                    {/* ======== */}
                    {/* ======== */}
                    {/* ======== */}
                    {/* ======== */}
                    <div className="asset_status_details_div1_body1">
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Risk group
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          0
                        </div>
                      </div>
                      <hr class="custom_hr"></hr>
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Financing fee
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          13 %
                        </div>
                      </div>
                      <hr class="custom_hr"></hr>
                      <div className="asset_status_details_div1_body1_cont1">
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          Date
                        </div>
                        <div className="asset_status_details_div1_body1_cont1_txt1">
                          {data.createdAt.slice(0, 10)}
                        </div>
                      </div>
                      {/* <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Financed by
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Nov 13, 2024
                          </div>
                        </div> */}
                    </div>
                  </div>
                </div>
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <div className="Asset_Originator_Details_cont">
                  <div className="Asset_Originator_Details_cont_heading">
                    Asset Details
                  </div>
                  <div className="Asset_Originator_Details_cont_body">
                    {/* <div className="Asset_Originator_Details_cont_body_head_img_cont">
                        <img
                          src="/img/branch_detail_img.png"
                          className="Asset_Originator_Details_cont_body_head_img"
                        />
                      </div> */}
                    <div className="Asset_Originator_Details_cont_body_txt">
                      Branch is a financial technology company that lends money
                      to consumers using machine learning algorithms to
                      determine credit worthiness via customers' smartphones.
                      Branch was founded in 2015 and has operations in Kenya,
                      Nigeria, Tanzania, Mexico and India, and has since
                      originated over $500M in loans to over 4 millions
                      borrowers. This Tinlake pool will consist of tranches of a
                      secured non convertible debenture with a maturity of 3
                      years backed by a portfolio of loans made to customers.The
                      current weighted average loan balance is $49 (ranging from
                      $6 to $2,500) with average maturity of 70 days.
                    </div>
                    <div className="asset_details_spec_div">
                      {/* <div className="asset_details_spec_div_title"> */}
                      <Accordion
                        title="Asset Specifications"
                        customClass=" accordionClass "
                      >
                        <div className="asset_spec_body">
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Ram: 4gb
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Rom: 128gb
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Display: 6.43 inches
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Processor: Snapdragon 678
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Rear Camera: 48 MP + 8 MP + 2 MP + 2 MP
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Front Camera: 13 MP
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            Battery: 5000 mAh
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                            SIM: Dual SIM (Nano-SIM, dual stand-by)
                          </div>
                        </div>
                      </Accordion>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <div className="Asset_Originator_Details_cont">
                  <div className="Asset_Originator_Details_cont_heading">
                    Transaction Data
                  </div>
                  <div className="transactionData_body">
                    <div className="transactionData_body1">Transaction Id</div>
                    <div className="transactionData_body1">
                      <a
                        href="https://bscscan.com/tx/0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7"
                        className="transaction_id_link"
                        target="_blank"
                      >
                        {data.transactionHash.substring(0, 28) + "..."}
                      </a>
                      <CopyAllIcon className="copy_all_tx_hash_icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="close_asset_detail_modal"
                onClick={closeAssetDetailModal}
              >
                <CloseIcon className="close_asset_detail_modal_icon" />
                Close
              </div>
              {imgDiv === true ? (
                <div className="img_modal">
                  <div className="img_modal_div">
                    <img src={data.img} alt="" style={{ width: "100%" }} />
                  </div>
                  <div
                    className="close_asset_detail_modal"
                    onClick={toggleImgDiv}
                  >
                    <CloseIcon className="close_asset_detail_modal_icon" />
                    Close
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

export default DashBoardBranchAsset;
