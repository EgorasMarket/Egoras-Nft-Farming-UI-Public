import React, { useState, useEffect, useRef, useContext } from "react";
// import { createBlockies } from "ethereum-blockies";
import { API_URL } from "../../../../actions/types";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { Connect } from "react-redux";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import "./UpdatedAppPagesStyles/StakingUpdate.css";
import Blockies from "react-blockies";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Nodata from "../nodataComponent/Nodata";
import { config } from "../../../../actions/Config";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedSuccessModal from "./UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "./UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedWarningModal from "./UpdatedSuccessErrorModals/UpdatedWarningModal";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import Timer from "../Timer";
import Web3 from "web3";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  annually,
  monthly,
  tokenBalance,
  takeRoyalty,
  checkAllowanceV3,
  unlockTokenV3,
} from "../../../../web3/index";
import {
  getEGCEUSDTICKERPRICE,
  getRoyaltyStats,
  stakeConfig,
  getCalculatedRoyalty,
  UnlockLockedStake,
} from "../../../../web3/index2";
import { getDate, getMonth } from "date-fns";
import {
  POPULATE_STAKE_INFO,
  POPULATE_STAKE_GENERAL_INFO,
} from "../../../../services/stakeServices";
import { socket } from "../../../../socket";
import { numberWithCommas } from "../../../../static";

export const DurationDiv = ({ addMonthly, addYearly, SelectedDuration }) => {
  return (
    <div className="duration_dropDown_div">
      <div
        className={
          SelectedDuration === "monthly"
            ? "duration_dropDown_div_cont1_selected"
            : "duration_dropDown_div_cont1"
        }
        onClick={addMonthly}
      >
        Monthly (1 month)
      </div>

      <div
        className={
          SelectedDuration === "yearly"
            ? "duration_dropDown_div_cont1_selected"
            : "duration_dropDown_div_cont1"
        }
        onClick={addYearly}
      >
        Annually (1 year)
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const { REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS } = process.env;

const StakingUpdate = () => {
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
  const [durationDrop, setDurationDrop] = useState(false);
  const [Duration, setDuration] = useState(null);
  const [SelectedDuration, setSelectedDuration] = useState("");
  const [estimatedRewardDiv, setEstimatedRewardDiv] = useState(false);
  const [baseBalance, setBaseBalance] = useState(0.0);
  const [coinBalance2, setCoinBalance2] = React.useState(0.0);
  const [base, setBase] = useState("");
  const [asset, setAsset] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lockDate, setLockDate] = useState(null);
  const [activeTab, setActiveTab] = useState("lock");
  const [estimatedRewardAmnt, setEstimatedRewardAmnt] = useState(0.0);
  const [tokenBal, setTokenBal] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [ClaimDisable, setClaimDisable] = useState(true);
  const [lockDisable, setLockDisable] = useState(false);
  const [LockedTransactions, setLockedTransactions] = useState([]);
  const [UniqueLockedTransactions, setUniqueLockedTransactions] = useState([]);
  const [egcUsdVal, setEgcUsdVal] = useState(0);
  const [graphData2, setGraphData2] = useState([]);
  const [availableClaimReward, setAvailableClaimReward] = useState("0.00");
  const [nextRewardTakeTime, setNextRewardTakeTime] = useState("");
  const [unlockStakeTime, setUnlockStakeTime] = useState("");
  const [unlockStakeDuration, setUnlockStakeDuration] = useState("");
  const [TotalClaimedReward, setTotalClaimedReward] = useState("0.00");
  const [dailyReward, setDailyReward] = useState("0.00");
  const [myTotalStaked, setMyTotalStaked] = useState("0.00");
  const [rewardCountDown, setRewardCountDown] = useState(false);
  const [notDueButton, setNotDueButton] = useState(false);
  const [notDueDiv, setNotDueDiv] = useState(false);

  const [myAssetInfo, setMyAssetInfo] = useState({});
  const [totalAssetInfo, setTotalAssetInfo] = useState({
    amount: 0,
    dailyRoyalty: 0,
  });
  const [txHash, setTxHash] = useState("");
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const toggleDurationDrop = () => {
    setDurationDrop(!durationDrop);
  };

  const addMonthly = () => {
    const currentDate = new Date();
    // get current date
    currentDate.setMonth(currentDate.getMonth() + 1); // add one month
    const month = currentDate.getMonth() + 1; // get the month (0-based index)
    const day = currentDate.getDate(); // get the day of the month
    const year = currentDate.getFullYear().toString().slice(-2); // get the year (last two digits)

    // pad month and day with a leading zero if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    // setLockDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    const dateString = currentDate;
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDateString = date.toLocaleDateString("en-US", options);
    setLockDate(formattedDateString);
    console.log(formattedDate); // Output: Mon Mar 20 2023
    console.log(formattedDateString); // output: e.g. "03/20/23" for current date of Feb 20, 2023
    console.log(currentDate); // output: e.g. "03/20/23" for current date of Feb 20, 2023
    setDuration(formattedDate);
    setDurationDrop(!durationDrop);
    setSelectedDuration("monthly");
  };

  const addSemiMonthly = () => {
    const currentDate = new Date();
    // get current date
    currentDate.setMonth(currentDate.getMonth() + 6); // add one month
    const month = currentDate.getMonth() + 1; // get the month (0-based index)
    const day = currentDate.getDate(); // get the day of the month
    const year = currentDate.getFullYear().toString().slice(-2); // get the year (last two digits)

    // pad month and day with a leading zero if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const dateString = currentDate;
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDateString = date.toLocaleDateString("en-US", options);
    setLockDate(formattedDateString);
    console.log(formattedDate); // output: e.g. "03/20/23" for current date of Feb 20, 2023
    // setLockDate(new Date(currentDate.setMonth(currentDate.getMonth() + 6)));
    setDuration(formattedDate);
    setDurationDrop(!durationDrop);
    setSelectedDuration("semi_monthly");
  };

  const addYearly = () => {
    const currentDate = new Date(); // get current date
    currentDate.setFullYear(currentDate.getFullYear() + 1); // add one year
    const month = currentDate.getMonth() + 1; // get the month (0-based index)
    const day = currentDate.getDate(); // get the day of the month
    const year = currentDate.getFullYear().toString().slice(-2); // get the year (last two digits)

    // pad month and day with a leading zero if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    // setLockDate(
    //   new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
    // );
    const dateString = currentDate;
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDateString = date.toLocaleDateString("en-US", options);
    setLockDate(formattedDateString);
    console.log(formattedDate);
    setDuration(formattedDate);
    setDurationDrop(!durationDrop);
    setSelectedDuration("yearly");
  };

  useEffect(
    async (e) => {
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          console.log(egc_usd_val);
          setEgcUsdVal(() => egc_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [egcUsdVal]
  );

  const AmountChange = (e) => {
    setLockAmount(e.target.value);
    console.log(e.target.value);
    if (e.target.value < 0) {
      setEstimatedRewardDiv(false);
    } else {
      setEstimatedRewardDiv(true);
    }
    setEstimatedRewardAmnt(parseFloat(e.target.value) * egcUsdVal * 0.00082192);
    console.log(parseFloat(e.target.value) * egcUsdVal * 0.00082192);
  };

  const StakeMonthly = async () => {
    setIsLoading(true);
    setDisable(true);
    const res = await monthly(
      parseEther(lockAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage(
        "You've successfully Locked" + lockAmount + " egc for 1 month"
      );
      setTxHash(res.message.hash);
    } else {
      console.log(res);
      console.log(res.message);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };

  const StakeYearly = async () => {
    setIsLoading(true);
    setDisable(true);
    const res = await annually(
      parseEther(lockAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully Locked" + lockAmount + " egc for 1 year"
      );
    } else {
      console.log(res);
      console.log(res.message);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };

  const UnlockStake = async () => {
    setIsLoading2(true);
    setLockDisable(true);
    setNotDueDiv(!notDueDiv);
    const res = await UnlockLockedStake(library.getSigner());
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status === true) {
      setIsLoading2(false);
      setLockDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully unlocked " +
          parseFloat(myTotalStaked).toFixed(2) +
          " egc"
      );
    } else {
      console.log(res);
      console.log(res.message);
      setIsLoading2(false);
      setLockDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };

  const TakeReward = async () => {
    setIsLoading2(true);
    setClaimDisable(true);
    const res = await takeRoyalty(library.getSigner());
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status === true) {
      setIsLoading2(false);
      setClaimDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully claimed " +
          parseFloat(availableClaimReward).toFixed(2) +
          " EGAX"
      );
    } else {
      console.log(res);
      console.log(res.message);
      setIsLoading2(false);
      setClaimDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };

  const toggleLockTabs = (e) => {
    let target = e.currentTarget.id;
    setActiveTab(target);
  };

  const CloseSuccessModal = () => {
    setSuccessModal(false);
  };

  const CloseErrorModal = () => {
    setErrorModal(false);
  };

  useEffect(async () => {
    await axios
      .get(API_URL + "/staking/all", null, config)
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        setLockedTransactions(data.data.data);

        const temp = data.data.data;
        for (const data of temp) {
          data.amount = Number(parseInt(data.amount).toFixed(2));
          const date = new Date(data.time);
          const day = date.getUTCDate().toString().padStart(2, "0");
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
          const year = date.getUTCFullYear();
          const formattedDated = `${day}/${month}/${year}`;
          data.time = formattedDated;
        }
        setGraphData2(() => temp);
        const array = temp.map((data) => {
          return parseInt(data.amount);
        });
        console.log(array, "higi");
      })
      .catch((error) => {
        console.log(error.response);
      });

    socket.connect();
    socket.on("staking", (stakings) => {
      // alert(JSON.stringify(stakings));
    });
  }, []);

  useEffect(async () => {
    if (account) {
      await axios
        .get(API_URL + "/staking/user/" + account, null, config)
        .then((data) => {
          console.log(data);
          console.log(data.data.data);
          setUniqueLockedTransactions(data.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [account]);

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          REACT_APP_EGC_ADDRESS,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setCoinBalance2(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account]
  );

  const maxAmount = () => {
    setLockAmount(coinBalance2);
    setEstimatedRewardAmnt(parseFloat(coinBalance2) * egcUsdVal * 0.00082192);
    console.log("====================================");
    console.log(parseFloat(coinBalance2) * egcUsdVal * 0.00082192);
    console.log("====================================");
    setEstimatedRewardDiv(true);
  };

  const fetchData2 = async () => {
    const response = await POPULATE_STAKE_INFO(account);
    // console.log(response, "oyibo");
    if (response.success === true) {
      console.log(response.data.user, "oyibo");
      setMyAssetInfo(response.data.user);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await POPULATE_STAKE_INFO(account);
      // console.log(response, "oyibo");
      if (response.success === true) {
        console.log(response.data.user, "oyibo");
        // setTotalAssetInfo(response.data.general);
        setMyAssetInfo(response.data.user);
      }
    };
    fetchData();
    if (account) {
      fetchData2();
    }
  }, [account]);

  useEffect(async () => {
    if (account) {
      const res = await getEGCEUSDTICKERPRICE("egceusd", library.getSigner());
      console.log(res);
      // console.log(res);

      console.log(formatEther(res.message.toString()));
    }
  }, [account]);

  useEffect(async () => {
    if (account) {
      const res = await getRoyaltyStats(account, library.getSigner());
      console.log(res);
      console.log(res.message._dailyRoyalty.toString());
      console.log(formatEther(res.message._dailyRoyalty).toString());
      console.log(formatEther(res.message._totalRoyaltyTaken).toString());
      setDailyReward(formatEther(res.message._dailyRoyalty).toString());
      setTotalClaimedReward(
        formatEther(res.message._totalRoyaltyTaken).toString()
      );
      setMyTotalStaked(formatEther(res.message._totalStake).toString());
      let formatted = res.message._nextRoyaltyTakePeriod.toString();
      let formatted2 = res.message._lockPeriod.toString();
      const endDate2 = formatted2;

      const endDate = formatted;
      const newRewardDate = new Date(endDate * 1000);
      const newRewardDate2 = new Date(endDate2 * 1000);
      console.log(newRewardDate2);
      console.log(newRewardDate);
      const date = newRewardDate2;
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = date.getUTCFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      console.log(formattedDate);
      setUnlockStakeDuration(formattedDate);
      setNextRewardTakeTime(newRewardDate);
      setUnlockStakeTime(newRewardDate2);
      if (newRewardDate <= new Date() && myTotalStaked !== "0.0") {
        setClaimDisable(false);
        setRewardCountDown(false);
      } else {
        setClaimDisable(true);
        setRewardCountDown(true);
      }
      if (myTotalStaked === "0.0") {
        // setClaimDisable(true);
        setLockDisable(true);
      } else {
        // setClaimDisable(false);
        setLockDisable(false);
      }
    }
    console.log(myTotalStaked);
  }, [account, myTotalStaked]);

  useEffect(async () => {
    if (account) {
      const res = await stakeConfig(library.getSigner());
      console.log(res);
      console.log(res.message._egcusd.toString());
    }
  }, [account]);

  useEffect(async () => {
    if (account) {
      const res = await getCalculatedRoyalty(account, library.getSigner());
      console.log(res);
      console.log(formatEther(res.message).toString());
      setAvailableClaimReward(formatEther(res.message).toString());
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      console.log(availableClaimReward);
      console.log(nextRewardTakeTime);
      if (availableClaimReward === "0.00" || nextRewardTakeTime === "") {
        setClaimDisable(true);
        console.log(availableClaimReward);
      }
    }
  }, [account, availableClaimReward, nextRewardTakeTime]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await POPULATE_STAKE_GENERAL_INFO();
      // console.log(response, "oyibo");
      if (response.success === true) {
        console.log(response.data.user, "oyibo");
        console.log(response.data);
        if (response.data.amount === null) {
          return;
        }
        setTotalAssetInfo({
          amount: response.data.amount,
          dailyRoyalty: response.data.dailyRoyalty,
        });
        return;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(unlockStakeTime);
    console.log("====================================");
    if (unlockStakeTime > new Date()) {
      console.log("its not yet due");
      setNotDueButton(true);
    } else {
      setNotDueButton(false);
    }
  }, [unlockStakeTime]);

  const toggleNotDueDiv = () => {
    setNotDueDiv(!notDueDiv);
  };

  const UnlockToken = async (e) => {
    setIsLoading(true);
    setDisable(true);
    console.log("====================================");
    console.log(REACT_APP_EGC_ADDRESS);
    console.log("====================================");
    let ret = await unlockTokenV3(
      REACT_APP_EGC_ADDRESS,
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status === true) {
      setIsLoading(false);
      setDisable(false);
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setUnlockBtn(true);
    } else {
      if (ret.message.code === 4001) {
        console.log(ret);
      }
      console.log(ret);
      setErrorModal(true);
      setErrorMessage(ret.message);
      setIsLoading(false);
      setDisable(false);
    }
  };
  useEffect(
    async (e) => {
      if (account) {
        let check = await checkAllowanceV3(
          REACT_APP_EGC_ADDRESS,
          account,
          parseEther(lockAmount.toString(), "wei").toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },

    [account, unLockCheckStatus, unlockBtn, lockAmount]
  );
  const classes = useStyles();

  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="lock_container">
            <div className="lock_container_cont1">
              <div className="lock_container_cont1_div_contract_overview_div">
                <div className="lock_container_cont1_div_contract_overview_div_head">
                  Contracts
                </div>
                <div className="lock_container_cont1_div_contract_overview_body">
                  <div className="lock_container_cont1_div_contract_overview_body_div1">
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1">
                      egc
                    </div>
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1_link">
                      {`${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        0,
                        6
                      )}...${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        39,
                        42
                      )}`}
                      <OpenInNewIcon className="tx_hash_link_icon" />
                    </div>
                  </div>
                  <div className="lock_container_cont1_div_contract_overview_body_div1">
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1">
                      EGAX
                    </div>
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1_link">
                      {`${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        0,
                        6
                      )}...${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        39,
                        42
                      )}`}
                      <OpenInNewIcon className="tx_hash_link_icon" />
                    </div>
                  </div>
                  <div className="lock_container_cont1_div_contract_overview_body_div1_last">
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1">
                      ENGN
                    </div>
                    <div className="lock_container_cont1_div_contract_overview_body_div1_cont1_link">
                      {`${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        0,
                        6
                      )}...${"0x0C30476f66034E11782938DF8e4384970B6c9e8a".slice(
                        39,
                        42
                      )}`}
                      <OpenInNewIcon className="tx_hash_link_icon" />
                    </div>
                  </div>
                </div>
              </div>
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              <div className="lock_container_transactions">
                <div className="lock_container_transactions_head">
                  My Transactions
                </div>
                <div className="lock_container_transactions_body">
                  <table className="stakingTable_table">
                    <thead className="stakingTable_titles">
                      <tr className="stakingTable_title_div">
                        <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                          Action
                        </th>
                        <th className="stakingTable_heading_titles">Amount</th>
                        {/* <th className="stakingTable_heading_titles">Address</th> */}

                        <th className="stakingTable_heading_titles stakingTable_heading_titles_last">
                          Txn Hash
                        </th>
                      </tr>
                    </thead>

                    {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================
              </div> */}
                    {UniqueLockedTransactions.length <= 0 ? (
                      <div className="no_loans_div">
                        <div className="no_loans_div_cont">
                          <Nodata />
                          No Transaction Yet.
                        </div>{" "}
                      </div>
                    ) : (
                      <tbody
                        className="stakingTable_body"
                        id="popular-categories"
                      >
                        {" "}
                        {/* =============== */}
                        {/* =============== */}
                        {/* =============== */}
                        {UniqueLockedTransactions.slice()
                          .reverse()
                          .map((data) => {
                            const date = new Date(data.time);
                            const day = date
                              .getUTCDate()
                              .toString()
                              .padStart(2, "0");
                            const month = (date.getUTCMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const year = date.getUTCFullYear();
                            const formattedDate = `${day}/${month}/${year}`;
                            console.log(formattedDate);
                            return (
                              <tr className="stakingTable_body_row ">
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                                  <div className="value_dolls_div">
                                    {data.status === "STAKE"
                                      ? "Create Lock"
                                      : data.status === "UNSTAKE"
                                      ? "Unlock"
                                      : null}
                                    <div className="value_dolls_div_val">
                                      {formattedDate}
                                      {/* {data.time} */}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.status === "STAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(data.amount).toFixed(2)
                                        )}{" "}
                                        egc
                                      </span>
                                    ) : data.status === "UNSTAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(
                                            data.unstake_amount
                                          ).toFixed(2)
                                        )}{" "}
                                        egc
                                      </span>
                                    ) : null}
                                  </div>
                                </td>

                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                    63,
                                    66
                                  )}`}
                                  <OpenInNewIcon className="tx_hash_link_icon" />
                                </td>
                              </tr>
                            );
                          })}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>

              {/* ======= */}
              {/* ======= */}
              {/* ======= */}
              <div className="lock_container_cont1_div_locks_overview">
                <div className="lock_container_cont1_div_locks_overview_cont1">
                  <div className="lock_container_cont1_div_locks_overview_cont1_head">
                    My Locked egc
                  </div>
                  <div className="lock_container_cont1_div_locks_overview_cont1_body">
                    {/* populate with real data */}
                    <span>
                      {numberWithCommas(parseFloat(myTotalStaked).toFixed(2))}{" "}
                      egc{" "}
                    </span>
                    {/* <span style={{ fontSize: "10px" }}></span> */}
                  </div>
                </div>
                <div className="lock_container_cont1_div_locks_overview_cont1">
                  <div className="lock_container_cont1_div_locks_overview_cont1_head">
                    Daily Rewards
                  </div>
                  <div className="lock_container_cont1_div_locks_overview_cont1_body">
                    <span>
                      {numberWithCommas(parseFloat(dailyReward).toFixed(4))}{" "}
                      EGAX / per day
                    </span>
                  </div>
                </div>
                <div
                  className="lock_container_cont1_div_locks_overview_cont1"
                  style={{ border: "none", padding: "0", margin: "0" }}
                >
                  <div className="lock_container_cont1_div_locks_overview_cont1_head">
                    Claimed Rewards
                  </div>
                  <div className="lock_container_cont1_div_locks_overview_cont1_body">
                    <span>
                      {numberWithCommas(
                        parseFloat(TotalClaimedReward).toFixed(4)
                      )}{" "}
                      EGAX
                    </span>
                  </div>
                </div>
              </div>
              {/* ======= */}
              {/* ======= */}
              {/* ======= */}
              <div className="lock_container_cont1_div1_lock_div">
                <div className="lock_container_cont1_div1_lock_div_tabs">
                  <div
                    id="lock"
                    className={
                      activeTab === "lock"
                        ? "lock_container_cont1_div1_lock_div_tab1_active"
                        : "lock_container_cont1_div1_lock_div_tab1"
                    }
                    onClick={toggleLockTabs}
                  >
                    Lock
                  </div>
                  <div
                    id="claim"
                    className={
                      activeTab === "claim"
                        ? "lock_container_cont1_div1_lock_div_tab1_active"
                        : "lock_container_cont1_div1_lock_div_tab1"
                    }
                    onClick={toggleLockTabs}
                  >
                    Claim
                  </div>
                  <div
                    id="unlock"
                    className={
                      activeTab === "unlock"
                        ? "lock_container_cont1_div1_lock_div_tab1_active"
                        : "lock_container_cont1_div1_lock_div_tab1"
                    }
                    onClick={toggleLockTabs}
                  >
                    Unlock
                  </div>
                </div>
                {/* ======= */}
                {/* ======= */}
                {/* ======= */}
                {activeTab === "lock" ? (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_input_body">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_head">
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span1">
                          Amount
                        </span>
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span2">
                          Balance:{parseFloat(coinBalance2).toFixed(3)}
                        </span>
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont">
                        <input
                          type="number"
                          value={lockAmount}
                          placeholder="0.00"
                          onChange={AmountChange}
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_input"
                        />
                        <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_amount_div">
                          <button
                            className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_amount_div1_btn"
                            onClick={maxAmount}
                          >
                            MAX
                          </button>
                          <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_amount_div2">
                            egc
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lock_container_cont1_div1_lock_div_lock_body_input_body">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_head">
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span1">
                          Duration:{" "}
                          {SelectedDuration === "monthly" ? (
                            <> 1 month</>
                          ) : SelectedDuration === "yearly" ? (
                            <> 1 year</>
                          ) : null}
                        </span>
                        <span className="lock_container_cont1_div1_lock_div_lock_body_input_body_head_span2">
                          Expires: {lockDate}
                        </span>
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont">
                        <input
                          type="text"
                          value={Duration}
                          onClick={toggleDurationDrop}
                          placeholder="MM/DD/YY"
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_input"
                        />
                        <EventOutlinedIcon
                          onClick={toggleDurationDrop}
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_cont_icon"
                        />
                        {durationDrop ? (
                          <DurationDiv
                            addMonthly={addMonthly}
                            // addSemiMonthly={addSemiMonthly}
                            addYearly={addYearly}
                            SelectedDuration={SelectedDuration}
                          />
                        ) : null}
                      </div>
                    </div>
                    {estimatedRewardDiv ? (
                      <div className="estRewardDiv">
                        Estimated Daily Reward:{" "}
                        <span className="estRewardDiv_span">
                          {parseFloat(estimatedRewardAmnt)} EGAX
                          {/* {parseFloat(estimatedRewardAmnt) / 0.33} EGAX */}
                        </span>
                      </div>
                    ) : null}

                    {!account ? (
                      <>
                        {" "}
                        <button
                          disabled={true}
                          className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                        >
                          Connect wallet
                        </button>
                      </>
                    ) : (
                      <>
                        {unlockBtn === false ? (
                          <button
                            disabled={Disable}
                            onClick={UnlockToken}
                            className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                          >
                            {isLoading ? (
                              <ScaleLoader
                                color="#375746"
                                size={10}
                                height={20}
                              />
                            ) : (
                              <>Approve egc</>
                            )}
                          </button>
                        ) : (
                          <>
                            {SelectedDuration === "monthly" &&
                            lockAmount != "" ? (
                              <button
                                disabled={Disable}
                                onClick={StakeMonthly}
                                className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                              >
                                {isLoading ? (
                                  <ScaleLoader
                                    color="#375746"
                                    size={10}
                                    height={20}
                                  />
                                ) : (
                                  <>Create Lock</>
                                )}
                              </button>
                            ) : SelectedDuration === "yearly" &&
                              lockAmount != "" ? (
                              <button
                                disabled={Disable}
                                onClick={StakeYearly}
                                className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                              >
                                {isLoading ? (
                                  <ScaleLoader
                                    color="#375746"
                                    size={10}
                                    height={20}
                                  />
                                ) : (
                                  <>Create Lock</>
                                )}
                              </button>
                            ) : lockAmount === "" ? (
                              <button
                                disabled
                                className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                              >
                                Enter an amount
                              </button>
                            ) : (
                              <button
                                disabled
                                className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                              >
                                Choose Duration
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                ) : activeTab === "claim" ? (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_head">
                        Available Reward
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount">
                        {parseFloat(availableClaimReward).toFixed(4)} EGAX
                        {rewardCountDown === true ? (
                          <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_dollar_equiv">
                            Claim In the next:
                            <Timer deadline={nextRewardTakeTime} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <button
                      className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      onClick={TakeReward}
                      disabled={ClaimDisable}
                    >
                      {isLoading2 ? (
                        <ScaleLoader color="#375746" size={10} height={20} />
                      ) : (
                        <>Claim Reward</>
                      )}
                    </button>
                  </div>
                ) : activeTab === "unlock" ? (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_head">
                        My Locked egc
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount">
                        <span className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_span">
                          <span className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_span_span1">
                            {numberWithCommas(
                              parseFloat(myTotalStaked).toFixed(2)
                            )}{" "}
                            egc
                          </span>
                          <span className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_span_span2">
                            Max Duration:
                            <span className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_span_span2_span">
                              ({unlockStakeDuration})
                            </span>
                          </span>
                        </span>
                        {rewardCountDown === true ? (
                          <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount_dollar_equiv">
                            Unlock In the next:
                            <Timer deadline={unlockStakeTime} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {notDueButton ? (
                      <button
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                        onClick={toggleNotDueDiv}
                        disabled={lockDisable}
                      >
                        {isLoading2 ? (
                          <ScaleLoader color="#375746" size={10} height={20} />
                        ) : (
                          <>Remove Lock </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                        onClick={UnlockStake}
                        disabled={lockDisable}
                      >
                        {isLoading2 ? (
                          <ScaleLoader color="#375746" size={10} height={20} />
                        ) : (
                          <>Remove Lock </>
                        )}
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            {/* =========*******=========== */}
            {/* =========******=========== */}
            {/* =========******=========== */}
            {/* ========******============ */}
            {/* ========******============ */}
            {/* ========******============ */}
            {/* =======******============= */}
            {/* ========******============ */}
            {/* ========******============ */}
            {/* =======******============= */}
            <div className="lock_container_cont2">
              <div className="lending_area1">
                <div className="lending_area1_cont1">
                  <div className="lending_area1_cont1_body_1">
                    <div className="lending_area1_cont1_heading">
                      Total egc Locked
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      {parseFloat(totalAssetInfo.amount).toFixed(2)} egc
                    </div>
                    {/* <div className="lending_area1_cont1_heading">
                      (32.84% Of egc Supply)
                    </div> */}
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
                      Total Rewards
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      {parseFloat(totalAssetInfo.dailyRoyalty).toFixed(2)}{" "}
                      <span className="usd_sign">EGAX</span>
                    </div>
                  </div>
                  <div className="lending_area1_cont1_body_1">
                    <HelpOutlineIcon className="help_outline" />
                    <div className="helper_txt_div">
                      This is the total value of all the assets in the lending
                      pool.
                    </div>
                  </div>
                </div>

                <div className="lending_area1_cont1">
                  <div className="lending_area1_cont1_body_1">
                    <div className="lending_area1_cont1_heading">
                      Staking APY
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      30<span className="usd_sign">%</span>
                    </div>
                  </div>
                  <div className="lending_area1_cont1_body_1">
                    <HelpOutlineIcon className="help_outline" />
                    <div className="helper_txt_div">
                      This is the total value of all the assets in the lending
                      pool.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lock_container_cont2_div2_chart_div">
                <div className="lock_container_cont2_div2_chart_div_text_area">
                  Total Locked egc
                </div>
                <div className="lock_container_cont2_div2_chart_div_text_body">
                  <div
                    className="assets_chart_area1"
                    style={{ width: "100%", height: 320 }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={graphData2}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#51cb89"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#51cb89"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 1" stroke="#d7d7d7" />
                        <XAxis dataKey="time" stroke="0" />
                        {/* <YAxis stroke="#000" /> */}
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#22ad62"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className="assets_chart_area2"
                    style={{ width: "100%", height: 320 }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={graphData2}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#fff"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#fff"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 1" stroke="#1d1c2c" />
                        <XAxis dataKey="time" stroke="0" />
                        {/* <YAxis stroke="#fff" /> */}
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#fff"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* ======== */}
              {/* ======== */}
              {/* ======== */}
              <div className="lock_container_transactions">
                <div className="lock_container_transactions_head">
                  All Transactions
                </div>
                <div className="lock_container_transactions_body_all">
                  <table className="stakingTable_table">
                    <thead className="stakingTable_titles">
                      <tr className="stakingTable_title_div">
                        <th className="stakingTable_heading_titles stakingTable_heading_titles_first">
                          Action
                        </th>
                        <th className="stakingTable_heading_titles">Amount</th>
                        <th className="stakingTable_heading_titles">Address</th>

                        <th className="stakingTable_heading_titles stakingTable_heading_titles_last">
                          Txn Hash
                        </th>
                      </tr>
                    </thead>

                    {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================
              </div> */}
                    {LockedTransactions.length <= 0 ? (
                      <div className="no_loans_div">
                        <div className="no_loans_div_cont">
                          <Nodata />
                          No Transaction Yet.
                        </div>{" "}
                      </div>
                    ) : (
                      <tbody
                        className="stakingTable_body"
                        id="popular-categories"
                      >
                        {" "}
                        {/* =============== */}
                        {/* =============== */}
                        {/* =============== */}
                        {LockedTransactions.slice()
                          .reverse()
                          .map((data) => {
                            // const date = new Date(data.time);
                            // const day = date
                            //   .getUTCDate()
                            //   .toString()
                            //   .padStart(2, "0");
                            // const month = (date.getUTCMonth() + 1)
                            //   .toString()
                            //   .padStart(2, "0");
                            // const year = date.getUTCFullYear();
                            // const formattedDate = `${day}/${month}/${year}`;
                            // console.log(formattedDate);
                            return (
                              <tr className="stakingTable_body_row ">
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_first  ">
                                  <div className="value_dolls_div">
                                    {data.status === "STAKE"
                                      ? "Create Lock"
                                      : data.status === "UNSTAKE"
                                      ? "Unlock"
                                      : null}

                                    <div className="value_dolls_div_val">
                                      {/* {formattedDate} */}
                                      {data.time}
                                    </div>
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="value_dolls_div2">
                                    {data.status === "STAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(data.amount).toFixed(2)
                                        )}{" "}
                                        egc
                                      </span>
                                    ) : data.status === "UNSTAKE" ? (
                                      <span style={{ display: "flex" }}>
                                        {numberWithCommas(
                                          parseFloat(
                                            data.unstake_amount
                                          ).toFixed(2)
                                        )}{" "}
                                        egc
                                      </span>
                                    ) : null}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data">
                                  <div className="stakingTable_body_row_data_blockies_">
                                    <Blockies
                                      seed={data.user}
                                      size={8}
                                      scale={4}
                                      className="blockies_icon"
                                    />
                                    {`${data.user.slice(
                                      0,
                                      6
                                    )}...${data.user.slice(39, 42)}`}
                                  </div>
                                </td>
                                <td className="stakingTable_body_row_data stakingTable_body_row_data_last">
                                  {`${data.tx.slice(0, 6)}...${data.tx.slice(
                                    63,
                                    66
                                  )}`}
                                  <OpenInNewIcon className="tx_hash_link_icon" />
                                </td>
                              </tr>
                            );
                          })}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                        {/* =================== */}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="faq_container">
            <div className="faq_container_title">
              Frequently asked questions
            </div>
            <div className="faq_container_body">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    What happens to my tokens when I stake?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="faq_container_body_details">
                    Upon staking, the smart contract utilizes the staked egc
                    tokens as collateral to generate EGAX, which can be utilized
                    for purchasing items instantly on the protocol.
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    How much is my reward when I stake?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="faq_container_body_details">
                    The protocol offers a fixed annual percentage yield of 30%
                    (APY), which is computed based on the USD equivalent of the
                    staked egc.
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    Can I unstake my token before the maturity date?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="faq_container_body_details">
                    Yes, users are allowed to unstake their egc tokens before
                    the maturity date, but it incurs a penalty fee of 10% of the
                    total staked amount.
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      {errorModal ? (
        <UpdatedErrorModal
          errorMessage={errorMessage}
          closeModal={CloseErrorModal}
        />
      ) : null}
      {notDueDiv ? (
        <UpdatedWarningModal
          errorMessage={
            <div>
              An early withdrawal prior to the expiration of the lock-in period
              will result in a penalty fee of{" "}
              <span style={{ color: "#fff", fontWeight: "700" }}> 10%.</span>
            </div>
          }
          continueFunc={UnlockStake}
          closeModal={toggleNotDueDiv}
        />
      ) : null}
      {successModal ? (
        <UpdatedSuccessModal
          btnRoute={true}
          successMessage={successMessage}
          route="/app/staking/egc"
          txnHashDiv={true}
          TxnHash={txHash}
        />
      ) : null}
    </div>
  );
};

export default StakingUpdate;
