import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StaticData from "../../../../Static/ListedCoins";
import "../../../../css/dashboardgovernance.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Blockies from "react-blockies";

const DashboardGovernance = () => {
  const [activeTab, setActiveTab] = useState("all");
  const ToggleActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
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
                    5000
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
                    id="all"
                    className={
                      activeTab === "all"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    All
                  </div>
                  <div
                    id="active"
                    className={
                      activeTab === "active"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Active
                  </div>
                  <div
                    id="approve"
                    className={
                      activeTab === "approve"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Approved
                  </div>
                  <div
                    id="terminate"
                    className={
                      activeTab === "terminate"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Terminated
                  </div>
                  <div
                    id="withdraw"
                    className={
                      activeTab === "withdraw"
                        ? "proposals_area_2_body_head_tabs_1_active"
                        : "proposals_area_2_body_head_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Withdrawn
                  </div>
                </div>
                <div className="proposals_area_2_body_area">
                  {StaticData.Proposals.map((data) => (
                    <div className="proposals_area_2_body_area_cont1">
                      <div className="proposals_area_2_body_area_cont1_area1">
                        <div className="proposals_area_2_body_area_cont1_area1_title">
                          {data.title}
                        </div>
                        <div className="proposals_area_2_body_area_cont1_area1_status">
                          <button
                            className="proposals_area_2_body_area_cont1_area1_status_btn"
                            style={{
                              background:
                                data.status === "Active"
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
                            <> Started On {data.startDate}</>
                          ) : (
                            <> Ended On {data.endDate}</>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
