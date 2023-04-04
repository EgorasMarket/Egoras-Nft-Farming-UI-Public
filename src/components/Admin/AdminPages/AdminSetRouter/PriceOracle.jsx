import React, { useEffect, useState } from "react";
import {
  setPythia,
  setPriceOracle,
  setEGCUSDTicker,
  resetStakeTime,
  IncreaseRoyaltyTime,
} from "../../../../web3/index2";
import { unlockTokenV3 } from "../../../../web3";
import Web3 from "web3";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const PriceOracle = () => {
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
  const [tickerArray, setTickerArray] = useState(["egceusd"]);
  const [priceArray, setPriceArray] = useState(["7790000000000000000"]);
  const setPythiaAddress = async () => {
    const response = await setPythia(
      "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      library.getSigner()
    );
    console.log(response);
  };
  const setPrice = async () => {
    const response = await setPriceOracle(
      priceArray,
      tickerArray,
      library.getSigner()
    );
    console.log(response);
  };
  const setTicker = async () => {
    const response = await setEGCUSDTicker(tickerArray[0], library.getSigner());
    console.log(response);
  };
  const resetStackedTime = async () => {
    const response = await resetStakeTime(account, library.getSigner());
    console.log(response);
  };
  const IncreaseStakeTime = async () => {
    const response = await IncreaseRoyaltyTime(account, library.getSigner());
    console.log(response);
  };
  const UnlockToken = async (e) => {
    let ret = await unlockTokenV3(
      "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
      parseEther("2000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      // setUnlockBtn(true);
    } else {
      if (ret.message.code == 4001) {
        console.log(ret);
      }
      console.log(ret);
    }
  };
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="setRouterAddressDiv">
            <div className="setRouterAddressDiv1">
              <div className="setRouterAddressDiv1_title">EGC</div>
              <input
                type="text"
                placeholder="Price"
                className="setRouterAddressInput"
                // value={}
              />
            </div>
            --
            <div className="setRouterAddressDiv1">
              <div className="setRouterAddressDiv1_title">USD</div>
              <input
                type="Ticker"
                placeholder="amount"
                className="setRouterAddressInput"
                // value={}
              />
            </div>
            <div className="setRouterAddressButtonDiv">
              <button onClick={setPrice} className="setRouterAddressBtn">
                Set Price
              </button>
              <button
                onClick={setPythiaAddress}
                className="setRouterAddressBtn"
              >
                Set Pythia
              </button>
              <button onClick={setTicker} className="setRouterAddressBtn">
                Set Ticker
              </button>
              <button
                onClick={resetStackedTime}
                className="setRouterAddressBtn"
              >
                Reset Time
              </button>
              <button
                onClick={IncreaseStakeTime}
                className="setRouterAddressBtn"
              >
                Increase Time
              </button>
              <button onClick={UnlockToken} className="setRouterAddressBtn">
                Aprove EGC
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PriceOracle;
