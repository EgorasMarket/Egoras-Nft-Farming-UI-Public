import React, { useState, useEffect, useContext } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../AdminStyles/adminMemeberShip.css";
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
                  Total Subscribed Users
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
                  {" "}
                  Total Subscribed Monthly Users
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
                  Total Subscribed Semi-Annually Users
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
              <div className="lending_area1_cont1_body_1">
                <div className="lending_area1_cont1_heading">
                  Total Subscribed Annual Users
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
          </div>
          {/* =============== */}
          {/* =============== */}
          {/* =============== */}
          {/* =============== */}
          {/* =============== */}
          <div className="modifyMembershipFeeDiv">
            <div className="modifyMembershipFeeDiv_head">
              Modify Membership Fees
            </div>
            <div className="modifyMembershipFeeDiv_body">
              <div className="modifyMembershipFeeDiv_body_monthly">
                <div className="modifyMembershipFeeDiv_body_monthly_head">
                  Modify Monthly Plan
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_SubHead">
                  Current Plan ~ 0egc
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_input_div">
                  <div className="modifyMembershipFeeDiv_body_monthly_input_div_1">
                    <div className="modifyMembershipFeeDiv_body_monthly_input_div_1_head">
                      Amount
                    </div>
                    <input
                      type="number"
                      className="modifyMembershipFeeDiv_body_monthly_input_div_1_input"
                    />
                  </div>
                  <div className="modifyMembershipFeeDiv_body_monthly_btn_div">
                    <button className="modifyMembershipFeeDiv_body_monthly_btn_btn">
                      Modify Plan
                    </button>
                  </div>
                </div>
              </div>
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              <div className="modifyMembershipFeeDiv_body_monthly">
                <div className="modifyMembershipFeeDiv_body_monthly_head">
                  Modify Semi-Annually Plan
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_SubHead">
                  Current Plan ~ 0egc
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_input_div">
                  <div className="modifyMembershipFeeDiv_body_monthly_input_div_1">
                    <div className="modifyMembershipFeeDiv_body_monthly_input_div_1_head">
                      Amount
                    </div>
                    <input
                      type="number"
                      className="modifyMembershipFeeDiv_body_monthly_input_div_1_input"
                    />
                  </div>
                  <div className="modifyMembershipFeeDiv_body_monthly_btn_div">
                    <button className="modifyMembershipFeeDiv_body_monthly_btn_btn">
                      Modify Plan
                    </button>
                  </div>
                </div>
              </div>
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              <div className="modifyMembershipFeeDiv_body_monthly">
                <div className="modifyMembershipFeeDiv_body_monthly_head">
                  Modify Annual Plan
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_SubHead">
                  Current Plan ~ 0egc
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_input_div">
                  <div className="modifyMembershipFeeDiv_body_monthly_input_div_1">
                    <div className="modifyMembershipFeeDiv_body_monthly_input_div_1_head">
                      Amount
                    </div>
                    <input
                      type="number"
                      className="modifyMembershipFeeDiv_body_monthly_input_div_1_input"
                    />
                  </div>
                  <div className="modifyMembershipFeeDiv_body_monthly_btn_div">
                    <button className="modifyMembershipFeeDiv_body_monthly_btn_btn">
                      Modify Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminModifyMembership;
