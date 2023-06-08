import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const Step1Div = ({ toggleSteps }) => {
  return (
    <>
      <div className="joinCooperativeModalDiv_area_head">
        MartGpt Subscription Plan
      </div>
      <div className="joinCooperativeModalDiv_area_sub_head">
        Choose a plan and get amazing value for your money.
      </div>

      <div className="joinCooperativeModalDiv_area_body">
        <div className="joinCooperativeModalDiv_area_body1">
          {/* <div className="joinCooperativeModalDiv_area_body1_area"> */}
          <div className="joinCooperativeModalDiv_area_body1_div1">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon" />
            <div className="joinCooperativeModalDiv_area_body1_div1_text">
              Discounted pNFTs/Products
            </div>
          </div>
          <div className="joinCooperativeModalDiv_area_body1_div1">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon" />
            <div className="joinCooperativeModalDiv_area_body1_div1_text">
              Referral Commission
            </div>
          </div>
          <div className="joinCooperativeModalDiv_area_body1_div1">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon" />
            <div className="joinCooperativeModalDiv_area_body1_div1_text">
              Staking Rewards
            </div>
          </div>
          <div className="joinCooperativeModalDiv_area_body1_div1">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon" />
            <div className="joinCooperativeModalDiv_area_body1_div1_text">
              NFT mining
            </div>
          </div>
          <button className="SubContinueButton" onClick={toggleSteps}>
            Next
            <ArrowRightIcon />
          </button>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
