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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [categoryBtn, setCategoryBtn] = useState("All");
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
    const results = assets.filter((person) =>
      person.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);
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
                      <div className="assets-data-name">{asset.eusd_Avail}</div>
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
