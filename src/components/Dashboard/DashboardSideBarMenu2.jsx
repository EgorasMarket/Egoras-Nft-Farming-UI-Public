import React, { useState, useEffect, useRef, useMemo } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import Web3 from "web3";
import axios from "axios";
import { API_URL } from "../../actions/types";
import { config } from "../../actions/Config";
import Marquee from "react-fast-marquee";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppsIcon from "@mui/icons-material/Apps";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Web3 from "web3";
import CloseIcon from "@material-ui/icons/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Sling as Hamburger } from "hamburger-react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import SellIcon from "@mui/icons-material/Sell";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LockClockIcon from "@mui/icons-material/LockClock";
import jazzicon from "@metamask/jazzicon";
import StarsIcon from "@mui/icons-material/Stars";
import ApprovalIcon from "@mui/icons-material/Approval";
import CreditScoreTwoToneIcon from "@mui/icons-material/CreditScoreTwoTone";
// import { AccountNavigation } from "./DashboardPages/AccountNavigation";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Authenticate } from "../auth/Authenticate";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import OpacityIcon from "@mui/icons-material/Opacity";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BarChartIcon from "@mui/icons-material/BarChart";
import "../../css/dashboardheader.css";
import "../../css/dashBoardSideBar.css";
import { numberWithCommas } from "../../static";
import SwitchToggle2 from "./DashBoardPages/SwitchToggle/SwitchToggle2";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  getPriceImpl,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
} from "../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { socket } from "../../socket";
import TimeAgoComponent from "../TimeAgoComponent";
import { CALL_GET_USER_LOCATION } from "../../services/userServices";
export const MarketHeader = ({
  setCategories,
  ToggleMobile_cat,
  categories,
  ToggleOtherCategory,
}) => {
  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + "/product/all-categories",
        null,
        config
      );
      console.log(response);
      console.log(response.data.data.allCategories);
      setCategories(response.data.data.allCategories);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  return (
    <div className="dashboardMarketPlaceHeader no-bg">
      <div className="container">
        <div className="dashboardMarketPlaceHeader_area">
          <div className="dashboardMarketPlaceHeader_div1">
            <input
              type="search"
              placeholder="Search products"
              name=""
              id=""
              className="dashboardMarketPlaceHeader_div1_search_input"
            />
            <SearchOutlinedIcon className="dashboardMarketPlaceHeader_div1_search_input_icon" />
          </div>
          <AppsIcon
            className="dashboardMarketPlaceHeader_div2_categories_icon"
            onClick={ToggleMobile_cat}
          />
          <div className="dashboardMarketPlaceHeader_div2_categories">
            {categories.slice(0, 4).map((data) => (
              <a href={`/app/market/product/category/${data.product_category}`}>
                <div className="dashboardMarketPlaceHeader_div2_categories_cont1">
                  {data.product_category}
                </div>
              </a>
            ))}
            <div className="more_cat_icon" onClick={ToggleOtherCategory}>
              <MoreHorizIcon className="more_cat_icon_icon" /> Others
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const DashboardSideBarMenu2 = ({ check, togglemakeDark }) => {
  const dddd = localStorage.getItem("smallSidetoken");
  const [connectId, setConnectId] = useState(false);
  const [activeBg, setActiveBg] = useState("home");
  const [catDiv, setCatDiv] = useState("not_home");
  const [smallSide, setSmallSide] = useState(dddd);
  const [isOpen, setIsOpen] = useState(false);
  const [cartNum, setCartNum] = useState("");
  const [image, setImage] = useState("");
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [acctNav, setAcctNav] = useState(false);
  const [activeMenuName, setActiveMenuName] = useState("Markets");
  const [showHeader, setshowHeader] = useState(true);
  const [betaDiv, setBetaDiv] = useState(true);
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [nairaValue, setNairaValue] = useState(750);
  const [UnreadNotifications, setUnreadNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState(false);
  const [mobile_cat, setMobile_cat] = useState(false);
  const [noTifyCount, setNotifyCount] = useState(0);
  // const [darkMode, setDarkMode] = useState(null);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [connectNewAccountBtn, setConnectNewAccountBtn] = useState(false);
  const [disconnetDiv, setDisconnectDiv] = useState(false);
  const [egcUsdVal, setEgcUsdVal] = useState(0);
  const [egrUsdVal, setEgrUsdVal] = useState(0);
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const [coinBalance2, setCoinBalance2] = React.useState(0.0);
  const [baseBalance, setBaseBalance] = useState(0.0);
  const [notifyDiv, setNotifyDiv] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationDetails, setNotificationDetails] = useState("");
  const [activeNotifyTab, setActiveNotifyTab] = useState("unread");

  const [productNamesZ, setProductNamesZ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const linksActive = window.location.pathname;
  const urlArr = linksActive.split("/");
  const wrapperRef = useRef(null);
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
  const toggleAccountNav = () => {
    if (acctNav == true) {
      setAcctNav(false);
    } else if (acctNav == false) {
      setAcctNav(true);
    }
  };
  useEffect(() => {
    // setWalletAddr(account);
    // console.log(walletAddr.slice(0, 10));
    const element = avatarRef.current;
    if (element && account) {
      setWalletAddr(account);
      setConnectTxt("Connected");
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      console.log(addr, seed);
      const icon = jazzicon(20, seed); //generates a size 20 icon
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef, isOpen]);
  useEffect(() => {
    if (linksActive === "/app") {
      setActiveMenuName("home");
    }
    if (urlArr[2] === "market") {
      setActiveMenuName("market");
    }
    if (linksActive === "/app/sell") {
      setActiveMenuName("sell");
    }
    if (linksActive === "/app/staking/egc") {
      setActiveMenuName("Stake");
    }
    if (linksActive === "/app/user") {
      setActiveMenuName("Account Details");
    }
    if (linksActive === "/app/swap") {
      setActiveMenuName("Swap");
    }
    if (linksActive === "/app/earn/pool/detail") {
      setActiveMenuName("Earn");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveMenuName("Earn");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/earn/pool/detail/transactions") {
      setActiveMenuName("Earn");
    }
    // if (linksActive === "/app/add") {
    //   setActiveMenuName("Liquidity");
    // }
    if (linksActive === "/app/whitepaper") {
      setActiveMenuName("Whitepaper");
    }
    if (linksActive === "/app/earn") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/stake/vault/" + urlArr[4] + "/ENGN") {
      setActiveMenuName("Vault");
    }
    if (linksActive === "/app/stake/deposit_vault/" + urlArr[4] + "/ENGN") {
      setActiveMenuName("Vault");
    }
  });
  useEffect(() => {
    if (linksActive == "/app/products") {
      setSearchBar(true);
    }
  });

  // //console.log(dddd);
  const changeBg = (e) => {
    let currentId = e.currentTarget.id;
    setActiveBg(currentId);
    if (linksActive === "/app/products") {
      setCatDiv("home");
    }
    if (linksActive === "/app/products/categories/id-phone") {
      setActiveBg("products");
      setCatDiv("home");
    }
  };

  useEffect(() => {
    if (linksActive === "/app/staking/egc") {
      setActiveBg("stake");
    }
    if (linksActive === "/app") {
      setActiveBg("home");
    }
    if (urlArr[2] === "market") {
      setActiveBg("market");
    }
    if (linksActive === "/app/sell") {
      setActiveBg("sell");
    }
    if (linksActive === "/app/") {
      setActiveBg("lend");
    }
    if (linksActive === "/app/earn") {
      setActiveBg("lend");
    }
    if (linksActive === "/app/user") {
      setActiveBg("account");
    }
    if (linksActive === "/app/user/referral") {
      setActiveBg("account");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveBg("lend");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveBg("lend");
    }
    if (linksActive === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setActiveBg("lend");
    }
    if (linksActive === "/app/earn/pool/detail/transactions") {
      setActiveBg("lend");
    }

    if (linksActive === "/app/swap") {
      setActiveBg("swap");
    }
    if (linksActive === "/app/add") {
      setActiveBg("pool");
    }

    if (linksActive === "/app/whitepaper") {
      setActiveBg("whitepaper");
    }

    if (smallSide == "not_small") {
      localStorage.setItem("smallSidetoken", "not_small");
    } else {
      localStorage.setItem("smallSidetoken", "smallSide");
    }
  }, []);

  const shrinkAction = () => {
    if (smallSide == "not_small") {
      setSmallSide("smallSide");
      localStorage.setItem("smallSidetoken", "smallSide");
    } else {
      setSmallSide("not_small");
      localStorage.setItem("smallSidetoken", "not_small");
    }
  };
  const web3 = new Web3(window.ethereum);
  useEffect(async () => {
    if (account) {
      const getBalance = await web3.eth.getBalance(account);
      // const getBalance2 = await web3.eth.getBalance(
      //   "0xe03f527a64128e8Edb64bf67256416302c56c4b7"
      // );
      const ethBalance = web3.utils.fromWei(getBalance, "ether");
      // const ethBalance2 = web3.utils.fromWei(getBalance2, "ether");
      console.log(ethBalance);
      // console.log(getBalance2);
      setCoinBalance(parseFloat(ethBalance).toFixed(4));
    }
  }, [coinBalance, account]);
  const toggleDisconnectDiv = () => {
    setDisconnectDiv(!disconnetDiv);
  };

  // console.log(baseBalance);
  // console.log(coinBalance2);

  useEffect(
    async (e) => {
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          console.log(egc_usd_val);
          setEgcUsdVal(() => egc_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [egcUsdVal]
  );

  const chainIdBsc = "56";
  // const chainIdBsc = "97";

  useEffect(() => {
    if (account) {
      web3.eth.net
        .getId()
        .then((networkId) => {
          if (networkId != chainIdBsc) {
            setConnectId(() => true);
            console.log(
              "You are not on the right network please connect to BSC"
            );
          } else {
            setConnectId(() => false);

            console.log(
              "You are  on the right network please carry out transaction"
            );
          }
        })
        .catch((err) => {
          // unable to retrieve network id
        });
    } else {
      setConnectId(() => false);
    }
  });

  useEffect(() => {
    if (window.ethereum) {
      setConnectNewAccountBtn(false);
    } else {
      setConnectNewAccountBtn(true);
    }
  });

  const switchNetwork = async () => {
    // if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainIdBsc) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Binance Smart Chain",
              chainId: web3.utils.toHex(chainIdBsc),
              nativeCurrency: {
                name: "Smart Chain",
                decimals: 18,
                symbol: "BNB",
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
            },
          ],
        });
      }
    }
    // } else {
    //   setConnectNewAccountBtn(true);
    // }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setNotifyDiv(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    socket.connect();
    console.log(account, "blunt");
    socket.on(`${account}/notification`, (data) => {
      console.log(data);

      const dd = data.sort((a, b) => {
        return Number(b) - Number(a);
      });
      setUnreadNotifications(data);
      const unreadNotifications = data.filter(
        (notification) => notification.status === "unread"
      );
      const unreadCount = unreadNotifications.length;
      setNotifyCount(unreadCount);
      // setData(data);
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  const ToggleNotifyDiv = () => {
    setNotifyDiv(!notifyDiv);
    // setNotifyCount(noTifyCount - 1);
  };

  useEffect(async () => {
    if (account) {
      await axios
        .get(API_URL + "/notifications/user/" + account, null, config)
        .then((data) => {
          console.log(data);
          console.log(data.data.data, "data data data");
          setUnreadNotifications(data.data.data);
          const unreadNotifications = data.data.data.filter(
            (notification) => notification.status === "unread"
          );
          const unreadCount = unreadNotifications.length;
          setNotifyCount(unreadCount);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [account]);

  const fetchNotifications = async () => {
    await axios
      .get(API_URL + "/notifications/user/" + account, null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data, "data data data");
        setUnreadNotifications(data.data.data);
        const unreadNotifications = data.data.data.filter(
          (notification) => notification.status === "unread"
        );
        const unreadCount = unreadNotifications.length;
        setNotifyCount(unreadCount);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  console.log(UnreadNotifications.length, "UnreadNotifications.length");
  const MarkAsRead = async (id) => {
    try {
      const response = await axios.put(API_URL + "/notifications/read/" + id);
      console.log(response);
      if (response.data.success === true) {
        fetchNotifications();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ToggleNotifyDetails = (e) => {
    console.log("toggle");
    const id = e.currentTarget.id;
    setNotificationDetails(id);
    setNotifyDiv(false);
    console.log(id);
    MarkAsRead(id);
  };

  const ToggleActiveNotifyTab = (e) => {
    let id = e.currentTarget.id;

    setActiveNotifyTab(id);
  };
  const ToggleOtherCategory = () => {
    setOtherCategory(!otherCategory);
  };
  const ToggleMobile_cat = () => {
    setMobile_cat(!mobile_cat);
  };

  useEffect(() => {
    console.log("____");
    const getLocation = async () => {
      const response = await CALL_GET_USER_LOCATION();
      // console.log(response);
    };
    getLocation();
  }, []);
  return (
    <>
      <div className={smallSide == "not_small" ? "side" : "small_side"}>
        <div className="header_token_prices_div">
          <div className="container-fluid">
            <Marquee
              speed={50}
              pauseOnHover={true}
              gradientColor="[255, 255, 255]"
            >
              <div className="header_token_prices_div_area">
                <div className="header_token_prices_div_area1">
                  1 EGC ~ {numberWithCommas(egcUsdVal.toFixed(2))} USD
                </div>
                <span class="vertical_rule2"></span>
                <div className="header_token_prices_div_area1">
                  1 EGC ~ {numberWithCommas(egcUsdVal.toFixed(2))} eUSD
                </div>
                <span class="vertical_rule2"></span>
                <div className="header_token_prices_div_area1">
                  1 eUSD ~ 1 USD
                </div>
                <span class="vertical_rule2"></span>
              </div>
            </Marquee>
          </div>
        </div>
        <section className="DashBoardHeaderSection">
          <div className="container-fluid">
            <div className="dashboard-area">
              <a href="/" className="egr_logo2_mobil">
                <img
                  src="/img/martgpt_logo_dark.svg"
                  alt="..."
                  className="egr-logo2"
                />
                {/* <img
                  src="/img/logoVideoThumbnail.svg"
                  alt="..."
                  className="egr-logo2dark"
                /> */}
                <img
                  src="/img/martgpt_logo.svg"
                  alt="..."
                  className="egr-logo2dark"
                />

                <div className="on-mobile-navigators"></div>
              </a>
              <div className="egrLogo2Cont3">
                <a href="/">
                  {" "}
                  <img
                    src="/img/martgpt_logo_dark.svg"
                    alt="..."
                    className="egr-logo"
                  />
                  {/* <img
                    src="/img/logoVideoThumbnail.svg"
                    alt="..."
                    className="egr-logodark"
                  /> */}
                  <img
                    src="/img/martgpt_logo.svg"
                    alt="..."
                    className="egr-logodark"
                  />
                </a>
              </div>
              <div className="header_tabs">
                <a
                  id="home"
                  href="/app"
                  className={
                    activeBg == "home" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  Home
                </a>
                <a
                  id="stake"
                  href="/app/staking/egc"
                  className={
                    activeBg == "stake" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  <span class="Ping -top-1">
                    <span class="c-flashingPart"></span>
                    <span class="c-basePart"></span>
                  </span>
                  Stake
                </a>
                <a
                  id="swap"
                  href="/app/swap"
                  className={
                    activeBg == "swap" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  Swap
                  <span class="Ping -top-1">
                    <span class="c-flashingPart"></span>
                    <span class="c-basePart"></span>
                  </span>
                </a>
                <a
                  id="sell"
                  href="/app/sell"
                  className={
                    activeBg == "sell" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  Sell
                  <span class="Ping -top-1">
                    <span class="c-flashingPart"></span>
                    <span class="c-basePart"></span>
                  </span>
                </a>
                <a
                  id="market"
                  href="/app/market"
                  className={
                    activeBg == "market" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  Market{" "}
                  <span class="Ping -top-1">
                    <span class="c-flashingPart"></span>
                    <span class="c-basePart"></span>
                  </span>
                </a>

                <a
                  id="account"
                  href="/app/user"
                  className={
                    activeBg == "account"
                      ? "header_tab1_active "
                      : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  Account
                </a>
              </div>
              <div className="user_profile_icon_cont2">
                <div className="together">
                  <div className="header_menu_icon_con_dash">
                    <Hamburger
                      toggled={isOpen}
                      toggle={setIsOpen}
                      size={25}
                      rounded={true}
                    />
                  </div>
                  {/* ============ */}
                  {/* ============ */}
                  {/* ===== MOBILE VIEW NOTIFICATION ======= */}
                  {/* ============ */}
                  <div className="mobile_view_notifications" ref={wrapperRef}>
                    <div className="notify_icon_cont_div_cont">
                      <div
                        className="wallet_settings_icon_cont notify_icon_cont"
                        onClick={ToggleNotifyDiv}
                      >
                        <div className="notify_icon_cont_div">
                          {UnreadNotifications.filter(
                            (data) => data.status === "unread"
                          ).length > 0 ? (
                            <div className="notify_icon_cont_div_notifyCount">
                              {noTifyCount}
                            </div>
                          ) : null}
                          <NotificationsNoneOutlinedIcon className="wallet_settings_icon" />
                        </div>
                      </div>
                      {notifyDiv && (
                        <div className="notifyDropDownDiv">
                          {UnreadNotifications.length <= 0 ? (
                            <div className="notifyDropDownDiv_emptyDiv">
                              No notifications!
                            </div>
                          ) : (
                            <>
                              <div className="notifications_headerTab">
                                <div
                                  className={
                                    activeNotifyTab === "unread"
                                      ? "notifications_headerTab1_active"
                                      : "notifications_headerTab1"
                                  }
                                  id="unread"
                                  onClick={ToggleActiveNotifyTab}
                                >
                                  Unread
                                </div>
                                <div
                                  className={
                                    activeNotifyTab === "read"
                                      ? "notifications_headerTab1_active"
                                      : "notifications_headerTab1"
                                  }
                                  onClick={ToggleActiveNotifyTab}
                                  id="read"
                                >
                                  Read
                                </div>
                              </div>
                              {activeNotifyTab === "read" ? (
                                <>
                                  {UnreadNotifications.filter(
                                    (data) => data.status === "read"
                                  ).length > 0 ? (
                                    <>
                                      {UnreadNotifications.filter(
                                        (data) => data.status === "read"
                                      )
                                        .sort(
                                          (a, b) =>
                                            new Date(b.createdAt).getTime() -
                                            new Date(a.createdAt).getTime()
                                        )
                                        .map((data, key) => (
                                          <div
                                            className="notifyDropDownDiv_div1"
                                            key={data.id}
                                          >
                                            <div className="notifyDropDownDiv_div1_title">
                                              {data.title}
                                            </div>
                                            <div className="notifyDropDownDiv_div1_para">
                                              {data.message}
                                            </div>
                                          </div>
                                        ))}
                                    </>
                                  ) : (
                                    <div className="notifyDropDownDiv_emptyDiv">
                                      No notifications!
                                    </div>
                                  )}
                                </>
                              ) : null}

                              {activeNotifyTab === "unread" ? (
                                <>
                                  {UnreadNotifications.filter(
                                    (data) => data.status === "unread"
                                  ).length > 0 ? (
                                    <>
                                      {UnreadNotifications.filter(
                                        (data) => data.status === "unread"
                                      )
                                        .sort(
                                          (a, b) =>
                                            new Date(b.createdAt).getTime() -
                                            new Date(a.createdAt).getTime()
                                        )
                                        .map((data, key) => (
                                          <div
                                            className="notifyDropDownDiv_div1 active"
                                            key={data.id}
                                            id={data.id}
                                            onClick={ToggleNotifyDetails}
                                          >
                                            <div className="notifyDropDownDiv_div1_title active">
                                              {data.title}
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                }}
                                              >
                                                - (
                                                <TimeAgoComponent
                                                  date={data.createdAt}
                                                />
                                                )
                                              </span>
                                            </div>
                                            <div className="notifyDropDownDiv_div1_para">
                                              {data.message}
                                            </div>
                                          </div>
                                        ))}
                                    </>
                                  ) : (
                                    <div className="notifyDropDownDiv_emptyDiv">
                                      No notifications!
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* ============ */}
                  {/* ============ */}
                  {/* ====== MOBILE VIEW NOTIFICATION ====== */}
                  {/* ============ */}
                  <div className="toggle_dark_mode_div">
                    <SwitchToggle2
                      className="toggle_dark_mode"
                      darkMode={togglemakeDark}
                      checkBox={check}
                    />
                  </div>
                  {account ? (
                    <div className="connected_header_address dash_connected_header_address">
                      <p className="header_wllt_bal">
                        <AccountBalanceWalletIcon className="header_wllt_bal_icon" />
                        {coinBalance} BNB
                      </p>
                      <div
                        className="metamask_prof_pic_icon"
                        ref={avatarRef}
                      ></div>
                      <div className="wallet_addr_cont_txt_header">
                        <div className="wall_addr">{walletAddr}</div>
                      </div>
                      <div
                        className="notify_icon_cont_div_cont"
                        ref={wrapperRef}
                      >
                        <div
                          className="wallet_settings_icon_cont notify_icon_cont"
                          onClick={ToggleNotifyDiv}
                        >
                          <div className="notify_icon_cont_div">
                            {UnreadNotifications.filter(
                              (data) => data.status === "unread"
                            ).length > 0 ? (
                              <div className="notify_icon_cont_div_notifyCount">
                                {noTifyCount}
                              </div>
                            ) : null}
                            <NotificationsNoneOutlinedIcon className="wallet_settings_icon" />
                          </div>
                        </div>

                        {notifyDiv && (
                          <div className="notifyDropDownDiv">
                            {UnreadNotifications.length <= 0 ? (
                              <div className="notifyDropDownDiv_emptyDiv">
                                No notifications!
                              </div>
                            ) : (
                              <>
                                <div className="notifications_headerTab">
                                  <div
                                    className={
                                      activeNotifyTab === "unread"
                                        ? "notifications_headerTab1_active"
                                        : "notifications_headerTab1"
                                    }
                                    id="unread"
                                    onClick={ToggleActiveNotifyTab}
                                  >
                                    Unread
                                  </div>
                                  <div
                                    className={
                                      activeNotifyTab === "read"
                                        ? "notifications_headerTab1_active"
                                        : "notifications_headerTab1"
                                    }
                                    onClick={ToggleActiveNotifyTab}
                                    id="read"
                                  >
                                    Read
                                  </div>
                                </div>
                                {activeNotifyTab === "read" ? (
                                  <>
                                    {UnreadNotifications.filter(
                                      (data) => data.status === "read"
                                    ).length > 0 ? (
                                      <>
                                        {UnreadNotifications.filter(
                                          (data) => data.status === "read"
                                        )
                                          .sort(
                                            (a, b) =>
                                              new Date(b.createdAt).getTime() -
                                              new Date(a.createdAt).getTime()
                                          )
                                          .map((data, key) => (
                                            <div
                                              className="notifyDropDownDiv_div1"
                                              key={data.id}
                                            >
                                              <div className="notifyDropDownDiv_div1_title">
                                                {data.title}
                                              </div>
                                              <div className="notifyDropDownDiv_div1_para">
                                                {data.message}
                                              </div>
                                            </div>
                                          ))}
                                      </>
                                    ) : (
                                      <div className="notifyDropDownDiv_emptyDiv">
                                        No notifications!
                                      </div>
                                    )}
                                  </>
                                ) : null}

                                {activeNotifyTab === "unread" ? (
                                  <>
                                    {UnreadNotifications.filter(
                                      (data) => data.status === "unread"
                                    ).length > 0 ? (
                                      <>
                                        {UnreadNotifications.filter(
                                          (data) => data.status === "unread"
                                        )
                                          .sort(
                                            (a, b) =>
                                              new Date(b.createdAt).getTime() -
                                              new Date(a.createdAt).getTime()
                                          )
                                          .map((data, key) => (
                                            <div
                                              className="notifyDropDownDiv_div1 active"
                                              key={data.id}
                                              id={data.id}
                                              onClick={ToggleNotifyDetails}
                                            >
                                              <div className="notifyDropDownDiv_div1_title active">
                                                {data.title}
                                                <span
                                                  style={{
                                                    fontSize: "10px",
                                                  }}
                                                >
                                                  - (
                                                  <TimeAgoComponent
                                                    date={data.createdAt}
                                                  />
                                                  )
                                                </span>
                                              </div>
                                              <div className="notifyDropDownDiv_div1_para">
                                                {data.message}
                                              </div>
                                            </div>
                                          ))}
                                      </>
                                    ) : (
                                      <div className="notifyDropDownDiv_emptyDiv">
                                        No notifications!
                                      </div>
                                    )}
                                  </>
                                ) : null}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <div
                        className="wallet_settings_icon_cont"
                        onClick={toggleDisconnectDiv}
                      >
                        <SettingsOutlinedIcon className="wallet_settings_icon" />
                      </div>
                      {disconnetDiv === true ? (
                        <div className="disconnect_button_div">
                          <Authenticate isHome="false" />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="connect_div_dash_head">
                      <Authenticate isHome="false" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isOpen === true ? (
              <div className="mobile_view_header_cont_head_body_dash">
                <div className="mobile_view_header_cont_head_body_cont1">
                  <div className="mobile_view_header_cont_head_body_cont1_title">
                    Balance:
                  </div>
                  <div className="mobile_view_header_cont_head_body_cont1_para">
                    <p className="header_wllt_bal">
                      <AccountBalanceWalletIcon className="header_wllt_bal_icon" />
                      {coinBalance} BNB
                    </p>
                  </div>
                </div>

                <span className="header_rule"></span>
                <div className="mobile_view_header_cont_head_body_cont1">
                  <div className="mobile_view_header_cont_head_body_cont1_title">
                    Account
                  </div>
                  <div className="mobile_view_header_cont_head_body_cont1_para">
                    <div
                      className="metamask_prof_pic_icon"
                      ref={avatarRef}
                    ></div>
                    <div className="wallet_addr_cont_txt_header">
                      <div className="wall_addr">{walletAddr}</div>
                    </div>
                  </div>
                </div>
                <span className="header_rule"></span>
                <div className="mobile_view_header_cont_head_body_cont1">
                  <div className="mobile_view_header_cont_head_body_cont1_title">
                    User
                  </div>
                  <div className="mobile_view_header_cont_head_body_cont1_para">
                    <a
                      href="/app/user"
                      className="wallet_settings_icon_cont notify_icon_cont"
                    >
                      <div className="notify_icon_cont_div">
                        <AccountCircleIcon className="wallet_settings_icon" />
                      </div>
                    </a>
                  </div>
                </div>
                <span className="header_rule"></span>
                <div className="mobile_view_header_cont_head_body_cont1_btn">
                  <Authenticate isHome="false" />
                </div>
              </div>
            ) : null}
          </div>
        </section>
        {urlArr[2] === "market" ? (
          <MarketHeader
            setCategories={setCategories}
            ToggleMobile_cat={ToggleMobile_cat}
            categories={categories}
            ToggleOtherCategory={ToggleOtherCategory}
          />
        ) : null}
        <div className="dash_board_links">
          <div className="container">
            <div className="dash_board_links_area">
              <a
                href="https://facebook.com/martgpt/"
                className="dash_board_links_tab"
              >
                {" "}
                <FacebookRoundedIcon className="socail_links_icon2" />
              </a>
              {/* <a href="" className="dash_board_links_tab">
                {" "}
                <TelegramIcon className="socail_links_icon2" />
              </a> */}
              <a
                href="https://twitter.com/martgpt"
                className="dash_board_links_tab"
              >
                {" "}
                <TwitterIcon className="socail_links_icon2" />
              </a>
              {/* <a href="" className="dash_board_links_tab">
                {" "}
                <span className="medium_icon2">M</span>
              </a> */}
              <a
                href="https://www.linkedin.com/company/martgpt/"
                className="dash_board_links_tab"
              >
                {" "}
                <LinkedInIcon className="socail_links_icon2" />
              </a>
            </div>
          </div>
        </div>
        <div className="header_tabs2">
          <a
            id="home"
            href="/app"
            className={
              activeBg == "home" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <HomeIcon className="sidebarIcon" />
            Home
          </a>

          <a
            id="stake"
            href="/app/staking/egc"
            className={
              activeBg == "stake" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <LockClockIcon className="sidebarIcon" />
            Stake
          </a>
          <a
            id="swap"
            href="/app/swap"
            className={
              activeBg == "swap" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <SwapHorizontalCircleIcon className="sidebarIcon" />
            Swap
          </a>
          <a
            id="sell"
            href="/app/sell"
            className={
              activeBg == "sell" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <SellIcon className="sidebarIcon" />
            Sell
          </a>

          <a
            id="market"
            href="/app/market"
            className={
              activeBg == "market" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <StorefrontIcon className="sidebarIcon" />
            Market
          </a>
        </div>
        {/* =============''''''''' */}
        {/* =============''''''''' */}
        {/* =============''''''''' */}

        {/* ========== */}
        {/* ========== */}
        {/* ========== */}
        {connectId == true ? (
          <div className="right_network_id_modal_div">
            <div className="right_network_id_modal_cont">
              {/* <div className="close_chain_icon_cont">
              <CloseIcon
                className="close_chain_icon"
                onClick={() => {
                  setConnectId(!connectId);
                }}
              />
            </div> */}
              <div className="change_network_img">
                <img
                  src="/img/smart_chain_id_change_image.svg"
                  alt=""
                  className="chain_id_img"
                />
              </div>
              Oops, your wallet is not on the right network.
              <span className="right_network_id_modal_cont_para">
                It seems your wallet is running on a different network from
                MartGpt.app. Please click the button below to change your
                network or add the network if it's not added in your wallet.
              </span>
              <div className="change_network_btn_div">
                <button className="changeNetworkBtn" onClick={switchNetwork}>
                  Switch Network
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {/* ========== */}
        {/* ========== */}
        {/* ========== */}
      </div>
      {notificationDetails == ""
        ? null
        : UnreadNotifications.map((data) => (
            <>
              {data.id === notificationDetails ? (
                <div className="notifySeeMoreDiv">
                  <div
                    className="notifySeeMoreDiv_close_div"
                    onClick={() => {
                      setNotificationDetails("");
                    }}
                  ></div>
                  <div className="notifySeeMoreDiv_container">
                    <div className="notifySeeMoreDiv_container_head">
                      {data.title}
                    </div>
                    <div className="notifySeeMoreDiv_container_para">
                      {data.message}
                    </div>
                    <span className="notifySeeMoreDiv_container_time">
                      <TimeAgoComponent date={data.createdAt} />
                    </span>
                    <button
                      className="notifySeeMoreDiv_container_btn"
                      onClick={() => {
                        setNotificationDetails("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ))}
      {otherCategory ? (
        <div className="otherCategoryDiv">
          <div className="otherCategoryDiv_cont">
            <div
              className="otherCategoryDiv_cont_1"
              onClick={ToggleOtherCategory}
            >
              <ArrowBackIcon className="otherCategoryDiv_cont_1_icon" /> Back
            </div>
            <div className="otherCategoryDiv_cont_2_body">
              {categories.slice(4).map((data) => (
                <a
                  href={`/app/market/product/category/${data.product_category}`}
                >
                  <div className="otherCategoryDiv_cont_2_body_category">
                    {data.product_category}
                    <ArrowForwardIcon className="otherCategoryDiv_cont_2_body_category_icon" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {mobile_cat ? (
        <div className="otherCategoryDiv2">
          <div className="otherCategoryDiv_cont">
            <div className="otherCategoryDiv_cont_1" onClick={ToggleMobile_cat}>
              <ArrowBackIcon className="otherCategoryDiv_cont_1_icon" /> Back
            </div>
            <div className="otherCategoryDiv_cont_2_body">
              {categories.map((data) => (
                <a
                  href={`/app/market/product/category/${data.product_category}`}
                >
                  <div className="otherCategoryDiv_cont_2_body_category">
                    {data.product_category}
                    <ArrowForwardIcon className="otherCategoryDiv_cont_2_body_category_icon" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
//   cart: state.shop.cart,
// });

export default DashboardSideBarMenu2;

// export default connect(mapStateToProps, { retrieveCart })(DashboardSidebar);
