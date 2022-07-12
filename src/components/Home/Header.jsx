import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import WalletConnector from "./WalletConnect/WalletConnector";
// import WalletConnector from "./walletConnect/WalletConnector";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import Web3 from "web3";
import { Authenticate } from "../auth/Authenticate";
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
  // const [darkMode, setDarkMode] = useState(null);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
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
  const lightSet = () => {
    // if (darkMode)
    console.log("light");
    localStorage.setItem("uiMode", "light");
  };

  useEffect(() => {
    const urlArr = currentPage.split("/");
    if (currentPage === "/dashboard/") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/earning") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/earn/pool/" + urlArr[4] + "/detail") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (
      currentPage ===
      "/dashboard/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (
      currentPage ===
      "/dashboard/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/earn") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/earn/pool/detail") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/user") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/swap") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/add") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/earn/pool/detail/branch/asset") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/whitepaper") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/stake") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (currentPage === "/dashboard/stake/vault/" + urlArr[4] + "/ENGN") {
      setshowHeader(false);
      setBetaDiv(false);
    }
    if (
      currentPage ===
      "/dashboard/stake/deposit_vault/" + urlArr[4] + "/ENGN"
    ) {
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
  return (
    <>
      {betaDiv === true ? (
        <div className="we_on_beta_div">
          Welcome to Egoras v2 Beta. If you find any issues please let us know.{" "}
          <a href="">cs@egoras.com</a>
        </div>
      ) : null}

      {showHeader === true ? (
        <div id="Header" className="header_div">
          <section className="headerSection">
            <div className="container header">
              <div className="header-area">
                <a href="/" className="egr_logo2_mobil">
                  <img
                    src="/img/egoras-logo.svg"
                    alt="..."
                    className="egr-logo2"
                  />
                  <div className="on-mobile-navigators"></div>
                </a>
                <ul className="headerLinks">
                  <a href="/">
                    {" "}
                    <img
                      src="/img/egoras-logo.svg"
                      alt="..."
                      className="egr-logo"
                    />
                  </a>
                  {/* <a
                href="/dashboard"
                className={page1 === "/" ? "docs activeLink" : "about"}
                // onClick={clickMe1}
              >
                App <ExitToAppIcon className="exit-to-app" />
                {page1 === "/" ? <span className="Line"></span> : null}
              </a> */}
                </ul>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {/* <a href="/products">Products</a> */}
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
                        check === false
                          ? "darkMode_icon"
                          : "darkMode_icon_active"
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

                  {/* <WalletConnector /> */}
                </div>
                {/* <ul className="headerLinks2">
            <a href="/documents" className="docs">
              Products
            </a>

            <a href="about" className="about">
              Company
              <ArrowDropDownIcon />
            </a>
          </ul> */}
                {/* 
            <ul className="headerButtons">
              <a href="/dashboard" className="connect">
                {" "}
                Launch App <ExitToAppIcon className="exit-to-app" />
              </a>
            </ul> */}
                {/* <img
              src="/img/hamburger-open.svg"
              alt=""
              className="hamburgerOpen"
            /> */}
                {/* <div className="onMobile">
              <Toolbar className="hideNow">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  className={clsx(open && classes.hide)}
                  id="HideAgain"
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <a href="/dashboard" className="connect">
                    {" "}
                    Launch App <ExitToAppIcon className="exit-to-app" />
                  </a>
                </List>
              </Drawer>
            </div> */}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Header;
