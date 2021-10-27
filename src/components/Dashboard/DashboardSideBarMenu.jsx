import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CasinoIcon from "@mui/icons-material/Casino";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { Link } from "react-router-dom";

import "../../css/dashBoardSideBar.css";

const DashboardSideBarMenu = () => {
  const [activeBg, setActiveBg] = useState("home");

  const changeBg = (e) => {
    let currentId = e.currentTarget.id;
    setActiveBg(currentId);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <a href="/">
              {" "}
              <img
                src="/img/egoras-favicon.svg"
                alt=""
                style={{ width: "50px" }}
              />
            </a>

            {/* =================== */}
            {/* =================== */}
            {/* =================== */}
            {/* =================== */}
            <a href="#" id="home" className="link" onClick={changeBg}>
              <li
                className={
                  activeBg == "home"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }

                // "sidebarListItem list-item-active"
              >
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" id="staking" className="link" onClick={changeBg}>
              <li
                className={
                  activeBg == "staking"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <AttachMoneyIcon className="sidebarIcon" />
                Staking
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" className="link" id="governance" onClick={changeBg}>
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
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" className="link" id="pool" onClick={changeBg}>
              <li
                className={
                  activeBg == "pool"
                    ? "sidebarListItem list-item-active"
                    : "sidebarListItem"
                }
              >
                <CasinoIcon className="sidebarIcon" />
                EGR Pool
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" className="link" id="swap" onClick={changeBg}>
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
            </a>
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
