import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../../css/dashboardLend.css";
import CircleIcon from "@mui/icons-material/Circle";
import EastIcon from "@mui/icons-material/East";
import { API_URL as api_url } from "../../../actions/types";
import { config } from "../../../actions/Config";
import axios from "axios";
// import { Context } from "../../context/Context";
import { UserContext } from "../../context/Context";

// import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const DashBoardLendPage = () => {
  const { account } = useContext(UserContext);
  console.log(account);
  const [categoryBtn, setCategoryBtn] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeBtn, setActivrBtn] = useState("Active");
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = assets.filter((person) =>
      person.PoolName.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);
  const triggerAll = () => {
    setCategoryBtn("All");
  };

  const assets = [
    {
      id: "1",
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      PoolNameText: "Market of RWA pools, built on the Aave protocol",
      InvestmentCapacity: "1.82",
      PoolValue: "5,368,699",
      SeniorAPY: "10.87",
      Status: "Active",
    },
    {
      id: "2",
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      PoolNameText: "Market of RWA pools, built on the Aave protocol",
      InvestmentCapacity: "1.82",
      PoolValue: "5,368,699",
      SeniorAPY: "10.87",
      Status: "Active",
    },
    {
      id: "3",
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      PoolNameText: "Market of RWA pools, built on the Aave protocol",
      InvestmentCapacity: "1.82",
      PoolValue: "5,368,699",
      SeniorAPY: "10.87",
      Status: "Active",
    },
    {
      id: "4",
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      PoolNameText: "Market of RWA pools, built on the Aave protocol",
      InvestmentCapacity: "1.82",
      PoolValue: "5,368,699",
      SeniorAPY: "10.87",
      Status: "Active",
    },
    {
      id: "5",
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      PoolNameText: "Market of RWA pools, built on the Aave protocol",
      InvestmentCapacity: "1.82",
      PoolValue: "5,368,699",
      SeniorAPY: "10.87",
      Status: "Active",
    },
    {
      id: "6",
      img: "/img/pool_asset_icon.png",
      PoolName: "Real-World Asset Market",
      PoolNameText: "Market of RWA pools, built on the Aave protocol",
      InvestmentCapacity: "1.82",
      PoolValue: "5,368,699",
      SeniorAPY: "10.87",
      Status: "Active",
    },
  ];

  return (
    <div className="other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="pool_container">
            <div className="lending_area1">
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Value Locked(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    407.92M <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">Utilization</div>
                  <div className="lending_area1_cont1_body_txt">96.51%</div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Liquid Assets
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    14.21M <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_last_cont1_divs">
                  <span className="lending_area1_last_cont1_divs_cont1">
                    {" "}
                    Avg. APY:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      8.09%
                    </span>
                  </span>
                  <span className="lending_area1_last_cont1_divs_cont2">
                    Default Protection:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      2.26M USD
                    </span>{" "}
                  </span>
                  <span className="lending_area1_last_cont1_divs_cont3">
                    {" "}
                    Total Pool Tokens:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      385.57 M
                    </span>{" "}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="assets-cont-head-area"> */}
            {/* <div className="search-input">
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
              </div> */}
            {/* </div> */}

            <div className="table_body">
              <div className="filter_table_area">
                <div className="filter_table_area_1">
                  {/* <Box sx={{ minWidth: 120 }}> */}
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Sort by branch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Sort by branch"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>All Branches</MenuItem>
                      <MenuItem value={2}>Agip Branch</MenuItem>
                      <MenuItem value={3}>Oyigbo Branch</MenuItem>
                      <MenuItem value={4}>RU Branch</MenuItem>
                    </Select>
                  </FormControl>
                  {/* </Box> */}
                </div>
              </div>
              <table className="assets-table">
                <thead className="assets-category-titles">
                  <tr className="assets">
                    <th className="assets-category-titles-heading1">Pool</th>
                    <th className="assets-category-titles-heading1">
                      Lending Capacity
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Pool Value
                    </th>
                    <th className="assets-category-titles-heading1 right none_display">
                      Senior APY
                    </th>
                    <th className="assets-category-titles-heading1 right ">
                      Status
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
                  className="assets-table-body popular-categories transitionMe"
                  id="popular-categories"
                >
                  {" "}
                  {/* =============== */}
                  {/* =============== */}
                  {/* =============== */}
                  {searchResults.map((asset) => (
                    <tr className="assets-category-row  transitionMe">
                      <td className="assets-category-data">
                        <div className="assets-data">
                          <img
                            src={asset.img}
                            alt=""
                            className="assets-list-icon_pool_icon"
                          />

                          <div className="assets-data-pool_name">
                            {asset.PoolName}
                            <span className="poolName_txt">
                              {asset.PoolNameText}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="assets-category-data1">
                        <div className="assets-data-name_pool_invest_capcity">
                          <div className="investmentcapacity_box">
                            {" "}
                            {asset.InvestmentCapacity}M Engn
                          </div>
                        </div>
                      </td>
                      <td className="assets-category-data1b">
                        <div className="assets-data-name_pool">
                          {asset.PoolValue}{" "}
                          <span className="asset_symbol"> Engn</span>
                        </div>
                      </td>
                      <td className="assets-category-data1b stable-content">
                        <div className="assets-data-name_pool ">
                          13.0<span className="asset_symbol">%</span>
                        </div>
                      </td>
                      <td className="assets-category-data1b ratio-content">
                        <div
                          className="assets-data-name_pool "
                          style={
                            asset.Status === "Active"
                              ? { color: "#1fb73f" }
                              : asset.Status === "Active"
                              ? { color: "#e6a538" }
                              : null
                          }
                        >
                          <div className="status_column">
                            {asset.Status}
                            <CircleIcon className="status_circle" />
                          </div>
                        </div>
                      </td>
                      <td className="assets-category-data-last">
                        <a
                          href={`/dashboard/lend/pool/detail`}
                          className="assets-btn"
                        >
                          See details <EastIcon className="see_more_icon" />
                        </a>
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
        </div>
      </section>
    </div>
  );
};

export default DashBoardLendPage;
