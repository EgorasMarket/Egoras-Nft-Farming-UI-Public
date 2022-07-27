import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../css/dashBoardReferral.css";
import Sparkline2 from "../../static/Sparkline2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TollIcon from "@mui/icons-material/Toll";
import GroupsIcon from "@mui/icons-material/Groups";
const DashboardReferral = () => {
  const [activeLink, setActiveLink] = useState("");
  const [comingSoon, setComingSoon] = useState(false);
  const [copyValue, setCopyValue] = useState("https://egoras.org/ref/2672828");
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
  const leaderBoard = [
    {
      sn: 1,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 60,
      amountEarned: 200,
    },
    {
      sn: 2,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 55,
      amountEarned: 200,
    },
    {
      sn: 3,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 50,
      amountEarned: 200,
    },
    {
      sn: 4,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 40,
      amountEarned: 200,
    },
    {
      sn: 5,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 38,
      amountEarned: 200,
    },
    {
      sn: 6,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 35,
      amountEarned: 200,
    },
    {
      sn: 7,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 30,
      amountEarned: 200,
    },
    {
      sn: 8,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 20,
      amountEarned: 200,
    },
    {
      sn: 9,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 10,
      amountEarned: 200,
    },
    {
      sn: 10,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 8,
      amountEarned: 200,
    },
    {
      sn: 11,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 7,
      amountEarned: 200,
    },
    {
      sn: 12,
      user: "@xamborg",
      address: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      referrals: 4,
      amountEarned: 200,
    },
  ];
  useEffect(() => {
    // setCopyValue(auth.user.user.ref_auth);
  }, []);

  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied Code ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }
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
                <>
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
                        <GroupAddIcon className="stackedCoin_icon" />
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1">
                        <div className="dashBoard_ref_area1_cont1_div1_cont1">
                          Total Referrals
                        </div>
                        <div className="dashBoard_ref_area1_cont1_div1_cont2">
                          57
                        </div>
                      </div>
                      <div className="ref_chart_div">
                        <Sparkline2 values={btc} />
                      </div>
                    </div>
                  </div>

                  <div className="dashBoard_ref_area2">
                    <div className="dashBoard_ref_area2_cont1">
                      <div className="dashBoard_ref_area2_cont1_head">
                        <span className="leaderBoard_icon_div">
                          <MilitaryTechIcon className="leaderBoard_icon" />
                        </span>
                        Leader board
                      </div>
                      <span className="table_hr"></span>
                      <div className="dashBoard_ref_area2_cont1_body">
                        <div className="dashBoard_ref_area2_cont1_body_div_head">
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                            S/N
                          </div>
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1">
                            User
                          </div>
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1">
                            Address
                          </div>
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1">
                            Total Referrals
                          </div>
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                            Amount Earned
                          </div>
                        </div>

                        {leaderBoard.slice(0, 8).map((data) => (
                          <div className="dashBoard_ref_area2_cont1_body_div1">
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                              {data.sn}
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1">
                              {data.user}
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1">
                              {data.address.substring(0, 5) +
                                "..." +
                                data.address.substring(20, 24)}
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1">
                              {data.referrals}
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                              ${data.amountEarned.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="show_more_btn_div">
                        <button className="show_more_btn">Show more</button>
                      </div>
                    </div>
                    <div className="dashBoard_ref_area2_cont2">
                      <div className="dashBoard_ref_area2_cont2_div1">
                        <div className="dashBoard_ref_area2_cont1_head">
                          <span className="leaderBoard_icon_div">
                            <GroupsIcon className="leaderBoard_icon" />
                          </span>
                          My Referrals
                        </div>
                        <span className="table_hr"></span>
                        <div className="dashBoard_ref_area2_cont1_body">
                          <div className="dashBoard_ref_area2_cont1_body_div_head">
                            <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                              User
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                              Address
                            </div>
                          </div>

                          {leaderBoard.slice(0, 5).map((data) => (
                            <div className="dashBoard_ref_area2_cont1_body_div1">
                              <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                                {data.user}
                              </div>
                              <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                                {data.address.substring(0, 5) +
                                  "..." +
                                  data.address.substring(20, 24)}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="show_more_btn_div">
                          <button className="show_more_btn">Show more</button>
                        </div>
                      </div>
                      <div className="dashBoard_ref_area2_cont2_div2">
                        <div className="dashBoard_ref_area2_cont2_div2_head">
                          Copy your referral link and invite friends to earn
                          more.
                        </div>
                        <input
                          type="text"
                          value={copyValue}
                          className="referral_default_value"
                          id="myInput"
                        />
                        <div className="refferal_copy_btns">
                          <button
                            className="ref_btn"
                            onClick={copyText}
                            onMouseOut={outFunc}
                          >
                            Copy referral code
                            <span className="tooltiptext" id="myTooltip"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardReferral;
