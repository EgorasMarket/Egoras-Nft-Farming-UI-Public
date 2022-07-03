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
// dashboard styles
import "../../css/dashboard.css";
import DashBoardLendPage from "./DashBoardPages/DashBoardLendPage";
function Dashboard() {
  const [gettingReady, setGettingReady] = useState(true);
  return (
    <Router>
      {/* <DashBoardHeader /> */}
      {/* <DashBoardHeader /> */}
      <div className="dashboard">
        {gettingReady === true ? (
          <div className="hold_On_div">
            <div className="hold_On_div_div_txt">
              Please hold on for a while...{" "}
              <span className="hold_On_div_div_txt_para">
                We are getting things ready.
              </span>
            </div>
          </div>
        ) : null}

        <DashboardSideBarMenu />
        <Switch>
          <Route exact path="/dashboard" component={DashBoardAnalytics} />
          {/* <Route exact path="/dashboard/swap" component={DashBoardSwap} /> */}
          {/* <Route exact path="/dashboard/swap" component={DashBoardSwap} /> */}
          <Route exact path="/vault/:asset/:base" component={OpenVaultPage} />
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
            path="/dashboard/lend/pool/:branchAddress/detail"
            component={DashBoard_lend_details_page}
          />
          <Route
            exact
            path="/dashboard/lend/pool/detail/branch/:branchAddress/asset"
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
            path="/dashboard/lend/pool/detail/:branchAddress/transactions"
            component={DashBoardLendingTransactions}
          />
          <Route
            exact
            path="/dashboard/governance/details"
            component={DashboardEgrBalancePage}
          />
          <Route exact path="/dashboard/lend" component={DashBoardLendPage} />
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

          {/* <Route exact path="/dashboard/vault">
            <OpenVaultPage />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
