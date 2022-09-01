import React from "react";
import "./success_error_component_style.css";
// import { Function

import { FunctionButton } from "../../../Buttons/Button";
export const SuccessModal = ({ successMessage, click, SuccessHead, hash }) => {
  return (
    <div className="success_modal_div">
      <div className="success_modal_div_head">
        <img
          src="/img/succees_div_heading_icon.svg"
          alt=""
          className="success_modal_image"
        />
        <img
          src="/img/success_head_img_dark.svg"
          alt=""
          className="success_modal_image_dark"
        />
      </div>
      <div className="success_modal_div_body_cont">
        <div className="success_modal_div_body_Head">{SuccessHead}</div>
        <div className="success_modal_div_body">{successMessage}</div>
        <a
          className="btn btn-link text-success"
          href={"https://bscscan.com/tx/" + hash}
          target="_blank"
        >
          View on bscscan.com
        </a>
      </div>

      <div className="success_modal_button">
        <FunctionButton txt="Continue" className="success_btn" click={click} />
      </div>
    </div>
  );
};
// ======================================================
// ======================================================
// ======================================================
// ======================================================
export const ErrorModal = ({ errorMessage, click, ErrorHead }) => {
  return (
    <div className="error_modal_div">
      <div className="error_modal_div_head">
        <img
          src="/img/error_div_heading_icon.svg"
          alt=""
          className="error_modal_image"
        />
        <img
          src="/img/error_head_img_dark.svg"
          alt=""
          className="error_modal_image_dark"
        />
      </div>
      <div className="error_modal_div_body_Head">{ErrorHead}</div>

      <div className="error_modal_div_body">{errorMessage}</div>
      <div className="error_modal_button">
        <FunctionButton txt="Try again" className="error_Btn" click={click} />
      </div>
    </div>
  );
};
// ======================================================
// ======================================================
// ======================================================
// ======================================================
export const CautionModal = () => {
  return <div className="success_error_component"></div>;
};
