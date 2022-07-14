import React, { useState, useEffect, useRef, useMemo } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
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
import SwitchToggle2 from "./DashBoardPages/SwitchToggle/SwitchToggle2";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const DashboardSideBarMenu = ({ check, togglemakeDark }) => {
  const dddd = localStorage.getItem("smallSidetoken");
  const [activeBg, setActiveBg] = useState("market");
  const [catDiv, setCatDiv] = useState("not_home");
  const [smallSide, setSmallSide] = useState(dddd);
  const [cartNum, setCartNum] = useState("");
  const [image, setImage] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [acctNav, setAcctNav] = useState(false);
  const [activeMenuName, setActiveMenuName] = useState("Markets");
  const [showHeader, setshowHeader] = useState(true);
  const [betaDiv, setBetaDiv] = useState(true);
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  // const [darkMode, setDarkMode] = useState(null);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [disconnetDiv, setDisconnectDiv] = useState(false);
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const [productNamesZ, setProductNamesZ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const linksActive = window.location.pathname;
  const urlArr = linksActive.split("/");
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
    setWalletAddr(account);
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
  }, [account, avatarRef]);
  useEffect(() => {
    if (linksActive === "/dashboard") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/dashboard/stake") {
      setActiveMenuName("Stake");
    }
    if (linksActive === "/dashboard/user") {
      setActiveMenuName("Account Details");
    }
    if (linksActive === "/dashboard/swap") {
      setActiveMenuName("Swap");
    }
    if (linksActive === "/dashboard/earn/pool/detail") {
      setActiveMenuName("Earn");
    }
    if (
      linksActive ===
      "/dashboard/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveMenuName("Earn");
    }
    if (
      linksActive ===
      "/dashboard/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/dashboard/earn/pool/" + urlArr[4] + "/detail") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/dashboard/earn/pool/detail/transactions") {
      setActiveMenuName("Earn");
    }
    // if (linksActive === "/dashboard/add") {
    //   setActiveMenuName("Liquidity");
    // }
    if (linksActive === "/dashboard/whitepaper") {
      setActiveMenuName("Whitepaper");
    }
    if (linksActive === "/dashboard/earn") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/dashboard/stake/vault/" + urlArr[4] + "/ENGN") {
      setActiveMenuName("Vault");
    }
    if (
      linksActive ===
      "/dashboard/stake/deposit_vault/" + urlArr[4] + "/ENGN"
    ) {
      setActiveMenuName("Vault");
    }
  });
  useEffect(() => {
    if (linksActive == "/dashboard/products") {
      setSearchBar(true);
    }
  });

  // //console.log(dddd);
  const changeBg = (e) => {
    let currentId = e.currentTarget.id;
    setActiveBg(currentId);
    if (linksActive === "/dashboard/products") {
      setCatDiv("home");
    }
    if (linksActive === "/dashboard/products/categories/id-phone") {
      setActiveBg("products");
      setCatDiv("home");
    }
  };

  useEffect(() => {
    if (linksActive === "/dashboard/stake") {
      setActiveBg("market");
    }
    if (linksActive === "/dashboard") {
      setActiveBg("lend");
    }
    if (linksActive === "/dashboard/") {
      setActiveBg("lend");
    }
    if (linksActive === "/dashboard/earn") {
      setActiveBg("lend");
    }
    if (linksActive === "/dashboard/user") {
      setActiveBg("account");
    }
    if (
      linksActive ===
      "/dashboard/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveBg("lend");
    }
    if (
      linksActive ===
      "/dashboard/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveBg("lend");
    }
    if (linksActive === "/dashboard/earn/pool/" + urlArr[4] + "/detail") {
      setActiveBg("lend");
    }
    if (linksActive === "/dashboard/earn/pool/detail/transactions") {
      setActiveBg("lend");
    }

    if (linksActive === "/dashboard/swap") {
      setActiveBg("swap");
    }
    if (linksActive === "/dashboard/add") {
      setActiveBg("pool");
    }

    if (linksActive === "/dashboard/whitepaper") {
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
  const toggleDisconnectDiv = () => {
    setDisconnectDiv(!disconnetDiv);
  };
  return (
    <div className={smallSide == "not_small" ? "side" : "small_side"}>
      <section className="DashBoardHeaderSection">
        <div className="container-fluid">
          <div className="dashboard-area">
            <div className="egrLogo2Cont3">
              <a href="" alt=""></a>
            </div>

            {/* <Authenticate isHome="false" /> */}

            <div
              className={
                smallSide == "not_small"
                  ? "user_profile_icon_cont"
                  : "small_user_profile_icon_cont"
              }
            >
              <div className="together">
                <div className="toggle_dark_mode_div">
                  <LightModeIcon
                    className={
                      check === false
                        ? "lightMode_icon_active"
                        : "lightMode_icon"
                    }
                  />
                  <SwitchToggle2
                    className="toggle_dark_mode"
                    darkMode={togglemakeDark}
                    checkBox={check}
                  />
                  <DarkModeIcon
                    className={
                      check === false ? "darkMode_icon" : "darkMode_icon_active"
                    }
                  />
                </div>
                {account ? (
                  <div className="connected_header_address">
                    <p className="header_wllt_bal">{coinBalance}</p>
                    <div
                      className="metamask_prof_pic_icon"
                      ref={avatarRef}
                    ></div>

                    <div className="wallet_addr_cont_txt_header">
                      <div className="wall_addr">{walletAddr}</div>
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
                  <Authenticate isHome="false" />
                )}
              </div>

              <div className="welcome_user">
                <span className="welcome_user_txt">{activeMenuName}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =============''''''''' */}
      {/* =============''''''''' */}
      {/* =============''''''''' */}

      {/* ========== */}
      {/* ========== */}
      {/* ========== */}

      <div
        className="sidebar"
        // className={side == "sidebar" ? "not-sidebar" : "sidebar"}
        id="side_bar"
      >
        <div className="sidebarWrapper" id="side_bar_wrapper">
          <div className="sidebarMenu">
            <div
              className={
                smallSide == "not_small"
                  ? "side_bar_head"
                  : "small_side_bar_head"
              }
            >
              <MenuIcon className="menu_icon_toggle" onClick={shrinkAction} />
              <a href="/" alt="">
                <img
                  src="/img/egoras-logo.svg"
                  alt="..."
                  className="egr-logo3cc"
                />
              </a>
            </div>

            {smallSide == "not_small" ? (
              <ul className="sidebarList">
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <a
                  href="/dashboard/earn"
                  id="lend"
                  className="link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "lend"
                        ? "sidebarListItem list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <StarsIcon className="sidebarIcon" />
                    Earn
                  </li>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                <a
                  href="/dashboard/stake"
                  id="market"
                  className="link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "market"
                        ? "sidebarListItem list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <ApprovalIcon className="sidebarIcon" />
                    Stake
                  </li>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                <a
                  href="/dashboard/swap"
                  className="link"
                  id="swap"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "swap"
                        ? "sidebarListItem list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <SwapHorizontalCircleIcon className="sidebarIcon" />
                    Swap
                  </li>
                </a>

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* <Link
                  to="/dashboard/add"
                  className="link"
                  id="pool"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "pool"
                        ? "sidebarListItem list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <OpacityIcon className="sidebarIcon" />
                    liquidity
                  </li>
                </Link> */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                <a
                  href="/dashboard/user"
                  className="link"
                  id="account"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "account"
                        ? "sidebarListItem list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <AccountCircleIcon className="sidebarIcon" />
                    Account
                  </li>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
              </ul>
            ) : (
              <ul className="sidebarList">
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <a
                  href="/dashboard/earn"
                  id="lend"
                  className="link hover_link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "lend"
                        ? "sidebarListItem small_list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <StarsIcon className="sidebarIcon" />
                    Earn
                  </li>
                  <span className="hover_link_txt">Earn</span>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                <a
                  href="/dashboard/stake"
                  id="market"
                  className="link hover_link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "market"
                        ? "sidebarListItem small_list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <ApprovalIcon className="sidebarIcon" />
                    Stake
                  </li>
                  <span className="hover_link_txt">Stake</span>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                <a
                  href="/dashboard/swap"
                  id="swap"
                  className="link hover_link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "swap"
                        ? "sidebarListItem small_list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <SwapHorizontalCircleIcon className="sidebarIcon" />
                    Swap
                  </li>
                  <span className="hover_link_txt">Swap</span>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* <Link
                  to="/dashboard/add"
                  id="pool"
                  className="link hover_link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "pool"
                        ? "sidebarListItem small_list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <OpacityIcon className="sidebarIcon" />
                    Liquidity
                  </li>
                  <span className="hover_link_txt">Liquidity</span>
                </Link> */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                <a
                  href="/dashboard/user"
                  id="account"
                  className="link hover_link"
                  onClick={changeBg}
                >
                  <li
                    className={
                      activeBg == "account"
                        ? "sidebarListItem small_list-item-active"
                        : "sidebarListItem"
                    }
                  >
                    <AccountCircleIcon className="sidebarIcon" />
                    Account
                  </li>
                  <span className="hover_link_txt">Account</span>
                </a>
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}

                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
                {/* ===================== */}
              </ul>
            )}

            <hr className="hrr" />
            <div className="social_handles_cont">
              <div className="social_handles_cont_div">
                <a href="https://www.facebook.com/egorasmarket/">
                  <FacebookRoundedIcon className="socail_links_icon" />
                </a>
                <a href="https://t.me/egorasmarket">
                  <TelegramIcon className="socail_links_icon" />
                </a>
                <a href="https://twitter.com/Egorasmarket?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                  <TwitterIcon className="socail_links_icon" />
                </a>
                <a href="https://ng.linkedin.com/company/egorasmarket">
                  <LinkedInIcon className="socail_links_icon" />
                </a>
                <a href="https://egoras.medium.com/">
                  <span className="medium_icon">M</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
//   cart: state.shop.cart,
// });

export default DashboardSideBarMenu;

// export default connect(mapStateToProps, { retrieveCart })(DashboardSidebar);
