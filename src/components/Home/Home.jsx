import React, { useState, useEffect } from "react";

// import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CasinoIcon from "@mui/icons-material/Casino";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FlipCountdown from "@rumess/react-flip-countdown";
import "./countdown.css";
import WaveAnimation from "./WaveAnimation/WaveAnimation";
import "../../css/home.css";
import { PersonTwoTone } from "@material-ui/icons";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const assets = [
    {
      img: "/img/bnb-icon.svg",
      name: "Binance",
      type: "BNB",
      eusd_Avail: "6.93M",
      stable: "1.00%",
      ratio: "175%",
    },
    {
      img: "/egoras-favicon.svg",
      name: "Egoras",
      type: "EGR",
      eusd_Avail: "100M",
      stable: "0.50%",
      ratio: "170%",
    },
    {
      img: "/img/egc-icon.svg",
      name: "Egoras Credit",
      type: "EGC",
      eusd_Avail: "90M",
      stable: "0.50%",
      ratio: "120%",
    },
    {
      img: "/img/kodi.png",
      name: "Kodi",
      type: "KODI",
      eusd_Avail: "6.93M",
      stable: "1.00%",
      ratio: "165%",
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
                <p className="span4a-txts">Grow your portfolio with Egoras</p>
                <p className="span4b-txts">
                  Build your portfolio with Egoras Interest-free Cryptoloans or
                  earn attractive APY when you stake your crypto.
                </p>
              </div>
              <div className="stake-hero-btns">
                <a href="/dashboard" className="stake-hero-btn1">
                  Launch App <ExitToAppIcon className="exit-to-app" />
                </a>
                <a href="/dashboard/whitepaper" className="stake-hero-btn2">
                  Read White-Paper
                </a>
              </div>
              <FlipCountdown
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
                endAt={"2022-07-03 00:00:00"}
              />
            </div>
            <div
              className="nft-img-area2"
              style={{ display: "inline-flex", width: "100%" }}
            >
              <img
                src="/img/egr-stake-coina.png"
                alt=""
                style={{ width: "80%", margin: "auto" }}
              />
            </div>
          </div>
        </div>
        {/* <img src="/img/blur-drop.png" alt="" className="blurDrop-token" /> */}
        <img src="/img/hero_bg_bg.png" alt="" className="blurDrop-token2" />
        {/* <img src="/img/banner-bg.png" alt="" className="blurDrop-token3" /> */}
        {/* <WaveAnimation /> */}
      </section>
      {/* third section end */}
      {/* ========================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* fourth section start */}
      {/* <section className="second-eusd-token-section">
        <div className="container">
          <div className="nft-area3">
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1a btc-color">
                  <h1 className="btc-card-txt-weight">BTC</h1>
                  <div className="btc-card-fees-figure">
                    <h6 className="fees-figure">Stability Fee: 3.00%</h6>
                    <h6 className="fees-figure">Min Collat:.Ratio: 175%</h6>
                  </div>
                  <img
                    src="/img/btc-3d-icon.svg"
                    alt=""
                    className="btc-3d-icon"
                  />
                </div>
                <div className="key-features-cards-area1a eth-color">
                  <h1 className="btc-card-txt-weight">ETH</h1>
                  <div className="btc-card-fees-figure">
                    <h6 className="fees-figure">Stability Fee: 3.00%</h6>
                    <h6 className="fees-figure">Min Collat:.Ratio: 175%</h6>
                  </div>
                  <img
                    src="/img/eth-3d-icon.svg"
                    alt=""
                    className="eth-3d-icon"
                  />
                </div>
                <div className="key-features-cards-area1a egr-color">
                  <h1 className="btc-card-txt-weight">EGR</h1>
                  <div className="btc-card-fees-figure">
                    <h6 className="fees-figure">Stability Fee: 3.00%</h6>
                    <h6 className="fees-figure">Min Collat:.Ratio: 175%</h6>
                  </div>
                  <img
                    src="/img/egr-3d-icon.svg"
                    alt=""
                    className="egr-3d-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section> */}
      {/* fourth section end */}

      <section className="second-eusd-token-section">
        <div className="container">
          {/* <div className="key_features_section_title">
            Explore endless possibilities with Egoras crypto loan.
          </div> */}
          <div className="nft-area3">
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1">
                  <div className="key_features_image">
                    <img
                      src="/img/hsh2.svg"
                      alt=""
                      className="key_features_img"
                    />
                  </div>
                  <div className="key_features_txts">
                    <div className="key-features-cards-area1-header">
                      {" "}
                      Staking
                    </div>
                    <p className="key-features-cards-area1-para">
                      Earn up to 60% APY when you stake EGR or different assets
                      in a decentralised and non-custodial manner.
                    </p>
                  </div>
                </div>
                <div className="key-features-cards-area1">
                  <div className="key_features_txts">
                    <div className="key-features-cards-area1-header">
                      {" "}
                      Interest-Free CryptoLoans
                    </div>
                    <p className="key-features-cards-area1-para">
                      Why sell your crypto at loss. Deposit 25+ crypto
                      collaterals to borrow eNGN interest-free.
                    </p>
                  </div>
                  <div className="key_features_image">
                    <img
                      src="/img/nft_image-BINANCE.svg"
                      alt=""
                      className="key_features_img"
                    />
                  </div>
                </div>
                <div className="key-features-cards-area1">
                  <div className="key_features_image">
                    <img
                      src="/img/swap_crypt.svg"
                      alt=""
                      className="key_features_img"
                    />
                  </div>
                  <div className="key_features_txts">
                    <div className="key-features-cards-area1-header"> Swap</div>
                    <p className="key-features-cards-area1-para">
                      Buy/Sell over 25+ crypto asset to increase your exposure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section>

      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}

      <section className="collateral-assets-section">
        <div className="container">
          <div className="assets-container">
            <div className="assets-cont-head-area">
              <div className="assets-cont-header-arae-btns">
                <button
                  className={
                    categoryBtn === "All" ? "assets-header1" : "assets-header2"
                  }
                  onClick={triggerAll}
                >
                  All assets
                </button>
                {/* <button
                  className={
                    categoryBtn === "Stable"
                      ? "assets-header1"
                      : "assets-header2"
                  }
                  onClick={triggerStable}
                >
                  Stablecoins
                </button> */}
              </div>

              <div className="search-input">
                {" "}
                <input
                  type="search"
                  name="search"
                  id="searchCollaterals"
                  className="assets-header3"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                ></input>{" "}
                <SearchIcon className="search-icon" />
              </div>
            </div>
            <table className="assets-table">
              <thead className="assets-category-titles">
                <tr className="assets">
                  <th className="assets-category-titles-heading1">Asset</th>
                  <th className="assets-category-titles-heading1">Type</th>
                  <th className="assets-category-titles-heading1 right">
                    EUSD Available
                  </th>
                  <th className="assets-category-titles-heading1 right">
                    Stable Fee
                  </th>
                  <th className="assets-category-titles-heading1 right">
                    Min Coll.Ratio
                  </th>
                  <th className="assets-category-titles-heading1 right"></th>
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
              <tbody
                className="assets-table-body popular-categories"
                id="popular-categories"
              >
                {" "}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
                {searchResults.map((asset) => (
                  <tr className="assets-category-row">
                    <td className="assets-category-data">
                      <div className="assets-data">
                        <img
                          src={asset.img}
                          alt=""
                          className="assets-list-icon"
                        />

                        <div className="assets-data-name">{asset.name}</div>
                      </div>
                    </td>
                    <td className="assets-category-data1">
                      <div className="assets-data-name">{asset.type}</div>
                    </td>
                    <td className="assets-category-data1b">
                      <div className="assets-data-name ">
                        {asset.eusd_Avail}
                      </div>
                    </td>
                    <td className="assets-category-data1b stable-content">
                      <div className="assets-data-name ">{asset.stable}</div>
                    </td>
                    <td className="assets-category-data1b ratio-content">
                      <div className="assets-data-name ">{asset.ratio}</div>
                    </td>
                    <td className="assets-category-data-last">
                      <div className="assets-data-name-last">
                        <a
                          href={`vault/${asset.type}/EUSD`}
                          className="assets-collateralize-button"
                          style={{ border: "none" }}
                        >
                          Open Vault
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
              </tbody>
              {/* {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}} */}
            </table>
          </div>
        </div>
      </section>

      {/* third section start */}

      {/* fourth section start */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      <section className="getStartedSection">
        <div className="container">
          <div className="getStarted_area">
            <div className="getStarted_title">Get crypto loan today</div>
            <a href="/dashboard" className="getStarted_btn">
              <button className="get_started_button">Get started</button>
            </a>
          </div>
        </div>
        <WaveAnimation />
      </section>
    </div>
  );
};

export default Home;
