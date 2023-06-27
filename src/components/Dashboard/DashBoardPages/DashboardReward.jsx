import React, { useState, useEffect } from "react";
import { parseEther, formatEther } from "@ethersproject/units";
import Web3 from "web3";
import Lottie from "lottie-react";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import fillupJarIcon from "../../../LottieFiles/loadingIcon/FillupJar.json";
import UserDetailsLinks from "./UserDetailsLinks";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Blockies from "react-blockies";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
import { CheckUserRewardStats } from "../../../web3/index2";
const { REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS } = process.env;
const DashboardReward = () => {
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
  const [activeLink, setActiveLink] = useState("");

  useEffect(async () => {
    if (account) {
      const response = await CheckUserRewardStats(
        account,
        0,
        library.getSigner()
      );
      console.log(response);
      console.log(
        formatEther(response.message.allUserActivity).toString(),
        "allUserActivity "
      );
      console.log(
        formatEther(response.message.currentAllActivity).toString(),
        "currentAllActivity"
      );
      console.log(
        formatEther(response.message.currentPeriod).toString(),
        "currentPeriod"
      );
      console.log(
        formatEther(response.message.userActivity).toString(),
        "userActivity"
      );
      console.log(
        formatEther(response.message.userTotalRewardRecieved).toString(),
        "userTotalRewardRecieved"
      );
    }
  }, [account]);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
      return;
    }
    if (currentPage === "/app/user/reward") {
      setActiveLink("reward");
      return;
    }
    if (currentPage === "/app/user/referral") {
      setActiveLink("referral");
      return;
    }
    if (currentPage === "/app/user/sales") {
      setActiveLink("sales");
      return;
    }
    if (currentPage === "/app/user/p2p_sales") {
      setActiveLink("p2p");
      return;
    }
  });
  function generateRandomWalletAddress() {
    // Generate a random hexadecimal string for the wallet address
    const characters = "0123456789abcdef";
    let walletAddress = "0x";
    for (let i = 0; i < 40; i++) {
      walletAddress +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    return walletAddress;
  }

  function generateRandomUserActivity() {
    // Generate a random user activity value between 0 and 500
    return Math.floor(Math.random() * 501);
  }

  function generateRandomAmountEarned() {
    // Generate a random amount earned value between 0 and 1000
    return Math.random() * 1000;
  }

  const arrayOfObjects = [];

  for (let i = 0; i < 100; i++) {
    const obj = {
      walletAddress: generateRandomWalletAddress(),
      userActivity: generateRandomUserActivity(),
      amountEarned: generateRandomAmountEarned(),
    };
    arrayOfObjects.push(obj);
  }
  console.log(arrayOfObjects);

  return (
    <div className="other2 asset_other2">
      <section className=" no-bg no_paddd ">
        <div className="container relative">
          <div className="pool_deatail_area">
            <UserDetailsLinks activeLink={activeLink} />
            <div className="dashboardRewardArea1">
              <div className="dashboardRewardArea1_div1">
                <div className="dashboardRewardArea1_div1_title">
                  Join activities and earn.
                </div>
                <div className="dashboardRewardArea1_div1_para">
                  <span className="dashboardRewardArea1_div1_para_span">
                    Grab
                  </span>{" "}
                  the rewards before they run out!
                </div>
                <div className="dashboardRewardArea1_div1_icon_div">
                  <QuizOutlinedIcon className="dashboardRewardArea1_div1_icon" />
                </div>
              </div>
              <div className="dashboardRewardArea1_div2">
                <img
                  src="/img/rewardHeroImg.png"
                  alt=""
                  className="dashboardRewardArea1_div2_img"
                />
              </div>
              <img
                src="/img/rewardDashboardBg.svg"
                alt=""
                className="dashboardRewardArea1_bg"
              />
            </div>
            <div className="customedhr">
              <hr /> <span className="customedhr_span">User Stats</span>
              <hr />
            </div>
            <div className="dashboardRewardArea3">
              <div className="dashboardRewardArea3_area1">
                <div className="dashboardRewardArea3_area1_title ">
                  MartGpt Rewards
                </div>
                <div className="dashboardRewardArea3_area1_para ">
                  Stake your mgptt rewards to earn eusd in 6months.
                </div>
              </div>
              <div className="dashboardRewardArea3_area2">
                <div className="dashboardRewardArea3_area2_area1">
                  <div className="dashboardRewardArea3_area2_area1_cont1">
                    <Lottie
                      animationData={fillupJarIcon}
                      loop={true}
                      autoPlay={true}
                      className="reward_lottie_icon"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </div>
                  <div className="dashboardRewardArea3_area2_area1_cont2">
                    200
                  </div>
                </div>
                <div className="dashboardRewardArea3_area2_area2">
                  <button className="dashboardRewardArea3_area2_area2_btn">
                    Stake Rewards
                  </button>
                </div>
              </div>
              <div className="transactions_buttons_div">
                <div className="transactions_buttons_div_1">Transactions</div>
                <div className="transactions_buttons_div_1b">Stats</div>
              </div>
            </div>
            <div className="customedhr">
              <hr /> <span className="customedhr_span">Leader Board</span>
              <hr />
            </div>
            <div className="dashboardRewardArea2">
              <div className="dashboardRewardArea2_area">
                <table className="rewardTable_table">
                  <thead className="rewardTable_titles">
                    <tr className="rewardTable_title_div">
                      <th className="rewardTable_heading_titles rewardTable_heading_titles_first">
                        Rank
                      </th>
                      <th className="rewardTable_heading_titles">User</th>
                      <th className="rewardTable_heading_titles">
                        User Activity
                      </th>
                      <th className="rewardTable_heading_titles rewardTable_heading_titles_last">
                        Amounts Earned
                      </th>
                    </tr>
                  </thead>

                  <tbody className="rewardTable_body" id="popular-categories">
                    {arrayOfObjects
                      .sort((a, b) => b.amountEarned - a.amountEarned)
                      .map((data, index) => (
                        <tr className="rewardTable_body_row ">
                          <td className="rewardTable_body_row_data rewardTable_body_row_data_first  ">
                            {index == 0 ? (
                              <MilitaryTechIcon
                                style={{ color: "#e0ac01" }}
                                className="rewardTable_body_row_data_first_icon"
                              />
                            ) : index == 1 ? (
                              <MilitaryTechIcon
                                style={{ color: "#C0C0C0" }}
                                className="rewardTable_body_row_data_first_icon"
                              />
                            ) : index == 2 ? (
                              <MilitaryTechIcon
                                style={{ color: "#CD7F32" }}
                                className="rewardTable_body_row_data_first_icon"
                              />
                            ) : (
                              <MilitaryTechIcon
                                style={{ color: "#61607d" }}
                                className="rewardTable_body_row_data_first_icon"
                              />
                            )}
                            {index + 1}
                          </td>
                          <td className="rewardTable_body_row_data">
                            <div className="rewardTable_body_row_data_address_div">
                              <Blockies
                                seed={data.walletAddress}
                                size={8}
                                scale={4}
                                className="blockies_icon"
                              />
                              {`${data.walletAddress.slice(
                                0,
                                6
                              )}...${data.walletAddress.slice(39, 42)}`}
                            </div>
                          </td>
                          <td className="rewardTable_body_row_data">
                            {data.userActivity}
                          </td>
                          <td className="rewardTable_body_row_data rewardTable_body_row_data_last  ">
                            <div className="rewardTable_body_row_data_last_div">
                              <img
                                src="/img/martgpt_logo_icon.svg"
                                alt=""
                                className="rewardTable_body_row_data_last_icon"
                              />
                              {parseFloat(data.amountEarned).toFixed(2)}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardReward;
