import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import SecurityIcon from "@mui/icons-material/Security";
import BarChartIcon from "@mui/icons-material/BarChart";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DescriptionIcon from "@mui/icons-material/Description";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { Link } from "react-router-dom";

import "../../css/dashBoardSideBar.css";

const DashboardSideBarMenu = () => {
  const [activeBg, setActiveBg] = useState("market");

  const changeBg = (e) => {
    let currentId = e.currentTarget.id;
    setActiveBg(currentId);
  };

  const linksActive = window.location.pathname;
  useEffect(() => {
    if (linksActive === "/dashboard/lending") {
      setActiveBg("home");
    }
    if (linksActive === "/dashboard") {
      setActiveBg("market");
    }
    if (linksActive === "/dashboard/transaction") {
      setActiveBg("transaction");
    }
    if (linksActive === "/dashboard/governance") {
      setActiveBg("governance");
    }
    if (linksActive === "/dashboard/swap") {
      setActiveBg("swap");
    }
    if (linksActive === "/dashboard/whitepaper") {
      setActiveBg("whitepaper");
    }
  });
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            {/* =================== */}
            {/* =================== */}
            {/* =================== */}
            {/* =================== */}
            <Link
              to="/dashboard"
              id="market"
              className="link"
              onClick={changeBg}
            >
              <li
                className={
                  activeBg == "market"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <BarChartIcon className="sidebarIcon" />
                Markets
              </li>
            </Link>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <Link
              to="/dashboard/lending"
              id="home"
              className="link"
              onClick={changeBg}
            >
              <li
                className={
                  activeBg == "home"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }

                // "sidebarListItem list-item-active"
              >
                <AttachMoneyIcon className="sidebarIcon" />
                Lending
              </li>
            </Link>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}

            <Link
              to="/dashboard/transaction"
              className="link"
              id="transaction"
              onClick={changeBg}
            >
              <li
                className={
                  activeBg == "transaction"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <ImportExportIcon className="sidebarIcon" />
                Staking
              </li>
            </Link>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <Link to="#" className="link" id="governance" onClick={changeBg}>
              <li
                className={
                  activeBg == "governance"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <HowToVoteIcon className="sidebarIcon" />
                Governance
              </li>
            </Link>

            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <Link to="#" className="link" id="swap" onClick={changeBg}>
              <li
                className={
                  activeBg == "swap"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <SwapHorizontalCircleIcon className="sidebarIcon" />
                Swap
              </li>
            </Link>

            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <Link to="#" className="link" id="whitepaper" onClick={changeBg}>
              <li
                className={
                  activeBg == "whitepaper"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <DescriptionIcon className="sidebarIcon" />
                White Paper
              </li>
            </Link>

            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* <Link to="#" className="link" id="security" onClick={changeBg}>
              <li
                className={
                  activeBg == "security"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <SecurityIcon className="sidebarIcon" />
                Security
              </li>
            </Link> */}
            {/* <a className="nav-item_link__yU0Vp" href="/staking">
              <span
                className="nav-item_linkWrapper__1IVev"
                role="button"
                tabindex="0"
              >
                <div
                  className="nav-item_spacer__3_Yzq nav-item_spacerTop__2C-7C"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                >
                  <div
                    className="nav-item_spacerInner__HJWlk"
                    style={{ backgroundColor: "rgb(28, 34, 48)" }}
                  ></div>
                </div>
                <div
                  className="nav-item_linkBody__2ilRo"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                >
                  <img src="/static/media/stake-active.62f4330e.svg" alt="" />
                  <span className="nav-item_text__1Kr9k">Staking</span>
                </div>
                <div
                  className="nav-item_spacer__3_Yzq nav-item_spacerBottom__EdM8-"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                >
                  <div
                    className="nav-item_spacerInner__HJWlk"
                    style={{ backgroundColor: "rgb(28, 34, 48)" }}
                  ></div>
                </div>
              </span>
            </a> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBarMenu;
