import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./tokenModal.css";
export const TokenModal = ({
  toggleTokenModal,
  tokenData1,
  tokenData,
  execute,
  tokenId,
  disabled,
}) => {
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
          <div className="bases_div">
            {tokenData1.map((token) => (
              <div
                className="base_div1 disabled"
                id={token.id}
                onClick={execute}
              >
                <img src={token.img} alt="" className="base_icon" />
                <span className="base_name">{token.symbol}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bases_div_token_body">
          {tokenData.map((token) => (
            <div
              className=" bases_div_token_body_layer "
              // className={
              //   token.disabled == true
              //     ? "bases_div_token_body_layer disabled"
              //     : "bases_div_token_body_layer"
              // }
              id={token.id}
              onClick={execute}
            >
              <img
                src={token.img}
                alt=""
                className="bases_div_token_body_layer1_head_img"
              />
              <div className="bases_div_token_body_layer1_token_name">
                {token.symbol}
                <span className="bases_div_token_body_layer1_token_name_sub_head">
                  {token.name}
                </span>
              </div>

              <div className="bases_div_token_body_layer1_amount">
                {token.balance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
