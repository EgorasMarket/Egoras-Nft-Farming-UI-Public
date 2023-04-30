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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { UserContext } from "../../context/Context";
import axios from "axios";
import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import Nodata from "./nodataComponent/Nodata";
import {
  Web3Reactvider,
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
  // const { Branches, BranchDetails, rumuName, agipName, oyName } =
  //   useContext(UserContext);
  const [BranchDetails, setBranchDetails] = useState({
    branchName: "",
    amount: "",
    funded: "",
  });
  const [rumuName, setRumuName] = useState(false);
  const [agipName, setAgipName] = useState(false);
  const [oyName, setOyName] = useState(false);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [txnhash, setTxnHash] = useState(match.params.branchAddress);
  const [activeLink, setActiveLink] = useState("");
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [assetDetailModal, setAssetDetailModal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [graphData2, setGraphData2] = useState([]);

  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setActiveLink("Overview");
    } else if (
      currentPage ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveLink("Asset");
    } else if (
      currentPage ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
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
        setTransactions(data.data.payload);
        const temp = data.data.payload;
        for (const data of temp) {
          //get the amount from the data object
          data.amount = Number(parseInt(data.amount).toFixed(2));
        }
        setGraphData2(() => temp);
        const array = temp.map((data) => {
          return parseInt(data.amount);
        });
        console.log(array, "higi");
        // setGraphData2(() => array);

        // console.log(txnhash);
        // setBranches(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });

    //   return;
    // }
  }, []);
  console.log(graphData2);
  useEffect(() => {
    // if (account) {
    axios
      .get(api_url + "/api/branch/alltime/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload[0].totalSum, "powerful3333oooo33");
        setTotalTransactions(data.data.payload[0].totalSum);
        // setTransactions(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });

    //   return;
    // }
  }, []);
  useEffect(() => {
    axios
      .get(api_url + "/api/lend/all/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload[0].name, "teeyuwiuoyuwuyi");

        // setBranches(data.data.payload);
        setBranchDetails({
          branchName: data.data.payload[0].name,
          amount: data.data.payload[0].amount,
          funded: data.data.payload[0].funded,
        });
        let babara = data.data.payload[0].name.includes("R");
        let babara2 = data.data.payload[0].name.includes("A");
        let babara3 = data.data.payload[0].name.includes("O");
        console.log(data.data.payload[0].name);
        setRumuName(babara);
        setAgipName(babara2);
        setOyName(babara3);

        console.log(babara);
        console.log(babara, babara2, babara3);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
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
                to={`/app/earn/pool/${txnhash}/detail`}
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
                to={`/app/earn/pool/detail/branch/${txnhash}/asset`}
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
                to={`/app/earn/pool/detail/${txnhash}/transactions`}
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
                    {numberWithCommas(parseInt(totalTransactions).toFixed(4))}{" "}
                    Engn
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
                    Transactions
                  </div>
                </div>
                <div
                  className="assets_chart_area1"
                  style={{ width: "100%", height: 200 }}
                >
                  <ResponsiveContainer>
                    <AreaChart
                      width={130}
                      height={10}
                      data={graphData2}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#60c589"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
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
                        stroke="#7a5fc0"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div
                  className="assets_chart_area2"
                  style={{ width: "100%", height: 200 }}
                >
                  <ResponsiveContainer>
                    <AreaChart
                      width={130}
                      height={10}
                      data={graphData2}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#fff"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#fff"
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
                        stroke="#fff"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
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
              {/* ==================== */}
              {/* ==================== */}
              {/* ==================== */}
              {/* ==================== */}
              {/* ==================== */}
              {/* ==================== */}
              {/* ==================== */}
              {/* ==================== */}
              <div className="asset_list_desktop_view2">
                <table className="branch_asset_table">
                  <thead className="branch_asset_titles">
                    <tr className="branch_asset_title_div">
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_first">
                        Txn hash
                      </th>
                      <th className="branch_asset_heading_titles">Date</th>
                      <th className="branch_asset_heading_titles">
                        Funded(Engn)
                      </th>
                      <th className="branch_asset_heading_titles ">APY</th>
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_last"></th>
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
                  {transactions.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No Transactions.
                      </div>{" "}
                    </div>
                  ) : (
                    <tbody
                      className="branch_asset_body"
                      id="popular-categories"
                    >
                      {" "}
                      {/* =============== */}
                      {/* =============== */}
                      {/* =============== */}
                      {transactions
                        .slice(0)
                        .reverse()
                        .map((asset) => {
                          return (
                            <tr
                              className="branch_asset_body_row "
                              id={asset.id}
                            >
                              <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                <div className="asset_list_body_body_cont_1a mobile_hash_head">
                                  <a
                                    href={`https://bscscan.com/tx/${asset.transactionHash}`}
                                    target="_blank"
                                    style={{ color: "#000" }}
                                  >
                                    {asset.transactionHash.substring(0, 28) +
                                      "..."}
                                  </a>
                                </div>
                              </td>
                              <td className="branch_asset_body_row_data  ">
                                {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                <div className="asset_list_body_body_cont_1c">
                                  {asset.createdAt.slice(0, 10)}
                                </div>
                                {/* </div> */}
                              </td>
                              <td className="branch_asset_body_row_data  ">
                                <div className="asset_list_body_body_cont_1e">
                                  {numberWithCommas(
                                    parseInt(asset.amount).toFixed()
                                  )}
                                </div>
                              </td>
                              <td className="branch_asset_body_row_data  ">
                                <div className="asset_list_body_body_cont_1f">
                                  13%
                                </div>
                              </td>
                              <td className="branch_asset_body_row_data  branch_asset_body_row_data_last">
                                <KeyboardArrowRightIcon className="arrow_right_arrow" />
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
    </div>
  );
};

export default DashBoardLendingTransactions;
