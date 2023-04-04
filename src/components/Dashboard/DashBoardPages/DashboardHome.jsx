import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../../css/dashboardLend.css";
import { loadUser } from "../../../actions/auth";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../../actions/types";
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
  const [ChartValue, setChartValue] = useState(0);
  const [ChartTime, setChartTime] = useState(0);
  const [ChartValue2, setChartValue2] = useState(0);
  const [ChartTime2, setChartTime2] = useState(0);
  const [LastArray, setLastArray] = useState(0);
  const [lastIndex, setlastIndex] = useState(0);
  const [totalTVL, setTotalTVL] = useState(0);
  const [homeData, setHomeData] = useState({
    tvl: "0",
    volume: "0",
    users: 0,
  });
  useEffect(async () => {
    console.log("dddd");
    await axios
      .get(API_URL + "/staking/chart", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        const temp = data.data.data;
        for (const data of temp) {
          data.value = Number(parseInt(data.value).toFixed(2));
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
      setChartValue2(LastArray.value);
      setChartTime2(LastArray.timestamp);
    }
    return null;
  };
  const Transactions = [
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed358f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85re0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ee348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50edg48f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed248f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348785de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed343f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f95de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f852e0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Create Lock",
      date: "2/19/2023",
      amount: "6,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      action: "Claim Reward",
      date: "2/19/2023",
      amount: "1,257.54",
      address: "0x50ed348f85de0772a61ff63bbe33df8db30de1b2",
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
  ];
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
  useEffect(
    async (e) => {
      // if (account) {
      let res = await tokenBalance(
        "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
        "0x3A81836b093f7f3D3ca271125CcD45c461409697",
        library.getSigner()
      );
      console.log(res);
      console.log(formatEther(res.message));
      let tvl = formatEther(res.message);
      setTotalTVL(tvl * egcUsd);
      // }
    },
    [egcUsd]
  );
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
                    ${formatNumber(ChartValue * egcUsd)}
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
                            stroke="#229e54"
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
                            stroke="#229e54"
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
                              id="colorUvBar1"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#60c589"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#60c589"
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
                            // stroke="#60c589"
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
                              id="colorUvBar2"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#60c589"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#60c589"
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
                    ${formatNumber(ChartValue * egcUsd)}
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
                            stroke="#229e54"
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
                            stroke="#229e54"
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
                  <div className="analytics_container_1_head">Volume 24Hs</div>
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
                              id="colorUvBar1"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#60c589"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#60c589"
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
                            // stroke="#60c589"
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
                              id="colorUvBar2"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#60c589"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="100%"
                                stopColor="#60c589"
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
                    {formatNumber(totalTVL)}
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
                    {formatNumber(homeData.volume)}
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
              <div className="lock_container_transactions_head">
                Latest Transactions
              </div>
              <div className="lock_container_transactions_body_all">
                <table className="stakingTable_table">
                  <thead className="stakingTable_titles">
                    <tr className="stakingTable_title_div">
                      <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                        Action
                      </th>
                      <th className="stakingTable_heading_titles">Amount</th>
                      <th className="stakingTable_heading_titles">Address</th>

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
                  {Transactions.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No funded pools yet.
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
                      {Transactions.map((data) => {
                        return (
                          <tr className="stakingTable_body_row ">
                            <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                              <div className="value_dolls_div">
                                {data.action}
                                <div className="value_dolls_div_val">
                                  {data.date}
                                </div>
                              </div>
                            </td>
                            <td className="stakingTable_body_row_data">
                              <div className="value_dolls_div2">
                                {data.action === "Create Lock" ? (
                                  <>+ {data.amount} EGC</>
                                ) : (
                                  <>- {data.amount} eUSD</>
                                )}
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
                              {`${data.txnHash.slice(
                                0,
                                6
                              )}...${data.txnHash.slice(63, 66)}`}
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
