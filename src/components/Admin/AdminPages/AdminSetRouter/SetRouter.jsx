import React, { useEffect, useState } from "react";
import { SwapRouterAddress } from "../../../../web3/index2";
import "./AdminRouter.css";
import Web3 from "web3";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const SetRouter = () => {
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
  const [CakeRouterAddress, setCakeRouterAddress] = useState(
    "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
  );
  const [BusdRouterAddress, setBusdRouterAddress] = useState(
    "0xb16ba303c1Fa64Dc8a91dCaF87D0299F85792B6A"
  );

  const setRouterAddress = async () => {
    const response = await SwapRouterAddress(
      CakeRouterAddress,
      BusdRouterAddress,
      library.getSigner()
    );
    console.log(response);
  };
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="setRouterAddressDiv">
            <div className="setRouterAddressDiv1">
              <div className="setRouterAddressDiv1_title">
                Pancake Router Address
              </div>
              <input
                type="text"
                placeholder="0x0000000"
                className="setRouterAddressInput"
                value={CakeRouterAddress}
              />
            </div>
            --
            <div className="setRouterAddressDiv1">
              <div className="setRouterAddressDiv1_title">
                Busd Pancake Address
              </div>
              <input
                type="text"
                placeholder="0x0000000"
                className="setRouterAddressInput"
                value={BusdRouterAddress}
              />
            </div>
            <div className="setRouterAddressButtonDiv">
              <button
                onClick={setRouterAddress}
                className="setRouterAddressBtn"
              >
                Set router
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SetRouter;
