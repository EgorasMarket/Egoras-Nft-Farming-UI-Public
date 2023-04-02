import React from "react";
import "./UpdatedSuccessErrorModal.css";
const UpdatedWarningModal = ({ continueFunc, errorMessage, closeModal }) => {
  return (
    <div className="UpdatedSuccessModalDiv">
      <div className="UpdatedSuccessModalDiv_Cont">
        <div className="UpdatedSuccessModalDiv_Cont_img_cont">
          <img
            src="/img/successErrorModalImages/warning_icon.svg"
            alt=""
            className="UpdatedSuccessModalDiv_Cont_img"
          />
        </div>
        <div className="UpdatedSuccessModalDiv_Cont_title">Warning!</div>
        <div className="UpdatedSuccessModalDiv_Cont_body">{errorMessage}</div>
        <div className="UpdatedSuccessModalDiv_Cont_buttons">
          <button
            className="UpdatedSuccessModalDiv_Cont_btn_warning"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="UpdatedSuccessModalDiv_Cont_btn"
            onClick={continueFunc}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatedWarningModal;
