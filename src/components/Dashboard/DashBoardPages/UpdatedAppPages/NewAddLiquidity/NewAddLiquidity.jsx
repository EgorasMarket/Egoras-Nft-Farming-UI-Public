import React, { useState, useEffect } from "react";
import "./NewAddLiquidity.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SouthIcon from "@mui/icons-material/South";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { API_URL } from "../../../../../actions/types";
import { config } from "../../../../../actions/Config";
import axios from "axios";
import {
  tokenBalance,
  checkAllowanceV3,
  unlockTokenV3,
} from "../../../../../web3/index";
import { addLiquidity } from "../../../../../web3/index3";
import { getPriceOracle } from "../../../../../web3/index2";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedSuccessModal from "../UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "../UpdatedSuccessErrorModals/UpdatedErrorModal";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

const NewAddLiquidity = () => {
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
  const [tokenDrop, setTokenDrop] = useState(false);
  const [ListedTokens, setListedTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState({
    id: "",
    ticker: "",
    token_address: "",
    base_address: "",
  });
  const [selectedToken1, setSelectedToken1] = useState("");
  const [selectedToken2, setSelectedToken2] = useState("");
  const [tokenBal, setTokenBal] = useState(0);
  const [baseBal, setBaseBal] = useState(0);
  const [tokenAmount, setTokenAmount] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUnlckTkn, setIsLoadingUnlckTkn] = useState(false);
  const [isLoadingUnlckBase, setIsLoadingUnlckBase] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [DisableToken, setDisableToken] = useState(false);
  const [DisableBase, setDisableBase] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const [unlockBtn2, setUnlockBtn2] = useState(true);
  const [unLockCheckStatus2, setUnLockCheckStatus2] = useState(false);

  useEffect(async () => {
    await axios
      .get(API_URL + "/listed/assets/all", null, config)
      .then((data) => {
        console.log(data.data.data);
        setListedTokens(data.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const toggleTokenDrop = () => {
    setTokenDrop(!tokenDrop);
  };
  const handleTokenClick = (id, ticker, token_address, base_address) => {
    setSelectedToken({
      id: id,
      ticker: ticker,
      token_address: token_address,
      base_address: base_address,
    });

    console.log(ticker);
    const [tokenPart1, tokenPart2] = ticker.split("_");
    setSelectedToken1(tokenPart1);
    setSelectedToken2(tokenPart2);
    setTokenAmount("");
    setBaseAmount("");
  };

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          selectedToken.token_address,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setTokenBal(parseFloat(formatEther(res.message._hex)).toFixed(6));
      }
    },
    [account, selectedToken]
  );
  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          selectedToken.base_address,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setBaseBal(parseFloat(formatEther(res.message._hex)).toFixed(4));
      }
    },
    [account, selectedToken]
  );
  const changeTokenAmount = async (event) => {
    setTokenAmount(event.target.value);
    console.log(event.target.value);
    if (account) {
      let res = await getPriceOracle("EGAX_USDT", library.getSigner());
      console.log(res);
      console.log(parseFloat(formatEther(res.message._hex)).toFixed(2));
      setBaseAmount(
        event.target.value *
          parseFloat(formatEther(res.message._hex)).toFixed(2)
      );
      return;
    }
  };
  //   const changeBaseAmount = (event) => {
  //     setBaseAmount(event.target.value);
  //     console.log(event.target.value);
  //   };

  const addTokenLiquidity = async () => {
    setIsLoading(true);
    let res = await addLiquidity(
      parseEther(baseAmount.toString(), "wei").toString(),
      parseEther(tokenAmount.toString(), "wei").toString(),
      selectedToken.ticker,
      library.getSigner()
    );
    console.log(res);
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully added " + selectedToken.ticker + " liquidity"
      );
    } else {
      console.log(res);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };

  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  console.log(tokenBal, parseInt(baseBal));

  const UnlockToken = async () => {
    setIsLoadingUnlckTkn(true);
    setDisableToken(true);
    let ret = await unlockTokenV3(
      selectedToken.token_address,
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status === true) {
      setIsLoadingUnlckTkn(false);
      setDisableToken(false);
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
      setIsLoadingUnlckTkn(false);
      setDisableToken(false);
    }
  };

  useEffect(
    async (e) => {
      if (account) {
        let check = await checkAllowanceV3(
          selectedToken.token_address,
          account,
          parseEther(
            tokenAmount == "" ? "0" : tokenAmount.toString(),
            "wei"
          ).toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },

    [account, unLockCheckStatus, tokenAmount, selectedToken.token_address]
  );

  const UnlockToken2 = async () => {
    setIsLoadingUnlckBase(true);
    setDisableBase(true);
    let ret = await unlockTokenV3(
      selectedToken.base_address,
      parseEther("180000000000000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    console.log(ret);
    if (ret.status === true) {
      setIsLoadingUnlckBase(false);
      setDisableBase(false);
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
      setIsLoadingUnlckBase(false);
      setDisableBase(false);
    }
  };

  useEffect(
    async (e) => {
      if (account) {
        let check = await checkAllowanceV3(
          selectedToken.base_address,
          account,
          parseEther(
            baseAmount == "" ? "0" : baseAmount.toString(),
            "wei"
          ).toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus2(check.status);
        setUnlockBtn2(check.status);
      }
    },

    [account, unLockCheckStatus2, baseAmount, selectedToken.base_address]
  );

  return (
    <div className="liquidity_area1">
      <div className="liquidity_cont">
        <div className="newAddLiquidityDiv">
          <div className="newAddLiquidityDiv_cont">
            <div className="newAddLiquidityDiv_cont_div1">
              <div className="newAddLiquidityDiv_cont_div1_title">
                Select Pair
              </div>
              <div
                className="newAddLiquidityDiv_cont_div1_div"
                onClick={toggleTokenDrop}
              >
                {selectedToken.ticker === "" ? (
                  "Select"
                ) : (
                  <div className="selectedToken_txt">
                    {selectedToken.ticker === "EGAX_USDT" ? (
                      <>
                        {" "}
                        <img
                          src="/img/egax_logo.png"
                          alt=""
                          className="tokenDrop_drop_div_cont_img"
                        />{" "}
                        <img
                          src="/img//tokens-folder/usdt_icon.png"
                          alt=""
                          className="tokenDrop_drop_div_cont_img2"
                        />
                      </>
                    ) : selectedToken.ticker === "EGAX_EUSD" ? (
                      <>
                        {" "}
                        <img
                          src="/img/egax_logo.png"
                          alt=""
                          className="tokenDrop_drop_div_cont_img"
                        />{" "}
                        <img
                          src="/img//tokens-folder/busd_icon.png"
                          alt=""
                          className="tokenDrop_drop_div_cont_img2"
                        />
                      </>
                    ) : null}
                    {selectedToken.ticker}
                  </div>
                )}

                <ExpandMoreIcon className="newAddLiquidityDiv_cont_div1_div_icon" />
                {tokenDrop ? (
                  <div className="tokenDrop_drop_div">
                    {ListedTokens.map((data) => (
                      <div
                        className="tokenDrop_drop_div_cont"
                        onClick={() =>
                          handleTokenClick(
                            data.id,
                            data.ticker,
                            data.token_address,
                            data.base_address
                          )
                        }
                      >
                        {data.ticker === "EGAX_USDT" ? (
                          <>
                            {" "}
                            <img
                              src="/img/egax_logo.png"
                              alt=""
                              className="tokenDrop_drop_div_cont_img"
                            />{" "}
                            <img
                              src="/img//tokens-folder/usdt_icon.png"
                              alt=""
                              className="tokenDrop_drop_div_cont_img2"
                            />
                          </>
                        ) : data.ticker === "EGAX_EUSD" ? (
                          <>
                            {" "}
                            <img
                              src="/img/egax_logo.png"
                              alt=""
                              className="tokenDrop_drop_div_cont_img"
                            />{" "}
                            <img
                              src="/img//tokens-folder/busd_icon.png"
                              alt=""
                              className="tokenDrop_drop_div_cont_img2"
                            />
                          </>
                        ) : null}
                        {data.ticker}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <SouthIcon className="newAddLiquidityDiv_cont_icon" />
            {selectedToken.ticker === "" ? (
              <div className="newAddLiquidityDiv_cont_div2_select_pair_div">
                Select Pair
              </div>
            ) : (
              <div className="newAddLiquidityDiv_cont_div2">
                <div className="newAddLiquidityDiv_cont_div2_cont1">
                  <div className="newAddLiquidityDiv_cont_div2_cont1_spans">
                    <span className="newAddLiquidityDiv_cont_div2_cont1_span1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="newAddLiquidityDiv_cont_div2_cont1_span1_img"
                      />{" "}
                      {selectedToken1}
                    </span>{" "}
                    <span
                      className="newAddLiquidityDiv_cont_div2_cont1_span2"
                      onClick={() => {
                        setTokenAmount(tokenBal);
                      }}
                    >
                      <AccountBalanceWalletIcon className="newAddLiquidityDiv_cont_div2_cont1_span2_icon" />{" "}
                      {tokenBal}
                    </span>{" "}
                  </div>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="newAddLiquidityDiv_cont_div2_cont1_input"
                    value={tokenAmount}
                    onChange={changeTokenAmount}
                  />
                </div>
                <div className="newAddLiquidityDiv_cont_div2_cont1">
                  <div className="newAddLiquidityDiv_cont_div2_cont1_spans">
                    <span className="newAddLiquidityDiv_cont_div2_cont1_span1">
                      {" "}
                      {selectedToken2 === "USDT" ? (
                        <img
                          src="/img//tokens-folder/usdt_icon.png"
                          alt=""
                          className="newAddLiquidityDiv_cont_div2_cont1_span1_img"
                        />
                      ) : (
                        <img
                          src="/img//tokens-folder/busd_icon.png"
                          alt=""
                          className="newAddLiquidityDiv_cont_div2_cont1_span1_img"
                        />
                      )}
                      {selectedToken2}{" "}
                    </span>{" "}
                    <span
                      className="newAddLiquidityDiv_cont_div2_cont1_span2"
                      // onClick={() => {
                      //   setBaseAmount(baseBal);
                      // }}
                    >
                      <AccountBalanceWalletIcon className="newAddLiquidityDiv_cont_div2_cont1_span2_icon" />{" "}
                      {baseBal}
                    </span>{" "}
                  </div>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="newAddLiquidityDiv_cont_div2_cont1_input"
                    value={baseAmount}
                    //   onChange={changeBaseAmount}
                  />
                </div>
                {account ? (
                  <>
                    {unlockBtn === false ? (
                      <button
                        id="generate"
                        disabled={DisableToken}
                        onClick={UnlockToken}
                        class="updatedSwapSwapBtn"
                      >
                        {isLoadingUnlckTkn ? (
                          <ScaleLoader color="#2c734e" size={10} height={20} />
                        ) : (
                          <> Approve {selectedToken1}</>
                        )}
                      </button>
                    ) : null}

                    {unlockBtn2 === false ? (
                      <button
                        id="generate"
                        disabled={DisableBase}
                        onClick={UnlockToken2}
                        class="updatedSwapSwapBtn"
                      >
                        {isLoadingUnlckBase ? (
                          <ScaleLoader color="#2c734e" size={10} height={20} />
                        ) : (
                          <> Approve {selectedToken2}</>
                        )}
                      </button>
                    ) : null}

                    {unlockBtn === true && unlockBtn2 === true ? (
                      <>
                        {tokenAmount <= 0 ? (
                          <button className="updatedSwapSwapBtn" disabled>
                            Enter Amount
                          </button>
                        ) : (
                          <>
                            {parseFloat(tokenBal) <= 0 ||
                            parseFloat(baseBal) <= 0 ? (
                              <button className="updatedSwapSwapBtn" disabled>
                                Insufficient Balance
                              </button>
                            ) : (
                              <button
                                className="updatedSwapSwapBtn"
                                onClick={addTokenLiquidity}
                                disabled={Disable}
                              >
                                {isLoading ? (
                                  <ScaleLoader
                                    color="#2c734e"
                                    size={10}
                                    height={20}
                                  />
                                ) : (
                                  <> Add liquidity</>
                                )}
                              </button>
                            )}
                          </>
                        )}
                      </>
                    ) : null}
                  </>
                ) : (
                  <button className="updatedSwapSwapBtn" disabled>
                    Connect wallet
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
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
          route="/app/addLiquidity"
          txnHashDiv={true}
          TxnHash={txHash}
        />
      ) : null}
    </div>
  );
};

export default NewAddLiquidity;
