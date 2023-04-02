import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { connect } from "react-redux";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./membership.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { parseEther, formatEther, parseUnits } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
// const { REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS } = process.env;
import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "../../../actions/Config";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Step1Div } from "./SubSteps/Step1Div";
import { Step2Div } from "./SubSteps/Step2Div";
import UpdatedErrorModal from "../../Dashboard/DashBoardPages/UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "../../Dashboard/DashBoardPages/UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedSuccessModal";
import {
  getConfiguration,
  unlockMemberShipEgcToken,
  checkAllowanceMembership,
  transactReceipt,
} from "../../../web3/index";
import {
  monthlyPlanSubScribe,
  semiAnnuallyPlanSubScribe,
  annuallyPlanSubScribe,
} from "../../../web3/index2.js";
const MemberShipPage = () => {
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
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [subScription, setSubScription] = useState("inactive");
  const [fundSuccess, setFundSuccess] = useState(false);

  const [fundDisable, setFundDisable] = useState(false);
  const [fundError, setFundError] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [checkedMonth, setCheckedMonth] = useState(false);
  const [checkedSemiAnnual, setcheckedSemiAnnual] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const [checkedYear, setCheckedYear] = useState(false);
  const [checkAgree, setCheckAgree] = useState(false);
  const [monthAmount, setMonthAmount] = useState("0");
  const [semiAnnualAmount, setSemiAnnualAmount] = useState("0");
  const [AnnualAmount, setAnnualAmount] = useState("0");
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [text, setText] = useState(
    "Transacting with blockchain, please wait..."
  );
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
  useEffect(async (e) => {
    let response = await getConfiguration(library.getSigner());
    console.log(response);
    console.log(formatEther(response.message._annually._hex));
    console.log(formatEther(response.message._semiAnnually._hex));
    console.log(formatEther(response.message._monthly._hex));
    if (response.status === true) {
      const resMonthlyAmount = parseFloat(
        formatEther(response.message._monthly._hex)
      );
      const resSemi_MonthlyAmount = parseFloat(
        formatEther(response.message._semiAnnually._hex)
      );
      const resAnnualAmount = parseFloat(
        formatEther(response.message._annually._hex)
      );
      setMonthAmount(resMonthlyAmount);
      setSemiAnnualAmount(resSemi_MonthlyAmount);
      setAnnualAmount(resAnnualAmount);
    }
  });
  useEffect(() => {
    if (account) {
      setUserConnected(true);
    } else {
      setUserConnected(false);
    }
  }, [account]);

  const UnlockToken = async (e) => {
    setIsLoading(true);
    setDisable(true);
    let ret = await unlockMemberShipEgcToken(
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status == true) {
      setIsLoading(false);
      setDisable(false);
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setUnlockBtn(true);
    } else {
      if (ret.message.code == 4001) {
        console.log(ret);
      }
      console.log(ret);
      setErrorModal(true);
      setErrorMessage(ret.message);
      setIsLoading(false);
      setDisable(false);
    }
  };
  // setInterval(() => {
  //   if (localStorage.getItem("unlocking") == "true") {
  //     transactReceipt(localStorage.getItem("unlockingHash"), library).then(
  //       function (env) {
  //         console.log("running Interval", env);
  //         if (env.status == true && env.message !== null) {
  //           if (env.message.confirmations > 2) {
  //             // setStage("success");
  //             // setHash(localStorage.getItem("unlockingHash"));
  //             // setIsLoading(false);

  //             localStorage.setItem("unlocking", false);
  //           }
  //         }
  //       }
  //     );
  //   } else {
  //     // setStage("error");
  //   }
  // }, 1000);
  useEffect(
    async (e) => {
      if (account) {
        let check = await checkAllowanceMembership(
          account,
          parseEther(monthAmount.toString(), "wei").toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },
    [account, unLockCheckStatus, unlockBtn]
  );
  const subscribe = async () => {
    setIsLoading(true);
    setDisable(true);
    let res = await monthlyPlanSubScribe(library.getSigner());
    console.log(res);
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage("You've successfully Subscribed for 1 month");
    } else {
      if (res.message.code == 4001) {
        console.log(res);
      }
      console.log(res);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };
  const subscribe2 = async () => {
    setIsLoading(true);
    setDisable(true);
    let res = await semiAnnuallyPlanSubScribe(library.getSigner());
    console.log(res);
    if (res.status == true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage("You've successfully Subscribed for 6 months");
    } else {
      if (res.message.code == 4001) {
        console.log(res);
      }
      console.log(res);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };
  const subscribe3 = async () => {
    setIsLoading(true);
    setDisable(true);
    let res = await annuallyPlanSubScribe(library.getSigner());
    console.log(res);
    if (res.status == true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage("You've successfully Subscribed for 1 year");
    } else {
      if (res.message.code == 4001) {
        console.log(res);
      }
      console.log(res);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };
  const CloseSuccessModal = () => {
    setSuccessModal(false);
  };
  const CloseErrorModal = () => {
    setErrorModal(false);
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
              Subscribe={subscribe}
              Subscribe2={subscribe2}
              Subscribe3={subscribe3}
              unlockBtn={unlockBtn}
              UnlockToken={UnlockToken}
              account={userConnected}
              disable={Disable}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {errorModal ? (
        <UpdatedErrorModal
          errorMessage={errorMessage}
          closeModal={CloseErrorModal}
        />
      ) : null}
      {successModal ? (
        <UpdatedSuccessModal
          btnRoute={true}
          successMessage={successMessage}
          route="/app"
        />
      ) : null}
    </section>
  );
};
// const mapStateToProps1 = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
// });
export default MemberShipPage;
// export default connect(mapStateToProps1)(EgorasPricingPage);
