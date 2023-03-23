import React, { useState, useEffect, useRef, useContext } from "react";
// import { createBlockies } from "ethereum-blockies";
import { API_URL } from "../../../../actions/types";
import axios from "axios";
import { Connect } from "react-redux";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import "./UpdatedAppPagesStyles/StakingUpdate.css";
import Blockies from "react-blockies";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Nodata from "../nodataComponent/Nodata";
import { config } from "../../../../actions/Config";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedSuccessModal from "./UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "./UpdatedSuccessErrorModals/UpdatedErrorModal";
import Web3 from "web3";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  annually,
  monthly,
  listProduct,
  lendUS,
  takeDividend,
  takeBackLoan,
  getTotalLended,
  getInvestorsDividend,
  userStats,
  system,
  burnAccumulatedDividend,
  checkAllowance,
  unluckToken,
  lend,
  getUserStats,
  transactReceipt,
  getPrice,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  takeRoyalty,
  draw,
  checkAllowanceL,
  unluckToken2,
  getEgcSmartContractBalnce,
} from "../../../../web3/index";
import { getDate, getMonth } from "date-fns";

export const DurationDiv = ({ addMonthly, addYearly, SelectedDuration }) => {
  return (
    <div className="duration_dropDown_div">
      <div
        className={
          SelectedDuration === "monthly"
            ? "duration_dropDown_div_cont1_selected"
            : "duration_dropDown_div_cont1"
        }
        onClick={addMonthly}
      >
        Monthly (1 month)
      </div>
      {/* <div
        className={
          SelectedDuration === "semi_monthly"
            ? "duration_dropDown_div_cont1_selected"
            : "duration_dropDown_div_cont1"
        }
        onClick={addSemiMonthly}
      >
        Semi-Monthly (6 months)
      </div> */}
      <div
        className={
          SelectedDuration === "yearly"
            ? "duration_dropDown_div_cont1_selected"
            : "duration_dropDown_div_cont1"
        }
        onClick={addYearly}
      >
        Annually (1 year)
      </div>
    </div>
  );
};
const StakingUpdate = () => {
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
  const [durationDrop, setDurationDrop] = useState(false);
  const [Duration, setDuration] = useState(null);
  const [SelectedDuration, setSelectedDuration] = useState("");
  const [estimatedRewardDiv, setEstimatedRewardDiv] = useState(false);
  const [baseBalance, setBaseBalance] = useState(0.0);
  const [coinBalance2, setCoinBalance2] = React.useState(0.0);
  const [base, setBase] = useState("");
  const [asset, setAsset] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lockDate, setLockDate] = useState(null);
  const [activeTab, setActiveTab] = useState("lock");
  const [estimatedRewardAmnt, setEstimatedRewardAmnt] = useState(0);
  const [tokenBal, setTokenBal] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);

  var btc = [
    {
      name: "Jan",
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 225000,
    },
    {
      name: "Jan",

      timestamp: "2022-07-16T09:37:07.000Z",
      value: 81900,
    },
    {
      name: "Jan",

      timestamp: "2022-07-16T15:09:00.000Z",
      value: 15900,
    },
    {
      name: "Jan",

      timestamp: "2022-07-16T15:20:00.000Z",
      value: 15900,
    },
    {
      name: "Jan",

      timestamp: "2022-07-16T15:44:01.000Z",
      value: 31800,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T12:40:00.000Z",
      value: 100000,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T13:56:00.000Z",
      value: 183190,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T14:25:00.000Z",
      value: 545200,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T14:59:01.000Z",
      value: 131900,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T15:39:00.000Z",
      value: 199900,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T16:11:01.000Z",
      value: 181700,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T16:27:01.000Z",
      value: 126700,
    },
    {
      name: "Jan",

      timestamp: "2022-07-18T16:46:00.000Z",
      value: 121600,
    },
  ];
  const toggleDurationDrop = () => {
    setDurationDrop(!durationDrop);
  };
  const addMonthly = () => {
    const currentDate = new Date();
    // get current date
    currentDate.setMonth(currentDate.getMonth() + 1); // add one month
    const month = currentDate.getMonth() + 1; // get the month (0-based index)
    const day = currentDate.getDate(); // get the day of the month
    const year = currentDate.getFullYear().toString().slice(-2); // get the year (last two digits)

    // pad month and day with a leading zero if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    // setLockDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    const dateString = currentDate;
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDateString = date.toLocaleDateString("en-US", options);
    setLockDate(formattedDateString);
    console.log(formattedDate); // Output: Mon Mar 20 2023
    console.log(formattedDateString); // output: e.g. "03/20/23" for current date of Feb 20, 2023
    console.log(currentDate); // output: e.g. "03/20/23" for current date of Feb 20, 2023
    setDuration(formattedDate);
    setDurationDrop(!durationDrop);
    setSelectedDuration("monthly");
  };
  const addSemiMonthly = () => {
    const currentDate = new Date();
    // get current date
    currentDate.setMonth(currentDate.getMonth() + 6); // add one month
    const month = currentDate.getMonth() + 1; // get the month (0-based index)
    const day = currentDate.getDate(); // get the day of the month
    const year = currentDate.getFullYear().toString().slice(-2); // get the year (last two digits)

    // pad month and day with a leading zero if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const dateString = currentDate;
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDateString = date.toLocaleDateString("en-US", options);
    setLockDate(formattedDateString);
    console.log(formattedDate); // output: e.g. "03/20/23" for current date of Feb 20, 2023
    // setLockDate(new Date(currentDate.setMonth(currentDate.getMonth() + 6)));
    setDuration(formattedDate);
    setDurationDrop(!durationDrop);
    setSelectedDuration("semi_monthly");
  };
  const addYearly = () => {
    const currentDate = new Date(); // get current date
    currentDate.setFullYear(currentDate.getFullYear() + 1); // add one year
    const month = currentDate.getMonth() + 1; // get the month (0-based index)
    const day = currentDate.getDate(); // get the day of the month
    const year = currentDate.getFullYear().toString().slice(-2); // get the year (last two digits)

    // pad month and day with a leading zero if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    // setLockDate(
    //   new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
    // );
    const dateString = currentDate;
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDateString = date.toLocaleDateString("en-US", options);
    setLockDate(formattedDateString);
    console.log(formattedDate);
    setDuration(formattedDate);
    setDurationDrop(!durationDrop);
    setSelectedDuration("yearly");
  };
  const AmountChange = (e) => {
    setLockAmount(e.target.value);
    console.log(e.target.value);
    if (e.target.value < 1) {
      setEstimatedRewardDiv(false);
    } else {
      setEstimatedRewardDiv(true);
    }
    setEstimatedRewardAmnt(e.target.value * 0.00033);
  };

  const MyTransactions = [
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
  ];
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
  const StakeMonthly = async () => {
    setIsLoading(true);
    setDisable(true);
    const res = await monthly(
      parseEther(lockAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status == true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage("You've successfully Locked your egc for 1 month");
    } else {
      if (res.message.code == 4001) {
        console.log(res);
      }
      console.log(res);
      setErrorModal(true);
      setErrorMessage(res.message.reason);
      setIsLoading(false);
      setDisable(false);
    }
  };
  const StakeYearly = async () => {
    const res = await annually(
      parseEther(lockAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status == true) {
      setSuccessModal(true);
      setSuccessMessage("You've successfully Locked your egc for 1 year");
    } else {
      if (res.message.code == 4001) {
        console.log(res);
      }
      console.log(res);
      setErrorModal(true);
      setErrorMessage(res.message.reason);
    }
  };
  const TakeReward = async () => {
    const res = await takeRoyalty(library.getSigner());
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
  };
  const toggleLockTabs = (e) => {
    let target = e.currentTarget.id;
    setActiveTab(target);
  };
  useEffect(() => {
    let assetVal = "EGCT";
    let baseVal = "EUSDT";
    setAsset(assetVal);
    setBase(baseVal);
    let ticker = assetVal + "-" + baseVal;
    if (account) {
      getTickerInfo(ticker, library.getSigner()).then((data) => {
        // console.log(data);
        if (data.status) {
          console.log(data.message);
          tokenBalance(data.message.base, account, library.getSigner()).then(
            (balance) => {
              setBaseBalance(formatEther(balance.message));
            }
          );

          if (asset == "BNB" || asset == "bnb") {
            library
              .getBalance(account)
              .then((balance) => {
                setCoinBalance2(formatEther(balance));
              })
              .catch(() => {
                setCoinBalance2(null);
              });
          } else {
            tokenBalance(data.message.asset, account, library.getSigner()).then(
              (balance) => {
                setCoinBalance2(formatEther(balance.message));
              }
            );
          }
        }
      });
    }
  }, [chainId, account, connector, baseBalance, coinBalance2, tokenBal]);
  const CloseSuccessModal = () => {
    setSuccessModal(false);
  };
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
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
          <div className="lock_container">
            <div className="lock_container_cont1">
              <div className="lock_container_cont1_div_contract_overview_div">
                <div className="lock_container_cont1_div_contract_overview_div_head">
                  Contracts
                </div>
                <div className="lock_container_cont1_div_contract_overview_body">
                  <div className="lock_container_cont1_div_contract_overview_body_div1">
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1">
                      EGC
                    </div>
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1_link">
                      {`${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        0,
                        6
                      )}...${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        39,
                        42
                      )}`}
                      <OpenInNewIcon className="tx_hash_link_icon" />
                    </div>
                  </div>
                  <div className="lock_container_cont1_div_contract_overview_body_div1">
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1">
                      EUSD
                    </div>
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1_link">
                      {`${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        0,
                        6
                      )}...${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        39,
                        42
                      )}`}
                      <OpenInNewIcon className="tx_hash_link_icon" />
                    </div>
                  </div>
                  <div className="lock_container_cont1_div_contract_overview_body_div1_last">
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1">
                      ENGN
                    </div>
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1_link">
                      {`${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        0,
                        6
                      )}...${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        39,
                        42
                      )}`}
                      <OpenInNewIcon className="tx_hash_link_icon" />
                    </div>
                  </div>
                </div>
              </div>
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              <div className="lock_container_transactions">
                <div className="lock_container_transactions_head">
                  My Transactions
                </div>
                <div className="lock_container_transactions_body">
                  <table className="stakingTable_table">
                    <thead className="stakingTable_titles">
                      <tr className="stakingTable_title_div">
                        <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                          Action
                        </th>
                        <th className="stakingTable_heading_titles">Amount</th>
                        {/* <th className="stakingTable_heading_titles">Address</th> */}

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
                    {MyTransactions.length <= 0 ? (
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
                        {MyTransactions.map((data) => {
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
                                  <div className="value_dolls_div_val">
                                    $2,406.66
                                  </div>
                                </div>
                              </td>
                              {/* <td className="stakingTable_body_row_data">
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
                              </td> */}
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

              {/* ======= */}
              {/* ======= */}
              {/* ======= */}
              <div className="lock_container_cont1_div_locks_overview">
                <div className="lock_container_cont1_div_locks_overview_cont1">
                  <div className="lock_container_cont1_div_locks_overview_cont1_head">
                    My Locked EGC
                  </div>
                  <div className="lock_container_cont1_div_locks_overview_cont1_body">
                    <span>20.03egc</span>
                    <span style={{ fontSize: "10px" }}>
                      (Max Duration: 6months)
                    </span>
                  </div>
                </div>
                <div className="lock_container_cont1_div_locks_overview_cont1">
                  <div className="lock_container_cont1_div_locks_overview_cont1_head">
                    My Total Rewards
                  </div>
                  <div className="lock_container_cont1_div_locks_overview_cont1_body">
                    200 eusd
                  </div>
                </div>
                <div
                  className="lock_container_cont1_div_locks_overview_cont1"
                  style={{ border: "none", padding: "0", margin: "0" }}
                >
                  <div className="lock_container_cont1_div_locks_overview_cont1_head">
                    Claimed Rewards
                  </div>
                  <div className="lock_container_cont1_div_locks_overview_cont1_body">
                    50 eusd
                  </div>
                </div>
              </div>
              {/* ======= */}
              {/* ======= */}
              {/* ======= */}
              <div className="lock_container_cont1_div1_lock_div">
                <div className="lock_container_cont1_div1_lock_div_tabs">
                  <div
                    id="lock"
                    className={
                      activeTab === "lock"
                        ? "lock_container_cont1_div1_lock_div_tab1_active"
                        : "lock_container_cont1_div1_lock_div_tab1"
                    }
                    onClick={toggleLockTabs}
                  >
                    Lock
                  </div>
                  <div
                    id="claim"
                    className={
                      activeTab === "claim"
                        ? "lock_container_cont1_div1_lock_div_tab1_active"
                        : "lock_container_cont1_div1_lock_div_tab1"
                    }
                    onClick={toggleLockTabs}
                  >
                    Claim
                  </div>
                </div>
                {/* ======= */}
                {/* ======= */}
                {/* ======= */}
                {activeTab === "lock" ? (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_input_body">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_head">
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span1">
                          Amount
                        </span>
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span2">
                          Balance:{parseFloat(baseBalance).toFixed(3)}
                        </span>
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont">
                        <input
                          type="number"
                          value={lockAmount}
                          placeholder="0.00"
                          onChange={AmountChange}
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_input"
                        />
                        <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_amount_div">
                          <button className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_amount_div1_btn">
                            MAX
                          </button>
                          <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_amount_div2">
                            EGC
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lock_container_cont1_div1_lock_div_lock_body_input_body">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_head">
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span1">
                          Duration:{" "}
                          {SelectedDuration === "monthly" ? (
                            <> 1 month</>
                          ) : SelectedDuration === "yearly" ? (
                            <> 1 year</>
                          ) : null}
                        </span>
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span2">
                          Expires: {lockDate}
                        </span>
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont">
                        <input
                          type="text"
                          value={Duration}
                          onClick={toggleDurationDrop}
                          placeholder="MM/DD/YY"
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_input"
                        />
                        <EventOutlinedIcon
                          onClick={toggleDurationDrop}
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_icon"
                        />
                        {durationDrop ? (
                          <DurationDiv
                            addMonthly={addMonthly}
                            // addSemiMonthly={addSemiMonthly}
                            addYearly={addYearly}
                            SelectedDuration={SelectedDuration}
                          />
                        ) : null}
                      </div>
                    </div>
                    {estimatedRewardDiv ? (
                      <div className="estRewardDiv">
                        Estimated Daily Reward:{" "}
                        <span className="estRewardDiv_span">
                          {estimatedRewardAmnt} eUSD
                        </span>
                      </div>
                    ) : null}
                    {SelectedDuration === "monthly" && lockAmount != "" ? (
                      <button
                        // disabled={true}
                        disabled={Disable}
                        onClick={StakeMonthly}
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      >
                        {isLoading ? (
                          <ScaleLoader color="#24382b" size={10} height={20} />
                        ) : (
                          <>Create Lock</>
                        )}
                      </button>
                    ) : SelectedDuration === "yearly" && lockAmount != "" ? (
                      <button
                        onClick={StakeYearly}
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      >
                        Create Lock
                      </button>
                    ) : lockAmount === "" ? (
                      <button
                        disabled
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      >
                        Enter an amount
                      </button>
                    ) : (
                      <button
                        disabled
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      >
                        Choose Duration
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_head">
                        Available Reward
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount">
                        159.00 eUsd
                        <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_dollar_equiv">
                          ($159.00)
                        </div>
                      </div>
                    </div>
                    <button
                      className="lock_container_cont1_div1_lock_div_lock_body_claim_Div_button"
                      onClick={TakeReward}
                    >
                      Claim Reward
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* =========*******=========== */}
            {/* =========******=========== */}
            {/* =========******=========== */}
            {/* ========******============ */}
            {/* ========******============ */}
            {/* ========******============ */}
            {/* =======******============= */}
            {/* ========******============ */}
            {/* ========******============ */}
            {/* =======******============= */}
            <div className="lock_container_cont2">
              <div className="lending_area1">
                <div className="lending_area1_cont1">
                  <div className="lending_area1_cont1_body_1">
                    <div className="lending_area1_cont1_heading">
                      Total EGC Locked
                    </div>
                    <div className="lending_area1_cont1_body_txt">20,000</div>
                    <div className="lending_area1_cont1_heading">
                      (32.84% Of EGC Supply)
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
                      Total Claimed Rewards
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      6000 <span className="usd_sign">eUSD</span>
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
                  <div className="lending_area1_cont1_body_1">
                    <div className="lending_area1_cont1_heading">
                      Staking APY
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      12<span className="usd_sign">%</span>
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
              </div>

              <div className="lock_container_cont2_div2_chart_div">
                <div className="lock_container_cont2_div2_chart_div_text_area">
                  Total Locked EGC
                </div>
                <div className="lock_container_cont2_div2_chart_div_text_body">
                  <div
                    className="assets_chart_area1"
                    style={{ width: "100%", height: 320 }}
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
                        <CartesianGrid strokeDasharray="1 1" stroke="#d7d7d7" />
                        <XAxis dataKey="name" stroke="#000" />
                        <YAxis stroke="#000" />
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
                    style={{ width: "100%", height: 320 }}
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
                        <CartesianGrid strokeDasharray="1 1" stroke="#283b2f" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
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
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              <div className="lock_container_transactions">
                <div className="lock_container_transactions_head">
                  All Transactions
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
                                  <div className="value_dolls_div_val">
                                    $2,406.66
                                  </div>
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
          route="/app/staking/egc"
        />
      ) : null}
    </div>
  );
};

export default StakingUpdate;
