import React, { useRef, useEffect, useState, useContext } from "react";
import "./stars.css";
// import React from "react";
// import { Link } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import HowToVoteIcon from "@mui/icons-material/HowToVote";
// import CasinoIcon from "@mui/icons-material/Casino";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import formatNumber from "../Dashboard/DashBoardPages/FormatNumber";
import axios from "axios";
import { config } from "../../actions/Config";
import { API_URL } from "../../actions/types";
import { CALL_CHECK_USER_AND_MEMBERSHIP } from "../../services/userServices";
import { tokenBalance } from "../../web3";
import Web3 from "web3";

import "react-multi-carousel/lib/styles.css";

import "./countdown.css";
import "../../css/home.css";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
import { parseEther, formatEther } from "@ethersproject/units";

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import "./Logos.css";
import { GET_TVL } from "../../services/stakeServices";
import {
  GET_COIN_GEKO_PRICE,
  GET_COIN_GEKO_PRICE_IN_USD,
  GET_COIN_GEKO_PRICGET_TVLE_IN_USD,
} from "../../services/generalServices";
import { ConstructionSharp } from "@mui/icons-material";

export const HowItWorksArea1 = () => {
  return (
    <div className="how_it_works_update_new_area_2">
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            <img
              src="/img/member_home_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Become a member
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Subscribe to a membership plan and gain access to our inventory of
            products and services.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/swap_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">Swap</div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Exchange your funds for USDm, a stablecoin that is pegged to the US
            dollar.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/purchase_home_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Purchase products
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Purchase manufactured products at a discounted price using USDm and
            generate up to a 65% profit margin.
          </div>
        </div>
      </div>
    </div>
  );
};
export const HowItWorksArea2 = () => {
  return (
    <div className="how_it_works_update_new_area_2">
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            <img
              src="/img/stake_home_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Stake
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Become a member and provide liquidity to the protocol by locking
            your MARTGPT tokens for a specified period of time.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/reward_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Claim your Reward
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Earn up to 12% annual percentage yield (APY) on your staked MARTGPT
            tokens.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/swap_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">Swap</div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Convert your rewards to Binance Coin (BNB) or other cryptocurrencies
            with ease.
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const context = useWeb3React();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [homeData, setHomeData] = useState({
    tvl: "0",
    volume: "0",
    users: 0,
  });

  const [aboutVideoModal, setAboutVideoModal] = useState(false);
  const [animate1, setAnimate1] = useState(true);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);
  const [animate4, setAnimate4] = useState(false);
  const [egcUsd, setEgcUsd] = useState(0);
  const [egcVal, setEgcVal] = useState(0);
  const [egcVal2, setEgcVal2] = useState(0);
  const [egrVal, setEgrVal] = useState(0);
  const [egrVal2, setEgrVal2] = useState(0);
  const [egrUsd, setEgrUsd] = useState(0);
  const [sumVals, setSumVals] = useState(0);
  const [sumVals2, setSumVals2] = useState(0);
  const [valDisplay, setValDisplay] = useState(0);
  const [valDisplay2, setValDisplay2] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [TotalSum, setTotalSum] = useState(0);
  const [lockedValue, setLockedValue] = useState(0);
  const [totalAmountFrom, setTotalAmountFrom] = useState(0);
  const [totu, setTotu] = useState(0);
  const [totalTVL, setTotalTVL] = useState(0);
  const [TradeVolume, setTradeVolume] = useState(0);
  const [activeTab, setActiveTab] = useState("distribute");
  // const [uiMode, setUiMode] = useState(localStorage.getItem("uiMode"));
  // const []
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
  const assets = [
    {
      img: "/img/egc-icon.svg",
      name: "Egoras Credit",
      type: "EGC",
      eusd_Avail: "90M",
      stable: "0.0%",
      ratio: "120%",
    },
  ];

  const toggleAboutVideoModal = () => {
    setAboutVideoModal(!aboutVideoModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const results = assets.filter((person) =>
      person.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);
  // const fetchData = async () => {

  //   // if (response.data.userMembership == false) {subscriptionStatus

  //   // }
  // };
  useEffect(async () => {
    if (account) {
      const response = await CALL_CHECK_USER_AND_MEMBERSHIP(account);
      console.log(response.data);
      setSubscriptionStatus(response.data.userMembership);
      return;
    }
  }, [account]);

  useEffect(() => {
    const fetchData = async () => {
      const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
      const response = await GET_TVL();

      console.log(response, "google");
      const tvl = egc_usd * response.tvl.tvl;
      const numberOfUsers = response.users;

      const main = parseFloat(tvl).toFixed(2);
      setHomeData({
        ...homeData,
        volume: main,
        users: numberOfUsers,
      });
    };
    fetchData();
  }, []);

  useEffect(
    async (e) => {
      let string =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string)
        .then((resp) => resp.json())
        .then((data) => {
          const egr_usd_val = data["egoras"].usd;
          // console.log(egr_usd_val);
          setEgrUsd(() => egr_usd_val);
        })
        .catch((err) => {
          console.log(err);
        });
      // ===============================
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          // console.log(egc_usd_val);
          setEgcUsd(() => egc_usd_val);
        })
        .catch((err) => {
          console.log(err);
        });
      setSumVals(() => parseInt(egcVal) + parseInt(egcVal2));
      setSumVals2(() => parseInt(egrVal) + parseInt(egrVal2));
      setValDisplay(() => egcUsd * sumVals);
      setValDisplay2(() => egrUsd * sumVals2);
      setTotalSum(() => valDisplay + valDisplay2);
      setTotalAmountFrom(() => TotalSum * 0.95);
      setTotu(() => Math.round(totalAmountFrom));

      // console.log(egcUsd, egrUsd);
      // console.log(totalAmountFrom);
    },
    [
      valDisplay,
      valDisplay2,
      sumVals,
      sumVals2,
      egcUsd,
      egrUsd,
      egcVal,
      egcVal2,
      TotalSum,
      totu,
      totalAmountFrom,
    ]
  );

  const tOTU1 = 2041224;
  // const tOTU2 = tOTU;
  // console.log(totu, "amount from utututututu");
  const Partners = [
    { img: "/img/FeaturedInLogos/FeaturedInLogos_1.svg" },
    { img: "/img/FeaturedInLogos/FeaturedInLogos_3.svg" },
    { img: "/img/FeaturedInLogos/FeaturedInLogos_6.svg" },
    { img: "/img/FeaturedInLogos/FeaturedInLogos_5.svg" },
  ];
  useEffect(async (e) => {
    // const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
    let res = await tokenBalance(
      "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
      "0xdA337c23F71b1FFc7b7ED345890B5eBA9eb5b599",
      library.getSigner()
    );
    console.log(res);
    console.log(formatEther(res.message));
    let tvl = formatEther(res.message);
    setTotalTVL(tvl * egcUsd);
  });
  // useEffect(async (e) => {
  //   const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
  //   let res = await tokenBalance(
  //     "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
  //     "0xdA337c23F71b1FFc7b7ED345890B5eBA9eb5b599",
  //     library.getSigner()
  //   );
  //   console.log(res);
  //   console.log(formatEther(res.message));
  //   let tvl = formatEther(res.message);
  //   setTotalTVL(tvl * egc_usd);
  // }, []);
  useEffect(async () => {
    const egc_usd = await GET_COIN_GEKO_PRICE_IN_USD();
    console.log("dddd");
    await axios
      .get(API_URL + "/swap/all", null, config)
      .then((data) => {
        const myArray = data.data.data;
        myArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        console.log(myArray);
        const reversed = myArray
          .slice()
          .reverse()
          .map((data) => {
            return data;
          });
        const temp = reversed;
        for (const data of temp) {
          data.value = parseInt(data.value).toFixed(2) * egc_usd;
        }
        const totalValue = reversed.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.value;
        }, 0);
        console.log(totalValue);
        setTradeVolume(parseInt(totalValue).toFixed(2));
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const ToggleActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  return (
    <div>
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}
      {/* Tokens Section Start */}
      {/* Tokens Section Start */}
      {/* Tokens Section Start */}
      {/* Tokens Section Start */}
      {/* third section start */}
      <section className="earning-section">
        <div className="container">
          <div className="nft-area2">
            <div className="nft-txt-area2 " style={{ width: "100%" }}>
              <div className="span-txts">
                <p className="span4a-txts">
                  Decentralized finance for
                  <br />
                  <span className="real_life"> smart manufacturing.</span>
                </p>
                <p className="span4b-txts">
                  A blockchain-based ecosystem for providing structured credit
                  to smart manufacturing in emerging markets.
                </p>
              </div>
              <div className="stake-hero-btns">
                <a href="/app" className="stake-hero-btn2">
                  Launch App <ExitToAppIcon className="exit-to-app" />
                </a>
                {!subscriptionStatus ? (
                  <a href="/membership/sub" className="stake-hero-btn1">
                    Become a member
                  </a>
                ) : null}
                {/* <a href="/app/whitepaper" className="stake-hero-btn1">
                  Read Docs
                </a> */}
              </div>
            </div>

            <div className="nft_area2_stat_div_area">
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/some_icons/tvl_icon_dark.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_dark"
                  />
                  <img
                    src="/img/some_icons/tvl_icon_light.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_light"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Total TVL
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    $ {formatNumber(homeData.volume)}
                  </div>
                </div>
              </div>
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/some_icons/volume_icon_dark.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_dark"
                  />
                  <img
                    src="/img/some_icons/volume_icon_light.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_light"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Total Volume
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    ${formatNumber(TradeVolume.toString())}
                  </div>
                </div>
              </div>
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/some_icons/users_icon_dark.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_dark"
                  />
                  <img
                    src="/img/some_icons/users_icon_light.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_light"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Total Users
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    {formatNumber(homeData.users)}
                  </div>
                </div>
              </div>
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/some_icons/apy_icon_dark.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_dark"
                  />
                  <img
                    src="/img/some_icons/apy_icon_light.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon_light"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Est APY
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    12%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stars_div">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>
        {/* <img src="/img/hero_bg_bg.png" alt="" className="blurDrop-token2" /> */}
        {/* <img src="/img/hero_backdrop.png" alt="" className="hero_backdrop" /> */}
        <img
          src="/img/martgpt_logoand_hero_bg.png"
          alt=""
          className="hero_backdrop"
        />
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      <section className="how_it_works_update_new_section">
        <div className="container">
          <div className="how_it_works_update_new_area">
            <div className="how_it_works_update_new_area_1">
              <div className="how_it_works_update_new_area_1_title">
                How it <span className="real_life">works</span>
              </div>
              <div className="how_it_works_update_new_area_1_tab">
                <div
                  id="distribute"
                  className={
                    activeTab == "distribute"
                      ? "how_it_works_update_new_area_1_tab_1_active"
                      : "how_it_works_update_new_area_1_tab_1"
                  }
                  onClick={ToggleActiveTab}
                >
                  Distributors
                </div>
                <div
                  id="defi"
                  className={
                    activeTab == "defi"
                      ? "how_it_works_update_new_area_1_tab_1_active"
                      : "how_it_works_update_new_area_1_tab_1"
                  }
                  onClick={ToggleActiveTab}
                >
                  Defi
                </div>
              </div>
            </div>
            {activeTab === "distribute" ? <HowItWorksArea1 /> : null}
            {activeTab === "defi" ? <HowItWorksArea2 /> : null}
          </div>
        </div>
        {/* <img
          src="/img/right_lines_design.png"
          alt=""
          className="how_it_works_update_new_section_bg_right"
        /> */}
        <img
          src="/img/left_lines_design.png"
          alt=""
          className="how_it_works_update_new_section_bg_left"
        />
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      <section className="martgptfeauturesSection">
        <div className="container">
          <div className="martgptfeauturesSection_area">
            <div className="martgptfeauturesSection_area1">
              <div className="martgptfeauturesSection_area1_cont1">
                <div className="martgptfeauturesSection_area1_cont1_title">
                  Sructured credit to smart manufacturing in
                  <span className="real_life"> emerging markets.</span>
                </div>
                <div className="martgptfeauturesSection_area1_cont1_para">
                  Martgpt ecosystem could revolutionize structured credit
                  provision in emerging markets, accelerate smart manufacturing
                  adoption, and boost economic growth.
                </div>
              </div>
              <div className="martgptfeauturesSection_area1_cont2">
                <button className="martgptfeauturesSection_area1_cont2_btn">
                  Get Started
                </button>
              </div>
            </div>
            <div className="martgptfeauturesSection_area2">
              <div className="martgptfeauturesSection_area2_cont1">
                <div className="martgptfeauturesSection_area2_cont1_div2_cont1_border_first">
                  <div className="martgptfeauturesSection_area2_cont1_div1">
                    <div className="martgptfeauturesSection_area2_cont1_div1_icon">
                      <img
                        src="/img/audit_icon.svg"
                        alt=""
                        className="martgptfeauturesSection_area2_cont1_div2_cont1_icon_img2"
                      />
                    </div>
                    <div className="martgptfeauturesSection_area2_cont1_div1_title">
                      Improved traceability.
                    </div>
                    <div className="martgptfeauturesSection_area2_cont1_div1_para">
                      Martgpt’s platform provides a detailed, end-to-end audit
                      trail of all transactions associated with the components
                      used in manufacturing, enabling users to track the
                      provenance of components and verify their authenticity.
                    </div>
                  </div>
                </div>
                {/* ======== */}
                {/* ======== */}
                {/* ======== */}
                {/* ======== */}
                <div className="martgptfeauturesSection_area2_cont1_div2">
                  <div className="martgptfeauturesSection_area2_cont1_div2_cont1_border">
                    <div className="martgptfeauturesSection_area2_cont1_div2_cont1">
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_div1">
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_title">
                          Automated payments.
                        </div>
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_para">
                          A decentralized infrastructure that enables automation
                          of payments, which reduces errors and increases
                          efficiency. For example, a maintenance provider can be
                          paid automatically from the tresury when they perform
                          maintenance on factory equipment.
                        </div>
                      </div>
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_icon">
                        <img
                          src="/img/wallet_pay_icon.svg"
                          alt=""
                          className="martgptfeauturesSection_area2_cont1_div2_cont1_icon_img"
                        />
                      </div>
                    </div>
                  </div>
                  {/* ======== */}
                  {/* ======== */}
                  {/* ======== */}
                  {/* ======== */}
                  <div className="martgptfeauturesSection_area2_cont1_div2_cont1_border_last">
                    <div className="martgptfeauturesSection_area2_cont1_div2_cont1_last">
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_div1">
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_title">
                          Improved human resources management
                        </div>
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_para">
                          A protocol that can help streamline a variety of
                          traditionally labor-intensive HR tasks, such as
                          tracking hours worked and paying workers accordingly.
                          People's employment histories are recorded and
                          authenticated.
                        </div>
                      </div>
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_icon">
                        <img
                          src="/img/hr_manage_icon.svg"
                          alt=""
                          className="martgptfeauturesSection_area2_cont1_div2_cont1_icon_img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ========== */}
              {/* ========== */}
              {/* ========== */}
              {/* ========== */}
              {/* ========== */}
              <div className="martgptfeauturesSection_area2_cont2">
                <div className="martgptfeauturesSection_area2_cont1_div2_cont1_border_first">
                  <div className="martgptfeauturesSection_area2_cont1_div1">
                    <div className="martgptfeauturesSection_area2_cont1_div1_icon">
                      <img
                        src="/img/monitor_product_icon.svg"
                        alt=""
                        className="martgptfeauturesSection_area2_cont1_div2_cont1_icon_img2"
                      />
                    </div>
                    <div className="martgptfeauturesSection_area2_cont1_div1_title">
                      Product life-cycle monitoring.
                    </div>
                    <div className="martgptfeauturesSection_area2_cont1_div1_para">
                      Product and component traceability throughout their entire
                      lifecycle, including post-delivery, is essential for
                      recalling batches of products if counterfeit components
                      are detected during manufacturing.
                    </div>
                  </div>
                </div>
                {/* ======== */}
                {/* ======== */}
                {/* ======== */}
                {/* ======== */}
                <div className="martgptfeauturesSection_area2_cont1_div2">
                  <div className="martgptfeauturesSection_area2_cont1_div2_cont1_border">
                    <div className="martgptfeauturesSection_area2_cont1_div2_cont1">
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_div1">
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_title">
                          Decentralized Finance liquidity
                        </div>
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_para">
                          The protocol allows users to stake tokens in order to
                          participate in the manufacturing process and earn
                          rewards. The manufacturing process is funded by the
                          staked tokens, and the manufactured products are
                          stored in the protocol's inventory.
                        </div>
                      </div>
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_icon">
                        <img
                          src="/img/liquidity_home_iocn.svg"
                          alt=""
                          className="martgptfeauturesSection_area2_cont1_div2_cont1_icon_img"
                        />
                      </div>
                    </div>
                  </div>
                  {/* ======== */}
                  {/* ======== */}
                  {/* ======== */}
                  {/* ======== */}
                  <div className="martgptfeauturesSection_area2_cont1_div2_cont1_border_last">
                    <div className="martgptfeauturesSection_area2_cont1_div2_cont1_last">
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_div1">
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_title">
                          Inventory management.
                        </div>
                        <div className="martgptfeauturesSection_area2_cont1_div2_cont1_para">
                          A single-source inventory protocol provides real-time,
                          comprehensive, and up-to-date perspicacity into
                          product stock levels, thereby helping to forestall
                          costly overstocking.
                        </div>
                      </div>
                      <div className="martgptfeauturesSection_area2_cont1_div2_cont1_icon">
                        <img
                          src="/img/inventory_home_icon.svg"
                          alt=""
                          className="martgptfeauturesSection_area2_cont1_div2_cont1_icon_img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/img/structured_test_bg_art.png"
          alt=""
          className="martgptfeauturesSection_bg_img"
        />
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      <section className="JoinMartGptSection">
        <div className="container">
          <div className="JoinMartGptArea">
            <div className="JoinMartGptArea_1">
              <div className="JoinMartGptArea_1_title">Join Now</div>
              <div className="JoinMartGptArea_1_para">
                Become a memeber and enjoy the benefits that comes with it.
              </div>
              <div className="JoinMartGptArea_1_btn_div">
                <button className="JoinMartGptArea_1_btn">Use MartGpt</button>
              </div>
            </div>
            <div className="JoinMartGptArea_2">
              <img
                src="/img/martgpt_3d_edited_icon.png"
                alt=""
                className="JoinMartGptArea_2_img"
              />
            </div>
          </div>
        </div>
        {/* <img
          src="/img/right_lines_design.png"
          alt=""
          className="JoinMartGptSection_bg_left"
        /> */}
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* <section className="martgptfeauturesSection">
        <div className="container">
          <div className="faq_home_area"></div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
