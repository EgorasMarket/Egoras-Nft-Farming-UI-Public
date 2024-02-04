import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import RefreshIcon from "@mui/icons-material/Refresh";
import { RefreshIcon } from "../../../../../RefreshIcon";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ClockLoader from "react-spinners/ClockLoader";
import TradingViewWidget from "./TradeViewWidget";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import v3ContractAdress from "../../../../../web3/contracts/V3/V3ContractAddress.json";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import "./UpdatedSwap.css";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import { UpdatedTokenModal } from "./TokenModal/UpdatedTokenModal";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment/moment";
import Web3 from "web3";
import PulseLoader from "react-spinners/PulseLoader";
import UpdatedSuccessModal from "../UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "../UpdatedSuccessErrorModals/UpdatedErrorModal";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  getBNBAddress,
  swapEusdForBnb,
  swapBnbForEusd,
  swapEusdForToken,
  swapTokenForEusd,
  getAmountsIn,
  getAmountsOut,
  getPriceOracle,
} from "../../../../../web3/index2";
import {
  tokenBalance,
  checkAllowanceV3,
  unlockTokenV3,
} from "../../../../../web3/index";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StaticData from "../../../../../Static/ListedCoins";
// import axios from "axios";
// import { API_URL } from "../../../../../actions/types";
// import { config } from "../../../../../actions/Config";

const UpdatedSwap = () => {
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
  const [tokenModal, setTokenModal] = useState(false);
  const [tokenModal2, setTokenModal2] = useState(false);
  const [id, setId] = useState("0");
  const [id2, setId2] = useState("");
  const [SwapAmount, setSwapAmount] = useState("");
  const [swapBaseAmount, setSwapBaseAmount] = useState("");
  const [SwapBalance, setSwapBalance] = useState("");
  const [shareSwap, setShareSwap] = useState(false);
  const [isAmountLoading, setIsAmountLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [baseFromAddress, setBaseFromAddress] = useState("");
  const [baseToAddress, setBaseToAddress] = useState("");
  const [SwapFromAddress, setSwapFromAddress] = useState("");
  const [SwapToAddress, setSwapToAddress] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [unlockBtn, setUnlockBtn] = useState(true);
  const [unLockCheckStatus, setUnLockCheckStatus] = useState(false);
  const [coinBalance, setCoinBalance] = useState("0");
  const [baseBalance, setBaseBalance] = useState("0");
  const [txHash, setTxHash] = useState("");
  const [eusdSmartContractBal, setEusdSmartContractBal] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [slippageInput, setSlippageInput] = useState("");
  const [lowSlippageDiv, setLowSlipageDiv] = useState(false);
  const [highSlippageDiv, setHighSlipageDiv] = useState(false);
  const [maxSlippageDisplay, setmaxSlippageDisplay] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [displayChart, setDisplayChart] = useState(false);
  const [amountsOut, setAmountsOut] = useState("");
  const [MinamountsOut, setMinAmountsOut] = useState("");
  const [assetsBase, setAssetBase] = useState({
    id: "0",
    img: "/img/tokens-folder/busd_icon.png",
    symbol: "EGAX",
    address: "0x1F467B61Da084784AfB0f5BdA14554A30Bb5A5b7",
    name: "Egochain Gas Coin",
    favorite: "true",
  });
  const [assets, setAssets] = useState({
    id: "2",
    img: "/img/tokens-folder/usdt_icon.png",
    name: "Tether USD",
    address: "0x55d398326f99059fF775485246999027B3197955",
    symbol: "USDT",
    favorite: "true",
  });
  // const [inputDisable, setmaxSlippageDisplay] = useState(false);
  const [insufficientLiquidityBtn, setInsufficientLiquidityBtn] =
    useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  // const [eus, setIsAmountLoading] = useState(false);

  useEffect(() => {
    setSwapFromAddress(assetsBase.address);
    setSwapToAddress(assets.address);
    console.log(assetsBase.address);
    // setInitialBaseFromAddress(assetsBase[0].PriceAddress);
  }, []);

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          assetsBase.address,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setCoinBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account]
  );

  useEffect(
    async (e) => {
      if (account) {
        let res = await tokenBalance(
          assets.address,
          account,
          library.getSigner()
        );
        console.log(res);
        console.log(formatEther(res.message._hex));
        setBaseBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
      }
    },
    [account]
  );

  const ToggleSwapInputs = (e) => {
    setAssets(assetsBase);
    setAssetBase(assets);
    setBaseBalance(coinBalance);
    setCoinBalance(baseBalance);
  };

  const add25Per = async (balance) => {
    setIsAmountLoading(true);
    setSwapAmount(balance * 0.25);
    const response = await getAmountsOut(
      parseEther((balance * 0.25).toString(), "wei").toString(),
      [assetsBase.address, assets.address],
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsAmountLoading(false);
      setAmountsOut(formatEther(response.message[1]._hex));
      const maxSlippage = parseFloat(slippage) / 100;
      setMinAmountsOut(
        formatEther(response.message[1]._hex) * (1 - maxSlippage)
      );
      console.log(formatEther(response.message[1]._hex));
    } else {
      setIsAmountLoading(false);
      console.log(response);
    }
    // setSwapBaseAmount(SwapAmount * 4);
  };
  const add50Per = async (balance) => {
    // setSwapAmount(balance * 0.5);
    setIsAmountLoading(true);
    setSwapAmount(balance * 0.5);
    const response = await getAmountsOut(
      parseEther((balance * 0.5).toString(), "wei").toString(),
      [assetsBase.address, assets.address],
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsAmountLoading(false);
      setAmountsOut(formatEther(response.message[1]._hex));
      const maxSlippage = parseFloat(slippage) / 100;
      setMinAmountsOut(
        formatEther(response.message[1]._hex) * (1 - maxSlippage)
      );
      console.log(formatEther(response.message[1]._hex));
    } else {
      setIsAmountLoading(false);
      console.log(response);
    }
  };
  const add75Per = async (balance) => {
    setIsAmountLoading(true);
    setSwapAmount(balance * 0.75);
    const response = await getAmountsOut(
      parseEther((balance * 0.75).toString(), "wei").toString(),
      [assetsBase.address, assets.address],
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsAmountLoading(false);
      setAmountsOut(formatEther(response.message[1]._hex));
      const maxSlippage = parseFloat(slippage) / 100;
      setMinAmountsOut(
        formatEther(response.message[1]._hex) * (1 - maxSlippage)
      );
      console.log(formatEther(response.message[1]._hex));
    } else {
      setIsAmountLoading(false);
      console.log(response);
    }
  };
  const add100Per = async (balance) => {
    setIsAmountLoading(true);
    setSwapAmount(balance * 1);
    const response = await getAmountsOut(
      parseEther((balance * 1).toString(), "wei").toString(),
      [assetsBase.address, assets.address],
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsAmountLoading(false);
      setAmountsOut(formatEther(response.message[1]._hex));
      const maxSlippage = parseFloat(slippage) / 100;
      setMinAmountsOut(
        formatEther(response.message[1]._hex) * (1 - maxSlippage)
      );
      console.log(formatEther(response.message[1]._hex));
    } else {
      setIsAmountLoading(false);
      console.log(response);
    }
  };
  // ================================
  // ================================
  // ================================
  // ================================
  // ===========Swap Functions End=====================
  // ================================
  // ================================
  // ================================
  // ================================
  // ================================
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // ================================
  // ================================
  // ================================
  // ===========Trade View Functions Start=====================
  // ================================
  // ================================
  // ================================
  // ================================

  const ToggleShareSwap = () => {
    setShareSwap(!shareSwap);
  };

  const ToggleDisplayChart = () => {
    setDisplayChart(!displayChart);
  };

  const UnlockToken = async () => {
    setIsLoading(true);
    setDisable(true);

    let ret = await unlockTokenV3(
      SwapFromAddress,
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
          SwapFromAddress,
          account,
          parseEther(SwapAmount.toString(), "wei").toString(),
          library.getSigner()
        );
        console.log(check);
        setUnLockCheckStatus(check.status);
        setUnlockBtn(check.status);
      }
    },

    [account, unLockCheckStatus, SwapAmount, SwapFromAddress]
  );

  const SwapEusdForBnb = async () => {
    setIsLoading(true);
    setDisable(true);
    console.log(SwapFromAddress, SwapAmount, MinamountsOut);
    const response = await swapEusdForBnb(
      SwapFromAddress,
      parseEther(SwapAmount.toString(), "wei").toString(),
      parseEther(MinamountsOut.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(response.message.hash);
      setSuccessMessage(
        "You've successfully swapped " +
          SwapAmount +
          "Eusd for " +
          amountsOut +
          "Bnb"
      );
    } else {
      console.log(response);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(response.message);
    }
  };

  // ============
  // ============
  // ============
  const SwapEusdForTokens = async () => {
    console.log("====================================");
    console.log(SwapFromAddress, SwapToAddress);
    console.log("====================================");
    setIsLoading(true);
    setDisable(true);
    const response = await swapEusdForToken(
      parseEther(SwapAmount.toString(), "wei").toString(),
      parseEther(MinamountsOut.toString(), "wei").toString(),
      [SwapFromAddress, SwapToAddress],
      library.getSigner()
    );

    console.log(response, "SwapEusdForTokens");
    if (response.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(response.message.hash);
      setSuccessMessage(
        "You've successfully swapped " + SwapAmount + "Eusd for " + amountsOut
      );
    } else {
      console.log(response);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(response.message);
    }
  };
  const SwapTokensForEusd = async () => {
    setIsLoading(true);
    setDisable(true);
    const response = await swapTokenForEusd(
      parseEther(SwapAmount.toString(), "wei").toString(),
      parseEther(MinamountsOut.toString(), "wei").toString(),
      [SwapFromAddress, SwapToAddress],
      library.getSigner()
    );
    console.log(response, "SwapTokensForEusd");
    if (response.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(response.message.hash);
      setSuccessMessage(
        "You've successfully swapped " + SwapAmount + "Eusd for " + amountsOut
      );
    } else {
      console.log(response);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(response.message);
    }
  };
  // ============
  // ============
  // ============
  const SwapbnbForEusd = async () => {
    setIsLoading(true);
    setDisable(true);
    const response = await swapBnbForEusd(
      parseEther(SwapAmount.toString(), "wei").toString(),
      parseEther(MinamountsOut.toString(), "wei").toString(),
      SwapToAddress,
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(response.message.hash);
      setSuccessMessage(
        "You've successfully swapped " +
          SwapAmount +
          "Bnb for " +
          amountsOut +
          "Eusd"
      );
    } else {
      setErrorMessage(response.message);
      console.log(response);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
    }
  };
  // when swapping use the egoras eusd address
  // when getting price use the binance busd address

  const onChangeSwapAmount = async (e) => {
    setIsAmountLoading(true);
    setDisable(true);
    // setInputDisabled(true);
    setSwapAmount(e.target.value);
    // console.log(baseFromAddress, baseToAddress);
    const response = await getAmountsOut(
      parseEther(e.target.value.toString(), "wei").toString(),
      [assetsBase.address, assets.address],
      library.getSigner()
    );
    console.log(response);
    console.log(response);
    console.log(formatEther(response.message[1]._hex).toString());
    console.log(formatEther(response.message[0]._hex).toString());
    if (response.status === true) {
      setIsAmountLoading(false);
      setDisable(false);
      setAmountsOut(formatEther(response.message[1]._hex));
      const maxSlippage = parseFloat(slippage) / 100;
      setMinAmountsOut(
        formatEther(response.message[1]._hex) * (1 - maxSlippage)
      );
      console.log(formatEther(response.message[1]._hex));
      console.log(formatEther(response.message[0]._hex));
    } else {
      setIsAmountLoading(false);
      setDisable(false);
      console.log(response);
    }
  };

  useEffect(() => {
    if (SwapAmount === "") {
      console.log("it is gone");
      setAmountsOut("");
      setIsAmountLoading(false);
    }
    if (SwapAmount === "" || amountsOut === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [SwapAmount, amountsOut]);

  const CloseSuccessModal = () => {
    setSuccessModal(false);
  };

  const CloseErrorModal = () => {
    setErrorModal(false);
  };

  useEffect(() => {
    if (SwapAmount > coinBalance) {
      setInsufficientBalance(true);
    } else {
      setInsufficientBalance(false);
    }
  }, [SwapAmount, coinBalance]);

  // =================
  // =================
  // =================
  // =================

  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  const ToggleMaxSlippageDiv = () => {
    setmaxSlippageDisplay(!maxSlippageDisplay);
  };
  const ToggleActiveSlippageBg = (e) => {
    let id = e.currentTarget.id;
    setSlippage(id);
    const maxSlippage = parseFloat(id) / 100;
    setMinAmountsOut(amountsOut * (1 - maxSlippage));
    setSlippageInput("");
  };
  const slippageChange = (e) => {
    setSlippage(e.target.value);
    setSlippageInput(e.target.value);
    const maxSlippage = parseFloat(e.target.value) / 100;
    setMinAmountsOut(amountsOut * (1 - maxSlippage));
    if (parseInt(e.target.value) > 20) {
      setSlippageInput("20");
      setSlippage("20");
      const maxSlippage = parseFloat("20") / 100;
      setMinAmountsOut(amountsOut * (1 - maxSlippage));
    } else {
      setSlippageInput(e.target.value);
      setSlippage(e.target.value);
      const maxSlippage = parseFloat(e.target.value) / 100;
      setMinAmountsOut(amountsOut * (1 - maxSlippage));
    }
    if (e.target.value <= 0) {
      setSlippage("0.5");
      const maxSlippage = parseFloat("0.5") / 100;
      setMinAmountsOut(amountsOut * (1 - maxSlippage));
    } else {
      setSlippage(e.target.value);
      const maxSlippage = parseFloat(e.target.value) / 100;
      setMinAmountsOut(amountsOut * (1 - maxSlippage));
    }
  };
  useEffect(() => {
    if (parseFloat(slippage) < 0.1) {
      setLowSlipageDiv(true);
    } else {
      setLowSlipageDiv(false);
    }
    if (parseInt(slippage) > 5) {
      setHighSlipageDiv(true);
    } else {
      setHighSlipageDiv(false);
    }
  }, [slippage]);
  console.log(slippage);
  console.log(highSlippageDiv);
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================

  // =================
  // =================
  // =================
  // =================
  const getamount = async () => {
    setIsAmountLoading(true);
    setDisable(true);
    const response = await getAmountsOut(
      parseEther(SwapAmount.toString(), "wei").toString(),
      [assetsBase.address, assets.address],
      library.getSigner()
    );
    console.log(response);
    if (response.status === true) {
      setIsAmountLoading(false);
      setDisable(false);
      setAmountsOut(formatEther(response.message[1]._hex));
      const maxSlippage = parseFloat(slippage) / 100;
      setMinAmountsOut(
        formatEther(response.message[1]._hex) * (1 - maxSlippage)
      );
      console.log(maxSlippage);
      console.log(slippage);
      console.log(formatEther(response.message[1]._hex));
      console.log(formatEther(response.message[1]._hex) * (1 - maxSlippage));
    } else {
      setDisable(false);
      setIsAmountLoading(false);
      console.log(response);
    }
  };

  return (
    <div className="other2">
      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="swapDivCont">
            <div className="liquidity_area">
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              <div className="liquidity_area1">
                <div className="swap_container_settings_cont">
                  <div className="swap_container_settings_cont_area1">Swap</div>
                  <div className="swap_container_settings_cont_area2">
                    <InfoOutlinedIcon className="swap_container_settings_cont_area2_icon" />
                    <ShareOutlinedIcon
                      className="swap_container_settings_cont_area2_icon2"
                      onClick={ToggleShareSwap}
                    />
                  </div>
                </div>
                <div className="liquidity_cont">
                  <div className="liquidity_cont_body">
                    <div className="liquidity_cont_body_conts">
                      <div className="liquidity_cont_body_conts_cont1">
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
                                  // aria-autocomplete="off"
                                  onChange={onChangeSwapAmount}
                                  value={SwapAmount}
                                  // disabled={inputDisabled ? "disabled" : ""}
                                />
                              </div>

                              <div
                                className="Swap_icondropDownDiv"
                                // data-index={data.address}
                              >
                                <span className="token_balances_span">
                                  <AccountBalanceWalletIcon className="TokenBalanceIcon" />
                                  :{coinBalance}
                                </span>

                                <button className="display_tokens_drop">
                                  <img
                                    src={assetsBase.img}
                                    alt=""
                                    className="asset_icon"
                                  />
                                  {assetsBase.symbol}
                                </button>
                              </div>
                            </div>
                            <div className="amnt_input_layer2">
                              <button
                                className="amnt_input_layer2_cont1"
                                onClick={() => add25Per(coinBalance)}
                              >
                                25%
                              </button>
                              <button
                                className="amnt_input_layer2_cont1"
                                onClick={() => add50Per(coinBalance)}
                              >
                                50%
                              </button>
                              <button
                                className="amnt_input_layer2_cont1"
                                onClick={() => add75Per(coinBalance)}
                              >
                                75%
                              </button>
                              <button
                                className="amnt_input_layer2_cont1_last"
                                onClick={() => add100Per(coinBalance)}
                              >
                                100%
                              </button>
                            </div>
                          </div>
                        </div>

                        <SwapVertIcon
                          className="toggle_swap_inputs"
                          onClick={ToggleSwapInputs}
                        />

                        <div className="input_amnt_layer">
                          <div className="amnt_input">
                            <div className="amnt_input_layer1">
                              <div className="amnt_input_layer1_input_div">
                                {isAmountLoading ? (
                                  <div className="amount_loading_div">
                                    <PulseLoader
                                      color="#353250"
                                      size={20}
                                      height={20}
                                    />
                                  </div>
                                ) : (
                                  <input
                                    type="number"
                                    name="number"
                                    id="number"
                                    placeholder="0.00"
                                    className="amnt_input_field"
                                    autocomplete="off"
                                    value={amountsOut}
                                  />
                                )}
                              </div>
                              <div className="Swap_icondropDownDiv">
                                <span className="token_balances_span">
                                  <AccountBalanceWalletIcon className="TokenBalanceIcon" />
                                  :{baseBalance}
                                </span>

                                <button className="display_tokens_drop">
                                  <img
                                    src={assets.img}
                                    alt=""
                                    className="asset_icon"
                                  />
                                  {assets.symbol}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="max_slippage_display_details_div">
                        <div className="swap_price_slippage_div_cont_div">
                          <div className="swap_price_slippage_div">
                            <div className="swap_price_slippage_div1">
                              Max Slippage{" "}
                              <InfoOutlinedIcon className="swap_price_slippage_info_icon" />
                              :
                            </div>
                            <div
                              className="swap_price_slippage_div2"
                              onClick={ToggleMaxSlippageDiv}
                            >
                              {slippage}%{" "}
                              <ArrowDropDownIcon className="swap_price_slippage_div2_icon" />
                            </div>
                          </div>

                          <div className="resfresh_icon_div">
                            {SwapAmount <= "0" ? null : (
                              <>
                                <RefreshIcon
                                  callGetAmountsOut={getamount}
                                  SwapAmount={SwapAmount}
                                  MinamountsOut={MinamountsOut}
                                />
                                <span className="resfresh_icon_div_span">
                                  Upadting...
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {maxSlippageDisplay ? (
                          <div className="max_slippageDisplayDiv">
                            <div
                              className={
                                slippage === "0.05"
                                  ? "max_slippageDisplayDiv1_active_warning"
                                  : "max_slippageDisplayDiv1"
                              }
                              onClick={ToggleActiveSlippageBg}
                              id="0.05"
                            >
                              0.05%
                            </div>
                            <div
                              className={
                                "0.1" === slippage
                                  ? "max_slippageDisplayDiv1_active"
                                  : "max_slippageDisplayDiv1"
                              }
                              onClick={ToggleActiveSlippageBg}
                              id="0.1"
                            >
                              0.1%
                            </div>
                            <div
                              className={
                                "0.5" === slippage
                                  ? "max_slippageDisplayDiv1_active"
                                  : "max_slippageDisplayDiv1"
                              }
                              onClick={ToggleActiveSlippageBg}
                              id="0.5"
                            >
                              0.5%
                            </div>
                            <div
                              className={
                                "1" === slippage
                                  ? "max_slippageDisplayDiv1_active"
                                  : "max_slippageDisplayDiv1"
                              }
                              onClick={ToggleActiveSlippageBg}
                              id="1"
                            >
                              1%
                            </div>
                            <div
                              className={
                                highSlippageDiv === true
                                  ? "custom_slippage_input_div_active_warning"
                                  : slippage > 1
                                  ? "custom_slippage_input_div_active"
                                  : slippage < "0.1" && slippage !== "0.05"
                                  ? "custom_slippage_input_div_active_warning"
                                  : "custom_slippage_input_div"
                              }
                            >
                              <input
                                type="number"
                                className="custom_slippage_input"
                                placeholder="Custom"
                                value={slippageInput}
                                onChange={slippageChange}
                                // disabled={inputDisabled}
                              />
                              <span className="custom_slippage_input_div_span">
                                %
                              </span>
                            </div>
                          </div>
                        ) : null}

                        {highSlippageDiv ? (
                          <div className="slippageWarningDiv">
                            <span className="slippageWarningDiv_span">
                              <WarningAmberRoundedIcon className="slippageWarningDiv_span_icon" />{" "}
                              Slippage
                            </span>{" "}
                            is high. Your transaction may be front-run
                          </div>
                        ) : null}

                        {lowSlippageDiv ? (
                          <div className="slippageWarningDiv">
                            <span className="slippageWarningDiv_span">
                              <WarningAmberRoundedIcon className="slippageWarningDiv_span_icon" />{" "}
                              Slippage
                            </span>{" "}
                            is low. Your transaction may fail
                          </div>
                        ) : null}
                      </div>

                      {account ? (
                        <>
                          {insufficientBalance ? (
                            <button
                              id="generate"
                              disabled={true}
                              class="updatedSwapSwapBtn"
                            >
                              Insufficient Balance
                            </button>
                          ) : (
                            <>
                              {unlockBtn === false ? (
                                <button
                                  id="generate"
                                  disabled={Disable}
                                  onClick={UnlockToken}
                                  class="updatedSwapSwapBtn"
                                >
                                  {isLoading ? (
                                    <ScaleLoader
                                      color="#353250"
                                      size={10}
                                      height={20}
                                    />
                                  ) : (
                                    <> Approve {assetsBase.symbol}</>
                                  )}
                                </button>
                              ) : (
                                <button
                                  id="generate"
                                  disabled={Disable}
                                  onClick={SwapEusdForTokens}
                                  class="updatedSwapSwapBtn"
                                >
                                  {isLoading ? (
                                    <ScaleLoader
                                      color="#353250"
                                      size={10}
                                      height={20}
                                    />
                                  ) : (
                                    <> Swap {assetsBase.symbol}</>
                                  )}
                                </button>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <button
                          id="generate"
                          class="updatedSwapSwapBtn"
                          disabled
                        >
                          Connect wallet
                        </button>
                      )}
                      <div className="moreSwapInfoDiv">
                        <div className="moreSwapInfoDiv_div1">
                          More Information
                        </div>
                        <div className="moreSwapInfoDiv_div2">
                          <div className="moreSwapInfoDiv_div2_area1">
                            <div className="moreSwapInfoDiv_div2_area1_cont1">
                              Minimum Received
                            </div>
                            <div className="moreSwapInfoDiv_div2_area1_cont2">
                              {SwapAmount === ""
                                ? 0
                                : parseFloat(MinamountsOut).toFixed(4)}
                              <span>
                                {"  "} {assets.symbol}
                              </span>
                            </div>
                          </div>
                          <div className="moreSwapInfoDiv_div2_area1">
                            <div className="moreSwapInfoDiv_div2_area1_cont1">
                              Est Gas Fee
                            </div>
                            <div className="moreSwapInfoDiv_div2_area1_cont2">
                              $0.005
                            </div>
                          </div>
                          <div className="moreSwapInfoDiv_div2_area1">
                            <div className="moreSwapInfoDiv_div2_area1_cont1">
                              Route
                            </div>
                            <div className="moreSwapInfoDiv_div2_area1_cont2">
                              <div className="swap_price_rate_div1">
                                {assetsBase.symbol}
                              </div>
                              {">"}
                              <div className="swap_price_rate_div2">
                                {assets.symbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
              {/* =============== */}
            </div>
          </div>
        </div>
      </section>

      {shareSwap ? (
        <div className="shareSwapDiv">
          <div
            className="shareSwapDiv_closeDiv"
            onClick={ToggleShareSwap}
          ></div>
          <div className="shareSwapDiv_cont">
            <CloseIcon
              className="shareSwapDiv_cont_close_icon"
              onClick={ToggleShareSwap}
            />
            <div className="shareSwapDiv_cont1">
              <img
                src="/img/swap_share_banner.svg"
                alt=""
                className="shareSwapDiv_cont1_img"
              />
            </div>
            <div className="shareSwapDiv_cont2">
              <div className="shareSwapDiv_cont2_cont1">
                <div className="shareSwapDiv_cont2_cont1_title">
                  Invite Your Friends!
                </div>
                <div className="shareSwapDiv_cont2_cont1_sub_title">
                  A valid invitation must meet the following conditions：
                </div>
                <div className="shareSwapDiv_cont2_cont1_body">
                  <div className="shareSwapDiv_cont2_cont1_body_div1">
                    Visit MartGpt through the link generated on this page
                  </div>
                  <div className="shareSwapDiv_cont2_cont1_body_div1">
                    The user must connect to the wallet
                  </div>
                  <div className="shareSwapDiv_cont2_cont1_body_div1">
                    The user needs to submit at least one valid transaction
                  </div>
                </div>
              </div>
              <div className="shareSwapDiv_cont2_cont2">
                <div className="shareSwapDiv_cont2_cont2_icon_div">
                  <CloudDownloadOutlinedIcon className="shareSwapDiv_cont2_cont2_icon" />
                  Save
                </div>
                <div className="shareSwapDiv_cont2_cont2_icon_div">
                  <TwitterIcon className="shareSwapDiv_cont2_cont2_icon" />
                  Twitter
                </div>
                <div className="shareSwapDiv_cont2_cont2_icon_div_last ">
                  <LinkOutlinedIcon className="shareSwapDiv_cont2_cont2_icon" />
                  Copy Link
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
          route="/app/swap"
          txnHashDiv={true}
          TxnHash={txHash}
        />
      ) : null}
    </div>
  );
};

export default UpdatedSwap;
