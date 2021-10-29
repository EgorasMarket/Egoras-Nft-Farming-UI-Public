import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import InputOutlinedIcon from "@material-ui/icons/InputOutlined";
// import SiMastercard from
// import { SiMastercard, SiVisa } from "react-icons/si";
import "../../../css/dashBoarddefaultpage.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const data = [
  {
    name: "Jan",
    APY: 2400,
  },
  {
    name: "Feb",
    APY: 1398,
  },
  {
    name: "Mar",
    APY: 5000,
  },
  {
    name: "Apr",
    APY: 3908,
  },
  {
    name: "May",
    APY: 4800,
  },
  {
    name: "Jun",
    APY: 3800,
  },
  {
    name: "Jul",
    APY: 1900,
  },
  {
    name: "Aug",
    APY: 4000,
  },
  {
    name: "Sep",
    APY: 2300,
  },
  {
    name: "Oct",
    APY: 5300,
  },
  {
    name: "Nov",
    APY: 1300,
  },
  {
    name: "Dec",
    APY: 3000,
  },
];

const transactions = [
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
  {
    type: "loan",
    amount: "$200",
    hash: "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  },
];
const DashBoardDefaultPage = () => {
  const [active, setActive] = useState("supply");
  const [percentBtn, setPercentBtn] = useState("");

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
    <div className="dashboard-home">
      <section className="homeProfile-section">
        <div className="container">
          <div className="dashboard-area1">
            <div className="dashboard-area1-cont1">
              <div className="dashboard-area1-heading-div">
                <p className="dashboard-area1-heading-div-txt">
                  Please fill in or select the proportion bar below to enter the
                  amount of asset you want to supply.
                </p>
              </div>
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              <div className="dashboard-area1-heading-coin-display">
                <div className="coin-display">
                  <img src="/img/ether-logo.svg" alt="" className="eth-icon" />{" "}
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

            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* dashboard second container start */}
            <div className="dashboard-area1-cont2">
              <div className="dash-area1-cont2-column">
                <div className="column1">Total Supply</div>
                <div className="column2">$0.00</div>
              </div>
              <div className="dash-area1-cont2-column">
                <div className="column1">Adequacy Ratio</div>
                <div className="column2">...</div>
              </div>
              <div className="dash-area1-cont2-column">
                <div className="column1">Supply APY</div>
                <div className="column2">1.50%</div>
              </div>
              <div className="dash-area1-cont2-column">
                <div className="column1">LTV (Loan to Value %)</div>
                <div className="column2">80.00%</div>
              </div>
              <div className="dash-area1-cont2-column">
                <div className="column1">ETH Price</div>
                <div className="column2">$4,018.00</div>
              </div>

              <div className="chart_section">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="APY"
                      stroke="#229e54"
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* ============= */}
              {/* ============= */}
            </div>
            {/* dashboard second container end */}
          </div>
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          <div className="dashboard-area2">
            {/* dashboard second container start */}
            <div className="dashboard-area1-cont3">
              <div className="dash-area1-cont2-header2">
                <div className="dash-area1-cont2-header1">Transactions</div>
              </div>
              <div className="dash-area1-cont2-titles">
                <div className="title1 user">TYPE</div>
                <div className="title2 user">AMOUNT</div>
                <div className="title3 user">ADDRESS</div>
              </div>
              {/* ============= */}
              {/* ============= */}

              {transactions.map((maps) => (
                <div className="dash-area1-cont2-titles">
                  <div className="title1">{maps.type}</div>
                  <div className="title2">{maps.amount}</div>
                  <a href="#" className="title3">
                    {maps.hash}
                  </a>
                </div>
              ))}
            </div>

            {/* dashboard second container end */}
            {/* ==================== */}
            {/* ==================== */}
            {/* ==================== */}
          </div>
        </div>
      </section>
      {/* =================================================== */}
      {/* =================================================== */}
      {/* =================================================== */}
      {/* =================================================== */}
    </div>
  );
};

export default DashBoardDefaultPage;
