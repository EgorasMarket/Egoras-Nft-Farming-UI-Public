import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
const DirectUpload = ({
  Disable,
  UploadProduct,
  isLoading,
  onEditorStateChange,
  //   handleProdSpecChange,
  account,
  //   prodSpec,
  toggleAddCategory,
  handleProdStateChange,
  prodCount,
  handleCenter2,
  allCategories,
  editorState,
  brandName,
  handleSaleAmountChange,
  handleProdCountChange,
  prodAmount,
  imageSrc3,
  handleRemoveClick3,
  handleBrandNameChange,
  fileInputRef3,
  handleImageSelect3,
  handleClick3,
  imageSrc2,
  handleRemoveClick2,
  handleRemoveClick,
  fileInputRef2,
  handleImageSelect2,
  handleClick2,
  handleClick,
  imageSrc,
  generateAI,
  isLoading2,
  fileInputRef,
  handleImageSelect,
  handleNameChange,
  prodName,
  inputDivs,
  AddInputCount,
}) => {
  return (
    <div className="uploadDiv">
      <div className="sell_container_header">
        Upload Items Directly For Buying.
      </div>
      <div className="sell_container_body">
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Product Name*
            </div>{" "}
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
            <button
              className="sell_container_body_cont1_title_div_btn"
              onClick={generateAI}
            >
              {isLoading2 ? (
                <ScaleLoader color="#12111b" size={10} height={20} />
              ) : (
                <span> Generate Details </span>
              )}
            </button>
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
              Product Amount*
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
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Product Category*
            </div>{" "}
            The amount of items that can be minted. No gas cost to you!
          </div>
          <div className="sell_container_body_cont1_title_div">
            <select
              name=""
              id=""
              className="sell_container_body_cont1_title_div_input"
              onChange={handleCenter2}
            >
              <option value=""></option>
              {allCategories.map((option) => (
                <>
                  <option
                    key={option.product_category}
                    value={option.product_category}
                    // onClick={(e) =>
                    //   getCatName(option.product_brand)
                    // }
                  >
                    {option.product_category}
                  </option>
                </>
              ))}
            </select>

            {/* <button className="add_category_btn" onClick={toggleAddCategory}>
              +
            </button> */}
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
        <div className="sell_container_body_cont1">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Product State*
            </div>{" "}
            The amount of items that can be minted. No gas cost to you!
          </div>
          <div className="sell_container_body_cont1_title_div">
            <select
              name=""
              id=""
              className="sell_container_body_cont1_title_div_input"
              onChange={handleProdStateChange}
            >
              <option value=""></option>
              <option value="1">New</option>
              <option value="2">Refurbished</option>
            </select>
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
        <div className="sell_container_body_cont1" id="target-section">
          <div className="sell_container_body_cont1_txt">
            <div className="sell_container_body_cont1_txt_heading">
              Product Details*
            </div>{" "}
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </div>
          <div className="sell_container_body_cont1_title_div">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              placeholder="Begin Typing..."
            />
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
            <div className="sell_container_body_cont1_txt_heading">
              Product Specifications*
            </div>{" "}
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </div>
          {/* <div className="sell_container_body_cont1_title_div">
            <textarea
              name="prodSpec"
              id="prodSpec"
              cols="30"
              rows="10"
              className="sell_container_body_cont1_title_div_input"
              onChange={handleProdSpecChange}
              value={prodSpec}
            ></textarea>
          </div> */}
          <div className="sell_container_prod_spec_input_div_area">
            <div className="sell_container_prod_spec_input_div_area_title_area">
              <div className="sell_container_prod_spec_input_div_area_title_area1">
                Title
              </div>
              <div className="sell_container_prod_spec_input_div_area_title_area1">
                Spec
              </div>
            </div>
            {inputDivs}

            <button
              className="sell_container_prod_spec_input_div_btn"
              onClick={AddInputCount}
            >
              Add Input +
            </button>
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
                <ScaleLoader color="#12111b" size={10} height={20} />
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

export default DirectUpload;
