import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../../../css/dashboardLend.css";
import CircleIcon from "@mui/icons-material/Circle";
import EastIcon from "@mui/icons-material/East";
import { API_URL as api_url } from "../../../actions/types";
import { config } from "../../../actions/Config";
import axios from "axios";
import ProgressBar from "@hawk-ui/progress-bar";
// import { Context } from "../../context/Context";
import { UserContext } from "../../context/Context";
import Nodata from "./nodataComponent/Nodata";
// import PropTypes from "prop-types";
// import YanProgress from "react-yan-progress";
import { numberWithCommas } from "../../static/static";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const DashBoardLendPage = () => {
  const context = useWeb3React();
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
  const { Branches, BranchDetails, rumuName, agipName, oyName } =
    useContext(UserContext);
  console.log(Branches);
  const [categoryBtn, setCategoryBtn] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);
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
  //   useEffect(() => {
  //     const results = assets.filter((person) =>
  //       person.PoolName.toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     );
  //     setSearchResults(results);
  //   }, [searchTerm]);
  const triggerAll = () => {
    setCategoryBtn("All");
  };
  useEffect(() => {
    axios
      .get(api_url + "/api/branch/totalpools", null, config)
      .then((data) => {
        console.log(data.data.payload[0].total, "powerfulpools");
        setLockedValue(data.data.payload[0].total);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  useEffect(() => {
    axios
      .get(api_url + "/api/branch/totalbranchvalue", null, config)
      .then((data) => {
        console.log(data.data.payload, "powerfulpools");
        setTotalLendingCapacity(data.data.payload[0].total);
        setTotalLendingCount(data.data.payload[0].count);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);

  return (
    <div className="other2 asset_other2">
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
                    Total Amount Funded(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(parseInt(lockedValue).toFixed(2))}{" "}
                    <span className="usd_sign">NGN</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Amount Funded(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(parseInt(lockedValue / 570).toFixed(2))}{" "}
                    <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                </div>
              </div>

              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Lending Capacity
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(
                      parseInt(totalLendingCapacity).toFixed(2)
                    )}{" "}
                    <span className="usd_sign">NGN</span>
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
                    Est.APY:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      13.0%
                    </span>
                  </span>
                  {/* <span className="lending_area1_last_cont1_divs_cont2">
                    Default Protection:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      2.26M ₦
                    </span>{" "}
                  </span> */}
                  <span className="lending_area1_last_cont1_divs_cont3">
                    {" "}
                    Total Pool Assets:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      {totalLendingCount}
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
                      Funding Capacity
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Amount Funded
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Funding Progress
                    </th>
                    <th className="assets-category-titles-heading1 right none_display">
                      Estimated APY
                    </th>
                    <th className="assets-category-titles-heading1 right ">
                      Status
                    </th>
                    <th className="assets-category-titles-heading1 right ">
                      Action
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
                {Branches.length <= 0 ? (
                  <div className="no_loans_div">
                    <div className="no_loans_div_cont">
                      <Nodata />
                      No Pools yet.
                    </div>{" "}
                  </div>
                ) : (
                  <tbody
                    className="assets-table-body popular-categories transitionMe"
                    id="popular-categories"
                  >
                    {" "}
                    {/* =============== */}
                    {/* =============== */}
                    {/* =============== */}
                    {Branches.map((asset) => {
                      return (
                        <tr className="assets-category-row  transitionMe">
                          <td className="assets-category-data branch_name_title">
                            <div className="assets-data">
                              <img
                                src={
                                  oyName === true
                                    ? "/img/oyigbo_icon.svg"
                                    : agipName === true
                                    ? "/img/agip_icon.svg"
                                    : rumuName === true
                                    ? "/img/rumu_icon.svg"
                                    : null
                                }
                                alt=""
                                className="assets-list-icon_pool_icon"
                              />

                              <div className="assets-data-pool_name">
                                {asset.name} Branch
                                <span className="poolName_txt">
                                  {/* {asset.PoolNameText}
                                   */}
                                  Emerging Markets
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="assets-category-data1 branch_Lending_Capacity">
                            <div className="assets-data-name_pool_invest_capcity">
                              <div className="investmentcapacity_box">
                                {" "}
                                {numberWithCommas(
                                  parseInt(asset.amount).toFixed(0)
                                )}{" "}
                                Engn
                              </div>
                            </div>
                          </td>
                          <td className="assets-category-data1b branch_pool_value">
                            <div className="assets-data-name_pool">
                              {numberWithCommas(
                                parseInt(asset.funded).toFixed(2)
                              )}{" "}
                              <span className="asset_symbol"> Engn</span>
                            </div>
                          </td>
                          <td className="assets-category-data1b branch_pool_value">
                            <div className="assets-data-name_pool">
                              <div className="asset_amount_progress_div">
                                <div className="asset_amount_progress_div_txt"></div>
                                <label for="file">
                                  {parseInt(
                                    (asset.funded / asset.amount) * 100
                                  ).toFixed()}
                                  %
                                </label>
                                <progress
                                  className={
                                    asset.funded < asset.amount
                                      ? "progress_bar progress_bar_progress"
                                      : "progress_bar"
                                  }
                                  // "progress_bar"
                                  id="file"
                                  aria-valuenow={asset.amount - asset.funded}
                                  value={asset.funded}
                                  max={asset.amount}
                                ></progress>
                                {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                              </div>
                            </div>
                          </td>
                          <td className="assets-category-data1b stable-content branch_apy">
                            <div className="assets-data-name_pool ">
                              13.0
                              <span className="asset_symbol">%</span>
                            </div>
                          </td>
                          <td className="assets-category-data1b ratio-content branch_loan_status">
                            <div
                              className="assets-data-name_pool "
                              style={
                                asset.suspended === "false"
                                  ? { color: "#1fb73f" }
                                  : { color: "#e6a538" }
                              }
                            >
                              <div className="status_column">
                                {asset.suspended === "false"
                                  ? "Active"
                                  : "Inactive"}
                                <CircleIcon className="status_circle" />
                              </div>
                            </div>
                          </td>
                          <td className="assets-category-data-last branch_loan_action">
                            <a
                              href={`/dashboard/earn/pool/${asset.branchAddress}/detail`}
                              className="assets-btn"
                            >
                              See details <EastIcon className="see_more_icon" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardLendPage;
