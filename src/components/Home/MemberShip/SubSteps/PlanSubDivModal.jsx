import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const PlanSubDivModal = ({
  toggleDiv,
  Plan,
  PlanAmount,
  PlanAmountLocal,
  discount,
  checkAgree,
  toggleCheckAgree,
}) => {
  return (
    <div className=" planSubDiv">
      <div className="planSubDiv_area">
        <div className="planSubDiv_area_1" onClick={toggleDiv}>
          <CloseIcon className="planSubDiv_area_1_icon" />
        </div>
        <div className="planSubDiv_area_body">
          <div className="planSubDiv_area_body_head">
            <div className="planSubDiv_area_body_head_1">Plan</div>
            <div className="planSubDiv_area_body_head_1_plan">{Plan}</div>
          </div>
          <div className="planSubDiv_area_body_area">
            <div className="planSubDiv_area_body_area_amount">
              <div className="Step2Div2_member_div2_body_1_amount_title2">
                {PlanAmount}
                <span className="Step2Div2_member_div2_body_1_amount_title_span">
                  egc / yr
                </span>
              </div>
              <div className="Step2Div2_member_div2_body_1_amount_title2_naira">
                ₦{PlanAmountLocal}{" "}
              </div>
              <div className="Step2Div2_member_div2_body_1_amount_title_slashed2">
                <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount_save">
                  {discount}% discount
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
            {checkAgree ? (
              <div className="subscribe_btn">
                <button className="subscribe_btn_btn">Pay via Metamask</button>
                <button className="subscribe_btn_btn2">Pay via Egopay</button>
              </div>
            ) : (
              <div className="subscribe_btn">
                <button className="subscribe_btn_btn" disabled>
                  Agree to Terms
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSubDivModal;
