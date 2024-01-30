import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link } from "react-router-dom";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const UserDetailsLinks = ({ activeLink }) => {
  return (
    <div className="pool_lending_pages_links">
      <Link
        to="/app/user"
        className={
          activeLink === "poolDetails"
            ? "pool_lend_details_link_active"
            : "pool_lend_details_link"
        }
      >
        <DashboardIcon className="asset_overview_link_icon" />
        User Details
      </Link>
      {/* <Link
        to="/app/user/referral"
        className={
          activeLink === "referral"
            ? "pool_lend_details_link_active"
            : "pool_lend_details_link"
        }
      >
        <GroupAddIcon className="asset_overview_link_icon" />
        Referral
      </Link> */}
      {/* <Link
        to="/app/user/reward"
        className={
          activeLink === "reward"
            ? "pool_lend_details_link_active"
            : "pool_lend_details_link"
        }
      >
        <EmojiEventsIcon className="asset_overview_link_icon" />
        Rewards Hub
      </Link> */}
    </div>
  );
};

export default UserDetailsLinks;
