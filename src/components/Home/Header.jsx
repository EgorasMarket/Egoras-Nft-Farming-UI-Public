import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import WalletConnector from "./WalletConnect/WalletConnector";
// import WalletConnector from "./walletConnect/WalletConnector";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import clsx from "clsx";
import Web3 from "web3";
import { Authenticate } from "../auth/Authenticate";
import { Sling as Hamburger } from "hamburger-react";
import SwitchToggle2 from "../Dashboard/DashBoardPages/SwitchToggle/SwitchToggle2";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import jazzicon from "@metamask/jazzicon";
import { Web3Provider } from "@ethersproject/providers";
import {
  CALL_CHECK_USER_AND_MEMBERSHIP,
  CALL_ADD_USER_ADDRESS,
} from "../../services/userServices";

// =======================
import { parseEther, formatEther } from "@ethersproject/units";
import List from "@material-ui/core/List";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
} from "../../web3/index.js";
// styles
import "../../css/header.css";
import "../../css/headerMobile.css";
import { AccountBalanceTwoTone } from "@material-ui/icons";
// import Web3 from "web3";
// import { Authenticate } from "../../../auth/Authenticate";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  // dropdown: {
  //   position: "absolute",
  //   top: 28,
  //   right: 0,
  //   left: 0,
  //   zIndex: 1,
  //   border: "1px solid",
  //   padding: theme.spacing(1),
  //   backgroundColor: theme.palette.background.paper,
  // },
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: "relative",
//   },

// }));

const Header = ({ togglemakeDark, check }) => {
  const [showHeader, setshowHeader] = useState(true);
  const [betaDiv, setBetaDiv] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [connectId, setConnectId] = useState(false);
  const [memberStatus, setMemberStatus] = useState(false);
  // const [darkMode, setDarkMode] = useState(null);
  const [walletAddr, setWalletAddr] = useState("0xXXXXXXXXXXxxxxxxxxXXXXXXXX");
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const currentPage = window.location.pathname;
  // if (localStorage.getItem("username") === null) {
  //   //...
  // }

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

  useEffect(() => {
    console.log(account, avatarRef, walletAddr, "pppooooo");
    // setWalletAddr(account);
    // // console.log(walletAddr.slice(0, 10));
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
  }, [account, avatarRef, walletAddr]);
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
  useEffect(() => {
    console.log(account, "pppooooo");
    // setWalletAddr(account);
    // // console.log(walletAddr.slice(0, 10));
    if (account) {
      const fetchData = async () => {
        const response = await CALL_CHECK_USER_AND_MEMBERSHIP(account);
        console.log(response.data);
        if (response.data.userExists == false) {
          const response2 = await CALL_ADD_USER_ADDRESS(account);
          console.log(response2.data);
          // if (response2.data.userExists == false) {
          //   console.log("okkkk");
          // }
        }
      };

      fetchData();
    }
  }, [account]);

  const lightSet = () => {
    // if (darkMode)
    console.log("dark");
    localStorage.setItem("uiMode", "dark");
  };

  useEffect(() => {
    const urlArr = currentPage.split("/");
    if (currentPage === "/app/") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (urlArr[2] === "market") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (urlArr[1] === "app") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/earning") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/user/referral") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/staking/egc") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/market") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/sell") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (
      currentPage ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (urlArr[1] === "admin") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/admin/transactions") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/admin/assets") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (
      currentPage ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/earn") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/earn/pool/detail") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/user") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/user/sales") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/swap") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/add") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/earn/pool/detail/branch/asset") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/whitepaper") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/stake") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/stake/vault/" + urlArr[4] + "/ENGN") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/app/stake/deposit_vault/" + urlArr[4] + "/ENGN") {
      setshowHeader(false);
      setBetaDiv(false);
    }
  });

  // page hide element

  // class change on click functions
  const [page1, setPage1] = useState("/");

  useEffect(() => {
    if (currentPage === "/") {
      setPage1("/");
    } else if (currentPage === "/validator") {
      setPage1("/validator");
    }
  });
  // {
  //   page === "change" ? (
  //   ) : ()}

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // =============
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [disconnetDiv, setDisconnectDiv] = useState(false);
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const [connectNewAccountBtn, setConnectNewAccountBtn] = useState(false);
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const [open12, setOpen12] = React.useState(false);
  const anchorRef12 = React.useRef(null);

  const handleToggle12 = () => {
    setOpen12((prevOpen12) => !prevOpen12);
  };

  const handleClose12 = (event) => {
    if (anchorRef12.current && anchorRef12.current.contains(event.target)) {
      return;
    }

    setOpen12(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen12(false);
    }
  }

  // return focus to the button when we transitioned from !open12 -> open12
  const prevOpen12 = React.useRef(open12);
  React.useEffect(() => {
    if (prevOpen12.current === true && open12 === false) {
      anchorRef12.current.focus();
    }

    prevOpen12.current = open12;
  }, [open12]);

  const [open13, setOpen13] = React.useState(false);
  const anchorRef13 = React.useRef(null);

  const handleToggle13 = () => {
    setOpen13((prevOpen13) => !prevOpen13);
  };

  const handleClose13 = (event) => {
    if (anchorRef13.current && anchorRef13.current.contains(event.target)) {
      return;
    }

    setOpen13(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen13(false);
    }
  }

  // return focus to the button when we transitioned from !open13 -> open13
  const prevOpen13 = React.useRef(open13);
  React.useEffect(() => {
    if (prevOpen13.current === true && open13 === false) {
      anchorRef13.current.focus();
    }

    prevOpen13.current = open13;
  }, [open13]);

  // open dropdown menu
  const dropDownOpen1 = () => {
    // const dropUpIcon = document.getElementById("ArrowUpIcon");
    const dropDownIcon = document.getElementById("ArrowDownIcon");
    const dropMenu = document.getElementById("products-menu");

    dropDownIcon.classList.add("rotate");
    // dropUpIcon.style.display = "inline-block";

    dropMenu.style.display = "block";
  };
  const dropDownClose1 = () => {
    // const dropUpIcon = document.getElementById("ArrowUpIcon");
    const dropDownIcon = document.getElementById("ArrowDownIcon");
    const dropMenu = document.getElementById("products-menu");

    dropDownIcon.classList.remove("rotate");
    // dropUpIcon.style.display = "none";

    dropMenu.style.display = "none";
  };
  // open dropdown menu
  const dropDownOpen2 = () => {
    // const dropUpIcon = document.getElementById("ArrowUpIcon2");
    const dropDownIcon = document.getElementById("ArrowDownIcon2");
    const dropMenu = document.getElementById("products-menu2");

    dropDownIcon.classList.add("rotate");
    // dropUpIcon.style.display = "inline-block";

    dropMenu.style.display = "block";
  };
  const dropDownClose2 = () => {
    // const dropUpIcon = document.getElementById("ArrowUpIcon2");
    const dropDownIcon = document.getElementById("ArrowDownIcon2");
    const dropMenu = document.getElementById("products-menu2");

    dropDownIcon.classList.remove("rotate");
    // dropUpIcon.style.display = "none";

    dropMenu.style.display = "none";
  };
  const web3 = new Web3(window.ethereum);
  useEffect(async () => {
    if (account) {
      const getBalance = await web3.eth.getBalance(account);
      const ethBalance = web3.utils.fromWei(getBalance, "ether");
      console.log(ethBalance);
      setCoinBalance(parseFloat(ethBalance).toFixed(3));
    }
  }, [coinBalance, account]);
  const toggleDisconnectDiv = () => {
    setDisconnectDiv(!disconnetDiv);
  };

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
  return (
    <>
      {betaDiv === true ? (
        <div className="we_on_beta_div">
          We are delighted to welcome you to MartaGPT Beta. Kindly report any
          bugs you encounter to cs@egoras.com.
        </div>
      ) : null}

      {showHeader === true ? (
        <div id="Header" className="header_div">
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
                    {" "}
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
                <div className="user_profile_icon_cont2">
                  <div className="together">
                    <div className="header_menu_icon_con_dash">
                      <Hamburger toggled={isOpen} toggle={setIsOpen} />
                    </div>
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
                  <div className="header_new_links_mobile">
                    <a href="/app/market" className="header_new_links_mobile_1">
                      Inventory
                      <ArrowForwardIosIcon className="header_new_links_mobile_1_icon" />
                    </a>
                  </div>
                  <span className="header_rule"></span>
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
                  <span className="header_rule"></span>
                  <div className="mobile_view_header_cont_head_body_cont1_btn">
                    <Authenticate isHome="false" />
                  </div>
                </div>
              ) : null}
            </div>
          </section>
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
                  {connectNewAccountBtn === true ? (
                    <Authenticate isHome="false" />
                  ) : (
                    <button
                      className="changeNetworkBtn"
                      onClick={switchNetwork}
                    >
                      Switch Network
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Header;
