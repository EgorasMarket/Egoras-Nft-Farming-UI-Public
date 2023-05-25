import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
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
import { useWeb3React } from "@web3-react/core";
import { Warning } from "@mui/icons-material";
const Admin = ({ check, togglemakeDark }) => {
  const context = useWeb3React();
  const { account } = context;
  const [splashScreen, setSplashScreen] = useState(true);
  const [adminStatus, setAdminStatus] = useState(null);

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
        setAdminStatus(true);
      } else {
        console.log("sss_____sss");
        return <Redirect to="/admin/unauthorized-admin" />;
      }
    };

    fetchData();
  }, [account]);

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
                <Route
                  exact
                  path="/admin/sellers"
                  component={AdminSeeSellers}
                />
                <Route exact path="/admin/staff" component={AdminStaffPage} />
                <Route
                  exact
                  path="/admin/priceOracle"
                  component={PriceOracle}
                />
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
          ) : (
            <div className="dashboard">
              <AdminSideBar check={check} togglemakeDark={togglemakeDark} />
              {/* <AdminHome /> */}

              <div>
                <div className="other2 asset_other2">
                  <section className="collateral-assets-section no-bg no_pad">
                    <div className="container">
                      <div className="lending_area1 unauthorized">
                        <div className="lending_area1_cont1">
                          <div
                            className="lending_area1_cont1_body_1"
                            style={{ margin: "auto" }}
                          >
                            <Warning className="warning-icon" />
                            <div className="lending_area1_cont1_heading">
                              Warning
                            </div>
                            <div className="lending_area1_cont1_body_txt">
                              Unauthorised Access
                            </div>
                            <div className="lending_area1_cont1_heading">
                              You are not authorized to access this page, please
                              leave quietly
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </Router>
      )}
    </>
  );
};

export default Admin;
