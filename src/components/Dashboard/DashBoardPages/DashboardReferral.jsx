import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../css/dashBoardReferral.css";
import Web3 from "web3";
import Sparkline2 from "../../static/Sparkline2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TollIcon from "@mui/icons-material/Toll";
import GroupsIcon from "@mui/icons-material/Groups";
import { connect } from "react-redux";
// import { UserContext } from "../context/Context";
import { parseEther, formatEther } from "@ethersproject/units";

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

import axios from "axios";
import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import {
  getUserStats,
  getReferrals,
  getMyReferralsCount,
} from "../../../web3/index";
const DashboardReferral = ({ auth }) => {
  const [activeLink, setActiveLink] = useState("");
  const [comingSoon, setComingSoon] = useState(true);
  const [refEarnings, setRefEarnings] = useState(0.0);
  const [refCount, setRefCount] = useState(0);
  const [welcomeBonus, setWelcomeBonus] = useState(0.0);
  const [copyValue, setCopyValue] = useState("");
  const [address, setAddress] = useState(
    "0x3dE7916840227889UIOC0DA2Bf9A209C3A91d755790FC"
  );
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  const [leaderBoard1, setLeaderBoard] = useState([]);
  const [myReferrals, setMyReferrals] = useState([]);
  const context = useWeb3React();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

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
    axios
      .get(api_url + "/api/user/fetch/top/referals", null, config)
      .then((data) => {
        setLeaderBoard(data.data.allData);
        // console.log(data.data.allData);
        // console.log(leaderBoard);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    console.log(auth);

    if (auth.user != null) {
      // console.log(account, auth.user.payload.ref_code);
      // setCopyValue("https://egoras.org/referal/" + auth.user.payload.ref_code);
      localStorage.setItem("WA_ST", account);
      axios
        .get(api_url + "/api/user/fetch/my/referals/" + account, null, config)
        .then((data) => {
          setMyReferrals(data.data.data);
          console.log(data.data.data);
          // console.log(leaderBoard);
        })
        .catch((err) => {
          console.log(err); // "oh, no!"
        });
    }
  }, [account, auth]);
  // console.log(leaderBoard1);
  // console.log(leaderBoard);

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
  useEffect(
    async (e) => {
      if (account) {
        let response = await getUserStats(account, library.getSigner());
        console.log(response);
        if (response.status === true) {
          const resAmnt = parseFloat(
            formatEther(response.message._referral._hex)
          );
          setRefEarnings(resAmnt);
          console.log(response.message._referral);
        }
      }
    },
    [account]
  );
  useEffect(
    async (e) => {
      if (account) {
        let response = await getUserStats(account, library.getSigner());
        console.log(response);
        if (response.status === true) {
          const resAmnt = parseFloat(formatEther(response.message._wB._hex));
          setWelcomeBonus(resAmnt);
          console.log(response.message._referral);
        }
      }
    },
    [account]
  );
  useEffect(
    async (e) => {
      if (account) {
        let response = await getMyReferralsCount(account, library.getSigner());
        console.log(response);
        if (response.status === true) {
          const resAmnt = formatEther(response.message._hex).toString();
          const pasedResAmnt = parseEther(resAmnt, "wei").toString();
          setRefCount(pasedResAmnt);
          console.log(resAmnt);
          console.log(parseEther(resAmnt, "wei").toString());
          // console.log(
          //   resAmnt.toLocaleString("fullwide", { useGrouping: false })
          // );
          // console.log(web3.utils.toWei(resAmnt.toString(), "ether"));
          // console.log(parseEther(resAmnt.toString(), "wei").toString());
          // console.log(response.message._referral);
        }
      }
    },
    [account]
  );
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
                          {welcomeBonus + refEarnings}{" "}
                          <span className="engn_symbol_sign">Engn</span>
                        </div>
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1">
                        <div className="dashBoard_ref_area1_cont1_div1_cont1">
                          Welcome Bonus
                        </div>
                        <div className="dashBoard_ref_area1_cont1_div1_cont2">
                          {parseFloat(welcomeBonus).toFixed(2)}{" "}
                          <span className="engn_symbol_sign">Engn</span>
                        </div>
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1">
                        <div className="dashBoard_ref_area1_cont1_div1_cont1">
                          Referral Earnings
                        </div>
                        <div className="dashBoard_ref_area1_cont1_div1_cont2">
                          {parseFloat(refEarnings).toFixed(2)}{" "}
                          <span className="engn_symbol_sign">Engn</span>
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
                          {refCount}
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

                        {leaderBoard1.slice(0, 8).map((data) => (
                          <div className="dashBoard_ref_area2_cont1_body_div1">
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                              {"1"}
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div1_cont1">
                              {data.username}
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
                              {/* ${data.amountEarned.toFixed(2)} */}${"1800"}
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

                          {myReferrals.slice(0, 5).map((data) => (
                            <div className="dashBoard_ref_area2_cont1_body_div1">
                              <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                                {data.username}
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

// export default DashboardReferral;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// let  res = await getLogin2(
export default connect(mapStateToProps, {})(DashboardReferral);