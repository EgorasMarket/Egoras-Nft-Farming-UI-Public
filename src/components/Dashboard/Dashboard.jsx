import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard_lend_details_page from "./DashBoard_lend_details_page";
import DashBoardBranchAsset from "./DashBoardPages/DashBoardBranchAsset";
import DashBoardLendingTransactions from "./DashBoardPages/DashBoardLendingTransactions";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "universal-cookie";
import Swap from "./DashBoardPages/Swap/Swap";
import ProductDetailPage from "./DashBoardPages/UpdatedAppPages/DashboardMarket/ProductDetailPage";
import DashBoardUserDetails from "./DashBoardPages/DashBoardUserDetails";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { getAuthUserStats } from "../../actions/token";
import DashboardHome from "./DashBoardPages/DashboardHome";
// dashboard components
// import DashBoardHeader from "./DashBoardHeader";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
import DashboardSideBarMenu2 from "./DashboardSideBarMenu2";
import LoadingIcons from "react-loading-icons";
import DashboardReferral from "./DashBoardPages/DashboardReferral";
// import DashBoardDefaultPage from "./DashBoardPages/DashBoardDefaultPage";
import DashBoardAnalytics from "./DashBoardPages/DashBoardAnalytics";
import DashBoardTransaction from "./DashBoardPages/DashBoardTransaction";
import DashboardGovernance from "./DashBoardPages/DashboardGovernance";
import StakingUpdate from "./DashBoardPages/UpdatedAppPages/StakingUpdate";
import DashboardMarketHome from "./DashBoardPages/UpdatedAppPages/DashboardMarket/DashboardMarketHome";
import { MarketHeader } from "./DashBoardPages/UpdatedAppPages/DashboardMarket/DashboardMarketHome";
// import OpenVaultPage from "./OpenVaultPage.js";
// import OpenVaultPage from "./DashBoardPages/OpenVaultPage";
import OpenVaultPage from "./DashBoardPages/OpenVaultPage";
import DashBoardSellProduct from "./DashBoardPages/UpdatedAppPages/DashBoardSellProduct";
import Deposit_vault_form from "./DashBoardPages/Vault_forms/Deposit_vault_form";
import Top_up_vault_form from "./DashBoardPages/Vault_forms/Top_up_vault_form";
import Withdraw_vault_form from "./DashBoardPages/Vault_forms/Withdraw_vault_form";
import DashBoardSwap from "./DashBoardPages/DashBoardSwapPage";
import DashBoardWhitePaper from "./DashBoardPages/DashBoardWhitePaper";
import { SplashScreen } from "./SplashScreen/SplashScreen";
// import {spla}
import DashboardEgrBalancePage from "./DashBoardPages/DashboardEgrBalancePage";
// import DashBoardHeader from "./DashBoardHeader";
import DashboardAddLiquidtyPage from "./DashBoardPages/DashboardAddLiquidtyPage";
// dashboard styles
import "../../css/dashboard.css";
import DashBoardLendPage from "./DashBoardPages/DashBoardLendPage";
import { KycStatusTypes } from "../../utils/StatusTypes";
// const CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };
const Dashboard = ({ check, togglemakeDark }) => {
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
  const [splashScreen, setSplashScreen] = useState(true);
  const [promptDiv, setPropmtDiv] = useState(false);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");

  useEffect(() => {
    // //console.log(isAuthenticated,'77777');
    setSplashScreen(true);
    // //console.log('trueee');
    const timer = setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  }, []);
  useEffect(() => {
    if (currentPage === "/app/stake/vault/" + urlArr[4] + "/ENGN") {
      setSplashScreen(false);
    }
    if (currentPage === "/app/stake/deposit_vault/" + urlArr[4] + "/ENGN") {
      setSplashScreen(false);
    }
  }, []);

  useEffect(() => {
    if (account) {
      localStorage.setItem("myName", account);
      localStorage.setItem("WA_ST", account);
      console.log(account);
      console.log(localStorage.getItem("myName"), "myName");
      console.log(localStorage.getItem("WA_ST"), "wa_st");
      // console.log("my Name");
    }
  }, [account]);

  const cookies = new Cookies();
  // const current = new Date();
  const nextMinute = new Date();
  // nextMinute.setSeconds(nextMinute.getSeconds() + 20);
  nextMinute.setSeconds(nextMinute.getSeconds() + 86400);
  const togglePromptDiv = () => {
    // check if the cookie still exist
    setPropmtDiv(() => false);
    if (cookies.get("myCookie")) {
      return;
    }
    cookies.set("myCookie", true, {
      path: "/",
      expires: nextMinute,
    });
  };

  const FirstCheckKyc = async () => {
    // check if cookie get data for the variable
    if (cookies.get("myCookie")) {
      console.log("nothing to do yet");
      return;
    }
    let response = await getAuthUserStats(account);
    const payload = response.message.data.payload;
    console.log(payload, "pay=========");
    console.log(payload.kyc_status, "pay=========");
    //  if (payload == null) {
    //    setPropmtDiv(() => true);
    //  } else {
    //    if (payload.kyc_staus === "COMPLETED") {
    //      setPropmtDiv(() => false);
    //    } else {
    //      setPropmtDiv(() => true);
    //    }
    //  }
    if (payload == null || payload.kyc_status !== KycStatusTypes.COMPLETED) {
      setPropmtDiv(() => true);
      return;
    }
    setPropmtDiv(() => false);
  };
  useEffect(() => {
    if (account) {
      FirstCheckKyc();
    }
  }, [account]);
  const relocateToOnborad = () => {
    window.location.href = "/app";
    setPropmtDiv(() => false);
    if (cookies.get("myCookie")) {
      return;
    }
    cookies.set("myCookie", true, {
      path: "/",
      expires: nextMinute,
    });
  };
  return (
    <>
      {splashScreen === true ? (
        <SplashScreen />
      ) : (
        <Router>
          {/* <DashBoardHeader /> */}
          {/* <DashBoardHeader /> */}
          <div className="dashboard">
            <img
              src="/img/contourLinesLight.svg"
              alt=""
              className="joinCooperativeDiv_lines"
            />
            <>
              {" "}
              {/* <DashboardSideBarMenu
                check={check}
                togglemakeDark={togglemakeDark}
              /> */}
              <DashboardSideBarMenu2
                check={check}
                togglemakeDark={togglemakeDark}
              />
              {urlArr[2] === "market" ? <MarketHeader /> : null}
              <Switch>
                <Route exact path="/app/stake" component={DashBoardAnalytics} />
                {/* <Route exact path="/app/swap" component={DashBoardSwap} /> */}
                {/* <Route exact path="/app/swap" component={DashBoardSwap} /> */}
                <Route
                  exact
                  path="/app/staking/egc"
                  component={StakingUpdate}
                />
                <Route
                  exact
                  path="/app/sell"
                  component={DashBoardSellProduct}
                />
                <Route
                  exact
                  path="/app/stake/vault/:asset/:base"
                  component={OpenVaultPage}
                />
                {/*  */}
                {/* <Route
            exact
            path="/deposit_vault/:asset/:base"
            component={Withdraw_vault_form}
          /> */}
                {/* <Route
            exact
            path="/app/add"
            component={DashboardAddLiquidtyPage}
          /> */}
                <Route
                  exact
                  path="/app/governance"
                  component={DashboardGovernance}
                />
                <Route
                  exact
                  path="/app/market/product/details/:address/:name"
                  component={ProductDetailPage}
                />
                <Route
                  exact
                  path="/app/earn/pool/:branchAddress/detail"
                  component={DashBoard_lend_details_page}
                />
                <Route
                  exact
                  path="/app/earn/pool/detail/branch/:branchAddress/asset"
                  component={DashBoardBranchAsset}
                />
                <Route exact path="/app/swap" component={Swap} />
                <Route
                  exact
                  path="/app/user"
                  component={DashBoardUserDetails}
                />
                <Route
                  exact
                  path="/app/earn/pool/detail/:branchAddress/transactions"
                  component={DashBoardLendingTransactions}
                />
                <Route
                  exact
                  path="/app/governance/details"
                  component={DashboardEgrBalancePage}
                />
                <Route
                  exact
                  path="/app/user/referral"
                  component={DashboardReferral}
                />
                <Route exact path="/app/earn" component={DashBoardLendPage} />
                <Route
                  exact
                  path="/app/market"
                  component={DashboardMarketHome}
                />
                <Route exact path="/app" component={DashboardHome} />
                <Route exact path="/app/" component={DashboardHome} />
                {/* <Route exact path="/app" component={DashBoardLendPage} />
                <Route exact path="/app/" component={DashBoardLendPage} /> */}
                <Route
                  exact
                  path="/app/transaction"
                  component={DashBoardTransaction}
                />
                <Route
                  exact
                  path="/app/whitepaper"
                  component={DashBoardWhitePaper}
                />

                {/* <Route exact path="/app/vault">
            <OpenVaultPage />
          </Route> */}
              </Switch>
            </>
            {/* <img src="/img/dash_boardBg.svg" alt="" className="dash_boardBg" /> */}
            {promptDiv == true ? (
              <div className="goDoKycDiv">
                <div className="goDoKycDiv_container">
                  <img
                    src="/img/sorry_icon.svg"
                    alt=""
                    className="goDoKycDiv_container_img"
                  />
                  <div className="goDoKycDiv_container_head">Welcome Bonus</div>

                  <div className="goDoKycDiv_container_para2">
                    Onboard as a user and complete your kyc verification to
                    access our welcome bonus and participate in the referral
                    contest.
                  </div>

                  <div className="goDoKycDiv_container_btn_div">
                    <button
                      onClick={relocateToOnborad}
                      className="goDoKycDiv_container_btn"
                    >
                      Onboard as a user
                    </button>
                  </div>
                  <CloseIcon
                    className="close_goDoKycDiv_cont"
                    onClick={togglePromptDiv}
                  />
                </div>
                {/* <div className="close_goDoKycDiv_cont"> */}
                {/* </div> */}
              </div>
            ) : null}
          </div>
        </Router>
      )}
    </>
  );
};

export default Dashboard;
