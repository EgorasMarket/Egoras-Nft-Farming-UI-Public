import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import Timer from "./Timer";
import { addDays, format } from "date-fns";
import { Link } from "react-router-dom";
import { CopperLoading } from "respinner";

import { connect } from "react-redux";
import { SuccessModal, ErrorModal } from "./Modal/Success_Error_Component";
import StarRateIcon from "@mui/icons-material/StarRate";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import TollIcon from "@mui/icons-material/Toll";
import { numberWithCommas } from "../../../static";
// import { numberWithCommas } from "../../static/static";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import "../../../css/dashboard_user_details.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Accordion from "../Accordion";
import InventoryIcon from "@mui/icons-material/Inventory";
import Nodata from "./nodataComponent/Nodata";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { config } from "../../../actions/Config";
import { getAuthUserStats } from "../../../actions/token";
import {
  API_URL as api_url,
  PENDING,
  COMPLETED,
  CANCELLED,
} from "../../../actions/types";
// import { numberWithCommas } from "../../static/static";
import { formatDuration, intervalToDuration } from "date-fns";
import { getUserStats } from "../../../web3/index";
// import Web3 from "web3";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  takeDividend,
  getTickerInfo,
  tokenBalance,
  open,
  getNextDate,
  getLatestLoan,
  takeBackLoan,
  repay,
  topup,
  draw,
} from "../../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
const DashBoardUserDetails = ({ auth }) => {
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [welcomeBonus, setWelcomeBonus] = useState(0.0);

  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [userName, setUserName] = useState("******");
  const [kycStatus, setKycStatus] = useState("******");
  const [seemore, setSeemore] = useState(false);
  const [loanEndDate, setLoanEndDate] = useState(new Date());
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [loanAsset, setLoanAsset] = useState([]);
  const [disable, setDisable] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const [base, setBase] = useState("");
  const [text, setText] = useState(
    "Transacting with blockchain, please wait..."
  );
  const [hash, setHash] = useState("");
  const [asset, setAsset] = useState("");
  const [coinBalance2, setCoinBalance2] = React.useState(0.0);
  const [baseBalance, setBaseBalance] = useState(0.0);
  const [tokenBal, setTokenBal] = useState(0.0);
  const [stage, setStage] = useState("redeem");
  const [isLoading, setIsLoading] = useState(false);
  const [UserPoolsDetails, setUserPoolsDetails] = useState({
    lockedBalance: "0.00",
    pool: "0",
  });
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
  //   const { account } = useWeb3React();
  const avatarRef = useRef();
  //   const duration = () => {
  //     intervalToDuration({
  //       start: new Date("2022-07-01T20:15:07.000Z"),
  //       end: new Date(),
  //     });
  //   };

  //   const formnn = formatDuration(duration, {
  //     delimiter: ": ",
  //   });
  //   console.log(formnn);
  useEffect(() => {
    setWalletAddr(account);
    // console.log(walletAddr.slice(0, 10));
    const element = avatarRef.current;
    if (element && account) {
      setWalletAddr(account);
      setConnectTxt("Connected");
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      console.log(addr, seed);
      const icon = jazzicon(60, seed); //generates a size 20 icon
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef]);
  console.log("i am here");
  useEffect(() => {
    if (account) {
      axios
        .get(api_url + "/api/lend/user/account/" + account, null, config)
        .then((data) => {
          console.log(data.data.payload, "powerful333333");
          // console.log(txnhash);
          // setBranches(data.data.payload);
          setUserPoolsDetails({
            lockedBalance: data.data.payload[0].balance,
            pool: data.data.payload[0].pool,
          });
        })
        .catch((err) => {
          console.log(err); // "oh, no!"
        });
      //   return;
    }
  }, [account]);
  useEffect(() => {
    if (account) {
      axios
        .get(api_url + "/api/lend/user/transaction/" + account, null, config)
        .then((data) => {
          console.log(data.data.payload, "powerful333333");
          console.log("/api/lend/user/transaction/" + account);
          setLoanAsset(data.data.payload);
          console.log("====================================");
          console.log(data.data.payload);
          console.log("====================================");

          data.data.payload.map(async (data) => {
            console.log(data.newLoanID);
            let response = await getNextDate(
              data.newLoanID,
              account,
              library.getSigner()
            );
            console.log(response);
            const renst = response.message;
            for (const data of Object.keys(renst)) {
              console.log("okay");
              // console.log(data);
              console.log(renst[data][0]); // 👉️ 'Tom', 30
              // data.message._hex = formatEther(data.message._hex).toString();
            }
            // console.log(response.message);
            console.log(response);

            if (response.status == true) {
              // const resAmnt = parseFloat(formatEther(response.message._hex));
              const resAmnt = formatEther(response.message._hex).toString();
              const rest = response;
              // for (const data of rest) {
              //   data.message._hex = formatEther(data.message._hex).toString();
              // }

              const pasedResAmnt = parseEther(resAmnt, "wei").toString();
              console.log(rest);
              console.log(new Date(1636921519));
            }
            return data.newLoanID;
          });
        })
        .catch((err) => {
          console.log(err); // "oh, no!"
        });
      return;
    }
  }, [account]);

  const toggleSeemore = () => {
    setSeemore(!seemore);
  };

  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  // const ChangeAssetDetailModal = (id) => {
  //   let currentTarget = id;
  //   // let currentTarget2 = e.currentTarget.id;
  //   console.log(currentTarget);
  //   // console.log(e);
  //   // console.log(e.currentTarget);
  //   // console.log(currentTarget2);
  //   setAssetDetailModal(currentTarget);
  // };

  useEffect(() => {
    let assetVal = "EGC";
    let baseVal = "ENGN";
    setAsset(assetVal);
    setBase(baseVal);
    let ticker = assetVal + "-" + baseVal;
    if (account) {
      getTickerInfo(ticker, library.getSigner()).then((data) => {
        if (data.status) {
          tokenBalance(data.message.base, account, library.getSigner()).then(
            (balance) => {
              setBaseBalance(formatEther(balance.message));
            }
          );

          if (asset == "BNB" || asset == "bnb") {
            library
              .getBalance(account)
              .then((balance) => {
                setCoinBalance2(formatEther(balance));
              })
              .catch(() => {
                setCoinBalance2(null);
              });
          } else {
            tokenBalance(data.message.asset, account, library.getSigner()).then(
              (balance) => {
                setCoinBalance2(formatEther(balance.message));
              }
            );
          }
        }
      });
    }
  }, [chainId, account, connector, baseBalance, coinBalance2]);

  console.log(baseBalance);
  console.log(coinBalance2);
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
    } else if (currentPage === "/app/user/referral") {
      setActiveLink("referral");
    }
  });
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
        let response = await getAuthUserStats(account);
        // console.log(response.message.data.payload, "acct acct acct acct ");
        const payload = response.message.data.payload;
        if (payload == null) {
          setUserName(() => "******");
          setKycStatus(() => "******");
        } else {
          if (payload.username == null) {
            setUserName(() => "******");
          } else {
            setUserName(() => payload.username);
          }
          if (payload.kyc_status == null) {
            setKycStatus(() => "******");
          } else {
            setKycStatus(() => payload.kyc_status);
          }
        }

        console.log(payload, "acct acct acct acct ");
      }
    },
    [account]
  );
  const Continue = async (e) => {
    setStage("redeem");
    setText("");
    // setModal(!modal);
    // window.location.reload();
  };
  setInterval(() => {
    if (localStorage.getItem("unlocking") == "true") {
      transactReceipt(localStorage.getItem("unlockingHash"), library).then(
        function (env) {
          // console.log("running Interval", env);
          if (env.status == true && env.message !== null) {
            if (env.message.confirmations > 2) {
              setStage("success");
              setHash(localStorage.getItem("unlockingHash"));
              setIsLoading(false);

              localStorage.setItem("unlocking", false);
            }
          }
        }
      );
    } else {
      // setStage("error");
    }
  }, 1000);
  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className=" no-bg no_paddd ">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="pool_lending_pages_links">
              <Link
                to="/app/user"
                className={
                  activeLink === "poolDetails"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <DashboardIcon className="asset_overview_link_icon" />
                User Details
              </Link>
              <Link
                to="/app/user/referral"
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
            <div className="userdAshboard_head">
              <div className="userdAshboard_head_username">
                <span className="userdAshboard_head_username_head">
                  UserName:
                </span>{" "}
                <span className="userdAshboard_head_username_para">
                  {userName}
                </span>{" "}
              </div>
              <span className="hr_vertical"></span>
              <div className="userdAshboard_head_username">
                <span className="userdAshboard_head_username_head">
                  KYC Status:
                </span>{" "}
                <span className="userdAshboard_head_username_para">
                  {kycStatus}
                </span>{" "}
              </div>
            </div>
            <div className="userdAshboard_head">
              <div className="userdAshboard_head_area">
                <div className="metamask_prof_pic" ref={avatarRef}></div>
                <div className="user_walletAddress">
                  <div className="wallet_addr_cont">
                    <div className="wallet_addr_cont_txt">{walletAddr}</div>

                    <CopyAllIcon className="copy_all_tx_hash_icon" />
                  </div>
                  <span className="connected_txt">{conecttxt}</span>
                </div>
              </div>
              <span className="hr_vertical"></span>
              <div className="welcome_bonus_div">
                <div className="welcome_bonus_div_head">
                  <div className="welcome_bonus_icon_div">
                    <StarRateIcon className="welcome_bonus_icon_div_icon" />
                  </div>
                  Welcome Bonus
                </div>
                <div className="welcome_bonus_div_body">
                  {" "}
                  {numberWithCommas(parseFloat(welcomeBonus).toFixed(2))}
                  <span className="engn_symbol_sign">Engn</span>
                </div>
              </div>
            </div>
            <div className="user_details_body1">
              <div className="user_details_body1_body_cont_area1">
                <div className="user_details_body1_body_cont1_head">
                  User Details
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Your Balance</span>
                  <span>{parseFloat(baseBalance).toFixed(3)} Engn</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Locked Engn in Assets</span>

                  {UserPoolsDetails.lockedBalance === null ? (
                    <span>0.00 Engn</span>
                  ) : (
                    <span>
                      {numberWithCommas(
                        parseInt(UserPoolsDetails.lockedBalance).toFixed()
                      )}{" "}
                      Engn
                    </span>
                  )}
                </div>

                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1_last_layer">
                  <div className="user_details_body1_body_cont1_layer1">
                    <span>Monthly APY (30d APY)</span>
                    <span> 1.5 %</span>
                  </div>
                  <div className="user_details_body1_body_cont1_layer1">
                    <span> Estimated APY (APY)</span>
                    <span> 13.00 %</span>
                  </div>
                </div>
              </div>
              <div className="user_details_body1_body_cont_area1">
                {/* <div className="user_details_body1_body_cont1_head">
                  User Details
                </div>
                <hr class="custom_hr"></hr> */}
                <div className="user_details_body1_body_cont1">
                  <span>Total Transactions</span>
                  <span>{UserPoolsDetails.pool}</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Ongoing Pools</span>
                  <span>0</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Closed Pools</span>
                  <span>0</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Earnings</span>
                  <span>0.00 Engn</span>
                </div>
              </div>
            </div>

            <div className="recent_transaction_body">
              <div className="recent_transaction_body_head" id="transact_head">
                Backed Loans
              </div>

              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}

              <div className="asset_list_desktop_view2">
                <table className="branch_asset_table">
                  <thead className="branch_asset_titles">
                    <tr className="branch_asset_title_div">
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_first">
                        Pool
                      </th>
                      <th className="branch_asset_heading_titles">Date</th>
                      <th className="branch_asset_heading_titles">
                        Amount(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Progess
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funded(Engn)
                      </th>

                      <th className="branch_asset_heading_titles">APY</th>
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_last">
                        Txn Hash
                      </th>
                    </tr>
                  </thead>

                  {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================
              </div> */}
                  {loanAsset.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No funded pools yet.
                      </div>{" "}
                    </div>
                  ) : (
                    <tbody
                      className="branch_asset_body"
                      id="popular-categories"
                    >
                      {" "}
                      {/* =============== */}
                      {/* =============== */}
                      {/* =============== */}
                      {(seemore == false
                        ? loanAsset.slice(0, 6)
                        : loanAsset
                      ).map((asset) => {
                        var percentage = (asset.funded / asset.amount) * 100;
                        const meta = JSON.parse(asset.metadata);
                        const ChangeAssetDetailModal2 = async () => {
                          let response = await getNextDate(
                            asset.newLoanID,
                            account,
                            library.getSigner()
                          );
                          if (response.status == true) {
                            const resAmnt = formatEther(
                              response.message._hex
                            ).toString();
                            const pasedResAmnt = parseEther(
                              resAmnt,
                              "wei"
                            ).toString();
                            console.log(pasedResAmnt, "jsjsjsjsj");
                            console.log(
                              new Date(parseInt(pasedResAmnt * 1000)),
                              "gjgjg9fji"
                            );
                            const endDated = new Date(
                              parseInt(pasedResAmnt * 1000)
                            );
                            console.log(endDated, "end date ennd date");
                            setLoanEndDate(() => endDated);
                            console.log(new Date(1636921519 * 1000));
                          }
                          console.log(
                            asset.newLoanID,
                            "loanId loanId loanId loanId"
                          );
                        };
                        return (
                          <tr
                            className="branch_asset_body_row "
                            id={asset.rowNumber}
                            onClick={() => {
                              setAssetDetailModal(() => asset.rowNumber);
                              ChangeAssetDetailModal2();
                            }}
                          >
                            <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                              <div className="assets-data">
                                <img
                                  src={meta.arrayImg}
                                  alt=""
                                  className="assets-list-icon_pool_icon"
                                />

                                <div className="assets-data-pool_name">
                                  {asset.title.substring(0, 15) + "..."}
                                </div>
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data  ">
                              {/* <div className="assets-data-name_pool_invest_capcity"> */}
                              <div className="asset_list_body_body_cont_1c">
                                {asset.updatedAt.slice(0, 10)}
                              </div>
                              {/* </div> */}
                            </td>
                            <td className="branch_asset_body_row_data  ">
                              <div className="assets-data-name_pool">
                                {numberWithCommas(
                                  parseInt(asset.amount).toFixed(2)
                                )}
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data  ">
                              <div className="assets-data-name_pool">
                                <div className="asset_amount_progress_div">
                                  <div className="asset_amount_progress_div_txt"></div>
                                  <label for="file">
                                    {parseInt(percentage).toFixed()}%
                                  </label>
                                  <progress
                                    className={
                                      percentage < 100
                                        ? "progress_bar progress_bar_progress"
                                        : "progress_bar"
                                    }
                                    // "progress_bar"
                                    id="file"
                                    aria-valuenow={asset.amount - asset.funded}
                                    value={asset.funded}
                                    max={asset.amount}
                                  ></progress>
                                  {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                  {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                </div>
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data  ">
                              <div className="assets-data-name_pool ">
                                {numberWithCommas(
                                  parseInt(asset.lendAmount).toFixed(2)
                                )}
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data   ">
                              <div className="asset_list_body_body_cont_1f body_cont1_f">
                                13%
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                              {asset.transactionHash.substring(0, 24) + "..."}
                            </td>
                          </tr>
                        );
                      })}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                    </tbody>
                  )}
                </table>
              </div>

              {/* ================= */}
              {/* ================= */}
              {/* ================= */}

              <div className="seemore_btn_div">
                <a href="#transact_head">
                  <button className="see_more_btn" onClick={toggleSeemore}>
                    {seemore == false ? "Expand" : "Collapse"}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* var ms = new Date().getTime() + 86400000; var tomorrow = new Date(ms); */}

      {stage === "redeem" ? (
        <>
          {" "}
          {loanAsset.map((data) => {
            // let response = await getNextDate(
            //   data.newLoanID,
            //   account,
            //   library.getSigner()
            // );
            // const loanDate = async (id) => {
            //   let response = await getNextDate(
            //     id,
            //     account,
            //     library.getSigner()
            //   );
            //   if (response.status == true) {
            //     const resAmnt = formatEther(response.message._hex).toString();
            //     const pasedResAmnt = parseEther(resAmnt, "wei").toString();
            //     console.log(pasedResAmnt, "jsjsjsjsj");
            //     console.log(new Date(1636921519));
            //   }
            // };

            console.log(loanEndDate);
            // console.log(new Date(data.updatedAt));
            // const ms = new Date(loanEndDate);
            // const ms = new Date(data.updatedAt).getTime() + 86400000 * 30;
            const endDate = new Date(loanEndDate);
            const currentDate = new Date();
            const redeem = async (e) => {
              if (account) {
                setStage("loading");
                setIsLoading(true);
                setText("Redeeming, please wait...");
                let response = await takeDividend(
                  data.newLoanID,
                  library.getSigner()
                );
                console.log(response);
                // console.log(response.message.code, "status stataus");
                if (response.status == true) {
                  setStage("success");
                  // setText("Sending token please wait aleast 1/2 minutes");
                  setHash(response.message.hash);
                  console.log(response);
                } else if (response.status == false) {
                  if (response.message.code < 0) {
                    setText(response.message.data.message);
                  } else if (response.message.code == 4001) {
                    setText(response.message.message);
                  }
                  setStage("error");
                  setIsLoading(false);
                }
                return;
              }
            };
            const takeCapital = async (e) => {
              if (account) {
                setStage("loading");
                setIsLoading(true);
                setText("Withdrawing, please wait...");
                let response = await takeBackLoan(
                  data.newLoanID,
                  library.getSigner()
                );
                console.log(response);
                // console.log(response.message.code, "status stataus");
                if (response.status == true) {
                  setStage("success");
                  // setText("Sending token please wait aleast 1/2 minutes");
                  setHash(response.message.hash);
                  console.log(response);
                } else if (response.status == false) {
                  if (response.message.code < 0) {
                    setText(response.message.data.message);
                  } else if (response.message.code == 4001) {
                    setText(response.message.message);
                  }
                  setStage("error");
                  setIsLoading(false);
                }
                return;
              }
            };
            // setInterval(() => {
            //   if (localStorage.getItem("unlocking") == "true") {
            //     transactReceipt(
            //       localStorage.getItem("unlockingHash"),
            //       library
            //     ).then(function (env) {
            //       // console.log("running Interval", env);
            //       if (env.status == true && env.message !== null) {
            //         if (env.message.confirmations > 2) {
            //           setStage("success");
            //           setHash(localStorage.getItem("unlockingHash"));
            //           setIsLoading(false);

            //           localStorage.setItem("unlocking", false);
            //         }
            //       }
            //     });
            //   } else {
            //     // setStage("error");
            //   }
            // }, 1000);

            return (
              <>
                {assetDetailModal == data.rowNumber ? (
                  <div
                    className="asset_detail_modal_div"
                    // onClick={ChangeAssetDetailModal2}
                    id={data.newLoanID}
                  >
                    <div className="asset_detail_modal_div_conts">
                      <div
                        className="asset_detail_heading asset_detail_heading_user"
                        style={{ margin: "0" }}
                      >
                        <div
                          className="pool_detail_heading_area1"
                          style={{ width: "100%" }}
                        >
                          {/* <img
                      src="/img/pool_asset_icon.png"
                      alt=""
                      className="pool_detail_heading_area1_img"
                      //   onClick={toggleImgDiv}
                      style={{ cursor: "pointer" }}
                    /> */}
                          <div className="pool_detail_heading_area1_txt_cont">
                            <div className="pool_detail_heading_area1_txt_cont_1">
                              {data.title.substring(0, 45) + "..."}
                            </div>
                            <div className="pool_detail_heading_area1_txt_cont_2">
                              Assets {">"} Asset{data.id}
                            </div>
                          </div>
                        </div>
                        <div
                          className="pool_detail_heading_area2"
                          style={{ width: "100%" }}
                        >
                          <span className="reward_amount">
                            <span className="reward_amount_title">Reward:</span>{" "}
                            {numberWithCommas(
                              parseFloat(data.lendAmount * 0.015).toFixed(2)
                            )}{" "}
                            Engn
                          </span>
                          <Timer deadline={new Date(endDate)} />
                          {/* <span className="reward_txt">Redeem Reward In</span> */}

                          <span className="reward_btn_div">
                            <button
                              className="reward_btn"
                              disabled={currentDate >= endDate ? false : true}
                              // disabled
                              onClick={redeem}
                            >
                              Redeem
                            </button>
                          </span>
                        </div>
                      </div>
                      {/* ====== */}
                      {/* ====== */}
                      {/* ====== */}
                      <div className="asset_status_details_div1">
                        <div className="asset_status_details_div1_head">
                          Status{" "}
                          <div className="staus_btn_div">
                            <button
                              className={
                                data.state === "OPEN"
                                  ? "status_btn_ongoing"
                                  : data.state === "FILLED"
                                  ? "status_btn_closed"
                                  : "status_btn"
                              }
                            >
                              {data.state}
                            </button>
                          </div>
                        </div>
                        <div className="asset_status_details_div1_body">
                          <div className="asset_status_details_div1_body1">
                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                Pool Amount
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                {numberWithCommas(
                                  parseInt(data.amount).toFixed()
                                )}{" "}
                                Engn
                              </div>
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                Amount Funded
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                {numberWithCommas(
                                  parseInt(data.lendAmount).toFixed()
                                )}{" "}
                                Engn
                              </div>
                            </div>
                            <hr class="custom_hr"></hr>

                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                Asset Duration
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                {data.length} months
                              </div>
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                Date
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                {data.createdAt.slice(0, 10)}
                              </div>
                            </div>
                          </div>
                          {/* ======== */}
                          {/* ======== */}
                          {/* ======== */}
                          {/* ======== */}
                          <div className="asset_status_details_div1_body1">
                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                Monthly APY
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                1.5%
                              </div>
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                No of times lended
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                {data.nTime}x
                              </div>
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="asset_status_details_div1_body1_cont1">
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                Average APY
                              </div>
                              <div className="asset_status_details_div1_body1_cont1_txt1">
                                13%
                              </div>
                            </div>
                            <hr class="custom_hr"></hr>

                            {/* <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Financed by
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Nov 13, 2024
                          </div>
                        </div> */}
                          </div>
                        </div>
                      </div>
                      {/* ============ */}
                      {/* ============ */}
                      {/* ============ */}
                      {/* ============ */}
                      <div className="transactionData_body transactionData_body_2">
                        <div className="witdraw_funds_div_txt">
                          <span className="witdraw_funds_div_txt_para">
                            1,000,000.00 engn
                          </span>
                          :Available
                        </div>
                        <button
                          className="witdraw_funds_div_btn"
                          onClick={takeCapital}
                        >
                          Withdraw Funds
                        </button>
                      </div>
                      {/* ============ */}
                      {/* ============ */}
                      {/* ============ */}
                      {/* ============ */}
                      <div className="Asset_Originator_Details_cont">
                        <div className="Asset_Originator_Details_cont_heading">
                          Transaction Data
                        </div>
                        <div className="transactionData_body">
                          <div className="transactionData_body1">
                            Transaction Id
                          </div>
                          <div className="transactionData_body1">
                            <a
                              href={`https://bscscan.com/tx/${data.transactionHash}`}
                              className="transaction_id_link"
                              target="_blank"
                            >
                              {data.transactionHash.substring(0, 28) + "..."}
                            </a>
                            <CopyAllIcon className="copy_all_tx_hash_icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="close_asset_detail_modal"
                      onClick={closeAssetDetailModal}
                    >
                      <CloseIcon className="close_asset_detail_modal_icon" />
                      Close
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </>
      ) : null}

      {stage == "loading" ? (
        <div className="bacModal_div">
          <div className="back_modal_container">
            <div className="back_modal_cont_loading">
              <CopperLoading
                fill="#229e54"
                borderRadius={4}
                count={12}
                size={200}
              />
              <div className="loading_title">
                {text}

                <span className="loaing_span_para">
                  Confirm this transaction in your wallet.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {stage == "success" ? (
        <div className="bacModal_div">
          <div className="back_modal_container">
            <SuccessModal
              successMessage={"Transaction was successful"}
              click={(e) => {
                window.location.href = "/app/user";
              }}
              SuccessHead="Success"
              hash={hash}
            />
          </div>
        </div>
      ) : null}
      {stage == "error" ? (
        <div className="bacModal_div">
          <div className="back_modal_container">
            <ErrorModal
              errorMessage={text}
              click={(e) => {
                Continue(e);
              }}
              ErrorHead="Error"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

// export default DashBoardUserDetails;
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// let  res = await getLogin2(
export default connect(mapStateToProps, {})(DashBoardUserDetails);
