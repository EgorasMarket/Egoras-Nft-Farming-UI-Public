import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../../css/dashboardLend.css";
import { loadUser } from "../../../actions/auth";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../../actions/types";
import Paginate from "./Paginate";
import abi from "../../../web3/contracts/erc20.json";
// import TableWithPagination
import TableWithPagination from "../../SmallerComponents/Tables/TableWithPagination/TableWithPagination";
import { config } from "../../../actions/Config";
import { Authenticate } from "../../auth/Authenticate";
import formatNumber from "./FormatNumber";
// import { numberWithCommas } from "../../static/static";
import Blockies from "react-blockies";
import getMonthFromNumber from "./MonthFromNumber";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "../../../css/dashboardHome.css";
import { tokenBalance } from "../../../web3";
import axios from "axios";
import Web3 from "web3";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserContext } from "../../context/Context";
import Nodata from "./nodataComponent/Nodata";
import { numberWithCommas } from "../../static/static";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { getAuthUserStats } from "../../../actions/token";
import { GET_CHART_TVL } from "../../../services/stakeServices";
import { GET_TVL } from "../../../services/stakeServices";
import {
  GET_COIN_GEKO_PRICE,
  GET_COIN_GEKO_PRICE_IN_USD,
  GET_COIN_GEKO_PRICGET_TVLE_IN_USD,
} from "../../../services/generalServices";
import { format } from "date-fns";
import { parseEther, formatEther } from "@ethersproject/units";
const DashboardHome = () => {
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
  const [egcUsd, setEgcUsd] = useState(0);
  const [graphData2, setGraphData2] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [ChartValue, setChartValue] = useState(0);
  const [ChartTime, setChartTime] = useState(0);
  const [ChartValue2, setChartValue2] = useState(0);
  const [ChartTime2, setChartTime2] = useState(0);
  const [LastArray, setLastArray] = useState(0);
  const [lastIndex, setlastIndex] = useState(0);
  const [LastArray2, setLastArray2] = useState(0);
  const [lastIndex2, setlastIndex2] = useState(0);
  const [totalTVL, setTotalTVL] = useState(0);
  const [activeBtn, setActivrBtn] = useState("swap");
  const [StakeData, setStakeData] = useState([]);
  const [swapData, setSwapData] = useState([]);
  const [productData, setProductsData] = useState([]);
  const [TradeVolume, setTradeVolume] = useState(0);
  const [homeData, setHomeData] = useState({
    tvl: "0",
    volume: "0",
    users: 0,
  });
  useEffect(async () => {
    const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
    console.log("dddd");
    await axios
      .get(API_URL + "/staking/chart", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        const temp = data.data.data;
        console.log(temp);
        for (const data of temp) {
          data.value = parseInt(data.value).toFixed(2) * egc_usd;
          const date = new Date(data.timestamp);
          const day = date.getUTCDate().toString().padStart(2, "0");
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
          const year = date.getUTCFullYear();
          const formattedDated = `${day}/${month}/${year}`;
          const dateString = formattedDated;
          const dateParts = dateString.split("/");
          // new Date(year, monthIndex, day)
          const dateObj = new Date(
            dateParts[2],
            dateParts[1] - 1,
            dateParts[0]
          );
          // format the date using toLocaleDateString()
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          data.timestamp = formattedDate;
          data.month = getMonthFromNumber(data.month);
        }
        console.log(temp);
        setGraphData2(() => temp);
        setlastIndex(temp.length - 1);
        setLastArray(temp[temp.length - 1]);
        setChartValue(() => temp[temp.length - 1].value);
        setChartTime(() => temp[temp.length - 1].timestamp);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // socket.connect();
    // socket.on("staking", (stakings) => {
    //   // alert(JSON.stringify(stakings));
    // });
  }, []);
  useEffect(async () => {
    const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
    console.log("dddd");
    await axios
      .get(API_URL + "/swap/all", null, config)
      .then((data) => {
        console.log(data, "hhhhh");
        console.log(data.data.data);

        const myArray = data.data.data;
        myArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        console.log(myArray);
        const reversed = myArray
          .slice()
          .reverse()
          .map((data) => {
            return data;
          });
        const temp = reversed;
        for (const data of temp) {
          data.value = parseInt(data.value).toFixed(2) * egc_usd;
          const date = new Date(data.timestamp);
          const day = date.getUTCDate().toString().padStart(2, "0");
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
          const year = date.getUTCFullYear();
          const formattedDated = `${day}/${month}/${year}`;
          const dateString = formattedDated;
          const dateParts = dateString.split("/");
          // new Date(year, monthIndex, day)
          const dateObj = new Date(
            dateParts[2],
            dateParts[1] - 1,
            dateParts[0]
          );
          // format the date using toLocaleDateString()
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          data.timestamp = formattedDate;
          data.month = getMonthFromNumber(data.month);
        }
        const totalValue = reversed.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value;
        }, 0);
        console.log(totalValue);
        setTradeVolume(parseInt(totalValue).toFixed(2));
        console.log(temp);
        setGraphData(() => temp);
        setlastIndex2(temp.length - 1);
        setLastArray2(temp[temp.length - 1]);
        setChartValue2(() => temp[temp.length - 1].value);
        setChartTime2(() => temp[temp.length - 1].timestamp);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // socket.connect();
    // socket.on("staking", (stakings) => {
    //   // alert(JSON.stringify(stakings));
    // });
  }, []);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      setChartValue(payload[0].payload.value);
      setChartTime(payload[0].payload.timestamp);
    } else {
      setChartValue(LastArray.value);
      setChartTime(LastArray.timestamp);
    }
    return null;
  };
  const CustomTooltip2 = ({ active, payload, label }) => {
    console.log(active, payload);
    if (active && payload && payload.length) {
      setChartValue2(payload[0].payload.value);
      setChartTime2(payload[0].payload.timestamp);
    } else {
      setChartValue2(LastArray2.value);
      setChartTime2(LastArray2.timestamp);
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
      const response = await GET_TVL();

      console.log(response, "google");
      const tvl = egc_usd * response.tvl.tvl;
      const numberOfUsers = response.users;

      const main = parseFloat(tvl).toFixed(2);
      setHomeData({
        ...homeData,
        volume: main,
        users: numberOfUsers,
      });
    };
    fetchData();
  }, []);

  useEffect(
    async (e) => {
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          setEgcUsd(() => egc_usd_val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [egcUsd]
  );
  useEffect(async (e) => {
    const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
    let res = await tokenBalance(
      "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
      "0x3A81836b093f7f3D3ca271125CcD45c461409697",
      library.getSigner()
    );
    console.log(res);
    console.log(formatEther(res.message));
    let tvl = formatEther(res.message);
    setTotalTVL(tvl * egc_usd);
  });

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  useEffect(async () => {
    // if (account) {
    await axios
      .get(API_URL + "/staking/transactions", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        // const reversed = data.data.data.map((data) => {
        //   return data;
        // });
        const myArray = data.data.data;
        myArray.sort((a, b) => new Date(b.time) - new Date(a.time));
        console.log(myArray);
        setStakeData(myArray);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // }
  }, []);

  useEffect(async () => {
    // if (account) {
    await axios
      .get(API_URL + "/product/sold", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        // const reversed = data.data.data.map((data) => {
        //   return data;
        // });
        setProductsData(data.data.data.slice().reverse());
      })
      .catch((error) => {
        console.log(error.response);
      });
    // }
  }, []);
  // const names = ["Name", "Quantity", "Amount", "OrderId", "Status"];
  // pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 8;
  const [currentPage2, setCurrentPage2] = useState(0);
  const PER_PAGE2 = 8;
  const [currentPage3, setCurrentPage3] = useState(0);
  const PER_PAGE3 = 8;

  // handle page click event
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(StakeData.length / PER_PAGE);

  const currentTransactions = StakeData.slice(offset, offset + PER_PAGE);

  // ================
  // ================
  // ================
  // ================
  // ================
  // ================
  function handlePageClick2({ selected: selectedPage }) {
    setCurrentPage2(selectedPage);
  }

  const offset2 = currentPage2 * PER_PAGE2;
  const pageCount2 = Math.ceil(swapData.length / PER_PAGE2);
  const currentTransactions2 = swapData.slice(offset2, offset2 + PER_PAGE2);

  // ================
  // ================
  // ================
  // ================
  // ================
  // ================
  function handlePageClick3({ selected: selectedPage }) {
    setCurrentPage3(selectedPage);
  }

  const offset3 = currentPage3 * PER_PAGE3;
  const pageCount3 = Math.ceil(productData.length / PER_PAGE3);

  const currentTransactions3 = productData.slice(offset3, offset3 + PER_PAGE3);

  const tokenAddress = "0x58f66D0183615797940360A43c333A44215830BA";
  const getTokenSymbol = async (address) => {
    try {
      const web3 = new Web3(window.ethereum);
      const tokenContract = new web3.eth.Contract(abi.abi, address);
      const symbol = await tokenContract.methods.symbol().call();
      const name = await tokenContract.methods.name().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();
      console.log("Symbol:", symbol);
      console.log("Name:", name);
      console.log("Total supply:", totalSupply);
      return symbol;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(async () => {
    if (account) {
      const res = await getTokenSymbol(tokenAddress);
      console.log(res);
    }
  }, [account]);

  const ListedCoins = {
    "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd": {
      symbol: "BNB",
    },
    "0x58f66D0183615797940360A43c333A44215830BA": {
      symbol: "EUSD",
    },
    "0xb16ba303c1Fa64Dc8a91dCaF87D0299F85792B6A": {
      symbol: "EUSD",
    },
  };

  useEffect(async () => {
    await axios
      .get(API_URL + "/swap/transactions", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        const myArray = data.data.data;
        myArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(myArray);
        setSwapData(myArray);
      })
      .catch((error) => {
        console.log(error.response);
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
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="pool_container">
            <div className="analytics_container">
              <div className="analytics_container_head">Egoras Overview</div>
              <div className="analytics_container_body_mobile">
                <div className="analytics_container_1">
                  <div className="analytics_container_1_head">TVL</div>
                  <div
                    className="analytics_container_1_Amount"
                    onChange={CustomTooltip}
                  >
                    ${formatNumber(ChartValue)}
                  </div>
                  <span className="analytics_container_1_Amount_span">
                    {ChartTime}
                  </span>

                  <div className="analytics_container_1_chart">
                    <div
                      className="assets_chart_area1a "
                      style={{ width: "100%", height: 120 }}
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
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid
                            strokeDasharray="1 1"
                            stroke="#d7d7d7"
                          /> */}
                          <XAxis dataKey="month" stroke="0" />
                          {/* <YAxis stroke="#000" /> */}
                          {/* <Tooltip content={<CustomTooltip />} /> */}
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#7a5fc0"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div
                      className="assets_chart_area2 "
                      style={{ width: "100%", height: 120 }}
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
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid
                            strokeDasharray="1 1"
                            stroke="#d7d7d7"
                          /> */}
                          <XAxis dataKey="month" stroke="0" />
                          {/* <YAxis stroke="#000" /> */}
                          {/* <Tooltip content={<CustomTooltip />} /> */}
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#7a5fc0"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                <div className="analytics_container_1">
                  <div className="analytics_container_1_head">Volume 24H</div>
                  <div
                    className="analytics_container_1_Amount"
                    onChange={CustomTooltip2}
                  >
                    ${formatNumber(ChartValue2)}
                  </div>
                  <span className="analytics_container_1_Amount_span">
                    {ChartTime2}
                  </span>
                  <div className="analytics_container_1_chart">
                    <div
                      className="assets_chart_area1a"
                      style={{ width: "100%", height: 120 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={130}
                          height={10}
                          data={graphData}
                          margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="colorUvBar1"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#827dc3"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid strokeDasharray="3 3" /> */}
                          <XAxis dataKey="month" stroke="0" color="#fff" />
                          {/* <YAxis /> */}
                          {/* <Tooltip content={<CustomTooltip2 />} /> */}
                          {/* <Legend /> */}
                          <Bar
                            // type="monotone"
                            dataKey="value"
                            // stroke="#827dc3"
                            // fillOpacity={1}
                            fill="url(#colorUvBar1)"
                            // strokeWidth={2}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    {/* ===== */}
                    {/* ===== */}
                    {/* ===== */}
                    <div
                      className="assets_chart_area2"
                      style={{ width: "100%", height: 120 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={130}
                          height={10}
                          data={graphData}
                          margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="colorUvBar2"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#827dc3"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid strokeDasharray="3 3" /> */}
                          <XAxis
                            dataKey="month"
                            stroke="0"
                            fill="#fff"
                            color="#fff"
                          />
                          {/* <YAxis /> */}
                          {/* <Tooltip content={<CustomTooltip2 />} /> */}
                          <Bar
                            // type="monotone"
                            dataKey="value"
                            // stroke="#fff"
                            // fillOpacity={1}
                            fill="url(#colorUvBar2)"
                            // strokeWidth={2}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              {/* =============================================== */}
              <div className="analytics_container_body">
                <div className="analytics_container_1">
                  <div className="analytics_container_1_head">TVL</div>
                  <div
                    className="analytics_container_1_Amount"
                    onChange={CustomTooltip}
                  >
                    ${formatNumber(ChartValue)}
                  </div>
                  <span className="analytics_container_1_Amount_span">
                    {ChartTime}
                  </span>

                  <div className="analytics_container_1_chart">
                    <div
                      className="assets_chart_area1a "
                      style={{ width: "100%", height: 220 }}
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
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid
                            strokeDasharray="1 1"
                            stroke="#d7d7d7"
                          /> */}
                          <XAxis dataKey="month" stroke="0" />
                          {/* <YAxis stroke="#000" /> */}
                          {/* <Tooltip content={<CustomTooltip />} /> */}
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#7a5fc0"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div
                      className="assets_chart_area2 "
                      style={{ width: "100%", height: 220 }}
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
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid
                            strokeDasharray="1 1"
                            stroke="#d7d7d7"
                          /> */}
                          <XAxis dataKey="month" stroke="0" />
                          {/* <YAxis stroke="#000" /> */}
                          {/* <Tooltip content={<CustomTooltip />} /> */}
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#7a5fc0"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                <div className="analytics_container_1">
                  <div className="analytics_container_1_head">Volume 24H</div>
                  <div
                    className="analytics_container_1_Amount"
                    onChange={CustomTooltip2}
                  >
                    ${formatNumber(ChartValue2)}
                  </div>
                  <span className="analytics_container_1_Amount_span">
                    {ChartTime2}
                  </span>
                  <div className="analytics_container_1_chart">
                    <div
                      className="assets_chart_area1a"
                      style={{ width: "100%", height: 220 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={130}
                          height={10}
                          data={graphData}
                          margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="colorUvBar1"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#827dc3"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid strokeDasharray="3 3" /> */}
                          <XAxis dataKey="month" stroke="0" color="#fff" />
                          {/* <YAxis /> */}
                          {/* <Tooltip content={<CustomTooltip2 />} /> */}
                          {/* <Legend /> */}
                          <Bar
                            // type="monotone"
                            dataKey="value"
                            // stroke="#827dc3"
                            // fillOpacity={1}
                            fill="url(#colorUvBar1)"
                            // strokeWidth={2}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    {/* ===== */}
                    {/* ===== */}
                    {/* ===== */}
                    <div
                      className="assets_chart_area2"
                      style={{ width: "100%", height: 220 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={130}
                          height={10}
                          data={graphData}
                          margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="colorUvBar2"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#827dc3"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#827dc3"
                                stopOpacity={0.3}
                              />
                            </linearGradient>
                          </defs>
                          {/* <CartesianGrid strokeDasharray="3 3" /> */}
                          <XAxis
                            dataKey="month"
                            stroke="0"
                            fill="#fff"
                            color="#fff"
                          />
                          {/* <YAxis /> */}
                          {/* <Tooltip content={<CustomTooltip2 />} /> */}
                          <Bar
                            // type="monotone"
                            dataKey="value"
                            // stroke="#fff"
                            // fillOpacity={1}
                            fill="url(#colorUvBar2)"
                            // strokeWidth={2}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ========================== */}
            {/* ========================== */}
            {/* ========================== */}
            {/* ========================== */}
            {/* ========================== */}
            <div className="lending_area1">
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">Total TVL</div>
                  <div className="lending_area1_cont1_body_txt">
                    {formatNumber(homeData.volume)}
                    <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total value of EGC locked in the smart-contract.
                  </div>
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Trading Volume
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {formatNumber(TradeVolume.toString())}
                    <span className="usd_sign"> USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total trading volume carried out in the
                    smart-contract every 24hours.
                  </div>
                </div>
              </div>

              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">Total Users</div>
                  <div className="lending_area1_cont1_body_txt">
                    {formatNumber(homeData.users)}
                    <span className="usd_sign"></span>
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
                <div className="lending_area1_last_cont1_divs">
                  <span className="lending_area1_last_cont1_divs_cont1">
                    {" "}
                    Est.APY:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      12.0%
                    </span>
                  </span>
                  {/* <span className="lending_area1_last_cont1_divs_cont2">
                    Default Protection:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      2.26M ₦
                    </span>{" "}
                  </span> */}
                  <span className="lending_area1_last_cont1_divs_cont3">
                    {" "}
                    Total Transactions
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      0
                    </span>{" "}
                  </span>
                </div>
              </div>
            </div>
            {/* ========================== */}
            {/* ========================== */}
            {/* ========================== */}
            {/* ========================== */}
            {/* ========================== */}

            <div className="lock_container_transactions">
              <div className="BuyerSellerDiv_body_div2_tab_area">
                <div className="filter_table_area_1">Latest Transactions</div>
                <div className="filter_table_area_2 filter_table_area_2b">
                  <div
                    id="swap"
                    className={
                      activeBtn == "swap"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Swaps
                  </div>
                  <div
                    id="stake"
                    className={
                      activeBtn == "stake"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Stakes
                  </div>

                  <div
                    id="product"
                    className={
                      activeBtn == "product"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Products
                  </div>
                </div>
              </div>
              {activeBtn == "swap" ? (
                <div>
                  <div className="lock_container_transactions_body_all">
                    <table className="stakingTable_table">
                      <thead className="stakingTable_titles">
                        <tr className="stakingTable_title_div">
                          <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                            Action
                          </th>
                          <th className="stakingTable_heading_titles">
                            Amount In
                          </th>
                          <th className="stakingTable_heading_titles">
                            Amount Out
                          </th>
                          <th className="stakingTable_heading_titles">
                            Address
                          </th>

                          <th className="stakingTable_heading_titles stakingTable_heading_titles_last">
                            Txn Hash
                          </th>
                        </tr>
                      </thead>
                      {currentTransactions2.length <= 0 ? (
                        <div className="no_loans_div">
                          <div className="no_loans_div_cont">
                            <Nodata />
                            No transaction yet.
                          </div>{" "}
                        </div>
                      ) : (
                        <tbody
                          className="stakingTable_body"
                          id="popular-categories"
                        >
                          {" "}
                          {/* =============== */}
                          {/* =============== */}
                          {/* =============== */}
                          {currentTransactions2.map((data) => {
                            const date = new Date(data.createdAt);
                            const day = date
                              .getUTCDate()
                              .toString()
                              .padStart(2, "0");
                            const month = (date.getUTCMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const year = date.getUTCFullYear();
                            const formattedDate = `${day}/${month}/${year}`;
                            console.log(formattedDate);
                            const dateString = formattedDate;
                            const date2 = new Date(dateString);
                            const formattedDated = date.toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }
                            );

                            return (
                              <tr className="stakingTable_body_row ">
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                                  <div className="value_dolls_div">
                                    {`   Swap ${
                                      ListedCoins[data.tokenIn].symbol
                                    } For
                                    ${ListedCoins[data.tokenOut].symbol}`}
                                    {/* Swap For Me */}
                                    <div className="value_dolls_div_val">
                                      {formattedDated}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    <span style={{ display: "flex" }}>
                                      {numberWithCommas(
                                        parseFloat(data.amountIn).toFixed(2)
                                      )}{" "}
                                    </span>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    <span style={{ display: "flex" }}>
                                      {numberWithCommas(
                                        parseFloat(data.amountOut).toFixed(2)
                                      )}{" "}
                                    </span>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="stakingTable_body_row_data_blockies_">
                                    <Blockies
                                      seed={data.to}
                                      size={8}
                                      scale={4}
                                      className="blockies_icon"
                                    />
                                    {`${data.to.slice(0, 6)}...${data.to.slice(
                                      39,
                                      42
                                    )}`}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                    63,
                                    66
                                  )}`}
                                  <OpenInNewIcon className="tx_hash_link_icon" />
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
                  <Paginate
                    pageCount={pageCount2}
                    handlePageClick={handlePageClick2}
                  />
                </div>
              ) : null}
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              {activeBtn == "stake" ? (
                <div>
                  <div className="lock_container_transactions_body_all">
                    <table className="stakingTable_table">
                      <thead className="stakingTable_titles">
                        <tr className="stakingTable_title_div">
                          <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                            Action
                          </th>
                          <th className="stakingTable_heading_titles">
                            Amount
                          </th>
                          <th className="stakingTable_heading_titles">
                            Address
                          </th>

                          <th className="stakingTable_heading_titles stakingTable_heading_titles_last">
                            Txn Hash
                          </th>
                        </tr>
                      </thead>
                      {currentTransactions.length <= 0 ? (
                        <div className="no_loans_div">
                          <div className="no_loans_div_cont">
                            <Nodata />
                            No transaction yet.
                          </div>{" "}
                        </div>
                      ) : (
                        <tbody
                          className="stakingTable_body"
                          id="popular-categories"
                        >
                          {" "}
                          {/* =============== */}
                          {/* =============== */}
                          {/* =============== */}
                          {currentTransactions.map((data) => {
                            const date = new Date(data.time);
                            const day = date
                              .getUTCDate()
                              .toString()
                              .padStart(2, "0");
                            const month = (date.getUTCMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const year = date.getUTCFullYear();
                            const formattedDate = `${day}/${month}/${year}`;
                            console.log(formattedDate);
                            const dateString = formattedDate;
                            const date2 = new Date(dateString);
                            const formattedDated = date.toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }
                            );
                            return (
                              <tr className="stakingTable_body_row ">
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                                  <div className="value_dolls_div">
                                    {data.status == "STAKE"
                                      ? "Create Lock"
                                      : data.status == "UNSTAKE"
                                      ? "Unlock"
                                      : null}

                                    <div className="value_dolls_div_val">
                                      {/* {formattedDate} */}
                                      {formattedDated}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.status == "STAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(data.amount).toFixed(2)
                                        )}{" "}
                                        EGC
                                      </span>
                                    ) : data.status == "UNSTAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(
                                            data.unstake_amount
                                          ).toFixed(2)
                                        )}{" "}
                                        EGC
                                      </span>
                                    ) : null}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="stakingTable_body_row_data_blockies_">
                                    <Blockies
                                      seed={data.user}
                                      size={8}
                                      scale={4}
                                      className="blockies_icon"
                                    />
                                    {`${data.user.slice(
                                      0,
                                      6
                                    )}...${data.user.slice(39, 42)}`}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                    63,
                                    66
                                  )}`}
                                  <OpenInNewIcon className="tx_hash_link_icon" />
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
                  <Paginate
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                  />
                </div>
              ) : null}
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              {activeBtn == "product" ? (
                <div>
                  <div className="lock_container_transactions_body_all">
                    <table className="stakingTable_table">
                      <thead className="stakingTable_titles">
                        <tr className="stakingTable_title_div">
                          <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                            Action
                          </th>
                          <th className="stakingTable_heading_titles">
                            Amount
                          </th>
                          <th className="stakingTable_heading_titles">
                            Address
                          </th>

                          <th className="stakingTable_heading_titles stakingTable_heading_titles_last">
                            Txn Hash
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
                      {currentTransactions3.length <= 0 ? (
                        <div className="no_loans_div">
                          <div className="no_loans_div_cont">
                            <Nodata />
                            No transaction yet.
                          </div>{" "}
                        </div>
                      ) : (
                        <tbody
                          className="stakingTable_body"
                          id="popular-categories"
                        >
                          {" "}
                          {/* =============== */}
                          {/* =============== */}
                          {/* =============== */}
                          {currentTransactions3.map((data) => {
                            const date = new Date(data.time);
                            const day = date
                              .getUTCDate()
                              .toString()
                              .padStart(2, "0");
                            const month = (date.getUTCMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const year = date.getUTCFullYear();
                            const formattedDate = `${day}/${month}/${year}`;
                            console.log(formattedDate);
                            const dateString = formattedDate;
                            const date2 = new Date(dateString);
                            const formattedDated = date.toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }
                            );
                            return (
                              <tr className="stakingTable_body_row ">
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                                  <div className="value_dolls_div">
                                    {data.status == "STAKE"
                                      ? "Create Lock"
                                      : data.status == "UNSTAKE"
                                      ? "Unlock"
                                      : null}

                                    <div className="value_dolls_div_val">
                                      {/* {formattedDate} */}
                                      {formattedDated}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.status == "STAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(data.amount).toFixed(2)
                                        )}{" "}
                                        EGC
                                      </span>
                                    ) : data.status == "UNSTAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(
                                            data.unstake_amount
                                          ).toFixed(2)
                                        )}{" "}
                                        EGC
                                      </span>
                                    ) : null}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="stakingTable_body_row_data_blockies_">
                                    <Blockies
                                      seed={data.user}
                                      size={8}
                                      scale={4}
                                      className="blockies_icon"
                                    />
                                    {`${data.user.slice(
                                      0,
                                      6
                                    )}...${data.user.slice(39, 42)}`}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                    63,
                                    66
                                  )}`}
                                  <OpenInNewIcon className="tx_hash_link_icon" />
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
                  <Paginate
                    pageCount={pageCount3}
                    handlePageClick={handlePageClick3}
                  />
                </div>
              ) : null}
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// export default DashBoardLendPage;

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default DashboardHome;
