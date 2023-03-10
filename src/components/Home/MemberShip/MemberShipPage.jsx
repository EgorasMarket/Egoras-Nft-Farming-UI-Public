import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./membership.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "../../../actions/Config";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Step1Div } from "./SubSteps/Step1Div";
import { Step2Div } from "./SubSteps/Step2Div";
const MemberShipPage = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [subScription, setSubScription] = useState("inactive");
  const [fundSuccess, setFundSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fundDisable, setFundDisable] = useState(false);
  const [fundError, setFundError] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [checkedMonth, setCheckedMonth] = useState(false);
  const [checkedSemiAnnual, setcheckedSemiAnnual] = useState(false);
  const [checkedYear, setCheckedYear] = useState(false);
  const [checkAgree, setCheckAgree] = useState(false);
  const [monthAmount, setMonthAmount] = useState(0);
  const [semiAnnualAmount, setsemiAnnualAmount] = useState(0);
  const [AnnualAmount, setAnnualAmount] = useState(0);
  const checkMonthBox = () => {
    setCheckedMonth(true);
    setcheckedSemiAnnual(false);
    setCheckedYear(false);
  };
  const checkSemiAnnualBox = () => {
    setCheckedMonth(false);
    setcheckedSemiAnnual(true);
    setCheckedYear(false);
  };
  const checkYearBox = () => {
    setCheckedYear(true);
    setcheckedSemiAnnual(false);
    setCheckedMonth(false);
  };
  const toggleCheckAgree = () => {
    setCheckAgree(!checkAgree);
  };

  const toggleSteps = () => {
    setStep1(!step1);
    setStep2(!step2);
  };

  return (
    <section className="joinCooperativeDiv">
      <img
        src="/img/contourLinesLight.svg"
        alt=""
        className="joinCooperativeDiv_lines"
      />
      <div className="container">
        <div className="joinCooperativeModalDiv_area">
          <div
            className={`joinCooperativeModalDiv_area1 ${step1 ? "show2" : ""}`}
          >
            <Step1Div toggleSteps={toggleSteps} />
          </div>
          {/* {step2 == true ? ( */}
          <div
            className={`joinCooperativeModalDiv_area1 ${step2 ? "show2" : ""}`}
          >
            <Step2Div
              checkMonthBox={checkMonthBox}
              checkSemiAnnualBox={checkSemiAnnualBox}
              toggleSteps={toggleSteps}
              checkedMonth={checkedMonth}
              checkedSemiAnnual={checkedSemiAnnual}
              checkedYear={checkedYear}
              checkYearBox={checkYearBox}
              checkAgree={checkAgree}
              toggleCheckAgree={toggleCheckAgree}
              isLoading3={isLoading3}
              faSpinner={faSpinner}
              fundDisable={fundDisable}
              semiAnnualAmount={semiAnnualAmount}
              monthAmount={monthAmount}
              AnnualAmount={AnnualAmount}
            />
          </div>
          {/* ) : null} */}
        </div>
      </div>
    </section>
  );
};
// const mapStateToProps1 = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
// });
export default MemberShipPage;
// export default connect(mapStateToProps1)(EgorasPricingPage);
