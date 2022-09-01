import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import { CopperLoading } from "respinner";
import StarRateIcon from "@mui/icons-material/StarRate";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { numberWithCommas } from "../../../static";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CopyAllIcon from "@mui/icons-material/CopyAll";
import { parseEther, formatEther } from "@ethersproject/units";
import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
import {
  takeLoanByBranch,
  repayOnlyLoan,
  repayDividendLoan,
  checkAllowanceL,
  unluckToken2,
  transactReceipt,
  burnNFT,
} from "../../../web3/index";
import {
  SuccessModal,
  ErrorModal,
} from "../../Dashboard/DashBoardPages/Modal/Success_Error_Component";
import axios from "axios";
import {
  faCheckCircle,
  faCircleNotch,
  faChevronRight,
  faArrowRight,
  faLock,
  faWindowClose,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const AdminAssets = () => {
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [loans, setLoans] = useState([]);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [activeBtn2, setActivrBtn2] = useState("Withdraw");
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [stage, setStage] = useState("redeem");
  const [imgDiv, setImgDiv] = useState(false);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState("");
  const [text, setText] = useState(
    "Transacting with blockchain, please wait..."
  );
  const [graphData2, setGraphData2] = useState([]);
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
  const avatarRef = useRef();
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
  useEffect(() => {
    // if (account) {
    axios
      .get(
        api_url +
          "/api/branch/transactions/" +
          "0x4fc19963b769711c09da56b35B334E55c57fc9Ee",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.payload, "made man");

        setLoans(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    //   return;
    // }
  }, []);
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
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const toggleActiveBtn2 = (event) => {
    setActivrBtn2(event.currentTarget.id);
  };
  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  const toggleImgDiv = () => {
    setImgDiv(!imgDiv);
  };

  const ChangeAssetDetailModal = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setAssetDetailModal(currentTarget);
  };
  const Continue = async (e) => {
    // setStage("redeem");
    setStage("payBack");
    setText("");
    // setModal(!modal);
    // window.location.reload();
  };
  useEffect(async () => {
    if (account) {
      let check = await checkAllowanceL(
        "0x4fc19963b769711c09da56b35B334E55c57fc9Ee",
        parseEther("180000000000000000000000000000000000", "wei").toString(),
        library.getSigner()
      );
      console.log(check);
      if (check.status == true) {
        console.log("you have unlocked", "===============================");
      } else {
        // setUnlocking(true);
        console.log("you have not unlocked", "===============================");
        // setStage("unlock");
        // setIsLoading(false);
      }
      return;
    }
  }, [account]);
  const doUnluck2 = async (e) => {
    setText("Transacting with blockchain, please wait...");
    setStage("loading");
    setIsLoading(true);
    //formData.stateCollateral.toString()
    let ret = await unluckToken2(
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setText("Unlocking please wait aleast 1/2 minutes");
      // setCheckBox(true);
      // setDisable(false);
    } else {
      if (ret.message.code == 4001) {
        setText(ret.message.message);
        // setCheckBox(false);
        // setDisable(true);
      }

      setStage("error");
      setIsLoading(false);
      // setCheckBox(false);
      // setDisable(true);
    }
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

              <div className="admin_asset_data_count_head">
                <div className="admin_transact_data_graph_head_sub">
                  Total Assets : 52
                </div>
                Total Asset Value : 6,000,000 Engn
              </div>
            </div>

            <div className="asset_list_div">
              <div className="asset_list_heading">
                <span className="asset_list_head">Asset List </span>

                <div className="filter_table_area_2">
                  <div
                    id="Ongoing"
                    className={
                      activeBtn == "Ongoing"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Ongoing
                  </div>
                  <div
                    id="Closed"
                    className={
                      activeBtn == "Closed"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Closed
                  </div>
                </div>
              </div>

              <div className="asset_list_desktop_view2">
                <table className="branch_asset_table">
                  <thead className="branch_asset_titles">
                    <tr className="branch_asset_title_div">
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_first">
                        Asset Name
                      </th>
                      <th className="branch_asset_heading_titles">
                        Amount(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funded(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Progress
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Left
                      </th>
                      <th className="branch_asset_heading_titles ">APY</th>
                      <th className="branch_asset_heading_titles ">Status</th>
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_last"></th>
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
                  {loans.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No Pools yet.
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
                      {activeBtn === "Ongoing"
                        ? loans
                            .filter((person) => person.state == "OPEN")
                            .map((asset) => {
                              var percentage =
                                (asset.funded / asset.amount) * 100;
                              const meta = JSON.parse(asset.metadata);

                              return (
                                <tr
                                  className="branch_asset_body_row "
                                  id={asset.newLoanID}
                                  onClick={ChangeAssetDetailModal}
                                >
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                    <div className="assets-data">
                                      <img
                                        src={meta.arrayImg}
                                        alt=""
                                        className="assets-list-icon_pool_icon"
                                      />

                                      <div className="assets-data-pool_name">
                                        {asset.title.substring(0, 8) + "..."}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                    <div className="asset_list_body_body_cont_1c">
                                      {numberWithCommas(
                                        parseInt(asset.amount).toFixed(2)
                                      )}
                                    </div>
                                    {/* </div> */}
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      {numberWithCommas(
                                        parseInt(asset.funded).toFixed(2)
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
                                          aria-valuenow={
                                            asset.amount - asset.funded
                                          }
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
                                        parseInt(
                                          asset.amount - asset.funded
                                        ).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data   ">
                                    <div className="asset_list_body_body_cont_1f body_cont1_f">
                                      13%
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data ">
                                    <div className="asset_list_body_body_cont_1g">
                                      <button
                                        className={
                                          asset.state === "OPEN"
                                            ? "status_btn_ongoing"
                                            : asset.state === "FILLED"
                                            ? "status_btn_closed"
                                            : "status_btn"
                                        }
                                      >
                                        {asset.state}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                    <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                  </td>
                                </tr>
                              );
                            })
                        : activeBtn === "Closed"
                        ? loans
                            .filter((person) => person.state == "FILLED")
                            .map((asset) => {
                              var percentage =
                                (asset.funded / asset.amount) * 100;
                              const meta = JSON.parse(asset.metadata);

                              // ===================
                              // ===================
                              // ===================
                              // ===================

                              return (
                                <tr
                                  className="branch_asset_body_row "
                                  id={asset.newLoanID}
                                  onClick={ChangeAssetDetailModal}
                                >
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                    <div className="assets-data">
                                      <img
                                        src={meta.arrayImg}
                                        alt=""
                                        className="assets-list-icon_pool_icon"
                                      />

                                      <div className="assets-data-pool_name">
                                        {asset.title.substring(0, 8) + "..."}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                    <div className="asset_list_body_body_cont_1c">
                                      {numberWithCommas(
                                        parseInt(asset.amount).toFixed(2)
                                      )}
                                    </div>
                                    {/* </div> */}
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      {numberWithCommas(
                                        parseInt(asset.funded).toFixed(2)
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
                                          aria-valuenow={
                                            asset.amount - asset.funded
                                          }
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
                                        parseInt(
                                          asset.amount - asset.funded
                                        ).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data   ">
                                    <div className="asset_list_body_body_cont_1f body_cont1_f">
                                      13%
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data ">
                                    <div className="asset_list_body_body_cont_1g">
                                      <button
                                        className={
                                          asset.state === "OPEN"
                                            ? "status_btn_ongoing"
                                            : asset.state === "FILLED"
                                            ? "status_btn_closed"
                                            : "status_btn"
                                        }
                                      >
                                        {asset.state}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                    <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                  </td>
                                </tr>
                              );
                            })
                        : null}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
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
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
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
      {loans.map((data) => {
        const meta = JSON.parse(data.metadata);

        const tHash = `https://bscscan.com/tx/${data.transactionHash}`;
        const returnProgress = () => {
          let value = parseInt(data.funded);
          let percentage = value / parseInt(data.amount);
          let final = percentage * 100;
          return final.toString();
        };
        var percentage = (data.funded / data.amount) * 100;
        const withdrawFunds = async (e) => {
          if (account) {
            setStage("loading");
            setIsLoading(true);
            setText("Withdrawing, please wait...");
            let response = await takeLoanByBranch(
              data.newLoanID,
              library.getSigner()
            );
            console.log(response);
            console.log(response.message.code, "status stataus");
            if (response.status == true) {
              setText("Sending token please wait aleast 1/2 minutes");
              // setHash(response.message.hash);
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
        // ===========
        // ===========
        // ===========
        const repayOnlyLoan = async (e) => {
          if (account) {
            setStage("loading");
            setIsLoading(true);
            setText("Paying back, please wait...");
            let check = await checkAllowanceL(
              "0x4fc19963b769711c09da56b35B334E55c57fc9Ee",
              parseEther(data.amount, "wei").toString(),
              library.getSigner()
            );
            console.log(check);
            if (check.status == true) {
              let response = await repayOnlyLoan(
                data.newLoanID,
                library.getSigner()
              );
              console.log(response.status);
              if (response.status == true) {
                localStorage.setItem("unlocking", true);
                localStorage.setItem("unlockingHash", response.message.hash);
                setText("Sending token please wait aleast 1/2 minutes");
                setHash(response.message.hash);
                // setStage("success");
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
            } else {
              // setUnlocking(true);
              setStage("unlock");
              setIsLoading(false);
            }
            return;
          }
        };
        // const repayOnlyLoan = async (e) => {
        //   if (account) {
        //     setStage("loading");
        //     setIsLoading(true);
        //     setText("Paying back, please wait...");

        //     let response = await repayOnlyLoan(
        //       data.newLoanID,
        //       library.getSigner()
        //     );
        //     console.log(response.status);
        //     if (response.status == true) {
        //       localStorage.setItem("unlocking", true);
        //       localStorage.setItem("unlockingHash", response.message.hash);
        //       setText("Sending token please wait aleast 1/2 minutes");
        //       setHash(response.message.hash);
        //       // setStage("success");
        //       console.log(response);
        //     } else if (response.status == false) {
        //       if (response.message.code < 0) {
        //         setText(response.message.data.message);
        //       } else if (response.message.code == 4001) {
        //         setText(response.message.message);
        //       }
        //       setStage("error");
        //       setIsLoading(false);
        //     }

        //     return;
        //   }
        // };

        const repayDividendLoan = async (e) => {
          if (account) {
            setStage("loading");
            setIsLoading(true);
            setText("Paying back, please wait...");
            let check = await checkAllowanceL(
              "0x4fc19963b769711c09da56b35B334E55c57fc9Ee",
              parseEther(data.amount, "wei").toString(),
              library.getSigner()
            );
            console.log(check);
            if (check.status == true) {
              let response = await repayDividendLoan(
                data.newLoanID,
                library.getSigner()
              );
              console.log(response.status);
              if (response.status == true) {
                localStorage.setItem("unlocking", true);
                localStorage.setItem("unlockingHash", response.message.hash);
                setText("Sending token please wait aleast 1/2 minutes");
                setHash(response.message.hash);
                // setStage("success");
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
            } else {
              // setUnlocking(true);
              setStage("unlock");
              setIsLoading(false);
            }
            return;
          }
        };

        const doUnluck = async (e) => {
          setText("Transacting with blockchain, please wait...");
          setStage("loading");
          setIsLoading(true);
          //formData.stateCollateral.toString()
          let ret = await unluckToken2(
            parseEther(
              "180000000000000000000000000000000000",
              "wei"
            ).toString(),
            library.getSigner()
          );
          if (ret.status == true) {
            localStorage.setItem("unlocking", true);
            localStorage.setItem("unlockingHash", ret.message);
            setText("Unlocking please wait aleast 1/2 minutes");
            // setCheckBox(true);
            // setDisable(false);
          } else {
            if (ret.message.code == 4001) {
              setText(ret.message.message);
              // setCheckBox(false);
              // setDisable(true);
            }

            setStage("error");
            setIsLoading(false);
            // setCheckBox(false);
            // setDisable(true);
          }
        };
        setInterval(() => {
          if (localStorage.getItem("unlocking") == "true") {
            transactReceipt(
              localStorage.getItem("unlockingHash"),
              library
            ).then(function (env) {
              // console.log("running Interval", env);
              if (env.status == true && env.message !== null) {
                if (env.message.confirmations > 2) {
                  setStage("success");
                  setHash(localStorage.getItem("unlockingHash"));
                  setIsLoading(false);

                  localStorage.setItem("unlocking", false);
                }
              }
            });
          } else {
            // setStage("error");
          }
        }, 1000);

        const burnNFT = async (e) => {
          if (account) {
            setStage("loading");
            setIsLoading(true);
            setText("Burning, please wait...");
            let response = await burnNFT(data.newLoanID, library.getSigner());
            console.log(response);
            console.log(response.message.code, "status stataus");
            if (response.status == true) {
              setText("Sending token please wait aleast 1/2 minutes");
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
        //        repayOnlyLoan,
        // repayDividendLoan,
        // burnNFT,
        return (
          <>
            {assetDetailModal == data.newLoanID ? (
              <>
                <div className="asset_detail_modal_div">
                  <div className="asset_detail_modal_div_conts">
                    <div className="asset_list_heading">
                      <span className="asset_list_head">Actions </span>

                      <div className="filter_table_area_2_admin">
                        <div
                          id="Withdraw"
                          className={
                            activeBtn2 == "Withdraw"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn2}
                        >
                          Withdraw
                        </div>
                        <div
                          id="PayLoan"
                          className={
                            activeBtn2 == "PayLoan"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn2}
                        >
                          Pay loan
                        </div>
                        <div
                          id="PayDividend"
                          className={
                            activeBtn2 == "PayDividend"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn2}
                        >
                          Pay Dividend
                        </div>

                        <div
                          id="BurnNft"
                          className={
                            activeBtn2 == "BurnNft"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn2}
                        >
                          Burn Nft
                        </div>
                      </div>
                    </div>
                    <div className="asset_detail_modal_cont_headings">
                      <div
                        className="asset_detail_heading"
                        style={{ margin: "0" }}
                      >
                        <div className="pool_detail_heading_area1">
                          <img
                            src={meta.arrayImg}
                            alt=""
                            className="pool_detail_heading_area1_img"
                            onClick={toggleImgDiv}
                            style={{ cursor: "pointer" }}
                          />
                          <div className="pool_detail_heading_area1_txt_cont">
                            <div className="pool_detail_heading_area1_txt_cont_1">
                              {data.title.substring(0, 25) + "..."}
                            </div>
                            <div className="pool_detail_heading_area1_txt_cont_2">
                              Assets {">"} Asset{data.newLoanID}
                            </div>
                          </div>
                        </div>
                        {activeBtn2 == "Withdraw" ? (
                          <div className="branch_withdraw_funds_div">
                            {data.state === "OPEN" ? (
                              <button
                                className="withdraw_funds_btn unavailable_btn"
                                // onClick={withdrawFunds}
                              >
                                Unavailable
                              </button>
                            ) : data.state === "FILLED" ? (
                              <button
                                className="withdraw_funds_btn"
                                onClick={withdrawFunds}
                                id={data.newLoanID}
                              >
                                Withdraw Funds
                              </button>
                            ) : null}
                          </div>
                        ) : activeBtn2 == "PayLoan" ? (
                          <div className="branch_withdraw_funds_div">
                            {data.state === "OPEN" ? (
                              <button
                                className="withdraw_funds_btn unavailable_btn"
                                // onClick={withdrawFunds}
                              >
                                Unavailable
                              </button>
                            ) : data.state === "FILLED" ? (
                              <button
                                className="withdraw_funds_btn"
                                onClick={repayOnlyLoan}
                                id={data.newLoanID}
                              >
                                Pay Back Loan
                              </button>
                            ) : null}
                          </div>
                        ) : activeBtn2 == "PayDividend" ? (
                          <div className="branch_withdraw_funds_div">
                            {data.state === "OPEN" ? (
                              <button
                                className="withdraw_funds_btn unavailable_btn"
                                // onClick={withdrawFunds}
                              >
                                Unavailable
                              </button>
                            ) : data.state === "FILLED" ? (
                              <button
                                className="withdraw_funds_btn"
                                onClick={repayDividendLoan}
                                id={data.newLoanID}
                              >
                                PayBack Dividend
                              </button>
                            ) : null}
                          </div>
                        ) : activeBtn2 == "BurnNft" ? (
                          <div className="branch_withdraw_funds_div">
                            {data.state === "OPEN" ? (
                              <button
                                className="withdraw_funds_btn unavailable_btn"
                                // onClick={withdrawFunds}
                              >
                                Unavailable
                              </button>
                            ) : data.state === "FILLED" ? (
                              <button
                                className="withdraw_funds_btn"
                                onClick={burnNFT}
                                id={data.newLoanID}
                              >
                                Burn Nft
                              </button>
                            ) : null}
                          </div>
                        ) : null}
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
                              Asset Value
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
                              {numberWithCommas(data.funded)} Engn
                            </div>
                          </div>

                          <hr class="custom_hr"></hr>
                          <div className="asset_status_details_div1_body1_cont1">
                            <div className="asset_status_details_div1_body1_cont1_txt1">
                              Funding Progress
                            </div>
                            <div className="asset_status_details_div1_body1_cont1_txt1">
                              <div className="asset_amount_progress_div">
                                <div className="asset_amount_progress_div_txt"></div>
                                <label for="file">
                                  {parseInt(
                                    (data.funded / data.amount) * 100
                                  ).toFixed()}
                                  %
                                </label>
                                <progress
                                  className={
                                    percentage < 100
                                      ? "progress_bar progress_bar_progress"
                                      : "progress_bar"
                                  }
                                  id="file"
                                  aria-valuenow={data.amount - data.funded}
                                  value={data.funded}
                                  max={data.amount}
                                ></progress>
                              </div>
                            </div>
                          </div>
                          {/* <hr class="custom_hr"></hr> */}
                        </div>
                        {/* ======== */}
                        {/* ======== */}
                        {/* ======== */}
                        {/* ======== */}
                        <div className="asset_status_details_div1_body1">
                          {/* <hr class="custom_hr"></hr> */}

                          <div className="asset_status_details_div1_body1_cont1">
                            <div className="asset_status_details_div1_body1_cont1_txt1">
                              Funding left
                            </div>
                            <div className="asset_status_details_div1_body1_cont1_txt1">
                              {numberWithCommas(data.amount - data.funded)} Engn
                            </div>
                          </div>
                          <hr class="custom_hr"></hr>
                          <div className="asset_status_details_div1_body1_cont1">
                            <div className="asset_status_details_div1_body1_cont1_txt1">
                              Estimated APY
                            </div>
                            <div className="asset_status_details_div1_body1_cont1_txt1">
                              13 %
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
                    <div className="Asset_Originator_Details_cont">
                      <div className="Asset_Originator_Details_cont_heading">
                        Asset Details
                      </div>
                      <div className="Asset_Originator_Details_cont_body">
                        {/* <div className="Asset_Originator_Details_cont_body_head_img_cont">
                        <img
                          src="/img/branch_detail_img.png"
                          className="Asset_Originator_Details_cont_body_head_img"
                        />
                      </div> */}
                        <div
                          className="Asset_Originator_Details_cont_body_txt"
                          dangerouslySetInnerHTML={{
                            __html: meta.story,
                          }}
                        ></div>
                      </div>
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
                            href={tHash}
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
                  {imgDiv === true ? (
                    <div className="img_modal">
                      <div className="img_modal_div">
                        <img
                          src={meta.arrayImg}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="close_asset_detail_modal"
                        onClick={toggleImgDiv}
                      >
                        <CloseIcon className="close_asset_detail_modal_icon" />
                        Close
                      </div>
                    </div>
                  ) : null}
                </div>
                {stage == "unlock" ? (
                  <div className="bacModal_div">
                    <div className="back_modal_container">
                      <div className="back_modal_cont">
                        <CloseIcon
                          className="closeBackModalIcon"
                          onClick={() => {
                            setStage("back");
                          }}
                        />

                        <div className="unlock_head">
                          Approve <b>Egoras</b> to spend Engn on your behalf.
                        </div>

                        <div className="Unloc_btn_div">
                          <button
                            className="LoginBtn"
                            // style={{ padding: "0.9em 4.5em" }}
                            onClick={(e) => doUnluck(e)}
                          >
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : null}{" "}
                            {/* {checkBox == false ? ` Unlock ${asset}` : "Unlocked"}
                             */}
                            Unlock
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : stage == "loading" ? (
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
                ) : stage == "success" ? (
                  <div className="bacModal_div">
                    <div className="back_modal_container">
                      <SuccessModal
                        successMessage={"Transaction was successful"}
                        click={(e) => {
                          window.location.href = "/dashboard/admin";
                        }}
                        SuccessHead="Success"
                        hash={hash}
                      />
                    </div>
                  </div>
                ) : stage == "error" ? (
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
              </>
            ) : null}
          </>
        );
      })}

      {/* {stage == "loading" ? (
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
      ) : null} */}
      {/* {stage == "success" ? (
        <div className="bacModal_div">
          <div className="back_modal_container">
            <SuccessModal
              successMessage={"Transaction was successful"}
              click={(e) => {
                window.location.href = "/dashboard/user";
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
      ) : null} */}
    </div>
  );
};

export default AdminAssets;
