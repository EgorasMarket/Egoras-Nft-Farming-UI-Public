import React, { useState, useEffect } from "react";

import "../../../css/dashboardtransaction.css";

const DashBoardTransaction = () => {
  const [categoryBtn, setCategoryBtn] = useState("All");
  const [active, setActive] = useState("supply");
    const [percentBtn, setPercentBtn] = useState("");

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

  const triggerStake = () => {
    setCategoryBtn("stake");
  };
  const triggerNominate = () => {
    setCategoryBtn("nominate");
  };
    const changeBg = (e) => {
      let currentId = e.currentTarget.id;
      setActive(currentId);
    };

    const changeBg1 = (e) => {
      setPercentBtn("hundred_percent");
    };
    const activeClass = (e) => {
      let currentId = e.currentTarget.id;
      setPercentBtn(currentId);
    };

  return (
    <div className="transationPage">
      <section className="transactionFullSection">
        <div className="container">
          <div className="staking-area">
            <div className="staking-area1">
              <div className="assets-cont-head-area">
                <div className="assets-cont-header-arae-btns">
                  <button
                    className={
                      categoryBtn === "All"
                        ? "assets-header1"
                        : "assets-header2"
                    }
                    onClick={triggerAll}
                  >
                    All
                  </button>
                  <button
                    className={
                      categoryBtn === "stake"
                        ? "assets-header1"
                        : "assets-header2"
                    }
                    onClick={triggerStake}
                  >
                    Stake
                  </button>
                  <button
                    className={
                      categoryBtn === "nominate"
                        ? "assets-header1"
                        : "assets-header2"
                    }
                    onClick={triggerNominate}
                  >
                    Nominate
                  </button>
                </div>
              </div>
              <table className="assets-table">
                <thead className="assets-category-titles">
                  <tr className="assets">
                    <th className="assets-category-titles-heading1">
                      Total Staked Amount
                    </th>
                    <th className="assets-category-titles-heading1">Status</th>
                    <th className="assets-category-titles-heading1 right">
                      Estimated APR
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Estimated Daily Reward
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Earned Rewards
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
                  </tr>
                  {/* =================== */}
                  {/* =================== */}
                  {/* =================== */}
                  {/* =================== */}
                </tbody>
                {/* {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}} */}
              </table>
            </div>
            <div className="staking-area2">
              <div className="dashboard-area1-cont1 stake-cont2">

                {/* ========= */}
                {/* ========= */}
                {/* ========= */}
                <div className="dashboard-area1-heading-coin-display">
                  <div className="coin-display">
                    <img
                      src="/img/ether-logo.svg"
                      alt=""
                      className="eth-icon"
                    />{" "}
                    ETH Supplied
                  </div>
                  <div className="coin-display-amount">0.00</div>
                </div>
                {/* ========= */}
                {/* ========= */}
                {/* ========= */}
                <div className="dashboard-area1-heading-supply-withdraw-pages">
                  <button
                    className={
                      active == "supply"
                        ? "supply-btn supply-btn-active"
                        : "supply-btn"
                    }
                    id="supply"
                    onClick={changeBg}
                  >
                    Supply
                  </button>
                  <button
                    className={
                      active == "withdraw"
                        ? "supply-btn supply-btn-active"
                        : "supply-btn"
                    }
                    id="withdraw"
                    onClick={changeBg}
                  >
                    Withdraw
                  </button>
                </div>
                {/* ========= */}
                {/* ========= */}
                {/* ========= */}
                <div className="dashboard-area1-heading-supply-withdraw-input">
                  <div className="withdraw-input-section1">
                    <div
                      className={
                        active == "supply"
                          ? "safe-to-withdraw"
                          : "not-safe-to-withdraw"
                      }
                    >
                      ETH Balance
                    </div>
                    <div
                      className={
                        active == "withdraw"
                          ? "safe-to-withdraw"
                          : "not-safe-to-withdraw"
                      }
                    >
                      Safe to Withdraw
                    </div>
                    <div className="safe-to-withdraw-figure">0.00</div>
                  </div>
                  <div className="withdraw-input-section2">
                    <input
                      type="search"
                      name=""
                      value="0.00"
                      id=""
                      className="withdraw-input-box"
                    />
                    <button className="max-btn" onClick={changeBg1}>
                      Max
                    </button>
                  </div>
                  <div className="withdraw-input-section3">
                    <button
                      className={
                        percentBtn == "twentyFive_percent"
                          ? "percent-increase percent-increase-active"
                          : "percent-increase"
                      }
                      // "percent-increase percent-increase-active"
                      id="twentyFive_percent"
                      onClick={activeClass}
                    >
                      25%
                    </button>
                    <button
                      className={
                        percentBtn == "fifty_percent"
                          ? "percent-increase percent-increase-active"
                          : "percent-increase"
                      }
                      id="fifty_percent"
                      onClick={activeClass}
                    >
                      50%
                    </button>
                    <button
                      className={
                        percentBtn == "sevenFive_percent"
                          ? "percent-increase percent-increase-active"
                          : "percent-increase"
                      }
                      id="sevenFive_percent"
                      onClick={activeClass}
                    >
                      75%
                    </button>
                    <button
                      className={
                        percentBtn == "hundred_percent"
                          ? "percent-increase percent-increase-active"
                          : "percent-increase"
                      }
                      id="hundred_percent"
                      onClick={activeClass}
                    >
                      100%
                    </button>
                  </div>
                </div>
                {/* ========= */}
                {/* ========= */}
                {/* ========= */}
                <div className="dashboard-area1-heading-supply-withdraw-btn">
                  <button
                    className={
                      active == "supply" ? "withdraw-btn" : "not-withdraw-btn"
                    }
                  >
                    Supply
                  </button>
                  <button
                    className={
                      active == "withdraw" ? "withdraw-btn" : "not-withdraw-btn"
                    }
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardTransaction;
