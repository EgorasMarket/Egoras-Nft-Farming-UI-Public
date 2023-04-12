import React, { useState, useEffect } from "react";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import ScaleLoader from "react-spinners/ScaleLoader";
const IndirectUpload = ({
  Disable,
  UploadProduct,
  isLoading,
  saleAmount,
  handleProdConditionChange,
  prodCondition,
  account,
  brandName,
  handleProdCountChange,
  prodCount,
  handleSaleAmountChange,
  handleRemoveClick3,
  handleNameChange,
  prodName,
  handleBrandNameChange,
  handleClick3,
  imageSrc3,
  imageSrc2,
  handleRemoveClick2,
  fileInputRef3,
  handleImageSelect3,
  fileInputRef,
  handleImageSelect,
  imageSrc,
  handleClick,
  handleRemoveClick,
  fileInputRef2,
  handleImageSelect2,
  handleClick2,
}) => {
  return (
    <div className="uploadDiv">
      <div className="sell_container_header">
        Get Instant Cash After Evaluation.
      </div>
      <div className="sell_container_body">
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">Image*</div>{" "}
            File types supported: JPG, PNG. Max size: 2 MB
          </div>
          <div className="sell_container_body_cont1_img_display_cont">
            <div className="sell_container_body_cont1_img_display_cont_1">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageSelect}
                id="product_image"
              />
              <div className="sell_container_body_cont1_img_display_cont_divs">
                {imageSrc === "" ? (
                  <div
                    onClick={handleClick}
                    className="sell_container_body_cont1_img_display_cont_div1"
                  >
                    <ImageIcon className="sell_container_body_cont1_img_display_cont_div1_icon" />
                  </div>
                ) : null}

                {imageSrc === "" ? null : (
                  <div className="sell_container_body_cont1_img_display_cont_div2">
                    <img
                      src={imageSrc}
                      alt="Selected image"
                      className="sell_container_body_cont1_img_display_cont_div2_img"
                    />
                  </div>
                )}
                {imageSrc === "" ? null : (
                  <CloseIcon
                    onClick={handleRemoveClick}
                    className="sell_container_body_cont1_img_display_cont_divs_close_icon"
                  />
                )}
              </div>
            </div>
            <div className="sell_container_body_cont1_img_display_cont_1">
              <input
                type="file"
                ref={fileInputRef2}
                style={{ display: "none" }}
                onChange={handleImageSelect2}
                id="product_image2"
              />
              <div className="sell_container_body_cont1_img_display_cont_divs">
                {imageSrc2 === "" ? (
                  <div
                    onClick={handleClick2}
                    className="sell_container_body_cont1_img_display_cont_div1"
                  >
                    <ImageIcon className="sell_container_body_cont1_img_display_cont_div1_icon" />
                  </div>
                ) : null}

                {imageSrc2 === "" ? null : (
                  <div className="sell_container_body_cont1_img_display_cont_div2">
                    <img
                      src={imageSrc2}
                      alt="Selected image"
                      className="sell_container_body_cont1_img_display_cont_div2_img"
                    />
                  </div>
                )}
                {imageSrc2 === "" ? null : (
                  <CloseIcon
                    onClick={handleRemoveClick2}
                    className="sell_container_body_cont1_img_display_cont_divs_close_icon"
                  />
                )}
              </div>
            </div>
            <div className="sell_container_body_cont1_img_display_cont_1">
              <input
                type="file"
                ref={fileInputRef3}
                style={{ display: "none" }}
                onChange={handleImageSelect3}
                id="product_image3"
              />
              <div className="sell_container_body_cont1_img_display_cont_divs">
                {imageSrc3 === "" ? (
                  <div
                    onClick={handleClick3}
                    className="sell_container_body_cont1_img_display_cont_div1"
                  >
                    <ImageIcon className="sell_container_body_cont1_img_display_cont_div1_icon" />
                  </div>
                ) : null}

                {imageSrc3 === "" ? null : (
                  <div className="sell_container_body_cont1_img_display_cont_div2">
                    <img
                      src={imageSrc3}
                      alt="Selected image"
                      className="sell_container_body_cont1_img_display_cont_div2_img"
                    />
                  </div>
                )}
                {imageSrc3 === "" ? null : (
                  <CloseIcon
                    onClick={handleRemoveClick3}
                    className="sell_container_body_cont1_img_display_cont_divs_close_icon"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        {/* ========================= */}
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">Name*</div>{" "}
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              onChange={handleNameChange}
              name="productName"
              id="productName"
              type="text"
              placeholder="Product name"
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
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Brand Name*
            </div>{" "}
            The Brand of the product user uploads for sale.
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              id="brandName"
              name="brandName"
              type="text"
              placeholder="Brand name"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleBrandNameChange}
              value={brandName}
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
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Sale Amount*
            </div>{" "}
            The amount of items that can be minted. No gas cost to you!
          </div>
          <div className="sell_container_body_cont1_title_div">
            <input
              id="prodAmount"
              name="prodAmount"
              type="text"
              placeholder="Product amount"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleSaleAmountChange}
              value={saleAmount}
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
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Product Condition*
            </div>{" "}
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </div>
          <div className="sell_container_body_cont1_title_div">
            <textarea
              name="productCondition"
              id="productCondition"
              cols="30"
              rows="10"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleProdConditionChange}
              value={prodCondition}
            ></textarea>
          </div>
        </div>
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
                <ScaleLoader color="#24382b" size={10} height={20} />
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

export default IndirectUpload;
