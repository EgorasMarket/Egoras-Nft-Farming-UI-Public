import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Convert from "./DashBoardPages/UpdatedAppPages/Convert";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "universal-cookie";
import DashBoardUserDetails from "./DashBoardPages/DashBoardUserDetails";
import UpdatedSwap from "./DashBoardPages/UpdatedAppPages/UpdatedSwap/UpdatedSwap";
import { useWeb3React } from "@web3-react/core";
import DashBoardGovernanceDetails from "./DashBoardPages/Governance/DashBoardGovernanceDetails";
import DashboardHome from "./DashBoardPages/DashboardHome";
import DashboardSideBarMenu2 from "./DashboardSideBarMenu2";
import DashboardReferral from "./DashBoardPages/DashboardReferral";
import DashboardGovernance from "./DashBoardPages/Governance/DashboardGovernance";
import StakingUpdate from "./DashBoardPages/UpdatedAppPages/StakingUpdate";
import { SplashScreen } from "./SplashScreen/SplashScreen";
import "../../css/dashboard.css";
const Dashboard = ({ check, togglemakeDark }) => {
  const context = useWeb3React();
  const { account } = context;
  const [splashScreen, setSplashScreen] = useState(true);
  const [promptDiv, setPropmtDiv] = useState(false);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");

  useEffect(() => {
    setSplashScreen(true);
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
    }
  }, [account]);

  const cookies = new Cookies();
  const nextMinute = new Date();
  nextMinute.setSeconds(nextMinute.getSeconds() + 86400);
  const togglePromptDiv = () => {
    setPropmtDiv(() => false);
    if (cookies.get("myCookie")) {
      return;
    }
    cookies.set("myCookie", true, {
      path: "/",
      expires: nextMinute,
    });
  };
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
          <div className="dashboard">
            <>
              <DashboardSideBarMenu2
                check={check}
                togglemakeDark={togglemakeDark}
              />
              <Switch>
                <Route
                  exact
                  path="/app/staking/egc"
                  component={StakingUpdate}
                />
                <Route exact path="/app/convert" component={Convert} />
                <Route
                  exact
                  path="/app/governance"
                  component={DashboardGovernance}
                />
                <Route exact path="/app/swap" component={UpdatedSwap} />
                <Route
                  exact
                  path="/app/user"
                  component={DashBoardUserDetails}
                />
                <Route
                  exact
                  path="/app/governance/proposal/details/:id/:address/:name"
                  component={DashBoardGovernanceDetails}
                />
                <Route
                  exact
                  path="/app/user/referral"
                  component={DashboardReferral}
                />
                <Route exact path="/app" component={DashboardHome} />
              </Switch>
            </>
            {promptDiv === true ? (
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
              </div>
            ) : null}
          </div>
        </Router>
      )}
    </>
  );
};

export default Dashboard;
