import React from "react";
import { numberWithCommas } from "../../static";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const AdminDashboardCard = ({ title, value, detail, currencySymbol }) => {
  return (
    <div className="lending_area1_cont1">
      <div className="lending_area1_cont1_body_1">
        <div className="lending_area1_cont1_heading">{title}</div>
        <div className="lending_area1_cont1_body_txt">
          {numberWithCommas(parseInt(value).toFixed(2))}
          <span className="usd_sign">{currencySymbol}</span>
        </div>
      </div>
      <div className="lending_area1_cont1_body_1">
        <HelpOutlineIcon className="help_outline" />
        <div className="helper_txt_div">{detail}</div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
