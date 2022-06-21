import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";

import { Link } from "react-router-dom";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../../css/openVault.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
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
          setTickerPrice(parseFloat(formatEther(data.message)).toPrecision(4));
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
              id: parseInt(loan.loanDetails.id.toString()),
              collateral: formatEther(loan.loanDetails.collateral),
              debt: formatEther(loan.loanDetails.debt),
              liquidationPrice:
                parseFloat(
                  parseFloat(
                    formatEther(loan.loanDetails.liquidationPrice.toString())
                  )
                ).toPrecision(4) / 10000000000000000,
              max: formatEther(loan.loanDetails.max),
            });
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

    let ret = await unluckToken(
      address,
      parseEther(formData.stateCollateral.toString(), "wei").toString(),
      library.getSigner()
    );
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setText("Unlocking please wait aleast 1/2 minutes");
    } else {
      if (ret.message.code == 4001) {
        setText(ret.message.message);
      }

      setStage("error");
      setIsLoading(false);
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
    setFormData({ ...formData, stateCollateral: chainLoanDetails.debt });
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
    setStage("");
    setText("");
    setModal(!modal);
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
    }
  }, 7000);

  return (
    <div className="other2">
      <section className="open_vault_section">
        <div className="container">
          <div className="open_vault_header">
            <h3 className="openVault_heading">Open {asset} Vault</h3>
            <div className="vault_captions">
              <p className="vault_tbd">
                VaultID
                <span className="vault_percent">T.B.D</span>
              </p>

              <p className="vault_tbd">
                Stable Fee <span className="vault_percent">0%</span>
              </p>

              <p className="vault_tbd">
                Liquidation Fee <span className="vault_percent">35%</span>
              </p>

              <p className="vault_tbd">
                Min. collateral ratio{" "}
                <span className="vault_percent">150%</span>
              </p>

              <p className="vault_tbd">
                Dust Limit{" "}
                <span className="vault_percent"> ${loanMetaData.maxLoan}</span>
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
                        ${canshake ? chainLoanDetails.liquidationPrice : "0.00"}
                      </h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : `price_value_change  ${formData.stateLiquidationWarning}`
                        }
                      >
                        <div className={`price_value_change_value`}>
                          ${formData.stateLiquidationPrice}
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
                        {canshake
                          ? (tickerPrice * chainLoanDetails.collateral) /
                            (chainLoanDetails.debt * 100)
                          : "0.00"}
                        %
                      </h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : `price_value_change ${formData.stateLiquidationWarning}`
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
                      <h3 className="vault_prices1amount">${tickerPrice}</h3>
                    </div>
                  </div>
                  <div className="vault_prices1_cont1">
                    <p className="vault_prices1txt1">
                      <span className="next">Next</span>{" "}
                      <span className="vault_prices1txt1aa">
                        {" "}
                        {tickerPrice}
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
                        $
                        {canshake
                          ? parseFloat(
                              tickerPrice * chainLoanDetails.collateral
                            ).toFixed(2)
                          : "0.00"}
                      </h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : `price_value_change  ${formData.stateLiquidationWarning}`
                        }
                        // onChange={handleInputChange}
                      >
                        <div className={`price_value_change_value`}>
                          <NumberFormat
                            value={tickerPrice * formData.stateCollateral}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="$"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="vault_prices1_cont1">
                    <p className="vault_prices1txt1">
                      <span className="next">
                        {canshake ? chainLoanDetails.collateral : "0.00"}
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
                    {canshake ? chainLoanDetails.debt : "0.00"} {base}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : `price_value_change ${formData.stateLiquidationWarning}`
                    }
                  >
                    <div className={`price_value_change_value`}>
                      {formData.stateAmountToGenerate}
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
                    {canshake ? chainLoanDetails.collateral : "0.00"} {asset}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : `price_value_change ${formData.stateLiquidationWarning}`
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
                      ? chainLoanDetails.max - chainLoanDetails.debt
                      : "0.00"}{" "}
                    {base}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : `price_value_change ${formData.stateLiquidationWarning}`
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
                        placeholder={`0.00 ${asset}`}
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
                          $0.00 - ${formData.stateLiquidationPrice}
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
                  <button onClick={openCDP} className="open_vault_input_btn">
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
                                <div className="vault_input">
                                  <input
                                    type="text"
                                    name="stateAmountToGenerate"
                                    value={chainLoanDetails.debt}
                                    readonly
                                    className="vault_input_vaulta"
                                  />
                                  <br />
                                  <br />
                                  <br />
                                  <div style={{ textAlign: "center" }}>
                                    <button
                                      onClick={payBackCDP}
                                      className="open_vault_input_btn"
                                    >
                                      Pay Back {chainLoanDetails.debt} {base}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </TabPane>
                            <TabPane tabId="topup">
                              <div className="open_vault_area2b">
                                <div className="open_vault_input_titles">
                                  <span className="vault_input0">
                                    Deposit {asset}
                                  </span>
                                  <span className="vault_input1">
                                    Balance {coinBalance} {asset}
                                  </span>
                                </div>
                                <div className="vault_input">
                                  <input
                                    type="number"
                                    name="stateTopUp"
                                    // value={formData.stateTopUp}
                                    className="vault_input_vaulta"
                                    onKeyUp={(e) => onTopup(e)}
                                    onChange={(e) => onTopup(e)}
                                  />
                                  <br />
                                  <br />
                                  <br />
                                  <div style={{ textAlign: "center" }}>
                                    <button
                                      onClick={topUpCDP}
                                      className="open_vault_input_btn"
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
                                <div className="vault_input">
                                  <input
                                    type="number"
                                    name="stateTopUp"
                                    // value={formData.stateTopUp}
                                    className="vault_input_vaulta"
                                    onKeyUp={(e) => onTopup(e)}
                                    onChange={(e) => onTopup(e)}
                                  />
                                  <br />
                                  <br />
                                  <br />
                                  <div style={{ textAlign: "center" }}>
                                    <button
                                      onClick={withdrawCDP}
                                      className="open_vault_input_btn"
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
        className="walletModal mx-auto"
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <ModalBody className="p-4" style={{ background: "#f7f8fa" }}>
          <div style={{ marginTop: "190px" }}>
            {stage == "unlock" ? (
              <div>
                <div className="row">
                  <h1 className="mb-2 text-center">
                    <FontAwesomeIcon icon={faLock} />
                  </h1>

                  <small className="mb-2 text-center">
                    Approve <b>Egoras</b> to spend{" "}
                    {task == "collateral" || task == "topup" ? asset : base} on
                    your behalf.
                  </small>
                  <div
                    className="transact-stat col-md-6 "
                    style={{ margin: "auto" }}
                  >
                    <div className="w-100 ">
                      <input
                        type="text"
                        name="stateAmountToGenerate"
                        value={formData.stateCollateral}
                        readonly
                        className="vault_input_vaulta"
                      />
                    </div>

                    <div className="text-center">
                      <button
                        className="open_vault_input_btn mt-4 btn-block"
                        style={{ padding: "0.9em 4.5em" }}
                        onClick={(e) => doUnluck(e)}
                      >
                        {isLoading ? (
                          <FontAwesomeIcon icon={faCircleNotch} spin />
                        ) : null}{" "}
                        Unlock {asset}
                      </button>
                    </div>
                  </div>
                </div>

                <br />
              </div>
            ) : null}

            {stage == "loading" ? (
              <div>
                <p
                  className="text-center loadingContainer"
                  style={{ fontSize: "54px" }}
                >
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                </p>
                <p className="text-center">{text}</p>
              </div>
            ) : null}

            {stage == "success" ? (
              <div className="col-md-12 mt-4">
                <h1 className="text-center text-success">
                  <FontAwesomeIcon icon={faCheckCircle} /> <br />
                  Success
                </h1>
                <p className="text-center">
                  Transaction was successful.
                  <br />
                  <a
                    className="btn btn-link text-success"
                    href={"https://testnet.bscscan.com/tx/" + hash}
                    target="_blank"
                  >
                    View on bscscan.com
                  </a>
                  <br />
                  <button
                    className="open_vault_input_btn mt-4 btn-block btn-lg"
                    onClick={(e) => Continue(e)}
                  >
                    Continue
                  </button>
                </p>
              </div>
            ) : null}

            {stage == "error" ? (
              <div className=" mt-4">
                <h1 className="text-center text-danger">
                  <FontAwesomeIcon icon={faWindowClose} /> <br />
                  Error
                </h1>
                <p className="text-center">
                  {text}
                  <br />

                  <br />
                  <button
                    className="open_vault_input_btn mt-4 btn-block btn-lg"
                    onClick={(e) => Continue(e)}
                  >
                    Continue
                  </button>
                </p>
              </div>
            ) : null}

            {stage == "connect" ? (
              <div className=" text-center mt-4">
                <h1 className="text-center">
                  <FontAwesomeIcon icon={faWallet} /> <br />
                </h1>
                <p>To access this please connect your wallet</p>
              </div>
            ) : null}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default OpenVaultPage;
