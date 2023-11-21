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
                {/* {!subscriptionStatus ? (
                  <a href="/membership/sub" className="stake-hero-btn1">
                    Become a member
                  </a>
                ) : null}
                {/* <a href="/app/whitepaper" className="stake-hero-btn1">
                  Read Docs
                </a> */}{" "}
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
        <img src="/img/hero_backdrop.png" alt="" className="hero_backdrop" />
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
            </div>
            <HowItWorksArea2 />
          </div>
        </div>
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
          {/* section2_img */}
          <div className="how_it_works2_area">
            <div className="how_it_works2_area_head">
              Structured credit
              <br /> to smart <span className="real_life"> manufacturing.</span>
            </div>
            <div className="how_it_works2_area_body">
              <div className="how_it_works2_area_body_area1">
                <div className="how_it_works2_area_body_area1_cont1">
                  <div className="how_it_works2_area_body_area1_cont1_title">
                    <img
                      src="/img/section2_1_symbol.png"
                      alt=""
                      className="how_it_works2_area_body_area1_cont1_title_img"
                    />
                  </div>
                  <div className="how_it_works2_area_body_area1_cont1_txts">
                    <div className="how_it_works2_area_body_area1_cont1_txts_head">
                      Liquidity Provider 50%
                    </div>
                    <div className="how_it_works2_area_body_area1_cont1_txts_para">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquid eveniet fugiat ratione culpa modi quae iure eaque
                      unde.
                    </div>
                  </div>
                </div>
                <div className="how_it_works2_area_body_area1_cont1">
                  <div className="how_it_works2_area_body_area1_cont1_title">
                    <img
                      src="/img/section2_2_symbol.png"
                      alt=""
                      className="how_it_works2_area_body_area1_cont1_title_img"
                    />
                  </div>
                  <div className="how_it_works2_area_body_area1_cont1_txts">
                    <div className="how_it_works2_area_body_area1_cont1_txts_head">
                      Liquidity Provider 50%
                    </div>
                    <div className="how_it_works2_area_body_area1_cont1_txts_para">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquid eveniet fugiat ratione culpa modi quae iure eaque
                      unde.
                    </div>
                  </div>
                </div>
              </div>
              <div className="how_it_works2_area_body_area2">
                <img
                  src="/img/section2_img.png"
                  alt=""
                  className="how_it_works2_area_body_area2_img"
                />
              </div>
              <div className="how_it_works2_area_body_area3">
                <div className="how_it_works2_area_body_area1_cont1">
                  <div className="how_it_works2_area_body_area1_cont1_title">
                    <img
                      src="/img/section2_3_symbol.png"
                      alt=""
                      className="how_it_works2_area_body_area1_cont1_title_img"
                    />
                  </div>
                  <div className="how_it_works2_area_body_area1_cont1_txts">
                    <div className="how_it_works2_area_body_area1_cont1_txts_head">
                      Liquidity Provider 50%
                    </div>
                    <div className="how_it_works2_area_body_area1_cont1_txts_para">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquid eveniet fugiat ratione culpa modi quae iure eaque
                      unde.
                    </div>
                  </div>
                </div>
                <div className="how_it_works2_area_body_area1_cont1">
                  <div className="how_it_works2_area_body_area1_cont1_title">
                    <img
                      src="/img/section2_4_symbol.png"
                      alt=""
                      className="how_it_works2_area_body_area1_cont1_title_img"
                    />
                  </div>
                  <div className="how_it_works2_area_body_area1_cont1_txts">
                    <div className="how_it_works2_area_body_area1_cont1_txts_head">
                      Liquidity Provider 50%
                    </div>
                    <div className="how_it_works2_area_body_area1_cont1_txts_para">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquid eveniet fugiat ratione culpa modi quae iure eaque
                      unde.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}

      <section className="community_section">
        <div className="container">
          <div className="community_section_area">
            <div className="community_section_area1">
              <div className="community_section_area1_title">
                <span className="real_life"> Join </span> The Community
              </div>
              <div className="community_section_area1_para">
                Become A Part Of EGODAO Community And Have A Say <br />
                In Continuous Protocol Development.
              </div>
            </div>
            <div className="community_section_area2"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
