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
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 600 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 600, min: 0 },
  //     items: 1,
  //   },
  // };
  // const FeaturedLogos = [
  //   {
  //     link: "https://finance.yahoo.com/news/egoras-protocol-promises-revolutionize-microfinance-145500324.html",
  //     img: "/img/featured_logos/featured1.svg",
  //   },

  //   {
  //     link: "https://cointelegraph.com/press-releases/egoras-raises-13m-in-private-round",
  //     img: "/img/featured_logos/featured3.svg",
  //   },
  //   {
  //     link: "https://www.newsbtc.com/press-releases/egoras-a-decentralized-finance-ecosystem-for-growing-markets/",
  //     img: "/img/featured_logos/featured4.svg",
  //   },

  //   {
  //     link: "https://apnews.com/press-release/accesswire/business-small-business-corporate-news-microfinance-products-and-services-ee9eb494f14ea9ce6faa51d3f53a20c9",
  //     img: "/img/featured_logos/featured6.svg",
  //   },
  // ];
  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  // useEffect(() => {
  //   axios
  //     .get(api_url + "/api/branch/totalpools", null, config)
  //     .then((data) => {
  //       console.log(data.data.payload[0].total, "powerfulpools");
  //       setLockedValue(() => parseInt(data.data.payload[0].total) / 618);
  //     })
  //     .catch((err) => {
  //       console.log(err); // "oh, no!"
  //     });
  // }, [lockedValue]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       api_url +
  //         "/pub/loan/vault/balance/" +
  //         LOAN.address +
  //         "/" +
  //         "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
  //       null,
  //       config
  //     )
  //     .then((data) => {
  //       console.log(data.data.data.balance, "egc balnce vault");
  //       setEgcVal(() => parseInt(data.data.data.balance));
  //     })
  //     .catch((err) => {
  //       console.log(err); // "oh, no!"
  //     });
  //   // ============
  //   // ============
  //   // ============
  //   axios
  //     .get(
  //       api_url +
  //         "/pub/loan/vault/balance/" +
  //         SwapContract.address +
  //         "/" +
  //         "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
  //       null,
  //       config
  //     )
  //     .then((data) => {
  //       console.log(data.data.data.balance, "egc balnce swap");
  //       setEgcVal2(() => parseInt(data.data.data.balance));
  //     })
  //     .catch((err) => {
  //       console.log(err); // "oh, no!"
  //     });
  //   // ============
  //   // ============
  //   // ============
  //   axios
  //     .get(
  //       api_url +
  //         "/pub/loan/vault/balance/" +
  //         SwapContract.address +
  //         "/" +
  //         "0x8e9a916b6920136110a77E9acAf878862358A467",
  //       null,
  //       config
  //     )
  //     .then((data) => {
  //       console.log(data.data.data.balance, "egr balnce swap");
  //       setEgrVal(() => parseInt(data.data.data.balance));
  //     })
  //     .catch((err) => {
  //       console.log(err); // "oh, no!"
  //     });
  //   // ============
  //   // ============
  //   // ============
  //   axios
  //     .get(
  //       api_url +
  //         "/pub/loan/vault/balance/" +
  //         SwapContract.address +
  //         "/" +
  //         "0x8e9a916b6920136110a77E9acAf878862358A467",
  //       null,
  //       config
  //     )
  //     .then((data) => {
  //       console.log(data.data.data.balance, "egr balnce vault");
  //       setEgrVal2(() => parseInt(data.data.data.balance));
  //     })
  //     .catch((err) => {
  //       console.log(err); // "oh, no!"
  //     });
  // }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const results = assets.filter((person) =>
      person.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await CALL_CHECK_USER_AND_MEMBERSHIP(account);
      console.log(response.data);
      setSubscriptionStatus(response.data.userMembership);
      // if (response.data.userMembership == false) {subscriptionStatus

      // }
    };

    fetchData();

    //use the adress and make the API call
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
      "0x3A81836b093f7f3D3ca271125CcD45c461409697",
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
  //     "0x3A81836b093f7f3D3ca271125CcD45c461409697",
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
                  AI Powered Physically-Backed NFTs
                  <br />
                  <span className="real_life">For Web3.</span>
                </p>
                <p className="span4b-txts">
                  Convert new and used items to NFTs, trade physical-backed
                  NFTs, earn money, and contribute to environmental
                  sustainability.
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
                    $ {formatNumber(homeData.volume)}
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
                    Volume
                  </div>
                  <div className="nft_area2_stat_div_area_cont1_icon_cont_stat_numbers_para">
                    ${formatNumber(TradeVolume.toString())}
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
                    {formatNumber(homeData.users)}
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
        {/* <img src="/img/hero_backdrop.png" alt="" className="hero_backdrop" /> */}
        <img
          src="/img/martgpt_logoand_hero_bg.png"
          alt=""
          className="hero_backdrop"
        />
      </section>
    </div>
  );
};

export default Home;
