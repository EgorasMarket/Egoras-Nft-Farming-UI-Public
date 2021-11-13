import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// dashboard components
// import DashBoardHeader from "./DashBoardHeader";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
// import DashBoardDefaultPage from "./DashBoardPages/";
// import DashBoardAnalytics from "./DashBoardPages/DashBoardAnalytics";
// import DashBoardTransaction from "./DashBoardPages/DashBoardTransaction";
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
          {/* <Route exact path="/dashboard/lending">
            <DashBoardDefaultPage />
          </Route> */}
          <Route exact path="/dashboard/swap">
            <DashBoardSwap />
          </Route>
          <Route exact path="/dashboard/vault">
            <OpenVaultPage />
          </Route>
          {/* <Route exact path="/dashboard/vault">
            <OpenVaultPage />
          </Route> */}
          <Route exact path="/dashboard/governance">
            <DashboardGovernance />
          </Route>
          <Route exact path="/dashboard/governance/details">
            <DashboardEgrBalancePage />
          </Route>
          {/* <Route exact path="/dashboard/transaction">
            <DashBoardTransaction />
          </Route> */}
          <Route exact path="/dashboard/whitepaper">
            <DashBoardWhitePaper />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
