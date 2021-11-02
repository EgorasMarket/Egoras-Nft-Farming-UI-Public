import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../../css/dashboardegrbalance.css";

const DashboardEgrBalancePage = () => {
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
              <a href="#" className="overview_nav1">
                1. PROJECT OVERVIEW: WHAT IS Bitcoin?
              </a>
              <a href="#" className="overview_nav1">
                2.A. GO-TO-MARKET STRATEGY
              </a>
              <a href="#" className="overview_nav1">
                2.B. PRODUCT VIABILITY
              </a>
              <a href="#" className="overview_nav1">
                3. PRODUCT ROADMAP
              </a>
              <a href="#" className="overview_nav1">
                4. REVENUE STREAMS
              </a>
              <a href="#" className="overview_nav1">
                5. PRODUCT DIVE
              </a>
              <a href="#" className="overview_nav1">
                6. TECHNOLOGIES USED BY THE PROJECT
              </a>
              <a href="#" className="overview_nav1">
                7. PARTNERS
              </a>
              <a href="#" className="overview_nav1">
                8. TOKEN ECONOMY
              </a>
              <a href="#" className="overview_nav1">
                9. DETAILED TOKEN METRICS
              </a>
              <a href="#" className="overview_nav1">
                10. TOKEN DISTRIBUTION
              </a>
              <a href="#" className="overview_nav1">
                11. TOKEN RELEASE SCHEDULE
              </a>
            </div>
            <div className="overview_txts">
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
              <div className="overview_txt1" id="div3">
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
              <div className="overview_txt1" id="div3">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardEgrBalancePage;
