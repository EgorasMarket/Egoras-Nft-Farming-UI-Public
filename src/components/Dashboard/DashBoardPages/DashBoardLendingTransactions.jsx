import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../context/Context";
import axios from "axios";
import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import Nodata from "./nodataComponent/Nodata";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { numberWithCommas } from "../../static/static";

const DashBoardLendingTransactions = ({ match }) => {
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
  const { Branches, BranchDetails, rumuName, agipName, oyName } =
    useContext(UserContext);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [txnhash, setTxnHash] = useState(match.params.branchAddress);
  const [activeLink, setActiveLink] = useState("");
  const [assetDetailModal, setAssetDetailModal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/dashboard/earn/pool/" + urlArr[4] + "/detail") {
      setActiveLink("Overview");
    } else if (
      currentPage ===
      "/dashboard/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveLink("Asset");
    } else if (
      currentPage ===
      "/dashboard/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveLink("transaction");
    }
  });

  useEffect(() => {
    // if (account) {
    axios
      .get(api_url + "/api/lend/unique/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful333333");
        // console.log(txnhash);
        // setBranches(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });

    //   return;
    // }
  }, []);
  useEffect(() => {
    // if (account) {
    axios
      .get(api_url + "/api/branch/alltime/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful3333oooo33");
        setTransactions(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });

    //   return;
    // }
  }, []);

  return (
    <div className="other2 asset_other2">
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
                to={`/dashboard/earn/pool/${txnhash}/detail`}
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
                to={`/dashboard/earn/pool/detail/branch/${txnhash}/asset`}
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
                to={`/dashboard/earn/pool/detail/${txnhash}/transactions`}
                className={
                  activeLink === "transaction"
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
                  src={
                    oyName === true
                      ? "/img/oyigbo_icon.svg"
                      : agipName === true
                      ? "/img/agip_icon.svg"
                      : rumuName === true
                      ? "/img/rumu_icon.svg"
                      : null
                  }
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
                    Total Transactions
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    8,336,195 Engn
                  </div>
                </div>
                <div className="pool_detail_assets_body_layer_1_cont1_sub_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    Transactions Count
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1a">
                      {transactions.length}Txn
                    </div>
                    {/* <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1b">
                      Vlue: 4,000,000 Engn
                    </div> */}
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
                    data={transactions}
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
                      dataKey="amount"
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
                  {transactions.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No Transactions yet.
                      </div>{" "}
                    </div>
                  ) : (
                    transactions.map((data) => (
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
                            href={`https://bscscan.com/tx/${data.transactionHash}`}
                            target="_blank"
                            style={{ color: "#000" }}
                          >
                            {data.transactionHash.substring(0, 28) + "..."}
                          </a>
                        </div>

                        <div className="asset_list_body_body_cont_1c">
                          {data.createdAt.slice(0, 10)}
                        </div>

                        <div className="asset_list_body_body_cont_1e">
                          {numberWithCommas(parseInt(data.amount).toFixed())}
                        </div>
                        <div className="asset_list_body_body_cont_1f">13%</div>
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
                    ))
                  )}
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
