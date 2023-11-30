import Reac, { useEffect, useState, useRef } from "react";
import "./convert.css";
import { parseEther, formatEther } from "@ethersproject/units";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Web3 from "web3";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  tokenBalance,
  checkAllowanceV3,
  unlockTokenV3,
  checkAllowanceV32,
  unlockTokenV32,
} from "../../../../web3/index";
import { getPriceOracle } from "../../../../web3/index2";
import {
  convertEgcToMartgpt,
  convertEusdEgc,
  convertEgcEusd,
} from "../../../../web3/index2";
import UpdatedErrorModal from "./UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "./UpdatedSuccessErrorModals/UpdatedSuccessModal";
import { ScaleLoader } from "react-spinners";
const {
  REACT_APP_EGC_ADDRESS,
  REACT_APP_EUSD_ADDRESS,
  REACT_APP_MartgptToken_ADDRESS,
} = process.env;
const Convert = () => {
  const [ConvertAmount, setConvertAmount] = useState("");
  const [ConvertAmountOut, setConvertAmountOut] = useState("");
  const [token1Balance, setToken1Balance] = useState("0");
  const [token2Balance, setToken2Balance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token1, setToken1] = useState({
    id: "1",
    symbol: "EUSD",
    name: "Egoras Dollar",
    img: "/img/tokens-folder/busd_icon.png",
    PriceAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    address: "0xBDeb3C052bD949B6E38Cb0BC9593793a78c46968",
  });
  const [token2, setToken2] = useState({
    id: "2",
    symbol: "EGC",
    name: "Egoras Credit",
    img: "/img/egc_icon2.svg",
    PriceAddress: "0x4AC4fC5317F95849A1F17e2f4Daf03c32196f0cb",
    address: "0x4AC4fC5317F95849A1F17e2f4Daf03c32196f0cb",
  });
  const context = useWeb3React();
  const { library, account } = context;

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          token1.address,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setToken1Balance(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account, token1, token2]
  );

  useEffect(async () => {
    if (account) {
      const res = await getPriceOracle("egceusd", library.getSigner());
      console.log(res);
      console.log(formatEther(res.message));
      console.log(formatEther(res.message));
      const formattedAmount = parseFloat(formatEther(res.message));
      if (token1.symbol === "EUSD") {
        setConvertAmountOut(parseFloat(ConvertAmount) / formattedAmount);
        return;
      }
      if (token1.symbol === "EGC") {
        setConvertAmountOut(parseFloat(ConvertAmount) * formattedAmount);
        return;
      }
    }
  }, [account, token1, ConvertAmount]);

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          token2.address,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setToken2Balance(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account, token2, token1]
  );
  const UnlockToken = async () => {
    setIsLoading(true);
    setDisable(true);

    let ret = await unlockTokenV3(
      token1.address,
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
          token1.address,
          account,
          parseEther(ConvertAmount.toString(), "wei").toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },

    [account, unLockCheckStatus, ConvertAmount, token1]
  );

  const ToggleSwapInputs = (e) => {
    setToken1(token2);
    setToken2(token1);
  };

  const convertToken = async () => {
    if (token1.symbol === "EUSD") {
      setIsLoading(true);
      setDisable(true);
      const res = await convertEusdEgc(
        account,
        parseEther(ConvertAmount.toString(), "wei").toString(),
        library.getSigner()
      );
      console.log(res, "somto8uhhhg");
      //   console.log(res.status, "somto8uhhhg");
      if (res.status === true) {
        setIsLoading(false);
        setDisable(false);
        setSuccessModal(true);
        setSuccessMessage(
          "You've successfully converted " +
            ConvertAmount +
            token1.symbol +
            " for " +
            ConvertAmountOut +
            token2.symbol +
            " token"
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
      return;
    }

    if (token1.symbol === "EGC") {
      setIsLoading(true);
      setDisable(true);
      const res = await convertEgcEusd(
        account,
        parseEther(ConvertAmount.toString(), "wei").toString(),
        library.getSigner()
      );
      console.log(res, "somto8uhhhg");
      //   console.log(res.status, "somto8uhhhg");
      if (res.status === true) {
        setIsLoading(false);
        setDisable(false);
        setSuccessModal(true);
        setSuccessMessage(
          "You've successfully converted " +
            ConvertAmount +
            token1.symbol +
            " for " +
            ConvertAmountOut +
            token2.symbol +
            " token"
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
      return;
    }
  };

  const CloseErrorModal = () => {
    setErrorModal(false);
  };

  const AmountChange = (e) => {
    setConvertAmount(e.target.value);
  };

  useEffect(() => {
    if (ConvertAmount <= "0") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [ConvertAmount]);

  return (
    <div className="other2">
      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="convertDivCont">
            <div className="convertDivCont_title">Convert</div>
            <div className="convertDivCont_body">
              <div className="convertDivCont_body_container">
                <div className="input_amnt_layer">
                  <div className="amnt_input">
                    <div className="amnt_input_layer1">
                      <div className="amnt_input_layer1_input_div">
                        <input
                          type="number"
                          name="number"
                          id="number"
                          placeholder="0.00"
                          className="amnt_input_field"
                          autocomplete="off"
                          onChange={AmountChange}
                          value={ConvertAmount}
                        />
                      </div>
                      <div className="Swap_icondropDownDiv">
                        <span className="token_balances_span">
                          <AccountBalanceWalletIcon className="TokenBalanceIcon" />
                          :{token1Balance}
                        </span>
                        <button className="display_tokens_drop">
                          <img
                            src={token1.img}
                            alt=""
                            className="display_tokens_drop_img"
                          />
                          {token1.symbol}
                        </button>
                      </div>
                    </div>
                    <div className="amnt_input_layer2">
                      <button className="amnt_input_layer2_cont1">25%</button>
                      <button className="amnt_input_layer2_cont1">50%</button>
                      <button className="amnt_input_layer2_cont1">75%</button>
                      <button className="amnt_input_layer2_cont1_last">
                        100%
                      </button>
                    </div>
                  </div>
                </div>
                {/* ================= */}
                {/* ================= */}
                <SwapVertIcon
                  className="toggle_swap_inputs"
                  onClick={ToggleSwapInputs}
                  style={{ top: "-4%" }}
                />
                {/* ================= */}
                {/* ================= */}
                <div className="input_amnt_layer">
                  <div className="amnt_input">
                    <div className="amnt_input_layer1">
                      <div className="amnt_input_layer1_input_div">
                        <input
                          type="number"
                          name="number"
                          id="number"
                          placeholder="0.00"
                          className="amnt_input_field"
                          autocomplete="off"
                          value={ConvertAmountOut}
                        />
                      </div>
                      <div className="Swap_icondropDownDiv">
                        <span className="token_balances_span">
                          <AccountBalanceWalletIcon className="TokenBalanceIcon" />
                          :{token2Balance}
                        </span>
                        <button className="display_tokens_drop">
                          <img
                            src={token2.img}
                            alt=""
                            className="display_tokens_drop_img"
                          />
                          {token2.symbol}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {account ? (
                  <>
                    {" "}
                    {unlockBtn === false ? (
                      <button
                        className="convertDivCont_body_container_btn"
                        disabled={Disable}
                        onClick={UnlockToken}
                      >
                        {isLoading ? (
                          <ScaleLoader color="#375746" size={10} height={20} />
                        ) : (
                          <> Approve {token1.symbol}</>
                        )}
                      </button>
                    ) : (
                      <button
                        className="convertDivCont_body_container_btn"
                        disabled={Disable}
                        onClick={convertToken}
                      >
                        {isLoading ? (
                          <ScaleLoader color="#375746" size={10} height={20} />
                        ) : (
                          <> Convert {token1.symbol}</>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      className="convertDivCont_body_container_btn"
                      disabled={true}
                    >
                      Connect Wallet
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {successModal ? (
        <UpdatedSuccessModal
          btnRoute={true}
          successMessage={successMessage}
          route=""
          txnHashDiv={true}
          TxnHash={txHash}
        />
      ) : null}
      {errorModal ? (
        <UpdatedErrorModal
          errorMessage={errorMessage}
          closeModal={CloseErrorModal}
        />
      ) : null}
    </div>
  );
};

export default Convert;
