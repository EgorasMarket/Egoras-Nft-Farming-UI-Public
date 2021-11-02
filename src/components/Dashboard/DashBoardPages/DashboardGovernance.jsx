import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../../css/dashboardgovernance.css";
const DashboardGovernance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const lists = [
    {
      id: 1,
      img: "/img/btc-logo.svg",
      name: "Bitcoin listing on Egoras Swap",
      symbol_image: "/img/btc-logo.svg",
      symbol_name: "BTC ",
      coin_amount: "$65,000.00",
    },
    {
      id: 1,
      img: "/img/ether-logo.svg",
      name: "Ethereum listing on Egoras Swap",
      symbol_image: "/img/ether-logo.svg",
      symbol_name: "ETH ",
      coin_amount: "$4,560.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
    {
      id: 1,
      img: "/img/bnb-icon.svg",
      name: "Binance listing on Egoras Swap",
      symbol_image: "/img/bnb-icon.svg",
      symbol_name: "BNB ",
      coin_amount: "$424.00",
    },
  ];

  return (
    <div className="governance_section">
      <div className="container">
        <div className="coins_list_area">
          {/* //   key={bag.id} */}
          {lists.map((paste) => (
            <Link to="/dashboard/governance/details" className="coins_card">
              <div className="coinsBg_area">
                <img src={paste.img} alt="" className="coin-img" />
              </div>
              <div className="coinSymbol">
                <img
                  src={paste.symbol_image}
                  alt=""
                  className="assets-list-icon"
                />
                {paste.symbol_name}
              </div>
              <p className="coinName">{paste.name}</p>

              <div className="coin_amount">
                {paste.coin_amount}
                <div className="coin_slider"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardGovernance;
