import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import Blockies from "react-blockies";

import { CALL_CHECK_USER_AND_MEMBERSHIP } from "../../../services/userServices";
// import Timer from "./Timer";
// import { addDays, format } from "date-fns";
// import { Link } from "react-router-dom";
// import { CopperLoading } from "respinner";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { connect } from "react-redux";
import UserDetailsLinks from "./UserDetailsLinks";
import Web3 from "web3";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
// import TollIcon from "@mui/icons-material/Toll";
import { numberWithCommas } from "../../../static";
// import { numberWithCommas } from "../../static/static";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import "../../../css/dashboard_user_details.css";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Accordion from "../Accordion";
// import InventoryIcon from "@mui/icons-material/Inventory";
import Nodata from "./nodataComponent/Nodata";
// import CloseIcon from "@mui/icons-material/Close";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import axios from "axios";
// import { config } from "../../../actions/Config";
// import { getAuthUserStats } from "../../../actions/token";
// import {
//   API_URL as api_url,
//   PENDING,
//   COMPLETED,
//   CANCELLED,
// } from "../../../actions/types";
// // import { numberWithCommas } from "../../static/static";
// import { formatDuration, intervalToDuration } from "date-fns";
// import { getUserStats } from "../../../web3/index";
// import Web3 from "web3";
import { CALL_UPDATE_MY_PROFILE } from "../../../services/userServices";
import { tokenBalance } from "../../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
const { REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS } = process.env;

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
  const [memberStatus, setMemberStatus] = useState("N/A");
  const [activeTab, setActiveTab] = useState("buyer");
  const [activeBtn, setActiveBtn] = useState("Ongoing");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const {
    firstName,
    lastName,
    phoneNumber,
    address,
    address2,
    country,
    state,
    zipCode,
  } = formData;
  const toggleActiveBtn = (event) => {
    setActiveBtn(event.currentTarget.id);
  };
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
    if (account) {
      setWalletAddr(account);
      setConnectTxt("Connected");
    }
  }, [account]);
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

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          REACT_APP_EGC_ADDRESS,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setEGCBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
        let res2 = await tokenBalance(
          REACT_APP_EUSD_ADDRESS,
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

  const toggleActiveTab = (e) => {
    let active = e.currentTarget.id;
    setActiveTab(active);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateProfile = async () => {
    const body = JSON.stringify({
      fullname: firstName + " " + lastName,
      phoneNumber,
      address,
      address2,
      country,
      state,
      zipCode,
      walletAddress: walletAddr,
    });

    const response = await CALL_UPDATE_MY_PROFILE(body);
    console.log(response);
  };
  // useEffect(() => {
  //   if (account) {
  //     setMemberStatus("");
  //   }
  // }, [account]);
  useEffect(async () => {
    if (account) {
      const response = await CALL_CHECK_USER_AND_MEMBERSHIP(account);
      console.log(response.data);
      console.log(response.data.userMembership);
      if (response.data.userMembership === true) {
        setMemberStatus("Active");
      } else {
        setMemberStatus("Inactive");
      }

      if (response.data.users.fullName !== null) {
        const FullName = response.data.users.fullName.split(" ");
        console.log(FullName, "FullName");
        setFormData({
          firstName: FullName[0],
          lastName: FullName[1],
          phoneNumber: response.data.users.phoneNumber,
          address: response.data.users.userAddress,
          address2: response.data.users.userAddress2,
          country: response.data.users.country,
          state: response.data.users.state,
          zipCode: response.data.users.zipCode,
        });
      } else {
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          address2: "",
          country: "",
          state: "",
          zipCode: "",
        });
      }
    }
  }, [account]);
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
            <UserDetailsLinks activeLink={activeLink} />

            <div className="userdAshboard_head">
              <div className="userdAshboard_head_area">
                {memberStatus === "Active" ? (
                  <div className="metamask_prof_pic_vip">
                    <img
                      src="/img/membership_icons/membership_badge.svg"
                      alt=""
                      className="metamask_prof_pic_vip_badge"
                    />
                    <Blockies
                      seed={account}
                      size={8}
                      scale={4}
                      className="blockies_icon_user_vip"
                    />
                  </div>
                ) : memberStatus === "Inactive" ? (
                  <div className="metamask_prof_pic">
                    <Blockies
                      seed={account}
                      size={8}
                      scale={4}
                      className="blockies_icon_user"
                    />
                  </div>
                ) : null}

                <div className="user_walletAddress">
                  <div className="wallet_addr_cont">
                    <div className="wallet_addr_cont_txt">{walletAddr}</div>

                    <CopyAllIcon className="copy_all_tx_hash_icon" />
                  </div>
                  <span className="connected_txt">{conecttxt}</span>
                </div>
              </div>
              {/* <span className="hr_vertical"></span> */}
              {/* <div className="welcome_bonus_div">
                <div className="welcome_bonus_div_head"> */}
              {/* <div className="welcome_bonus_icon_div">
                    <StarRateIcon className="welcome_bonus_icon_div_icon" />
                  </div> */}
              {/* Membership Status */}
              {/* </div>
                <div className="welcome_bonus_div_body">{memberStatus}</div>
              </div> */}
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
                    <img
                      src="/providers/binanceWallet.png"
                      alt=""
                      className="user_details_body1_body_cont1_span1
                      _img"
                    />{" "}
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
                    <img
                      src="/img/egc_icon2.svg"
                      alt=""
                      className="user_details_body1_body_cont1_span1
                      _img"
                    />{" "}
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
                    <img
                      src="/img/binance-usd-busd-logo.webp"
                      alt=""
                      className="user_details_body1_body_cont1_span1
                      _img"
                    />{" "}
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
                    Sold:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">0</span>
                </div>
                <hr class="custom_hr"></hr>
                <div className="user_details_body1_body_cont1">
                  <span className="user_details_body1_body_cont1_span1">
                    Bought:
                  </span>
                  <span className="user_details_body1_body_cont1_span2">0</span>
                </div>
              </div>
            </div>
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* <div className="userDetails_div">
              <div className="user_details_div_head">User Information</div>
              <div className="user_details_area">
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">First Name*</div>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">Last Name*</div>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">Phone No*</div>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">
                    Address Line 1*
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">
                    Address Line 2 (optional)
                  </div>
                  <input
                    type="text"
                    name="address2"
                    value={address2}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">State*</div>
                  <input
                    type="text"
                    name="state"
                    value={state}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">Country*</div>
                  <input
                    type="text"
                    name="country"
                    value={country}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="user_details_area_div1">
                  <div className="user_details_area_div1_head">Zip Code*</div>
                  <input
                    type="text"
                    name="zipCode"
                    value={zipCode}
                    className="user_details_area_div1_input"
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="user_details_area_btn_div">
                <button
                  className="user_details_area_btn"
                  onClick={updateProfile}
                >
                  Submit
                </button>
              </div>
            </div> */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
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
