import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StaticData from "../../../../Static/ListedCoins";
import "../../../../css/dashboardgovernance.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Blockies from "react-blockies";
import axios from "axios";
import { config } from "../../../../actions/Config";
import { API_URL } from "../../../../actions/types";
import Nodata from "../nodataComponent/Nodata";

const DashboardGovernance = () => {
  const [activeTab, setActiveTab] = useState("");
  const [proposals, setProposals] = useState([]);
  const ToggleActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  const fetchData = async () => {
    try {
      const data = await axios.get(
        API_URL + "/web3/votes/1/10000000000000",
        null,
        config
      );

      console.log(data.data.data.products);
      setProposals(data.data.data.products);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(async () => {
    fetchData();
  }, []);

  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="proposals_area">
            <div className="lending_area1">
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Proposals
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    230
                    <span className="usd_sign">proposals</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total number of all the proposals uploaded on
                    the smart-contract.
                  </div>
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Voters
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    5,000
                    <span className="usd_sign">voters</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total number of all the users that have voted on
                    any proposal.
                  </div>
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Eusd Minted
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    10,000,000
                    <span className="usd_sign">eusd</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total number of eusd minted from the smart
                    contract and given to approved proposals.
                  </div>
                </div>
              </div>
            </div>
            {/* ============= */}
            {/* ============= */}
            {/* ============= */}
            {/* ============= */}
            {/* ============= */}
            <div className="proposals_area_2">
              <div className="proposals_area_2_head">
                <div className="proposals_area_2_head_txt">Proposals</div>
                <div className="proposals_area_2_head_stats_div">
                  <div className="proposals_area_2_head_stats_div1">
                    <div className="proposals_area_2_head_stats_div1_title">
                      Active
                    </div>
                    <div className="proposals_area_2_head_stats_div1_txt">
                      100
                    </div>
                  </div>
                  <div className="proposals_area_2_head_stats_div1">
                    <div className="proposals_area_2_head_stats_div1_title">
                      Approved
                    </div>
                    <div className="proposals_area_2_head_stats_div1_txt">
                      100
                    </div>
                  </div>
                  <div className="proposals_area_2_head_stats_div1">
                    <div className="proposals_area_2_head_stats_div1_title">
                      Terminated
                    </div>
                    <div className="proposals_area_2_head_stats_div1_txt">
                      10
                    </div>
                  </div>
                  <div className="proposals_area_2_head_stats_div1">
                    <div className="proposals_area_2_head_stats_div1_title">
                      Withdrawn
                    </div>
                    <div className="proposals_area_2_head_stats_div1_txt">
                      20
                    </div>
                  </div>
                </div>
              </div>
              <div className="proposals_area_2_body">
                <div className="proposals_area_2_body_head_tabs">
                  <div
                    id=""
                    className={
                      activeTab === ""
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    All
                  </div>
                  <div
                    id="PENDING"
                    className={
                      activeTab === "PENDING"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Active
                  </div>
                  <div
                    id="Approved"
                    className={
                      activeTab === "Approved"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Approved
                  </div>
                  <div
                    id="Terminated"
                    className={
                      activeTab === "Terminated"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Terminated
                  </div>
                  <div
                    id="Withdrawn"
                    className={
                      activeTab === "Withdrawn"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Withdrawn
                  </div>
                </div>
                <div className="proposals_area_2_body_area">
                  {proposals.filter((data) => data.status.includes(activeTab))
                    .length <= 0 || proposals.length <= 0 ? (
                    <div className="governance_details_area_2_cont2_body_2_nodata_div">
                      <Nodata />
                      <div className="governance_details_area_2_cont2_body_2_nodata_div_txt">
                        No proposal found
                      </div>
                    </div>
                  ) : (
                    <>
                      {" "}
                      {proposals
                        .filter((data) => data.status.includes(activeTab))
                        .map((data) => (
                          <Link
                            to={`/app/governance/proposal/details/${data.index_id}/${data.creator}/${data.product_name}`}
                            className="proposals_area_2_body_area_cont1"
                          >
                            <div className="proposals_area_2_body_area_cont1_area1">
                              <div className="proposals_area_2_body_area_cont1_area1_title">
                                {data.product_name}
                              </div>
                              <div className="proposals_area_2_body_area_cont1_area1_status">
                                <button
                                  className="proposals_area_2_body_area_cont1_area1_status_btn"
                                  style={{
                                    background: "PENDING"
                                      ? "#d69d16"
                                      : data.status === "Approved"
                                      ? "#3e9a3e"
                                      : data.status === "Terminated"
                                      ? "#eb3d3d"
                                      : "#55555d",
                                  }}
                                >
                                  {data.status}
                                </button>
                              </div>
                            </div>
                            <div className="proposals_area_2_body_area_cont1_area2">
                              <div className="proposals_area_2_body_area_cont1_area2_div1">
                                <span className="proposals_area_2_body_area_cont1_area2_div1_span">
                                  Published By
                                </span>
                                <Blockies
                                  seed={data.creator}
                                  size={8}
                                  scale={4}
                                  className="blockies_icon2"
                                />{" "}
                                {`${data.creator.slice(0, 16)}...`}
                              </div>
                              <div className="proposals_area_2_body_area_cont1_area2_div2">
                                {data.status === "Active" ? (
                                  <> Ends On {data.createdAt}</>
                                ) : (
                                  <> Ended On {data.createdAt}</>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardGovernance;
