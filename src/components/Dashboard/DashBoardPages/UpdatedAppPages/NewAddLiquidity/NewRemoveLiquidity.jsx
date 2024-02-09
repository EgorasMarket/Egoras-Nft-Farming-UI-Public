import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./NewAddLiquidity.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { API_URL } from "../../../../../actions/types";
import { config } from "../../../../../actions/Config";
import axios from "axios";
import {
  tokenBalance,
  checkAllowanceV3,
  unlockTokenV3,
} from "../../../../../web3/index";
import {
  addLiquidity,
  getUserSwapStats,
  removeLiquidity,
} from "../../../../../web3/index3";
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
const NewRemoveLiquidity = () => {
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
  const [tokenLp, setTokenLp] = useState(0);
  const [baseLp, setBaseLp] = useState(0);
  const [percent, setpercent] = useState(0);
  const [formatPercent, setFormatPercent] = useState(0);

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

  const removeTokenLiquidity = async () => {
    setIsLoading(true);
    let res = await removeLiquidity(selectedToken.ticker, library.getSigner());
    console.log(res);
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully removed " + selectedToken.ticker + " liquidity"
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

  useEffect(
    async (e) => {
      if (account) {
        let res = await getUserSwapStats(
          account,
          selectedToken.ticker,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._baseLp).toString());
        console.log(formatEther(res.message._tokenLp).toString());
        console.log(formatEther(res.message._userBaseLp).toString());
        console.log(formatEther(res.message._userTokenLp).toString());
        setTokenLp(formatEther(res.message._userTokenLp).toString());
        setBaseLp(formatEther(res.message._userBaseLp).toString());

        //           _base
        // :
        // BigNumber {_hex: '0x18fae27693b40000', _isBigNumber: true}
        // _baseLp
        // :
        // BigNumber {_hex: '0x049d8f6f366c652000', _isBigNumber: true}
        // _token
        // :
        // BigNumber {_hex: '0x0de0b6b3a7640000', _isBigNumber: true}
        // _tokenLp
        // :
        // BigNumber {_hex: '0x7fd3ab19deb3a9c0e6', _isBigNumber: true}
        // _userBaseLp
        // :
        // BigNumber {_hex: '0x0602a591d86000', _isBigNumber: true}
        // _userTokenLp
        // :
        // BigNumber {_hex: '0x03f44481a29000', _isBigNumber: true
        //       }
      }
    },
    [account, selectedToken]
  );
  const onChangePercent = (e) => {
    const FormatVal = parseFloat(e.target.value);
    setpercent(FormatVal);
    console.log(FormatVal);
    setFormatPercent(FormatVal / 100);
  };

  return (
    <div className="RemoveLiquidity_div">
      <div className="RemoveLiquidity_div_title">
        Your Liquidity{" "}
        <div className="RemoveLiquidity_div_title_para">
          Remove Liquidity to receive tokens back
        </div>
      </div>
      <div className="newAddLiquidityDiv_cont_div1">
        <div className="newAddLiquidityDiv_cont_div1_title">Select Pair</div>
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
                        src="/img/tokens-folder/usdt_icon.png"
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
                        src="/img/tokens-folder/busd_icon.png"
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
      {selectedToken.ticker === "" ? (
        <div className="newAddLiquidityDiv_cont_div2_select_pair_div">
          Select Pair
        </div>
      ) : (
        <div className="RemoveLiquidity_div_body">
          <div className="RemoveLiquidity_div_body_title">
            Remove {selectedToken1}_{selectedToken2} liquidity
          </div>
          <div className="RemoveLiquidity_div_body_cont">
            <div className="RemoveLiquidity_div_body_cont_1">
              <div className="RemoveLiquidity_div_body_cont_1_txt">Amount</div>
              <div className="RemoveLiquidity_div_body_cont_1_amount_div">
                <div className="RemoveLiquidity_div_body_cont_1_amount_percent">
                  {percent}%
                </div>
                <input
                  type="range"
                  value={percent}
                  onChange={onChangePercent}
                  name=""
                  id=""
                  className="RemoveLiquidity_div_body_cont_1_amount_div_range"
                />
                <div className="amnt_input_layer2">
                  <button
                    className="amnt_input_layer2_cont1"
                    onClick={() => {
                      setpercent(25);
                      setFormatPercent(25 / 100);
                    }}
                  >
                    25%
                  </button>
                  <button
                    className="amnt_input_layer2_cont1"
                    onClick={() => {
                      setpercent(50);
                      setFormatPercent(50 / 100);
                    }}
                  >
                    50%
                  </button>
                  <button
                    className="amnt_input_layer2_cont1"
                    onClick={() => {
                      setpercent(75);
                      setFormatPercent(75 / 100);
                    }}
                  >
                    75%
                  </button>
                  <button
                    className="amnt_input_layer2_cont1_last"
                    onClick={() => {
                      setpercent(100);
                      setFormatPercent(100 / 100);
                    }}
                  >
                    100%
                  </button>
                </div>
              </div>
            </div>
            <div className="RemoveLiquidity_div_body_cont_2b">
              <div className="RemoveLiquidity_div_body_cont_2_title">
                Your Position
              </div>
              <div className="RemoveLiquidity_div_body_cont_2_div">
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    <img
                      src="/img/egax_logo.png"
                      alt=""
                      className="tokenDrop_drop_div_cont_img"
                    />{" "}
                    {selectedToken2 === "USDT" ? (
                      <img
                        src="/img/tokens-folder/usdt_icon.png"
                        alt=""
                        className="tokenDrop_drop_div_cont_img2"
                      />
                    ) : (
                      <img
                        src="/img/tokens-folder/busd_icon.png"
                        alt=""
                        className="tokenDrop_drop_div_cont_img2"
                      />
                    )}
                    {selectedToken1}/{selectedToken2}
                  </div>
                  {/* <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    0.2333
                  </div> */}
                </div>
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    Your pool share:
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    0.00755%
                  </div>
                </div>
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    {selectedToken1}
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    {tokenLp}
                  </div>
                </div>
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    {selectedToken2}
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    {baseLp}
                  </div>
                </div>
              </div>
            </div>
            <div className="RemoveLiquidity_div_body_cont_2">
              <div className="RemoveLiquidity_div_body_cont_2_title">
                You will receive
              </div>
              <div className="RemoveLiquidity_div_body_cont_2_div">
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    <img
                      src="/img/egax_logo.png"
                      alt=""
                      className="tokenDrop_drop_div_cont_img"
                    />{" "}
                    {selectedToken1}
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    {parseFloat(formatPercent * tokenLp).toFixed(8)}
                  </div>
                </div>
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    {selectedToken2 === "USDT" ? (
                      <img
                        src="/img/tokens-folder/usdt_icon.png"
                        alt=""
                        className="tokenDrop_drop_div_cont_img"
                      />
                    ) : (
                      <img
                        src="/img/tokens-folder/busd_icon.png"
                        alt=""
                        className="tokenDrop_drop_div_cont_img"
                      />
                    )}

                    {selectedToken2}
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    {parseFloat(formatPercent * baseLp).toFixed(8)}
                  </div>
                </div>
              </div>
            </div>

            <div className="RemoveLiquidity_div_body_cont_2">
              <div className="RemoveLiquidity_div_body_cont_2_title">
                Prices
              </div>
              <div className="RemoveLiquidity_div_body_cont_2_div">
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    1{selectedToken1}=
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    {parseFloat(1.5).toFixed(4)}
                    {selectedToken2}
                  </div>
                </div>
                <div className="RemoveLiquidity_div_body_cont_2_div_cont1">
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_title">
                    1{selectedToken2}=
                  </div>
                  <div className="RemoveLiquidity_div_body_cont_2_div_cont1_amount">
                    {parseFloat(1 / 1.5).toFixed(4)}
                    {selectedToken1}
                  </div>
                </div>
              </div>
            </div>
            {account ? (
              <>
                {tokenLp <= 0 ? (
                  <button className="updatedSwapSwapBtn" disabled>
                    No Lp Provided
                  </button>
                ) : (
                  <>
                    {unlockBtn === false ? (
                      <button
                        id="generate"
                        disabled={DisableToken}
                        onClick={UnlockToken}
                        class="updatedSwapSwapBtn"
                      >
                        {isLoadingUnlckTkn ? (
                          <ScaleLoader color="#353250" size={10} height={20} />
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
                          <ScaleLoader color="#353250" size={10} height={20} />
                        ) : (
                          <> Approve {selectedToken2}</>
                        )}
                      </button>
                    ) : null}

                    {unlockBtn === true && unlockBtn2 === true ? (
                      <>
                        {parseFloat(formatPercent * tokenLp).toFixed(8) <= 0 ? (
                          <button className="updatedSwapSwapBtn" disabled>
                            Enter Amount
                          </button>
                        ) : (
                          <button
                            className="updatedSwapSwapBtn"
                            onClick={removeTokenLiquidity}
                            disabled={Disable}
                          >
                            {isLoading ? (
                              <ScaleLoader
                                color="#353250"
                                size={10}
                                height={20}
                              />
                            ) : (
                              <> Remove liquidity</>
                            )}
                          </button>
                        )}
                      </>
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <button className="updatedSwapSwapBtn" disabled>
                Connect wallet
              </button>
            )}
          </div>
        </div>
      )}

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

export default NewRemoveLiquidity;
