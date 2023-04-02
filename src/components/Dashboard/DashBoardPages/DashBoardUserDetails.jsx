import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import Timer from "./Timer";
import { addDays, format } from "date-fns";
import { Link } from "react-router-dom";
import { CopperLoading } from "respinner";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { connect } from "react-redux";
import { SuccessModal, ErrorModal } from "./Modal/Success_Error_Component";
import StarRateIcon from "@mui/icons-material/StarRate";
import Web3 from "web3";
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
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [egcBalance, setEGCBalance] = useState("0");
  const [egcBalanceUsd, setEGCBalanceUsd] = useState("0");
  const [eusdBalance, setEUSDBalance] = useState("0");
  const [eusdBalanceUsd, setEUSDBalanceUsd] = useState("0");
  const [seemore, setSeemore] = useState(false);
  const [loanAsset, setLoanAsset] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const [coinBalanceUsd, setCoinBalanceUsd] = React.useState("0.00");
  const [egcUsdVal, setEgcUsdVal] = useState("0.00");
  const [eusdUsdVal, setEusdUsdVal] = useState("0.00");
  const [BnbUsdVal, setBnbUsdVal] = useState("0.00");
  const [TotalPortfolio, setTotalPortfolio] = useState("0.00");

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

  const toggleSeemore = () => {
    setSeemore(!seemore);
  };

  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
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
  });

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setEGCBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
        let res2 = await tokenBalance(
          "0x58f66d0183615797940360a43c333a44215830ba",
          account,
          library.getSigner()
        );
        console.log(res2);
        console.log(formatEther(res2.message._hex));
        setEUSDBalance(parseFloat(formatEther(res2.message._hex)).toFixed(2));
      }
    },
    [account]
  );
  const web3 = new Web3(window.ethereum);
  useEffect(async () => {
    if (account) {
      const getBalance = await web3.eth.getBalance(account);
      const ethBalance = web3.utils.fromWei(getBalance, "ether");
      console.log(ethBalance);
      setCoinBalance(parseFloat(ethBalance).toFixed(4));
    }
  }, [coinBalance, account]);
  useEffect(
    async (e) => {
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          console.log(egc_usd_val);
          setEgcUsdVal(() => egc_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
      let string3 =
        "https://api.coingecko.com/api/v3/simple/price?ids=binance-usd&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string3)
        .then((resp) => resp.json())
        .then((data) => {
          const eusd_usd_val = data["binance-usd"].usd;
          console.log(eusd_usd_val);
          setEusdUsdVal(() => eusd_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
      let string4 =
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string4)
        .then((resp) => resp.json())
        .then((data) => {
          const bnb_usd_val = data["binancecoin"].usd;
          console.log(bnb_usd_val);
          setBnbUsdVal(() => bnb_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
      // setTotalPortfolio(egcUsdVal + eusdUsdVal + BnbUsdVal);
    },
    [egcUsdVal, eusdUsdVal, BnbUsdVal]
  );
  useEffect(() => {
    const bnbVal = parseInt(coinBalance * BnbUsdVal);
    const egcVal = parseInt(egcBalance * egcUsdVal);
    const eusdVal = parseInt(eusdBalance * eusdUsdVal);
    const Portfolio = bnbVal + egcVal + eusdVal;
    setEGCBalanceUsd(egcVal);
    setEUSDBalanceUsd(eusdVal);
    setCoinBalanceUsd(bnbVal);
    console.log(Portfolio);
    setTotalPortfolio(Portfolio);
  }, [coinBalance, egcBalance, eusdBalance, BnbUsdVal, egcUsdVal, eusdUsdVal]);

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
                <GroupAddIcon className="asset_overview_link_icon" />
                Referral
              </Link>
              <Link
                to="/app/user/sales"
                className={
                  activeLink === "sales"
                    ? "pool_lend_details_link_active"
                    : "pool_lend_details_link"
                }
              >
                <TrendingDownIcon className="asset_overview_link_icon" />
                Sales
              </Link>
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
            </div>
            <div className="user_details_body1">
              <div className="user_details_body1_body_cont_area1">
                <div className="user_details_body1_body_cont1_head">
                  <div className="user_details_body1_body_cont1_head1">
                    Portfolio
                  </div>
                  <div className="user_details_body1_body_cont1_head2">
                    $ {numberWithCommas(parseFloat(TotalPortfolio).toFixed(2))}
                  </div>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    BNB:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">
                    {coinBalance}
                    <span className="user_details_body1_body_cont1_span2_span">
                      ~$ {numberWithCommas(coinBalanceUsd)}
                    </span>
                  </span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    EGC:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">
                    {numberWithCommas(egcBalance)}
                    <span className="user_details_body1_body_cont1_span2_span">
                      ~$ {numberWithCommas(egcBalanceUsd)}
                    </span>
                  </span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    EUSD:{" "}
                  </span>
                  <span className="user_details_body1_body_cont1_span2">
                    {numberWithCommas(eusdBalance)}
                    <span className="user_details_body1_body_cont1_span2_span">
                      ~$ {numberWithCommas(eusdBalanceUsd)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="user_details_body1_body_cont_area1">
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    Total Transactions
                  </span>
                  <span className="user_details_body1_body_cont1_span2">0</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    Swap:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">0</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    Stake:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">0</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    Sell:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">0</span>
                </div>
              </div>
            </div>

            <div className="recent_transaction_body">
              <div className="recent_transaction_body_head" id="transact_head">
                Transactions
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
                        Type
                      </th>
                      <th className="branch_asset_heading_titles">Time</th>
                      <th className="branch_asset_heading_titles">Amount</th>
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
                      {loanAsset.map((asset) => {
                        return (
                          <tr className="branch_asset_body_row ">
                            <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                              <div className="assets-data"></div>
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
    </div>
  );
};

// export default DashBoardUserDetails;
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// let  res = await getLogin2(
export default connect(mapStateToProps, {})(DashBoardUserDetails);
