import React, { useState, useEffect, useContext } from "react";
import "../../../css/dashboard_branch_assets.css";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Accordion from "../Accordion";
import Sparkline from "../../static/Sparkline";
import CircleIcon from "@mui/icons-material/Circle";
import EastIcon from "@mui/icons-material/East";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CopyAllIcon from "@mui/icons-material/CopyAll";
// import ProgressBar from 'react-animated-progress-bar';

import data from "../../static/FakerModule";

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
import Nodata from "./nodataComponent/Nodata";
import { numberWithCommas } from "../../static/static";
import { config } from "../../../actions/Config";
// import { API_URL as api_url } from "../actions/types";
import { API_URL as api_url } from "../../../actions/types";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

const DashBoardBranchAsset = ({ match }) => {
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

  const [loans, setLoans] = useState([]);
  const [BranchDetails, setBranchDetails] = useState({
    branchName: "",
    amount: "",
    funded: "",
  });
  const [rumuName, setRumuName] = useState(false);
  const [agipName, setAgipName] = useState(false);
  const [graphAmount, setgraphamount] = useState(0);
  const [oyName, setOyName] = useState(false);
  const [txnhash, setTxnHash] = useState(match.params.branchAddress);
  const [totalPoolValue, setTotalPoolValue] = useState("");
  const [graphData, setGraphData] = useState("");
  const [graphData2, setGraphData2] = useState([]);
  const [options, setObject] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [14300, 14400, 144500, 144600, 14300, 1400, 1500000],
    },
  ]);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [activeLink, setActiveLink] = useState("");
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [imgDiv, setImgDiv] = useState(false);
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
      .get(api_url + "/api/branch/transactions/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "made man");

        setLoans(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    //   return;
    // }
  }, []);

  // console.log(data2);
  const toggleImgDiv = () => {
    setImgDiv(!imgDiv);
  };

  const ChangeAssetDetailModal = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setAssetDetailModal(currentTarget);
  };

  useEffect(() => {
    // if (account) {
    axios
      .get(api_url + "/api/lend/unique/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful333333");
        // console.log(txnhash);
        // setloans(data.data.payload);
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
      .get(api_url + "/api/branch/specific/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload[0].total, "powerfulttt5tt333333");
        setTotalPoolValue(data.data.payload[0].total);
        // console.log(txnhash);
        // setloans(data.data.payload);
        // setBranchDetails({
        //   branchName: data.data.payload[0].name,
        //   amount: data.data.payload[0].amount,
        // });
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
      .get(api_url + "/api/branch/chart/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerfulttt5tt333333");
        console.log(data.data.payload[0], "powerfulttt5tt333333");
        // setGraphData2(data.data.payload);
        // setGraphData(data.data.payload);
        const temp = data.data.payload;

        for (const data of temp) {
          //get the amount from the data object
          data.value = Number(parseInt(data.value).toFixed(2));
        }
        setGraphData2(() => temp);
        const array = temp.map((data) => {
          return parseInt(data.amount);
        });

        console.log(array, "higi");
        console.log(temp, "temppppoppp");

        setSeries([{ data: array }]);
        // setgraphamount(parseInt(graphData.amount).toFixed(0));
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    //   return;
    // }
  }, [graphData2]);
  console.log(graphData2, "grapodtatatata");
  // const values = [];
  // for (let i = 0; i < 100; i++) {
  //   values.push({
  //     timestamp: graphData2[0].timestamp,
  //     value: graphData2[0].value,
  //   });
  // }
  console.log(series, "ersrresrr");
  // var grapDataa =
  //   graphData &&
  //   graphData.length > 0 &&
  //   graphData.map((graphDataList) => graphDataList.amount);
  // console.log(
  //   graphData &&
  //     graphData.length > 0 &&
  //     graphData.map((graphDataList) => graphDataList.amount)
  // );
  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };

  useEffect(() => {
    axios
      .get(api_url + "/api/lend/all/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload[0].name, "teeyuwiuoyuwuyi");

        // setloans(data.data.payload);
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
  console.log(btc, "btcbtcbtbcbtcbbtcb");
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
                    Total Asset Value
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    {numberWithCommas(parseInt(totalPoolValue).toFixed(2))} Engn
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
                        dataKey="value"
                        stroke="#fff"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                {/* ========= */}
                {/* ========= */}
                {/* ========= */}
                {/* <div className="assets_chart_area">
              
                  <AreaChart
                    width={730}
                    height={150}
                    data={graphData}
                    margin={{
                      top: 0,
                      tright: 0,
                      left: 0,
                      bottom: 0,
                    }}
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
                
                </div>*/}
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
                <span className="asset_list_head">Asset List </span>

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

              <div className="asset_list_desktop_view2">
                <table className="branch_asset_table">
                  <thead className="branch_asset_titles">
                    <tr className="branch_asset_title_div">
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_first">
                        Asset Name
                      </th>
                      <th className="branch_asset_heading_titles">
                        Amount(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funded(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Progress
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Left
                      </th>
                      <th className="branch_asset_heading_titles ">APY</th>
                      <th className="branch_asset_heading_titles ">Status</th>
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
                  {loans.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No Pools yet.
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
                      {activeBtn === "Ongoing"
                        ? loans
                            .filter((person) => person.state == "OPEN")
                            .map((asset) => {
                              var percentage =
                                (asset.funded / asset.amount) * 100;
                              const meta = JSON.parse(asset.metadata);

                              return (
                                <tr
                                  className="branch_asset_body_row "
                                  id={asset.newLoanID}
                                  onClick={ChangeAssetDetailModal}
                                >
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                    <div className="assets-data">
                                      <img
                                        src={meta.arrayImg}
                                        alt=""
                                        className="assets-list-icon_pool_icon"
                                      />

                                      <div className="assets-data-pool_name">
                                        {asset.title.substring(0, 8) + "..."}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                    <div className="asset_list_body_body_cont_1c">
                                      {numberWithCommas(
                                        parseInt(asset.amount).toFixed(2)
                                      )}
                                    </div>
                                    {/* </div> */}
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      {numberWithCommas(
                                        parseInt(asset.funded).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      <div className="asset_amount_progress_div">
                                        <div className="asset_amount_progress_div_txt"></div>
                                        <label for="file">
                                          {parseInt(percentage).toFixed()}%
                                        </label>
                                        <progress
                                          className={
                                            percentage < 100
                                              ? "progress_bar progress_bar_progress"
                                              : "progress_bar"
                                          }
                                          // "progress_bar"
                                          id="file"
                                          aria-valuenow={
                                            asset.amount - asset.funded
                                          }
                                          value={asset.funded}
                                          max={asset.amount}
                                        ></progress>
                                        {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                        {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool ">
                                      {numberWithCommas(
                                        parseInt(
                                          asset.amount - asset.funded
                                        ).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data   ">
                                    <div className="asset_list_body_body_cont_1f body_cont1_f">
                                      13%
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data ">
                                    <div className="asset_list_body_body_cont_1g">
                                      <button
                                        className={
                                          asset.state === "OPEN"
                                            ? "status_btn_ongoing"
                                            : asset.state === "FILLED"
                                            ? "status_btn_closed"
                                            : "status_btn"
                                        }
                                      >
                                        {asset.state}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                    <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                  </td>
                                </tr>
                              );
                            })
                        : activeBtn === "All"
                        ? loans.map((asset) => {
                            var percentage =
                              (asset.funded / asset.amount) * 100;
                            const meta = JSON.parse(asset.metadata);
                            return (
                              <tr
                                className="branch_asset_body_row "
                                id={asset.newLoanID}
                                onClick={ChangeAssetDetailModal}
                              >
                                <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                  <div className="assets-data">
                                    <img
                                      src={meta.arrayImg}
                                      alt=""
                                      className="assets-list-icon_pool_icon"
                                    />

                                    <div className="assets-data-pool_name">
                                      {asset.title.substring(0, 8) + "..."}
                                    </div>
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                  <div className="asset_list_body_body_cont_1c">
                                    {numberWithCommas(
                                      parseInt(asset.amount).toFixed(2)
                                    )}
                                  </div>
                                  {/* </div> */}
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  <div className="assets-data-name_pool">
                                    {numberWithCommas(
                                      parseInt(asset.funded).toFixed(2)
                                    )}
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  <div className="assets-data-name_pool">
                                    <div className="asset_amount_progress_div">
                                      <div className="asset_amount_progress_div_txt"></div>
                                      <label for="file">
                                        {parseInt(percentage).toFixed()}%
                                      </label>
                                      <progress
                                        className={
                                          percentage < 100
                                            ? "progress_bar progress_bar_progress"
                                            : "progress_bar"
                                        }
                                        // "progress_bar"
                                        id="file"
                                        aria-valuenow={
                                          asset.amount - asset.funded
                                        }
                                        value={asset.funded}
                                        max={asset.amount}
                                      ></progress>
                                      {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                      {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                    </div>
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  <div className="assets-data-name_pool ">
                                    {numberWithCommas(
                                      parseInt(
                                        asset.amount - asset.funded
                                      ).toFixed(2)
                                    )}
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data   ">
                                  <div className="asset_list_body_body_cont_1f body_cont1_f">
                                    13%
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data ">
                                  <div className="asset_list_body_body_cont_1g">
                                    <button
                                      className={
                                        asset.state === "OPEN"
                                          ? "status_btn_ongoing"
                                          : asset.state === "FILLED"
                                          ? "status_btn_closed"
                                          : "status_btn"
                                      }
                                    >
                                      {asset.state}
                                    </button>
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                  <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                </td>
                              </tr>
                            );
                          })
                        : activeBtn === "Closed"
                        ? loans
                            .filter((person) => person.state == "FILLED")
                            .map((asset) => {
                              var percentage =
                                (asset.funded / asset.amount) * 100;
                              const meta = JSON.parse(asset.metadata);
                              return (
                                <tr
                                  className="branch_asset_body_row "
                                  id={asset.newLoanID}
                                  onClick={ChangeAssetDetailModal}
                                >
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                    <div className="assets-data">
                                      <img
                                        src={meta.arrayImg}
                                        alt=""
                                        className="assets-list-icon_pool_icon"
                                      />

                                      <div className="assets-data-pool_name">
                                        {asset.title.substring(0, 8) + "..."}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                    <div className="asset_list_body_body_cont_1c">
                                      {numberWithCommas(
                                        parseInt(asset.amount).toFixed(2)
                                      )}
                                    </div>
                                    {/* </div> */}
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      {numberWithCommas(
                                        parseInt(asset.funded).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      <div className="asset_amount_progress_div">
                                        <div className="asset_amount_progress_div_txt"></div>
                                        <label for="file">
                                          {parseInt(percentage).toFixed()}%
                                        </label>
                                        <progress
                                          className={
                                            percentage < 100
                                              ? "progress_bar progress_bar_progress"
                                              : "progress_bar"
                                          }
                                          // "progress_bar"
                                          id="file"
                                          aria-valuenow={
                                            asset.amount - asset.funded
                                          }
                                          value={asset.funded}
                                          max={asset.amount}
                                        ></progress>
                                        {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                        {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool ">
                                      {numberWithCommas(
                                        parseInt(
                                          asset.amount - asset.funded
                                        ).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data   ">
                                    <div className="asset_list_body_body_cont_1f body_cont1_f">
                                      13%
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data ">
                                    <div className="asset_list_body_body_cont_1g">
                                      <button
                                        className={
                                          asset.state === "OPEN"
                                            ? "status_btn_ongoing"
                                            : asset.state === "FILLED"
                                            ? "status_btn_closed"
                                            : "status_btn"
                                        }
                                      >
                                        {asset.state}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                    <KeyboardArrowRightIcon className="arrow_right_arrow" />
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
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
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
      {loans.map((data) => {
        const meta = JSON.parse(data.metadata);

        const tHash = `https://bscscan.com/tx/${data.transactionHash}`;
        const returnProgress = () => {
          let value = parseInt(data.funded);
          let percentage = value / parseInt(data.amount);
          let final = percentage * 100;
          return final.toString();
        };
        var percentage = (data.funded / data.amount) * 100;
        return (
          <>
            {/* modal starts here */}
            {assetDetailModal == data.newLoanID ? (
              <div className="asset_detail_modal_div">
                <div className="asset_detail_modal_div_conts">
                  <div className="asset_detail_heading" style={{ margin: "0" }}>
                    <div className="pool_detail_heading_area1">
                      <img
                        src={meta.arrayImg}
                        alt=""
                        className="pool_detail_heading_area1_img"
                        onClick={toggleImgDiv}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="pool_detail_heading_area1_txt_cont">
                        <div className="pool_detail_heading_area1_txt_cont_1">
                          {data.title.substring(0, 25) + "..."}
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
                              : data.state === "FILLED"
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
                            Asset Value
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {numberWithCommas(parseInt(data.amount).toFixed())}{" "}
                            Engn
                          </div>
                        </div>
                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Amount Funded
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {numberWithCommas(data.funded)} Engn
                          </div>
                        </div>

                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Funding Progress
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            <div className="asset_amount_progress_div">
                              <div className="asset_amount_progress_div_txt"></div>
                              <label for="file">
                                {parseInt(
                                  (data.funded / data.amount) * 100
                                ).toFixed()}
                                %
                              </label>
                              <progress
                                className={
                                  percentage < 100
                                    ? "progress_bar progress_bar_progress"
                                    : "progress_bar"
                                }
                                // className={
                                //   data.funded < data.amount
                                //     ? " progress_bar progress_bar_progress"
                                //     : data.funded === data.amount
                                //     ? "progress_bar"
                                //     : " progress_bar progress_bar_progress"
                                // }
                                // "progress_bar"
                                id="file"
                                aria-valuenow={data.amount - data.funded}
                                value={data.funded}
                                max={data.amount}
                              ></progress>
                            </div>
                          </div>
                        </div>
                        {/* <hr class="custom_hr"></hr> */}
                      </div>
                      {/* ======== */}
                      {/* ======== */}
                      {/* ======== */}
                      {/* ======== */}
                      <div className="asset_status_details_div1_body1">
                        {/* <hr class="custom_hr"></hr> */}

                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Funding left
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {numberWithCommas(data.amount - data.funded)} Engn
                          </div>
                        </div>
                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Estimated APY
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
                      <div
                        className="Asset_Originator_Details_cont_body_txt"
                        dangerouslySetInnerHTML={{
                          __html: meta.story,
                        }}
                      ></div>
                      <div className="asset_details_spec_div">
                        {/* <div className="asset_details_spec_div_title"> */}
                        {/* <Accordion
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
                        </Accordion> */}
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
                      <div className="transactionData_body1">
                        Transaction Id
                      </div>
                      <div className="transactionData_body1">
                        <a
                          href={tHash}
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
                      <img
                        src={meta.arrayImg}
                        alt=""
                        style={{ width: "100%" }}
                      />
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
        );
      })}
    </div>
  );
};

export default DashBoardBranchAsset;
