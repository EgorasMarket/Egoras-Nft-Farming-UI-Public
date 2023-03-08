import React, { useState, useEffect, useContext } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { numberWithCommas } from "../../../static";

const AdminModifyMembership = () => {
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="lending_area1">
            <div className="lending_area1_cont1">
              <div className="lending_area1_cont1_body_1">
                <div className="lending_area1_cont1_heading">
                  Total Products uploaded for sale
                </div>
                <div className="lending_area1_cont1_body_txt">
                  {numberWithCommas(parseInt(lockedValue).toFixed(2))}{" "}
                  <span className="usd_sign">NGN</span>
                </div>
              </div>
              <div className="lending_area1_cont1_body_1">
                <HelpOutlineIcon className="help_outline" />
                <div className="helper_txt_div">
                  This is the total Engn funded to all assets in the lending
                  pool.
                </div>
              </div>
            </div>
            <div className="lending_area1_cont1">
              <div className="lending_area1_cont1_body_1">
                <div className="lending_area1_cont1_heading">
                  Total Products Approved
                </div>
                <div className="lending_area1_cont1_body_txt">
                  {numberWithCommas(parseInt(lockedValue / 570).toFixed(2))}{" "}
                  <span className="usd_sign">USD</span>
                </div>
              </div>
              <div className="lending_area1_cont1_body_1">
                <HelpOutlineIcon className="help_outline" />
                <div className="helper_txt_div">
                  This is the total Engn funded to all assets in the lending
                  pool.
                </div>
              </div>
            </div>

            <div className="lending_area1_cont1">
              <div className="lending_area1_cont1_body_1">
                <div className="lending_area1_cont1_heading">
                  Total Funding Capacity
                </div>
                <div className="lending_area1_cont1_body_txt">
                  {numberWithCommas(parseInt(totalLendingCapacity).toFixed(2))}{" "}
                  <span className="usd_sign">NGN</span>
                </div>
              </div>
              <div className="lending_area1_cont1_body_1">
                <HelpOutlineIcon className="help_outline" />
                <div className="helper_txt_div">
                  This is the total value of all the assets in the lending pool.
                </div>
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
        </div>
      </section>
    </div>
  );
};

export default AdminModifyMembership;
