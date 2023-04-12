import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";
import { numberWithCommas } from "../../../static";
import { Link } from "react-router-dom";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InfoIcon from "@mui/icons-material/Info";
import { SuccessModal, ErrorModal } from "./Modal/Success_Error_Component";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { CopperLoading } from "respinner";

import "../../../css/openVault.css";
import SwitchToggle from "./SwitchToggle/SwitchToggle";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

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
import { Authenticate } from "../../auth/Authenticate";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  getPriceImpl,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
} from "../../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { Checkbox } from "@mui/material";
function limit(val, max) {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = "01";

      //this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

const OpenVaultPage = ({ match }) => {
  // const firstElement = useRef(null);
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(false);
  const [value, setValue] = useState("");
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");
  const [eusdValue, setEusdValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000000);
  const [validDiv, setValidDiv] = useState("not_ifValidDiv");
  const [successUnlock, setSuccessUnlock] = useState("false");
  const [buttonOpen, setButtonOpen] = useState("generate_eusd_cont1");
  const [buttonOpen2, setButtonOpen2] = useState("not_generate_eusd_cont");
  const [coinBalance, setCoinBalance] = useState(0.0);
  const [baseBalance, setBaseBalance] = useState(0.0);

  const [amount, setAmount] = useState("Enter an amount");
  const [vaultPrice, setVaultPrice] = useState("not_price_value_change");
  const [tickerPrice, setTickerPrice] = useState(0);
  // const [valueToNum, setValueToNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState("connect");
  const [sideStage, setSideStage] = useState("collateral");
  const [text, setText] = useState(
    "Transacting with blockchain, please wait..."
  );
  const [hash, setHash] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [disable, setDisable] = useState(true);
  const [shake, setShake] = useState(0);
  const [canshake, setCanShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [activeTab, setActiveTab] = useState("payback");
  const [chainLoanDetails, setChainLoanDetails] = useState({});
  const [task, setTask] = useState("collateral");
  const [loanMetaData, setLoanMetaData] = useState({
    base: "",
    asset: "",
    live: "",
    maxLoan: 0.0,
    ticker: "",
    creator: "",
  });

  const [formData, setFormData] = useState({
    stateCollateral: "",
    stateTopUp: "",
    stateMaxGenerate: 0,
    stateCollaterizationRatio: 0,
    stateLiquidationPrice: 0,
    stateCollateralLocked: 0,
    stateVaultDebt: 0,
    stateAmountToGenerate: "",
    stateLiquidationWarning: "success",
  });
  // ====================
  // ====================
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
  useEffect(() => {
    let assetVal = match.params.asset;
    let baseVal = match.params.base;
    setAsset(assetVal);
    setBase(baseVal);
    let ticker = assetVal + "-" + baseVal;
    if (account) {
      getPrice(ticker, library.getSigner()).then((data) => {
        if (data.status) {
          setTickerPrice(parseFloat(formatEther(data.message)));
          console.log(parseFloat(formatEther(data.message)));
        }
      });

      getTickerInfo(ticker, library.getSigner()).then((data) => {
        if (data.status) {
          tokenBalance(data.message.base, account, library.getSigner()).then(
            (balance) => {
              setBaseBalance(formatEther(balance.message));
            }
          );

          if (asset == "BNB" || asset == "bnb") {
            library
              .getBalance(account)
              .then((balance) => {
                setCoinBalance(formatEther(balance));
              })
              .catch(() => {
                setCoinBalance(null);
              });
          } else {
            tokenBalance(data.message.asset, account, library.getSigner()).then(
              (balance) => {
                setCoinBalance(formatEther(balance.message));
              }
            );
          }
          // const checkUnlock = async () => {
          //   let engn = await checkAllowance(
          //     data.base,
          //     account,
          //     parseEther("5000000", "wei").toString(),
          //     library.getSigner()
          //   );

          //   let egc = await checkAllowance(
          //     data.asset,
          //     account,
          //     parseEther("5000000", "wei").toString(),
          //     library.getSigner()
          //   );
          // };

          setLoanMetaData({
            ...loanMetaData,
            base: data.message.base,
            asset: data.message.asset,
            maxLoan: formatEther(data.message.maxLoan),
            // maxLoan: formatEther(data.message.maxLoan),
          });
        }
      });
    }
    window.scrollTo(0, 0);
    if (!account) {
      setStage("connect");
      setModal(!modal);
    } else {
      setModal(!modal);
      setStage("");
    }
  }, [chainId, account, connector]);

  useEffect(() => {
    if (account) {
      getLatestLoan(account, asset + "-" + base, library.getSigner()).then(
        (loan) => {
          if (loan.message == true) {
            setCanShake(true);
            console.log(
              loan.loanDetails.liquidationPrice.toString(),
              "loan.loanDetails.liquidationPrice"
            );
            setChainLoanDetails({
              ...chainLoanDetails,
              id: loan.loanDetails.id.toString(),
              collateral: formatEther(loan.loanDetails.collateral),
              debt: formatEther(loan.loanDetails.debt),
              liquidationPrice: formatEther(
                loan.loanDetails.liquidationPrice.toString()
              ),
              // parseFloat(
              //   parseFloat(

              //   )
              // ) / 10000000000000000,
              max: formatEther(loan.loanDetails.max),
            });

            console.log(formatEther(loan.loanDetails.collateral));
            console.log(formatEther(loan.loanDetails.debt));
            setSideStage("locked");
          } else {
            setSideStage("collateral");
          }
        }
      );
    }
  }, [shake, chainId, account, connector]);
  // ====================
  // ====================
  // ====================
  // ====================

  const doUnluck = async (e) => {
    let address = "";
    if (task == "payback") {
      address = loanMetaData.base;
    } else if (task == "collateral") {
      address = loanMetaData.asset;
    }
    setText("Transacting with blockchain, please wait...");
    setStage("loading");
    setIsLoading(true);
    //formData.stateCollateral.toString()
    let ret = await unluckToken(
      address,
      parseEther("180000000000000000000000000", "wei").toString(),
      library.getSigner()
    );
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setText("Unlocking please wait aleast 1/2 minutes");
      // setCheckBox(true);
      // setDisable(false);
    } else {
      if (ret.message.code == 4001) {
        setText(ret.message.message);
        // setCheckBox(false);
        // setDisable(true);
      }

      setStage("error");
      setIsLoading(false);
      // setCheckBox(false);
      // setDisable(true);
    }
  };

  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
  // =======
  // =======
  // =======

  const changeMaxValue = () => setEusdValue(maxValue);

  const toggleButtonOpen = () => {
    setButtonOpen("not_generate_eusd_cont1");
    setButtonOpen2("generate_eusd_cont");
  };
  const toggleButtonClose = () => {
    setButtonOpen("generate_eusd_cont1");
    setButtonOpen2("not_generate_eusd_cont");
  };
  const openCDP = async (e) => {
    setTask("collateral");

    setUnlocking(false);
    setStage("loading");
    setModal(!modal);
    setIsLoading(true);

    if (asset !== "BNB" && asset !== "bnb") {
      let check = await checkAllowance(
        loanMetaData.asset,
        account,
        parseEther(formData.stateCollateral.toString(), "wei").toString(),
        library.getSigner()
      );

      if (check.status == true) {
        setText("Collateralizing, please wait...");
        console.log(formData.stateAmountToGenerate);

        let ret = await open(
          false,
          parseEther(formData.stateCollateral.toString(), "wei").toString(),
          parseEther(
            formData.stateAmountToGenerate.toString(),
            "wei"
          ).toString(),
          asset + "-" + base,
          library.getSigner()
        );

        if (ret.status == true) {
          localStorage.setItem("unlocking", true);
          localStorage.setItem("unlockingHash", ret.message.hash);
          setText("Sending token please wait aleast 1/2 minutes");
          setHash(ret.message.hash);
          setStage("success");
        } else if (ret.status == false) {
          if (ret.message.code < 0) {
            setText(ret.message.data.message);
          } else if (ret.message.code == 4001) {
            setText(ret.message.message);
          }
          setStage("error");
          setIsLoading(false);
        }
      } else {
        setUnlocking(true);
        setStage("unlock");
        setIsLoading(false);
      }
    } else {
      setText("Collateralizing, please wait...");

      let ret = await open(
        true,
        parseEther(formData.stateCollateral.toString(), "wei").toString(),
        parseEther(formData.stateAmountToGenerate.toString(), "wei").toString(),
        asset + "-" + base,
        library.getSigner()
      );

      if (ret.status == true) {
        localStorage.setItem("unlocking", true);
        localStorage.setItem("unlockingHash", ret.message.hash);
        setText("Sending token please wait aleast 1/2 minutes");
        setHash(ret.message.hash);
      } else if (ret.status == false) {
        if (ret.message.code < 0) {
          setText(ret.message.data.message);
        } else if (ret.message.code == 4001) {
          setText(ret.message.message);
        }
        setStage("error");
        setIsLoading(false);
      }
    }
  };

  const payBackCDP = async (e) => {
    setFormData({
      ...formData,
      stateCollateral: chainLoanDetails.debt,
    });
    setTask("payback");
    setUnlocking(false);
    setStage("loading");
    setModal(!modal);
    setIsLoading(true);
    let check = await checkAllowance(
      loanMetaData.base,
      account,
      parseEther(chainLoanDetails.debt.toString(), "wei").toString(),
      library.getSigner()
    );

    if (check.status == true) {
      setText("Offsetting debt, please wait...");

      let ret = await repay(
        chainLoanDetails.id,
        parseEther(chainLoanDetails.debt, "wei").toString(),
        asset == "BNB" ? true : false,
        library.getSigner()
      );

      if (ret.status == true) {
        localStorage.setItem("unlocking", true);
        localStorage.setItem("unlockingHash", ret.message.hash);
        setText("Disbursing tokens please wait aleast 1/2 minutes");
        setHash(ret.message.hash);
        setStage("success");
      } else if (ret.status == false) {
        if (ret.message.code < 0) {
          setText(ret.message.data.message);
        } else if (ret.message.code == 4001) {
          setText(ret.message.message);
        }
        setStage("error");
        setIsLoading(false);
      }
    } else {
      setUnlocking(true);
      setStage("unlock");
      setIsLoading(false);
    }
  };

  // =======

  const commaAdd = addCommas(removeNonNumeric(value));
  console.log(commaAdd);
  // ========================
  // ========================
  // ========================
  // ========================
  const decimalPlace = addCommas(parseFloat(value).toFixed(3));
  const decimalPlaceB = addCommas(parseFloat(eusdValue).toFixed(3));
  // ========================
  // ========================
  // ========================
  // ========================
  const tokenPrice = value * 63450;

  // ========================
  // ========================
  // ========================
  // ========================
  // const tokenDecimal = decimalPlace * 65350;

  // ========================
  // ========================
  // ========================
  // ========================
  // // console.log(+valueToNum);
  // // Number("123");
  const toggle = () => {
    setModal(!modal);
  };
  const Continue = async (e) => {
    setStage("ColateralizeModal");
    setText("");
    setModal(!modal);
    window.location.reload();
  };

  const onTopup = (e) => {
    setFormData({
      ...formData,
      stateTopUp: e.target.value,
      stateCollateral: e.target.value,
    });
    // setVaultPrice("price_value_change");
  };
  const withdrawCDP = async (e) => {
    setTask("paypack");
    setUnlocking(false);
    setStage("loading");
    setModal(!modal);
    setIsLoading(true);
    setText("Withdrawing, please wait...");
    let ret = await draw(
      chainLoanDetails.id,
      parseEther(formData.stateTopUp.toString(), "wei").toString(),
      library.getSigner()
    );
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message.hash);
      setText("Sending token please wait aleast 1/2 minutes");
      setHash(ret.message.hash);
      setStage("success");
    } else if (ret.status == false) {
      if (ret.message.code < 0) {
        setText(ret.message.data.message);
      } else if (ret.message.code == 4001) {
        setText(ret.message.message);
      }
      setStage("error");
      setIsLoading(false);
    }
  };
  const topUpCDP = async (e) => {
    setTask("collateral");
    setUnlocking(false);
    setStage("loading");
    setModal(!modal);
    setIsLoading(true);

    if (asset !== "BNB" && asset !== "bnb") {
      let check = await checkAllowance(
        loanMetaData.asset,
        account,
        parseEther(formData.stateTopUp.toString(), "wei").toString(),
        library.getSigner()
      );

      if (check.status == true) {
        setText("Adding Collateral, please wait...");
        let ret = await topup(
          false,
          chainLoanDetails.id,
          asset + "-" + base,
          parseEther(formData.stateTopUp.toString(), "wei").toString(),
          library.getSigner()
        );

        if (ret.status == true) {
          localStorage.setItem("unlocking", true);
          localStorage.setItem("unlockingHash", ret.message.hash);
          setText("Sending token please wait aleast 1/2 minutes");
          setHash(ret.message.hash);
          setStage("success");
        } else if (ret.status == false) {
          if (ret.message.code < 0) {
            setText(ret.message.data.message);
          } else if (ret.message.code == 4001) {
            setText(ret.message.message);
          }
          setStage("error");
          setIsLoading(false);
        }
      } else {
        setUnlocking(true);
        setStage("unlock");
        setIsLoading(false);
      }
    } else {
      setText("Adding Collateral, please wait...");
      let ret = await topup(
        true,
        chainLoanDetails.id,
        asset + "-" + base,
        parseEther(formData.stateTopUp.toString(), "wei").toString(),
        library.getSigner()
      );

      if (ret.status == true) {
        localStorage.setItem("unlocking", true);
        localStorage.setItem("unlockingHash", ret.message.hash);
        setText("Sending token please wait aleast 1/2 minutes");
        setHash(ret.message.hash);
      } else if (ret.status == false) {
        if (ret.message.code < 0) {
          setText(ret.message.data.message);
        } else if (ret.message.code == 4001) {
          setText(ret.message.message);
        }
        setStage("error");
        setIsLoading(false);
      }
    }
  };

  const onChange = (e) => {
    if (e.target.name == "stateCollateral") {
      let cAmount = tickerPrice * e.target.value;
      console.log(cAmount, "C Amount");
      let maxDraw = cAmount * 0.65;
      console.log(tickerPrice, "tickerPrice", maxDraw, "maxDraw");

      setFormData({
        ...formData,
        stateMaxGenerate: maxDraw,
        stateCollateral: e.target.value,
      });
    } else if (e.target.name == "stateAmountToGenerate") {
      let gn = e.target.value;
      if (e.target.value > formData.stateMaxGenerate) {
        gn = formData.stateMaxGenerate;
      }
      let g = gn * 1500;
      let c = formData.stateCollateral * 1000;
      let lp = g / c;
      let liquidationWarning = (gn / formData.stateMaxGenerate) * 100;
      let warning = "success";
      if (liquidationWarning > 66 && liquidationWarning < 83) {
        warning = "warning";
      } else if (liquidationWarning >= 83) {
        warning = "danger";
      }

      setFormData({
        ...formData,
        stateLiquidationPrice: lp,
        stateVaultDebt: gn,
        stateAmountToGenerate: gn,
        stateLiquidationWarning: warning,
      });
    }

    if (e.target.name == "stateCollateral" && e.target.value <= 0) {
      setVaultPrice("not_price_value_change");
      setAmount("Enter an amount");
      setValidDiv("not_ifValidDiv");
    } else if (e.target.name == "stateCollateral" && e.target.value > 0) {
      setVaultPrice("price_value_change");
      setAmount("Generate");
      setValidDiv("ifValidDiv");
    }
  };
  setInterval(() => {
    if (localStorage.getItem("unlocking") == "true") {
      // setCheckBox(true);
      // setDisable(false);

      transactReceipt(localStorage.getItem("unlockingHash"), library).then(
        function (env) {
          // console.log("running Interval", env);
          if (env.status == true && env.message !== null) {
            setShake(shake + 10);
            if (env.message.confirmations > 2) {
              setStage("success");
              setHash(localStorage.getItem("unlockingHash"));
              setIsLoading(false);

              localStorage.setItem("unlocking", false);
            }
          }
        }
      );
    } else {
      // setCheckBox(false);
      // setDisable(true);
    }
  }, 1000);
  // useEffect(() => {
  //   if (localStorage.getItem("unlocking") == "true") {
  //     // setCheckBox(true);
  //     // setDisable(false);
  //   } else {
  //     setCheckBox(false);
  //     setDisable(true);
  //   }
  // }, [checkBox]);

  return (
    <div className="other2">
      <section className="open_vault_section">
        <div className="container">
          <div className="open_vault_header">
            <h3 className="openVault_heading">Open {asset} Vault</h3>
            <div className="vault_captions">
              <p className="vault_tbd">
                VaultID
                <span className="vault_percent">E.C.V</span>
              </p>

              <p className="vault_tbd">
                Stable Fee <span className="vault_percent">0%</span>
              </p>

              <p className="vault_tbd">
                Liquidation Fee <span className="vault_percent">13%</span>
              </p>

              <p className="vault_tbd">
                Min. collateral ratio{" "}
                <span className="vault_percent">150%</span>
              </p>

              <p className="vault_tbd">
                Dust Limit{" "}
                <span className="vault_percent">
                  {" "}
                  <span>
                    {" "}
                    $
                    {numberWithCommas(
                      parseFloat(loanMetaData.maxLoan / 618).toFixed(3)
                    )}
                  </span>
                  <span className="dust_limit_usd_">
                    ~ ₦
                    {numberWithCommas(
                      parseFloat(loanMetaData.maxLoan).toFixed(3)
                    )}
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="open_vault_area">
            <div className="open_vault_area1">
              <div className="vault_prices">
                <div className="vault_prices1">
                  <div className="vault_prices1_cont1">
                    <div className="vault_prices1_cont1a">
                      <p className="vault_prices1txt1">Liquidation Price</p>
                      <h3 className="vault_prices1amount">
                        <span className="normal_val">
                          $
                          {canshake
                            ? numberWithCommas(
                                parseInt(
                                  chainLoanDetails.liquidationPrice / 618
                                ).toFixed(5)
                              )
                            : "0.00"}
                        </span>
                        <span className="dollar_val">
                          ~ ₦
                          {canshake
                            ? numberWithCommas(
                                parseInt(
                                  chainLoanDetails.liquidationPrice
                                ).toFixed(5)
                              )
                            : "0.00"}
                        </span>
                      </h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : `price_value_change  ₦{formData.stateLiquidationWarning}`
                        }
                      >
                        <div className={`price_value_change_value`}>
                          ₦
                          {numberWithCommas(
                            parseFloat(formData.stateLiquidationPrice).toFixed(
                              5
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <div className="vault_prices1">
                  <div className="vault_prices1_cont1">
                    <div className="vault_prices1_cont1a">
                      <p className="vault_prices1txt1">
                        Collateralization Ratio
                      </p>
                      <h3 className="vault_prices1amount">
                        <span className="normal_val">
                          {canshake
                            ? numberWithCommas(
                                (
                                  (tickerPrice * chainLoanDetails.collateral) /
                                  (chainLoanDetails.debt * 100)
                                ).toFixed(5)
                              )
                            : "0.00"}
                          %{/* {/* (36,800ngn * 0.004egc)/(15engn *100)/} */}
                          {/* (150* amount of engn to withdraw )/(100* amount of egc deposited in vault) */}
                        </span>
                      </h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : `price_value_change ₦{formData.stateLiquidationWarning}`
                        }
                      >
                        <div className={`price_value_change_value`}>
                          {decimalPlaceB}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                {/* =========== */}
                <div className="vault_prices1">
                  <div className="vault_prices1_cont1">
                    <div className="vault_prices1_cont1a">
                      <p className="vault_prices1txt1">Current Price</p>
                      <h3 className="vault_prices1amount">
                        <span className="normal_val">
                          ${numberWithCommas((tickerPrice / 618).toFixed(5))}
                        </span>
                        <span className="dollar_val">
                          ~ ₦{numberWithCommas(tickerPrice.toFixed(5))}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="vault_prices1_cont1">
                    <p className="vault_prices1txt1">
                      <span className="next">Next</span>{" "}
                      <span className="vault_prices1txt1aa">
                        {" "}
                        {numberWithCommas(tickerPrice.toFixed(5))}
                      </span>
                    </p>
                  </div>
                </div>
                {/* ========== */}
                {/* ========== */}
                {/* ========== */}
                {/* ========== */}
                <div className="vault_prices1">
                  <div className="vault_prices1_cont1">
                    <div className="vault_prices1_cont1a">
                      <p className="vault_prices1txt1">Collateral Locked</p>
                      <h3 className="vault_prices1amount">
                        <span className="normal_val">
                          $
                          {canshake
                            ? numberWithCommas(
                                parseFloat(
                                  (tickerPrice * chainLoanDetails.collateral) /
                                    618
                                ).toFixed(5)
                              )
                            : "0.00"}
                        </span>
                        <span className="dollar_val">
                          ~ ₦
                          {canshake
                            ? numberWithCommas(
                                parseFloat(
                                  tickerPrice * chainLoanDetails.collateral
                                ).toFixed(5)
                              )
                            : "0.00"}
                        </span>
                      </h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : `price_value_change  ₦{formData.stateLiquidationWarning}`
                        }
                        // onChange={handleInputChange}
                      >
                        <div className={`price_value_change_value`}>
                          <NumberFormat
                            value={tickerPrice * formData.stateCollateral}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="₦"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="vault_prices1_cont1">
                    <p className="vault_prices1txt1">
                      <span className="next">
                        {canshake
                          ? numberWithCommas(chainLoanDetails.collateral)
                          : "0.00"}
                      </span>{" "}
                      <span className="vault_prices1txt1aa"> {asset}</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ///////////////////////////////// */}
              <div className="vault_amount_withdraw">
                <div className="vault_amount_withdraw_cont1">
                  <div className="amount_withdraw_cont1_txt1">
                    Vault {base} Debt
                  </div>
                  <div className="amount_withdraw_cont1_txt2">
                    {canshake
                      ? numberWithCommas(
                          parseFloat(chainLoanDetails.debt).toFixed(4)
                        )
                      : "0.00"}{" "}
                    {base}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : `price_value_change ₦{formData.stateLiquidationWarning}`
                    }
                  >
                    <div className={`price_value_change_value`}>
                      {numberWithCommas(
                        parseFloat(formData.stateAmountToGenerate).toFixed(3)
                      )}
                    </div>
                  </div>
                </div>
                {/* ======== */}
                {/* ======== */}
                <div className="vault_amount_withdraw_cont1">
                  <div className="amount_withdraw_cont1_txt1">
                    Available to Withdraw
                  </div>
                  <div className="amount_withdraw_cont1_txt2">
                    {canshake
                      ? numberWithCommas(chainLoanDetails.collateral)
                      : "0.00"}{" "}
                    {asset}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : `price_value_change ₦{formData.stateLiquidationWarning}`
                    }
                  >
                    <div className={`price_value_change_value`}>
                      {formData.stateCollateral} {asset} after
                    </div>
                  </div>
                </div>
                {/* ======= */}
                {/* ======= */}
                <div className="vault_amount_withdraw_cont1">
                  <div className="amount_withdraw_cont1_txt1">
                    Available to Generate
                  </div>
                  <div className="amount_withdraw_cont1_txt2">
                    {canshake
                      ? numberWithCommas(
                          parseFloat(
                            chainLoanDetails.max - chainLoanDetails.debt
                          ).toFixed(4)
                        )
                      : "0.00"}{" "}
                    {base}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : `price_value_change ₦{formData.stateLiquidationWarning}`
                    }
                  >
                    <div className={`price_value_change_value`}>
                      <NumberFormat
                        value={formData.stateMaxGenerate}
                        displayType="text"
                        thousandSeparator={true}
                        // prefix="EUSD "
                      />
                      {base} after
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ytwtedogeydgygedygfegdfcwel */}
            {/* ytwtedogeydgygedygfegdfcwel */}
            {/* ytwtedogeydgygedygfegdfcwel */}
            {/* ytwtedogeydgygedygfegdfcwel */}
            {/* ytwtedogeydgygedygfegdfcwel */}
            {/* ytwtedogeydgygedygfegdfcwel */}
            {/* ytwtedogeydgygedygfegdfcwel */}
            {sideStage == "collateral" ? (
              <div className="open_vault_area2">
                <div className="open_vault_area2ss">
                  <div className="open_vault_area2a">
                    <div className="open_vault_area2a_heading">
                      <p className="configure">Configure your Vault </p>
                    </div>
                    Simulate your vault by configuring the amount of collateral
                    to deposit, and {base} to generate.
                  </div>
                  <div className="open_vault_area2b">
                    <div className="open_vault_input_titles">
                      <span className="vault_input0">Deposit {asset}</span>
                      <span className="vault_input1">
                        Balance {coinBalance} {asset}
                      </span>
                    </div>
                    <div className="vault_input">
                      <input
                        type="number"
                        name="stateCollateral"
                        id="value"
                        // {value}

                        value={formData.stateCollateral}
                        className="vault_input_vault"
                        placeholder={`0.00`}
                        onChange={(e) => onChange(e)}
                        onKeyUp={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                  {/* ifvalid div start */}
                  {/* ifvalid div start */}
                  {/* ifvalid div start */}
                  {/* ifvalid div start */}
                  {/* ifvalid div start */}
                  {/* ifvalid div start */}
                  <div
                    className={
                      validDiv == "not_ifValidDiv"
                        ? "not_ifValidDiv"
                        : "ifValidDiv"
                    }
                  >
                    {" "}
                    <div
                      className={
                        buttonOpen == "generate_eusd_cont1"
                          ? "generate_eusd_cont1"
                          : "not_generate_eusd_cont1"
                      }
                    >
                      <button
                        className="open_vault_input_btn_a"
                        onClick={toggleButtonOpen}
                      >
                        <AddIcon className="add_icon" /> Generate {base} with
                        this transaction
                      </button>
                    </div>
                    <div
                      className={
                        buttonOpen2 == "not_generate_eusd_cont"
                          ? "not_generate_eusd_cont"
                          : "generate_eusd_cont"
                      }
                    >
                      <button
                        className="open_vault_input_btn_a bbb"
                        onClick={toggleButtonClose}
                      >
                        <RemoveIcon className="add_icon" /> Generate {base} with
                        this transaction
                      </button>
                      <div className="open_vault_input_titlesb">
                        <span className="vault_input0">Generate {base}</span>
                        <span
                          className="vault_input1"
                          onClick={changeMaxValue}
                          style={{ cursor: "pointer" }}
                        >
                          Max {formData.stateMaxGenerate} {base}
                        </span>
                      </div>
                      <input
                        type="text"
                        name="stateAmountToGenerate"
                        value={formData.stateAmountToGenerate}
                        className="vault_input_vaulta"
                        placeholder={base}
                        onChange={(e) => onChange(e)}
                        style={{
                          marginRight: "10px",
                          marginLeft: "10px",
                          width: "95%",
                        }}
                        onKeyUp={(e) => onChange(e)}
                      />
                    </div>
                    <hr className="horizontal" />
                    <div className="valid_div_inner_div">
                      <h3 className="valid_div_inner_div_heading">
                        Vault changes
                      </h3>
                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Collateral Locked
                        </div>
                        <div className="valid_div_inner_div_cont2">
                          0.00 {asset} - {formData.stateCollateral}
                          {asset}
                        </div>
                      </div>
                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Collateralization Ratio
                        </div>
                        <div className="valid_div_inner_div_cont2">
                          0.00% - 0.00%
                        </div>
                      </div>
                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Liquidation Price
                        </div>
                        <div className="valid_div_inner_div_cont2">
                          ₦0.00 - ₦{formData.stateLiquidationPrice}
                        </div>
                      </div>
                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Vault {base} Debt
                        </div>
                        <div className="valid_div_inner_div_cont2">
                          0.00 {base} - {formData.stateAmountToGenerate} {base}
                        </div>
                      </div>
                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Available to Withdraw
                        </div>
                        <div className="valid_div_inner_div_cont2">
                          0.00 {asset} - {formData.stateCollateral} {asset}
                        </div>
                      </div>

                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Available to Generate
                        </div>
                        <div className="valid_div_inner_div_cont2">
                          0.00 {base} - {"  "}
                          <NumberFormat
                            value={formData.stateMaxGenerate}
                            displayType="text"
                            thousandSeparator={true}
                            //  prefix="EUSD "
                          />
                          {"  "} {base}
                        </div>
                      </div>
                      {/* ===== */}
                      {/* ===== */}
                      {/* ===== */}
                      <div className="valid_div_inner_div_cont">
                        <div className="valid_div_inner_div_cont1">
                          Max gas fee
                        </div>
                        <div className="valid_div_inner_div_cont2 red">n/a</div>
                      </div>
                    </div>
                  </div>
                  {/* 
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-1em",
                      marginBottom: "-1em",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      fontWeight: "800",
                      color: "#070707",
                    }}
                  >
                    {checkBox == false ? ` Unlock ${asset}` : "Unlocked"}{" "}
                    <SwitchToggle
                      checkBox={checkBox}
                      doUnluck={(e) => doUnluck(e)}
                    />{" "}
                  </div> */}

                  {/* {checkBox == false ? (
                    <button className="open_vault_input_btn" disabled={disable}>
                      Unlock Contract
                    </button>
                  ) : (
                  
                  )} */}
                  <button
                    onClick={openCDP}
                    className="open_vault_input_btn"
                    // disabled={disable}
                  >
                    {amount}
                  </button>
                </div>
              </div>
            ) : null}

            {sideStage == "locked" ? (
              <div className="open_vault_area2">
                <div className="open_vault_area2ss">
                  <div className="open_vault_area2a">
                    <div>
                      <Card>
                        <CardHeader tag="h6" className="p-0 border-bottom-0">
                          <Nav tabs fill pills>
                            <NavItem>
                              <NavLink
                                active={activeTab == "payback"}
                                onClick={() => setActiveTab("payback")}
                              >
                                Payback
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                active={activeTab == "topup"}
                                onClick={() => setActiveTab("topup")}
                              >
                                Topup
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink
                                active={activeTab == "withdraw"}
                                onClick={() => setActiveTab("withdraw")}
                              >
                                Withdraw
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </CardHeader>
                        <CardBody>
                          <TabContent activeTab={activeTab}>
                            <TabPane tabId="payback">
                              <div className="open_vault_area2b">
                                <div className="open_vault_input_titles">
                                  <span className="vault_input0">
                                    Deposit {base}
                                  </span>
                                  <span className="vault_input1">
                                    Balance {baseBalance} {base}
                                  </span>
                                </div>
                                <div className="payback_vault_input">
                                  <input
                                    type="text"
                                    name="stateAmountToGenerate"
                                    value={chainLoanDetails.debt}
                                    readonly
                                    className="vault_input_vaulta"
                                  />
                                  {/* <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "-1em",
                                      marginBottom: "-1em",
                                      justifyContent: "space-between",
                                      fontSize: "16px",
                                      fontWeight: "800",
                                      color: "#070707",
                                    }}
                                  >
                                    {checkBox == false
                                      ? ` Unlock ${asset}`
                                      : "Unlocked"}{" "}
                                    <SwitchToggle
                                      checkBox={checkBox}
                                      doUnluck={(e) => doUnluck(e)}
                                    />{" "}
                                  </div> */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <button
                                      onClick={payBackCDP}
                                      className="vault_pay_back_btn"
                                      // disabled={disable}
                                    >
                                      Pay Back{" "}
                                      <span
                                        className="make_weight"
                                        style={{ fontWeight: "700" }}
                                      >
                                        {numberWithCommas(
                                          parseFloat(
                                            chainLoanDetails.debt
                                          ).toFixed(3)
                                        )}{" "}
                                      </span>
                                      {base}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </TabPane>
                            {/* ===================== */}
                            {/* ===================== */}
                            {/* ===================== */}
                            {/* ===================== */}
                            <TabPane tabId="topup">
                              <div className="open_vault_area2b">
                                <div className="open_vault_input_titles">
                                  <span className="vault_input0">
                                    Top Up {asset}
                                  </span>
                                  <span className="vault_input1">
                                    Balance {coinBalance} {asset}
                                  </span>
                                </div>
                                <div className="payback_vault_input">
                                  <input
                                    type="number"
                                    name="stateTopUp"
                                    // value={formData.stateTopUp}
                                    className="vault_input_vaulta"
                                    onKeyUp={(e) => onTopup(e)}
                                    onChange={(e) => onTopup(e)}
                                  />
                                  {/* <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "-1em",
                                      marginBottom: "-1em",
                                      justifyContent: "space-between",
                                      fontSize: "16px",
                                      fontWeight: "800",
                                      color: "#070707",
                                    }}
                                  >
                                    {checkBox == false
                                      ? ` Unlock ${asset}`
                                      : "Unlocked"}
                                    <SwitchToggle
                                      checkBox={checkBox}
                                      doUnluck={(e) => doUnluck(e)}
                                    />{" "}
                                  </div> */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <button
                                      onClick={topUpCDP}
                                      className="vault_pay_back_btn"
                                      // disabled={disable}
                                    >
                                      Topup {asset}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </TabPane>
                            <TabPane tabId="withdraw">
                              <div className="open_vault_area2b">
                                <div className="open_vault_input_titles">
                                  <span className="vault_input0">
                                    Withdraw {base}
                                  </span>
                                  <span className="vault_input1">
                                    Balance {baseBalance} {base}
                                  </span>
                                </div>
                                <div className="payback_vault_input">
                                  <input
                                    type="number"
                                    name="stateTopUp"
                                    // value={formData.stateTopUp}
                                    className="vault_input_vaulta"
                                    onKeyUp={(e) => onTopup(e)}
                                    onChange={(e) => onTopup(e)}
                                  />
                                  {/* <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "-1em",
                                      marginBottom: "-1em",
                                      justifyContent: "space-between",
                                      fontSize: "16px",
                                      fontWeight: "800",
                                      color: "#070707",
                                    }}
                                  >
                                    {checkBox == false
                                      ? ` Unlock ${asset}`
                                      : "Unlocked"}
                                    <SwitchToggle
                                      checkBox={checkBox}
                                      doUnluck={(e) => doUnluck(e)}
                                    />{" "}
                                  </div> */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <button
                                      onClick={withdrawCDP}
                                      className="vault_pay_back_btn"
                                      // disabled={disable}
                                    >
                                      Withdraw {base}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </TabPane>
                          </TabContent>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <Modal
        fullscreen
        isOpen={modal}
        toggle={toggle}
        className="walletModal mx-auto custom_modal"
        backdrop={backdrop}
        keyboard={keyboard}
      >
        {/* <div className="container" style={{ background: "#f7f8fa" }}> */}
        {stage == "unlock" ? (
          <div className="unlock_div">
            <div className="unlock_head">
              Approve <b>Egoras</b> to spend{" "}
              {task == "collateral" || task == "topup" ? asset : base} on your
              behalf.
            </div>

            <div className="unlock_input_div ">
              <input
                type="text"
                name="stateAmountToGenerate"
                value={formData.stateCollateral}
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
                {/* {isLoading ? (
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                ) : null}{" "} */}
                {/* {checkBox == false ? ` Unlock ${asset}` : "Unlocked"} */}
                Unlock
              </button>
            </div>
          </div>
        ) : null}

        {stage === "loading" ? (
          <div className="bacModal_div">
            <div className="back_modal_container">
              <div className="back_modal_cont_loading">
                <CopperLoading
                  fill="#7a5fc0"
                  borderRadius={4}
                  count={12}
                  size={200}
                />
                <div className="loading_title">
                  {text}

                  <span className="loaing_span_para">
                    Confirm this transaction in your wallet.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {stage == "success" ? (
          <SuccessModal
            successMessage={"Transaction was successful"}
            click={(e) => {
              Continue(e);
            }}
            SuccessHead="Success"
            hash={hash}
          />
        ) : null}

        {stage == "error" ? (
          <ErrorModal
            errorMessage={text}
            click={(e) => {
              Continue(e);
            }}
            ErrorHead="Error"
          />
        ) : null}

        {stage == "connect" ? (
          <div className="to_connect_div">
            <h1 className="text-center">
              <FontAwesomeIcon icon={faWallet} /> <br />
            </h1>
            <p>To access this please connect your wallet</p>

            <Authenticate isHome="false" />
          </div>
        ) : null}
        {/* </div> */}
      </Modal>
    </div>
  );
};

export default OpenVaultPage;
