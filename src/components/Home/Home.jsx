import React, { useState, useEffect } from "react";
// import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CasinoIcon from "@mui/icons-material/Casino";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

import "../../css/home.css";

const Home = () => {
  const [categoryBtn, setCategoryBtn] = useState("Popular");

  const assets = {
    assets1: [
      { name: "Bitcoin" },
      { type: "BTC-A" },
      { eusd_Avail: "100M" },
      { stable: "0.50%" },
      { ratio: "150%" },
    ],
    assets2: [
      { name: "Ethereum" },
      { type: "ETH-A" },
      { eusd_Avail: "99.37M" },
      { stable: "2.00%" },
      { ratio: "145%" },
    ],
    assets3: [
      { name: "Tether" },
      { type: "USDT-A" },
      { eusd_Avail: "90M" },
      { stable: "1.00%" },
      { ratio: "100%" },
    ],
    assets4: [
      { name: "Chainlink" },
      { type: "LINK-A" },
      { eusd_Avail: "6.93M" },
      { stable: "1.00%" },
      { ratio: "165%" },
    ],
    assets5: [
      { name: "Yearn" },
      { type: "YF1-A" },
      { eusd_Avail: "6.44M" },
      { stable: "1.00%" },
      { ratio: "165%" },
    ],
    assets6: [
      { name: "Uniswap" },
      { type: "UNI-A" },
      { eusd_Avail: "5.0M" },
      { stable: "1.50%" },
      { ratio: "120%" },
    ],
    assets7: [
      { name: "Egoras" },
      { type: "EGR-A" },
      { eusd_Avail: "100M" },
      { stable: "0.50%" },
      { ratio: "170%" },
    ],
    assets8: [
      { name: "Matic" },
      { type: "MATIC-A" },
      { eusd_Avail: "3.00M" },
      { stable: "3.00%" },
      { ratio: "175%" },
    ],
    assets9: [
      { name: "Aave" },
      { type: "AAVE-A" },
      { eusd_Avail: "5.00M" },
      { stable: "1.00%" },
      { ratio: "165%" },
    ],
    assets10: [
      { name: "Wrapped Bitcoin" },
      { type: "WBTC-A" },
      { eusd_Avail: "30.80M" },
      { stable: "2.00%" },
      { ratio: "145%" },
    ],
    assets11: [
      { name: "Egoras Credit" },
      { type: "EGC-A" },
      { eusd_Avail: "90M" },
      { stable: "0.50%" },
      { ratio: "120%" },
    ],
    assets12: [
      { name: "Ethereum" },
      { type: "ETH-A" },
      { eusd_Avail: "90M" },
      { stable: "0.70%" },
      { ratio: "130%" },
    ],
  };

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
                <button className="stake-hero-btn2">Read White-Paper</button>
              </div>
            </div>
            <div
              className="nft-img-area2"
              style={{ display: "inline-flex", width: "100%" }}
            >
              <img
                src="/img/egr-stake-coina.png"
                alt=""
                style={{ width: "100%", margin: "auto" }}
              />
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
        <img
          src="/img/staking-bg-background.svg"
          alt=""
          className="blurDrop-token2"
        />
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
      <section className="second-eusd-token-section">
        <div className="container">
          <div className="nft-area3">
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1a btc-color">
                  <h3 className="btc-card-txt">NEW</h3>
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
                  <h3 className="btc-card-txt">NEW</h3>
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
                  <h3 className="btc-card-txt">NEW</h3>
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
      </section>
      {/* fourth section end */}
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
                    categoryBtn === "Popular"
                      ? "assets-header1"
                      : "assets-header2"
                  }
                  onClick={triggerPopular}
                >
                  Popular assets
                </button>
                <button
                  className={
                    categoryBtn === "All" ? "assets-header1" : "assets-header2"
                  }
                  onClick={triggerAll}
                >
                  All assets
                </button>
                <button
                  className={
                    categoryBtn === "Stable"
                      ? "assets-header1"
                      : "assets-header2"
                  }
                  onClick={triggerStable}
                >
                  Stablecoins
                </button>
              </div>

              <div className="search-input">
                {" "}
                <input
                  type="search"
                  name="search"
                  id="searchCollaterals"
                  className="assets-header3"
                  placeholder="Search..."
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
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/btc-logo.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets1[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets1[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets1[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets1[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets1[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/ether-logo.svg"
                        alt=""
                        className="assets-list-icon"
                      />
                      <div className="assets-data-name">
                        {assets.assets2[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets2[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets2[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets2[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets2[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/tether-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets3[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets3[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets3[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets3[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets3[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/chain-link-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets4[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets4[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets4[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets4[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets4[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/yearn-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets5[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets5[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets5[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets5[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets5[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/uniswap-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets6[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets6[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets6[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets6[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets6[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/egoras-favicon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets7[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets7[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets7[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets7[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets7[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/matic-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets8[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets8[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets8[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets8[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets8[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/aave-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />
                      <div className="assets-data-name">
                        {assets.assets9[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets9[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets9[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets9[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets9[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/wrapped-btc.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets10[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets10[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets10[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets10[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets10[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                <tr className="assets-category-row">
                  <td className="assets-category-data">
                    <div className="assets-data">
                      <img
                        src="/img/egc-icon.svg"
                        alt=""
                        className="assets-list-icon"
                      />

                      <div className="assets-data-name">
                        {assets.assets11[0].name}
                      </div>
                    </div>
                  </td>
                  <td className="assets-category-data1">
                    <div className="assets-data-name">
                      {assets.assets11[1].type}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets11[2].eusd_Avail}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets11[3].stable}
                    </div>
                  </td>
                  <td className="assets-category-data1b">
                    <div className="assets-data-name">
                      {assets.assets11[4].ratio}
                    </div>
                  </td>
                  <td className="assets-category-data-last">
                    <div className="assets-data-name-last">
                      <button
                        className="assets-collateralize-button"
                        style={{ border: "none" }}
                      >
                        Open Vault
                      </button>
                    </div>
                  </td>
                </tr>
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
                {/* =================== */}
              </tbody>
              {/* {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}} */}
            </table>
          </div>
        </div>
      </section>

      {/* third section start */}
      {/* <section className="earning-section reduce-padding">
        <div className="container">
          <div className="nft-area2  align">
            <div className="nft-txt-area2 " style={{ width: "100%" }}>
              <div className="span-txts">
                <p className="span4a-txts">
                  Join our NFT Program to earn even more
                </p>
                <p className="span4b-txts">
                  Requires NFT to be held in the same wallet connected to the
                  Egoras Platform. More details to follow soon
                </p>
              </div>
            </div>
            <div
              className="nft-img-area2"
              style={{ display: "inline-flex", width: "100%" }}
            >
              <div className="join-nft-list">
                <div className="join-nft-list1"></div>
                <div className="join-nft-list1"></div>
                <div className="join-nft-list1"></div>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section> */}
      {/* third section end */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* fourth section start */}
      <section className="second-eusd-token-section">
        <div className="container">
          <div className="nft-area3">
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1">
                  <div className="key-features-cards-area1-header">
                    <AttachMoneyIcon className="home-icon" /> Staking
                  </div>
                  <p className="key-features-cards-area1-para">
                    Earn up to 60% APY when you stake EGR or different assets in
                    a decentralised and non-custodial manner.
                  </p>
                </div>
                <div className="key-features-cards-area1">
                  <div className="key-features-cards-area1-header">
                    <NotInterestedIcon className="home-icon" />
                    Interest-Free CryptoLoans
                  </div>
                  <p className="key-features-cards-area1-para">
                    Why sell your crypto at loss. Deposit 25+ crypto collaterals
                    to borrow eUSD interest-free.
                  </p>
                </div>
                <div className="key-features-cards-area1">
                  <div className="key-features-cards-area1-header">
                    <SwapHorizontalCircleIcon className="home-icon" /> Swap
                  </div>
                  <p className="key-features-cards-area1-para">
                    Buy/Sell over 25+ crypto asset to increase your exposure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section>
      {/* fourth section end */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}

      {/* third section start */}
      {/* <section className="earning-section reduce-padding">
        <div className="container">
          <div className="nft-area2">
            <div className="nft-txt-area2 " style={{ width: "100%" }}>
              <div className="span-txts">
                <p className="span4a-txts">WINR Staking & Mining</p>
                <p className="span4b-txts">
                  The first-ever fully decentralized and autonomous gaming
                  platform which has no human interaction, where payouts cannot
                  be tampered with at any time and “where everyone is a WINR”.
                </p>
              </div>
            </div>
            <div
              className="nft-img-area2"
              style={{ display: "inline-flex", width: "100%" }}
            >
              <img
                src="/img/chart-up.svg"
                alt=""
                style={{ width: "100%", margin: "auto" }}
              />
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section> */}

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
            <h1 className="key-features-heading">What Is Egoras Stake</h1>
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1 hide-bg">
                  <div className="key-features-cards-area1-header font-sz">
                    <CasinoIcon className="home-icon" /> Fully decentralised
                    Casino and Lottery.
                  </div>
                </div>
                <div className="key-features-cards-area1 hide-bg">
                  <div className="key-features-cards-area1-header font-sz">
                    <CasinoIcon className="home-icon" /> Fully decentralised
                    Casino and Lottery.
                  </div>
                </div>
                <div className="key-features-cards-area1 hide-bg">
                  <div className="key-features-cards-area1-header font-sz">
                    <CasinoIcon className="home-icon" /> Fully decentralised
                    Casino and Lottery.
                  </div>
                </div>
              </div>
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1 hide-bg">
                  <div className="key-features-cards-area1-header font-sz">
                    <CasinoIcon className="home-icon" /> Fully decentralised
                    Casino and Lottery.
                  </div>
                </div>
                <div className="key-features-cards-area1 hide-bg">
                  <div className="key-features-cards-area1-header font-sz">
                    <CasinoIcon className="home-icon" /> Fully decentralised
                    Casino and Lottery.
                  </div>
                </div>
                <div className="key-features-cards-area1 hide-bg">
                  <div className="key-features-cards-area1-header font-sz">
                    <CasinoIcon className="home-icon" /> Fully decentralised
                    Casino and Lottery.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section> */}
      {/* fourth section end */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
    </div>
  );
};

export default Home;
