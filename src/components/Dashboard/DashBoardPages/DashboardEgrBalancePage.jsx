import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../../css/dashboardegrbalance.css";

const DashboardEgrBalancePage = () => {
  const [openActive, setOpenActive] = useState("nav1");

  const openActiveNav = (e) => {
    let active = e.currentTarget.id;

    setOpenActive(active);
  };

  // ===============
  // ===============
  // ===============
  // ===============
  // ===============

  const scrollMe = () => {
    let current = "";

    var white_layer_1 = document.getElementById("div1");
    var bounding1 = white_layer_1.getBoundingClientRect();

    var white_layer_2 = document.getElementById("div2");
    var bounding2 = white_layer_2.getBoundingClientRect();

    var white_layer_3 = document.getElementById("div3");
    var bounding3 = white_layer_3.getBoundingClientRect();

    var white_layer_4 = document.getElementById("div4");
    var bounding4 = white_layer_4.getBoundingClientRect();

    var white_layer_5 = document.getElementById("div5");
    var bounding5 = white_layer_5.getBoundingClientRect();

    var white_layer_6 = document.getElementById("div6");
    var bounding6 = white_layer_6.getBoundingClientRect();

    var white_layer_7 = document.getElementById("div7");
    var bounding7 = white_layer_7.getBoundingClientRect();

    var white_layer_8 = document.getElementById("div8");
    var bounding8 = white_layer_8.getBoundingClientRect();

    var white_layer_9 = document.getElementById("div9");
    var bounding9 = white_layer_9.getBoundingClientRect();

    var white_layer_10 = document.getElementById("div10");
    var bounding10 = white_layer_10.getBoundingClientRect();

    var white_layer_11 = document.getElementById("div11");
    var bounding11 = white_layer_11.getBoundingClientRect();

    if (
      bounding1.top >= 70 &&
      bounding1.left >= 0 &&
      bounding1.right <=
        (window.innerWidth || document.white_layer_1.clientWidth) &&
      bounding1.bottom <=
        (window.innerHeight || document.white_layer_1.clientHeight)
    ) {
      setOpenActive("nav1");
    } else if (
      bounding2.top >= 70 &&
      bounding2.left >= 0 &&
      bounding2.right <=
        (window.innerWidth || document.white_layer_2.clientWidth) &&
      bounding2.bottom <=
        (window.innerHeight || document.white_layer_2.clientHeight)
    ) {
      setOpenActive("nav2");
    } else if (
      bounding3.top >= 0 &&
      bounding3.left >= 0 &&
      bounding3.right <=
        (window.innerWidth || document.white_layer_3.clientWidth) &&
      bounding3.bottom >=
        (window.innerHeight || document.white_layer_3.clientHeight)
    ) {
      setOpenActive("nav3");
    } else if (
      bounding4.top >= 0 &&
      bounding4.left >= 0 &&
      bounding4.right <=
        (window.innerWidth || document.white_layer_4.clientWidth) &&
      bounding4.bottom >=
        (window.innerHeight || document.white_layer_4.clientHeight)
    ) {
      setOpenActive("nav4");
    } else if (
      bounding5.top >= 0 &&
      bounding5.left >= 0 &&
      bounding5.right <=
        (window.innerWidth || document.white_layer_5.clientWidth) &&
      bounding5.bottom >=
        (window.innerHeight || document.white_layer_5.clientHeight)
    ) {
      setOpenActive("nav5");
    } else if (
      bounding6.top >= 0 &&
      bounding6.left >= 0 &&
      bounding6.right <=
        (window.innerWidth || document.white_layer_6.clientWidth) &&
      bounding6.bottom >=
        (window.innerHeight || document.white_layer_6.clientHeight)
    ) {
      setOpenActive("nav6");
    } else if (
      bounding7.top >= 0 &&
      bounding7.left >= 0 &&
      bounding7.right <=
        (window.innerWidth || document.white_layer_7.clientWidth) &&
      bounding7.bottom >=
        (window.innerHeight || document.white_layer_7.clientHeight)
    ) {
      setOpenActive("nav7");
    } else if (
      bounding8.top >= 0 &&
      bounding8.left >= 0 &&
      bounding8.right <=
        (window.innerWidth || document.white_layer_8.clientWidth) &&
      bounding8.bottom >=
        (window.innerHeight || document.white_layer_8.clientHeight)
    ) {
      setOpenActive("nav8");
    } else if (
      bounding9.top >= 0 &&
      bounding9.left >= 0 &&
      bounding9.right <=
        (window.innerWidth || document.white_layer_9.clientWidth) &&
      bounding9.bottom >=
        (window.innerHeight || document.white_layer_9.clientHeight)
    ) {
      setOpenActive("nav9");
    } else if (
      bounding10.top >= 0 &&
      bounding10.left >= 0 &&
      bounding10.right <=
        (window.innerWidth || document.white_layer_10.clientWidth) &&
      bounding10.bottom >=
        (window.innerHeight || document.white_layer_10.clientHeight)
    ) {
      setOpenActive("nav10");
    } else if (
      bounding11.top >= 0 &&
      bounding11.left >= 0 &&
      bounding11.right <=
        (window.innerWidth || document.white_layer_11.clientWidth) &&
      bounding11.bottom >=
        (window.innerHeight || document.white_layer_11.clientHeight)
    ) {
      setOpenActive("nav11");
    }
  };

  // =======================
  // =======================
  // =======================
  // =======================
  // =======================
  // =======================
  // =======================

  const lists = [
    {
      id: 1,
      img: "/img/btc-logo.svg",
      name: "Bitcoin listing on Egoras Swap",
      symbol_image: "/img/btc-logo.svg",
      symbol_name: "BTC ",
      coin_amount: "$65,000.00",
    },
    {
      id: 1,
      img: "/img/ether-logo.svg",
      name: "Ethereum listing on Egoras Swap",
      symbol_image: "/img/ether-logo.svg",
      symbol_name: "ETH ",
      coin_amount: "$4,560.00",
    },
  ];

  return (
    <div className="governance_details_page">
      <section className="governance_details_section">
        <div className="container">
          <div className="governance_details_area">
            <div className="governance_details2">
              <div className="governance_details_title">
                <img
                  src="/img/btc-logo.svg"
                  alt=""
                  className="governance_details_title_img"
                />
                Bitcoin
              </div>
              <p className="governance_details_sub_head">
                BITCOIN LISTING ON EGORAS SWAP
              </p>
              <div className="governance_details_slider_amounts">
                <div className="slider_percent1">80%</div>
                <div className="slider_percent1">20%</div>
              </div>
              <div className="governance_details"></div>
              <div className="governance_details_slider_amounts">
                <div className="slider_amounts1">Yes Powered by 60,560 egr</div>
                <div className="slider_amounts1">No Powered by 39,410 egr</div>
              </div>

              <div className="governance_details_btns">
                <button className="loan">Vote</button>
              </div>
              <div className="governance_details_link_cont">
                <div className="governance_details_links">
                  <a href="#" className="governance_details_link1">
                    <img
                      src="/img/social-website-icon.svg"
                      alt=""
                      className="website-svg"
                    />{" "}
                    Website
                  </a>
                  <a href="#" className="governance_details_link1">
                    <img
                      src="/img/social-twitter-icon.svg"
                      alt=""
                      className="website-svg"
                    />{" "}
                    Twitter
                  </a>
                  <a href="#" className="governance_details_link1">
                    <img
                      src="/img/social-telegram-icon.svg"
                      alt=""
                      className="website-svg"
                    />{" "}
                    Telegram
                  </a>
                  <a href="#" className="governance_details_link1">
                    <img
                      src="/img/social-telegram-icon.svg"
                      alt=""
                      className="website-svg"
                    />{" "}
                    Medium
                  </a>
                  <a href="#" className="governance_details_link1">
                    <img
                      src="/img/social-discord-icon.svg"
                      alt=""
                      className="website-svg"
                    />{" "}
                    Discord
                  </a>
                </div>
              </div>
            </div>
            <div className="governance_details1">
              <div className="key_metrics_area">
                <div className="key_metrics_heading">Key Metrics</div>
                <div className="key_metrics_columns">
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">Ticker:</div>
                    <div className="key_metrics_column1_cont  thick">BTC</div>
                  </div>
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">
                      Blockchain Network:
                    </div>
                    <div className="key_metrics_column1_cont  thick">
                      Bitcoin
                    </div>
                  </div>
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">
                      Token Supply:
                    </div>
                    <div className="key_metrics_column1_cont  thick">
                      100,000,000
                    </div>
                  </div>
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">
                      Project Valuation:
                    </div>
                    <div className="key_metrics_column1_cont  thick">
                      $30,000,000
                    </div>
                  </div>
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">
                      Initial Token Circulation:
                    </div>
                    <div className="key_metrics_column1_cont thick">
                      2,000,000
                    </div>
                  </div>
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">
                      Initial Market Cap:
                    </div>
                    <div className="key_metrics_column1_cont thick">
                      $600,000
                    </div>
                  </div>
                  <div className="key_metrics_column1">
                    <div className="key_metrics_column1_cont">
                      Platform Raise:
                    </div>
                    <div className="key_metrics_column1_cont  thick">
                      $235,000 + $5,000 Community Round
                    </div>
                  </div>
                  <div className="key_metrics_column1 last">
                    <div className="key_metrics_column1_cont">
                      Individual Allocation:
                    </div>
                    <div className="key_metrics_column1_cont thick">$235</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project_overview_section">
        <div className="container">
          <div className="project_overview_area">
            <div className="overview_nav">
              <a
                href="#div1"
                id="nav1"
                className={
                  openActive == "nav1"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                1. PROJECT OVERVIEW: WHAT IS Bitcoin?
              </a>
              <a
                id="nav2"
                href="#div2"
                className={
                  openActive == "nav2"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                2.A. GO-TO-MARKET STRATEGY
              </a>
              <a
                href="#div3"
                id="nav3"
                className={
                  openActive == "nav3"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                2.B. PRODUCT VIABILITY
              </a>
              <a
                href="#div4"
                id="nav4"
                className={
                  openActive == "nav4"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                3. PRODUCT ROADMAP
              </a>
              <a
                href="#div5"
                id="nav5"
                className={
                  openActive == "nav5"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                4. REVENUE STREAMS
              </a>
              <a
                href="#div6"
                id="nav6"
                className={
                  openActive == "nav6"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                5. TECHNOLOGIES USED BY THE PROJECT
              </a>
              <a
                href="#div7"
                id="nav7"
                className={
                  openActive == "nav7"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                6. PARTNERS
              </a>
              <a
                href="#div8"
                id="nav8"
                className={
                  openActive == "nav8"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                7. TOKEN ECONOMY
              </a>
              <a
                href="#div9"
                id="nav9"
                className={
                  openActive == "nav9"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                8. DETAILED TOKEN METRICS
              </a>
              <a
                href="#div10"
                id="nav10"
                className={
                  openActive == "nav10"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                9. TOKEN DISTRIBUTION
              </a>
              <a
                href="#div11"
                id="nav11"
                className={
                  openActive == "nav11"
                    ? "overview_nav1   side_nav_active"
                    : "overview_nav1"
                }
                onClick={openActiveNav}
              >
                10. TOKEN RELEASE SCHEDULE
              </a>
            </div>
            <div
              className="overview_txts"
              id="overview_txts"
              onScroll={scrollMe}
            >
              <div className="overview_txt1" id="div1">
                <div className="overview_txt1_heading">
                  1. PROJECT OVERVIEW: WHAT IS Bitcoin?
                </div>
                <div className="overview_txt1_para">
                  YIN Finance is a multi-strategy NFT proactive liquidity
                  management platform that allows users to subscribe to the
                  project's strategy to achieve effective high yield liquidity
                  management.
                  <br />
                  <br />
                  YIN Finance aims to provide proactive liquidity management
                  services on different public chains and decentralized
                  exchanges. In simple terms, YIN Finance is a multi-strategy
                  NFT liquidity optimizer for Defi users.
                  <br />
                  <br />
                  Currently, it is deployed on Ethereum and will be deployed on
                  Polygon and Solana soon.
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div2">
                <div className="overview_txt1_heading">
                  2.A. GO-TO-MARKET STRATEGY
                </div>
                <div className="overview_txt1_para">
                  There is a "YinYang Master" ambassador plan which now has 20
                  people selected from different regions such as Russian England
                  and Turkey, including governance proposals, becoming an open
                  platform, and applying for The next term of Defi Alliance
                  membership.
                  <br />
                  <br />
                  At the same time, the platform will introduce more assets and
                  trading pairs that users care about. Multi-chain deployments
                  can also attract traffic on different chains.
                  <br />
                  <br />
                  In fact, their investment institutions will also help to build
                  local communities. Only by binding interests can they better
                  promote the market. Investors will be selected based on what
                  resources they can provide for the project, rather than just
                  financial screening.
                  <br />
                  <br />
                  There will also be many campaigns on Twitter, including daily
                  quizzes, meme contests, bug bounties, AMA and educational
                  videos.
                  <br />
                  Some in-depth assessment articles will be written later to let
                  global users know the differences between the products.
                  <br />
                  <br />
                  External project cooperation is also slowly advancing, for now
                  we have DODO, Polygon, Parsiq, Wepiggy, Parami, 1sol,
                  GoPocket, Desyn and more coming out…
                  <br />
                  <br />
                  Collaborate with DeFi KOLs, private farmers, DeFi communities.
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div3">
                <div className="overview_txt1_heading">
                  2.B. PRODUCT VIABILITY
                </div>
                <div className="overview_txt1_para">
                  There is a "YinYang Master" ambassador plan which now has 20
                  people selected from different regions such as Russian England
                  and Turkey, including governance proposals, becoming an open
                  platform, and applying for The next term of Defi Alliance
                  membership.
                  <br />
                  <br />
                  At the same time, the platform will introduce more assets and
                  trading pairs that users care about. Multi-chain deployments
                  can also attract traffic on different chains.
                  <br />
                  <br />
                  In fact, their investment institutions will also help to build
                  local communities. Only by binding interests can they better
                  promote the market. Investors will be selected based on what
                  resources they can provide for the project, rather than just
                  financial screening.
                  <br />
                  <br />
                  There will also be many campaigns on Twitter, including daily
                  quizzes, meme contests, bug bounties, AMA and educational
                  videos.
                  <br />
                  Some in-depth assessment articles will be written later to let
                  global users know the differences between the products.
                  <br />
                  <br />
                  External project cooperation is also slowly advancing, for now
                  we have DODO, Polygon, Parsiq, Wepiggy, Parami, 1sol,
                  GoPocket, Desyn and more coming out…
                  <br />
                  <br />
                  Collaborate with DeFi KOLs, private farmers, DeFi communities.
                  <br />
                  <br />
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419816_Competetive%20Table.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div4">
                <div className="overview_txt1_heading">3. PRODUCT ROADMAP</div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419810_Roadmap.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div5">
                <div className="overview_txt1_heading">4. REVENUE STREAMS</div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419804_Rev%20Streams.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div6">
                <div className="overview_txt1_heading">
                  5. TECHNOLOGIES USED BY THE PROJECT
                </div>
                <div className="overview_txt1_para">
                  <li className="list_item">
                    Web frontend based on React + TailwindCSS+ web3.js
                  </li>
                  <li className="list_item">
                    {" "}
                    Smart contract is written by solidity
                  </li>
                  <li className="list_item">
                    Layer1/Layer2 it will be built on: Ethereum mainnet,
                    Polygon, BSC and Solan, Arbitrum.
                  </li>
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div7">
                <div className="overview_txt1_heading">6. Partners</div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419794_Partners.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div8">
                <div className="overview_txt1_heading">7. TOKEN ECONOMY</div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419787_Token%20Economy.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div9">
                <div className="overview_txt1_heading">
                  8. DETAILED TOKEN METRICS
                </div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419787_Token%20Economy.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div10">
                <div className="overview_txt1_heading">
                  9. TOKEN DISTRIBUTION
                </div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419780_Token%20Distribution.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              <div className="overview_txt1" id="div11">
                <div className="overview_txt1_heading">
                  10. TOKEN RELEASE SCHEDULE
                </div>
                <div className="overview_txt1_para">
                  <img
                    src="https://storage.googleapis.com/public-dao-pad-prod/1635419775_Release%20Schedule.webp"
                    alt=""
                    className="overview_txt_img"
                  />
                </div>
              </div>
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
              {/* ================== */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardEgrBalancePage;
