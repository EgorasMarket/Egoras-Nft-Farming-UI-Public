import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const Step1Div = ({ toggleSteps }) => {
  return (
    <>
      <div className="joinCooperativeModalDiv_area_head">
        MartGpt Cooperative Plan
      </div>
      <div className="joinCooperativeModalDiv_area_sub_head">
        Subscribe to our cooperative and get amazing value for your money.
      </div>

      <div className="joinCooperativeModalDiv_area_body">
        <div className="joinCooperativeModalDiv_area_body1">
          {/* <div className="joinCooperativeModalDiv_area_body1_area"> */}
          <div className="joinCooperativeModalDiv_area_body1_div1">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon" />
            <div className="joinCooperativeModalDiv_area_body1_div1_text">
              Discounted Products
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
              Profit share
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
