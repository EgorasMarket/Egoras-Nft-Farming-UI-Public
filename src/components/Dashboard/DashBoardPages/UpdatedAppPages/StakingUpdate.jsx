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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Nodata from "../nodataComponent/Nodata";
import { config } from "../../../../actions/Config";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedSuccessModal from "./UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "./UpdatedSuccessErrorModals/UpdatedErrorModal";
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
  getTickerInfo,
  tokenBalance,
  takeRoyalty,
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
  const [estimatedRewardAmnt, setEstimatedRewardAmnt] = useState(0);
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

  const [myAssetInfo, setMyAssetInfo] = useState({});
  const [totalAssetInfo, setTotalAssetInfo] = useState({});
  const [txHash, setTxHash] = useState("");
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
    if (e.target.value < 1) {
      setEstimatedRewardDiv(false);
    } else {
      setEstimatedRewardDiv(true);
    }
    setEstimatedRewardAmnt(e.target.value * egcUsdVal * 0.000328767);
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
    if (res.status == true) {
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
    if (res.status == true) {
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
    const res = await UnlockLockedStake(library.getSigner());
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status == true) {
      setIsLoading2(false);
      setLockDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully claimed " +
          parseFloat(availableClaimReward).toFixed(2) +
          " eusd"
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
    if (res.status == true) {
      setIsLoading2(false);
      setClaimDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully claimed " +
          parseFloat(availableClaimReward).toFixed(2) +
          " eusd"
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
          "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
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
    setEstimatedRewardAmnt(coinBalance2 * egcUsdVal * 0.033);
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
    }
  }, [account]);
  useEffect(async () => {
    if (account) {
      const res = await getRoyaltyStats(account, library.getSigner());
      console.log(res);
      console.log(res.message._dailyRoyalty);
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
      const date = newRewardDate2;
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = date.getUTCFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      console.log(formattedDate);
      setUnlockStakeDuration(formattedDate);
      setNextRewardTakeTime(newRewardDate);
      setUnlockStakeTime(newRewardDate2);
      if (newRewardDate <= new Date()) {
        setClaimDisable(false);
        setRewardCountDown(false);
      } else {
        setClaimDisable(true);
        setRewardCountDown(true);
      }
    }
  }, [account]);
  useEffect(async () => {
    if (account) {
      const res = await stakeConfig(library.getSigner());
      console.log(res);
    }
  }, [account]);
  useEffect(async () => {
    if (account) {
      const res = await getCalculatedRoyalty(account, library.getSigner());
      console.log(formatEther(res.message).toString());
      setAvailableClaimReward(formatEther(res.message).toString());
    }
  }, [account]);
  useEffect(() => {
    if (account) {
      console.log(availableClaimReward);
      console.log(nextRewardTakeTime);
      if (availableClaimReward == "0.0" || nextRewardTakeTime == "") {
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
        setTotalAssetInfo(response.data);
        // setMyAssetInfo(response.data.user);
      }
    };
    fetchData();
  }, []);
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
                      EGC
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
                      EUSD
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
                          No funded pools yet.
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
                        {UniqueLockedTransactions.map((data) => {
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
                                  Create Lock
                                  <div className="value_dolls_div_val">
                                    {formattedDate}
                                    {/* {data.time} */}
                                  </div>
                                </div>
                              </td>
                              <td className="stakingTable_body_row_data">
                                <div className="value_dolls_div2">
                                  {parseFloat(data.amount).toFixed(2)} EGC
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
                    My Locked EGC
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
                      {numberWithCommas(parseFloat(dailyReward).toFixed(2))}{" "}
                      eusd / per day
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
                        parseFloat(TotalClaimedReward).toFixed(2)
                      )}{" "}
                      eusd
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
                            EGC
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
                          {estimatedRewardAmnt} eUSD
                        </span>
                      </div>
                    ) : null}
                    {SelectedDuration === "monthly" && lockAmount != "" ? (
                      <button
                        disabled={Disable}
                        onClick={StakeMonthly}
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      >
                        {isLoading ? (
                          <ScaleLoader color="#24382b" size={10} height={20} />
                        ) : (
                          <>Create Lock</>
                        )}
                      </button>
                    ) : SelectedDuration === "yearly" && lockAmount != "" ? (
                      <button
                        disabled={Disable}
                        onClick={StakeYearly}
                        className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      >
                        {isLoading ? (
                          <ScaleLoader color="#24382b" size={10} height={20} />
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
                  </div>
                ) : activeTab === "claim" ? (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_head">
                        Available Reward
                      </div>
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_amount">
                        {parseFloat(availableClaimReward).toFixed(2)} eUsd
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
                        <ScaleLoader color="#24382b" size={10} height={20} />
                      ) : (
                        <>Claim Reward</>
                      )}
                    </button>
                  </div>
                ) : activeTab === "unlock" ? (
                  <div className="lock_container_cont1_div1_lock_div_lock_body">
                    <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1">
                      <div className="lock_container_cont1_div1_lock_div_lock_body_claim_Div1_head">
                        My Locked EGC
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
                    <button
                      className="lock_container_cont1_div1_lock_div_lock_body_input_body_btn"
                      onClick={UnlockStake}
                      disabled={lockDisable}
                    >
                      {isLoading2 ? (
                        <ScaleLoader color="#24382b" size={10} height={20} />
                      ) : (
                        <>Remove Lock </>
                      )}
                    </button>
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
                      Total EGC Locked
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      {parseFloat(totalAssetInfo.amount, 2)} egc
                    </div>
                    <div className="lending_area1_cont1_heading">
                      (32.84% Of EGC Supply)
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
                      Total Rewards
                    </div>
                    <div className="lending_area1_cont1_body_txt">
                      {parseFloat(totalAssetInfo.dailyRoyalty).toFixed(2)}{" "}
                      <span className="usd_sign">eUSD</span>
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
                      12<span className="usd_sign">%</span>
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
                  Total Locked EGC
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
                              stopColor="#60c589"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#60c589"
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
                          stroke="#229e54"
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
                        <CartesianGrid strokeDasharray="1 1" stroke="#283b2f" />
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
                          No funded pools yet.
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
                        {LockedTransactions.map((data) => {
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
                                  Create Lock
                                  <div className="value_dolls_div_val">
                                    {/* {formattedDate} */}
                                    {data.time}
                                  </div>
                                </div>
                              </td>
                              <td className="stakingTable_body_row_data">
                                <div className="value_dolls_div2">
                                  {/* {data.action === "Create Lock" ? (
                                    <>+ {data.amount} EGC</>
                                  ) : (
                                    <>- {data.amount} eUSD</>
                                  )} */}
                                  {parseFloat(data.amount).toFixed(2)} EGC
                                  {/* <div className="value_dolls_div_val">
                                    $2,406.66
                                  </div> */}
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
        </div>
      </section>
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
          route="/app/staking/egc"
          txnHashDiv={true}
          TxnHash={txHash}
        />
      ) : null}
    </div>
  );
};

export default StakingUpdate;
