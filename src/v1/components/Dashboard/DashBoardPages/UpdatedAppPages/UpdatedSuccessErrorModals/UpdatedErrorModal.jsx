import React from "react";
import "./UpdatedSuccessErrorModal.css";

const UpdatedErrorModal = ({ errorMessage, closeModal }) => {
  return (
    <div className="UpdatedSuccessModalDiv">
      <div className="UpdatedSuccessModalDiv_Cont">
        <div className="UpdatedSuccessModalDiv_Cont_img_cont">
          <img
            src="/img/successErrorModalImages/error_icon.svg"
            alt=""
            className="UpdatedSuccessModalDiv_Cont_img"
          />
        </div>
        <div className="UpdatedSuccessModalDiv_Cont_title">Error!</div>
        <div className="UpdatedSuccessModalDiv_Cont_body">{errorMessage}</div>
        <div className="UpdatedSuccessModalDiv_Cont_buttons">
          <button
            className="UpdatedErrorModalDiv_Cont_btn"
            onClick={closeModal}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatedErrorModal;
