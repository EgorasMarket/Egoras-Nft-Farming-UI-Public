import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlanSubDivModal from "./PlanSubDivModal";
import PlanSubDivs from "./PlanSubDivs";
import CloseIcon from "@mui/icons-material/Close";
const Step2Div2 = ({ toggleSteps, toggleCheckAgree, checkAgree }) => {
  const [activePlan, setActivePlan] = useState("");
  const [liteDiv, setliteDiv] = useState(false);
  const [proDiv, setProDiv] = useState(false);
  const [priseDiv, setPriseDiv] = useState(false);
  const toggleActivePlan = (e) => {
    setActivePlan(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };
  const toggleLiteDiv = (e) => {
    setliteDiv(!liteDiv);
  };
  const toggleProDiv = (e) => {
    setProDiv(!proDiv);
  };
  const togglePriseDiv = (e) => {
    setPriseDiv(!priseDiv);
  };
  return (
    <div className="Step2Div2_member_div">
      <div className="Step2Div2_member_div1">
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
      </div>
      <div className="Step2Div2_member_div2">
        <div className="Step2Div2_member_div2_head">Annual Plans</div>
        <div className="Step2Div2_member_div2_body">
          {/* <div className="Step2Div2_member_div2_body_1">
            <div className="Step2Div2_member_div2_body_1_txts">
              <div className="Step2Div2_member_div2_body_1_title">Free</div>
              <div className="Step2Div2_member_div2_body_1_para">
                For mission-critical analysis work
              </div>
            </div>
            <div className="Step2Div2_member_div2_body_1_amount">
              <div className="Step2Div2_member_div2_body_1_amount_title">
                #0.00{" "}
                <span className="Step2Div2_member_div2_body_1_amount_title_span">
                  /yr
                </span>
              </div>
              <div className="Step2Div2_member_div2_body_1_amount_title_slashed">
                <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount">
                  #0.00/yr
                </div>
                <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount_save">
                  - Save #0.00
                </div>
              </div>
            </div>
            <div className="Step2Div2_member_div2_body_1_sub_button">
              <button className="Step2Div2_member_div2_body_1_sub_button_btn ">
                Connect Wallet
              </button>
            </div>
            <div className="Step2Div2_member_div2_body_1_features_div">
              <div className="Step2Div2_member_div2_body_1_features_div_1">
                <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
                  Discounted NFTs/Products
                </div>
                <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
                  <CloseIcon className="joinCooperativeModalDiv_area_body1_div1_icon2_close" />
                  <CloseIcon className="joinCooperativeModalDiv_area_body1_div1_icon2_close" />
                </div>
              </div>
              <div className="Step2Div2_member_div2_body_1_features_div_1">
                <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
                  Referral Commission
                </div>
                <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
                  <CloseIcon className="joinCooperativeModalDiv_area_body1_div1_icon2_close" />
                  <CloseIcon className="joinCooperativeModalDiv_area_body1_div1_icon2_close" />
                </div>
              </div>
              <div className="Step2Div2_member_div2_body_1_features_div_1">
                <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
                  Staking Rewards
                </div>
                <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
                  <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
                  <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
                </div>
              </div>
              <div className="Step2Div2_member_div2_body_1_features_div_1">
                <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
                  NFT mining
                </div>
                <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
                  <CloseIcon className="joinCooperativeModalDiv_area_body1_div1_icon2_close" />
                  <CloseIcon className="joinCooperativeModalDiv_area_body1_div1_icon2_close" />
                </div>
              </div>
            </div>
          </div> */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <PlanSubDivs
            id="lite"
            Plan="Lite"
            PlanAmount="16.0"
            PlanAmountLocal="50,000"
            activePlan={activePlan}
            discount="5"
            toggleActivePlan={toggleActivePlan}
            toggleDiv={toggleLiteDiv}
          />
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <PlanSubDivs
            id="pro"
            Plan="Pro"
            PlanAmount="47.7"
            PlanAmountLocal="150,000"
            activePlan={activePlan}
            discount="12.5"
            toggleActivePlan={toggleActivePlan}
            toggleDiv={toggleProDiv}
          />
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <PlanSubDivs
            id="prise"
            Plan="EnterPrise"
            PlanAmount="95.4"
            PlanAmountLocal="300,000"
            activePlan={activePlan}
            discount="25"
            toggleActivePlan={toggleActivePlan}
            toggleDiv={togglePriseDiv}
          />
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
        </div>
      </div>
      <div className="Step2Div2_member_div3"></div>

      {liteDiv ? (
        <PlanSubDivModal
          Plan="Lite"
          PlanAmount="16.0"
          PlanAmountLocal="50,000"
          checkAgree={checkAgree}
          discount="5"
          toggleCheckAgree={toggleCheckAgree}
          toggleDiv={toggleLiteDiv}
        />
      ) : null}

      {proDiv ? (
        <PlanSubDivModal
          Plan="Pro"
          PlanAmount="47.7"
          PlanAmountLocal="150,000"
          checkAgree={checkAgree}
          discount="12.5"
          toggleCheckAgree={toggleCheckAgree}
          toggleDiv={toggleProDiv}
        />
      ) : null}

      {priseDiv ? (
        <PlanSubDivModal
          Plan="Enterprise"
          PlanAmount="95.4"
          PlanAmountLocal="300,000"
          checkAgree={checkAgree}
          discount="25"
          toggleCheckAgree={toggleCheckAgree}
          toggleDiv={togglePriseDiv}
        />
      ) : null}

      {/* {proDiv ? (
        <div className=" planSubDiv">
          <div className="planSubDiv_area">
            <div className="planSubDiv_area_1" onClick={toggleLiteDiv}>
              <CloseIcon className="planSubDiv_area_1_icon" />
            </div>
            <div className="planSubDiv_area_body">
              <div className="planSubDiv_area_body_head">
                <div className="planSubDiv_area_body_head_1">Plan</div>
                <div className="planSubDiv_area_body_head_1_plan">Lite</div>
              </div>
              <div className="planSubDiv_area_body_area">
                <div className="planSubDiv_area_body_area_amount">
                  <div className="Step2Div2_member_div2_body_1_amount_title2">
                    #500,000{" "}
                    <span className="Step2Div2_member_div2_body_1_amount_title_span">
                      /yr
                    </span>
                  </div>
                  <div className="Step2Div2_member_div2_body_1_amount_title_slashed2">
                    <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount_save">
                      10% discount
                    </div>
                    <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount">
                      on all purchased products
                    </div>
                  </div>
                </div>

                <div className="checkBox_agree_div">
                  <div className="checkBox_agree_div_txt">
                    By checking the checkbox below, you agree to our{" "}
                    <a href="#">Terms of Use, Privacy Statement.</a>
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

                <div className="subscribe_btn">
                  <button className="subscribe_btn_btn">
                    Sub via Metamask
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {priseDiv ? (
        <div className=" planSubDiv">
          <div className="planSubDiv_area">
            <div className="planSubDiv_area_1" onClick={toggleLiteDiv}>
              <CloseIcon className="planSubDiv_area_1_icon" />
            </div>
            <div className="planSubDiv_area_body">
              <div className="planSubDiv_area_body_head">
                <div className="planSubDiv_area_body_head_1">Plan</div>
                <div className="planSubDiv_area_body_head_1_plan">Lite</div>
              </div>
              <div className="planSubDiv_area_body_area">
                <div className="planSubDiv_area_body_area_amount">
                  <div className="Step2Div2_member_div2_body_1_amount_title2">
                    #500,000{" "}
                    <span className="Step2Div2_member_div2_body_1_amount_title_span">
                      /yr
                    </span>
                  </div>
                  <div className="Step2Div2_member_div2_body_1_amount_title_slashed2">
                    <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount_save">
                      10% discount
                    </div>
                    <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount">
                      on all purchased products
                    </div>
                  </div>
                </div>

                <div className="checkBox_agree_div">
                  <div className="checkBox_agree_div_txt">
                    By checking the checkbox below, you agree to our{" "}
                    <a href="#">Terms of Use, Privacy Statement.</a>
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

                <div className="subscribe_btn">
                  <button className="subscribe_btn_btn">
                    Sub via Metamask
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default Step2Div2;
