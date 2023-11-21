import React, { useState, useEffect, useContext } from "react";
import "../../css/dashboardLend_details_page.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SwitchToggle from "./DashBoardPages/SwitchToggle/SwitchToggle";
import { CopperLoading } from "respinner";
import { parseEther, formatEther } from "@ethersproject/units";
import LOAN from "../../web3/contracts/Loan.json";
import SwapContract from "../../web3/contracts/Contract_Address.json";
import { getAuthUserStats } from "../../actions/token";
import Web3 from "web3";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Nodata from "./DashBoardPages/nodataComponent/Nodata";
import { Authenticate } from "../auth/Authenticate";
import {
  SuccessModal,
  ErrorModal,
} from "../Dashboard/DashBoardPages/Modal/Success_Error_Component";

import { numberWithCommas } from "../static/static";
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
import { Checkbox } from "@mui/material";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import axios from "axios";
import { config } from "../../actions/Config";
import { API_URL as api_url } from "../../actions/types";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Accordion from "../Accordion";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import CloseIcon from "@mui/icons-material/Close";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CopyAllIcon from "@mui/icons-material/CopyAll";
import { UserContext } from "../context/Context";

import {
  lendUS,
  takeDividend,
  takeBackLoan,
  getTotalLended,
  getInvestorsDividend,
  userStats,
  system,
  burnAccumulatedDividend,
  checkAllowance,
  unluckToken,
  lend,
  getUserStats,
  transactReceipt,
  getPrice,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
  checkAllowanceL,
  unluckToken2,
  getEgcSmartContractBalnce,
} from "../../web3/index";

const DashBoard_lend_details_page = ({ match }) => {
  const [txnhash, setTxnHash] = useState(match.params.branchAddress);
  // const { rumuName, agipName, oyName } = useContext(UserContext);
  console.log(match.params.branchAddress);
  const context = useWeb3React();
  const [LoanAssets, setLoanAssets] = useState([]);
  const [BranchDetails, setBranchDetails] = useState({
    branchName: "",
    amount: "",
    funded: "",
  });
  const [activeLink, setActiveLink] = useState("");
  const [viaEarnings, setViaEarnings] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  // const [loanId, setLoanId] = useState();
  const [assetModal, setAssetModal] = React.useState(false);
  const [LoanId, setLoanId] = React.useState("");
  const [backModal, setBackModal] = React.useState(false);
  const [branch, setBranch] = React.useState("Branch");
  const [chainLoanDetails, setChainLoanDetails] = useState({});
  const [disable, setDisable] = useState(true);
  const [text, setText] = useState(
    "Transacting with blockchain, please wait..."
  );
  const [rumuName, setRumuName] = useState(false);
  const [lendType, setLendType] = useState(false);
  const [agipName, setAgipName] = useState(false);
  const [oyName, setOyName] = useState(false);
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [hash, setHash] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [modal, setModal] = useState(false);
  const [refEarnings, setRefEarnings] = useState(0.0);
  const [welcomeBonus, setWelcomeBonus] = useState(0.0);
  const [status, setStatus] = useState("");

  const [task, setTask] = useState("collateral");
  const [stage, setStage] = useState("back");
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");
  const [coinBalance2, setCoinBalance2] = React.useState(0.0);
  const [baseBalance, setBaseBalance] = useState(0.0);
  const [unlockedCheck, setUnlockedCheck] = useState(false);
  const [loanMetaData, setLoanMetaData] = useState({
    base: "",
    asset: "",
    live: "",
    maxLoan: 0.0,
    ticker: "",
    creator: "",
  });
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
  const [formData, setFormData] = useState({
    BackAmount: "",
  });
  const { BackAmount } = formData;
  const toggleAssetModal = () => {
    setAssetModal(!assetModal);
    // setBackModal(!backModal);
  };

  // const toggleBackModal = () => {
  //   setBackModal(!backModal);
  //   setAssetModal(!assetModal);
  // };
  const toggleLendType = () => setLendType(!lendType);
  const ChangeAssetDetailModal = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setAssetDetailModal(currentTarget);
  };

  const Continue = async (e) => {
    setStage("back");
    setText("");
    // setModal(!modal);
    // window.location.reload();
  };
  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setActiveLink("Overview");
    } else if (
      currentPage ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveLink("Asset");
    } else if (
      currentPage ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveLink("transaction");
    }
  });
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
  useEffect(() => {
    axios
      .get(api_url + "/api/branch/transactions/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful333333");

        // console.log(txnhash);
        // setBranches(data.data.payload);
        // setBranchDetails({
        //   branchName: data.data.payload[0].name,
        //   amount: data.data.payload[0].amount,
        //   funded: data.data.payload[0].funded,
        // });
        setLoanAssets(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  useEffect(() => {
    axios
      .get(api_url + "/api/lend/all/" + txnhash, null, config)
      .then((data) => {
        console.log(data.data.payload[0].name, "teeyuwiuoyuwuyi");

        // setBranches(data.data.payload);
        setBranchDetails({
          branchName: data.data.payload[0].name,
          amount: data.data.payload[0].amount,
          funded: data.data.payload[0].funded,
        });
        let babara = data.data.payload[0].name.includes("R");
        let babara2 = data.data.payload[0].name.includes("A");
        let babara3 = data.data.payload[0].name.includes("O");
        console.log(data.data.payload[0].name);
        setRumuName(babara);
        setAgipName(babara2);
        setOyName(babara3);

        console.log(babara);
        console.log(babara, babara2, babara3);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };

  const FundingProgress = (BranchDetails.funded / BranchDetails.amount) * 100;

  // console.log(c, b, d);

  const handleBackChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBackedAmount = () => {
    console.log(formData, "=====formdata=====");
  };
  const doUnluck = async (e) => {
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

  // useEffect(async (e) => {
  //   console.log(BackAmount);

  //   if (account) {
  //     let check2 = await checkAllowanceL(
  //       account,
  //       parseEther(BackAmount.toString(), "wei").toString(),
  //       library.getSigner()
  //     );
  //     console.log(check2);
  //     if (check2.status == true) {
  //       setUnlockedCheck(true);
  //     } else {
  //       // // setUnlocking(true);
  //       // setStage("unlock");
  //       // setIsLoading(false);
  //     }
  //   }
  // }, []);

  const BackLoan = async (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    console.log(BackAmount);
    setStage("loading");
    setIsLoading(true);
    // setUnlocking(false);
    // setStage("loading");
    // setIsLoading(true);
    setText("Lending, please wait...");
    let check = await checkAllowanceL(
      account,
      parseEther(formData.BackAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(check);
    if (check.status == true) {
      let ret = await lendUS(
        txnhash,
        parseEther(formData.BackAmount.toString(), "wei").toString(),
        currentTarget,
        library.getSigner()
      );
      console.log(ret.status);
      if (ret.status == true) {
        localStorage.setItem("unlocking", true);
        localStorage.setItem("unlockingHash", ret.message.hash);
        setText("Sending token please wait aleast 1/2 minutes");
        setHash(ret.message.hash);
        // setStage("success");
        console.log(ret);
      } else if (ret.status == false) {
        if (ret.message.code < 0) {
          setText(ret.message.data.message);
        } else if (ret.message.code == 4001) {
          setText(ret.message.message);
        }
        setStage("error");
        setIsLoading(false);
      }
    } else {
      // setUnlocking(true);
      setStage("unlock");
      setIsLoading(false);
    }
  };
  const BackLoanBonus = async (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    console.log(BackAmount);
    setStage("loading");
    setIsLoading(true);
    // setUnlocking(false);
    // setStage("loading");
    // setIsLoading(true);
    setText("Lending, please wait...");

    let response = await lend(
      parseEther(formData.BackAmount.toString(), "wei").toString(),
      txnhash,
      currentTarget,
      true,
      library.getSigner()
    );
    console.log(response.status);
    if (response.status == true) {
      // setText("Sending token please wait aleast 1/2 minutes");
      setStage("success");
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
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  var percentage = (BranchDetails.funded / BranchDetails.amount) * 100;
  useEffect(
    async (e) => {
      if (account) {
        let response = await getAuthUserStats(account);
        const payload = response.message.data.payload;
        console.log(payload, "acct acct acct acct ");
        if (payload == null) {
          setStatus("");
        } else {
          setStatus(() => payload.kyc_status);
        }
      }
    },
    [account]
  );

  return (
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
                to={`/app/earn/pool/${txnhash}/detail`}
                className={
                  activeLink === "Overview"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <DashboardIcon className="asset_overview_link_icon" />
                Overview
              </Link>
              {/* <span class="vertical_ruleB"></span> */}
              <Link
                to={`/app/earn/pool/detail/branch/${txnhash}/asset`}
                className={
                  activeLink === "Asset"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <InventoryIcon className="asset_overview_link_icon" />
                Assets
              </Link>
              {/* <span class="vertical_ruleB"></span> */}
              <Link
                to={`/app/earn/pool/detail/${txnhash}/transactions`}
                className={
                  activeLink === "transaction"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <ReceiptIcon className="asset_overview_link_icon" />
                Transactions
              </Link>
            </div>
            <div className="pool_detail_heading">
              <div className="pool_detail_heading_area1">
                <img
                  src={
                    oyName === true
                      ? "/img/oyigbo_icon.svg"
                      : agipName === true
                      ? "/img/agip_icon.svg"
                      : rumuName === true
                      ? "/img/rumu_icon.svg"
                      : null
                  }
                  alt=""
                  className="pool_detail_heading_area1_img"
                />
                <div className="pool_detail_heading_area1_txt_cont">
                  <div className="pool_detail_heading_area1_txt_cont_1">
                    {BranchDetails.branchName} branch
                    {/* <div className="pool_detail_investmentcapacity_box">
                      {" "}
                      41.2M Engn
                    </div> */}
                  </div>
                  <div className="pool_detail_heading_area1_txt_cont_2">
                    Overview
                  </div>
                </div>
              </div>
              <div className="pool_detail_heading_area1_invest_btn_div">
                <button
                  className="pool_detail_heading_area1_invest_btn"
                  onClick={toggleLendType}
                >
                  Lend
                </button>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="pool_detail_sub_area1">
              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  {numberWithCommas(parseInt(BranchDetails.amount).toFixed(2))}{" "}
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Assets Value
                </div>
              </div>
              <span className="vertical_rule2a"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  {numberWithCommas(parseInt(BranchDetails.funded).toFixed(2))}{" "}
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Amount Funded
                </div>
              </div>
              <span className="vertical_rule2a"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  <div className="asset_amount_progress_div">
                    <div className="asset_amount_progress_div_txt"></div>
                    <label for="file">
                      {parseInt(
                        (BranchDetails.funded / BranchDetails.amount) * 100
                      ).toFixed()}
                      %
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
                        BranchDetails.amount - BranchDetails.funded
                      }
                      value={BranchDetails.funded}
                      max={BranchDetails.amount}
                    ></progress>
                  </div>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Funding Progress
                </div>
              </div>
              <span className="vertical_rule2a"></span>
              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  {numberWithCommas(
                    parseInt(
                      BranchDetails.amount - BranchDetails.funded
                    ).toFixed(2)
                  )}{" "}
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Funding left
                </div>
              </div>
              <span className="vertical_rule2a"></span>
              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  13 <span className="asset_symbol"> %</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Estimated APY(365 days)
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="Asset_Originator_Details_cont">
              <div className="Asset_Originator_Details_cont_heading">
                Asset Originator Details
              </div>
              <div className="Asset_Originator_Details_cont_body">
                <div className="Asset_Originator_Details_cont_body_head_img_cont">
                  <img
                    src={
                      oyName === true
                        ? "/img/oyigbo_icon2.svg"
                        : agipName === true
                        ? "/img/agip_icon2.svg"
                        : rumuName === true
                        ? "/img/rumu_icon2.svg"
                        : null
                    }
                    className="Asset_Originator_Details_cont_body_head_img"
                  />
                </div>
                <div className="Asset_Originator_Details_cont_body_txt">
                  {oyName === true ? (
                    <span>
                      Egoras Technologies Limited Oyigbo Branch is located at
                      Kilometre 7 Ikwere Road Rumeme, beside Rivers State
                      College of Health Science and Technologies. Our aim is to
                      render improved quality financial services and as well
                      lower the cost of the services in these communities around
                      through micro-collateralized loans. The pool seeks to
                      generate uncorrelated and excess risk-adjusted returns to
                      its investors by providing secured loans to individuals
                      and small businesses in the community. Egoras Technologies
                      Limited Oyigbo Branch started operations on the 6th of
                      September, 2021 and has since empowered over 1,500
                      customers with about ₦76,407,085 in loans .
                    </span>
                  ) : agipName === true ? (
                    <span>
                      Egoras Technologies Limited Agip Branch is located at
                      Kilometre 7 Ikwere Road Rumeme, beside Rivers State
                      College of Health Science and Technologies. Our aim is to
                      render improved quality financial services and as well
                      lower the cost of the services in these communities around
                      through micro-collateralized loans. The pool seeks to
                      generate uncorrelated and excess risk-adjusted returns to
                      its investors by providing secured loans to individuals
                      and small businesses in the community. Egoras Technologies
                      Limited Agip Branch started operations on the 6th of
                      September, 2021 and has since empowered over 1,500
                      customers with about ₦76,407,085 in loans .
                    </span>
                  ) : rumuName === true ? (
                    <span>
                      EGORAS Rumukurushi is a Branch of EGORAS TECHNOLOGIES
                      which mission is to provide Zero interest loans to people
                      across the globe, refurbishing of Household properties and
                      making Life easy for all through the sale of subsidized
                      Household properties and industrial equipment. <br />
                      EGORAS Rumukurushi started her business operations in July
                      2021 and have since them impacted over 4000 customer with
                      her services, which are
                      <br /> 1. Granting of Free interest Loan
                      <br />
                      2. Sale of highly discounted household properties, gadgets
                      and industrial equipment
                      <br /> 3. Buying of Brand New/ Fairly used household
                      properties, gadgets and industrial equipment at a very
                      good rate.
                      <br /> Our Aim is to reach out to 20,000 customers before
                      the end of the year with our services.
                    </span>
                  ) : null}
                </div>
                <div className="Asset_Originator_Details_cont_body_issuer_cont">
                  <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                    Issuer
                  </div>
                  <div className="Asset_Originator_Details_cont_body_issuer_cont_txt">
                    {oyName === true
                      ? "Egoras Oyigbo Branch"
                      : agipName === true
                      ? "Egoras Agip Branch"
                      : rumuName === true
                      ? "Egoras Rumukwrushi Branch"
                      : null}
                  </div>
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}

            <div className="pool_status">
              <div className="pool_status_cont_heading">Pool Status</div>
              <div className="pool_status_Details_cont_body">
                <div className="pool_status_Details_cont_body1">
                  <div className="pool_status_Details_cont_body1_cont1">
                    <div className="pool_status_Details_cont_body1_head">
                      Assets
                    </div>
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Asset value
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        {numberWithCommas(
                          parseInt(BranchDetails.amount).toFixed(2)
                        )}{" "}
                        Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Estimated APY
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        13.0%
                      </div>
                    </div>
                    <hr className="custom_hr" />

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Average maturity
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        6 months
                      </div>
                    </div>
                  </div>
                  <div className="pool_status_Details_cont_body1_cont2">
                    <div className="pool_status_Details_cont_body1_head">
                      Liquidity
                    </div>

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Available Liquidity
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        {numberWithCommas(
                          parseInt(BranchDetails.funded).toFixed(2)
                        )}{" "}
                        Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Liquidity Left
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        {numberWithCommas(
                          parseInt(
                            BranchDetails.amount - BranchDetails.funded
                          ).toFixed(2)
                        )}{" "}
                        Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Funding Progress
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        <div className="asset_amount_progress_div">
                          <div className="asset_amount_progress_div_txt"></div>
                          <label for="file">
                            {parseInt(FundingProgress).toFixed()}%
                          </label>
                          <progress
                            className={
                              FundingProgress < 100
                                ? "progress_bar progress_bar_progress"
                                : "progress_bar"
                            }
                            // "progress_bar"
                            id="file"
                            aria-valuenow={
                              BranchDetails.amount - BranchDetails.funded
                            }
                            value={BranchDetails.funded}
                            max={BranchDetails.amount}
                          ></progress>
                        </div>
                      </div>
                    </div>
                    <hr className="custom_hr" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* ================================================= */}
      {/* ================================================= */}
      {/* ================================================= */}

      {assetModal === true ? (
        <div className="asset_list_modal">
          <div className="asset_list_modal_container">
            {/* <div className="asset_list_body"> */}
            <div className="asset_list_txt">
              Asset List{" "}
              <CloseIcon
                className="closeBackModalIcon"
                onClick={toggleAssetModal}
              />
            </div>
            {/* ========== */}
            {/* ========== */}
            {/* ========== */}
            {/* ========== */}
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
                    <th className="branch_asset_heading_titles branch_asset_heading_titles_last">
                      Action
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
                {LoanAssets.length <= 0 ? (
                  <div className="no_loans_div">
                    <div className="no_loans_div_cont">
                      <Nodata />
                      No Pools yet.
                    </div>{" "}
                  </div>
                ) : (
                  <tbody className="branch_asset_body" id="popular-categories">
                    {" "}
                    {/* =============== */}
                    {/* =============== */}
                    {/* =============== */}
                    {LoanAssets.filter((person) => person.state == "OPEN").map(
                      (asset) => {
                        var percentage = (asset.funded / asset.amount) * 100;
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
                                  parseInt(asset.amount - asset.funded).toFixed(
                                    2
                                  )
                                )}
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data   ">
                              <div className="asset_list_body_body_cont_1f body_cont1_f">
                                13%
                              </div>
                            </td>
                            <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                              <div className="asset_list_body_body_cont_1g">
                                <button
                                  onClick={ChangeAssetDetailModal}
                                  className="back_btn"
                                >
                                  Lend
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
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
          </div>
        </div>
      ) : null}
      {stage == "back" ? (
        <>
          {LoanAssets.map((data) => {
            const amnt_remaining = data.amount - data.funded;
            if (BackAmount < amnt_remaining) {
              console.log("ure amount is less than the remaining amount");
            } else if (BackAmount > amnt_remaining) {
              console.log("ure amount is greater than the remaining amount");
            }
            return (
              <>
                {assetDetailModal == data.newLoanID ? (
                  <div className="bacModal_div">
                    <div className="back_modal_container">
                      <div className="back_modal_cont">
                        <CloseIcon
                          className="closeBackModalIcon"
                          onClick={closeAssetDetailModal}
                        />
                        <div className="back_modal_heading">Back this pool</div>
                        <div className="fundin_amnt_left_amnt_div">
                          Funding amount left in this pool:{" "}
                          <span className="fundin_amnt_left_amnt">
                            {numberWithCommas(
                              parseInt(data.amount - data.funded).toFixed(2)
                            )}{" "}
                            Engn
                          </span>
                        </div>

                        <div className="back_Modal_input_area">
                          <div className="back_modal_input_amnt_head">
                            Input amount
                            <span className="base_balance">
                              {viaEarnings === true ? (
                                <span>
                                  Earnings Balance:{" "}
                                  {numberWithCommas(
                                    parseFloat(
                                      welcomeBonus + refEarnings
                                    ).toFixed(2)
                                  )}
                                  Engn
                                </span>
                              ) : (
                                <span>
                                  Wallet Balance:{" "}
                                  {numberWithCommas(
                                    parseFloat(baseBalance).toFixed(3)
                                  )}
                                  Engn
                                </span>
                              )}
                            </span>
                          </div>
                          <span className="input_space">
                            <AccountBalanceWalletIcon className="input_dollar_sign" />
                            <input
                              type="number"
                              className="back_modal_input"
                              placeholder="0.00 Engn"
                              name="BackAmount"
                              value={BackAmount}
                              onChange={handleBackChange}
                            />
                            {/* <div className="back_modal_input_amnt_head_minimum">
                            Minimum Amount: 30,000.00 Engn
                          </div> */}
                          </span>
                        </div>
                        <div className="amount_earned_mnthly">
                          Expected APY:
                          <span className="amount_earned_mnthly_value">
                            {" "}
                            {numberWithCommas(
                              parseFloat(0.015 * BackAmount).toFixed(2)
                            )}
                            Engn
                          </span>
                        </div>
                        {/* <div className="unlock_check_div">
                          <SwitchToggle
                            checkBox={unlockedCheck}
                            // doUnluck={doUnluck}
                          />
                        </div> */}
                        {!account ? (
                          <div className="connect_div_dash_head">
                            <Authenticate isHome="false" />
                          </div>
                        ) : viaEarnings === true ? (
                          <div className="back_loan_btn_div">
                            {BackAmount > amnt_remaining ? (
                              <button
                                className="back_loan_btn"
                                id={data.newLoanID}
                                disabled={true}
                              >
                                Amount exceeds funding amount
                              </button>
                            ) : (
                              <button
                                className="back_loan_btn"
                                onClick={BackLoanBonus}
                                id={data.newLoanID}
                                // disabled={disable}
                              >
                                Fund with Earnings
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="back_loan_btn_div">
                            {BackAmount > amnt_remaining ? (
                              <button
                                className="back_loan_btn"
                                id={data.newLoanID}
                                disabled={true}
                              >
                                Amount exceeds funding amount
                              </button>
                            ) : (
                              <button
                                className="back_loan_btn"
                                onClick={BackLoan}
                                id={data.newLoanID}
                                // disabled={disable}
                              >
                                Fund
                              </button>
                            )}
                          </div>
                        )}
                      </div>
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
                fill="#22ad62"
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
                Approve <b>Egoras</b> to spend{" "}
                {task == "collateral" || task == "topup" ? asset : base} on your
                behalf.
              </div>

              <div className="unlock_input_div ">
                <input
                  type="text"
                  name="stateAmountToGenerate"
                  value={formData.BackAmount}
                  readonly
                  className="unlock_input"
                />
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
      ) : // ==========
      // ==========
      // ==========

      null}
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
      {lendType === true ? (
        <div className="viaEarnings_modal_cont">
          <div className="viaEarnings_modal_cont_div">
            {/* <div className="close_viaEarning_div"> */}
            <CloseIcon
              className="close_viaEarning_div_btn"
              onClick={toggleLendType}
            />
            {/* </div> */}
            <div>
              <div className="asset_originator_heading">
                Assets Originator{" "}
                <div className="asset_originator_body">
                  <img
                    src={
                      oyName === true
                        ? "/img/oyigbo_icon.svg"
                        : agipName === true
                        ? "/img/agip_icon.svg"
                        : rumuName === true
                        ? "/img/rumu_icon.svg"
                        : null
                    }
                    alt=""
                    className="pool_detail_heading_area1_img_2"
                  />
                  {BranchDetails.branchName} branch
                </div>
              </div>
              <div className="viaEarnings_modal_cont_div1">
                <div className="viaEarnings_modal_cont_div1_cont1">
                  <span className="viaEarnings_modal_cont_div1_cont1_span1">
                    Wallet Balance:
                  </span>
                  <span className="viaEarnings_modal_cont_div1_cont1_span2">
                    {numberWithCommas(parseFloat(baseBalance).toFixed(3))} Engn
                  </span>
                </div>
                <div className="viaEarnings_modal_cont_div1_cont1">
                  <span className="viaEarnings_modal_cont_div1_cont1_span1">
                    Earnings Balance:
                  </span>
                  <span className="viaEarnings_modal_cont_div1_cont1_span2">
                    {numberWithCommas(
                      parseFloat(welcomeBonus + refEarnings).toFixed(2)
                    )}
                    Engn
                  </span>
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div className="viaEarnings_modal_cont_div2">
                <button
                  className="viaEarnings_modal_cont_div_btn2"
                  onClick={() => {
                    toggleAssetModal();
                    setViaEarnings(false);
                  }}
                >
                  Lend via wallet
                </button>

                <button
                  className="viaEarnings_modal_cont_div_btn"
                  onClick={() => {
                    toggleAssetModal();
                    setViaEarnings(true);
                  }}
                >
                  Lend via Earnings
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard_lend_details_page;
