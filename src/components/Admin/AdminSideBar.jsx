import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Sling as Hamburger } from "hamburger-react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import jazzicon from "@metamask/jazzicon";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Authenticate } from "../auth/Authenticate";
import "../../css/dashboardheader.css";
import "../../css/dashBoardSideBar.css";
import { numberWithCommas } from "../../static";
import SwitchToggle2 from "../Dashboard/DashBoardPages/SwitchToggle/SwitchToggle2";
import { useWeb3React } from "@web3-react/core";
const AdminSideBar = ({ check, togglemakeDark }) => {
  const dddd = localStorage.getItem("smallSidetoken");
  const [connectId, setConnectId] = useState(false);
  const [activeBg, setActiveBg] = useState("market");
  const [smallSide, setSmallSide] = useState(dddd);
  const [isOpen, setIsOpen] = useState(false);
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [disconnetDiv, setDisconnectDiv] = useState(false);
  const [egcUsdVal, setEgcUsdVal] = useState(0);
  const [egrUsdVal, setEgrUsdVal] = useState(0);
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const linksActive = window.location.pathname;
  const urlArr = linksActive.split("/");
  const context = useWeb3React();
  const { account } = context;
  const avatarRef = useRef();

  useEffect(() => {
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

  // //console.log(dddd);
  const changeBg = (e) => {
    let currentId = e.currentTarget.id;
    setActiveBg(currentId);
  };

  useEffect(() => {
    if (linksActive === "/app/stake") {
      setActiveBg("market");
    }
    if (linksActive === "/admin") {
      setActiveBg("lend");
    }
    if (linksActive === "/admin/sellers") {
      setActiveBg("sellers");
    }
    if (linksActive === "/admin/modify/membership_plan") {
      setActiveBg("membership");
    }
    if (linksActive === "/admin/all/products") {
      setActiveBg("products");
    }
    if (linksActive === "/admin/setRouter") {
      setActiveBg("router");
    }
    if (linksActive === "/admin/priceOracle") {
      setActiveBg("priceOracle");
    }
    if (linksActive === "/admin/staff") {
      setActiveBg("transactions");
    }
    if (linksActive === "/admin/") {
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
    if (linksActive === "/admin/settings") {
      setActiveBg("settings");
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
    if (linksActive === "/admin/upload/procurrement") {
      setActiveBg("procurre");
    }
    if (linksActive === "/admin/product/upload") {
      setActiveBg("upload");
    }

    if (linksActive === "/app/swap") {
      setActiveBg("swap");
    }
    if (linksActive === "/app/add") {
      setActiveBg("pool");
    }
    if (linksActive === "/admin/dex/settings") {
      setActiveBg("dex");
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
      const ethBalance = web3.utils.fromWei(getBalance, "ether");
      console.log(ethBalance);
      setCoinBalance(parseFloat(ethBalance).toFixed(3));
    }
  }, [coinBalance, account]);
  const toggleDisconnectDiv = () => {
    setDisconnectDiv(!disconnetDiv);
  };

  useEffect(
    async (e) => {
      let string =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string)
        .then((resp) => resp.json())
        .then((data) => {
          const egr_usd_val = data["egoras"].usd;
          console.log(egr_usd_val);
          setEgrUsdVal(() => egr_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
      // ===============================
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
    [egcUsdVal, egrUsdVal]
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

  const switchNetwork = async () => {
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
  };
  return (
    <div className={smallSide === "not_small" ? "side" : "small_side"}>
      <div className="header_token_prices_div">
        <div className="container-fluid">
          <div className="header_token_prices_div_area">
            <div className="header_token_prices_div_area1">
              1 EGC ~ {numberWithCommas(egcUsdVal.toFixed(2))} USD
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGC ~ {numberWithCommas(egcUsdVal.toFixed(2))} eUSD
            </div>
          </div>
        </div>
      </div>
      <section className="DashBoardHeaderSection">
        <div className="container-fluid">
          <div className="dashboard-area">
            <a href="/" className="egr_logo2_mobil">
              <img src="/img/egoras-logo.svg" alt="..." className="egr-logo2" />
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
            <div className="header_tabs">
              <a
                id="lend"
                href="/admin"
                className={
                  activeBg === "lend" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Home
              </a>
              <a
                id="membership"
                href="/admin/modify/membership_plan"
                className={
                  activeBg === "membership"
                    ? "header_tab1_active "
                    : "header_tab1"
                }
                onClick={changeBg}
              >
                Membership
              </a>
              <a
                id="dex"
                href="/admin/dex/settings"
                className={
                  activeBg === "dex" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Dex
              </a>
              <a
                id="procurre"
                href="/admin/upload/procurrement"
                className={
                  activeBg === "procurre"
                    ? "header_tab1_active "
                    : "header_tab1"
                }
                onClick={changeBg}
              >
                Procurement
              </a>
              <a
                id="upload"
                href="/admin/product/upload"
                className={
                  activeBg === "upload" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Product Upload
              </a>
              <a
                id="settings"
                href="/admin/settings"
                className={
                  activeBg === "settings"
                    ? "header_tab1_active "
                    : "header_tab1"
                }
                onClick={changeBg}
              >
                Settings
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
                      {" "}
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
                    {" "}
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
                  <div className="metamask_prof_pic_icon" ref={avatarRef}></div>
                  {/* <div className="wallet_addr_cont_txt_header"> */}
                  <div className="wall_addr2">{walletAddr}</div>
                  {/* </div> */}
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

      <div className="header_tabs2">
        <a
          id="lend"
          href="/app"
          className={
            activeBg === "lend" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <HomeIcon className="sidebarIcon" />
          Home
        </a>

        <a
          id="sellers"
          href="/admin/sellers"
          className={
            activeBg === "sellers" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <StorageIcon className="sidebarIcon" />
          Sellers
        </a>
        <a
          id="transactions"
          href="/admin/staff"
          className={
            activeBg === "transactions" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <ReceiptLongIcon className="sidebarIcon" />
          Staff
        </a>
        <a
          id="membership"
          href="/admin/modify/membership_plan"
          className={
            activeBg === "membership" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <ReceiptLongIcon className="sidebarIcon" />
          Membership
        </a>
      </div>
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
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
//   cart: state.shop.cart,
// });

export default AdminSideBar;

// export default connect(mapStateToProps, { retrieveCart })(DashboardSidebar);
