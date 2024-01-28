import React, { useEffect, useState } from "react";
import {
  setPythiaAddr,
  suspendPythia,
  setPriceOracle,
  setEGCUSDTicker,
  setTickerNew,
  // resetStakeTime,
  // IncreaseRoyaltyTime,
  adminAddMinter,
  DiamondCutFunc,
  setTokenAddress,
  // BurnEgc,
  withdrawFunds,
  withdrawBase,
  getPriceOracle,
  setStakeConfigure,
  setRoyaltyAddress,
} from "../../../../web3/index2";
import "./AdminRouter.css";
import { useWeb3React } from "@web3-react/core";
import { parseEther, formatEther } from "@ethersproject/units";

const AdminSettings = () => {
  const context = useWeb3React();
  const { library, account } = context;
  const [tickerArray, setTickerArray] = useState(["egcegax"]);
  const [priceArray, setPriceArray] = useState(["2600000000000000000"]);
  const [newWallet, setNewWallet] = useState([""]);
  const [newWallet2, setNewWallet2] = useState([""]);
  const [diamondCutCode, setDiamondCutCode] = useState("");
  const [withdrawTokenAddress, setWithdrawTokenAddress] = useState("");
  const [withdrawTokenAmount, setWithdrawTokenAmount] = useState("");
  const [egcAddress, setEgcAddress] = useState("");
  const [eusdAddress, setEusdAddress] = useState("");

  const addMinter = async () => {
    const response = await adminAddMinter(library.getSigner());
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

  const withdrawEgoDaoFunds = async () => {
    const response = await withdrawFunds(
      withdrawTokenAddress,
      account,
      parseEther(withdrawTokenAmount, "wei").toString(),
      library.getSigner()
    );
    console.log(response);
  };
  const withdrawEgoDaoBase = async () => {
    const response = await withdrawBase(account, library.getSigner());
    console.log(response);
  };
  // const BurnEgcAmnt = async () => {
  //   const response = await BurnEgc(
  //     parseEther(egcAmnt, "wei").toString(),
  //     library.getSigner()
  //   );
  //   console.log(response);
  // };

  const diamondCutCodeChange = (e) => {
    setDiamondCutCode(e.target.value);
    console.log(JSON.parse(e.target.value));
  };
  // const WithdrawEgcChange = (e) => {
  //   setEgcWithdrawAmnt(e.target.value);
  //   console.log(e.target.value);
  // };
  // const burnEgcChange = (e) => {
  //   setEgcAmnt(e.target.value);
  //   console.log(e.target.value);
  // };

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
  const ChangeTokenAddress = (event) => {
    setWithdrawTokenAddress(event.target.value);
    console.log(event.target.value);
  };
  const ChangeTokenAmount = (event) => {
    setWithdrawTokenAmount(event.target.value);
    console.log(event.target.value);
  };

  const handleNewWallet2 = (event) => {
    setNewWallet2(event.target.value);
    console.log(event.target.value);
  };
  const setPythiaAddress = async () => {
    // if (newWallet != "") {
    const response = await setPythiaAddr(newWallet, library.getSigner());
    console.log(response);
    // }
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
  console.log(priceArray[0], tickerArray[0]);

  // const setTicker = async () => {
  //   const response = await setEGCUSDTicker(tickerArray[0], library.getSigner());
  //   console.log(response);
  // };
  const setTicker2 = async () => {
    const response = await setTickerNew(tickerArray[0], library.getSigner());
    console.log(response);
  };
  const configureStake = async () => {
    const response = await setStakeConfigure(
      "0x4AC4fC5317F95849A1F17e2f4Daf03c32196f0cb",
      "0x1F467B61Da084784AfB0f5BdA14554A30Bb5A5b7",
      "300000000000000000",
      library.getSigner()
    );
    console.log(response);
  };

  // const setRoyaltyAddr = async () => {
  //   const response = await setRoyaltyAddress(
  //     "0xBDeb3C052bD949B6E38Cb0BC9593793a78c46968",
  //     library.getSigner()
  //   );
  //   console.log(response);
  // };

  // const resetStackedTime = async () => {
  //   const response = await resetStakeTime(account, library.getSigner());
  //   console.log(response);
  // };

  // const IncreaseStakeTime = async () => {
  //   const response = await IncreaseRoyaltyTime(account, library.getSigner());
  //   console.log(response);
  // };

  useEffect(async () => {
    const res = await getPriceOracle();
    console.log(res);
  }, [account]);

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
                <button onClick={setTicker2} className="setRouterAddressBtn">
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

              {/* <div className="settings_section1_div1">
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
              </div> */}

              {/* <div className="settings_section1_div1">
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
              </div> */}
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
              {/* <div className="settings_section1_div2">
                <h4 className="routerHeader">Set Royalty Address</h4>
                <button
                  onClick={setRoyaltyAddr}
                  className="setRouterAddressBtn"
                >
                  Set Addrress
                </button>
              </div> */}
              <div className="settings_section1_div2">
                <h4 className="routerHeader">Configure Stake</h4>
                <button
                  onClick={configureStake}
                  className="setRouterAddressBtn"
                >
                  Configure
                </button>
              </div>
              <div className="settings_section1_div1">
                <h4 className="routerHeader">Withdraw Funds</h4>
                <div className="setRouterAddressDiv">
                  <div className="setRouterAddressDiv_address_divs">
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">
                        {" "}
                        Token Address:
                      </div>
                      <input
                        placeholder="0x000"
                        className="setRouterAddressInput"
                        value={withdrawTokenAddress}
                        onChange={ChangeTokenAddress}
                      />
                    </div>
                    --
                    <div className="setRouterAddressDiv1">
                      <div className="setRouterAddressDiv1_title">
                        {" "}
                        Token Amount:
                      </div>
                      <input
                        placeholder="000"
                        className="setRouterAddressInput"
                        value={withdrawTokenAmount}
                        onChange={ChangeTokenAmount}
                      />
                    </div>
                  </div>
                  <div className="setRouterAddressButtonDiv">
                    <button
                      onClick={withdrawEgoDaoFunds}
                      className="setRouterAddressBtn"
                    >
                      Withdraw
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
