import React from "react";
import "../../css/dashboardLend_details_page.css";
import { Link } from "react-router-dom";

const DashBoard_lend_details_page = () => {
  return (
    <div className="other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}

      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="pool_lending_pages_links">
              <Link
                to="/dashboard/lend/pool/detail"
                className="pool_lend_details_link"
              >
                Overview {">"}
              </Link>
              <Link
                to="/dashboard/lend/pool/detail/branch/asset"
                className="pool_lend_details_link"
              >
                Assets {">"}
              </Link>
              <Link
                to="/dashboard/lend/pool/detail/transactions"
                className="pool_lend_details_link"
              >
                Transactions {">"}
              </Link>
            </div>
            <div className="pool_detail_heading">
              <div className="pool_detail_heading_area1">
                <img
                  src="/img/pool_asset_icon.png"
                  alt=""
                  className="pool_detail_heading_area1_img"
                />
                <div className="pool_detail_heading_area1_txt_cont">
                  <div className="pool_detail_heading_area1_txt_cont_1">
                    Branch Series 3 (1754 Factory){" "}
                    {/* <div className="pool_detail_investmentcapacity_box">
                      {" "}
                      41.2M Engn
                    </div> */}
                  </div>
                  <div className="pool_detail_heading_area1_txt_cont_2">
                    Overview
                  </div>
                </div>
              </div>
              <div className="pool_detail_heading_area1_invest_btn_div">
                <button className="pool_detail_heading_area1_invest_btn">
                  Invest
                </button>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="pool_detail_sub_area1">
              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  Emerging Market Consumer Loans
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Asset Type
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  3 months
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Asset Maturity
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  10.75 <span className="asset_symbol"> %</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Senior APY(30 days)
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  48.45 <span className="asset_symbol"> %</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Junior APY(90 days)
                </div>
              </div>
              <span className="vertical_rule"></span>

              <div className="pool_detail_sub_area1_area1">
                <div className="pool_detail_sub_area1_area1_cont1">
                  8,336,195 <span className="asset_symbol"> Engn</span>
                </div>
                <div className="pool_detail_sub_area1_area1_cont2">
                  Pool Value
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="Asset_Originator_Details_cont">
              <div className="Asset_Originator_Details_cont_heading">
                Asset Originator Details
              </div>
              <div className="Asset_Originator_Details_cont_body">
                <div className="Asset_Originator_Details_cont_body_head_img_cont">
                  <img
                    src="/img/branch_detail_img.png"
                    className="Asset_Originator_Details_cont_body_head_img"
                  />
                </div>
                <div className="Asset_Originator_Details_cont_body_txt">
                  Branch is a financial technology company that lends money to
                  consumers using machine learning algorithms to determine
                  credit worthiness via customers' smartphones. Branch was
                  founded in 2015 and has operations in Kenya, Nigeria,
                  Tanzania, Mexico and India, and has since originated over
                  $500M in loans to over 4 millions borrowers. This Tinlake pool
                  will consist of tranches of a secured non convertible
                  debenture with a maturity of 3 years backed by a portfolio of
                  loans made to customers.The current weighted average loan
                  balance is $49 (ranging from $6 to $2,500) with average
                  maturity of 70 days.
                </div>
                <div className="Asset_Originator_Details_cont_body_issuer_cont">
                  <div className="Asset_Originator_Details_cont_body_issuer_cont_head">
                    Issuer
                  </div>
                  <div className="Asset_Originator_Details_cont_body_issuer_cont_txt">
                    1754 Factory Series 3
                  </div>
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}

            <div className="pool_status">
              <div className="pool_status_cont_heading">Pool Status</div>
              <div className="pool_status_Details_cont_body">
                <div className="pool_status_Details_cont_body1">
                  <div className="pool_status_Details_cont_body1_cont1">
                    <div className="pool_status_Details_cont_body1_head">
                      Assets
                    </div>
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Asset value
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        8,336,195 Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />
                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Average financing fee
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        13.0%
                      </div>
                    </div>
                    <hr className="custom_hr" />

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Average maturity
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        3 months
                      </div>
                    </div>
                  </div>
                  <div className="pool_status_Details_cont_body1_cont2">
                    <div className="pool_status_Details_cont_body1_head">
                      Liquidity
                    </div>

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Available Liquidity
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        0 Engn
                      </div>
                    </div>
                    <hr className="custom_hr" />

                    <div className="pool_status_Details_cont_body1_sub_conts">
                      <div className="pool_status_Details_cont_body1_sub_conts_1">
                        Cash Drag
                      </div>
                      <div className="pool_status_Details_cont_body1_sub_conts_2">
                        0%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard_lend_details_page;
