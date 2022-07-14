import React, { useState, useEffect, useRef, useMemo } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import Web3 from "web3";
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
const DashboardSideBarMenu2 = ({ check, togglemakeDark }) => {
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
  // const web3 = new Web3(window.ethereum);
  // useEffect(async () => {
  //   if (account) {
  //     const getBalance = await web3.eth.getBalance(account);
  //     const ethBalance = web3.utils.fromWei(getBalance, "ether");
  //     console.log(ethBalance);
  //     setCoinBalance(parseFloat(ethBalance).toFixed(3));
  //   }
  // }, [coinBalance, account]);
  const toggleDisconnectDiv = () => {
    setDisconnectDiv(!disconnetDiv);
  };
  return (
    <div className={smallSide == "not_small" ? "side" : "small_side"}>
      <div className="header_token_prices_div">
        <div className="container-fluid">
          <div className="header_token_prices_div_area">
            <div className="header_token_prices_div_area1">1 NGN ~ 618 USD</div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 ENGN ~ 618 USD
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">1 EGC ~ 618 USD</div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">1 EGR ~ 618 USD</div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">1 ENGN ~ 1 NGN</div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGC ~ 61,800 NGN
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGR ~ 0.10 NGN
            </div>
          </div>
        </div>
      </div>
      <section className="DashBoardHeaderSection">
        <div className="container-fluid">
          <div className="dashboard-area">
            <div className="egrLogo2Cont3">
              <a href="/">
                {" "}
                <img
                  src="/img/egoras-logo.svg"
                  alt="..."
                  className="egr-logo"
                />
              </a>
            </div>
            <div className="header_tabs">
              <a
                id="lend"
                href="/dashboard/earn"
                className={
                  activeBg == "lend" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Earn
              </a>

              <a
                id="market"
                href="/dashboard/stake"
                className={
                  activeBg == "market" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Stake
              </a>
              <a
                id="swap"
                href="/dashboard/swap"
                className={
                  activeBg == "swap" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Swap
              </a>
              <a
                id="account"
                href="/dashboard/user"
                className={
                  activeBg == "account" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Account
              </a>
            </div>
            <div className="user_profile_icon_cont2">
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
                    <p className="header_wllt_bal">{coinBalance} BNB</p>
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
            </div>
          </div>
        </div>
      </section>

      <div className="dash_board_links">
        <div className="container">
          <div className="dash_board_links_area">
            <a href="" className="dash_board_links_tab">
              {" "}
              <FacebookRoundedIcon className="socail_links_icon2" />
            </a>
            <a href="" className="dash_board_links_tab">
              {" "}
              <TelegramIcon className="socail_links_icon2" />
            </a>
            <a href="" className="dash_board_links_tab">
              {" "}
              <TwitterIcon className="socail_links_icon2" />
            </a>
            <a href="" className="dash_board_links_tab">
              {" "}
              <span className="medium_icon2">M</span>
            </a>
            <a href="" className="dash_board_links_tab">
              {" "}
              <LinkedInIcon className="socail_links_icon2" />
            </a>
          </div>
        </div>
      </div>
      {/* =============''''''''' */}
      {/* =============''''''''' */}
      {/* =============''''''''' */}

      {/* ========== */}
      {/* ========== */}
      {/* ========== */}
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
//   cart: state.shop.cart,
// });

export default DashboardSideBarMenu2;

// export default connect(mapStateToProps, { retrieveCart })(DashboardSidebar);
