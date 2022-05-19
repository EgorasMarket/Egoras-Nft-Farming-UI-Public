import React, { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TokenModal } from "../DashBoardPages/TokenModal/TokenModal";
import data from "../../static/MockData";
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
} from "../../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { ConnectWallet } from "../../auth/ConnectWallet";
import "../../../css/dashboardAddLiquidity.css";
const DashboardAddLiquidtyPage = ({ match }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [tokenBtn, setTokenBtn] = useState(false);
  const [tokenBtn2, setTokenBtn2] = useState(false);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [tokenName, setTokenName] = useState(0);
  const [base, setBase] = useState("");
  const [tokenName2, setTokenName2] = useState(0);

  const [inputVal, setInputVal] = useState();
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
  const onChange = (e) => {
    setInputVal(e.target.value);
  };
  const TokenData = (e) => {
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
  const TokenData2 = (e) => {
    let currentTarget = e.currentTarget.id;
    console.log(currentTarget);
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
  return (
    <div className="other2">
      {/* Tokens Section Start */}
      <section>
        <div className="container">
          <div className="liquidity_area">
            <div className="liquidity_cont">
              <div className="liquidity_cont_head">
                <div className="liquidity_cont_head_text">Add Liquidity</div>
                <SettingsIcon className="settings_icon" />
              </div>
              <div className="liquidity_cont_body">
                <div className="liquidity_cont_body_conts">
                  <div className="tips_layer">
                    <div className="tips_writeUp">
                      <span className="tip_sub_head">Tip: </span> When you add
                      liquidity, you will receive pool tokens representing your
                      position. These tokens automatically earn fees
                      proportional to your share of the pool, and can be
                      redeemed at any time.
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
                        value={tokenBtn2 == true ? inputVal * 200 : null}
                      />
                      {tokenBtn2 == false ? (
                        <button
                          className="display_tokens_drop display_tokens_drop_not_select "
                          onClick={toggleModal2}
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
                                onClick={toggleModal2}
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
                    <ConnectWallet
                      isHome="false"
                      connect_btn="connect_btn"
                      connect_btn_class="connect_btn_div"
                      onClick={() => setConnected(true)}
                      className="connect_btn"
                      btn_txt="Enter an amount"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {allDatas.map((data) => (
        <>
          {tokenData == data.transaction_hash ? (
            <div className="trans_div">
              <div className="tranPop_div">
                <div className="tranPopHeading">
                  Deposit Details{" "}
                  <span className="tranPopOutButton">
                    <CloseIcon
                      className="closeTranPopDiv"
                      onClick={closeTranPop}
                    />
                  </span>
                </div>
                <div className="tranPop_div_cont1">
                  {" "}
                  <div className="deposited_icon">
                    <ArrowDownwardIcon className="arrow_down_deposit_icon" />
                  </div>
                  <span className="transPopData">Deposited</span>
                </div>
                <div className="tranPop_div_cont1">
                  Type{" "}
                  <span className="transPopData"> {data.transaction_type}</span>{" "}
                </div>
                <div className="tranPop_div_cont1">
                  Amount{" "}
                  <span className="transPopData">
                    ₦{numberWithCommas(parseInt(data.amount).toFixed(2))}
                  </span>{" "}
                </div>
                <div className="tranPop_div_cont1">
                  Channel <span className="transPopData">{data.channel}</span>
                </div>
                <div className="tranPop_div_cont1">
                  Status{" "}
                  <span className="transPopData">
                    <CircleIcon className="complete_circle" />
                    Completed
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ))} */}
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
  );
};

export default DashboardAddLiquidtyPage;
