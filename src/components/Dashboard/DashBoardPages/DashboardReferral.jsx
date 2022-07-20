import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../css/dashBoardReferral.css";
import Sparkline2 from "../../static/Sparkline2";
import TollIcon from "@mui/icons-material/Toll";
const DashboardReferral = () => {
  const [activeLink, setActiveLink] = useState("");
  const [comingSoon, setComingSoon] = useState(true);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/dashboard/user") {
      setActiveLink("poolDetails");
    } else if (currentPage === "/dashboard/user/referral") {
      setActiveLink("referral");
    }
  });
  var btc = [
    {
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 225000,
    },
    {
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 81900,
    },
    {
      timestamp: "2022-07-16T15:09:00.000Z",
      value: 15900,
    },
    {
      timestamp: "2022-07-16T15:20:00.000Z",
      value: 15900,
    },
    {
      timestamp: "2022-07-16T15:44:01.000Z",
      value: 31800,
    },
    {
      timestamp: "2022-07-18T12:40:00.000Z",
      value: 100000,
    },
    {
      timestamp: "2022-07-18T13:56:00.000Z",
      value: 183190,
    },
    {
      timestamp: "2022-07-18T14:25:00.000Z",
      value: 545200,
    },
    {
      timestamp: "2022-07-18T14:59:01.000Z",
      value: 131900,
    },
    {
      timestamp: "2022-07-18T15:39:00.000Z",
      value: 199900,
    },
    {
      timestamp: "2022-07-18T16:11:01.000Z",
      value: 181700,
    },
    {
      timestamp: "2022-07-18T16:27:01.000Z",
      value: 126700,
    },
    {
      timestamp: "2022-07-18T16:46:00.000Z",
      value: 121600,
    },
  ];
  return (
    <>
      <div className="other2 asset_other2">
        {/* get started section start */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* Tokens Section Start */}

        <section className=" no-bg no_paddd">
          <div className="container relative">
            <div className="pool_deatail_area">
              <div className="pool_lending_pages_links">
                <Link
                  to="/dashboard/user"
                  className={
                    activeLink === "poolDetails"
                      ? "pool_lend_details_link_active"
                      : "pool_lend_details_link"
                  }
                >
                  <DashboardIcon className="asset_overview_link_icon" />
                  Pool Details
                </Link>
                <Link
                  to="/dashboard/user/referral"
                  className={
                    activeLink === "referral"
                      ? "pool_lend_details_link_active"
                      : "pool_lend_details_link"
                  }
                >
                  <DashboardIcon className="asset_overview_link_icon" />
                  Refferal
                </Link>
              </div>
              {comingSoon == true ? (
                <div className="comingSoon_div">
                  <div className="comingSoon_div_area">
                    <div className="comingSoon-header">Coming Soon...</div>
                    This Feature is not available yet
                  </div>
                </div>
              ) : (
                <div className="dashBoard_ref_area1">
                  <div className="dashBoard_ref_area1_cont1">
                    <div className="dashBoard_ref_area1_cont1_icon_div">
                      <TollIcon className="stackedCoin_icon" />
                    </div>
                    <div className="dashBoard_ref_area1_cont1_div1">
                      <div className="dashBoard_ref_area1_cont1_div1_cont1">
                        Total Earnings
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1_cont2">
                        $100.00
                      </div>
                    </div>
                    <div className="dashBoard_ref_area1_cont1_div1">
                      <div className="dashBoard_ref_area1_cont1_div1_cont1">
                        Initial Earnings
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1_cont2">
                        $30.00
                      </div>
                    </div>
                    <div className="dashBoard_ref_area1_cont1_div1">
                      <div className="dashBoard_ref_area1_cont1_div1_cont1">
                        Referral Earnings
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1_cont2">
                        $70.00
                      </div>
                    </div>
                  </div>
                  <div className="dashBoard_ref_area1_cont2">
                    <div className="dashBoard_ref_area1_cont1_icon_div">
                      <TollIcon className="stackedCoin_icon" />
                    </div>
                    <div className="dashBoard_ref_area1_cont1_div1">
                      <div className="dashBoard_ref_area1_cont1_div1_cont1">
                        Total Referral
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1_cont2">
                        57
                      </div>
                    </div>
                    <Sparkline2 values={btc} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardReferral;
