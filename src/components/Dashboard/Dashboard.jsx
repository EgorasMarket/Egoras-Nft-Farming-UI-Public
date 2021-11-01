import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// dashboard components
// import DashBoardHeader from "./DashBoardHeader";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
import DashBoardDefaultPage from "./DashBoardPages/DashBoardDefaultPage";
import DashBoardAnalytics from "./DashBoardPages/DashBoardAnalytics";
import DashBoardTransaction from "./DashBoardPages/DashBoardTransaction";
// import DashboardEgrBalancePage from "./DashBoardPages/DashboardEgrBalancePage";
import DashboardGovernance from "./DashBoardPages/DashboardGovernance";
import DashBoardSwap from "./DashBoardPages/DashBoardSwapPage";
import DashBoardWhitePaper from "./DashBoardPages/DashBoardWhitePaper";
import DashboardGovernanceDetails from "./DashBoardPages/DashboardGovernanceDetails.jsx";
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
          <Route exact path="/dashboard/lending">
            <DashBoardDefaultPage />
          </Route>
          <Route exact path="/dashboard/swap">
            <DashBoardSwap />
          </Route>
          <Route exact path="/dashboard">
            <DashBoardAnalytics />
          </Route>
          <Route exact path="/dashboard/governance">
            <DashboardGovernance />
          </Route>
          <Route exact path="dashboard/governance/details">
            <DashboardGovernanceDetails />
          </Route>
          <Route exact path="/dashboard/transaction">
            <DashBoardTransaction />
          </Route>
          <Route exact path="/dashboard/whitepaper">
            <DashBoardWhitePaper />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default Dashboard;
