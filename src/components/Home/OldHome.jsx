import React, { useState, useEffect, useContext } from "react";

// import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WhyPeopleTrustUs from "./WhyPeopleTrustUs/WhyPeopleTrustUs";
import { parseEther, formatEther } from "@ethersproject/units";
import axios from "axios";
// import Spline from "@splinetool/react-spline";
import { Spline } from "react-spline";
import { API_URL as api_url } from "../../actions/types";
import { config } from "@fortawesome/fontawesome-svg-core";
// import Carousel from "react-multi-carousel";
import Web3 from "web3";
// import { numberWithCommas } from "../../static";
import LOAN from "../../web3/contracts/Loan.json";
import SwapContract from "../../web3/contracts/Contract_Address.json";
import NumberScroller from "react-number-scroller";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./countdown.css";
import "../../css/home.css";
import { numberWithCommas } from "../../static";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import "./Logos.css";
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
  getEgcSmartContractBalnce,
} from "../../web3/index";
const Home = () => {
  const context = useWeb3React();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [numberFrom, setNumberFrom] = useState(100);
  const [numberTo, setNumberTo] = useState(8000000);
  const [numberFromFund, setNumberFromFund] = useState(100);
  const [numberToFund, setNumberToFund] = useState(100000);
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
  const [TotalSum, setTotalSum] = useState(0);
  const [lockedValue, setLockedValue] = useState(0);
  const [totalAmountFrom, setTotalAmountFrom] = useState(0);
  const [totu, setTotu] = useState(0);

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
    // {
    //   img: "/img/eusd-icon-dollar.svg",
    //   name: "Egoras Naira",
    //   type: "Engn",
    //   eusd_Avail: "100M",
    //   stable: "0.50%",
    //   ratio: "170%",
    // },
    {
      img: "/img/egc-icon.svg",
      name: "Egoras Credit",
      type: "EGC",
      eusd_Avail: "90M",
      stable: "0.0%",
      ratio: "120%",
    },
  ];
  // console.log(localStorage.getItem("uiMode"), "homee local");
  // var uiMode = localStorage.getItem("uiMode");
  const toggleAboutVideoModal = () => {
    setAboutVideoModal(!aboutVideoModal);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };
  const FeaturedLogos = [
    {
      link: "https://finance.yahoo.com/news/egoras-protocol-promises-revolutionize-microfinance-145500324.html",
      img: "/img/featured_logos/featured1.svg",
    },

    {
      link: "https://cointelegraph.com/press-releases/egoras-raises-13m-in-private-round",
      img: "/img/featured_logos/featured3.svg",
    },
    {
      link: "https://www.newsbtc.com/press-releases/egoras-a-decentralized-finance-ecosystem-for-growing-markets/",
      img: "/img/featured_logos/featured4.svg",
    },

    {
      link: "https://apnews.com/press-release/accesswire/business-small-business-corporate-news-microfinance-products-and-services-ee9eb494f14ea9ce6faa51d3f53a20c9",
      img: "/img/featured_logos/featured6.svg",
    },
  ];
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    axios
      .get(api_url + "/api/branch/totalpools", null, config)
      .then((data) => {
        console.log(data.data.payload[0].total, "powerfulpools");
        setLockedValue(() => parseInt(data.data.payload[0].total) / 618);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, [lockedValue]);
  useEffect(() => {
    axios
      .get(
        api_url +
          "/pub/loan/vault/balance/" +
          LOAN.address +
          "/" +
          "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.data.balance, "egc balnce vault");
        setEgcVal(() => parseInt(data.data.data.balance));
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    // ============
    // ============
    // ============
    axios
      .get(
        api_url +
          "/pub/loan/vault/balance/" +
          SwapContract.address +
          "/" +
          "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.data.balance, "egc balnce swap");
        setEgcVal2(() => parseInt(data.data.data.balance));
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    // ============
    // ============
    // ============
    axios
      .get(
        api_url +
          "/pub/loan/vault/balance/" +
          SwapContract.address +
          "/" +
          "0x8e9a916b6920136110a77E9acAf878862358A467",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.data.balance, "egr balnce swap");
        setEgrVal(() => parseInt(data.data.data.balance));
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    // ============
    // ============
    // ============
    axios
      .get(
        api_url +
          "/pub/loan/vault/balance/" +
          SwapContract.address +
          "/" +
          "0x8e9a916b6920136110a77E9acAf878862358A467",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.data.balance, "egr balnce vault");
        setEgrVal2(() => parseInt(data.data.data.balance));
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const results = assets.filter((person) =>
      person.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const [categoryBtn, setCategoryBtn] = useState("All");

  const triggerAll = () => {
    setCategoryBtn("All");
  };

  const triggerPopular = () => {
    setCategoryBtn("Popular");
  };
  const triggerStable = () => {
    setCategoryBtn("Stable");
  };

  useEffect(() => {
    // setAnimate1(true);
    const timer = setTimeout(() => {
      setAnimate1(false);
      setAnimate3(false);
      setAnimate4(false);
      setAnimate2(true);
    }, 4000);
  }, [animate1]);
  useEffect(() => {
    const timer2 = setTimeout(() => {
      setAnimate2(false);
      setAnimate1(false);
      setAnimate4(false);
      setAnimate3(true);
    }, 4000);
  }, [animate2]);
  useEffect(() => {
    const timer3 = setTimeout(() => {
      setAnimate2(false);
      setAnimate3(false);
      setAnimate1(false);
      setAnimate4(true);
    }, 4000);
  }, [animate3]);
  useEffect(() => {
    const timer4 = setTimeout(() => {
      setAnimate4(false);
      setAnimate3(false);
      setAnimate2(false);
      setAnimate1(true);
    }, 4000);
  }, [animate4]);
  // useEffect(() => {

  // const timer3 = setTimeout(() => {
  //   setAnimate3(false);
  //   setAnimate4(true);
  // }, 5000);
  // }, []);
  // useEffect(
  //   async (e) => {
  //     if (account) {
  //       let check = await getEgcSmartContractBalnce(
  //         "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
  //         LOAN.address,
  //         library.getSigner()
  //       );
  //       console.log(check);
  //       const etherValue = Web3.utils.fromWei(check.message, "ether");
  //       console.log(parseInt(etherValue), "egc_loan");
  //       setEgcVal(() => parseInt(etherValue));
  //       // =============
  //       // =============
  //       // =============
  //       // =============
  //       let check2 = await getEgcSmartContractBalnce(
  //         "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
  //         SwapContract.address,
  //         library.getSigner()
  //       );
  //       console.log(check2);
  //       const etherValue2 = Web3.utils.fromWei(check2.message, "ether");
  //       console.log(parseInt(etherValue2), "egc_swap");
  //       setEgcVal2(() => parseInt(etherValue2));
  //       // =============
  //       // =============
  //       // =============
  //       // =============
  //       let check3 = await getEgcSmartContractBalnce(
  //         "0x8e9a916b6920136110a77E9acAf878862358A467",
  //         LOAN.address,
  //         library.getSigner()
  //       );
  //       console.log(check3);
  //       const etherValue3 = Web3.utils.fromWei(check3.message, "ether");
  //       console.log(parseInt(etherValue3), "egr_loan");
  //       setEgrVal(() => parseInt(etherValue3));

  //       // =============
  //       // =============
  //       // =============
  //       // =============
  //       let check4 = await getEgcSmartContractBalnce(
  //         "0x8e9a916b6920136110a77E9acAf878862358A467",
  //         SwapContract.address,
  //         library.getSigner()
  //       );
  //       console.log(check4);
  //       const etherValue4 = Web3.utils.fromWei(check4.message, "ether");
  //       console.log(parseInt(etherValue4), "egr_swap");
  //       setEgrVal2(() => parseInt(etherValue4));
  //     }
  //   },
  //   [account]
  // );
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
  // console.log(Math.round(totalAmountFrom));
  // console.log(Math.round(TotalSum));
  // let amountFrom = Math.round(totalAmountFrom);
  // let amountTo = Math.round(TotalSum);
  // console.log(parseInt(amountFrom));
  // const tOTU = parseInt(amountFrom);
  const tOTU1 = 2041224;
  // const tOTU2 = tOTU;
  console.log(totu, "amount from utututututu");
  return (
    <div>
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}
      {/* third section start */}
      <section className="earning-section">
        <div className="container">
          <div className="nft-area2">
            <div className="nft-txt-area2 " style={{ width: "100%" }}>
              <div className="span-txts">
                <p className="span4a-txts">
                  Unlocking Liquidity for{" "}
                  <span className="real_life">Real-World</span> assets.
                </p>
                <p className="span4b-txts">
                  Egoras is a decentralized organization built to enable anyone
                  to get funding or sell any real-world asset easily.
                </p>
              </div>
              <div className="stake-hero-btns">
                <a href="/app" className="stake-hero-btn2">
                  Launch App <ExitToAppIcon className="exit-to-app" />
                </a>
                <a href="/app/whitepaper" className="stake-hero-btn1">
                  Read Docs
                </a>
              </div>
              {/* <FlipCountdown
                className="flip-countdown"
                titlePosition="bottom"
                yearTitle="Year"
                monthTitle="Months"
                dayTitle="Days"
                hourTitle="Hours"
                minuteTitle="Minutes"
                secondTitle="Seconds"
                hideYear
                // hideMonth
                size="small"
                endAt={"2022-07-03 08:00:00"}
              /> */}
            </div>
            <div
              className="nft-img-area2"
              style={{ display: "inline-flex", width: "100%" }}
            >
              <img
                src="/img/liquidity-hero_bg_1.svg"
                alt=""
                className="liquidity_hero_bg_1"
              />
              <img
                src="/img/liquidity_hero_bg_base.svg"
                alt=""
                className="liquidity_hero_bg_base"
              />
              <img
                src="/img/liquidity_hero_bg_logos1.svg"
                alt=""
                className={
                  animate1 === true
                    ? "liquidity_hero_bg_logos1 animate"
                    : "liquidity_hero_bg_logos1"
                }
              />
              <img
                src="/img/liquidity_hero_bg_logos1.svg"
                alt=""
                className={
                  animate3 === true
                    ? "liquidity_hero_bg_logos3 animate"
                    : "liquidity_hero_bg_logos3"
                }
              />
              <img
                src="/img/liquidity_hero_bg_logos2.svg"
                alt=""
                className={
                  animate2 === true
                    ? "liquidity_hero_bg_logos2 animate"
                    : "liquidity_hero_bg_logos2"
                }
              />
              <img
                src="/img/liquidity_hero_bg_logos4.svg"
                alt=""
                className={
                  animate4 === true
                    ? "liquidity_hero_bg_logos4 animate"
                    : "liquidity_hero_bg_logos4"
                }
              />
              <img
                src="/img/shooting_light.svg"
                alt=""
                // className="shooting_light1"
                className={
                  animate1 === true
                    ? "shooting_light1 shoot"
                    : "shooting_light1"
                }
              />
              <img
                src="/img/shooting_light.svg"
                alt=""
                // className="shooting_light3"
                className={
                  animate3 === true
                    ? "shooting_light3 shoot3"
                    : "shooting_light3"
                }
              />
              <img
                src="/img/shooting_light.svg"
                alt=""
                // className="shooting_light2"
                className={
                  animate2 === true
                    ? "shooting_light2 shoot2"
                    : "shooting_light2"
                }
              />
              <img
                src="/img/shooting_light.svg"
                alt=""
                // className="shooting_light2"
                className={
                  animate4 === true
                    ? "shooting_light4 shoot4"
                    : "shooting_light4"
                }
              />
              <img
                src="/img/asset_display_icon1.svg"
                alt=""
                // className="asset_display_icon1"
                className={
                  animate1 === true
                    ? "asset_display_icon1"
                    : "asset_display_icon1_none"
                }
              />
              <img
                src="/img/asset_display_icon2.svg"
                alt=""
                // className="asset_display_icon1"
                className={
                  animate2 === true
                    ? "asset_display_icon1"
                    : "asset_display_icon1_none"
                }
              />
              <img
                src="/img/asset_display_icon3.svg"
                alt=""
                // className="asset_display_icon1"
                className={
                  animate3 === true
                    ? "asset_display_icon1"
                    : "asset_display_icon1_none"
                }
              />
              <img
                src="/img/asset_display_icon4.svg"
                alt=""
                // className="asset_display_icon1"
                className={
                  animate4 === true
                    ? "asset_display_icon1"
                    : "asset_display_icon1_none"
                }
              />
              <img
                src="/img/liquidity_hero_center_turning_bg.svg"
                alt=""
                className="liquidity_hero_center_turning_bg"
              />
              <img
                src="/img/liquidity_hero_center_asset_display_bg.svg"
                alt=""
                className="liquidity_hero_center_asset_display_bg"
              />
            </div>
          </div>
        </div>
        {/* <img src="/img/blur-drop.png" alt="" className="blurDrop-token" /> */}
        <img src="/img/hero_bg_bg.png" alt="" className="blurDrop-token2" />
        {/* <img src="/img/banner-bg.png" alt="" className="blurDrop-token3" /> */}

        <div className="floating_images_cont">
          <img src="/img/floating_cube1.svg" alt="" className="float_cube1" />
          <img src="/img/floating_cube2.svg" alt="" className="float_cube2" />
          <img
            src="/img/floating_layers_img.svg"
            alt=""
            className="float_layer1"
          />
          <img src="/img/floating_shadow.png" alt="" className="float_shadow" />
          <img src="/img/floating_circle.png" alt="" className="float_circle" />
          <img
            src="/img/floating_circle2.png"
            alt=""
            className="float_circle2"
          />
        </div>
        {/* <WaveAnimation /> */}

        <div className="floating_absolute_div">
          <div className="floating_div_cont_area">
            {/* <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">
                Total Transactions
              </div>
              <div className="floating_div_cont_area1_cont2">50 Txns</div>
            </div>
            <span class="vertical_rule"></span> */}
            <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">Current TVL</div>
              <div className="floating_div_cont_area1_cont2">
                {totu == 0 ? (
                  <p>Loading...</p>
                ) : totu !== 0 ? (
                  <div>{numberWithCommas(Math.round(TotalSum))} USD</div>
                ) : null}
                {/* <NumberScroller
                  timeout={1000}
                  from={totu === 0 ? 0 : totu}
                  to={Math.ceil(TotalSum)}
                  toLocaleStringProps={["en-US"]}
                  // renderFrequency={1}
                />{" "} */}
                {/* <NumberScroller
                  timeout={1000}
                  from={totu === 0 ? 0 : totu}
                  to={Math.ceil(TotalSum)}
                  toLocaleStringProps={["en-US"]}
                  // renderFrequency={1}
                />{" "} */}
              </div>
            </div>
            {/* <span class="vertical_rule"></span> */}
            {/* <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">
                Estimated APY:
              </div>
              <div className="floating_div_cont_area1_cont2">13%</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* third section end */}
      {/* ========================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* <section className="real_world_adoption">
        <div className="container">
          <div className="real_world_adoption_area">
            <div className="real_world_adoption_area1">
              {aboutVideoModal === true ? (
                <div className="about_video_div">
                  <div className="container">
                    <CloseIcon
                      className="close_About_video_modal"
                      onClick={toggleAboutVideoModal}
                    />

                    <div className="about_video_player">
                      <iframe
                        src="https://player.vimeo.com/video/702600317?h=836afd9a85&amp;badge=0&amp;autopause=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                        }}
                        // title="EGORAS TRILLER .MP4"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="about_video_thumbnail_cont">
                <div className="about_video_thumbnail_cont_bg">
                  <img
                    src="/img/logoVideoThumbnail.svg"
                    alt=""
                    className="thumbnail_img"
                  />
                  <img
                    src="/img/egoras-logo.svg"
                    alt=""
                    className="thumbnail_img2"
                  />
                  {/* <div className="wrap"> */}
      {/* <img
                    src="/img/play_thumbnail_btn.svg"
                    alt=""
                    className="thumbnail_btn"
                    onClick={toggleAboutVideoModal}
                  />
                  {/* </div> */}
      {/* </div>
              </div>
            </div>
            <div className="real_world_adoption_area2">
              <div className="real_world_adoption_area2_title">
                Real World Adoption
              </div>
              <div className="real_world_adoption_area2_para">
                Egoras is the fastest growing decentralized organization in the
                world with thousands of people using the protocol to access
                liquidity to real world assets.
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* <WhyPeopleTrustUs /> */}
      {/* ==================== */}
      {/* ==================== */}
      <section className="whyEgorasSection">
        <div className="container">
          <div className="why_egoras_area">
            <div className="whyEgoras_heading">Why Egoras?</div>
            <div className="whyEgoras_body">
              <div className="whyEgoras_body_cont1">
                <div className="whyEgoras_body_cont1_text">
                  Banks don't accept assets like electrical appliances as
                  collateral to access loans.
                </div>
                <div className="whyEgoras_body_cont1_img">
                  <img
                    src="/img/dont_accept_img.svg"
                    className="whyEgoras_body_cont1_img_image"
                    alt=""
                  />
                </div>
                <img
                  src="/img/abstract_right_card_bg.png"
                  alt=""
                  className="abstract_right_card_bg"
                />
              </div>
              <div className="whyEgoras_body_cont1">
                <div className="whyEgoras_body_cont1_text">
                  Difficulty to sell real world assets like cars, electronics
                  e.t.c.
                </div>
                <div className="whyEgoras_body_cont1_img">
                  <img
                    src="/img/dont_accept_img2.svg"
                    className="whyEgoras_body_cont1_img_image"
                    alt=""
                  />
                </div>
              </div>
              <div className="whyEgoras_body_cont1">
                <div className="whyEgoras_body_cont1_text">
                  Banks use humulating measures to recover uncollateralized
                  loans.
                </div>
                <div className="whyEgoras_body_cont1_img">
                  <img
                    src="/img/dont_accept_img3.svg"
                    className="whyEgoras_body_cont1_img_image"
                    alt=""
                  />
                </div>
                <img
                  src="/img/abstract_right_card_bg.png"
                  alt=""
                  className="abstract_right_card_bg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <img
          src="/img/right_cut_circle.svg"
          alt=""
          className="right_cut_circle"
        /> */}
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}
      {/* third section start */}
      {/* fourth section start */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      <section className="egoras_benefit_section">
        <div className="container">
          <div className="benefit_section_area">
            <div className="benefit_section_area1">
              <div className="benefit_section_area1_layer1">
                <div className="benefit_section_area1_layer1_icon">
                  <img
                    src="/img/bridge_icon.png"
                    alt=""
                    className="bridge_icon"
                  />
                </div>{" "}
                Egoras bridges assets like cars, household electronics to
                block-chain.
              </div>
              <div className="benefit_section_area1_layer1">
                <div className="benefit_section_area1_layer1_icon">
                  <img
                    src="/img/wallet_icon.png"
                    alt=""
                    className="bridge_icon"
                  />
                </div>{" "}
                Egoras enables anyone to get loans with any real-world assets
                without banks or other intermediaries.
              </div>
              <div className="benefit_section_area1_layer1">
                <div className="benefit_section_area1_layer1_icon">
                  <img
                    src="/img/sale_icon.svg"
                    alt=""
                    className="bridge_icon"
                  />
                </div>{" "}
                Egoras enables anyone to sell any kind of asset easily in
                minutes.
              </div>
            </div>
            <div className="benefit_section_are2">
              <img
                src="/img/coin_layer.svg"
                alt=""
                className="benefit_section_are2_img"
              />
            </div>
          </div>
        </div>
        {/* <img
          src="/img/cube1_absolute.svg"
          alt=""
          className="benefit_section_circles"
        /> */}
        {/* <img
          src="/img/right_cut_circle.svg"
          alt=""
          className="benefit_section_circles"
        /> */}
        <img
          src="/img/abstract_right_card_bg.png"
          alt=""
          className="abstract_left_section_bg"
        />
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}
      {/* <section className="collateral-assets-section">
        <div className="container"></div>
      </section> */}
      {/* third section start */}
      {/* fourth section start */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}
      {/* third section start */}
      {/* fourth section start */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* <section className="governance_landing_section">
        <div className="container">
          <div className="governance">
            <div className="how_it_works_title_cont">
              <div className="how_it_works_title">
                Governed by the community
              </div>
              <div className="how_it_works_para">
                Aave is a fully decentralized, community governed protocol with
                110,720 token holders.
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      <section className="featured_section">
        <div className="custom_container">
          <div className="featured_logos_area">
            <div className="featured_in_head">Featured In</div>
            {/* Carousel start==============================
==============================================
============================= */}
            <Carousel
              responsive={responsive}
              className="featured_logos"
              showDots={false}
              //   infinite={false}
              autoPlay={true}
              // autoPlaySpeed={10000}
              infinite={true}
              draggable={true}
              swipeable={true}
            >
              {FeaturedLogos.map((data) => (
                <div className="featured_in_logos_cont">
                  <a href={data.link} target="_blank">
                    <img src={data.img} alt="" className="featured_logo" />
                  </a>
                </div>
              ))}
            </Carousel>
            <div className="featured_logos_mobile">
              {FeaturedLogos.map((data) => (
                <div className="featured_in_logos_cont">
                  <a href={data.link} target="_blank">
                    <img src={data.img} alt="" className="featured_logo" />
                  </a>
                </div>
              ))}
            </div>
            {/* Carousel end==============================
==============================================
============================= */}
          </div>
        </div>
      </section>
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      <section className="getStartedSection">
        <div className="container">
          <div className="getStarted_area">
            <div className="getStarted_title">Sounds Interesting?</div>
            <a href="/app" className="getStarted_btn">
              <button className="get_started_button">Get started</button>
            </a>
            <img
              src="/img/get_old_tech_bg.png"
              alt=""
              className="get_old_tech_bg"
            />
          </div>
        </div>
      </section>
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
    </div>
  );
};

export default Home;
