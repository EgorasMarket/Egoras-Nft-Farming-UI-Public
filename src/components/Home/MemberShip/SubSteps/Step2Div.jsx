import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ContentLoading } from "react-content-loading";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScaleLoader from "react-spinners/ScaleLoader";
import PayViaFortModal from "../PayViaFortModal";
import { ConvertToNGN } from "../../../../utils/helper";

export const Step2Div = ({
  checkMonthBox,
  toggleSteps,
  checkedMonth,
  checkedYear,
  checkYearBox,
  toggleCheckAgree,
  checkAgree,
  fundDisable,
  checkedSemiAnnual,
  checkSemiAnnualBox,
  semiAnnualAmount,
  monthAmount,
  AnnualAmount,
  Subscribe,
  Subscribe2,
  Subscribe3,
  SubscribeRef,
  Subscribe2Ref,
  Subscribe3Ref,
  unlockBtn,
  UnlockToken,
  props,
  priceLoaded,
  disable,
  isLoading,
  payviaFort,
  togglePayViaFortDiv,
  account,
}) => {
  const [egcUsd, setEgcUsd] = useState(0);
  const [refButton, setRefButton] = useState(false);

  const [qr_data, setQrData] = useState({});
  const [currentCountry, setCurrentCountry] = useState("");
  useEffect(() => {
    let age = localStorage.getItem("mTYx");
    console.log(age);
    setCurrentCountry(age);
  }, []);
  useEffect(
    async (e) => {
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          setEgcUsd(() => egc_usd_val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [egcUsd]
  );
  useEffect(() => {
    console.log(localStorage.tank);
    if (localStorage.tank === undefined) {
      setRefButton(false);
      console.log("local Variable is not here");
    } else {
      setRefButton(true);
      console.log("local variable is " + localStorage.tank);
    }
    console.log(localStorage.tank, "LocalVariable");
  }, []);

  return (
    <div className="selectPlanDiv">
      <div onClick={toggleSteps} className="selectPlanDiv_backButton">
        <ArrowBackIosIcon className="selectPlanDiv_backButton_icon" />
        Back
      </div>
      <div className="selectPlanDiv1">
        <div className="selectPlanDiv1_head">
          Choose the plan that's right for you.
        </div>
        <div className="selectPlanDiv1_sub_head">
          Create Physically backed NFTs using powerful AI tools Stake your
          tokens to get over 12% APY staking rewards Get 40% referral rewards
          Purchase pNFTs/Products at over 10% discounted rate
        </div>
      </div>
      <div className="selectPlanDiv2">
        {priceLoaded == false ? (
          <div className="contentLoaders">
            <div className="selectPlanDiv2_area1 contentLoad">
              <div className="selectPlanDiv2_area1_cont1 contentLoad">
                <ContentLoading
                  placeholderColor="#715caf"
                  loadingColor="#7a5fc0"
                  height="20px"
                  width="20px"
                  borderRadius="10px"
                />
              </div>

              <div className="selectPlanDiv2_area1_cont2 contentLoad">
                <div className="selectPlanDiv2_area1_cont2_head  contentLoad">
                  <div className="selectPlanDiv2_area1_cont2_head_txt contentLoad">
                    <ContentLoading
                      placeholderColor="#715caf"
                      loadingColor="#7a5fc0"
                      height="40px"
                      width="100%"
                      borderRadius="10px"
                    />
                  </div>
                  <div className="selectPlanDiv2_area1_cont2_head_price contentLoad">
                    <ContentLoading
                      placeholderColor="#715caf"
                      loadingColor="#7a5fc0"
                      height="20px"
                      width="100%"
                      borderRadius="10px"
                    />
                  </div>
                </div>
                <div className="selectPlanDiv2_area1_cont2_body contentLoad">
                  <ContentLoading
                    placeholderColor="#715caf"
                    loadingColor="#7a5fc0"
                    height="20px"
                    width="100%"
                    borderRadius="10px"
                  />
                </div>
              </div>
            </div>
            {/* =========== */}
            {/* =========== */}
            {/* =========== */}
            {/* =========== */}
            <div className="selectPlanDiv2_area1 contentLoad">
              <div className="selectPlanDiv2_area1_cont1 contentLoad">
                <ContentLoading
                  placeholderColor="#715caf"
                  loadingColor="#7a5fc0"
                  height="20px"
                  width="20px"
                  borderRadius="10px"
                />
              </div>

              <div className="selectPlanDiv2_area1_cont2 contentLoad">
                <div className="selectPlanDiv2_area1_cont2_head  contentLoad">
                  <div className="selectPlanDiv2_area1_cont2_head_txt contentLoad">
                    <ContentLoading
                      placeholderColor="#715caf"
                      loadingColor="#7a5fc0"
                      height="40px"
                      width="100%"
                      borderRadius="10px"
                    />
                  </div>
                  <div className="selectPlanDiv2_area1_cont2_head_price contentLoad">
                    <ContentLoading
                      placeholderColor="#715caf"
                      loadingColor="#7a5fc0"
                      height="20px"
                      width="100%"
                      borderRadius="10px"
                    />
                  </div>
                </div>
                <div className="selectPlanDiv2_area1_cont2_body contentLoad">
                  <ContentLoading
                    placeholderColor="#715caf"
                    loadingColor="#7a5fc0"
                    height="20px"
                    width="100%"
                    borderRadius="10px"
                  />
                </div>
              </div>
            </div>
            {/* =========== */}
            {/* =========== */}
            {/* =========== */}
            {/* =========== */}
            <div className="selectPlanDiv2_area1 contentLoad">
              <div className="selectPlanDiv2_area1_cont1 contentLoad">
                <ContentLoading
                  placeholderColor="#715caf"
                  loadingColor="#7a5fc0"
                  height="20px"
                  width="20px"
                  borderRadius="10px"
                />
              </div>

              <div className="selectPlanDiv2_area1_cont2 contentLoad">
                <div className="selectPlanDiv2_area1_cont2_head  contentLoad">
                  <div className="selectPlanDiv2_area1_cont2_head_txt contentLoad">
                    <ContentLoading
                      placeholderColor="#715caf"
                      loadingColor="#7a5fc0"
                      height="40px"
                      width="100%"
                      borderRadius="10px"
                    />
                  </div>
                  <div className="selectPlanDiv2_area1_cont2_head_price contentLoad">
                    <ContentLoading
                      placeholderColor="#715caf"
                      loadingColor="#7a5fc0"
                      height="20px"
                      width="100%"
                      borderRadius="10px"
                    />
                  </div>
                </div>
                <div className="selectPlanDiv2_area1_cont2_body contentLoad">
                  <ContentLoading
                    placeholderColor="#715caf"
                    loadingColor="#7a5fc0"
                    height="20px"
                    width="100%"
                    borderRadius="10px"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className={
                checkedMonth == true
                  ? "selectPlanDiv2_area1_active"
                  : "selectPlanDiv2_area1"
              }
              onClick={checkMonthBox}
            >
              <div className="selectPlanDiv2_area1_cont1">
                <input
                  type="radio"
                  id="radio-1"
                  name="radio"
                  checked={checkedMonth}
                  onChange={checkMonthBox}
                />
                <label
                  className="selectPlanDiv2_area1_cont1_label"
                  for="radio-1"
                ></label>
              </div>

              <div className="selectPlanDiv2_area1_cont2">
                <div className="selectPlanDiv2_area1_cont2_head">
                  <div className="selectPlanDiv2_area1_cont2_head_txt">
                    Monthly
                  </div>
                  <div className="selectPlanDiv2_area1_cont2_head_price_div">
                    <div className="selectPlanDiv2_area1_cont2_head_price">
                      {monthAmount}
                      {""}
                      <span className="selectPlanDiv2_area1_cont2_head_price_span">
                        mgptt / mnth
                      </span>{" "}
                    </div>
                    {currentCountry === "Nigeria" ? (
                      <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        &#8358;{" "}
                        {ConvertToNGN(
                          parseFloat(monthAmount * egcUsd).toFixed(2)
                        )}
                      </span>
                    ) : (
                      <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        {" "}
                        ${parseFloat(monthAmount * egcUsd).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="selectPlanDiv2_area1_cont2_body">
                  For the new marketer on a budget who just wants basic tracking
                </div>
              </div>
            </div>
            {/* ======= */}
            {/* ======= */}
            {/* ======= */}
            <div
              className={
                checkedSemiAnnual == true
                  ? "selectPlanDiv2_area1_active"
                  : "selectPlanDiv2_area1"
              }
              onClick={checkSemiAnnualBox}
            >
              <div className="selectPlanDiv2_area1_cont1">
                <input
                  type="radio"
                  id="radio-2"
                  name="radio"
                  checked={checkedSemiAnnual}
                  onChange={checkSemiAnnualBox}
                />
                <label
                  className="selectPlanDiv2_area1_cont1_label"
                  for="radio-2"
                ></label>
              </div>

              <div className="selectPlanDiv2_area1_cont2">
                <div className="selectPlanDiv2_area1_cont2_head">
                  <div className="selectPlanDiv2_area1_cont2_head_txt">
                    Semi-Annually
                  </div>
                  <div className="selectPlanDiv2_area1_cont2_head_price_div">
                    <div className="selectPlanDiv2_area1_cont2_head_price">
                      {semiAnnualAmount}
                      {""}
                      <span className="selectPlanDiv2_area1_cont2_head_price_span">
                        mgptt / 6mnths
                      </span>
                    </div>
                    {currentCountry === "Nigeria" ? (
                      <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        &#8358;{" "}
                        {ConvertToNGN(
                          parseFloat(semiAnnualAmount * egcUsd).toFixed(2)
                        )}
                      </span>
                    ) : (
                      <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        {" "}
                        ${parseFloat(semiAnnualAmount * egcUsd).toFixed(2)}
                      </span>
                    )}
                    {/* <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                      ${parseFloat(semiAnnualAmount * egcUsd).toFixed(2)}
                    </span> */}
                  </div>
                </div>
                <div className="selectPlanDiv2_area1_cont2_body">
                  For the new marketer on a budget who just wants basic tracking
                </div>
              </div>
            </div>
            {/* ======= */}
            {/* ======= */}
            {/* ======= */}
            <div
              className={
                checkedYear == true
                  ? "selectPlanDiv2_area1_active"
                  : "selectPlanDiv2_area1"
              }
              onClick={checkYearBox}
            >
              <div className="selectPlanDiv2_area1_cont1">
                <input
                  type="radio"
                  id="radio-3"
                  name="radio"
                  checked={checkedYear}
                  onChange={checkYearBox}
                />
                <label
                  className="selectPlanDiv2_area1_cont1_label"
                  for="radio-3"
                ></label>
              </div>
              <div className="selectPlanDiv2_area1_cont2">
                <div className="selectPlanDiv2_area1_cont2_head">
                  <div className="selectPlanDiv2_area1_cont2_head_txt">
                    Annually
                  </div>

                  <div className="selectPlanDiv2_area1_cont2_head_price_div">
                    <div className="selectPlanDiv2_area1_cont2_head_price">
                      {AnnualAmount}
                      {""}
                      <span className="selectPlanDiv2_area1_cont2_head_price_span">
                        mgptt / yr
                      </span>
                    </div>
                    {currentCountry === "Nigeria" ? (
                      <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        &#8358;{" "}
                        {ConvertToNGN(
                          parseFloat(AnnualAmount * egcUsd).toFixed(2)
                        )}
                      </span>
                    ) : (
                      <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        {" "}
                        ${parseFloat(AnnualAmount * egcUsd).toFixed(2)}
                      </span>
                    )}
                    {/* <span className="selectPlanDiv2_area1_cont2_head_price_div_span">
                        ${parseFloat(AnnualAmount * egcUsd).toFixed(2)}
                      </span> */}
                  </div>
                </div>
                <div className="selectPlanDiv2_area1_cont2_body">
                  For the new marketer on a budget who just wants basic tracking
                </div>
              </div>
            </div>
            {/* ======= */}
            {/* ======= */}
            {/* ======= */}
            <div className="checkBox_agree_div">
              <div className="checkBox_agree_div_txt">
                By checking the checkbox below, you agree to our{" "}
                <a href="#">Terms of Use, Privacy Statement</a> and that you are
                over 18.
              </div>
              <div className="checkBox_agree_div_body">
                <input
                  type="checkbox"
                  id="checkbox-1"
                  name="checkbox"
                  checked={checkAgree}
                  onChange={toggleCheckAgree}
                />
                <label
                  for="checkbox-1"
                  className="checkBox_agree_div_body_label"
                >
                  <div className="checkBox_agree_div_body_txt">I agree</div>
                </label>
              </div>
            </div>
            {/* ======= */}
            {/* ======= */}
            {/* ======= */}
          </>
        )}

        {refButton === false ? (
          <div className="sub_btn_div">
            {(checkedMonth !== true || checkAgree !== true) &&
            (checkedYear !== true || checkAgree !== true) &&
            (checkedSemiAnnual !== true || checkAgree !== true) ? (
              <button className="selectPlanDiv2_area1_checkout_btn" disabled>
                <span> Select a plan </span>
              </button>
            ) : (
              <>
                {unlockBtn === false ? (
                  <button
                    disabled={disable}
                    className="selectPlanDiv2_area1_checkout_btn"
                    onClick={UnlockToken}
                  >
                    {isLoading ? (
                      <ScaleLoader color="#12111b" size={10} height={20} />
                    ) : (
                      <span> Approve MGPTT </span>
                    )}
                  </button>
                ) : (
                  <>
                    {checkedMonth == true && checkAgree === true ? (
                      <div className="subcribeMonthlyBtnsDiv">
                        <button
                          disabled={disable}
                          className="selectPlanDiv2_area1_checkout_btn"
                          onClick={Subscribe}
                          // disabled={fundDisable}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Subscribe Monthly </span>
                          )}
                        </button>
                      </div>
                    ) : checkedYear === true && checkAgree === true ? (
                      <div className="subcribeMonthlyBtnsDiv">
                        <button
                          disabled={disable}
                          className="selectPlanDiv2_area1_checkout_btn"
                          onClick={Subscribe3}
                          // disabled={fundDisable}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Subscribe Yearly </span>
                          )}
                        </button>
                      </div>
                    ) : checkedSemiAnnual === true && checkAgree === true ? (
                      <div className="subcribeMonthlyBtnsDiv">
                        <button
                          disabled={disable}
                          className="selectPlanDiv2_area1_checkout_btn"
                          onClick={Subscribe2}
                          // disabled={fundDisable}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Subscribe Semi-Annual </span>
                          )}
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
                {checkedMonth == true && checkAgree === true ? (
                  <button
                    className="selectPlanDiv2_area1_checkout_btn_outline fort_left"
                    onClick={() => {
                      togglePayViaFortDiv();

                      setQrData({
                        type: "membership",

                        userWallet: account,
                        data: {
                          quantity: 1,
                          logo: "https://i.imgur.com/kxL8s2g.png",
                          amount: 2,
                          symbol: "EGC",
                          user: account,
                        },
                      });
                    }}
                    // disabled={fundDisable}
                  >
                    <span>
                      Pay Via Fort{" "}
                      <img
                        src="/img/fortIcon.svg"
                        alt=""
                        className="payViaFortIconImg"
                      />{" "}
                    </span>
                  </button>
                ) : checkedYear === true && checkAgree === true ? (
                  <button
                    className="selectPlanDiv2_area1_checkout_btn_outline fort_left"
                    onClick={() => {
                      togglePayViaFortDiv();

                      setQrData({
                        type: "membership",
                        userWallet: account,
                        data: {
                          logo: "https://i.imgur.com/kxL8s2g.png",

                          quantity: 1,
                          amount: 6,
                          symbol: "EGC",
                          user: account,
                        },
                      });
                    }}
                    // disabled={fundDisable}
                  >
                    <span>
                      Pay Via Fort{" "}
                      <img
                        src="/img/fortIcon.svg"
                        alt=""
                        className="payViaFortIconImg"
                      />{" "}
                    </span>
                  </button>
                ) : checkedSemiAnnual === true && checkAgree === true ? (
                  <button
                    className="selectPlanDiv2_area1_checkout_btn_outline fort_left"
                    onClick={() => {
                      togglePayViaFortDiv();

                      setQrData({
                        type: "membership",
                        userWallet: account,
                        data: {
                          quantity: 1,
                          logo: "https://i.imgur.com/kxL8s2g.png",
                          amount: 4,
                          symbol: "EGC",
                          user: account,
                        },
                      });
                    }}
                    // disabled={fundDisable}
                  >
                    <span>
                      Pay Via Fort{" "}
                      <img
                        src="/img/fortIcon.svg"
                        alt=""
                        className="payViaFortIconImg"
                      />{" "}
                    </span>
                  </button>
                ) : null}
              </>
            )}
          </div>
        ) : (
          <div className="sub_btn_div">
            {(checkedMonth !== true || checkAgree !== true) &&
            (checkedYear !== true || checkAgree !== true) &&
            (checkedSemiAnnual !== true || checkAgree !== true) ? (
              <button className="selectPlanDiv2_area1_checkout_btn" disabled>
                <span> Select a plan </span>
              </button>
            ) : (
              <>
                {unlockBtn === false ? (
                  <button
                    disabled={disable}
                    className="selectPlanDiv2_area1_checkout_btn"
                    onClick={UnlockToken}
                  >
                    {isLoading ? (
                      <ScaleLoader color="#12111b" size={10} height={20} />
                    ) : (
                      <span> Approve MGPTT </span>
                    )}
                  </button>
                ) : (
                  <>
                    {checkedMonth == true && checkAgree === true ? (
                      <div className="subcribeMonthlyBtnsDiv">
                        <button
                          disabled={disable}
                          className="selectPlanDiv2_area1_checkout_btn"
                          onClick={SubscribeRef}
                          // disabled={fundDisable}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Subscribe Monthly ref </span>
                          )}
                        </button>
                      </div>
                    ) : checkedYear === true && checkAgree === true ? (
                      <div className="subcribeMonthlyBtnsDiv">
                        <button
                          disabled={disable}
                          className="selectPlanDiv2_area1_checkout_btn"
                          onClick={Subscribe3Ref}
                          // disabled={fundDisable}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Subscribe Yearly ref </span>
                          )}
                        </button>
                      </div>
                    ) : checkedSemiAnnual === true && checkAgree === true ? (
                      <div className="subcribeMonthlyBtnsDiv">
                        <button
                          disabled={disable}
                          className="selectPlanDiv2_area1_checkout_btn"
                          onClick={Subscribe2Ref}
                          // disabled={fundDisable}
                        >
                          {isLoading ? (
                            <ScaleLoader
                              color="#12111b"
                              size={10}
                              height={20}
                            />
                          ) : (
                            <span> Subscribe Semi-Annual ref </span>
                          )}
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
                {checkedMonth == true && checkAgree === true ? (
                  <button
                    className="selectPlanDiv2_area1_checkout_btn_outline fort_left"
                    onClick={() => {
                      togglePayViaFortDiv();

                      setQrData({
                        type: "membership",
                        userWallet: account,
                        data: {
                          quantity: 1,
                          logo: "https://i.imgur.com/kxL8s2g.png",

                          amount: 2,
                          symbol: "EGC",
                          user: account,
                        },
                      });
                    }}
                    // disabled={fundDisable}
                  >
                    <span>
                      Pay Via Fort{" "}
                      <img
                        src="/img/fortIcon.svg"
                        alt=""
                        className="payViaFortIconImg"
                      />
                    </span>
                  </button>
                ) : checkedYear === true && checkAgree === true ? (
                  <button
                    className="selectPlanDiv2_area1_checkout_btn_outline fort_left"
                    onClick={() => {
                      togglePayViaFortDiv();

                      setQrData({
                        type: "membership",
                        userWallet: account,
                        data: {
                          logo: "https://i.imgur.com/kxL8s2g.png",

                          quantity: 1,
                          amount: 6,
                          symbol: "EGC",
                          user: account,
                        },
                      });
                    }}
                    // disabled={fundDisable}
                  >
                    <span>
                      Pay Via Fort{" "}
                      <img
                        src="/img/fortIcon.svg"
                        alt=""
                        className="payViaFortIconImg"
                      />
                    </span>
                  </button>
                ) : checkedSemiAnnual === true && checkAgree === true ? (
                  <button
                    className="selectPlanDiv2_area1_checkout_btn_outline fort_left"
                    onClick={() => {
                      togglePayViaFortDiv();

                      setQrData({
                        type: "membership",
                        userWallet: account,
                        data: {
                          quantity: 1,
                          amount: 4,
                          logo: "https://i.imgur.com/kxL8s2g.png",
                          symbol: "EGC",
                          user: account,
                        },
                      });
                    }}
                    // disabled={fundDisable}
                  >
                    <span>
                      Pay Via Fort{" "}
                      <img
                        src="/img/fortIcon.svg"
                        alt=""
                        className="payViaFortIconImg"
                      />
                    </span>
                  </button>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>

      {payviaFort ? (
        <PayViaFortModal
          togglePayViaFortDiv={togglePayViaFortDiv}
          message="Scan this qrcode to subscribe for your membership via FORT app."
          code="Qretyhgjhe6"
          account={account}
          data={qr_data}
        />
      ) : null}
    </div>
  );
};
