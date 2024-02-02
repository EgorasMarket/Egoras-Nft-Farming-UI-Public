import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SplashScreen } from "../Dashboard/SplashScreen/SplashScreen";
import AdminSideBar from "./AdminSideBar";
import DashboardHome from "../Dashboard/DashBoardPages/DashboardHome";
import AdminModifyMembership from "./AdminPages/AdminModifyMembership";
import AdminProcurreProduct from "./AdminPages/AdminProcurreProduct";
import { CALL_VERIFY_ADMIN_WALLET } from "../../services/adminServices";
import { useWeb3React } from "@web3-react/core";
import { Warning } from "@mui/icons-material";
import AdminSettings from "./AdminPages/AdminSetRouter/AdminSettings";
import AdminSwapSettings from "./AdminPages/AdminExchange/AdminSwapSettings";
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
  useEffect(() => {
    fetchData();
  }, [account]);

  return (
    <>
      {splashScreen === true ? (
        <SplashScreen />
      ) : (
        <Router>
          {adminStatus === true ? (
            <div className="dashboard">
              <AdminSideBar check={check} togglemakeDark={togglemakeDark} />
              <Switch>
                <Route exact path="/admin" component={DashboardHome} />
                <Route
                  exact
                  path="/admin/upload/procurrement"
                  component={AdminProcurreProduct}
                />
                <Route
                  exact
                  path="/admin/modify/membership_plan"
                  component={AdminModifyMembership}
                />
                <Route
                  exact
                  path="/admin/dex/settings"
                  component={AdminSwapSettings}
                />
                <Route exact path="/admin/settings" component={AdminSettings} />
              </Switch>
            </div>
          ) : (
            <div className="dashboard">
              <AdminSideBar check={check} togglemakeDark={togglemakeDark} />
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
