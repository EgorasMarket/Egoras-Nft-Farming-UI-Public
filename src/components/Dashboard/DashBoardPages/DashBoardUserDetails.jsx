import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import Timer from "./Timer";
import { addDays, format } from "date-fns";

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
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
import { API_URL as api_url } from "../../../actions/types";
import { formatDuration, intervalToDuration } from "date-fns";
// import Web3 from "web3";
import {
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
} from "../../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
const DashBoardUserDetails = () => {
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [seemore, setSeemore] = useState(false);
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [loanAsset, setLoanAsset] = useState([]);
  const [disable, setDisable] = useState(true);

  const [tokenBal, setTokenBal] = useState(0.0);
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
  useEffect(() => {
    // if (account) {
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
    // }
  }, []);
  useEffect(() => {
    // if (account) {
    axios
      .get(api_url + "/api/lend/user/transaction/" + account, null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful333333");
        console.log("/api/lend/user/transaction/" + account);
        setLoanAsset(data.data.payload);
        // console.log(txnhash);
        // setBranches(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    //   return;
    // }
  }, []);

  const toggleSeemore = () => {
    setSeemore(!seemore);
  };

  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  const ChangeAssetDetailModal = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setAssetDetailModal(currentTarget);
  };
  return (
    <div className="other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className=" no-bg no_paddd ">
        <div className="container">
          <div className="user_dashboard_area">
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
            </div>
            <div className="user_details_body1">
              <div className="user_details_body1_body_cont_area1">
                <div className="user_details_body1_body_cont1_head">
                  User Details
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Your Balance</span>
                  <span>{tokenBal} Engn</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Locked</span>

                  {UserPoolsDetails.lockedBalance === null ? (
                    <span>0.00 Engn</span>
                  ) : (
                    <span>
                      {parseInt(UserPoolsDetails.lockedBalance).toFixed()} Engn
                    </span>
                  )}
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Usd Balance</span>
                  <span>{parseInt(tokenBal / 570).toFixed(2)} USD</span>
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
                  <span>Total Pools Funded</span>
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
              <div className="asset_list_body">
                <div className="asset_list_body_head list_body_head2">
                  {/* <div className="asset_list_body_head_tab1">Asset Id</div> */}
                  <div className="asset_list_body_head_tab1">Pool</div>
                  <div className="asset_list_body_head_tab2">Date</div>
                  <div className="asset_list_body_head_tab3">Amount(Engn)</div>
                  <div className="asset_list_body_head_tab3">
                    Amount Funded(Engn)
                  </div>
                  <div className="asset_list_body_head_tab4">Senior APY</div>
                  <div className="asset_list_body_head_tab7">Txn Hash</div>
                </div>
                <div className="asset_list_body_body_cont">
                  {loanAsset.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No funded pools yet.
                      </div>{" "}
                    </div>
                  ) : (
                    (seemore == false ? loanAsset.slice(0, 6) : loanAsset).map(
                      (data) => (
                        <div
                          className="asset_list_body_body_cont_1"
                          id={data.id}
                          onClick={ChangeAssetDetailModal}
                        >
                          {/* <div className="asset_list_body_body_cont_1a">
                              {data.id}
                            </div> */}
                          <div className="asset_list_body_body_cont_1a">
                            <img
                              src="/img/pool_asset_icon.png"
                              alt=""
                              className="assets-list-icon_pool_icon"
                            />{" "}
                            {data.title.substring(0, 15) + "..."}
                          </div>

                          <div className="asset_list_body_body_cont_1b">
                            {data.createdAt.slice(0, 10)}
                          </div>
                          <div className="asset_list_body_body_cont_1c">
                            {parseInt(data.amount).toFixed(2)}
                          </div>
                          <div className="asset_list_body_body_cont_1c">
                            {parseInt(data.funded).toFixed(2)}
                          </div>
                          <div className="asset_list_body_body_cont_1d">
                            13%
                          </div>
                          <div className="asset_list_body_body_cont_1g">
                            {data.transactionHash.substring(0, 24) + "..."}
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
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
      {loanAsset.map((data) => {
        var ms = new Date(data.updatedAt).getTime() + 86400000 * 30;
        // console.log(ms);
        var endDate = new Date(ms);
        console.log(endDate);
        if (new Date() === endDate) {
          setDisable(false);
        }
        return (
          <>
            {assetDetailModal == data.id ? (
              <div className="asset_detail_modal_div">
                <div className="asset_detail_modal_div_conts">
                  <div className="asset_detail_heading" style={{ margin: "0" }}>
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
                        {parseFloat(data.funded * 0.015).toFixed(2)} Engn
                      </span>
                      <Timer deadline={new Date(endDate)} />
                      {/* <span className="reward_txt">Redeem Reward In</span> */}

                      <span className="reward_btn_div">
                        <button className="reward_btn" disabled={disable}>
                          Reedem
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
                              : data.state === "Failed"
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
                            {parseInt(data.amount).toFixed()} Engn
                          </div>
                        </div>
                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Amount Funded
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {parseInt(data.funded).toFixed()} Engn
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
                          href="https://bscscan.com/tx/0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7"
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
    </div>
  );
};

export default DashBoardUserDetails;
