import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../../css/dashboardLend.css";
import { loadUser } from "../../../actions/auth";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL as api_url } from "../../../actions/types";
import { config } from "../../../actions/Config";
import { Authenticate } from "../../auth/Authenticate";
// import { numberWithCommas } from "../../static/static";
import Blockies from "react-blockies";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "../../../css/dashboardHome.css";
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
const DashboardHome = () => {
  const context = useWeb3React();
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);

  var array = [
    {
      month: "Jan",
      timestamp: "6:40 AM",
      value: 188,
    },
    {
      month: "Oct",
      timestamp: "10:26 PM",
      value: 262,
    },
    {
      month: "May",
      timestamp: "9:29 PM",
      value: 609,
    },
    {
      month: "Nov",
      timestamp: "9:21 AM",
      value: 712,
    },
    {
      month: "Aug",
      timestamp: "1:24 AM",
      value: 866,
    },
    {
      month: "Jan",
      timestamp: "2:45 PM",
      value: 887,
    },
    {
      month: "Dec",
      timestamp: "7:29 PM",
      value: 1055,
    },
    {
      month: "Feb",
      timestamp: "4:20 PM",
      value: 1070,
    },
    {
      month: "Jul",
      timestamp: "1:23 AM",
      value: 1348,
    },
    {
      month: "Jul",
      timestamp: "12:23 AM",
      value: 1386,
    },
    {
      month: "Oct",
      timestamp: "7:29 AM",
      value: 1391,
    },
    {
      month: "Sep",
      timestamp: "1:36 AM",
      value: 1635,
    },
    {
      month: "Jul",
      timestamp: "4:05 AM",
      value: 1671,
    },
    {
      month: "Sep",
      timestamp: "11:59 PM",
      value: 1749,
    },
    {
      month: "Jan",
      timestamp: "7:53 PM",
      value: 1901,
    },
    {
      month: "Sep",
      timestamp: "8:46 PM",
      value: 2047,
    },
    {
      month: "Apr",
      timestamp: "6:30 PM",
      value: 2051,
    },
    {
      month: "May",
      timestamp: "3:18 PM",
      value: 2200,
    },
    {
      month: "Sep",
      timestamp: "1:36 AM",
      value: 1635,
    },
    {
      month: "Jul",
      timestamp: "4:05 AM",
      value: 1671,
    },
    {
      month: "Sep",
      timestamp: "11:59 PM",
      value: 1749,
    },
    {
      month: "Jan",
      timestamp: "7:53 PM",
      value: 1901,
    },
    {
      month: "Sep",
      timestamp: "8:46 PM",
      value: 2047,
    },
    {
      month: "Apr",
      timestamp: "6:30 PM",
      value: 2051,
    },
    {
      month: "May",
      timestamp: "3:18 PM",
      value: 2200,
    },
    {
      month: "Aug",
      timestamp: "3:18 AM",
      value: 2220,
    },
    {
      month: "Sep",
      timestamp: "11:56 AM",
      value: 2247,
    },
    {
      month: "Jan",
      timestamp: "7:31 PM",
      value: 2288,
    },
    {
      month: "Feb",
      timestamp: "1:17 PM",
      value: 2598,
    },
    {
      month: "Jan",
      timestamp: "10:19 PM",
      value: 2656,
    },
    {
      month: "Nov",
      timestamp: "2:42 PM",
      value: 2821,
    },
    {
      month: "Feb",
      timestamp: "1:15 AM",
      value: 2898,
    },
    {
      month: "Sep",
      timestamp: "6:19 PM",
      value: 2910,
    },
    {
      month: "Aug",
      timestamp: "12:19 AM",
      value: 2942,
    },
    {
      month: "Jan",
      timestamp: "5:24 AM",
      value: 2951,
    },
    {
      month: "May",
      timestamp: "10:53 PM",
      value: 3059,
    },
    {
      month: "Mar",
      timestamp: "4:53 PM",
      value: 3174,
    },
    {
      month: "Apr",
      timestamp: "9:56 PM",
      value: 3253,
    },
    {
      month: "Sep",
      timestamp: "4:28 AM",
      value: 3359,
    },
    {
      month: "Nov",
      timestamp: "6:08 AM",
      value: 3596,
    },
    {
      month: "Jan",
      timestamp: "2:15 AM",
      value: 3848,
    },
    {
      month: "Apr",
      timestamp: "11:51 PM",
      value: 4088,
    },
    {
      month: "Sep",
      timestamp: "11:43 PM",
      value: 4176,
    },
    {
      month: "Feb",
      timestamp: "5:57 AM",
      value: 4328,
    },
    {
      month: "Jan",
      timestamp: "12:03 AM",
      value: 4375,
    },
    {
      month: "Mar",
      timestamp: "5:23 AM",
      value: 4443,
    },
    {
      month: "Feb",
      timestamp: "6:12 AM",
      value: 4616,
    },
    {
      month: "Jul",
      timestamp: "3:40 PM",
      value: 4719,
    },
    {
      month: "Feb",
      timestamp: "9:28 PM",
      value: 4742,
    },
    {
      month: "Feb",
      timestamp: "3:58 PM",
      value: 4972,
    },
    {
      month: "May",
      timestamp: "2:30 PM",
      value: 4974,
    },
    {
      month: "May",
      timestamp: "3:04 AM",
      value: 5019,
    },
    {
      month: "Jul",
      timestamp: "9:10 PM",
      value: 5253,
    },
    {
      month: "Sep",
      timestamp: "3:06 AM",
      value: 5331,
    },
    {
      month: "May",
      timestamp: "7:25 PM",
      value: 5420,
    },
    {
      month: "Jan",
      timestamp: "8:19 PM",
      value: 5441,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Oct",
      timestamp: "1:49 AM",
      value: 5640,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },
    {
      month: "Mar",
      timestamp: "2:10 AM",
      value: 5807,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "May",
      timestamp: "8:05 AM",
      value: 6006,
    },
    {
      month: "Apr",
      timestamp: "4:48 PM",
      value: 6150,
    },
    {
      month: "Aug",
      timestamp: "1:41 PM",
      value: 6218,
    },
    {
      month: "Aug",
      timestamp: "6:23 PM",
      value: 6655,
    },

    {
      month: "Jul",
      timestamp: "9:10 PM",
      value: 5253,
    },
    {
      month: "Sep",
      timestamp: "3:06 AM",
      value: 5331,
    },
    {
      month: "May",
      timestamp: "7:25 PM",
      value: 5420,
    },
    {
      month: "Jan",
      timestamp: "8:19 PM",
      value: 5441,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Oct",
      timestamp: "1:49 AM",
      value: 5640,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },
    {
      month: "Mar",
      timestamp: "2:10 AM",
      value: 5807,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },
    {
      month: "Mar",
      timestamp: "2:10 AM",
      value: 5807,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "May",
      timestamp: "8:05 AM",
      value: 6006,
    },
    {
      month: "Apr",
      timestamp: "4:48 PM",
      value: 6150,
    },
    {
      month: "Aug",
      timestamp: "1:41 PM",
      value: 6218,
    },
    {
      month: "May",
      timestamp: "12:24 AM",
      value: 6799,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },

    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Sep",
      timestamp: "3:06 AM",
      value: 5331,
    },
    {
      month: "May",
      timestamp: "7:25 PM",
      value: 5420,
    },
    {
      month: "Jan",
      timestamp: "8:19 PM",
      value: 5441,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Mar",
      timestamp: "5:23 AM",
      value: 4443,
    },
    {
      month: "Feb",
      timestamp: "6:12 AM",
      value: 4616,
    },
    {
      month: "Jul",
      timestamp: "3:40 PM",
      value: 4719,
    },
    {
      month: "Feb",
      timestamp: "9:28 PM",
      value: 4742,
    },
    {
      month: "Feb",
      timestamp: "6:12 AM",
      value: 4616,
    },
    {
      month: "Mar",
      timestamp: "5:23 AM",
      value: 4443,
    },
    {
      month: "Jan",
      timestamp: "12:03 AM",
      value: 4375,
    },
    {
      month: "Feb",
      timestamp: "5:57 AM",
      value: 4328,
    },
    {
      month: "Sep",
      timestamp: "11:43 PM",
      value: 4176,
    },
  ];
  const lastIndex = array.length - 1;
  const LastArray = array[lastIndex];
  const [ChartValue, setChartValue] = useState(LastArray.value);
  const [ChartTime, setChartTime] = useState(LastArray.timestamp);
  const [ChartValue2, setChartValue2] = useState(LastArray.value);
  const [ChartTime2, setChartTime2] = useState(LastArray.timestamp);

  function formatNumber(number) {
    const abbreviations = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
    };

    const num = parseFloat(number);

    for (const abbreviation in abbreviations) {
      if (
        num >= abbreviations[abbreviation] &&
        num < abbreviations[abbreviation] * 1000
      ) {
        return `${(num / abbreviations[abbreviation]).toFixed(
          1
        )}${abbreviation}`;
      }
    }

    return num.toLocaleString();
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      setChartValue(payload[0].value);
      setChartTime(payload[0].payload.timestamp);
    } else {
      setChartValue(LastArray.value);
      setChartTime(LastArray.timestamp);
    }
    return null;
  };
  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      setChartValue2(payload[0].value);
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
                          data={array}
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
                          data={array}
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
                          data={array}
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
                          data={array}
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
                          data={array}
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
                          data={array}
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
                      style={{ width: "100%", height: 220 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={130}
                          height={10}
                          data={array}
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
                          data={array}
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
                  <div className="lending_area1_cont1_heading">
                    Total Amount Funded(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(parseInt(lockedValue).toFixed(2))}{" "}
                    <span className="usd_sign">NGN</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total Engn funded to all assets in the lending
                    pool.
                  </div>
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Amount Funded(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(parseInt(lockedValue / 570).toFixed(2))}{" "}
                    <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total Engn funded to all assets in the lending
                    pool.
                  </div>
                </div>
              </div>

              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Funding Capacity
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(
                      parseInt(totalLendingCapacity).toFixed(2)
                    )}{" "}
                    <span className="usd_sign">NGN</span>
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
                      13.0%
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
                    Total Pool Assets:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      {totalLendingCount}
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
