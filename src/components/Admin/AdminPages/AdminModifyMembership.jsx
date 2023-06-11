import React, { useState, useEffect, useContext } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../AdminStyles/adminMemeberShip.css";
import { numberWithCommas } from "../../../static";
import { parseEther, formatEther, parseUnits } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import Web3 from "web3";
import { configurePlan } from "../../../web3";
const { REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS } = process.env;
const AdminModifyMembership = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);
  const [monthlyPlan, setMonthlyPlan] = useState("");
  const [semiAnnuallyPlan, setSemiAnnuallyPlan] = useState("");
  const [AnnuallyPlan, setAnnuallyPlan] = useState("");

  // const egcAddress = "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19";
  // const eusdAddress = "0x58f66d0183615797940360a43c333a44215830ba";
  console.log(REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS);
  const monthlyPlanChange = (e) => {
    setMonthlyPlan(e.target.value);
    console.log(e.target.value);
  };
  const semiAnnuallyPlanChange = (e) => {
    setSemiAnnuallyPlan(e.target.value);
    console.log(e.target.value);
  };
  const AnnuallyPlanChange = (e) => {
    setAnnuallyPlan(e.target.value);
    console.log(e.target.value);
  };
  const ConfigureMembershipPlan = async () => {
    const res = await configurePlan(
      parseEther(monthlyPlan.toString(), "wei").toString(),
      parseEther(semiAnnuallyPlan.toString(), "wei").toString(),
      parseEther(AnnuallyPlan.toString(), "wei").toString(),
      REACT_APP_EGC_ADDRESS,
      REACT_APP_EUSD_ADDRESS,
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
  };
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
                  Current Plan ~ MGPTT
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_input_div">
                  <div className="modifyMembershipFeeDiv_body_monthly_input_div_1">
                    <div className="modifyMembershipFeeDiv_body_monthly_input_div_1_head">
                      Amount
                    </div>
                    <input
                      type="number"
                      value={monthlyPlan}
                      onChange={monthlyPlanChange}
                      className="modifyMembershipFeeDiv_body_monthly_input_div_1_input"
                    />
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
                  Current Plan ~ MGPTT
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_input_div">
                  <div className="modifyMembershipFeeDiv_body_monthly_input_div_1">
                    <div className="modifyMembershipFeeDiv_body_monthly_input_div_1_head">
                      Amount
                    </div>
                    <input
                      type="number"
                      value={semiAnnuallyPlan}
                      onChange={semiAnnuallyPlanChange}
                      className="modifyMembershipFeeDiv_body_monthly_input_div_1_input"
                    />
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
                  Current Plan ~ MGPTT
                </div>
                <div className="modifyMembershipFeeDiv_body_monthly_input_div">
                  <div className="modifyMembershipFeeDiv_body_monthly_input_div_1">
                    <div className="modifyMembershipFeeDiv_body_monthly_input_div_1_head">
                      Amount
                    </div>
                    <input
                      value={AnnuallyPlan}
                      onChange={AnnuallyPlanChange}
                      type="number"
                      className="modifyMembershipFeeDiv_body_monthly_input_div_1_input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modifyMembershipFeeDiv_body_monthly_btn_div">
              <button
                className="modifyMembershipFeeDiv_body_monthly_btn_btn"
                onClick={ConfigureMembershipPlan}
              >
                Modify Plans
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminModifyMembership;
