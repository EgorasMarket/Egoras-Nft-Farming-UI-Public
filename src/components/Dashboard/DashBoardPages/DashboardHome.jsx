import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../../css/dashboardLend.css";
import PulseLoader from "react-spinners/PulseLoader";
import { loadUser } from "../../../actions/auth";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../../actions/types";
import Paginate from "./Paginate";
import abi from "../../../web3/contracts/erc20.json";
import UpdatedErrorModal from "./UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "./UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedSuccessModal";
import ScaleLoader from "react-spinners/ScaleLoader";
import ClipLoader from "react-spinners/ClipLoader";
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

import {
  callGetBurnableAmount,
  burnToken,
  callGetBurntAmount,
} from "../../../web3/index";
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
  const [egc_usd, setEgc_usd] = useState(0.0);
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
  const [chartloaded, setChartLoaded] = useState(false);
  const [burntEgcLoaded, setBurntEgcLoaded] = useState(false);
  const [accumEgc, setAccumEgc] = useState(0);
  const [burntEgc, setBurntEgc] = useState(0);
  const [burnTransact, setBurnTransact] = useState([]);
  const [homeData, setHomeData] = useState({
    tvl: "0",
    volume: "0",
    users: 0,
  });
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [txHash, setTxHash] = useState("");
  useEffect(async () => {
    const egc_usd2 = await GET_COIN_GEKO_PRICE_IN_USD();
    // if
    console.log(parseFloat(egc_usd2));
    setEgc_usd(parseFloat(egc_usd2));
  }, []);

  useEffect(async () => {
    setChartLoaded(true);
    // setBurntEgcLoaded(true);
    const fetchData = async () => {
      try {
        const data = await axios.get(API_URL + "/staking/chart", null, config);
        console.log(data);
        console.log(data.data.data);
        if (data.data.data.length !== 0) {
          const temp = data.data.data;
          // const temp = data.data.data;
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
          return;
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    const timer = setTimeout(async () => {
      setChartLoaded(false);
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, [egc_usd]);

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const data = await axios.get(API_URL + "/swap/all", null, config);
        console.log(data, "hhhhh");
        // console.log(data.data.data);
        if (data.data.data.length !== 0) {
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
          console.log(reversed);
          const totalValue = reversed.reduce((accumulator, currentValue) => {
            console.log(accumulator, currentValue);
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
          return;
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    const timer = setTimeout(async () => {
      setChartLoaded(false);
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, [egc_usd]);
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
      // const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
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
  }, [egc_usd]);

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + "/staking/transactions",
        null,
        config
      );
      console.log(response);
      console.log(response.data.data);
      const myArray = response.data.data;
      myArray.sort((a, b) => new Date(b.time) - new Date(a.time));
      console.log(myArray);
      setStakeData(myArray);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  useEffect(async () => {
    // if (account) {
    await axios
      .get(API_URL + "/order/all/completed/buy/orders", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        setProductsData(data.data.data.slice().reverse());
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  useEffect(async () => {
    // if (account) {
    await axios
      .get(API_URL + "/web3/get/all/burn/record", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data.burnRecord);
        setBurnTransact(data.data.data.burnRecord.slice().reverse());
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  // const names = ["Name", "Quantity", "Amount", "OrderId", "Status"];
  // pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 8;
  const [currentPage2, setCurrentPage2] = useState(0);
  const PER_PAGE2 = 8;
  const [currentPage3, setCurrentPage3] = useState(0);
  const PER_PAGE3 = 8;
  const [currentPage4, setCurrentPage4] = useState(0);
  const PER_PAGE4 = 8;

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

  // ================
  // ================
  // ================
  // ================
  // ================
  // ================
  function handlePageClick4({ selected: selectedPage }) {
    setCurrentPage4(selectedPage);
  }

  const offset4 = currentPage4 * PER_PAGE4;
  const pageCount4 = Math.ceil(burnTransact.length / PER_PAGE4);

  const currentTransactions4 = burnTransact.slice(offset4, offset4 + PER_PAGE4);

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
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
      symbol: "BNB",
    },
    "0xEEec111dCa00461EC4Da49c09464953931aA7233": {
      symbol: "EUSD",
    },
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
      symbol: "EUSD",
    },
    "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e": {
      symbol: "EGC",
    },
    "0x55d398326f99059fF775485246999027B3197955": {
      symbol: "USDT",
    },
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
      symbol: "USDC",
    },
    "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82": {
      symbol: "CAKE",
    },
    "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153": {
      symbol: "FIL",
    },
    "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
      symbol: "ETH",
    },
    "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3": {
      symbol: "DAI",
    },
    "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE": {
      symbol: "XRP",
    },
    "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47": {
      symbol: "ADA",
    },
    "0xCC42724C6683B7E57334c4E856f4c9965ED682bD": {
      symbol: "MATIC",
    },
    "0x4B0F1812e5Df2A09796481Ff14017e6005508003": {
      symbol: "TWT",
    },
    "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402": {
      symbol: "DOT",
    },
    "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD": {
      symbol: "LINK",
    },
    "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94": {
      symbol: "LTC",
    },
    "0x1CE0c2827e2eF14D5C4f29a091d735A204794041": {
      symbol: "AVAX",
    },
    "0x14016E85a25aeb13065688cAFB43044C2ef86784": {
      symbol: "TUSD",
    },
  };
  const convertedCoins = {};
  for (const key in ListedCoins) {
    const lowercaseKey = key.toLowerCase();
    convertedCoins[lowercaseKey] = ListedCoins[key];
  }
  console.log(convertedCoins);
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

  const BurnToken = async () => {
    setIsLoading(true);
    setDisable(true);
    let res = await burnToken(library.getSigner());
    console.log(res);
    if (res.status == true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage("You've successfully burnt " + accumEgc + " egc");
    } else {
      console.log(res);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };

  useEffect(async () => {
    setBurntEgcLoaded(true);
    const fetchData = async () => {
      let check = await callGetBurnableAmount(library.getSigner());
      console.log(check);
      console.log(check.message);
      console.log(formatEther(check.message).toString());
      const converted = parseInt(formatEther(check.message).toString());
      setAccumEgc(converted * egc_usd);
    };
    const timer = setTimeout(async () => {
      setBurntEgcLoaded(false);
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, [egc_usd]);
  useEffect(async () => {
    setBurntEgcLoaded(true);
    const fetchData = async () => {
      let check = await callGetBurntAmount(library.getSigner());
      console.log(check);
      console.log(check.message);
      console.log(formatEther(check.message).toString());
      const converted = parseInt(formatEther(check.message).toString());
      setBurntEgc(converted * egc_usd);
    };
    const timer = setTimeout(async () => {
      setBurntEgcLoaded(false);
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, [egc_usd]);
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  useEffect(() => {
    if (accumEgc <= 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [accumEgc]);

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
                  {chartloaded ? (
                    <div className="chart_loader">
                      <ClipLoader color="#9e94b8" size={60} />
                      <span className="chart_loader_span">
                        Loading Please Wait...
                      </span>
                    </div>
                  ) : (
                    <>
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
                              <Tooltip content={<CustomTooltip />} />
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
                              <Tooltip content={<CustomTooltip />} />
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
                    </>
                  )}
                </div>
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                <div className="analytics_container_1">
                  <div className="analytics_container_1_head">Volume 24H</div>
                  {chartloaded ? (
                    <div className="chart_loader">
                      <ClipLoader color="#9e94b8" size={60} />
                      <span className="chart_loader_span">
                        Loading Please Wait...
                      </span>
                    </div>
                  ) : (
                    <>
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
                              <Tooltip content={<CustomTooltip2 />} />
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
                              <Tooltip content={<CustomTooltip2 />} />
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
                    </>
                  )}
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
                  {chartloaded ? (
                    <div className="chart_loader">
                      <ClipLoader color="#9e94b8" size={60} />
                      <span className="chart_loader_span">
                        Loading Please Wait...
                      </span>
                    </div>
                  ) : (
                    <>
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
                              <Tooltip content={<CustomTooltip />} />
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
                              <Tooltip content={<CustomTooltip />} />
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
                    </>
                  )}
                </div>
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                {/* ====== */}
                <div className="analytics_container_1">
                  <div className="analytics_container_1_head">Volume 24H</div>

                  {chartloaded ? (
                    <div className="chart_loader">
                      <ClipLoader color="#9e94b8" size={60} />
                      <span className="chart_loader_span">
                        Loading Please Wait...
                      </span>
                    </div>
                  ) : (
                    <>
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
                              <Tooltip content={<CustomTooltip2 />} />
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
                              <Tooltip content={<CustomTooltip2 />} />
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
                    </>
                  )}
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

            <div className="burn_egc_div">
              <div className="burn_egc_div_1">
                <div className="burn_egc_div_1_cont1">
                  <div className="burn_egc_div_1_cont1_area1">
                    Accumulated Egc{" "}
                    <div className="burn_egc_div_1_cont1_1">
                      <HelpOutlineIcon className="help_outline" />
                      <div className="helper_txt_div">
                        This is the total value of EGC locked in the
                        smart-contract.
                      </div>
                    </div>
                    :
                  </div>

                  {burntEgcLoaded ? (
                    <div className="burntEgcLoading">
                      <PulseLoader color="#9e94b8" size={20} height={20} />
                    </div>
                  ) : (
                    <div className="burn_egc_div_1_cont1_div1">
                      <span className="burn_egc_div_1_cont1_div1_span">
                        $ {formatNumber(accumEgc)}
                      </span>{" "}
                    </div>
                  )}
                </div>
                <span className="vertical_line"></span>
                <div className="burn_egc_div_1_cont1">
                  <div className="burn_egc_div_1_cont1_area1">
                    Burnt Egc{" "}
                    <div className="burn_egc_div_1_cont1_1">
                      <HelpOutlineIcon className="help_outline" />
                      <div className="helper_txt_div">
                        This is the total value of EGC locked in the
                        smart-contract.
                      </div>
                    </div>
                    :
                  </div>
                  {burntEgcLoaded ? (
                    <div className="burntEgcLoading">
                      {" "}
                      <PulseLoader color="#9e94b8" size={20} height={20} />
                    </div>
                  ) : (
                    <div className="burn_egc_div_1_cont1_div1">
                      <span className="burn_egc_div_1_cont1_div1_span">
                        $ {formatNumber(burntEgc)}
                      </span>{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="burn_egc_div__button">
                <button
                  className="burn_egc_div__button_burn"
                  onClick={BurnToken}
                  disabled={Disable}
                >
                  {isLoading ? (
                    <ScaleLoader color="#353250" size={10} height={20} />
                  ) : (
                    <> Burn</>
                  )}
                </button>
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
                <div className="filter_table_area_2">
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
                  <div
                    id="burn"
                    className={
                      activeBtn == "burn"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Burns
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
                                      convertedCoins[data.tokenIn.toLowerCase()]
                                        .symbol
                                    } For
                                    ${
                                      convertedCoins[
                                        data.tokenOut.toLowerCase()
                                      ].symbol
                                    }`}
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
                                  <a
                                    href={`https://bscscan.com/tx/${data.tx}`}
                                    target={"_blank"}
                                  >
                                    {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                      63,
                                      66
                                    )}`}
                                  </a>
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
                                  <a
                                    href={`https://bscscan.com/tx/${data.tx}`}
                                    target={"_blank"}
                                  >
                                    {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                      63,
                                      66
                                    )}`}
                                  </a>
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
                            Quantity
                          </th>
                          <th className="stakingTable_heading_titles">
                            Order Type
                          </th>
                          <th className="stakingTable_heading_titles">
                            Payment Type
                          </th>
                          <th className="stakingTable_heading_titles">
                            Seller
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
                                    Sold
                                    <div className="value_dolls_div_val">
                                      {/* {formattedDate} */}
                                      {formattedDated}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.amount}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.unit}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.order_type === "DIRECT"
                                      ? data.order_type
                                      : "MartGpt"}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.payment_method}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="stakingTable_body_row_data_blockies_">
                                    <Blockies
                                      seed={data.seller}
                                      size={8}
                                      scale={4}
                                      className="blockies_icon"
                                    />
                                    {`${data.seller.slice(
                                      0,
                                      6
                                    )}...${data.seller.slice(39, 42)}`}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  <a
                                    href={`https://bscscan.com/tx/${data.transactionHash}`}
                                    target={"_blank"}
                                  >
                                    {`${data.transactionHash.slice(
                                      0,
                                      6
                                    )}...${data.transactionHash.slice(63, 66)}`}
                                  </a>
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
              {activeBtn == "burn" ? (
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
                            Tokens
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
                      {currentTransactions4.length <= 0 ? (
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
                          {currentTransactions4.map((data) => {
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
                                    Burn
                                    <div className="value_dolls_div_val">
                                      {/* {formattedDate} */}
                                      {formattedDated}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {parseFloat(data.amount * egc_usd).toFixed(
                                      2
                                    )}{" "}
                                    USD
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {parseFloat(data.amount).toFixed(2)} EGC
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="stakingTable_body_row_data_blockies_">
                                    <Blockies
                                      seed={data.address}
                                      size={8}
                                      scale={4}
                                      className="blockies_icon"
                                    />
                                    {`${data.address.slice(
                                      0,
                                      6
                                    )}...${data.address.slice(39, 42)}`}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  <a
                                    href={`https://bscscan.com/tx/${data.transactionHash}`}
                                    target={"_blank"}
                                  >
                                    {`${data.transactionHash.slice(
                                      0,
                                      6
                                    )}...${data.transactionHash.slice(63, 66)}`}
                                  </a>
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
                    pageCount={pageCount4}
                    handlePageClick={handlePageClick4}
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
      {errorModal ? (
        <UpdatedErrorModal
          errorMessage={errorMessage}
          closeModal={CloseErrorModal}
        />
      ) : null}
      {successModal ? (
        <UpdatedSuccessModal
          btnRoute={true}
          successMessage={successMessage}
          route=""
          txnHashDiv={true}
          TxnHash={txHash}
        />
      ) : null}
    </div>
  );
};

// export default DashBoardLendPage;

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default DashboardHome;
