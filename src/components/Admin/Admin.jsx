import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { SplashScreen } from "./SplashScreen/SplashScreen";
import { SplashScreen } from "../Dashboard/SplashScreen/SplashScreen";
import AdminSideBar from "./AdminSideBar";
import DashboardSideBarMenu2 from "../Dashboard/DashboardSideBarMenu2";
import DashBoardLendPage from "../Dashboard/DashBoardPages/DashBoardLendPage";
import AdminAssets from "./AdminPages/AdminAssets";
import AdminHome from "./AdminPages/AdminHome.jsx";
import AdminTransactions from "./AdminPages/AdminTransactions";
import DashboardHome from "../Dashboard/DashBoardPages/DashboardHome";
import AdminSeeSellers from "./AdminPages/AdminSeeSellers";
import AdminStaffPage from "./AdminPages/AdminStaffPage";
import AdminModifyMembership from "./AdminPages/AdminModifyMembership";
import AdminProductsPage from "./AdminPages/AdminProductsPage";
// import AdminMinorPage from "./AdminMinorPage";
import DashBoardUserDetails from "../Dashboard/DashBoardPages/DashBoardUserDetails";
const Admin = ({ check, togglemakeDark }) => {
  const [splashScreen, setSplashScreen] = useState(true);
  useEffect(() => {
    setSplashScreen(true);
    const timer = setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  }, []);
  return (
    <>
      {splashScreen === true ? (
        <SplashScreen />
      ) : (
        <Router>
          <div className="dashboard">
            <AdminSideBar check={check} togglemakeDark={togglemakeDark} />
            {/* <AdminHome /> */}
            <Switch>
              <Route exact path="/admin" component={DashboardHome} />
              {/* <Route exact path="/admin/assets" component={AdminAssets} /> */}
              <Route exact path="/admin/sellers" component={AdminSeeSellers} />
              <Route exact path="/admin/staff" component={AdminStaffPage} />
              <Route
                exact
                path="/admin/all/products"
                component={AdminProductsPage}
              />
              {/* <Route
                exact
                path="/admin/transactions"
                component={AdminTransactions}
              /> */}
              <Route
                exact
                path="/admin/modify/membership_plan"
                component={AdminModifyMembership}
              />
            </Switch>
          </div>
        </Router>
      )}
    </>
  );
};

export default Admin;
