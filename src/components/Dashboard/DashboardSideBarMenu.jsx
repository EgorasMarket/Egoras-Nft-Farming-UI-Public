import React from "react";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import "../../css/dashBoardSideBar.css";

const DashboardSideBarMenu = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <img
              src="/img/egoras-favicon.svg"
              alt=""
              style={{ width: "60px" }}
            />
            {/* =================== */}
            {/* =================== */}
            {/* =================== */}
            {/* =================== */}
            <a href="#" className="link">
              <li className="sidebarListItem list-item-active">
                <LineStyle className="sidebarIcon" />
                Staking
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Governance
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Egr Pool
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            <a href="#" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Swap
              </li>
            </a>
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
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
