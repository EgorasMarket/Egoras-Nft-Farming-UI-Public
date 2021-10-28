import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

import "../../../css/dashboardanalytics.css";

const DashBoardAnalytics = () => {
  const [categoryBtn, setCategoryBtn] = useState("All");

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
  // const [active, setActive] = useState("Swap");
  // const [percentBtn, setPercentBtn] = useState("");

  // const changeBg = (e) => {
  //   let currentId = e.currentTarget.id;
  //   setActive(currentId);
  // };
  // const changeBg1 = (e) => {
  //   setPercentBtn("hundred_percent");
  // };
  // const activeClass = (e) => {
  //   let currentId = e.currentTarget.id;
  //   setPercentBtn(currentId);
  // };

  return (
    <div className="other2">
      {/* get started section start */}
{/* ============================================================ */}
{/* ============================================================ */}
{/* ============================================================ */}
{/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg">
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
                        Swap
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
    </div>
  );
};

export default DashBoardAnalytics;
