import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
const ProcurreUpload = ({
  Disable,
  UploadProduct,
  isLoading,
  account,
  prodCount,
  handleSaleAmountChange,
  handleProdCountChange,
  prodAmount,
  handleSellAmountChange,
  sellAmount,
  handleNameChange,
  prodName,
}) => {
  return (
    <div className="uploadDiv">
      <div className="sell_container_header">Procurement Upload</div>
      <div className="sell_container_body">
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Procurrement Title*
            </div>{" "}
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              onChange={handleNameChange}
              name="productName"
              id="productName"
              type="text"
              placeholder="Title"
              className="sell_container_body_cont1_title_div_input"
              value={prodName}
            />
          </div>
        </div>

        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Procurement Amount*
            </div>{" "}
            The amount of items that can be minted. No gas cost to you!
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              id="prodAmount"
              name="prodAmount"
              type="text"
              placeholder="0.00 EUSD"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleSaleAmountChange}
              value={prodAmount}
            />
          </div>
        </div>
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Selling Amount*
            </div>{" "}
            The amount of the item should be sold for.
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              id="sellAmount"
              name="sellAmount"
              type="text"
              placeholder="0.00 EUSD"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleSellAmountChange}
              value={sellAmount}
            />
          </div>
        </div>
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Product Count*
            </div>{" "}
            The amount of items that can be minted. No gas cost to you!
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              id="prodCount"
              name="prodCount"
              type="number"
              placeholder="Product count"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleProdCountChange}
              value={prodCount}
            />
          </div>
        </div>
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        <div className="sell_container_body_cont1">
          {!account ? (
            <button
              disabled={true}
              className="sell_container_body_cont1_submit_btn"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              disabled={Disable}
              className="sell_container_body_cont1_submit_btn"
              onClick={UploadProduct}
            >
              {isLoading ? (
                <ScaleLoader color="#375746" size={10} height={20} />
              ) : (
                <> Upload Product</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcurreUpload;
