import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import DashBoardSwap from "./DashBoardPages/DashBoardSwapPage";
import DashBoardWhitePaper from "./DashBoardPages/DashBoardWhitePaper";
import DashboardEgrBalancePage from "./DashBoardPages/DashboardEgrBalancePage";
// import DashBoardHeader from "./DashBoardHeader";

// dashboard styles
import "../../css/dashboard.css";

function Dashboard() {
  return (
    <Router>
      {/* <DashBoardHeader /> */}
      {/* <DashBoardHeader /> */}
      <div className="dashboard">
        <DashboardSideBarMenu />
        <Switch>
          <Route exact path="/dashboard" component={DashBoardAnalytics} />
          <Route exact path="/dashboard/swap" component={DashBoardSwap} />
          <Route exact path="/vault/:asset/:base" component={OpenVaultPage} />
          <Route
            exact
            path="/dashboard/governance"
            component={DashboardGovernance}
          />
          <Route
            exact
            path="/dashboard/governance/details"
            component={DashboardEgrBalancePage}
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

          {/* <Route exact path="/dashboard/vault">
            <OpenVaultPage />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
