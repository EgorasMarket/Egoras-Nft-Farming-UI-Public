import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./tokenModal.css";
export const TokenModal = ({ toggleTokenModal }) => {
  return (
    <div className="token_modal_bg">
      <div className="remove_token_modal_bg" onClick={toggleTokenModal}></div>
      <div className="token_modal_container">
        <div className="token_modal_head_area">
          <div className="token_modal_head">
            <div className="token_modal_text">Select a token</div>
            <CloseIcon className="close_icon" onClick={toggleTokenModal} />
          </div>
          <div className="token_modal_input_div">
            <input
              type="search"
              placeholder="Search name or paste address"
              className="token_modal_input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
