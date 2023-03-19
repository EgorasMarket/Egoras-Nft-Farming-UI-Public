import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Step2Div = ({
  checkMonthBox,
  toggleSteps,
  checkedMonth,
  checkedYear,
  checkYearBox,
  toggleCheckAgree,
  checkAgree,
  fundDisable,
  checkedSemiAnnual,
  checkSemiAnnualBox,
  semiAnnualAmount,
  monthAmount,
  AnnualAmount,
  Subscribe,
}) => {
  return (
    <div className="selectPlanDiv">
      <div onClick={toggleSteps} className="selectPlanDiv_backButton">
        <ArrowBackIosIcon className="selectPlanDiv_backButton_icon" />
        Back
      </div>
      <div className="selectPlanDiv1">
        <div className="selectPlanDiv1_head">Select your Coop plan</div>
        <div className="selectPlanDiv1_sub_head">
          Goals and Objectives: Clearly define the goals and objectives of the
          project or team, and ensure the cooperative plan aligns with these
          objectives. Resources: Evaluate the resources available to the team,
          including time, manpower, and budget, and ensure the cooperative plan
          is feasible within these constraints.
        </div>
      </div>
      <div className="selectPlanDiv2">
        <div
          className={
            checkedMonth == true
              ? "selectPlanDiv2_area1_active"
              : "selectPlanDiv2_area1"
          }
          onClick={checkMonthBox}
        >
          <div className="selectPlanDiv2_area1_cont1">
            <input
              type="radio"
              id="radio-1"
              name="radio"
              checked={checkedMonth}
              onChange={checkMonthBox}
            />
            <label
              className="selectPlanDiv2_area1_cont1_label"
              for="radio-1"
            ></label>
          </div>

          <div className="selectPlanDiv2_area1_cont2">
            <div className="selectPlanDiv2_area1_cont2_head">
              <div className="selectPlanDiv2_area1_cont2_head_txt">Monthly</div>
              <div className="selectPlanDiv2_area1_cont2_head_price">
                {monthAmount}
                {""}
                <span className="selectPlanDiv2_area1_cont2_head_price_span">
                  egc / mnth
                </span>{" "}
              </div>
            </div>
            <div className="selectPlanDiv2_area1_cont2_body">
              For the new marketer on a budget who just wants basic tracking
            </div>
          </div>
        </div>
        <div
          className={
            checkedSemiAnnual == true
              ? "selectPlanDiv2_area1_active"
              : "selectPlanDiv2_area1"
          }
          onClick={checkSemiAnnualBox}
        >
          <div className="selectPlanDiv2_area1_cont1">
            <input
              type="radio"
              id="radio-1"
              name="radio"
              checked={checkedSemiAnnual}
              onChange={checkSemiAnnualBox}
            />
            <label
              className="selectPlanDiv2_area1_cont1_label"
              for="radio-1"
            ></label>
          </div>

          <div className="selectPlanDiv2_area1_cont2">
            <div className="selectPlanDiv2_area1_cont2_head">
              <div className="selectPlanDiv2_area1_cont2_head_txt">
                Semi-Annually
              </div>
              <div className="selectPlanDiv2_area1_cont2_head_price">
                {semiAnnualAmount}
                {""}
                <span className="selectPlanDiv2_area1_cont2_head_price_span">
                  egc / 6mnths
                </span>
              </div>
            </div>
            <div className="selectPlanDiv2_area1_cont2_body">
              For the new marketer on a budget who just wants basic tracking
            </div>
          </div>
        </div>
        <div
          className={
            checkedYear == true
              ? "selectPlanDiv2_area1_active"
              : "selectPlanDiv2_area1"
          }
          onClick={checkYearBox}
        >
          <div className="selectPlanDiv2_area1_cont1">
            <input
              type="radio"
              id="radio-2"
              name="radio"
              checked={checkedYear}
              onChange={checkYearBox}
            />
            <label
              className="selectPlanDiv2_area1_cont1_label"
              for="radio-2"
            ></label>
          </div>
          <div className="selectPlanDiv2_area1_cont2">
            <div className="selectPlanDiv2_area1_cont2_head">
              <div className="selectPlanDiv2_area1_cont2_head_txt">
                Annually
              </div>
              <div className="selectPlanDiv2_area1_cont2_head_price">
                {AnnualAmount}
                {""}
                <span className="selectPlanDiv2_area1_cont2_head_price_span">
                  egc / yr
                </span>
              </div>
            </div>
            <div className="selectPlanDiv2_area1_cont2_body">
              For the new marketer on a budget who just wants basic tracking
            </div>
          </div>
        </div>
        <div className="checkBox_agree_div">
          <div className="checkBox_agree_div_txt">
            By checking the checkbox below, you agree to our{" "}
            <a href="#">Terms of Use, Privacy Statement</a> and that you are
            over 18.
          </div>
          <div className="checkBox_agree_div_body">
            <input
              type="checkbox"
              id="checkbox-1"
              name="checkbox"
              checked={checkAgree}
              onChange={toggleCheckAgree}
            />
            <label for="checkbox-1" className="checkBox_agree_div_body_label">
              <div className="checkBox_agree_div_body_txt">I agree</div>
            </label>
          </div>
        </div>
        <button
          className="selectPlanDiv2_area1_checkout_btn"
          // disabled={fundDisable}
          onClick={Subscribe}
        >
          <span> Subscribe </span>
        </button>
      </div>
    </div>
  );
};
