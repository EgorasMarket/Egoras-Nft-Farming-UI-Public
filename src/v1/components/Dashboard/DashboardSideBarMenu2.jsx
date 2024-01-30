import React, { useState, useEffect, useRef } from "react";
import { CALL_CHECK_USER_AND_MEMBERSHIP } from "../../services/userServices";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CloseIcon from "@mui/icons-material/Close";
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// ================
// import Web3 from "web3";
import axios from "axios";
import { API_URL } from "../../actions/types";
import { config } from "../../actions/Config";
import Marquee from "react-fast-marquee";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Web3 from "web3";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Sling as Hamburger } from "hamburger-react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LockClockIcon from "@mui/icons-material/LockClock";
import jazzicon from "@metamask/jazzicon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Authenticate } from "../auth/Authenticate";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import "../../css/dashboardheader.css";
import "../../css/dashBoardSideBar.css";
import { numberWithCommas } from "../../static";
import SwitchToggle2 from "./DashBoardPages/SwitchToggle/SwitchToggle2";
import { useWeb3React } from "@web3-react/core";
import { socket } from "../../socket";
import TimeAgoComponent from "../TimeAgoComponent";

const DashboardSideBarMenu2 = ({ check, togglemakeDark }) => {
  const dddd = localStorage.getItem("smallSidetoken");
  const [connectId, setConnectId] = useState(false);
  const [activeBg, setActiveBg] = useState("home");
  const [catDiv, setCatDiv] = useState("not_home");
  const [smallSide, setSmallSide] = useState(dddd);
  const [isOpen, setIsOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [acctNav, setAcctNav] = useState(false);
  const [activeMenuName, setActiveMenuName] = useState("Markets");
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [UnreadNotifications, setUnreadNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState(false);
  const [mobile_cat, setMobile_cat] = useState(false);
  const [noTifyCount, setNotifyCount] = useState(0);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [connectNewAccountBtn, setConnectNewAccountBtn] = useState(false);
  const [disconnetDiv, setDisconnectDiv] = useState(false);
  const [egcUsdVal, setEgcUsdVal] = useState(0);
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const [notifyDiv, setNotifyDiv] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState("");
  const [activeNotifyTab, setActiveNotifyTab] = useState("unread");
  const [memberStatus, setMemberStatus] = useState(false);

  const linksActive = window.location.pathname;
  const urlArr = linksActive.split("/");
  const wrapperRef = useRef(null);
  const context = useWeb3React();
  const { connector, account } = context;
  const avatarRef = useRef();
  const toggleAccountNav = () => {
    if (acctNav === true) {
      setAcctNav(false);
    } else if (acctNav === false) {
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
    if (linksActive === "/app/convert") {
      setActiveMenuName("convert");
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
    if (linksActive === "/app/" + urlArr[2]) {
      setActiveMenuName("govern");
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
    if (linksActive === "/app/products") {
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
    if (linksActive === "/app/convert") {
      setActiveBg("convert");
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
    if (linksActive === "/app/governance") {
      setActiveBg("govern");
    }
    if (
      linksActive ===
      "/app/governance/proposal/details/" +
        urlArr[5] +
        "/" +
        urlArr[6] +
        "/" +
        urlArr[7]
    ) {
      setActiveBg("govern");
    }
    if (linksActive === "/app/" + urlArr[1]) {
      setActiveBg("govern");
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

    if (smallSide === "not_small") {
      localStorage.setItem("smallSidetoken", "not_small");
    } else {
      localStorage.setItem("smallSidetoken", "smallSide");
    }
  }, []);

  const shrinkAction = () => {
    if (smallSide === "not_small") {
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

  useEffect(async () => {
    if (account) {
      const response = await CALL_CHECK_USER_AND_MEMBERSHIP(account);
      console.log(response.data);
      console.log(response.data.userMembership);
      if (response.data.userMembership === true) {
        setMemberStatus(true);
      } else {
        setMemberStatus(false);
      }
    }
  }, [account]);
  return (
    <>
      <div className={smallSide === "not_small" ? "side" : "small_side"}>
        <div className="header_token_prices_div">
          <div className="container-fluid">
            <Marquee
              speed={50}
              pauseOnHover={true}
              gradientColor="[255, 255, 255]"
            >
              <div className="header_token_prices_div_area">
                <div className="header_token_prices_div_area1">
                  1 egc ≈ {numberWithCommas(egcUsdVal.toFixed(2))} USD
                </div>
                <span class="vertical_rule2"></span>
                <div className="header_token_prices_div_area1">
                  1 egc ≈ {numberWithCommas(egcUsdVal.toFixed(2))} eUSD
                </div>
                <span class="vertical_rule2"></span>
                <div className="header_token_prices_div_area1">
                  1 eUSD ≈ 1 USD
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
                  src="/img/egoras-logo.svg"
                  alt="..."
                  className="egr-logo2"
                />
                <img
                  src="/img/logoVideoThumbnail.svg"
                  alt="..."
                  className="egr-logo2dark"
                />

                <div className="on-mobile-navigators"></div>
              </a>
              <div className="egrLogo2Cont3">
                <a href="/">
                  <img
                    src="/img/egoras-logo.svg"
                    alt="..."
                    className="egr-logo"
                  />
                  <img
                    src="/img/logoVideoThumbnail.svg"
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
                    activeBg === "home" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  <DashboardIcon className="header_tab1_icon_icon" />
                  Dashboard
                </a>
                <a
                  id="stake"
                  href="/app/staking/egc"
                  className={
                    activeBg === "stake" ? "header_tab1_active " : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  <LockClockIcon className="header_tab1_icon_icon" />
                  Stake
                </a>

                {/* <a
                  id="convert"
                  href="/app/convert"
                  className={
                    activeBg==="convert"
                      ? "header_tab1_active "
                      : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  <SwapHorizontalCircleIcon className="header_tab1_icon_icon" />
                  Convert
                </a> */}
                <a
                  id="account"
                  href="/app/user"
                  className={
                    activeBg === "account"
                      ? "header_tab1_active "
                      : "header_tab1"
                  }
                  onClick={changeBg}
                >
                  <AccountCircleIcon className="header_tab1_icon_icon" />
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
                  <div className="mobile_view_notifications">
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
                        <div className="notifyDropDownDiv_modal">
                          <div
                            className="closeNotifyModal_div_bg"
                            onClick={ToggleNotifyDiv}
                          ></div>
                          <div className="closeNotifyModal_div">
                            {" "}
                            <CloseIcon
                              className="closeNotifyModal_div_icon"
                              onClick={ToggleNotifyDiv}
                            />
                          </div>
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
                        className={
                          memberStatus === false
                            ? "metamask_prof_pic_icon"
                            : "metamask_prof_pic_icon_vip"
                        }
                        ref={avatarRef}
                      ></div>
                      <div
                        className={
                          memberStatus === false
                            ? "wallet_addr_cont_txt_header"
                            : "wallet_addr_cont_txt_header_vip"
                        }
                      >
                        <div className="wall_addr">{walletAddr}</div>
                        {memberStatus === false ? null : (
                          <img
                            src="/img/membership_icons/membership_icon.svg"
                            alt=""
                            className="wallet_addr_cont_txt_vip_icon"
                          />
                        )}
                      </div>
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
                      className={
                        memberStatus === false
                          ? "metamask_prof_pic_icon"
                          : "metamask_prof_pic_icon_vip"
                      }
                      ref={avatarRef}
                    ></div>
                    <div
                      className={
                        memberStatus === false
                          ? "wallet_addr_cont_txt_header"
                          : "wallet_addr_cont_txt_header_vip"
                      }
                    >
                      <div className="wall_addr">{walletAddr}</div>
                      {memberStatus === false ? null : (
                        <img
                          src="/img/membership_icons/membership_icon.svg"
                          alt=""
                          className="wallet_addr_cont_txt_vip_icon"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* <span className="header_rule"></span>
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
                </div> */}
                <span className="header_rule"></span>
                <div className="mobile_view_header_cont_head_body_cont1_btn">
                  <Authenticate isHome="false" />
                </div>
              </div>
            ) : null}
          </div>
        </section>
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
              activeBg === "home" ? "header_tab1_active " : "header_tab1"
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
              activeBg === "stake" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <LockClockIcon className="sidebarIcon" />
            Stake
          </a>
          <a
            id="account"
            href="/app/user"
            className={
              activeBg === "account" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <AccountCircleIcon className="header_tab1_icon_icon" />
            Account
          </a>

          {/* <a
            id="market"
            href="/app/market"
            className={
              activeBg==="market" ? "header_tab1_active " : "header_tab1"
            }
            onClick={changeBg}
          >
            <StorefrontIcon className="sidebarIcon" />
            Inventory
          </a> */}
        </div>

        {/* <a href="/app/convert" className="convert_tab_mobile">
          <JoinLeftIcon className="convert_tab_mobile_icon" />
          <div className="convert_tab_mobile_txt">Convert</div>
        </a> */}
        {/* =============''''''''' */}
        {/* =============''''''''' */}
        {/* =============''''''''' */}

        {/* ========== */}
        {/* ========== */}
        {/* ========== */}
        {connectId === true ? (
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
                EGODAO.app. Please click the button below to change your network
                or add the network if it's not added in your wallet.
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
      {notificationDetails === ""
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
      {notifyDiv && (
        <div className="notifyDropDownDiv_modal">
          <div
            className="closeNotifyModal_div_bg"
            onClick={ToggleNotifyDiv}
          ></div>
          <div className="closeNotifyModal_div">
            {" "}
            <CloseIcon
              className="closeNotifyModal_div_icon"
              onClick={ToggleNotifyDiv}
            />
          </div>
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
                                  <TimeAgoComponent date={data.createdAt} />)
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
        </div>
      )}
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