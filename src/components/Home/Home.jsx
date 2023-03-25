import React, { useState, useEffect, useContext } from "react";
import "./stars.css";
// import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CasinoIcon from "@mui/icons-material/Casino";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
// import Marquee from "react-fast-marquee";
import WhyPeopleTrustUs from "./WhyPeopleTrustUs/WhyPeopleTrustUs";
import { parseEther, formatEther } from "@ethersproject/units";
import axios from "axios";
// import Spline from "@splinetool/react-spline";
// import { Spline } from "react-spline";
import { API_URL as api_url } from "../../actions/types";
import { config } from "@fortawesome/fontawesome-svg-core";
// import Carousel from "react-multi-carousel";
import Web3 from "web3";
// import { numberWithCommas } from "../../static";
import LOAN from "../../web3/contracts/Loan.json";
import SwapContract from "../../web3/contracts/Contract_Address.json";
import NumberScroller from "react-number-scroller";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Marquee from "react-fast-marquee";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
// import FlipCountdown from "@rumess/react-flip-countdown";
import "./countdown.css";
import WaveAnimation from "./WaveAnimation/WaveAnimation";
import "../../css/home.css";
import { PersonTwoTone } from "@material-ui/icons";
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
  const Partners = [
    { img: "/img/FeaturedInLogos/FeaturedInLogos_1.svg" },
    { img: "/img/FeaturedInLogos/FeaturedInLogos_3.svg" },
    { img: "/img/FeaturedInLogos/FeaturedInLogos_6.svg" },
    { img: "/img/FeaturedInLogos/FeaturedInLogos_5.svg" },
  ];
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
                  Decentralized sustainable finance
                  <br />
                  <span className="real_life">for all humanity.</span>
                </p>
                <p className="span4b-txts">
                  We are building a world powered by sustainable fuel, reducing
                  greenhouse gas emissions, and trust for renewed technology.
                </p>
              </div>
              <div className="stake-hero-btns">
                <a href="/app" className="stake-hero-btn2">
                  Launch App <ExitToAppIcon className="exit-to-app" />
                </a>
                <a href="/membership/sub" className="stake-hero-btn1">
                  Become a member
                </a>
                {/* <a href="/app/whitepaper" className="stake-hero-btn1">
                  Read Docs
                </a> */}
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
            {/* <div className="hero_area2">
              <img
                src="/img/hero_abstract_bg.svg"
                alt=""
                className="hero_area2_img"
              />
            </div> */}
            <div className="nft_area2_stat_div_area">
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/stat_img_icon.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Total TVL
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    $89,979,500,541
                  </div>
                </div>
              </div>
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/stat_img_icon.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Total Trading Volume
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    $89,979,500,541
                  </div>
                </div>
              </div>
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/stat_img_icon.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon"
                  />
                </div>
                <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers">
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_head">
                    Total Users
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    10.00k
                  </div>
                </div>
              </div>
              <div className="nft_area2_stat_div_area_cont1">
                <div className="nft_area2_stat_div_area_cont1_icon_cont">
                  <img
                    src="/img/stat_img_icon.svg"
                    alt=""
                    className="nft_area2_stat_div_area_cont1_icon"
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
        <img src="/img/hero_backdrop.png" alt="" className="hero_backdrop" />
      </section>

      <section className="how_it_works_section">
        <div className="container">
          <div className="how_it_works_area">
            <div className="how_it_works_area_head">Defi + Sustainablity</div>
            <div className="how_it_works_area_para">
              Welcome to first open-source decentralized Egoras staking pool.
              The smart-contract service guarantees
            </div>
            <div className="how_it_works_area_body">
              <div className="how_it_works_area_body_area1">
                <div className="how_it_works_area_body_area1_icon_div">
                  <img
                    src="/img/validate_image_dummy.png"
                    alt=""
                    className="how_it_works_area_body_area1_icon"
                  />
                </div>
                <div className="how_it_works_area_body_area1_title">Swap</div>
                <div className="how_it_works_area_body_area1_para">
                  The technology developed by EGCDAO enables the connection of
                  diversified sources of crypto liquidity, thereby providing the
                  most favorable rates and optimal returns for all. With EGCDAO,
                  users can exchange tokens, earn yields, and create top-tier
                  Decentralized Finance (DeFi) applications.
                </div>
                <div className="how_it_works_area_body_area1_link_div">
                  <a href="" className="how_it_works_area_body_area1_link">
                    Explore
                    <ArrowOutwardIcon />
                  </a>
                </div>
              </div>
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              <div className="how_it_works_area_body_area1">
                <div className="how_it_works_area_body_area1_icon_div">
                  <img
                    src="/img/validate_image_dummy.png"
                    alt=""
                    className="how_it_works_area_body_area1_icon"
                  />
                </div>
                <div className="how_it_works_area_body_area1_title">Swap</div>
                <div className="how_it_works_area_body_area1_para">
                  The technology developed by EGCDAO enables the connection of
                  diversified sources of crypto liquidity, thereby providing the
                  most favorable rates and optimal returns for all. With EGCDAO,
                  users can exchange tokens, earn yields, and create top-tier
                  Decentralized Finance (DeFi) applications.
                </div>
                <div className="how_it_works_area_body_area1_link_div">
                  <a href="" className="how_it_works_area_body_area1_link">
                    Explore
                    <ArrowOutwardIcon />
                  </a>
                </div>
              </div>
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              <div className="how_it_works_area_body_area1">
                <div className="how_it_works_area_body_area1_icon_div">
                  <img
                    src="/img/validate_image_dummy.png"
                    alt=""
                    className="how_it_works_area_body_area1_icon"
                  />
                </div>
                <div className="how_it_works_area_body_area1_title">Swap</div>
                <div className="how_it_works_area_body_area1_para">
                  The technology developed by EGCDAO enables the connection of
                  diversified sources of crypto liquidity, thereby providing the
                  most favorable rates and optimal returns for all. With EGCDAO,
                  users can exchange tokens, earn yields, and create top-tier
                  Decentralized Finance (DeFi) applications.
                </div>
                <div className="how_it_works_area_body_area1_link_div">
                  <a href="" className="how_it_works_area_body_area1_link">
                    Explore
                    <ArrowOutwardIcon />
                  </a>
                </div>
              </div>
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              <div className="how_it_works_area_body_area1">
                <div className="how_it_works_area_body_area1_icon_div">
                  <img
                    src="/img/validate_image_dummy.png"
                    alt=""
                    className="how_it_works_area_body_area1_icon"
                  />
                </div>
                <div className="how_it_works_area_body_area1_title">Swap</div>
                <div className="how_it_works_area_body_area1_para">
                  The technology developed by EGCDAO enables the connection of
                  diversified sources of crypto liquidity, thereby providing the
                  most favorable rates and optimal returns for all. With EGCDAO,
                  users can exchange tokens, earn yields, and create top-tier
                  Decentralized Finance (DeFi) applications.
                </div>
                <div className="how_it_works_area_body_area1_link_div">
                  <a href="" className="how_it_works_area_body_area1_link">
                    Explore
                    <ArrowOutwardIcon />
                  </a>
                </div>
              </div>
            </div>
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
      <section className="ecoSystem_section">
        <div className="container">
          <div className="ecoSystem_area">
            <div className="ecoSystem_area1">
              <div className="ecoSystem_area1_title">
                The on-chain ecosystem for structured credit
              </div>
              <div className="ecoSystem_area1_para">
                As the first protocol to bring real-world assets on-chain, we’re
                building a better financial system.
              </div>
              <button className="ecoSystem_area1_btn">Get started</button>
            </div>
            <div className="ecoSystem_area2">
              <img src="" alt="" className="ecoSystem_area2_img" />
            </div>
          </div>
        </div>
      </section>
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      <section className="join_ecosystem_section">
        <div className="container">
          <div className="join_ecosystem_area">
            <div className="join_ecosystem_area1">
              <div className="join_ecosystem_area1_title">
                Join the Ecosystem
              </div>
              <div className="join_ecosystem_area1_para">
                Join an ever expanding ecosystem of Egoras blockchains and
                decentralized applications. From crypto novices to senior
                developers, Egoras has something for everyone!
              </div>
            </div>
            <div className="join_ecosystem_area2">
              <div className="join_ecosystem_area2_cont1">
                <img src="" alt="" className="join_ecosystem_area2_cont1_img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/*       <div className="what_we_offer_area1_cont1">
                <div className="what_we_offer_area1_cont1_title">
                  Staking on Egoras
                </div>
                <div className="what_we_offer_area1_cont1_para">
                  Earn rewards by staking your eNGN to help secure the network.
                  Choose your staking preference, start earning with a few
                  clicks, and use your staked funds as voting power.
                </div>
                <button className="what_we_offer_area1_cont1_btn">
                  Stake your eNGN now
                </button>
              </div> */}
    </div>
  );
};

export default Home;
