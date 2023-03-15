import React, { useState, useEffect, useRef } from "react";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import "./UpdatedSwap.css";
import { UpdatedTokenModal } from "./TokenModal/UpdatedTokenModal";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "../../../../static/MockData";
const UpdatedSwap = () => {
  const [tokenModal, setTokenModal] = useState(false);
  const [tokenModal2, setTokenModal2] = useState(false);
  const [id, setId] = useState("1");
  const [id2, setId2] = useState("");
  const [ida, setIda] = useState("1");
  const [id2b, setId2b] = useState("");
  const [initialId, setInitialId] = useState("");
  const [initialId2, setInitialId2] = useState("");
  const [initialIda, setInitialIda] = useState("");
  const [initialId2b, setInitialId2b] = useState("");
  const [SwapAmount, setSwapAmount] = useState("");
  const [swapBaseAmount, setSwapBaseAmount] = useState("");
  const [SwapBalance, setSwapBalance] = useState("");
  var array = [
    {
      month: "Jan",
      timestamp: "6:40 AM",
      value: 188,
    },
    {
      month: "Oct",
      timestamp: "10:26 PM",
      value: 262,
    },
    {
      month: "May",
      timestamp: "9:29 PM",
      value: 609,
    },
    {
      month: "Nov",
      timestamp: "9:21 AM",
      value: 712,
    },
    {
      month: "Aug",
      timestamp: "1:24 AM",
      value: 866,
    },
    {
      month: "Jan",
      timestamp: "2:45 PM",
      value: 887,
    },
    {
      month: "Dec",
      timestamp: "7:29 PM",
      value: 1055,
    },
    {
      month: "Feb",
      timestamp: "4:20 PM",
      value: 1070,
    },
    {
      month: "Jul",
      timestamp: "1:23 AM",
      value: 1348,
    },
    {
      month: "Jul",
      timestamp: "12:23 AM",
      value: 1386,
    },
    {
      month: "Oct",
      timestamp: "7:29 AM",
      value: 1391,
    },
    {
      month: "Sep",
      timestamp: "1:36 AM",
      value: 1635,
    },
    {
      month: "Jul",
      timestamp: "4:05 AM",
      value: 1671,
    },
    {
      month: "Sep",
      timestamp: "11:59 PM",
      value: 1749,
    },
    {
      month: "Jan",
      timestamp: "7:53 PM",
      value: 1901,
    },
    {
      month: "Sep",
      timestamp: "8:46 PM",
      value: 2047,
    },
    {
      month: "Apr",
      timestamp: "6:30 PM",
      value: 2051,
    },
    {
      month: "May",
      timestamp: "3:18 PM",
      value: 2200,
    },
    {
      month: "Sep",
      timestamp: "1:36 AM",
      value: 1635,
    },
    {
      month: "Jul",
      timestamp: "4:05 AM",
      value: 1671,
    },
    {
      month: "Sep",
      timestamp: "11:59 PM",
      value: 1749,
    },
    {
      month: "Jan",
      timestamp: "7:53 PM",
      value: 1901,
    },
    {
      month: "Sep",
      timestamp: "8:46 PM",
      value: 2047,
    },
    {
      month: "Apr",
      timestamp: "6:30 PM",
      value: 2051,
    },
    {
      month: "May",
      timestamp: "3:18 PM",
      value: 2200,
    },
    {
      month: "Aug",
      timestamp: "3:18 AM",
      value: 2220,
    },
    {
      month: "Sep",
      timestamp: "11:56 AM",
      value: 2247,
    },
    {
      month: "Jan",
      timestamp: "7:31 PM",
      value: 2288,
    },
    {
      month: "Feb",
      timestamp: "1:17 PM",
      value: 2598,
    },
    {
      month: "Jan",
      timestamp: "10:19 PM",
      value: 2656,
    },
    {
      month: "Nov",
      timestamp: "2:42 PM",
      value: 2821,
    },
    {
      month: "Feb",
      timestamp: "1:15 AM",
      value: 2898,
    },
    {
      month: "Sep",
      timestamp: "6:19 PM",
      value: 2910,
    },
    {
      month: "Aug",
      timestamp: "12:19 AM",
      value: 2942,
    },
    {
      month: "Jan",
      timestamp: "5:24 AM",
      value: 2951,
    },
    {
      month: "May",
      timestamp: "10:53 PM",
      value: 3059,
    },
    {
      month: "Mar",
      timestamp: "4:53 PM",
      value: 3174,
    },
    {
      month: "Apr",
      timestamp: "9:56 PM",
      value: 3253,
    },
    {
      month: "Sep",
      timestamp: "4:28 AM",
      value: 3359,
    },
    {
      month: "Nov",
      timestamp: "6:08 AM",
      value: 3596,
    },
    {
      month: "Jan",
      timestamp: "2:15 AM",
      value: 3848,
    },
    {
      month: "Apr",
      timestamp: "11:51 PM",
      value: 4088,
    },
    {
      month: "Sep",
      timestamp: "11:43 PM",
      value: 4176,
    },
    {
      month: "Feb",
      timestamp: "5:57 AM",
      value: 4328,
    },
    {
      month: "Jan",
      timestamp: "12:03 AM",
      value: 4375,
    },
    {
      month: "Mar",
      timestamp: "5:23 AM",
      value: 4443,
    },
    {
      month: "Feb",
      timestamp: "6:12 AM",
      value: 4616,
    },
    {
      month: "Jul",
      timestamp: "3:40 PM",
      value: 4719,
    },
    {
      month: "Feb",
      timestamp: "9:28 PM",
      value: 4742,
    },
    {
      month: "Feb",
      timestamp: "3:58 PM",
      value: 4972,
    },
    {
      month: "May",
      timestamp: "2:30 PM",
      value: 4974,
    },
    {
      month: "May",
      timestamp: "3:04 AM",
      value: 5019,
    },
    {
      month: "Jul",
      timestamp: "9:10 PM",
      value: 5253,
    },
    {
      month: "Sep",
      timestamp: "3:06 AM",
      value: 5331,
    },
    {
      month: "May",
      timestamp: "7:25 PM",
      value: 5420,
    },
    {
      month: "Jan",
      timestamp: "8:19 PM",
      value: 5441,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Oct",
      timestamp: "1:49 AM",
      value: 5640,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },
    {
      month: "Mar",
      timestamp: "2:10 AM",
      value: 5807,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "May",
      timestamp: "8:05 AM",
      value: 6006,
    },
    {
      month: "Apr",
      timestamp: "4:48 PM",
      value: 6150,
    },
    {
      month: "Aug",
      timestamp: "1:41 PM",
      value: 6218,
    },
    {
      month: "Aug",
      timestamp: "6:23 PM",
      value: 6655,
    },

    {
      month: "Jul",
      timestamp: "9:10 PM",
      value: 5253,
    },
    {
      month: "Sep",
      timestamp: "3:06 AM",
      value: 5331,
    },
    {
      month: "May",
      timestamp: "7:25 PM",
      value: 5420,
    },
    {
      month: "Jan",
      timestamp: "8:19 PM",
      value: 5441,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Oct",
      timestamp: "1:49 AM",
      value: 5640,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },
    {
      month: "Mar",
      timestamp: "2:10 AM",
      value: 5807,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },
    {
      month: "Mar",
      timestamp: "2:10 AM",
      value: 5807,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "May",
      timestamp: "8:05 AM",
      value: 6006,
    },
    {
      month: "Apr",
      timestamp: "4:48 PM",
      value: 6150,
    },
    {
      month: "Aug",
      timestamp: "1:41 PM",
      value: 6218,
    },
    {
      month: "May",
      timestamp: "12:24 AM",
      value: 6799,
    },
    {
      month: "Jul",
      timestamp: "10:26 AM",
      value: 5984,
    },
    {
      month: "Oct",
      timestamp: "5:16 PM",
      value: 5678,
    },

    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Sep",
      timestamp: "3:06 AM",
      value: 5331,
    },
    {
      month: "May",
      timestamp: "7:25 PM",
      value: 5420,
    },
    {
      month: "Jan",
      timestamp: "8:19 PM",
      value: 5441,
    },
    {
      month: "Sep",
      timestamp: "4:28 PM",
      value: 5443,
    },
    {
      month: "Jun",
      timestamp: "12:54 PM",
      value: 5521,
    },
    {
      month: "Mar",
      timestamp: "5:23 AM",
      value: 4443,
    },
    {
      month: "Feb",
      timestamp: "6:12 AM",
      value: 4616,
    },
    {
      month: "Jul",
      timestamp: "3:40 PM",
      value: 4719,
    },
    {
      month: "Feb",
      timestamp: "9:28 PM",
      value: 4742,
    },
    {
      month: "Feb",
      timestamp: "6:12 AM",
      value: 4616,
    },
    {
      month: "Mar",
      timestamp: "5:23 AM",
      value: 4443,
    },
    {
      month: "Jan",
      timestamp: "12:03 AM",
      value: 4375,
    },
    {
      month: "Feb",
      timestamp: "5:57 AM",
      value: 4328,
    },
    {
      month: "Sep",
      timestamp: "11:43 PM",
      value: 4176,
    },
  ];
  const assets = [
    {
      id: "1",
      img: "/img/tokens-folder/bnb_icon.png",
      name: "Binance Smart Chain",
      symbol: "BNB",
      favorite: "true",
      balance: 0.02,
    },
    {
      id: "2",
      img: "/img/tokens-folder/busd_icon.png",
      name: "Binance Usd",
      symbol: "BUSD",
      favorite: "true",
      balance: 13000,
    },
    {
      id: "3",
      img: "/img/tokens-folder/ada_icon.png",
      name: "Ada Network",
      symbol: "ADA",
      balance: 10000,
    },
    {
      id: "4",
      img: "/img/tokens-folder/doge_icon.png",
      name: "Doge Coin",
      symbol: "DOGE",
      balance: 3000000,
    },
    {
      id: "5",
      img: "/img/tokens-folder/inc_icon.png",
      name: "1 inch Network",
      symbol: "1inch",
      balance: 3000,
    },
    {
      id: "6",
      img: "/img/tokens-folder/pancake_icon.png",
      name: "PancakeSwap Token",
      symbol: "CAKE",
      balance: 5000,
    },
    {
      id: "7",
      img: "/img/tokens-folder/wbnb_icon.png",
      name: "Wrapped Binance Coin",
      symbol: "WBNB",
      balance: 10,
    },
    {
      id: "8",
      img: "/img/tokens-folder/usdt_icon.png",
      name: "Tether",
      symbol: "USDT",
      favorite: "true",
      balance: 100000,
    },
    {
      id: "9",
      img: "/img/tokens-folder/dodo_icon.png",
      name: "Dodo Network",
      symbol: "DODO",
      balance: 1000,
    },
    {
      id: "10",
      img: "/img/tokens-folder/usdsc_icon.png",
      name: "USDC Coin",
      symbol: "USDC",
      favorite: "true",
      balance: 10000,
    },
    {
      id: "11",
      img: "/img/tokens-folder/dai_icon.png",
      name: "Dai Token",
      symbol: "DAI",
      balance: 5000,
    },
  ];
  // ================================
  // ================================
  // ================================
  // ================================
  // ===========Swap Functions Start=====================
  // ================================
  // ================================
  // ================================
  // ================================
  const ToggleTokenModal = () => {
    setTokenModal(!tokenModal);
    setInitialId(id);
  };
  const ToggleTokenModal2 = () => {
    setTokenModal2(!tokenModal2);
    setInitialId2(id2);
  };
  const setAssetsId = (e) => {
    setId(e.currentTarget.id);
    setIda(e.currentTarget.id);
    ToggleTokenModal();
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == id2) {
      console.log("id is equal id2");
      setId2(initialId);
      setId2b(initialId);
      return;
    }
    setSwapBalance("");
  };
  const setAssetsId2 = (e) => {
    setId2(e.currentTarget.id);
    setId2b(e.currentTarget.id);
    ToggleTokenModal2();
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == id) {
      console.log("id is equal id2");
      setId(initialId2);
      setIda(initialId2);
      return;
    }
  };
  const onChangeSwapAmount = (e) => {
    setSwapAmount(e.target.value);
    // setSwapBaseAmount(e.target.value * 4);
    // if (e.target.value == 0) {
    //   setSwapBaseAmount("");
    // }
    console.log(e.target.value);
  };
  const ToggleSwapInputs = () => {
    setId(id2);
    setId2(id);
  };
  const ToggleSwapPrices = () => {
    setIda(id2b);
    setId2b(ida);
  };

  const add25Per = (balance) => {
    setSwapAmount(balance * 0.25);
    // setSwapBaseAmount(SwapAmount * 4);
  };
  const add50Per = (balance) => {
    setSwapAmount(balance * 0.5);
  };
  const add75Per = (balance) => {
    setSwapAmount(balance * 0.75);
  };
  const add100Per = (balance) => {
    setSwapAmount(balance * 1);
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
  const lastIndex = array.length - 1;
  const LastArray = array[lastIndex];
  const [ChartValue, setChartValue] = useState(LastArray.value);
  const [ChartTime, setChartTime] = useState(LastArray.timestamp);
  const [ChartValue2, setChartValue2] = useState(LastArray.value);
  const [ChartTime2, setChartTime2] = useState(LastArray.timestamp);
  function formatNumber(number) {
    const abbreviations = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
    };

    const num = parseFloat(number);

    for (const abbreviation in abbreviations) {
      if (
        num >= abbreviations[abbreviation] &&
        num < abbreviations[abbreviation] * 1000
      ) {
        return `${(num / abbreviations[abbreviation]).toFixed(
          1
        )}${abbreviation}`;
      }
    }

    return num.toLocaleString();
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      setChartValue(payload[0].value);
      setChartTime(payload[0].payload.timestamp);
    } else {
      setChartValue(LastArray.value);
      setChartTime(LastArray.timestamp);
    }
    return null;
  };
  return (
    <div className="other2">
      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="liquidity_area">
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
                              onChange={onChangeSwapAmount}
                              value={SwapAmount}
                            />
                            <div className="amnt_input_layer1_input_div_dollar_value">
                              ~${SwapAmount * 750}
                            </div>
                          </div>

                          {id == "" ? (
                            <div className="Swap_icondropDownDiv">
                              <span className="token_balances_span">
                                Balance:0.00
                              </span>

                              <button
                                className="display_tokens_drop"
                                onClick={ToggleTokenModal}
                              >
                                Select a token
                                <ArrowDropDownIcon className="drop_down_icon" />
                              </button>
                            </div>
                          ) : (
                            <>
                              {assets.map((data) => {
                                // setSwapBalance(data.balance);
                                return (
                                  <>
                                    {data.id == id ? (
                                      <div className="Swap_icondropDownDiv">
                                        <span className="token_balances_span">
                                          Balance:{data.balance}
                                        </span>

                                        <button
                                          className="display_tokens_drop"
                                          onClick={ToggleTokenModal}
                                        >
                                          <img
                                            src={data.img}
                                            alt=""
                                            className="asset_icon"
                                          />
                                          {data.symbol}
                                          <ArrowDropDownIcon className="drop_down_icon" />
                                        </button>
                                      </div>
                                    ) : null}
                                  </>
                                );
                              })}
                            </>
                          )}
                        </div>
                        {id == "" ? (
                          <div className="amnt_input_layer2">
                            <button className="amnt_input_layer2_cont1">
                              25%
                            </button>
                            <button className="amnt_input_layer2_cont1">
                              50%
                            </button>
                            <button className="amnt_input_layer2_cont1">
                              75%
                            </button>
                            <button className="amnt_input_layer2_cont1_last">
                              100%
                            </button>
                          </div>
                        ) : (
                          <>
                            {assets.map((data) => {
                              // setSwapBalance(data.balance);
                              return (
                                <>
                                  {data.id == id ? (
                                    <div className="amnt_input_layer2">
                                      <button
                                        className="amnt_input_layer2_cont1"
                                        onClick={() => add25Per(data.balance)}
                                      >
                                        25%
                                      </button>
                                      <button
                                        className="amnt_input_layer2_cont1"
                                        onClick={() => add50Per(data.balance)}
                                      >
                                        50%
                                      </button>
                                      <button
                                        className="amnt_input_layer2_cont1"
                                        onClick={() => add75Per(data.balance)}
                                      >
                                        75%
                                      </button>
                                      <button
                                        className="amnt_input_layer2_cont1_last"
                                        onClick={() => add100Per(data.balance)}
                                      >
                                        100%
                                      </button>
                                    </div>
                                  ) : null}
                                </>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>

                    {/* <div className="plus_icon_layer"> */}
                    <SwapVertIcon
                      className="toggle_swap_inputs"
                      onClick={ToggleSwapInputs}
                    />

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
                              value={
                                SwapAmount == "" || id2 == ""
                                  ? " "
                                  : SwapAmount * 4
                              }
                            />
                            <div className="amnt_input_layer1_input_div_dollar_value">
                              ~$
                              {(SwapAmount == "" || id2 == ""
                                ? " "
                                : SwapAmount * 4) * 750}
                            </div>
                          </div>
                          {id2 == "" ? (
                            <div className="Swap_icondropDownDiv">
                              <span className="token_balances_span">
                                Balance:0.00
                              </span>

                              <button
                                className="display_tokens_drop"
                                onClick={ToggleTokenModal2}
                              >
                                Select a token
                                <ArrowDropDownIcon className="drop_down_icon" />
                              </button>
                            </div>
                          ) : (
                            <>
                              {assets.map((data) => (
                                <>
                                  {data.id == id2 ? (
                                    <div className="Swap_icondropDownDiv">
                                      <span className="token_balances_span">
                                        Balance:{data.balance}
                                      </span>

                                      <button
                                        className="display_tokens_drop"
                                        onClick={ToggleTokenModal2}
                                      >
                                        <img
                                          src={data.img}
                                          alt=""
                                          className="asset_icon"
                                        />
                                        {data.symbol}
                                        <ArrowDropDownIcon className="drop_down_icon" />
                                      </button>
                                    </div>
                                  ) : null}
                                </>
                              ))}
                            </>
                          )}
                        </div>
                        {/* <div className="amnt_input_layer2">
                          <button className="amnt_input_layer2_cont1">
                            25%
                          </button>
                          <button className="amnt_input_layer2_cont1">
                            50%
                          </button>
                          <button className="amnt_input_layer2_cont1">
                            75%
                          </button>
                          <button className="amnt_input_layer2_cont1_last">
                            100%
                          </button>
                        </div> */}
                      </div>
                    </div>

                    {/* </div> */}
                  </div>

                  <div className="swap_price_rate_div">
                    {ida == "" ? (
                      <div className="swap_price_rate_div1">Nil</div>
                    ) : (
                      <>
                        {assets.map((data) => {
                          // setSwapBalance(data.balance);
                          return (
                            <>
                              {data.id == ida ? (
                                <div className="swap_price_rate_div1">
                                  1 {data.symbol}
                                </div>
                              ) : null}
                            </>
                          );
                        })}
                      </>
                    )}
                    =
                    {id2b == "" ? (
                      <div className="swap_price_rate_div2">Nil</div>
                    ) : (
                      <>
                        {assets.map((data) => {
                          // setSwapBalance(data.balance);
                          return (
                            <>
                              {data.id == id2b ? (
                                <div className="swap_price_rate_div2">
                                  20 {data.symbol}
                                </div>
                              ) : null}
                            </>
                          );
                        })}
                      </>
                    )}
                    <SwapHorizIcon
                      className="swap_price_rate_div_swap_icon"
                      onClick={ToggleSwapPrices}
                    />
                  </div>
                  <button
                    id="generate"
                    // style={{ marginTop: "10px" }}
                    class="updatedSwapSwapBtn"
                  >
                    Enter an amount
                  </button>
                  <div className="moreSwapInfoDiv">
                    <div className="moreSwapInfoDiv_div1">More Information</div>
                    <div className="moreSwapInfoDiv_div2">
                      <div className="moreSwapInfoDiv_div2_area1">
                        <div className="moreSwapInfoDiv_div2_area1_cont1">
                          Minimum Received
                        </div>
                        {id2 == "" ? (
                          <div className="moreSwapInfoDiv_div2_area1_cont2">
                            Nil
                          </div>
                        ) : (
                          <>
                            {assets.map((data) => {
                              return (
                                <>
                                  {data.id == id2 ? (
                                    <div className="moreSwapInfoDiv_div2_area1_cont2">
                                      {SwapAmount == ""
                                        ? " "
                                        : SwapAmount * 3.8}
                                      <span>
                                        {"  "} {data.symbol}
                                      </span>
                                    </div>
                                  ) : null}
                                </>
                              );
                            })}
                          </>
                        )}
                      </div>
                      <div className="moreSwapInfoDiv_div2_area1">
                        <div className="moreSwapInfoDiv_div2_area1_cont1">
                          Gas Fee
                        </div>
                        <div className="moreSwapInfoDiv_div2_area1_cont2">
                          $7.75
                        </div>
                      </div>
                      <div className="moreSwapInfoDiv_div2_area1">
                        <div className="moreSwapInfoDiv_div2_area1_cont1">
                          Price Impact
                        </div>
                        <div className="moreSwapInfoDiv_div2_area1_cont2">
                          {"<0.22%"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tradeViewArea">
              <div className="tradeViewAreaCont">
                <div
                  className="analytics_container_1_Amount"
                  onChange={CustomTooltip}
                >
                  ${formatNumber(ChartValue)}
                </div>
                <span className="analytics_container_1_Amount_span">
                  {ChartTime}
                </span>

                <div className="analytics_container_1_chart">
                  <div
                    className="assets_chart_area1a "
                    style={{ width: "100%", height: 220 }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={array}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#60c589"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#60c589"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        {/* <CartesianGrid
                            strokeDasharray="1 1"
                            stroke="#d7d7d7"
                          /> */}
                        <XAxis dataKey="month" stroke="0" />
                        {/* <YAxis stroke="#000" /> */}
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#229e54"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className="assets_chart_area2 "
                    style={{ width: "100%", height: 500 }}
                  >
                    <ResponsiveContainer>
                      <AreaChart
                        width={130}
                        height={10}
                        data={array}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#60c589"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#60c589"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        {/* <CartesianGrid
                            strokeDasharray="1 1"
                            stroke="#d7d7d7"
                          /> */}
                        <XAxis dataKey="month" stroke="0" />
                        {/* <YAxis stroke="#000" /> */}
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#31cb9e"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {tokenModal ? (
        <UpdatedTokenModal
          asset={assets}
          toggleTokenModal={ToggleTokenModal}
          setAsset={setAssetsId}
          tokenModal={tokenModal}
          assetId={id}
        />
      ) : null}
      {tokenModal2 ? (
        <UpdatedTokenModal
          asset={assets}
          toggleTokenModal2={ToggleTokenModal2}
          tokenModal2={tokenModal2}
          setAsset2={setAssetsId2}
          assetId={id2}
        />
      ) : null}
    </div>
  );
};

export default UpdatedSwap;
