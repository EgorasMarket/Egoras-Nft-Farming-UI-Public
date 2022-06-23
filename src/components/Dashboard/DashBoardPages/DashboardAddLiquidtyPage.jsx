import React, { useState, useEffect, Fragment } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TokenModal } from "../DashBoardPages/TokenModal/TokenModal";
import LoadingIcons from "react-loading-icons";
import data from "../../static/MockData";
import { ErrorModal, SuccessModal } from "./Modal/Success_Error_Component";
// ================
// ================
// ================
import { Authenticate } from "../../auth/Authenticate";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  getTickerInfo,
  tokenBalance,
  exchangeDefault,
  getDefault,
  crossexchange,
  addLiquidity,
  withdrawable,
  removeLiquidity,
} from "../../../web3/index";
import { parseEther, formatEther, parseUnits } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  faCheckCircle,
  faCircleNotch,
  faChevronRight,
  faArrowRight,
  faLock,
  faWindowClose,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectWallet } from "../../auth/ConnectWallet";
import "../../../css/dashboardAddLiquidity.css";
const DashboardAddLiquidtyPage = ({ match }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [tokenBtn, setTokenBtn] = useState(false);
  const [tokenBtn2, setTokenBtn2] = useState(false);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [button_txt, setBtnTxt] = useState("");
  const [tokenName, setTokenName] = useState(0);
  const [base, setBase] = useState("");
  const [tokenName2, setTokenName2] = useState(0);
  const [view, setView] = useState("input");
  const [message, setMessage] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputVal, setInputVal] = useState();
  const [hash, setHash] = useState("");
  const [unlockAmount, setUnlockAmount] = useState(0);
  const [disabled, setDisabled] = useState(true);

  // const [inputVal, setInputVal] = useState();
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
  // useEffect(() => {
  //   var ticker = "EGR-BNB";
  //   getPrice(ticker, library.getSigner()).then((price) => {
  //     // setDefaultPrice(formatEther(price.message));
  //   });
  // }, []);
  const [connected, setConnected] = useState(false);
  const Continue = async (e) => {
    setView("input");
    setMessage("");
  };
  const doUnluck = async (e) => {
    setMessage("Transacting with blockchain, please wait...");
    setView("loading");
    setIsLoading(true);

    let ret = await unluckToken(
      data.assets[tokenName2 - 1].contract,
      parseEther(unlockAmount.toString(), "wei").toString(),
      library.getSigner()
    );
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setMessage("Unlocking please wait aleast 1/2 minutes");
    } else {
      if (ret.message.code == 4001) {
        setMessage(ret.message.message);
      }

      setView("error");
      setIsLoading(false);
    }
  };
  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    if (inputVal <= 0 || tokenBtn2 === false) {
      setBtnTxt("Enter an amount");
      setDisabled(true);
      console.log(
        "==================",
        "add amount here please",
        "=================="
      );
    } else if (inputVal > 0 || tokenBtn2 === true) {
      setDisabled(false);
      setBtnTxt("Add Liquidity");
      console.log("==================", "amount is okay", "==================");
    }

    // return () => {
    //   second;
    // };
  });

  const TokenData = async (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
    setTokenName(currentTarget);

    if (modal === true) {
      setModal(false);
    } else if (modal === false) {
      setModal(true);
    }
    setTokenBtn(true);
  };

  const add = async (e) => {
    setView("loading");
    setMessage("Adding! Please wait....");
    let theAmount = parseFloat(inputVal) / parseFloat(defaultPrice) + 1;
    setUnlockAmount(theAmount);
    let check = await checkAllowance(
      data.assets[tokenName2 - 1].contract,
      account,
      parseEther(theAmount.toString(), "wei").toString(),
      library.getSigner()
    );

    if (check.status == true) {
      let ret = await addLiquidity(
        data.assets[tokenName2 - 1].symbol + "-BNB",

        parseEther(inputVal.toString(), "wei").toString(),
        library.getSigner()
      );
      if (ret.status == true) {
        localStorage.setItem("unlocking", true);
        localStorage.setItem("unlockingHash", ret.message.hash);
        setMessage("Adding liquidity tokens please wait aleast 1/2 minutes");
        setHash(ret.message.hash);
      } else if (ret.status == false) {
        if (ret.message.code < 0) {
          setMessage(ret.message.data.message);
        } else if (ret.message.code == 4001) {
          setMessage(ret.message.message);
        }
        setView("error");
        setIsLoading(false);
      }
    } else {
      setUnlocking(true);
      setView("unlock");
      setIsLoading(false);
    }
  };
  const TokenData2 = async (e) => {
    let currentTarget = e.currentTarget.id;

    setView("loading");
    setMessage("Getting pair price...");
    let priceData = await getPrice(
      data.assets[currentTarget - 1].symbol + "-BNB",
      library.getSigner()
    );
    console.log("priceData", priceData);
    if (priceData.status == true) {
      let priceValue = formatEther(priceData.message);
      setDefaultPrice(priceValue);
      if (parseFloat(priceValue) > 0) {
        setView("input");
      } else {
        setMessage("Error, unable to get pair price");

        setView("error");
      }
    } else {
      setMessage("Error, unable to get pair price");

      setView("error");
    }
    setTokenName2(currentTarget);

    if (modal2 === true) {
      setModal2(false);
    } else if (modal2 === false) {
      setModal2(true);
    }
    setTokenBtn2(true);
  };
  const toggleModal = (id) => {
    // let target = e.currentTarget.id;
    console.log(id);
    if (modal === true) {
      setModal(false);
    } else if (modal === false) {
      setModal(true);
    }
  };
  const toggleModal2 = () => {
    if (modal2 === true) {
      setModal2(false);
    } else if (modal2 === false) {
      setModal2(true);
    }
  };
  const background = [
    {
      background: "#000",
    },
  ];

  setInterval(() => {
    if (localStorage.getItem("unlocking") == "true") {
      transactReceipt(localStorage.getItem("unlockingHash"), library).then(
        function (env) {
          // console.log("running Interval", env);
          if (env.status == true && env.message !== null) {
            if (env.message.confirmations > 2) {
              setView("success");
              setHash(localStorage.getItem("unlockingHash"));
              setIsLoading(false);

              localStorage.setItem("unlocking", false);
            }
          }
        }
      );
    }
  }, 7000);
  return (
    <Fragment>
      <div className="other2">
        {/* Tokens Section Start */}
        <section>
          <div className="container">
            <div className="liquidity_area">
              {view == "input" ? (
                <div className="liquidity_cont">
                  <div className="liquidity_cont_head">
                    <div className="liquidity_cont_head_text">
                      Add Liquidity
                    </div>
                    <SettingsIcon className="settings_icon" />
                  </div>
                  <div className="liquidity_cont_body">
                    <div className="liquidity_cont_body_conts">
                      <div className="tips_layer">
                        <div className="tips_writeUp">
                          <span className="tip_sub_head">Tip: </span> When you
                          add liquidity, you will receive pool tokens
                          representing your position. These tokens automatically
                          earn fees proportional to your share of the pool, and
                          can be redeemed at any time.
                        </div>
                      </div>
                      <div className="input_amnt_layer">
                        <div className="amnt_input">
                          <input
                            type="number"
                            name="number"
                            id="number"
                            onChange={onChange}
                            placeholder="000"
                            className="amnt_input_field"
                            autocomplete="off"
                            value={tokenBtn == true ? inputVal : null}
                          />

                          <button className="display_tokens_drop">
                            <img
                              src={data.base[0].img}
                              alt=""
                              className="asset_icon"
                            />
                            {data.base[0].symbol}
                            <ArrowDropDownIcon className="drop_down_icon" />
                          </button>
                        </div>
                      </div>
                      {/* <div className="plus_icon_layer"> */}
                      <AddIcon className="plus_icon_layer" />

                      {/* </div> */}
                      <div className="input_amnt_layer">
                        <div className="amnt_input">
                          <input
                            type="number"
                            name="number"
                            id="number"
                            placeholder="000"
                            onChange={onChange}
                            className="amnt_input_field"
                            autocomplete="off"
                            value={
                              tokenBtn2 === true
                                ? parseFloat(inputVal / defaultPrice)
                                : null
                            }
                          />
                          {tokenBtn2 == false ? (
                            <button
                              className="display_tokens_drop display_tokens_drop_not_select "
                              onClick={() => {
                                toggleModal2();
                                setInputVal(0);
                              }}
                            >
                              Select a token{" "}
                              <ArrowDropDownIcon className="drop_down_icon" />
                            </button>
                          ) : (
                            <>
                              {data.assets.map((token) =>
                                tokenName2 == token.id ? (
                                  <button
                                    className="display_tokens_drop"
                                    onClick={() => {
                                      toggleModal2();
                                      setInputVal(0);
                                    }}
                                  >
                                    <img
                                      src={token.img}
                                      alt=""
                                      className="asset_icon"
                                    />
                                    {token.symbol}
                                    <ArrowDropDownIcon className="drop_down_icon" />
                                  </button>
                                ) : null
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="connect_btn_div">
                        <button
                          className="connect_btn"
                          style={{ padding: "0.9em 4.5em" }}
                          onClick={(e) => add(e)}
                          disabled={disabled}
                        >
                          {isLoading ? (
                            <FontAwesomeIcon icon={faCircleNotch} spin />
                          ) : null}{" "}
                          {button_txt}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {view == "unlock" ? (
                <div className="unlock_div">
                  <div className="unlock_head">
                    Approve <b>Egoras</b> to spend{" "}
                    {data.assets[tokenName2 - 1].symbol} on your behalf.
                  </div>

                  <div className="unlock_input_div ">
                    <input
                      type="text"
                      name="stateAmountToGenerate"
                      value={unlockAmount}
                      readonly
                      className="unlock_input"
                    />
                  </div>

                  <div className="Unloc_btn_div">
                    <button
                      className="LoginBtn"
                      // style={{ padding: "0.9em 4.5em" }}
                      onClick={(e) => doUnluck(e)}
                    >
                      {isLoading ? (
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                      ) : null}{" "}
                      Unlock {data.assets[tokenName2 - 1].symbol}
                    </button>
                  </div>
                </div>
              ) : null}

              {view == "loading" ? (
                <div>
                  <p
                    className="text-center loadingContainer"
                    style={{ fontSize: "54px" }}
                  >
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                  </p>
                  <p className="text-center">{message}</p>
                </div>
              ) : null}

              {view == "error" ? (
                <ErrorModal
                  errorMessage={message}
                  click={(e) => {
                    Continue(e);
                    setInputVal(0);
                  }}
                  ErrorHead="Error"
                />
              ) : null}

              {view == "success" ? (
                <SuccessModal
                  successMessage={message}
                  click={(e) => {
                    Continue(e);
                    setInputVal(0);
                  }}
                  SuccessHead="Success"
                  hash={hash}
                />
              ) : null}
            </div>
          </div>
        </section>

        {modal == true ? (
          <TokenModal
            toggleTokenModal={toggleModal}
            execute={TokenData}
            tokenData1={data.base}
            tokenData={data.assets}
            disabled="disabled"
            // tokenId={data.tokenData}
          />
        ) : null}
        {modal2 == true ? (
          <TokenModal
            toggleTokenModal={toggleModal2}
            execute={TokenData2}
            tokenData={data.assets}
            tokenData1={data.base}
            // disabled={true}
            // tokenId={data.tokenData}
          />
        ) : null}
      </div>
    </Fragment>
  );
};

export default DashboardAddLiquidtyPage;
