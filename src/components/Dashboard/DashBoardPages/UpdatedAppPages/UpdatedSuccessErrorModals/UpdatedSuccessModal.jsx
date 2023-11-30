import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "./UpdatedSuccessErrorModal.css";
const UpdatedSuccessModal = ({
  successMessage,
  route,
  closeModal,
  btnClose,
  btnRoute,
  txnHashDiv,
  TxnHash,
}) => {
  return (
    <div className="UpdatedSuccessModalDiv">
      <div className="UpdatedSuccessModalDiv_Cont">
        <div className="UpdatedSuccessModalDiv_Cont_img_cont">
          <img
            src="/img/successErrorModalImages/success_icon_dark.svg"
            alt=""
            className="UpdatedSuccessModalDiv_Cont_img"
          />
        </div>
        <div className="UpdatedSuccessModalDiv_Cont_title">Successful</div>
        <div className="UpdatedSuccessModalDiv_Cont_body">{successMessage}</div>
        {txnHashDiv === true ? (
          <a
            href={`https://bscscan.com/tx/${TxnHash}`}
            className="UpdatedSuccessModalDiv_Cont_body_txnHash"
            target={"_blank"}
          >
            View on bscscan{" "}
            <ArrowOutwardIcon className="UpdatedSuccessModalDiv_Cont_body_txnHash_icon" />
          </a>
        ) : null}
        <div className="UpdatedSuccessModalDiv_Cont_buttons">
          {btnRoute === true ? (
            <a href={route} style={{ width: "100%" }}>
              <button className="UpdatedSuccessModalDiv_Cont_btn">
                Continue
              </button>
            </a>
          ) : null}
          {btnClose === true ? (
            <button
              className="UpdatedSuccessModalDiv_Cont_btn"
              onClick={closeModal}
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UpdatedSuccessModal;
