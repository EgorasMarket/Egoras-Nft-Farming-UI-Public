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
const DashboardHome = ({ submitKyc, auth }) => {
  const context = useWeb3React();
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);

  //   var btc = [
  //     { month: "Jun", timestamp: "12:25 AM", value: 38513 },
  //     { month: "Jul", timestamp: "11:28 AM", value: 22755 },
  //     { month: "May", timestamp: "3:53 PM", value: 22937 },
  //     { month: "Sep", timestamp: "10:34 PM", value: 46537 },
  //     { month: "Jul", timestamp: "5:28 PM", value: 12622 },
  //     { month: "Jun", timestamp: "12:54 PM", value: 5521 },
  //     { month: "Nov", timestamp: "4:04 PM", value: 48992 },
  //     { month: "Mar", timestamp: "10:14 AM", value: 11603 },
  //     { month: "Mar", timestamp: "8:08 AM", value: 21908 },
  //     { month: "Jun", timestamp: "3:19 PM", value: 21506 },
  //     { month: "Jan", timestamp: "10:19 PM", value: 2656 },
  //     { month: "Jan", timestamp: "5:56 AM", value: 31442 },
  //     { month: "Sep", timestamp: "8:12 PM", value: 32311 },
  //     { month: "Sep", timestamp: "2:38 AM", value: 24530 },
  //     { month: "Mar", timestamp: "6:44 AM", value: 20023 },
  //     { month: "May", timestamp: "9:06 AM", value: 48836 },
  //     { month: "Oct", timestamp: "7:19 PM", value: 39650 },
  //     { month: "Dec", timestamp: "6:00 AM", value: 14743 },
  //     { month: "Nov", timestamp: "9:14 PM", value: 14196 },
  //     { month: "Feb", timestamp: "1:57 PM", value: 34377 },
  //     { month: "Jan", timestamp: "2:28 PM", value: 15907 },
  //     { month: "Jun", timestamp: "5:55 PM", value: 49083 },
  //     { month: "Oct", timestamp: "8:13 PM", value: 35751 },
  //     { month: "Jan", timestamp: "6:10 AM", value: 42793 },
  //     { month: "Nov", timestamp: "7:10 PM", value: 32260 },
  //     { month: "Jan", timestamp: "10:44 PM", value: 49703 },
  //     { month: "Dec", timestamp: "5:48 PM", value: 39832 },
  //     { month: "May", timestamp: "10:46 AM", value: 18667 },
  //     { month: "May", timestamp: "12:00 AM", value: 32795 },
  //     { month: "Apr", timestamp: "11:40 AM", value: 31074 },
  //     { month: "Dec", timestamp: "2:45 AM", value: 29540 },
  //     { month: "Apr", timestamp: "8:33 AM", value: 10545 },
  //     { month: "Sep", timestamp: "5:04 PM", value: 7645 },
  //     { month: "Nov", timestamp: "6:56 AM", value: 37972 },
  //     { month: "Nov", timestamp: "12:27 AM", value: 38268 },
  //     { month: "Nov", timestamp: "8:56 AM", value: 12097 },
  //     { month: "Jan", timestamp: "7:28 AM", value: 40276 },
  //     { month: "Apr", timestamp: "5:45 PM", value: 40713 },
  //     { month: "Sep", timestamp: "8:29 PM", value: 28293 },
  //     { month: "Jan", timestamp: "6:40 AM", value: 188 },
  //     { month: "May", timestamp: "12:43 AM", value: 38254 },
  //     { month: "Jun", timestamp: "5:35 AM", value: 15308 },
  //     { month: "Jan", timestamp: "7:20 PM", value: 35684 },
  //     { month: "Oct", timestamp: "5:16 PM", value: 5678 },
  //     { month: "Dec", timestamp: "8:33 PM", value: 32134 },
  //     { month: "Jul", timestamp: "12:12 AM", value: 40440 },
  //     { month: "Aug", timestamp: "2:08 AM", value: 49359 },
  //     { month: "Aug", timestamp: "9:57 AM", value: 31830 },
  //     { month: "May", timestamp: "7:52 PM", value: 38631 },
  //     { month: "Feb", timestamp: "9:49 PM", value: 48670 },
  //     { month: "Feb", timestamp: "4:01 PM", value: 35676 },
  //     { month: "May", timestamp: "9:37 AM", value: 17775 },
  //     { month: "Oct", timestamp: "12:20 AM", value: 32069 },
  //     { month: "Aug", timestamp: "4:31 AM", value: 20288 },
  //     { month: "Sep", timestamp: "12:37 AM", value: 47636 },
  //     { month: "Jan", timestamp: "10:27 PM", value: 32686 },
  //     { month: "Mar", timestamp: "8:52 AM", value: 47471 },
  //     { month: "Dec", timestamp: "2:58 AM", value: 21147 },
  //     { month: "Jul", timestamp: "5:00 AM", value: 35596 },
  //     { month: "Apr", timestamp: "6:29 PM", value: 46560 },
  //     { month: "Jan", timestamp: "10:41 AM", value: 34893 },
  //     { month: "Mar", timestamp: "5:26 PM", value: 42285 },
  //     { month: "Mar", timestamp: "2:10 AM", value: 5807 },
  //     { month: "Mar", timestamp: "5:23 AM", value: 4443 },
  //     { month: "May", timestamp: "11:58 AM", value: 45664 },
  //     { month: "Sep", timestamp: "6:50 PM", value: 40092 },
  //     { month: "Jul", timestamp: "12:23 AM", value: 1386 },
  //     { month: "Sep", timestamp: "5:04 AM", value: 45211 },
  //     { month: "Nov", timestamp: "6:46 AM", value: 28421 },
  //     { month: "Jun", timestamp: "2:51 PM", value: 49885 },
  //     { month: "Feb", timestamp: "6:40 AM", value: 34662 },
  //     { month: "Jan", timestamp: "7:31 PM", value: 2288 },
  //     { month: "Aug", timestamp: "1:28 AM", value: 12347 },
  //     { month: "Mar", timestamp: "2:44 PM", value: 31363 },
  //     { month: "Dec", timestamp: "7:34 PM", value: 42774 },
  //     { month: "Feb", timestamp: "12:58 PM", value: 28207 },
  //     { month: "Feb", timestamp: "4:25 PM", value: 16880 },
  //     { month: "Jun", timestamp: "6:12 AM", value: 9195 },
  //     { month: "Nov", timestamp: "4:44 PM", value: 18404 },
  //     { month: "Aug", timestamp: "2:16 PM", value: 47180 },
  //     { month: "Nov", timestamp: "6:38 AM", value: 25553 },
  //     { month: "Oct", timestamp: "12:30 AM", value: 28548 },
  //     { month: "Jul", timestamp: "6:19 AM", value: 47369 },
  //     { month: "Mar", timestamp: "1:56 AM", value: 33544 },
  //     { month: "Nov", timestamp: "7:35 AM", value: 18332 },
  //     { month: "Jun", timestamp: "10:58 AM", value: 21262 },
  //     { month: "Jul", timestamp: "6:07 PM", value: 49367 },
  //     { month: "Jul", timestamp: "12:48 AM", value: 45375 },
  //     { month: "May", timestamp: "4:51 AM", value: 32940 },
  //     { month: "Sep", timestamp: "6:40 AM", value: 25036 },
  //     { month: "Mar", timestamp: "8:21 AM", value: 48913 },
  //     { month: "Jun", timestamp: "9:51 PM", value: 49353 },
  //     { month: "Sep", timestamp: "10:48 AM", value: 34686 },
  //     { month: "Feb", timestamp: "8:26 AM", value: 17322 },
  //     { month: "Apr", timestamp: "9:10 PM", value: 29161 },
  //     { month: "Aug", timestamp: "12:06 PM", value: 30215 },
  //     { month: "Sep", timestamp: "8:46 PM", value: 2047 },
  //     { month: "Apr", timestamp: "12:25 PM", value: 46770 },
  //     { month: "Jan", timestamp: "5:21 PM", value: 7717 },
  //     { month: "Aug", timestamp: "1:41 PM", value: 6218 },
  //     { month: "Apr", timestamp: "6:04 PM", value: 40446 },
  //     { month: "Mar", timestamp: "8:54 AM", value: 26818 },
  //     { month: "Sep", timestamp: "4:50 PM", value: 43558 },
  //     { month: "Aug", timestamp: "5:02 AM", value: 46312 },
  //     { month: "Dec", timestamp: "9:11 PM", value: 27154 },
  //     { month: "Apr", timestamp: "11:51 PM", value: 4088 },
  //     { month: "Oct", timestamp: "8:57 AM", value: 23352 },
  //     { month: "Jun", timestamp: "8:35 AM", value: 27319 },
  //     { month: "Sep", timestamp: "3:06 AM", value: 5331 },
  //     { month: "Apr", timestamp: "2:22 AM", value: 16836 },
  //     { month: "Mar", timestamp: "6:46 AM", value: 8683 },
  //     { month: "Jan", timestamp: "6:19 AM", value: 21165 },
  //     { month: "Jan", timestamp: "5:51 PM", value: 46331 },
  //     { month: "Jul", timestamp: "9:08 PM", value: 48391 },
  //     { month: "Aug", timestamp: "10:50 AM", value: 16650 },
  //     { month: "Oct", timestamp: "8:12 AM", value: 28504 },
  //     { month: "Dec", timestamp: "3:00 PM", value: 43369 },
  //     { month: "Apr", timestamp: "9:24 PM", value: 31654 },
  //     { month: "Dec", timestamp: "2:26 PM", value: 37435 },
  //     { month: "Sep", timestamp: "1:33 PM", value: 25152 },
  //     { month: "Feb", timestamp: "9:08 AM", value: 40862 },
  //     { month: "Aug", timestamp: "2:06 AM", value: 29219 },
  //     { month: "Dec", timestamp: "5:41 AM", value: 26587 },
  //     { month: "Jul", timestamp: "4:41 AM", value: 12183 },
  //     { month: "Feb", timestamp: "7:41 PM", value: 33672 },
  //     { month: "Feb", timestamp: "8:08 PM", value: 44066 },
  //     { month: "Sep", timestamp: "12:37 PM", value: 22297 },
  //     { month: "Jun", timestamp: "11:40 AM", value: 12503 },
  //     { month: "May", timestamp: "1:03 PM", value: 22368 },
  //     { month: "Mar", timestamp: "6:34 AM", value: 23773 },
  //     { month: "Dec", timestamp: "7:29 PM", value: 1055 },
  //     { month: "Dec", timestamp: "9:47 PM", value: 47843 },
  //     { month: "Jan", timestamp: "3:06 PM", value: 43448 },
  //     { month: "Apr", timestamp: "8:26 AM", value: 29910 },
  //     { month: "Feb", timestamp: "1:15 AM", value: 2898 },
  //     { month: "Sep", timestamp: "1:36 AM", value: 1635 },
  //     { month: "Nov", timestamp: "9:57 AM", value: 11569 },
  //     { month: "Feb", timestamp: "5:42 PM", value: 7246 },
  //     { month: "Dec", timestamp: "6:43 PM", value: 21787 },
  //     { month: "Oct", timestamp: "6:23 PM", value: 37952 },
  //     { month: "Dec", timestamp: "7:55 AM", value: 23488 },
  //     { month: "Dec", timestamp: "9:42 PM", value: 19058 },
  //     { month: "Apr", timestamp: "12:06 AM", value: 33806 },
  //     { month: "Jul", timestamp: "12:06 PM", value: 21246 },
  //     { month: "Feb", timestamp: "6:12 AM", value: 4616 },
  //     { month: "Apr", timestamp: "7:36 PM", value: 26911 },
  //     { month: "Jul", timestamp: "1:38 PM", value: 11373 },
  //     { month: "Apr", timestamp: "2:57 PM", value: 18000 },
  //     { month: "May", timestamp: "7:16 AM", value: 24933 },
  //     { month: "Jun", timestamp: "2:16 AM", value: 42677 },
  //     { month: "Jul", timestamp: "12:21 PM", value: 45373 },
  //     { month: "Nov", timestamp: "7:44 PM", value: 6839 },
  //     { month: "Jul", timestamp: "1:35 AM", value: 38848 },
  //     { month: "Aug", timestamp: "11:57 AM", value: 23180 },
  //     { month: "Dec", timestamp: "7:58 AM", value: 29343 },
  //     { month: "Apr", timestamp: "2:54 AM", value: 48974 },
  //     { month: "Sep", timestamp: "2:19 PM", value: 13316 },
  //     { month: "Jan", timestamp: "7:48 AM", value: 44598 },
  //     { month: "Dec", timestamp: "11:28 PM", value: 11870 },
  //     { month: "Sep", timestamp: "6:40 PM", value: 40266 },
  //     { month: "Feb", timestamp: "6:31 PM", value: 25740 },
  //     { month: "Jan", timestamp: "7:54 AM", value: 35619 },
  //     { month: "Apr", timestamp: "11:38 PM", value: 36382 },
  //     { month: "Dec", timestamp: "1:02 AM", value: 32211 },
  //     { month: "Sep", timestamp: "11:59 PM", value: 1749 },
  //     { month: "Oct", timestamp: "5:48 AM", value: 25257 },
  //     { month: "Mar", timestamp: "3:30 AM", value: 40378 },
  //     { month: "Nov", timestamp: "2:28 AM", value: 20175 },
  //     { month: "May", timestamp: "3:18 PM", value: 2200 },
  //     { month: "Apr", timestamp: "2:21 AM", value: 10934 },
  //     { month: "Oct", timestamp: "2:41 AM", value: 47037 },
  //     { month: "Feb", timestamp: "3:07 AM", value: 39558 },
  //     { month: "Mar", timestamp: "11:52 AM", value: 41799 },
  //     { month: "Nov", timestamp: "2:21 PM", value: 17040 },
  //     { month: "Feb", timestamp: "10:38 AM", value: 8610 },
  //     { month: "Oct", timestamp: "2:15 PM", value: 25169 },
  //     { month: "Feb", timestamp: "11:18 PM", value: 19200 },
  //     { month: "May", timestamp: "11:56 PM", value: 6805 },
  //     { month: "Aug", timestamp: "5:07 PM", value: 29663 },
  //     { month: "Nov", timestamp: "10:36 AM", value: 45235 },
  //     { month: "Feb", timestamp: "2:09 PM", value: 41268 },
  //     { month: "May", timestamp: "8:45 PM", value: 29164 },
  //     { month: "Aug", timestamp: "5:45 AM", value: 10053 },
  //     { month: "Jun", timestamp: "2:15 PM", value: 29727 },
  //     { month: "Jul", timestamp: "6:13 PM", value: 16286 },
  //     { month: "Nov", timestamp: "3:48 AM", value: 47242 },
  //     { month: "Jun", timestamp: "2:15 PM", value: 18960 },
  //     { month: "Mar", timestamp: "1:18 AM", value: 20394 },
  //     { month: "Mar", timestamp: "9:54 AM", value: 8176 },
  //     { month: "Mar", timestamp: "9:27 PM", value: 18574 },
  //     { month: "Aug", timestamp: "4:18 AM", value: 43268 },
  //     { month: "Aug", timestamp: "9:05 PM", value: 25087 },
  //     { month: "Nov", timestamp: "6:11 AM", value: 13176 },
  //     { month: "May", timestamp: "3:40 AM", value: 25904 },
  //     { month: "Nov", timestamp: "6:08 AM", value: 3596 },
  //     { month: "Dec", timestamp: "11:05 PM", value: 18931 },
  //     { month: "Mar", timestamp: "4:25 PM", value: 12886 },
  //     { month: "Jul", timestamp: "2:46 AM", value: 28172 },
  //     { month: "Jul", timestamp: "6:59 PM", value: 13216 },
  //     { month: "Apr", timestamp: "12:07 PM", value: 21933 },
  //     { month: "May", timestamp: "11:15 AM", value: 48835 },
  //     { month: "Nov", timestamp: "4:40 AM", value: 25927 },
  //     { month: "Nov", timestamp: "7:01 AM", value: 48668 },
  //     { month: "May", timestamp: "8:39 PM", value: 15613 },
  //     { month: "May", timestamp: "9:44 AM", value: 34198 },
  //     { month: "May", timestamp: "3:08 PM", value: 33972 },
  //     { month: "Mar", timestamp: "5:12 PM", value: 40046 },
  //     { month: "Jan", timestamp: "8:55 PM", value: 9513 },
  //     { month: "May", timestamp: "12:30 PM", value: 41851 },
  //     { month: "Mar", timestamp: "7:33 AM", value: 18210 },
  //     { month: "Sep", timestamp: "3:35 PM", value: 8545 },
  //     { month: "Feb", timestamp: "6:18 PM", value: 32443 },
  //     { month: "May", timestamp: "4:17 PM", value: 37469 },
  //     { month: "Aug", timestamp: "10:54 AM", value: 8852 },
  //     { month: "Jan", timestamp: "12:03 AM", value: 4375 },
  //     { month: "Jan", timestamp: "2:47 AM", value: 43005 },
  //     { month: "Apr", timestamp: "7:47 AM", value: 39016 },
  //     { month: "Apr", timestamp: "4:48 PM", value: 6150 },
  //     { month: "Aug", timestamp: "9:52 PM", value: 23070 },
  //     { month: "Aug", timestamp: "1:24 AM", value: 866 },
  //     { month: "Jul", timestamp: "5:37 AM", value: 35148 },
  //     { month: "May", timestamp: "9:56 AM", value: 16194 },
  //     { month: "Jan", timestamp: "3:15 AM", value: 24881 },
  //     { month: "Sep", timestamp: "1:08 AM", value: 7365 },
  //     { month: "Oct", timestamp: "6:23 PM", value: 28772 },
  //     { month: "Jun", timestamp: "8:19 AM", value: 44793 },
  //     { month: "Aug", timestamp: "11:03 PM", value: 38314 },
  //     { month: "Oct", timestamp: "7:47 PM", value: 37829 },
  //     { month: "May", timestamp: "11:26 AM", value: 8441 },
  //     { month: "Mar", timestamp: "3:35 AM", value: 14023 },
  //     { month: "Aug", timestamp: "12:29 PM", value: 49048 },
  //     { month: "Mar", timestamp: "11:38 PM", value: 37543 },
  //     { month: "Oct", timestamp: "10:26 PM", value: 262 },
  //     { month: "Sep", timestamp: "9:33 PM", value: 8308 },
  //     { month: "May", timestamp: "2:37 AM", value: 19688 },
  //     { month: "Mar", timestamp: "12:04 AM", value: 8929 },
  //     { month: "Apr", timestamp: "12:10 AM", value: 35570 },
  //     { month: "Jul", timestamp: "12:41 AM", value: 38877 },
  //     { month: "Oct", timestamp: "6:22 AM", value: 16013 },
  //     { month: "May", timestamp: "7:01 AM", value: 37263 },
  //     { month: "Oct", timestamp: "6:15 PM", value: 24988 },
  //     { month: "Apr", timestamp: "7:09 AM", value: 10963 },
  //     { month: "Jan", timestamp: "9:58 PM", value: 35071 },
  //     { month: "May", timestamp: "9:29 PM", value: 609 },
  //     { month: "Aug", timestamp: "3:22 AM", value: 25025 },
  //     { month: "Sep", timestamp: "4:28 AM", value: 3359 },
  //     { month: "Dec", timestamp: "2:45 PM", value: 40970 },
  //     { month: "Feb", timestamp: "6:13 AM", value: 21151 },
  //     { month: "Feb", timestamp: "1:50 AM", value: 31818 },
  //     { month: "Feb", timestamp: "8:06 PM", value: 36481 },
  //     { month: "Nov", timestamp: "4:19 AM", value: 29978 },
  //     { month: "Feb", timestamp: "10:40 AM", value: 25080 },
  //     { month: "Oct", timestamp: "9:06 PM", value: 43213 },
  //     { month: "Aug", timestamp: "9:09 PM", value: 25408 },
  //     { month: "Apr", timestamp: "11:29 AM", value: 31592 },
  //     { month: "May", timestamp: "10:53 PM", value: 3059 },
  //     { month: "Jan", timestamp: "6:14 PM", value: 29056 },
  //     { month: "Mar", timestamp: "5:24 AM", value: 16398 },
  //     { month: "May", timestamp: "1:04 PM", value: 17011 },
  //     { month: "Aug", timestamp: "5:53 PM", value: 27903 },
  //     { month: "Jun", timestamp: "11:55 AM", value: 21240 },
  //     { month: "Feb", timestamp: "10:25 PM", value: 28769 },
  //     { month: "Jul", timestamp: "5:13 PM", value: 18066 },
  //     { month: "Oct", timestamp: "1:32 AM", value: 31601 },
  //     { month: "Sep", timestamp: "11:29 PM", value: 26480 },
  //     { month: "Aug", timestamp: "12:19 AM", value: 49265 },
  //     { month: "Sep", timestamp: "6:19 PM", value: 2910 },
  //     { month: "Nov", timestamp: "10:15 AM", value: 18933 },
  //     { month: "Jun", timestamp: "3:42 PM", value: 30268 },
  //     { month: "Jun", timestamp: "1:18 PM", value: 21562 },
  //     { month: "Sep", timestamp: "3:15 PM", value: 36182 },
  //     { month: "May", timestamp: "8:58 AM", value: 39303 },
  //     { month: "May", timestamp: "3:04 AM", value: 5019 },
  //     { month: "Nov", timestamp: "12:17 PM", value: 19676 },
  //     { month: "May", timestamp: "12:24 AM", value: 6799 },
  //     { month: "Sep", timestamp: "11:43 PM", value: 4176 },
  //     { month: "Jun", timestamp: "1:52 AM", value: 45206 },
  //     { month: "Mar", timestamp: "3:09 PM", value: 49060 },
  //     { month: "Jul", timestamp: "10:26 AM", value: 5984 },
  //     { month: "Aug", timestamp: "3:24 PM", value: 10305 },
  //     { month: "Oct", timestamp: "8:48 AM", value: 27236 },
  //     { month: "Aug", timestamp: "10:13 PM", value: 46037 },
  //     { month: "Dec", timestamp: "1:43 AM", value: 16559 },
  //     { month: "May", timestamp: "2:30 PM", value: 4974 },
  //     { month: "Oct", timestamp: "9:15 AM", value: 21004 },
  //     { month: "Mar", timestamp: "8:18 AM", value: 44392 },
  //     { month: "Jun", timestamp: "5:55 PM", value: 30119 },
  //     { month: "Dec", timestamp: "6:11 AM", value: 42016 },
  //     { month: "Aug", timestamp: "6:25 AM", value: 33033 },
  //     { month: "Aug", timestamp: "8:32 PM", value: 17476 },
  //     { month: "Sep", timestamp: "4:18 AM", value: 24694 },
  //     { month: "Jul", timestamp: "7:54 PM", value: 20124 },
  //     { month: "Nov", timestamp: "7:56 AM", value: 23584 },
  //     { month: "Mar", timestamp: "10:46 PM", value: 45686 },
  //     { month: "Mar", timestamp: "12:09 PM", value: 17448 },
  //     { month: "Aug", timestamp: "2:14 AM", value: 41722 },
  //     { month: "Oct", timestamp: "1:05 PM", value: 42702 },
  //     { month: "Apr", timestamp: "8:36 AM", value: 12589 },
  //     { month: "Jan", timestamp: "2:35 AM", value: 24692 },
  //     { month: "Mar", timestamp: "11:10 AM", value: 29504 },
  //     { month: "Jan", timestamp: "8:44 AM", value: 32241 },
  //     { month: "Dec", timestamp: "5:40 PM", value: 27259 },
  //     { month: "Oct", timestamp: "7:29 AM", value: 1391 },
  //     { month: "Dec", timestamp: "8:02 PM", value: 11921 },
  //     { month: "Jun", timestamp: "2:13 PM", value: 15730 },
  //     { month: "Feb", timestamp: "11:14 PM", value: 43780 },
  //     { month: "Jan", timestamp: "8:37 AM", value: 16085 },
  //     { month: "Sep", timestamp: "12:04 AM", value: 37551 },
  //     { month: "Feb", timestamp: "3:58 PM", value: 4972 },
  //     { month: "Sep", timestamp: "10:29 PM", value: 10334 },
  //     { month: "Jun", timestamp: "3:20 AM", value: 12406 },
  //     { month: "Mar", timestamp: "4:53 PM", value: 3174 },
  //     { month: "Aug", timestamp: "12:19 AM", value: 2942 },
  //     { month: "Dec", timestamp: "6:13 AM", value: 31371 },
  //     { month: "Jan", timestamp: "2:45 PM", value: 887 },
  //     { month: "Mar", timestamp: "6:54 PM", value: 46588 },
  //     { month: "Jun", timestamp: "9:16 AM", value: 23831 },
  //     { month: "Aug", timestamp: "6:23 PM", value: 6655 },
  //     { month: "Aug", timestamp: "5:13 PM", value: 34910 },
  //     { month: "Jul", timestamp: "10:33 AM", value: 36083 },
  //     { month: "Nov", timestamp: "3:54 AM", value: 7699 },
  //     { month: "Feb", timestamp: "3:39 AM", value: 37645 },
  //     { month: "Sep", timestamp: "9:55 PM", value: 22739 },
  //     { month: "Apr", timestamp: "1:59 PM", value: 18315 },
  //     { month: "May", timestamp: "9:00 AM", value: 42349 },
  //     { month: "Jun", timestamp: "6:20 PM", value: 34315 },
  //     { month: "May", timestamp: "12:55 PM", value: 40581 },
  //     { month: "Feb", timestamp: "1:56 AM", value: 19665 },
  //     { month: "Mar", timestamp: "5:27 AM", value: 10586 },
  //     { month: "May", timestamp: "11:44 PM", value: 32073 },
  //     { month: "Apr", timestamp: "5:20 PM", value: 15808 },
  //     { month: "Jan", timestamp: "6:16 AM", value: 46491 },
  //     { month: "Jun", timestamp: "3:48 AM", value: 40271 },
  //     { month: "Apr", timestamp: "5:57 PM", value: 37506 },
  //     { month: "Jul", timestamp: "1:23 AM", value: 1348 },
  //     { month: "May", timestamp: "8:36 PM", value: 12129 },
  //     { month: "Nov", timestamp: "12:32 AM", value: 36480 },
  //     { month: "Feb", timestamp: "9:28 PM", value: 4742 },
  //     { month: "Nov", timestamp: "10:22 AM", value: 13444 },
  //     { month: "Jul", timestamp: "9:50 PM", value: 32142 },
  //     { month: "Dec", timestamp: "2:52 AM", value: 8607 },
  //     { month: "Apr", timestamp: "6:30 PM", value: 2051 },
  //     { month: "Mar", timestamp: "5:08 PM", value: 39189 },
  //     { month: "Jul", timestamp: "2:22 PM", value: 18628 },
  //     { month: "Sep", timestamp: "12:42 AM", value: 29738 },
  //     { month: "Jul", timestamp: "7:49 AM", value: 40435 },
  //     { month: "Apr", timestamp: "12:25 PM", value: 21418 },
  //     { month: "Aug", timestamp: "5:55 AM", value: 25053 },
  //     { month: "Sep", timestamp: "3:01 PM", value: 45138 },
  //     { month: "Jan", timestamp: "12:25 PM", value: 42951 },
  //     { month: "Sep", timestamp: "4:20 PM", value: 11326 },
  //     { month: "Jun", timestamp: "8:28 AM", value: 18132 },
  //     { month: "Sep", timestamp: "4:25 PM", value: 42612 },
  //     { month: "Sep", timestamp: "3:45 PM", value: 20441 },
  //     { month: "Oct", timestamp: "12:27 PM", value: 23938 },
  //     { month: "May", timestamp: "4:04 PM", value: 30735 },
  //     { month: "Dec", timestamp: "10:52 PM", value: 33315 },
  //     { month: "Jul", timestamp: "3:49 AM", value: 27411 },
  //     { month: "Nov", timestamp: "9:23 AM", value: 17332 },
  //     { month: "Feb", timestamp: "10:59 AM", value: 44312 },
  //     { month: "May", timestamp: "12:19 PM", value: 32063 },
  //     { month: "Dec", timestamp: "8:30 PM", value: 29719 },
  //     { month: "Jul", timestamp: "7:49 AM", value: 9568 },
  //     { month: "Jun", timestamp: "8:24 AM", value: 33422 },
  //     { month: "Aug", timestamp: "10:16 AM", value: 9912 },
  //     { month: "Jul", timestamp: "8:40 AM", value: 30907 },
  //     { month: "Aug", timestamp: "5:24 PM", value: 20206 },
  //     { month: "Dec", timestamp: "6:19 PM", value: 15398 },
  //     { month: "Mar", timestamp: "10:15 PM", value: 28784 },
  //     { month: "Jun", timestamp: "6:26 AM", value: 40163 },
  //     { month: "Aug", timestamp: "2:04 AM", value: 16097 },
  //     { month: "Jun", timestamp: "1:12 PM", value: 29035 },
  //     { month: "Sep", timestamp: "11:56 AM", value: 2247 },
  //     { month: "Jan", timestamp: "1:15 PM", value: 7441 },
  //     { month: "May", timestamp: "7:25 PM", value: 5420 },
  //     { month: "Jan", timestamp: "1:13 PM", value: 43765 },
  //     { month: "Jun", timestamp: "7:46 PM", value: 42831 },
  //     { month: "Apr", timestamp: "8:25 AM", value: 19872 },
  //     { month: "Mar", timestamp: "10:04 AM", value: 18708 },
  //     { month: "Apr", timestamp: "2:31 AM", value: 17031 },
  //     { month: "Aug", timestamp: "2:38 PM", value: 30606 },
  //     { month: "Mar", timestamp: "6:20 AM", value: 38133 },
  //     { month: "Jul", timestamp: "2:22 AM", value: 45135 },
  //     { month: "Sep", timestamp: "4:28 PM", value: 5443 },
  //     { month: "Oct", timestamp: "4:22 PM", value: 25749 },
  //     { month: "May", timestamp: "2:48 AM", value: 16841 },
  //     { month: "Nov", timestamp: "8:41 PM", value: 14427 },
  //     { month: "Nov", timestamp: "2:53 PM", value: 24880 },
  //     { month: "Feb", timestamp: "1:17 PM", value: 2598 },
  //     { month: "Nov", timestamp: "1:28 AM", value: 37966 },
  //     { month: "Apr", timestamp: "10:08 AM", value: 18146 },
  //     { month: "Apr", timestamp: "6:00 AM", value: 14140 },
  //     { month: "May", timestamp: "9:53 AM", value: 45261 },
  //     { month: "Apr", timestamp: "10:09 PM", value: 39565 },
  //     { month: "Mar", timestamp: "1:28 AM", value: 37644 },
  //     { month: "Apr", timestamp: "7:59 PM", value: 12512 },
  //     { month: "Apr", timestamp: "10:41 AM", value: 9360 },
  //     { month: "Jul", timestamp: "2:55 AM", value: 37650 },
  //     { month: "Nov", timestamp: "12:33 PM", value: 32205 },
  //     { month: "Feb", timestamp: "2:15 AM", value: 8048 },
  //     { month: "Jul", timestamp: "8:20 PM", value: 28656 },
  //     { month: "Mar", timestamp: "1:04 PM", value: 32068 },
  //     { month: "Sep", timestamp: "4:01 AM", value: 13524 },
  //     { month: "Jul", timestamp: "12:33 PM", value: 12180 },
  //     { month: "Oct", timestamp: "1:49 AM", value: 5640 },
  //     { month: "Feb", timestamp: "4:20 PM", value: 1070 },
  //     { month: "May", timestamp: "7:53 PM", value: 14978 },
  //     { month: "Sep", timestamp: "9:33 AM", value: 21740 },
  //     { month: "Jan", timestamp: "7:53 PM", value: 1901 },
  //     { month: "Mar", timestamp: "11:15 AM", value: 7311 },
  //     { month: "Mar", timestamp: "8:54 PM", value: 10141 },
  //     { month: "May", timestamp: "11:27 AM", value: 48534 },
  //     { month: "Sep", timestamp: "5:16 AM", value: 43876 },
  //     { month: "Apr", timestamp: "9:33 AM", value: 23785 },
  //     { month: "Jul", timestamp: "1:54 AM", value: 47255 },
  //     { month: "Jun", timestamp: "8:18 PM", value: 41511 },
  //     { month: "Dec", timestamp: "7:14 PM", value: 13177 },
  //     { month: "Dec", timestamp: "1:41 PM", value: 45094 },
  //     { month: "Oct", timestamp: "8:53 PM", value: 18767 },
  //     { month: "Nov", timestamp: "9:21 AM", value: 712 },
  //     { month: "Jul", timestamp: "3:40 PM", value: 4719 },
  //     { month: "Jan", timestamp: "4:39 AM", value: 38215 },
  //     { month: "Apr", timestamp: "5:24 AM", value: 28276 },
  //     { month: "Feb", timestamp: "5:57 AM", value: 4328 },
  //     { month: "Nov", timestamp: "11:22 PM", value: 22997 },
  //     { month: "Nov", timestamp: "9:53 PM", value: 25027 },
  //     { month: "Apr", timestamp: "3:09 AM", value: 28812 },
  //     { month: "May", timestamp: "8:05 AM", value: 6006 },
  //     { month: "Jun", timestamp: "5:40 PM", value: 43209 },
  //     { month: "Dec", timestamp: "11:04 PM", value: 14598 },
  //     { month: "Sep", timestamp: "3:04 PM", value: 28907 },
  //     { month: "Sep", timestamp: "8:38 PM", value: 7696 },
  //     { month: "Dec", timestamp: "9:46 AM", value: 19443 },
  //     { month: "Apr", timestamp: "10:45 AM", value: 37812 },
  //     { month: "Feb", timestamp: "6:58 PM", value: 16331 },
  //     { month: "Mar", timestamp: "1:43 AM", value: 47275 },
  //     { month: "Aug", timestamp: "3:18 AM", value: 2220 },
  //     { month: "Nov", timestamp: "2:42 PM", value: 2821 },
  //     { month: "Jul", timestamp: "7:06 PM", value: 41531 },
  //     { month: "Jun", timestamp: "7:39 PM", value: 33264 },
  //     { month: "Jan", timestamp: "6:49 AM", value: 47704 },
  //     { month: "Dec", timestamp: "5:14 PM", value: 12067 },
  //     { month: "Feb", timestamp: "10:49 AM", value: 17617 },
  //     { month: "Aug", timestamp: "9:06 AM", value: 40389 },
  //     { month: "Nov", timestamp: "2:56 PM", value: 42682 },
  //     { month: "Jan", timestamp: "2:15 AM", value: 3848 },
  //     { month: "Dec", timestamp: "5:02 PM", value: 10232 },
  //     { month: "Dec", timestamp: "8:55 AM", value: 13919 },
  //     { month: "Dec", timestamp: "1:30 AM", value: 23184 },
  //     { month: "Oct", timestamp: "12:42 PM", value: 14471 },
  //     { month: "Nov", timestamp: "7:44 AM", value: 43677 },
  //     { month: "Aug", timestamp: "8:49 AM", value: 45783 },
  //     { month: "Jan", timestamp: "7:43 AM", value: 13301 },
  //     { month: "Jul", timestamp: "11:52 PM", value: 47356 },
  //     { month: "Nov", timestamp: "4:36 PM", value: 41047 },
  //     { month: "Jan", timestamp: "3:45 AM", value: 11160 },
  //     { month: "Jul", timestamp: "5:27 AM", value: 31771 },
  //     { month: "Dec", timestamp: "11:15 AM", value: 24097 },
  //     { month: "Oct", timestamp: "1:03 PM", value: 13293 },
  //     { month: "Dec", timestamp: "12:32 AM", value: 41493 },
  //     { month: "Aug", timestamp: "12:10 PM", value: 15534 },
  //     { month: "Apr", timestamp: "9:56 PM", value: 3253 },
  //     { month: "Apr", timestamp: "11:08 PM", value: 45160 },
  //     { month: "Nov", timestamp: "10:31 AM", value: 36106 },
  //     { month: "Nov", timestamp: "8:20 AM", value: 30233 },
  //     { month: "Jun", timestamp: "12:12 PM", value: 16499 },
  //     { month: "Dec", timestamp: "7:15 PM", value: 20796 },
  //     { month: "Jun", timestamp: "11:16 PM", value: 20179 },
  //     { month: "Jul", timestamp: "7:00 AM", value: 21038 },
  //     { month: "Jul", timestamp: "4:05 AM", value: 1671 },
  //     { month: "Jan", timestamp: "6:38 PM", value: 41134 },
  //     { month: "Aug", timestamp: "4:43 AM", value: 22788 },
  //     { month: "Jul", timestamp: "9:10 PM", value: 5253 },
  //     { month: "Aug", timestamp: "3:45 PM", value: 33252 },
  //     { month: "Apr", timestamp: "3:02 PM", value: 19270 },
  //     { month: "Mar", timestamp: "10:57 PM", value: 25426 },
  //     { month: "Aug", timestamp: "1:10 AM", value: 7281 },
  //     { month: "Mar", timestamp: "10:51 AM", value: 10308 },
  //     { month: "Mar", timestamp: "12:11 AM", value: 36007 },
  //     { month: "Sep", timestamp: "11:48 PM", value: 27461 },
  //     { month: "Apr", timestamp: "2:14 AM", value: 18191 },
  //     { month: "Nov", timestamp: "9:16 PM", value: 20450 },
  //     { month: "Jan", timestamp: "5:24 AM", value: 2951 },
  //     { month: "Nov", timestamp: "12:19 AM", value: 31275 },
  //     { month: "Sep", timestamp: "4:17 AM", value: 9889 },
  //     { month: "Sep", timestamp: "11:22 AM", value: 39287 },
  //     { month: "Nov", timestamp: "1:32 PM", value: 27192 },
  //     { month: "Jun", timestamp: "11:46 AM", value: 34721 },
  //     { month: "Nov", timestamp: "5:45 AM", value: 22280 },
  //     { month: "May", timestamp: "10:08 PM", value: 14269 },
  //     { month: "Jan", timestamp: "5:47 PM", value: 9683 },
  //     { month: "Oct", timestamp: "12:54 AM", value: 7050 },
  //     { month: "Apr", timestamp: "4:28 PM", value: 40027 },
  //     { month: "Sep", timestamp: "6:00 PM", value: 26025 },
  //     { month: "Mar", timestamp: "4:47 AM", value: 23621 },
  //     { month: "Nov", timestamp: "6:03 PM", value: 23970 },
  //     { month: "Jan", timestamp: "8:19 PM", value: 5441 },
  //     { month: "Oct", timestamp: "1:18 AM", value: 31338 },
  //     { month: "Feb", timestamp: "6:18 AM", value: 24382 },
  //     { month: "Mar", timestamp: "8:06 AM", value: 18496 },
  //   ];
  //   function sortArrayByProperty(arr, property) {
  //     // Use the Array.sort() method to sort the array by the specified property
  //     arr.sort(function (a, b) {
  //       // Use the ternary operator to determine the order based on the values of the property
  //       return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  //     });

  //     // Return the sorted array
  //     return arr;
  //   }
  //   const sortedPeople = sortArrayByProperty(btc, "value");
  //   console.log(sortedPeople);

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
      </section>
    </div>
  );
};

// export default DashBoardLendPage;

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default DashboardHome;
