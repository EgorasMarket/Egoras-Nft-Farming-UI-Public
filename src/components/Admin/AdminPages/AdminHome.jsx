import React, { useState, useEffect, useRef, useMemo } from "react";
import "../AdminStyles/AdminHome.css";
import jazzicon from "@metamask/jazzicon";
import { CopperLoading } from "respinner";
import StarRateIcon from "@mui/icons-material/StarRate";
import CopyAllIcon from "@mui/icons-material/CopyAll";
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
const AdminHome = () => {
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
            <div className="userdAshboard_head withdraw_head">
              <div className="userdAshboard_head_username">
                <span className="userdAshboard_head_username_head">Admin:</span>{" "}
                <span className="userdAshboard_head_username_para">
                  Agip Branch
                </span>{" "}
              </div>
              <span className="hr_vertical"></span>
              {/* <div className="userdAshboard_head_username">
                <span className="userdAshboard_head_username_head">
                  KYC Status:
                </span>{" "}
                <span className="userdAshboard_head_username_para">
                  {kycStatus}
                </span>{" "}
              </div> */}
              <div className="branch_withdraw_funds_div">
                <button className="withdraw_funds_btn">Withdraw Funds</button>
                <button className="withdraw_funds_btn">Pay Back Funds</button>
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
                  {/* <div className="welcome_bonus_icon_div">
                    <StarRateIcon className="welcome_bonus_icon_div_icon" />
                  </div> */}
                  Total Amount Funded
                </div>
                <div className="welcome_bonus_div_body">
                  {" "}
                  3,000,000
                  <span className="engn_symbol_sign">Engn</span>
                </div>
              </div>
            </div>
            <div className="user_details_body1">
              <div className="user_details_body1_body_cont_area1">
                <div className="user_details_body1_body_cont1_head">
                  Branch Details
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Branch Balance</span>
                  <span>3,000 Engn</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Amount Funded By Lenders</span>

                  <span>3,000,000 Engn</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1_last_layer">
                  <div className="user_details_body1_body_cont1_layer1">
                    <span>Total Asset Value</span>
                    <span> 6,000,000 Engn</span>
                  </div>
                </div>
              </div>
              <div className="user_details_body1_body_cont_area1">
                {/* <div className="user_details_body1_body_cont1_head">
                  User Details
                </div>
                <hr class="custom_hr"></hr> */}

                <div className="user_details_body1_body_cont1">
                  <span>Total Lenders</span>
                  <span>27</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Total Assets</span>
                  <span>52</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Funded Assets</span>
                  <span>32</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span>Unfunded Assets</span>
                  <span>20</span>
                </div>
              </div>
            </div>
            <div class="Asset_Originator_Details_cont_body">
              <div className="admin_transact_data_graph">
                <div className="admin_transact_data_graph_head">
                  Total Transactions : 3,000,000 Engn
                  <div className="admin_transact_data_graph_head_sub">
                    Transaction Count : 17txn
                  </div>
                </div>
                <div className="admin_transact_data_graph_body">
                  <div
                    className="assets_chart_area1"
                    style={{ width: "100%", height: "300px" }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={btc}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#60c589"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#60c589"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        {/* <XAxis dataKey="name" /> */}
                        {/* <YAxis /> */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#229e54"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className="assets_chart_area2"
                    style={{ width: "100%", height: "300px" }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={btc}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#fff"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#fff"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        {/* <XAxis dataKey="name" /> */}
                        {/* <YAxis /> */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#fff"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
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

export default AdminHome;
