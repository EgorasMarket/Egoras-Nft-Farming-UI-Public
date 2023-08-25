import React from "react";
import CheckIcon from "@mui/icons-material/Check";
const PlanSubDivs = ({
  activePlan,
  toggleActivePlan,
  toggleDiv,
  Plan,
  PlanAmount,
  discount,
  PlanAmountLocal,
  id,
}) => {
  return (
    <div
      className={
        activePlan === id
          ? "Step2Div2_member_div2_body_1_active"
          : "Step2Div2_member_div2_body_1"
      }
      id={id}
      onClick={toggleActivePlan}
    >
      <div className="Step2Div2_member_div2_body_1_txts">
        <div className="Step2Div2_member_div2_body_1_title">{Plan}</div>
        <div className="Step2Div2_member_div2_body_1_para">
          For mission-critical analysis work
        </div>
      </div>
      <div className="Step2Div2_member_div2_body_1_amount">
        <div className="Step2Div2_member_div2_body_1_amount_title">
          {PlanAmount}
          <span className="Step2Div2_member_div2_body_1_amount_title_span">
            egc / yr
          </span>
        </div>
        <div className="Step2Div2_member_div2_body_1_amount_title_naira">
          ₦{PlanAmountLocal}{" "}
        </div>
        <div className="Step2Div2_member_div2_body_1_amount_title_slashed">
          <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount_save">
            {discount}% discount
          </div>
          <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount">
            on all purchased products
          </div>
        </div>
      </div>
      <div className="Step2Div2_member_div2_body_1_sub_button">
        {activePlan === id ? (
          <button
            className="Step2Div2_member_div2_body_1_sub_button_btn_active"
            onClick={toggleDiv}
          >
            Subcribe Now
          </button>
        ) : (
          <button className="Step2Div2_member_div2_body_1_sub_button_btn">
            Subcribe Now
          </button>
        )}
      </div>
      <div className="Step2Div2_member_div2_body_1_features_div">
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            Discounted Products Up to {discount}%
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            Referral Commission
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
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
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            Dex
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSubDivs;
