import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { SplashScreen } from "./SplashScreen/SplashScreen";
import { SplashScreen } from "../Dashboard/SplashScreen/SplashScreen";
import AdminSideBar from "./AdminSideBar";
// import DashboardSideBarMenu2 from "../Dashboard/DashboardSideBarMenu2";
// import DashBoardLendPage from "../Dashboard/DashBoardPages/DashBoardLendPage";
// import AdminAssets from "./AdminPages/AdminAssets";
// import AdminHome from "./AdminPages/AdminHome.jsx";
// import AdminTransactions from "./AdminPages/AdminTransactions";
import DashboardHome from "../Dashboard/DashBoardPages/DashboardHome";
import AdminSeeSellers from "./AdminPages/AdminSeeSellers";
import AdminStaffPage from "./AdminPages/AdminStaffPage";
import AdminModifyMembership from "./AdminPages/AdminModifyMembership";
import AdminProductsPage from "./AdminPages/AdminProductsPage";
// import AdminMinorPage from "./AdminMinorPage";
// import DashBoardUserDetails from "../Dashboard/DashBoardPages/DashBoardUserDetails";
import PriceOracle from "./AdminPages/AdminSetRouter/PriceOracle";
import SetRouter from "./AdminPages/AdminSetRouter/SetRouter";
import { CALL_VERIFY_ADMIN_WALLET } from "../../services/adminServices";
import {
  useWeb3React,
} from "@web3-react/core";
const Admin = ({ check, togglemakeDark }) => {
  const context = useWeb3React();
  const {
    // connector,
    // library,
    // chainId,
    account,
    // activate,
    // deactivate,
    // active,
    // error,
  } = context;
  const [splashScreen, setSplashScreen] = useState(true);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    setSplashScreen(true);
    const timer = setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  }, []);

  // CALL_VERIFY_ADMIN_WALLET
  useEffect(() => {
    const fetchData = async () => {
      const response = await CALL_VERIFY_ADMIN_WALLET(account);

      console.log(response.data.data.adminStatus);
      if (response.data.data.adminStatus) {
        setAdminStatus(true)
      }
    };

    fetchData();
  }, [account])
  
  return (
    <>
      {splashScreen === true ? (
        <SplashScreen />
      ) : (
        <Router>
          {adminStatus == true ? (
            <div className="dashboard">
            <AdminSideBar check={check} togglemakeDark={togglemakeDark} />
            {/* <AdminHome /> */}
            <Switch>
              <Route exact path="/admin" component={DashboardHome} />
              {/* <Route exact path="/admin/assets" component={AdminAssets} /> */}
              <Route exact path="/admin/sellers" component={AdminSeeSellers} />
              <Route exact path="/admin/staff" component={AdminStaffPage} />
              <Route exact path="/admin/priceOracle" component={PriceOracle} />
              <Route exact path="/admin/setRouter" component={SetRouter} />
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
          ) : null}
          
        </Router>
      )}
    </>
  );
};

export default Admin;
