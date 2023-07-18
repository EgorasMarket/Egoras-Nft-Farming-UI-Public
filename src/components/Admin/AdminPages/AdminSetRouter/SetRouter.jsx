import React, { useEffect, useState } from "react";
import {
  SwapRouterAddress,
  adminAddMinter,
  DiamondCutFunc,
  approveBusd,
  convertToken,
  setMartgptTokenAddress,
  approveConvertToken,
  BurnEgc,
  withdrawAllEgc,
} from "../../../../web3/index2";
import "./AdminRouter.css";
import Web3 from "web3";
import v3Contract from "../../../../web3/contracts/V3/V3ContractAddress.json";
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
  const [diamondCutCode, setDiamondCutCode] = useState("");
  const [egcAmnt, setEgcAmnt] = useState("");
  const [egcWithdrawAmnt, setEgcWithdrawAmnt] = useState("");
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
  const ApproveToken = async () => {
    const response = await approveBusd(library.getSigner());
    console.log(response);
  };
  const convertTokenMart = async () => {
    const response = await convertToken(library.getSigner());
    console.log(response);
  };
  const setTokenAdrress = async () => {
    const response = await setMartgptTokenAddress(library.getSigner());
    console.log(response);
  };
  const approveToken = async () => {
    const response = await approveConvertToken(library.getSigner());
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
    // setDiamondCutCode(e.target.value);
    setDiamondCutCode(e.target.value);
    console.log(JSON.parse(e.target.value));
    // console.log(e.target.value.split(","));
    // const code2 = e.target.value.split(",");
    // console.log(code2[0], code2[1], code2[2]);
  };
  const WithdrawEgcChange = (e) => {
    setEgcWithdrawAmnt(e.target.value);
    console.log(e.target.value);
  };
  const burnEgcChange = (e) => {
    setEgcAmnt(e.target.value);
    console.log(e.target.value);
  };
  // const addMinter = async () => {
  //   const response = await adminAddMinter(
  //     v3Contract.address,
  //     library.getSigner()
  //   );
  //   console.log(response);
  // };
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div
            className="settings"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="setRouterAddressButtonDiv">
              <button onClick={addMinter} className="setRouterAddressBtn">
                Add Minter
              </button>
            </div>
            {/* <div className="setRouterAddressButtonDiv">
              <button onClick={setTokenAdrress} className="setRouterAddressBtn">
                Set Token Address
              </button>
            </div>
            <div className="setRouterAddressButtonDiv">
              <button
                onClick={convertTokenMart}
                className="setRouterAddressBtn"
              >
                Convert Token
              </button>
            </div> */}
            {/* <div className="setRouterAddressButtonDiv">
              <button onClick={approveToken} className="setRouterAddressBtn">
                Approve Token
              </button>
            </div> */}

            <input
              // type="text"
              placeholder="0x0000000"
              className="setRouterAddressInput"
              value={diamondCutCode}
              onChange={diamondCutCodeChange}
            />
            <button
              onClick={DiamondCutFunction}
              className="setRouterAddressBtn"
            >
              Call Diamond Cut
            </button>
          </div>
          <div>
            <input
              // type="text"
              placeholder="0.0000"
              className="setRouterAddressInput"
              value={egcAmnt}
              onChange={burnEgcChange}
            />
            <button onClick={BurnEgcAmnt} className="setRouterAddressBtn">
              Burn Egc
            </button>
          </div>
          <div>
            <input
              // type="text"
              placeholder="0.0000"
              className="setRouterAddressInput"
              value={egcWithdrawAmnt}
              onChange={WithdrawEgcChange}
            />
            <button onClick={WithDrawEgc} className="setRouterAddressBtn">
              Withdraw Egc
            </button>
          </div>

          <div>
            <button onClick={setTokenAdrress} className="setRouterAddressBtn">
              set token address
            </button>
          </div>
          {/* <button onClick={ApproveToken} className="setRouterAddressBtn">
            Approve Token
          </button> */}
        </div>
      </section>
    </div>
  );
};

export default SetRouter;
