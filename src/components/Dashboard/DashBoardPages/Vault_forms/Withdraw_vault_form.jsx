import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";

import { Link } from "react-router-dom";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../../../css/openVault.css";

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

const Withdraw_vault_form = ({ match }) => {
  // const firstElement = useRef(null);

  const [value, setValue] = useState("");
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");
  const [eusdValue, setEusdValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000000);
  const [validDiv, setValidDiv] = useState("not_ifValidDiv");
  const [buttonOpen, setButtonOpen] = useState("generate_eusd_cont1");
  const [buttonOpen2, setButtonOpen2] = useState("not_generate_eusd_cont");

  const [amount, setAmount] = useState("Enter an amount");
  const [vaultPrice, setVaultPrice] = useState("not_price_value_change");
  // const [valued, setValued] = useState(0);
  // const [valueToNum, setValueToNum] = useState(0);

  // ====================
  // ====================

  useEffect(() => {
    setAsset(match.params.asset);
    setBase(match.params.base);
    window.scrollTo(0, 0);
    console.log(match.params.asset, "work", match.params.base);
  }, []);
  // ====================
  // ====================
  // ====================
  // ====================

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
  console.log(tokenPrice);
  // ========================
  // ========================
  // ========================
  // ========================
  // const tokenDecimal = decimalPlace * 65350;
  const handleInputChange = (e) => {
    console.log(e.target.value + " i work");
    setValue(removeNonNumeric(e.target.value));
    if (e.target.value <= 0) {
      setVaultPrice("not_price_value_change");
      setAmount("Enter an amount");
      setValidDiv("not_ifValidDiv");
    } else if (e.target.value > 0) {
      setVaultPrice("price_value_change");
      setAmount("Setup up proxy");
      setValidDiv("ifValidDiv");
    }
  };
  const handleInputChanga = (e) => {
    console.log(e.target.value + " i work");
    setEusdValue(removeNonNumeric(e.target.value));
    if (e.target.value <= 0) {
      setEusdValue(0.0);
    } else if (e.target.value > 0) {
      setEusdValue(e.target.value);
    }
    // setVaultPrice("price_value_change");

    // e.target.value.replace(",", "");
    // setValueToNum(+e.target.value);
  };

  // ========================
  // ========================
  // ========================
  // ========================
  // // console.log(+valueToNum);
  // // Number("123");

  return (
    <div className="vault_page">
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
                Stable Fee <span className="vault_percent">2.50%</span>
              </p>

              <p className="vault_tbd">
                Liquidation Fee <span className="vault_percent">13%</span>
              </p>

              <p className="vault_tbd">Min. collateral ratio </p>

              <p className="vault_tbd">
                Dust Limit <span className="vault_percent"> $10,000.00</span>
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
                      <h3 className="vault_prices1amount">$0.00</h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : "price_value_change"
                        }
                      >
                        <div className="price_value_change_value">
                          ${decimalPlaceB}
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
                      <h3 className="vault_prices1amount">0.00%</h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : "price_value_change"
                        }
                      >
                        <div className="price_value_change_value">
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
                      <h3 className="vault_prices1amount">$64,350.90</h3>
                    </div>
                  </div>
                  <div className="vault_prices1_cont1">
                    <p className="vault_prices1txt1">
                      <span className="next">Next</span>{" "}
                      <span className="vault_prices1txt1aa">
                        {" "}
                        $63,600.00 -0.78%
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
                      <h3 className="vault_prices1amount">$0.00</h3>
                      <div
                        className={
                          vaultPrice == "not_price_value_change"
                            ? "not_price_value_change"
                            : "price_value_change"
                        }
                        // onChange={handleInputChange}
                      >
                        <div className="price_value_change_value">
                          <NumberFormat
                            value={tokenPrice}
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
                      <span className="next">0.00000</span>{" "}
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
                    0.0000 {base}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : "price_value_change"
                    }
                  >
                    <div className="price_value_change_value">
                      {decimalPlaceB}
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
                    0.00000 {asset}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : "price_value_change"
                    }
                  >
                    <div className="price_value_change_value">
                      {decimalPlace} {asset} after
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
                    0.0000 {base}
                  </div>
                  <div
                    className={
                      vaultPrice == "not_price_value_change"
                        ? "not_price_value_change"
                        : "price_value_change"
                    }
                  >
                    <div className="price_value_change_value">
                      <NumberFormat
                        value={tokenPrice}
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
            <div className="open_vault_area2">
              <div className="open_vault_area2ss">
                <div className="open_vault_area2a">
                  <div className="open_vault_area2a_heading">
                    <p className="configure">Configure your Vault </p>
                  </div>
                  Simulate your vault by configuring the amount of collateral to
                  deposit, and {base} to generate.
                </div>
                <div className="open_vault_area2b">
                  <div className="open_vault_input_titles">
                    <span className="vault_input0">Withdraw {asset}</span>
                    <span className="vault_input1">Balance 0.00 {asset}</span>
                  </div>
                  <div className="vault_input">
                    <input
                      type="number"
                      name="value"
                      id="value"
                      // {value}

                      // value={value}
                      className="vault_input_vault"
                      placeholder={`0.00 ${asset}`}
                      onChange={handleInputChange}
                      // onKeyUp={(e) => onKeyUp(e)}
                    />
                  </div>
                </div>
                {/* ifvalid div start */}
                {/* ifvalid div start */}
                {/* ifvalid div start */}
                {/* ifvalid div start */}
                {/* ifvalid div start */}
                {/* ifvalid div start */}
                {/* <div
                  className={
                    validDiv == "not_ifValidDiv"
                      ? "not_ifValidDiv"
                      : "ifValidDiv"
                  }
                > */}
                {/* <div
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
                      <AddIcon className="add_icon" /> Generate {base} with this
                      transaction
                    </button>
                  </div>
                  {/* <div
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
                        Max {maxValue} {base}
                      </span>
                    </div>
                    <input
                      type="number"
                      name="value"
                      id="value"
                      // {value}

                      className="vault_input_vaulta"
                      placeholder={base}
                      onChange={handleInputChanga}
                      // onKeyUp={(e) => onKeyUp(e)}
                    />
                  </div> */}
                {/* <hr className="horizontal" />
                </div> */}{" "}
                <button className="open_vault_input_btn">Withdraw Asset</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Withdraw_vault_form;
