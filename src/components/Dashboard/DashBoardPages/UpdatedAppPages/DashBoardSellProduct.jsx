import React, { useState, useRef } from "react";
import "./UpdatedAppPagesStyles/dashboardSellProduct.css";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
const DashBoardSellProduct = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [imageSrc3, setImageSrc3] = useState("");
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const fileInputRef3 = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveClick = () => {
    setImageSrc("");
  };
  const handleImageSelect2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc2(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveClick2 = () => {
    setImageSrc2("");
  };
  const handleImageSelect3 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc3(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleRemoveClick3 = () => {
    setImageSrc3("");
  };

  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="sell_container">
            <div className="sell_container_header">Upload Item For Sale</div>
            <div className="sell_container_body">
              <div className="sell_container_body_cont1">
                <div className="sell_container_body_cont1_txt">
                  <div className="sell_container_body_cont1_txt_heading">
                    Image*
                  </div>{" "}
                  File types supported: JPG, PNG, SVG. Max size: 2 MB
                </div>
                <div className="sell_container_body_cont1_img_display_cont">
                  <div className="sell_container_body_cont1_img_display_cont_1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageSelect}
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
                  <div className="sell_container_body_cont1_txt_heading">
                    Name*
                  </div>{" "}
                </div>
                <div className="sell_container_body_cont1_title_div">
                  <input
                    type="text"
                    placeholder="Product name"
                    className="sell_container_body_cont1_title_div_input"
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
                    type="text"
                    placeholder="Brand name"
                    className="sell_container_body_cont1_title_div_input"
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
                    Amount*
                  </div>{" "}
                  The amount of items that can be minted. No gas cost to you!
                </div>
                <div className="sell_container_body_cont1_title_div">
                  <input
                    type="text"
                    placeholder="Product amount"
                    className="sell_container_body_cont1_title_div_input"
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
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="sell_container_body_cont1_title_div_input"
                  ></textarea>
                </div>
              </div>
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              {/* ========================= */}
              <div className="sell_container_body_cont1">
                <button className="sell_container_body_cont1_submit_btn">
                  Upload Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardSellProduct;
