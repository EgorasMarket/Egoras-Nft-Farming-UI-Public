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
import { tokenBalance } from "../../../../../web3/index";
import { addLiquidity } from "../../../../../web3/index3";
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
  const [tokenBal, setTokenBal] = useState("0");
  const [baseBal, setBaseBal] = useState("0");
  const [tokenAmount, setTokenAmount] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [txHash, setTxHash] = useState("");

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
        setTokenBal(parseFloat(formatEther(res.message._hex)).toFixed(2));
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
        setBaseBal(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account, selectedToken]
  );
  const changeTokenAmount = (event) => {
    setTokenAmount(event.target.value);
    console.log(event.target.value);
  };
  const changeBaseAmount = (event) => {
    setBaseAmount(event.target.value);
    console.log(event.target.value);
  };

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
  return (
    <div className="other2">
      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="swapDivCont">
            <div className="liquidity_area">
              <div className="liquidity_area1">
                <div className="swap_container_settings_cont">
                  <div className="swap_container_settings_cont_area1">
                    Add Liquidity
                  </div>
                </div>
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
                              <span className="newAddLiquidityDiv_cont_div2_cont1_span2">
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
                              <span className="newAddLiquidityDiv_cont_div2_cont1_span2">
                                <AccountBalanceWalletIcon className="newAddLiquidityDiv_cont_div2_cont1_span2_icon" />{" "}
                                {baseBal}
                              </span>{" "}
                            </div>
                            <input
                              type="text"
                              placeholder="0.00"
                              className="newAddLiquidityDiv_cont_div2_cont1_input"
                              value={baseAmount}
                              onChange={changeBaseAmount}
                            />
                          </div>
                          {account ? (
                            <>
                              {tokenBal <= 0 || baseBal <= 0 ? (
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
                                      color="#353250"
                                      size={10}
                                      height={20}
                                    />
                                  ) : (
                                    <> Add liquidity</>
                                  )}
                                </button>
                              )}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewAddLiquidity;
