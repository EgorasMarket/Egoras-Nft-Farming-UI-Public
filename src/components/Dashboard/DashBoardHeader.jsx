import React, { useState, useEffect } from "react";
// import {
//   NotificationsNone,
//   Language,
//   Settings,
//   ThumbUpAltIcon,
// } from "@material-ui/icons";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";

import "../../css/dashboardheader.css";

const DashBoardHeader = () => {
  const [click, setClick] = useState("drop");

  const changeOnclick = () => {
    if (click === "drop") {
      setClick = () => "notdrop";
    }
  };

  return (
    <div>
      {/* header section  start*/}
      <section className="DashBoardHeaderSection">
        <div className="container-fluid">
          <div className="dashboard-area">
            <button className="logout-btn">
              Log out <ExitToAppIcon />
            </button>
          </div>
        </div>
      </section>
      {/* header section  end*/}
      {/* =================================================== */}
      {/* =================================================== */}
      {/* =================================================== */}
    </div>
  );
};

export default DashBoardHeader;
