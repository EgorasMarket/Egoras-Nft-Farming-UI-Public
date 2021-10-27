import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// dashboard components
// import DashBoardHeader from "./DashBoardHeader";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
import DashBoardDefaultPage from "./DashBoardPages/DashBoardDefaultPage";
import DashBoardAnalytics from "./DashBoardPages/DashBoardAnalytics";
import DashBoardTransaction from "./DashBoardPages/DashBoardTransaction";
import DashboardEgrBalancePage from "./DashBoardPages/DashboardEgrBalancePage";
import DashBoardHeader from "./DashBoardHeader";

// dashboard styles
import "../../css/dashboard.css";

function Dashboard() {
  return (
    <Router>
      {/* <DashBoardHeader /> */}
      <DashBoardHeader />
      <div className="dashboard">
        <DashboardSideBarMenu />

        <Switch>
          <Route exact path="/dashboard">
            <DashBoardDefaultPage />
          </Route>
          <Route exact path="/dashboard/airtime">
            <DashBoardAnalytics />
          </Route>
          <Route exact path="/dashboard/transaction">
            <DashBoardTransaction />
          </Route>
          <Route exact path="/dashboard/egr-balance">
            <DashboardEgrBalancePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
