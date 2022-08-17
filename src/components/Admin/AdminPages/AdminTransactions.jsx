import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import { CopperLoading } from "respinner";
import StarRateIcon from "@mui/icons-material/StarRate";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { numberWithCommas } from "../../../static";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CopyAllIcon from "@mui/icons-material/CopyAll";
import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
import axios from "axios";

import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

const AdminTransactions = () => {
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [transactions, setTransactions] = useState([]);

  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
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
  const avatarRef = useRef();
  useEffect(() => {
    setWalletAddr(account);
    // console.log(walletAddr.slice(0, 10));
    const element = avatarRef.current;
    if (element && account) {
      setWalletAddr(account);
      setConnectTxt("Connected");
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      console.log(addr, seed);
      const icon = jazzicon(60, seed); //generates a size 20 icon
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef]);
  useEffect(() => {
    // if (account) {
    axios
      .get(
        api_url +
          "/api/lend/unique/" +
          "0x4fc19963b769711c09da56b35B334E55c57fc9Ee",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.payload, "powerful333333");
        setTransactions(data.data.payload);
        // const temp = data.data.payload;
        // for (const data of temp) {
        //   //get the amount from the data object
        //   data.amount = Number(parseInt(data.amount).toFixed(2));
        // }
        // setGraphData2(() => temp);
        // const array = temp.map((data) => {
        //   return parseInt(data.amount);
        // });
        // console.log(array, "higi");
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
  var btc = [
    {
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 225000,
    },
    {
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 81900,
    },
    {
      timestamp: "2022-07-16T15:09:00.000Z",
      value: 15900,
    },
    {
      timestamp: "2022-07-16T15:20:00.000Z",
      value: 15900,
    },
    {
      timestamp: "2022-07-16T15:44:01.000Z",
      value: 31800,
    },
    {
      timestamp: "2022-07-18T12:40:00.000Z",
      value: 100000,
    },
    {
      timestamp: "2022-07-18T13:56:00.000Z",
      value: 183190,
    },
    {
      timestamp: "2022-07-18T14:25:00.000Z",
      value: 545200,
    },
    {
      timestamp: "2022-07-18T14:59:01.000Z",
      value: 131900,
    },
    {
      timestamp: "2022-07-18T15:39:00.000Z",
      value: 199900,
    },
    {
      timestamp: "2022-07-18T16:11:01.000Z",
      value: 181700,
    },
    {
      timestamp: "2022-07-18T16:27:01.000Z",
      value: 126700,
    },
    {
      timestamp: "2022-07-18T16:46:00.000Z",
      value: 121600,
    },
  ];
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
            <div className="userdAshboard_head">
              <div className="userdAshboard_head_area">
                <div className="metamask_prof_pic" ref={avatarRef}></div>
                <div className="user_walletAddress">
                  <div className="wallet_addr_cont">
                    <div className="wallet_addr_cont_txt">{walletAddr}</div>

                    <CopyAllIcon className="copy_all_tx_hash_icon" />
                  </div>
                  <span className="connected_txt">{conecttxt}</span>
                </div>
              </div>
              {/* <span className="hr_vertical"></span>

              <div className="admin_asset_data_count_head">
                <div className="admin_transact_data_graph_head_sub">
                  Total Assets : 52
                </div>
                Total Asset Value : 6,000,000 Engn
              </div> */}
            </div>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <div class="Asset_Originator_Details_cont_body">
              <div className="admin_transact_data_graph">
                <div className="admin_transact_data_graph_head">
                  Total Transactions : 3,000,000 Engn
                  <div className="admin_transact_data_graph_head_sub">
                    Transaction Count : 17txn
                  </div>
                </div>
                <div className="admin_transact_data_graph_body">
                  <div
                    className="assets_chart_area1"
                    style={{ width: "100%", height: " 300px " }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={btc}
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
                          dataKey="value"
                          stroke="#229e54"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className="assets_chart_area2"
                    style={{ width: "100%", height: "300px" }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={btc}
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
                          dataKey="value"
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

export default AdminTransactions;
