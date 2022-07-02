import React, { useState, useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";
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
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
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
  }, []);
  useEffect(() => {
    // if (account === true) {
    // var tokenInst = new web3.eth.Contract(tokenABI, tokenAddress);
    // tokenInst.methods
    //   .balanceOf("0x260c25f991171850f48889eb9d8aF11998D20c30")
    //   .call()
    //   .then(function (bal) {
    //     console.log(bal);
    //   });l
  }, []);

  const assets = [
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
    {
      id: 1,
      img: "/img/pool_asset_icon.png",
      Pool: "Real-World Asset Market",
      Date: "June 3rd 2022",
      EndDate: "September 3rd 2022",
      txHash:
        "0x1b0d1ff88db603ae22581ba820d1a27cd21b853d956219ded76a28ea83426bf7",
      Amount: "150,000",
      Senior_APY: "13.10",
      //   Status: "Ongoing",
    },
  ];

  const toggleSeemore = () => {
    setSeemore(!seemore);
  };
  return (
    <div className="other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}

      <section className=" no-bg ">
        <div className="container">
          <div className="user_dashboard_area">
            <div className="userdAshboard_head">
              <div className="userdAshboard_head_area">
                <div className="metamask_prof_pic" ref={avatarRef}></div>
                <div className="user_walletAddress">
                  <div className="wallet_addr_cont">
                    {walletAddr}
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
                    <span>{UserPoolsDetails.lockedBalance} Engn</span>
                  )}
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Usd Balance</span>
                  <span>0.00 USD</span>
                </div>

                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1_last_layer">
                  <div className="user_details_body1_body_cont1_layer1">
                    <span>Current senior yield (30d APY)</span>
                    <span> 10.76 %</span>
                  </div>
                  <div className="user_details_body1_body_cont1_layer1">
                    <span> Fixed senior rate (APR)</span>
                    <span> 10.00 %</span>
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
                <hr class="custom_hr"></hr>
                <button className="redeem_btn">Redeem Earnings</button>
              </div>
            </div>

            <div className="recent_transaction_body">
              <div className="recent_transaction_body_head" id="transact_head">
                Recent Transactions
              </div>
              <div className="asset_list_body">
                <div className="asset_list_body_head list_body_head2">
                  {/* <div className="asset_list_body_head_tab1">Asset Id</div> */}
                  <div className="asset_list_body_head_tab1">Pool</div>
                  <div className="asset_list_body_head_tab2">Date</div>
                  <div className="asset_list_body_head_tab3">Amount(Engn)</div>
                  <div className="asset_list_body_head_tab4">Senior APY</div>
                  <div className="asset_list_body_head_tab7">Txn Hash</div>
                </div>
                <div className="asset_list_body_body_cont">
                  {(seemore == false ? assets.slice(0, 6) : assets).map(
                    (data) => (
                      <div
                        className="asset_list_body_body_cont_1"
                        id={data.id}

                        //   onClick={ChangeAssetDetailModal}
                      >
                        {/* <div className="asset_list_body_body_cont_1a">
                              {data.id}
                            </div> */}
                        <div className="asset_list_body_body_cont_1a">
                          <img
                            src={data.img}
                            alt=""
                            className="assets-list-icon_pool_icon"
                          />{" "}
                          {data.Pool}
                        </div>

                        <div className="asset_list_body_body_cont_1b">
                          {data.Date}
                        </div>
                        <div className="asset_list_body_body_cont_1c">
                          {data.Amount}
                        </div>
                        <div className="asset_list_body_body_cont_1d">
                          {data.Senior_APY}%
                        </div>
                        <div className="asset_list_body_body_cont_1g">
                          {data.txHash.substring(0, 24) + "..."}
                        </div>
                      </div>
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
    </div>
  );
};

export default DashBoardUserDetails;
