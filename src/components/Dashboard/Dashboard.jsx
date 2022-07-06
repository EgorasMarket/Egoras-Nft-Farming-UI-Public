import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard_lend_details_page from "./DashBoard_lend_details_page";
import DashBoardBranchAsset from "./DashBoardPages/DashBoardBranchAsset";
import DashBoardLendingTransactions from "./DashBoardPages/DashBoardLendingTransactions";
import Swap from "./DashBoardPages/Swap/Swap";
import DashBoardUserDetails from "./DashBoardPages/DashBoardUserDetails";
// dashboard components
// import DashBoardHeader from "./DashBoardHeader";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
import LoadingIcons from "react-loading-icons";
// import DashBoardDefaultPage from "./DashBoardPages/DashBoardDefaultPage";
import DashBoardAnalytics from "./DashBoardPages/DashBoardAnalytics";
import DashBoardTransaction from "./DashBoardPages/DashBoardTransaction";
import DashboardGovernance from "./DashBoardPages/DashboardGovernance";
// import OpenVaultPage from "./OpenVaultPage.js";
// import OpenVaultPage from "./DashBoardPages/OpenVaultPage";
import OpenVaultPage from "./DashBoardPages/OpenVaultPage";
import Deposit_vault_form from "./DashBoardPages/Vault_forms/Deposit_vault_form";
import Top_up_vault_form from "./DashBoardPages/Vault_forms/Top_up_vault_form";
import Withdraw_vault_form from "./DashBoardPages/Vault_forms/Withdraw_vault_form";
import DashBoardSwap from "./DashBoardPages/DashBoardSwapPage";
import DashBoardWhitePaper from "./DashBoardPages/DashBoardWhitePaper";
import DashboardEgrBalancePage from "./DashBoardPages/DashboardEgrBalancePage";
// import DashBoardHeader from "./DashBoardHeader";
import DashboardAddLiquidtyPage from "./DashBoardPages/DashboardAddLiquidtyPage";
import { SplashScreen } from "./SplashScreen/SplashScreen";
// dashboard styles
import "../../css/dashboard.css";
import DashBoardLendPage from "./DashBoardPages/DashBoardLendPage";
// const CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };
function Dashboard() {
  const [gettingReady, setGettingReady] = useState(false);
  const [splashScreen, setSplashScreen] = useState(true);
  useEffect(() => {
    // //console.log(isAuthenticated,'77777');
    setSplashScreen(true);
    // //console.log('trueee');
    const timer = setTimeout(() => {
      setSplashScreen(false);
    }, 5000);
  }, []);

  return (
    <Router>
      {/* <DashBoardHeader /> */}
      {/* <DashBoardHeader /> */}
      <div className="dashboard">
        {splashScreen == true ? (
          <SplashScreen />
        ) : (
          <>
            {" "}
            <DashboardSideBarMenu />
            <Switch>
              <Route exact path="/dashboard" component={DashBoardLendPage} />
              <Route
                exact
                path="/dashboard/stake"
                component={DashBoardAnalytics}
              />
              {/* <Route exact path="/dashboard/swap" component={DashBoardSwap} /> */}
              {/* <Route exact path="/dashboard/swap" component={DashBoardSwap} /> */}
              <Route
                exact
                path="/dashboard/stake/vault/:asset/:base"
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
            path="/dashboard/add"
            component={DashboardAddLiquidtyPage}
          /> */}
              <Route
                exact
                path="/dashboard/governance"
                component={DashboardGovernance}
              />
              <Route
                exact
                path="/dashboard/earn/pool/:branchAddress/detail"
                component={DashBoard_lend_details_page}
              />
              <Route
                exact
                path="/dashboard/earn/pool/detail/branch/:branchAddress/asset"
                component={DashBoardBranchAsset}
              />
              <Route exact path="/dashboard/swap" component={Swap} />
              <Route
                exact
                path="/dashboard/user"
                component={DashBoardUserDetails}
              />
              <Route
                exact
                path="/dashboard/earn/pool/detail/:branchAddress/transactions"
                component={DashBoardLendingTransactions}
              />
              <Route
                exact
                path="/dashboard/governance/details"
                component={DashboardEgrBalancePage}
              />
              <Route
                exact
                path="/dashboard/earn"
                component={DashBoardLendPage}
              />
              <Route
                exact
                path="/dashboard/transaction"
                component={DashBoardTransaction}
              />
              <Route
                exact
                path="/dashboard/whitepaper"
                component={DashBoardWhitePaper}
              />

              {/* <Route exact path="/dashboard/stake/vault">
            <OpenVaultPage />
          </Route> */}
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default Dashboard;
