import React from "react";

const PayViaFortModal = ({ togglePayViaFortDiv, message, code }) => {
  return (
    <div className="payViaFortDiv">
      <div
        className="payViaFortDiv_close_div"
        onClick={togglePayViaFortDiv}
      ></div>
      <div className="payViaFortDiv_area">
        <div className="payViaFortDiv_area_1">
          <img
            src="/img/dummy_qrcode.png"
            alt=""
            className="payViaFortDiv_area_1_img"
          />
        </div>
        <div className="payViaFortDiv_area_2">{message}</div>
        <div className="payViaFortDiv_area_3_input_div">
          <div className="payViaFortDiv_area_3">Or copy this code.</div>
          <div className="payViaFortDiv_area_3_input_cont">
            <input
              type="text"
              value={code}
              className="payViaFortDiv_area_3_input_div_input"
            />
            <button className="payViaFortDiv_area_3_input_cont_btn">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayViaFortModal;
