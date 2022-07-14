import React, { useState, useEffect, useContext } from "react";
import "../../css/dashboardLend_details_page.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";
import { parseEther, formatEther } from "@ethersproject/units";
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
} from "../../web3/index";
const DashBoard_lend_details_page = ({ match }) => {
  const [txnhash, setTxnHash] = useState(match.params.branchAddress);
  const { BranchDetails, rumuName, agipName, oyName } = useContext(UserContext);
  console.log(match.params.branchAddress);
  const context = useWeb3React();
  const [LoanAssets, setLoanAssets] = useState([]);

  const [activeLink, setActiveLink] = useState("");
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
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [hash, setHash] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState("collateral");
  const [stage, setStage] = useState("back");
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");

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
    if (currentPage === "/dashboard/earn/pool/" + urlArr[4] + "/detail") {
      setActiveLink("Overview");
    } else if (
      currentPage ===
      "/dashboard/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveLink("Asset");
    } else if (
      currentPage ===
      "/dashboard/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveLink("transaction");
    }
  });
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

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };

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

  setInterval(() => {
    if (localStorage.getItem("unlocking") == "true") {
      // setCheckBox(true);
      // setDisable(false);

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

      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="pool_lending_pages_links">
              <Link
                to={`/dashboard/earn/pool/${txnhash}/detail`}
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
                to={`/dashboard/earn/pool/detail/branch/${txnhash}/asset`}
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
                to={`/dashboard/earn/pool/detail/${txnhash}/transactions`}
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
                  onClick={toggleAssetModal}
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
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  {numberWithCommas(parseInt(BranchDetails.funded).toFixed(2))}{" "}
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Amount Funded
                </div>
              </div>
              <span className="vertical_rule"></span>

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
                        BranchDetails.funded < BranchDetails.amount
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
              <span className="vertical_rule"></span>
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
                  Egoras Technologies Limited Agip Branch is located at
                  Kilometre 7 Ikwere Road Rumeme, beside Rivers State College of
                  Health Science and Technologies. Our aim is to render improved
                  quality financial services and as well lower the cost of the
                  services in these communities around through
                  micro-collateralized loans. The pool seeks to generate
                  uncorrelated and excess risk-adjusted returns to its investors
                  by providing secured loans to individuals and small businesses
                  in the community. Egoras Technologies Limited Agip Branch
                  started operations on the 6th of September, 2021 and has since
                  empowered over 1,500 customers with about ₦76,407,085 in loans
                  .
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
                        Funding Progress
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        <div className="asset_amount_progress_div">
                          <div className="asset_amount_progress_div_txt"></div>
                          <label for="file">
                            {parseInt(
                              (BranchDetails.funded / BranchDetails.amount) *
                                100
                            ).toFixed()}
                            %
                          </label>
                          <progress
                            className={
                              BranchDetails.funded < BranchDetails.amount
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
        <div
          className="asset_list_modal
      "
        >
          <div className="asset_list_modal_container">
            {/* <div className="asset_list_body"> */}
            <div className="asset_list_txt">
              Asset List{" "}
              <CloseIcon
                className="closeBackModalIcon"
                onClick={toggleAssetModal}
              />
            </div>
            <div className="asset_list_body_head2">
              {/* <div className="asset_list_body_head_tab1">Asset Id</div> */}
              <div className="asset_list_body_head_tab1">Asset Name</div>

              <div className="asset_list_body_head_tab5">Amount(Engn)</div>
              <div className="asset_list_body_head_tab5">
                Amount Funded(Engn)
              </div>
              <div className="asset_list_body_head_tab5">Funding Progress</div>
              <div className="asset_list_body_head_tab6 finance_fee_details_page">
                Estimated APY
              </div>
              <div className="asset_list_body_head_tab7">Action</div>
            </div>
            <div className="asset_list_body_body_cont">
              {activeBtn === "Ongoing"
                ? LoanAssets.filter((person) => person.state == "OPEN").map(
                    (data) => {
                      var percentage = (data.funded / data.amount) * 100;
                      return (
                        <div
                          className="asset_list_body_body_cont_1"
                          id={data.newLoanID}
                          onClick={ChangeAssetDetailModal}
                          // onClick={ChangeAssetDetailModal}
                        >
                          {/* <div className="asset_list_body_body_cont_1a">
                                {data.id}
                              </div> */}
                          <div className="asset_list_body_body_cont_1a">
                            {/* {data.title} */}
                            {data.title.substring(0, 20) + "..."}
                          </div>

                          <div className="asset_list_body_body_cont_1e">
                            {numberWithCommas(parseInt(data.amount).toFixed(2))}
                          </div>

                          <div className="asset_list_body_body_cont_1e">
                            {numberWithCommas(parseInt(data.funded).toFixed(2))}
                          </div>

                          <div className="asset_list_body_body_cont_1e">
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
                                // className={
                                //   data.funded < data.amount
                                //     ? " progress_bar progress_bar_progress"
                                //     : data.funded === data.amount
                                //     ? "progress_bar"
                                //     : " progress_bar progress_bar_progress"
                                // }
                                // "progress_bar"
                                id="file"
                                aria-valuenow={data.amount - data.funded}
                                value={data.funded}
                                max={data.amount}
                              ></progress>
                            </div>
                          </div>
                          <div className="asset_list_body_body_cont_1f finance_fee_details_page_row">
                            13 %
                          </div>
                          <div className="asset_list_body_body_cont_1g">
                            <button
                              onClick={ChangeAssetDetailModal}
                              className="back_btn"
                            >
                              Lend
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )
                : null}
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : null}
      {stage == "back" ? (
        <>
          {LoanAssets.map((data) => (
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

                      <div className="back_Modal_input_area">
                        <div className="back_modal_input_amnt_head">
                          Input amount
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
                          <div className="back_modal_input_amnt_head_minimum">
                            Minimum Amount: 30,000.00 Engn
                          </div>
                        </span>
                      </div>
                      <div className="amount_earned_mnthly">
                        Expected APY:
                        <span className="amount_earned_mnthly_value"> 13%</span>
                      </div>
                      <div className="back_loan_btn_div">
                        <button
                          className="back_loan_btn"
                          onClick={BackLoan}
                          id={data.newLoanID}
                          // disabled={disable}
                        >
                          Fund
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </>
      ) : null}

      {stage == "loading" ? (
        <div className="bacModal_div">
          <div className="back_modal_container">
            <div className="back_modal_cont">
              <FontAwesomeIcon icon={faCircleNotch} spin />
              <p className="text-center">{text}</p>
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
              successMessage={text}
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
      ) : null}
    </div>
  );
};

export default DashBoard_lend_details_page;
