import Reac, { useEffect, useState, useRef } from "react";
import "./convert.css";
import { parseEther, formatEther } from "@ethersproject/units";
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
import { convertEgcToMartgpt } from "../../../../web3/index2";
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
  const [egcBalance, setEgcBalance] = useState("0");
  const [MGPTTBalance, setMGPTTBalance] = useState("0");
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

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          "0xd68e5c52f7563486cc1a15d00efa12c8644a907e",
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setEgcBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account]
  );
  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          REACT_APP_MartgptToken_ADDRESS,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setMGPTTBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account]
  );
  useEffect(
    async (e) => {
      if (account) {
        let check = await checkAllowanceV32(
          "0xd68e5c52f7563486cc1a15d00efa12c8644a907e",
          account,
          parseEther(egcBalance.toString(), "wei").toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },

    [account, unLockCheckStatus, unlockBtn, egcBalance]
  );
  const UnlockToken = async (e) => {
    setIsLoading(true);
    setDisable(true);
    let ret = await unlockTokenV32(
      "0xd68e5c52f7563486cc1a15d00efa12c8644a907e",
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status == true) {
      setIsLoading(false);
      setDisable(false);
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setUnlockBtn(true);
    } else {
      if (ret.message.code == 4001) {
        console.log(ret);
      }
      console.log(ret);
      setErrorModal(true);
      setErrorMessage(ret.message);
      setIsLoading(false);
      setDisable(false);
    }
  };
  const convertToken = async () => {
    setIsLoading(true);
    setDisable(true);
    const res = await convertEgcToMartgpt(
      account,
      parseEther(ConvertAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    //   console.log(res.status, "somto8uhhhg");
    if (res.status == true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setSuccessMessage(
        "You've successfully converted " +
          ConvertAmount +
          " egc for " +
          ConvertAmount +
          " martgpt token"
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
                <div className="convertDivCont_body_container_1">
                  <div className="convertDivCont_body_container_1_title">
                    <span className="convertDivCont_body_container_1_title_span1">
                      Token In
                    </span>
                    <span className="convertDivCont_body_container_1_title_span1">
                      Balance: {egcBalance}
                    </span>
                  </div>
                  <div className="convertDivCont_body_container_1_body">
                    <input
                      type="number"
                      value={ConvertAmount}
                      onChange={AmountChange}
                      placeholder="amount"
                      className="convertDivCont_body_container_1_body_input"
                    />
                    <div className="convertDivCont_body_container_1_body_img_div">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="convertDivCont_body_container_1_body_img"
                      />
                    </div>
                  </div>
                </div>
                <div className="convertDivCont_body_container_1">
                  <div className="convertDivCont_body_container_1_title">
                    <span className="convertDivCont_body_container_1_title_span1">
                      Token Out
                    </span>
                    <span className="convertDivCont_body_container_1_title_span1">
                      Balance: {MGPTTBalance}
                    </span>
                  </div>
                  <div className="convertDivCont_body_container_1_body">
                    <input
                      type="number"
                      placeholder="amount"
                      value={ConvertAmount}
                      className="convertDivCont_body_container_1_body_input"
                    />
                    <div className="convertDivCont_body_container_1_body_img_div">
                      <img
                        src="/img/martgpt_logo_icon.svg"
                        alt=""
                        className="convertDivCont_body_container_1_body_img"
                      />
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
                          <> Approve EGC</>
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
                          <> Convert EGC</>
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
