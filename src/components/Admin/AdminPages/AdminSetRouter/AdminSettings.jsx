import React, { useEffect, useState } from "react";
import {
  setPythia,
  suspendPythia,
  setPriceOracle,
  setEGCUSDTicker,
  resetStakeTime,
  IncreaseRoyaltyTime,
  adminAddMinter,
  DiamondCutFunc,
  approveBusd,
  setTokenAddress,
  BurnEgc,
  withdrawAllEgc,
} from "../../../../web3/index2";
import "./AdminRouter.css";
import { unlockTokenV3 } from "../../../../web3";
import Web3 from "web3";
import { parseEther, formatEther } from "@ethersproject/units";
import v3Contract from "../../../../web3/contracts/V3/V3ContractAddress.json";
import { useWeb3React } from "@web3-react/core";

const AdminSettings = () => {
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
  const [priceArray, setPriceArray] = useState(["5600000000000000000"]);
  const [newWallet, setNewWallet] = useState([""]);
  const [newWallet2, setNewWallet2] = useState([""]);
  const [diamondCutCode, setDiamondCutCode] = useState("");
  const [egcAmnt, setEgcAmnt] = useState("");
  const [egcWithdrawAmnt, setEgcWithdrawAmnt] = useState("");
  const [egcAddress, setEgcAddress] = useState("");
  const [eusdAddress, setEusdAddress] = useState("");

  const addMinter = async () => {
    const response = await adminAddMinter(
      v3Contract.address,
      library.getSigner()
    );
    console.log(response);
  };
  const DiamondCutFunction = async () => {
    const response = await DiamondCutFunc(diamondCutCode, library.getSigner());
    console.log(response);
  };
  // const ApproveToken = async () => {
  //   const response = await approveBusd(library.getSigner());
  //   console.log(response);
  // };
  const setTokenAdrres = async () => {
    console.log("====================================");
    console.log(eusdAddress, egcAddress);
    console.log("====================================");
    const response = await setTokenAddress(
      eusdAddress,
      egcAddress,
      library.getSigner()
    );
    console.log(response);
  };

  const WithDrawEgc = async () => {
    const response = await withdrawAllEgc(
      parseEther(egcWithdrawAmnt, "wei").toString(),
      library.getSigner()
    );
    console.log(response);
  };
  const BurnEgcAmnt = async () => {
    const response = await BurnEgc(
      parseEther(egcAmnt, "wei").toString(),
      library.getSigner()
    );
    console.log(response);
  };
  const diamondCutCodeChange = (e) => {
    setDiamondCutCode(e.target.value);
    console.log(JSON.parse(e.target.value));
  };
  const WithdrawEgcChange = (e) => {
    setEgcWithdrawAmnt(e.target.value);
    console.log(e.target.value);
  };
  const burnEgcChange = (e) => {
    setEgcAmnt(e.target.value);
    console.log(e.target.value);
  };

  const handleNewWallet = (event) => {
    setNewWallet(event.target.value);
    console.log(event.target.value);
  };
  const ChangeEusdAddress = (event) => {
    setEusdAddress(event.target.value);
    console.log(event.target.value);
  };
  const ChangeEgcAddress = (event) => {
    setEgcAddress(event.target.value);
    console.log(event.target.value);
  };

  const handleNewWallet2 = (event) => {
    setNewWallet2(event.target.value);
    console.log(event.target.value);
  };
  const setPythiaAddress = async () => {
    if (newWallet != "") {
      const response = await setPythia(newWallet, library.getSigner());
      console.log(response);
    }
  };

  const suspendPythiaAddress = async () => {
    if (newWallet2 != "") {
      const response = await suspendPythia(newWallet2, library.getSigner());
      console.log(response);
    }
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

  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="settings_sections">
            <div className="settings_section1">
              <div className="settings_section1_div1">
                <h4 className="routerHeader">Set Pythia</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">
                        New Admin Address
                      </div>
                      <input
                        type="text"
                        placeholder="Wallet Address"
                        className="setRouterAddressInput"
                        value={newWallet}
                        name="newWallet"
                        onChange={handleNewWallet}
                      />
                    </div>
                  </div>

                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={setPythiaAddress}
                      className="setRouterAddressBtn"
                    >
                      Set Pythia
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings_section1_div1">
                <h4 className="routerHeader">Set Price</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">Egc/Eusd</div>
                      <input
                        type="text"
                        placeholder="Price"
                        className="setRouterAddressInput"
                      />
                    </div>
                  </div>
                  <div className="setRouterAddressButtonDiv">
                    <button onClick={setPrice} className="setRouterAddressBtn">
                      Set Price
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings_section1_div2">
                <h4 className="routerHeader">Set Ticker</h4>
                <button onClick={setTicker} className="setRouterAddressBtn">
                  Set Ticker
                </button>
              </div>

              <div className="settings_section1_div1">
                <h4 className="routerHeader">Suspend Pythia</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">
                        Admin Address
                      </div>
                      <input
                        type="text"
                        placeholder="Wallet Address"
                        className="setRouterAddressInput"
                        value={newWallet2}
                        name="newWallet2"
                        onChange={handleNewWallet2}
                      />
                    </div>
                  </div>

                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={suspendPythiaAddress}
                      className="setRouterAddressBtn"
                    >
                      Ban Pythia
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ============ */}
            {/* ============ */}
            {/* ============ */}
            {/* ============ */}
            {/* ============ */}

            <div className="settings_section1">
              <div className="settings_section1_div1">
                <h4 className="routerHeader">Call Diamond Contract Func</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">Code</div>
                      <input
                        placeholder="01010010"
                        className="setRouterAddressInput"
                        value={diamondCutCode}
                        onChange={diamondCutCodeChange}
                      />
                    </div>
                  </div>
                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={DiamondCutFunction}
                      className="setRouterAddressBtn"
                    >
                      Diamond Cut
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings_section1_div2">
                <h4 className="routerHeader">Add Minter</h4>
                <button onClick={addMinter} className="setRouterAddressBtn">
                  Add Minter
                </button>
              </div>

              <div className="settings_section1_div1">
                <h4 className="routerHeader">Burn Egc</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title"> Amount</div>
                      <input
                        placeholder="0.0000"
                        className="setRouterAddressInput"
                        value={egcAmnt}
                        onChange={burnEgcChange}
                      />
                    </div>
                  </div>
                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={BurnEgcAmnt}
                      className="setRouterAddressBtn"
                    >
                      Burn Egc
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings_section1_div1">
                <h4 className="routerHeader">Withdraw Egc</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title"> Amount</div>
                      <input
                        placeholder="0.0000"
                        className="setRouterAddressInput"
                        value={egcWithdrawAmnt}
                        onChange={WithdrawEgcChange}
                      />
                    </div>
                  </div>
                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={WithDrawEgc}
                      className="setRouterAddressBtn"
                    >
                      Withdraw Egc
                    </button>
                  </div>
                </div>
              </div>
              <div className="settings_section1_div1">
                <h4 className="routerHeader">Set Address</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">
                        {" "}
                        Eusd Address:
                      </div>
                      <input
                        placeholder="0x000"
                        className="setRouterAddressInput"
                        value={eusdAddress}
                        onChange={ChangeEusdAddress}
                      />
                    </div>
                    --
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">
                        {" "}
                        Egc Address:
                      </div>
                      <input
                        placeholder="0x000"
                        className="setRouterAddressInput"
                        value={egcAddress}
                        onChange={ChangeEgcAddress}
                      />
                    </div>
                  </div>
                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={setTokenAdrres}
                      className="setRouterAddressBtn"
                    >
                      Set address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSettings;
