import React, { useState, useEffect } from "react";
import { ListAsset, setSwapFee } from "../../../../web3/index3";
import { useWeb3React } from "@web3-react/core";
import { parseEther, formatEther } from "@ethersproject/units";
import "./adminEx.css";
const AdminSwapSettings = () => {
  const context = useWeb3React();
  const { library, account } = context;
  const [tokenTicker, setTokenTicker] = useState("");
  const [baseTicker, setBaseTicker] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [baseAddress, setBaseAddress] = useState("");
  const [fee, setFee] = useState("");

  const changeTokenTicker = (event) => {
    setTokenTicker(event.target.value.toUpperCase());
    console.log(event.target.value);
  };
  const changeBaseTicker = (event) => {
    setBaseTicker(event.target.value.toUpperCase());
    console.log(event.target.value);
  };
  const changeTokenAddress = (event) => {
    setTokenAddress(event.target.value);
    console.log(event.target.value);
  };
  const changeBaseAddress = (event) => {
    setBaseAddress(event.target.value);
    console.log(event.target.value);
  };
  const changeDexFee = (event) => {
    setFee(event.target.value);
    console.log(event.target.value);
  };

  const ListAssetEx = async () => {
    console.log("====================================");
    console.log(`${tokenTicker}_${baseTicker}`, tokenAddress, baseAddress);
    console.log("====================================");
    const response = await ListAsset(
      `${tokenTicker}_${baseTicker}`,
      tokenAddress,
      baseAddress,
      library.getSigner()
    );
    console.log(response);
  };
  const setDexFee = async () => {
    const convertedFee = parseFloat(fee) / 100;
    console.log("====================================");
    console.log(convertedFee);
    console.log("====================================");
    const response = await setSwapFee(
      parseEther(convertedFee.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(response);
  };

  // 0x1f467b61da084784afb0f5bda14554a30bb5a5b7;
  // 0x55d398326f99059ff775485246999027b3197955;
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="admin_dex_div">
            <div className="admin_dex_div_title">List Asset</div>
            <div className="admin_dex_div_ticker_div">
              <div className="admin_dex_div_ticker_div_area">
                <div className="admin_dex_div_ticker_div_cont1">
                  Token Ticker eg:(EGAX){" "}
                  <input
                    placeholder="Token ticker"
                    className="setRouterAddressInput"
                    value={tokenTicker}
                    onChange={changeTokenTicker}
                  />
                </div>
                <span>-</span>
                <div className="admin_dex_div_ticker_div_cont1">
                  Base Ticker eg:(USDT){" "}
                  <input
                    placeholder="Base ticker"
                    className="setRouterAddressInput"
                    value={baseTicker}
                    onChange={changeBaseTicker}
                  />
                </div>
              </div>
              <div className="admin_dex_div_ticker_div_output_div">
                Expected Ticker Output: {`${tokenTicker}_${baseTicker}`}
              </div>
            </div>
            <div
              className="admin_dex_div_cont
            "
            >
              <div className="admin_dex_div_cont_1">
                <div className="admin_dex_div_cont_1_title">Token Address</div>

                <input
                  placeholder="egax address"
                  value={tokenAddress}
                  className="setRouterAddressInput"
                  onChange={changeTokenAddress}
                />
              </div>
              <div className="admin_dex_div_cont_1">
                <div className="admin_dex_div_cont_1_title">Base Address</div>

                <input
                  type="text"
                  value={baseAddress}
                  placeholder="usdt address"
                  className="setRouterAddressInput"
                  onChange={changeBaseAddress}
                />
              </div>
            </div>
            {account ? (
              <button className="admin_dex_div_btn" onClick={ListAssetEx}>
                List Asset
              </button>
            ) : (
              <button className="admin_dex_div_btn">Connect wallet</button>
            )}
          </div>
          <div className="admin_dex_div">
            <div className="admin_dex_div_title">Set Dex Fee</div>
            <div className="admin_dex_div_ticker_div_cont1">
              Fee
              <input
                placeholder="Dex fee"
                className="setRouterAddressInput"
                value={fee}
                onChange={changeDexFee}
              />
            </div>
            {account ? (
              <button className="admin_dex_div_btn" onClick={setDexFee}>
                Set fee
              </button>
            ) : (
              <button className="admin_dex_div_btn">Connect wallet</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSwapSettings;
