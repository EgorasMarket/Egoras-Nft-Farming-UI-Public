import React, { useState, useEffect } from "react";
import { parseEther, formatEther } from "@ethersproject/units";
import Web3 from "web3";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
import { CheckUserRewardStats } from "../../../web3/index2";
const { REACT_APP_EGC_ADDRESS, REACT_APP_EUSD_ADDRESS } = process.env;
const DashboardReward = () => {
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

  useEffect(async () => {
    if (account) {
      const response = await CheckUserRewardStats(
        account,
        0,
        library.getSigner()
      );
      console.log(response);
      console.log(
        formatEther(response.message.allUserActivity).toString(),
        "allUserActivity "
      );
      console.log(
        formatEther(response.message.currentAllActivity).toString(),
        "currentAllActivity"
      );
      console.log(
        formatEther(response.message.currentPeriod).toString(),
        "currentPeriod"
      );
      console.log(
        formatEther(response.message.userActivity).toString(),
        "userActivity"
      );
      console.log(
        formatEther(response.message.userTotalRewardRecieved).toString(),
        "userTotalRewardRecieved"
      );
    }
  }, [account]);

  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container"></div>
      </section>
    </div>
  );
};

export default DashboardReward;
