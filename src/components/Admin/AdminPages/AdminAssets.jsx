import React, { useState, useEffect, useRef, useMemo } from "react";
import jazzicon from "@metamask/jazzicon";
import { CopperLoading } from "respinner";
import StarRateIcon from "@mui/icons-material/StarRate";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { numberWithCommas } from "../../../static";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CopyAllIcon from "@mui/icons-material/CopyAll";
import Nodata from "../../Dashboard/DashBoardPages/nodataComponent/Nodata";
import axios from "axios";

import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const AdminAssets = () => {
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [loans, setLoans] = useState([]);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [assetDetailModal, setAssetDetailModal] = useState("");
  const [imgDiv, setImgDiv] = useState(false);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [graphData2, setGraphData2] = useState([]);
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
  const avatarRef = useRef();
  useEffect(() => {
    setWalletAddr(account);
    // console.log(walletAddr.slice(0, 10));
    const element = avatarRef.current;
    if (element && account) {
      setWalletAddr(account);
      setConnectTxt("Connected");
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      console.log(addr, seed);
      const icon = jazzicon(60, seed); //generates a size 20 icon
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef]);
  useEffect(() => {
    // if (account) {
    axios
      .get(
        api_url +
          "/api/branch/transactions/" +
          "0x4fc19963b769711c09da56b35B334E55c57fc9Ee",
        null,
        config
      )
      .then((data) => {
        console.log(data.data.payload, "made man");

        setLoans(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
    //   return;
    // }
  }, []);
  var btc = [
    {
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 225000,
    },
    {
      timestamp: "2022-07-16T09:37:07.000Z",
      value: 81900,
    },
    {
      timestamp: "2022-07-16T15:09:00.000Z",
      value: 15900,
    },
    {
      timestamp: "2022-07-16T15:20:00.000Z",
      value: 15900,
    },
    {
      timestamp: "2022-07-16T15:44:01.000Z",
      value: 31800,
    },
    {
      timestamp: "2022-07-18T12:40:00.000Z",
      value: 100000,
    },
    {
      timestamp: "2022-07-18T13:56:00.000Z",
      value: 183190,
    },
    {
      timestamp: "2022-07-18T14:25:00.000Z",
      value: 545200,
    },
    {
      timestamp: "2022-07-18T14:59:01.000Z",
      value: 131900,
    },
    {
      timestamp: "2022-07-18T15:39:00.000Z",
      value: 199900,
    },
    {
      timestamp: "2022-07-18T16:11:01.000Z",
      value: 181700,
    },
    {
      timestamp: "2022-07-18T16:27:01.000Z",
      value: 126700,
    },
    {
      timestamp: "2022-07-18T16:46:00.000Z",
      value: 121600,
    },
  ];
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const closeAssetDetailModal = () => {
    setAssetDetailModal("");
    console.log("i am not here");
  };
  const toggleImgDiv = () => {
    setImgDiv(!imgDiv);
  };

  const ChangeAssetDetailModal = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setAssetDetailModal(currentTarget);
  };
  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className=" no-bg no_paddd ">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="userdAshboard_head">
              <div className="userdAshboard_head_area">
                <div className="metamask_prof_pic" ref={avatarRef}></div>
                <div className="user_walletAddress">
                  <div className="wallet_addr_cont">
                    <div className="wallet_addr_cont_txt">{walletAddr}</div>

                    <CopyAllIcon className="copy_all_tx_hash_icon" />
                  </div>
                  <span className="connected_txt">{conecttxt}</span>
                </div>
              </div>
              <span className="hr_vertical"></span>

              <div className="admin_asset_data_count_head">
                <div className="admin_transact_data_graph_head_sub">
                  Total Assets : 52
                </div>
                Total Asset Value : 6,000,000 Engn
              </div>
            </div>

            <div className="asset_list_div">
              <div className="asset_list_heading">
                <span className="asset_list_head">Asset List </span>

                <div className="filter_table_area_2">
                  <div
                    id="Ongoing"
                    className={
                      activeBtn == "Ongoing"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Ongoing
                  </div>
                  <div
                    id="All"
                    className={
                      activeBtn == "All"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    All Pools
                  </div>
                  <div
                    id="Closed"
                    className={
                      activeBtn == "Closed"
                        ? "filter_table_btn1_active"
                        : "filter_table_btn1"
                    }
                    onClick={toggleActiveBtn}
                  >
                    Closed
                  </div>
                </div>
              </div>

              <div className="asset_list_desktop_view2">
                <table className="branch_asset_table">
                  <thead className="branch_asset_titles">
                    <tr className="branch_asset_title_div">
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_first">
                        Asset Name
                      </th>
                      <th className="branch_asset_heading_titles">
                        Amount(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funded(Engn)
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Progress
                      </th>
                      <th className="branch_asset_heading_titles">
                        Funding Left
                      </th>
                      <th className="branch_asset_heading_titles ">APY</th>
                      <th className="branch_asset_heading_titles ">Status</th>
                      <th className="branch_asset_heading_titles branch_asset_heading_titles_last"></th>
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
                  {loans.length <= 0 ? (
                    <div className="no_loans_div">
                      <div className="no_loans_div_cont">
                        <Nodata />
                        No Pools yet.
                      </div>{" "}
                    </div>
                  ) : (
                    <tbody
                      className="branch_asset_body"
                      id="popular-categories"
                    >
                      {" "}
                      {/* =============== */}
                      {/* =============== */}
                      {/* =============== */}
                      {activeBtn === "Ongoing"
                        ? loans
                            .filter((person) => person.state == "OPEN")
                            .map((asset) => {
                              var percentage =
                                (asset.funded / asset.amount) * 100;
                              const meta = JSON.parse(asset.metadata);

                              return (
                                <tr
                                  className="branch_asset_body_row "
                                  id={asset.newLoanID}
                                  onClick={ChangeAssetDetailModal}
                                >
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                    <div className="assets-data">
                                      <img
                                        src={meta.arrayImg}
                                        alt=""
                                        className="assets-list-icon_pool_icon"
                                      />

                                      <div className="assets-data-pool_name">
                                        {asset.title.substring(0, 8) + "..."}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                    <div className="asset_list_body_body_cont_1c">
                                      {numberWithCommas(
                                        parseInt(asset.amount).toFixed(2)
                                      )}
                                    </div>
                                    {/* </div> */}
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      {numberWithCommas(
                                        parseInt(asset.funded).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      <div className="asset_amount_progress_div">
                                        <div className="asset_amount_progress_div_txt"></div>
                                        <label for="file">
                                          {parseInt(percentage).toFixed()}%
                                        </label>
                                        <progress
                                          className={
                                            percentage < 100
                                              ? "progress_bar progress_bar_progress"
                                              : "progress_bar"
                                          }
                                          // "progress_bar"
                                          id="file"
                                          aria-valuenow={
                                            asset.amount - asset.funded
                                          }
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
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool ">
                                      {numberWithCommas(
                                        parseInt(
                                          asset.amount - asset.funded
                                        ).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data   ">
                                    <div className="asset_list_body_body_cont_1f body_cont1_f">
                                      13%
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data ">
                                    <div className="asset_list_body_body_cont_1g">
                                      <button
                                        className={
                                          asset.state === "OPEN"
                                            ? "status_btn_ongoing"
                                            : asset.state === "FILLED"
                                            ? "status_btn_closed"
                                            : "status_btn"
                                        }
                                      >
                                        {asset.state}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                    <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                  </td>
                                </tr>
                              );
                            })
                        : activeBtn === "All"
                        ? loans.map((asset) => {
                            var percentage =
                              (asset.funded / asset.amount) * 100;
                            const meta = JSON.parse(asset.metadata);
                            return (
                              <tr
                                className="branch_asset_body_row "
                                id={asset.newLoanID}
                                onClick={ChangeAssetDetailModal}
                              >
                                <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                  <div className="assets-data">
                                    <img
                                      src={meta.arrayImg}
                                      alt=""
                                      className="assets-list-icon_pool_icon"
                                    />

                                    <div className="assets-data-pool_name">
                                      {asset.title.substring(0, 8) + "..."}
                                    </div>
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                  <div className="asset_list_body_body_cont_1c">
                                    {numberWithCommas(
                                      parseInt(asset.amount).toFixed(2)
                                    )}
                                  </div>
                                  {/* </div> */}
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  <div className="assets-data-name_pool">
                                    {numberWithCommas(
                                      parseInt(asset.funded).toFixed(2)
                                    )}
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data  ">
                                  <div className="assets-data-name_pool">
                                    <div className="asset_amount_progress_div">
                                      <div className="asset_amount_progress_div_txt"></div>
                                      <label for="file">
                                        {parseInt(percentage).toFixed()}%
                                      </label>
                                      <progress
                                        className={
                                          percentage < 100
                                            ? "progress_bar progress_bar_progress"
                                            : "progress_bar"
                                        }
                                        // "progress_bar"
                                        id="file"
                                        aria-valuenow={
                                          asset.amount - asset.funded
                                        }
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
                                <td className="branch_asset_body_row_data  ">
                                  <div className="assets-data-name_pool ">
                                    {numberWithCommas(
                                      parseInt(
                                        asset.amount - asset.funded
                                      ).toFixed(2)
                                    )}
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data   ">
                                  <div className="asset_list_body_body_cont_1f body_cont1_f">
                                    13%
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data ">
                                  <div className="asset_list_body_body_cont_1g">
                                    <button
                                      className={
                                        asset.state === "OPEN"
                                          ? "status_btn_ongoing"
                                          : asset.state === "FILLED"
                                          ? "status_btn_closed"
                                          : "status_btn"
                                      }
                                    >
                                      {asset.state}
                                    </button>
                                  </div>
                                </td>
                                <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                  <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                </td>
                              </tr>
                            );
                          })
                        : activeBtn === "Closed"
                        ? loans
                            .filter((person) => person.state == "FILLED")
                            .map((asset) => {
                              var percentage =
                                (asset.funded / asset.amount) * 100;
                              const meta = JSON.parse(asset.metadata);
                              return (
                                <tr
                                  className="branch_asset_body_row "
                                  id={asset.newLoanID}
                                  onClick={ChangeAssetDetailModal}
                                >
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_first  ">
                                    <div className="assets-data">
                                      <img
                                        src={meta.arrayImg}
                                        alt=""
                                        className="assets-list-icon_pool_icon"
                                      />

                                      <div className="assets-data-pool_name">
                                        {asset.title.substring(0, 8) + "..."}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    {/* <div className="assets-data-name_pool_invest_capcity"> */}
                                    <div className="asset_list_body_body_cont_1c">
                                      {numberWithCommas(
                                        parseInt(asset.amount).toFixed(2)
                                      )}
                                    </div>
                                    {/* </div> */}
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      {numberWithCommas(
                                        parseInt(asset.funded).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool">
                                      <div className="asset_amount_progress_div">
                                        <div className="asset_amount_progress_div_txt"></div>
                                        <label for="file">
                                          {parseInt(percentage).toFixed()}%
                                        </label>
                                        <progress
                                          className={
                                            percentage < 100
                                              ? "progress_bar progress_bar_progress"
                                              : "progress_bar"
                                          }
                                          // "progress_bar"
                                          id="file"
                                          aria-valuenow={
                                            asset.amount - asset.funded
                                          }
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
                                  <td className="branch_asset_body_row_data  ">
                                    <div className="assets-data-name_pool ">
                                      {numberWithCommas(
                                        parseInt(
                                          asset.amount - asset.funded
                                        ).toFixed(2)
                                      )}
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data   ">
                                    <div className="asset_list_body_body_cont_1f body_cont1_f">
                                      13%
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data ">
                                    <div className="asset_list_body_body_cont_1g">
                                      <button
                                        className={
                                          asset.state === "OPEN"
                                            ? "status_btn_ongoing"
                                            : asset.state === "FILLED"
                                            ? "status_btn_closed"
                                            : "status_btn"
                                        }
                                      >
                                        {asset.state}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="branch_asset_body_row_data branch_asset_body_row_data_last">
                                    <KeyboardArrowRightIcon className="arrow_right_arrow" />
                                  </td>
                                </tr>
                              );
                            })
                        : null}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                      {/* =================== */}
                    </tbody>
                  )}
                </table>
              </div>
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* ======================================================== */}
            </div>
          </div>
        </div>
      </section>
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {loans.map((data) => {
        const meta = JSON.parse(data.metadata);

        const tHash = `https://bscscan.com/tx/${data.transactionHash}`;
        const returnProgress = () => {
          let value = parseInt(data.funded);
          let percentage = value / parseInt(data.amount);
          let final = percentage * 100;
          return final.toString();
        };
        var percentage = (data.funded / data.amount) * 100;
        return (
          <>
            {/* modal starts here */}
            {assetDetailModal == data.newLoanID ? (
              <div className="asset_detail_modal_div">
                <div className="asset_detail_modal_div_conts">
                  <div className="asset_detail_heading" style={{ margin: "0" }}>
                    <div className="pool_detail_heading_area1">
                      <img
                        src={meta.arrayImg}
                        alt=""
                        className="pool_detail_heading_area1_img"
                        onClick={toggleImgDiv}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="pool_detail_heading_area1_txt_cont">
                        <div className="pool_detail_heading_area1_txt_cont_1">
                          {data.title.substring(0, 25) + "..."}
                        </div>
                        <div className="pool_detail_heading_area1_txt_cont_2">
                          Assets {">"} Asset{data.newLoanID}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ====== */}
                  {/* ====== */}
                  {/* ====== */}
                  <div className="asset_status_details_div1">
                    <div className="asset_status_details_div1_head">
                      Status{" "}
                      <div className="staus_btn_div">
                        <button
                          className={
                            data.state === "OPEN"
                              ? "status_btn_ongoing"
                              : data.state === "FILLED"
                              ? "status_btn_closed"
                              : "status_btn"
                          }
                        >
                          {data.state}
                        </button>
                      </div>
                    </div>
                    <div className="asset_status_details_div1_body">
                      <div className="asset_status_details_div1_body1">
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Asset Value
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {numberWithCommas(parseInt(data.amount).toFixed())}{" "}
                            Engn
                          </div>
                        </div>
                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Amount Funded
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {numberWithCommas(data.funded)} Engn
                          </div>
                        </div>

                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Funding Progress
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            <div className="asset_amount_progress_div">
                              <div className="asset_amount_progress_div_txt"></div>
                              <label for="file">
                                {parseInt(
                                  (data.funded / data.amount) * 100
                                ).toFixed()}
                                %
                              </label>
                              <progress
                                className={
                                  percentage < 100
                                    ? "progress_bar progress_bar_progress"
                                    : "progress_bar"
                                }
                                // className={
                                //   data.funded < data.amount
                                //     ? " progress_bar progress_bar_progress"
                                //     : data.funded === data.amount
                                //     ? "progress_bar"
                                //     : " progress_bar progress_bar_progress"
                                // }
                                // "progress_bar"
                                id="file"
                                aria-valuenow={data.amount - data.funded}
                                value={data.funded}
                                max={data.amount}
                              ></progress>
                            </div>
                          </div>
                        </div>
                        {/* <hr class="custom_hr"></hr> */}
                      </div>
                      {/* ======== */}
                      {/* ======== */}
                      {/* ======== */}
                      {/* ======== */}
                      <div className="asset_status_details_div1_body1">
                        {/* <hr class="custom_hr"></hr> */}

                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Funding left
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {numberWithCommas(data.amount - data.funded)} Engn
                          </div>
                        </div>
                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Estimated APY
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            13 %
                          </div>
                        </div>
                        <hr class="custom_hr"></hr>
                        <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Date
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            {data.createdAt.slice(0, 10)}
                          </div>
                        </div>
                        {/* <div className="asset_status_details_div1_body1_cont1">
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Financed by
                          </div>
                          <div className="asset_status_details_div1_body1_cont1_txt1">
                            Nov 13, 2024
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  <div className="Asset_Originator_Details_cont">
                    <div className="Asset_Originator_Details_cont_heading">
                      Asset Details
                    </div>
                    <div className="Asset_Originator_Details_cont_body">
                      {/* <div className="Asset_Originator_Details_cont_body_head_img_cont">
                        <img
                          src="/img/branch_detail_img.png"
                          className="Asset_Originator_Details_cont_body_head_img"
                        />
                      </div> */}
                      <div
                        className="Asset_Originator_Details_cont_body_txt"
                        dangerouslySetInnerHTML={{
                          __html: meta.story,
                        }}
                      ></div>
                      <div className="asset_details_spec_div">
                        {/* <div className="asset_details_spec_div_title"> */}
                        {/* <Accordion
                          title="Asset Specifications"
                          customClass=" accordionClass "
                        >
                          <div className="asset_spec_body">
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Ram: 4gb
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Rom: 128gb
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Display: 6.43 inches
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Processor: Snapdragon 678
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Rear Camera: 48 MP + 8 MP + 2 MP + 2 MP
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Front Camera: 13 MP
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              Battery: 5000 mAh
                            </div>
                            <hr class="custom_hr"></hr>
                            <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                              SIM: Dual SIM (Nano-SIM, dual stand-by)
                            </div>
                          </div>
                        </Accordion> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  <div className="Asset_Originator_Details_cont">
                    <div className="Asset_Originator_Details_cont_heading">
                      Transaction Data
                    </div>
                    <div className="transactionData_body">
                      <div className="transactionData_body1">
                        Transaction Id
                      </div>
                      <div className="transactionData_body1">
                        <a
                          href={tHash}
                          className="transaction_id_link"
                          target="_blank"
                        >
                          {data.transactionHash.substring(0, 28) + "..."}
                        </a>
                        <CopyAllIcon className="copy_all_tx_hash_icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="close_asset_detail_modal"
                  onClick={closeAssetDetailModal}
                >
                  <CloseIcon className="close_asset_detail_modal_icon" />
                  Close
                </div>
                {imgDiv === true ? (
                  <div className="img_modal">
                    <div className="img_modal_div">
                      <img
                        src={meta.arrayImg}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div
                      className="close_asset_detail_modal"
                      onClick={toggleImgDiv}
                    >
                      <CloseIcon className="close_asset_detail_modal_icon" />
                      Close
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default AdminAssets;
