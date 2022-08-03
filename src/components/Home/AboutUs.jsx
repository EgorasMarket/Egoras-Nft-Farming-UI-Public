import React from "react";
import "../../css/aboutus.css";
import EastIcon from "@mui/icons-material/East";
import TelegramIcon from "@mui/icons-material/Telegram";
// import roadMap from "/img/road_map_street_bg.png";
const AboutUs = () => {
  return (
    <div>
      <section className="about_us_section_hero">
        <div className="container">
          <div className="about_us_section_hero_area">
            <div className="about_us_section_hero_area_1">
              <div className="about_us_section_hero_area_1_title">
                For 4years, We have been providing liquidity and recommerce
                services for Real- World Assets.
              </div>

              <div className="egoras_logos_cont">
                <div className="egoras_logos_cont_1">
                  <img
                    src="/img/egc_icon2.svg"
                    alt=""
                    className="egoras_logos_cont_1_img"
                  />
                  <div className="egoras_logos_cont_1_txt">Egoras Credit</div>
                </div>
                <div className="egoras_logos_cont_1">
                  <img
                    src="/img/eusd-icon-dollar.svg"
                    alt=""
                    className="egoras_logos_cont_1_img"
                  />
                  <div className="egoras_logos_cont_1_txt">Egoras Naira</div>
                </div>
                <div className="egoras_logos_cont_1">
                  <img
                    src="/img/egoras-favicon.svg"
                    alt=""
                    className="egoras_logos_cont_1_img"
                  />
                  <div className="egoras_logos_cont_1_txt">Egoras Rights</div>
                </div>
              </div>
            </div>
            <div className="about_us_section_hero_area_2">
              <div className="about_us_section_hero_area_2_img_container">
                <img
                  src="/img/dummy_img_sea.svg"
                  alt=""
                  className="about_us_section_hero_area_2_img_container_img"
                />
              </div>
              <div className="about_us_section_hero_area_2_txt_container">
                <div className="about_us_section_hero_area_2_txt_container_head">
                  Egoras history
                </div>
                Egoras was founded in 2019 by a team of entrepreneurs,
                ex-bankers, economist and engineers determined to distrupt the
                financial & retail sector launched a decentralised liquidity
                protocol on blockchain. Thousands of people have used egoras
                liquidity service to convert real-world assets. Today we are
                even more determined and have built liquidity protocol across
                multiple blockchains. Our protocol can help you get access to
                funding within 5mins for any real-world assets.
              </div>
            </div>
          </div>
        </div>
        {/* <img
          src="/img/about_hero_bg_logo.svg"
          alt=""
          className="about_hero_bg_logo"
        /> */}
        <img
          src="/img/about_hero_lines.svg"
          alt=""
          className="about_hero_section_lines"
        />
      </section>
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      <section className="advantages_section">
        <div className="container">
          <div className="advantages_section_area">
            <div className="advantages_section_area_1">
              ADVANTAGES OF USING EGORAS PROTOCOL.
            </div>
            <div className="advantages_section_area_2">
              <div className="advantages_section_area_2_cont1">
                <div className="advantages_section_area_2_cont1_head">
                  <img
                    src="/img/about_step_icon.svg"
                    alt=""
                    className="about_step_icon"
                  />
                  STAKE
                </div>{" "}
                Staking EGC provides collaterals for the debt pool and holders
                earn monthly rewards that are a combination of protocol fees and
                inflationary supplies.
              </div>
              <div className="advantages_section_area_2_cont1">
                <div className="advantages_section_area_2_cont1_head">
                  <img
                    src="/img/about_step_icon.svg"
                    alt=""
                    className="about_step_icon"
                  />{" "}
                  EARN
                </div>{" "}
                Supply liquidity for real world assets to earn fees as you do
                it.
              </div>
              <div className="advantages_section_area_2_cont1">
                <div className="advantages_section_area_2_cont1_head">
                  <img
                    src="/img/about_step_icon.svg"
                    alt=""
                    className="about_step_icon"
                  />{" "}
                  SWAP
                </div>{" "}
                Convert your earned eNGN to EGC or convert your EGC to eNGN so
                as to provide liquidity to real world assets.
              </div>
            </div>
          </div>
        </div>
        <img
          src="/img/about_simple_section_lines.svg"
          alt=""
          className="about_simple_section_lines"
        />
      </section>
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      <section className="help_u_section">
        <div className="container">
          <div className="help_u_section_area">
            <div className="help_u_section_area_head">
              We’re here to help you be successful.{" "}
              <div className="help_u_section_area_head_para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                dolorem deserunt adipisci illo obcaecati veniam?
              </div>
            </div>
            <div className="help_u_section_area_cont">
              <div className="help_u_section_area_cont1">
                <div className="help_u_section_area_cont1_icon">
                  <img
                    src="/img/dummy_we_help_icon.svg"
                    alt=""
                    className="we_help_icon"
                  />
                </div>
                <div className="help_u_section_area_cont1_head">
                  Credit Delegation
                </div>
                <div className="help_u_section_area_cont1_para">
                  Liquidity providers & lenders can choose to offer line of
                  credit to borrower of their own choice. The transaction is
                  facilitated by Trustscore that runs on proprietary algorithms
                  to evaluate borrower's credit worthiness by choice.
                </div>
              </div>
              <div className="help_u_section_area_cont1">
                <div className="help_u_section_area_cont1_icon">
                  <img
                    src="/img/dummy_we_help_icon.svg"
                    alt=""
                    className="we_help_icon"
                  />
                </div>
                <div className="help_u_section_area_cont1_head">
                  Credit Delegation
                </div>
                <div className="help_u_section_area_cont1_para">
                  Liquidity providers & lenders can choose to offer line of
                  credit to borrower of their own choice. The transaction is
                  facilitated by Trustscore that runs on proprietary algorithms
                  to evaluate borrower's credit worthiness by choice.
                </div>
              </div>
              <div className="help_u_section_area_cont1">
                <div className="help_u_section_area_cont1_icon">
                  <img
                    src="/img/dummy_we_help_icon.svg"
                    alt=""
                    className="we_help_icon"
                  />
                </div>
                <div className="help_u_section_area_cont1_head">
                  Credit Delegation
                </div>
                <div className="help_u_section_area_cont1_para">
                  Liquidity providers & lenders can choose to offer line of
                  credit to borrower of their own choice. The transaction is
                  facilitated by Trustscore that runs on proprietary algorithms
                  to evaluate borrower's credit worthiness by choice.
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/img/to_help_section_lines.svg"
          alt=""
          className="to_help_section_lines"
        />
      </section>
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      <section
        className="roadmap_section"
        style={{ backgroundImage: "url(/img/road_map_street_bg.png)" }}
      >
        <div className="road_map_head">Road Map</div>
        {/* <div className="container"> */}
        <div className="road_map_area">
          <img src="/img/road_route.svg" alt="" className="road_route" />
          <div className="road_map_area_div1">
            <div className="road_map_area_div_circle_bg">
              <div className="road_map_area_div_circle"></div>
              <div className="road_map_area_div_circle_blur"></div>
            </div>
            <div className="road_map_area_div1_txt_cont">
              2019{" "}
              <div className="road_map_area_div3_txt_cont_para">
                <ul className="roadMap_list_area">
                  <li className="roadMap_list_conts">
                    {" "}
                    Launch of Organisation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="road_map_area_div2">
            <div className="road_map_area_div_circle_bg">
              <div className="road_map_area_div_circle"></div>
              <div className="road_map_area_div_circle_blur"></div>
            </div>
            <div className="road_map_area_div3_txt_cont">
              2020{" "}
              <div className="road_map_area_div3_txt_cont_para">
                <ul className="roadMap_list_area">
                  <li className="roadMap_list_conts"> Pawnbroker License.</li>
                  <li className="roadMap_list_conts"> Moneylender License.</li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Onboard 5,000 borrowers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="road_map_area_div3">
            <div className="road_map_area_div_circle_bg">
              <div className="road_map_area_div_circle"></div>
              <div className="road_map_area_div_circle_blur"></div>
            </div>
            <div className="road_map_area_div3_txt_cont">
              2021{" "}
              <div className="road_map_area_div3_txt_cont_para">
                <ul className="roadMap_list_area">
                  <li className="roadMap_list_conts"> Launch of our token.</li>
                  <li className="roadMap_list_conts"> Cooperative license.</li>
                  <li className="roadMap_list_conts"> Onboard 20,000 users.</li>
                  <li className="roadMap_list_conts"> List on exchanges.</li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Expansion of offline locations.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="road_map_area_div4">
            <div className="road_map_area_div_circle_bg">
              <div className="road_map_area_div_circle"></div>
              <div className="road_map_area_div_circle_blur"></div>
            </div>
            <div className="road_map_area_div3_txt_cont">
              2022{" "}
              <div className="road_map_area_div3_txt_cont_para">
                <ul className="roadMap_list_area">
                  <li className="roadMap_list_conts">
                    {" "}
                    Launch of liquidity services.
                  </li>
                  <li className="roadMap_list_conts">
                    Launch of refurbishing facility.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Launch of decentralized debt marketplace.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Expansion to all cities in Nigeria.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Listing on top tier exchanges.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Marketing campaign for debt marketplace.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="road_map_area_div5">
            <div className="road_map_area_div_circle_bg">
              <div className="road_map_area_div_circle"></div>
              <div className="road_map_area_div_circle_blur"></div>
            </div>
            <div className="road_map_area_div3_txt_cont">
              2023{" "}
              <div className="road_map_area_div3_txt_cont_para">
                <ul className="roadMap_list_area">
                  <li className="roadMap_list_conts">
                    Launch of liquidity services for vehicles.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Launch of refurbishing facility cars.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Lunch on bigger exchanges.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Expansion across Africa.
                  </li>
                  <li className="roadMap_list_conts">
                    {" "}
                    Launch of V3 (DEBT MARKETPLACE).
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="road_map_area_div6">
            <div className="road_map_area_div_circle_bg">
              <div className="road_map_area_div_circle"></div>
              <div className="road_map_area_div_circle_blur"></div>
            </div>
            <div className="road_map_area_div6_txt_cont">
              2024{" "}
              <div className="road_map_area_div3_txt_cont_para">
                <ul className="roadMap_list_area_last">
                  <li className="roadMap_list_conts">
                    {" "}
                    Expansion across the globe
                  </li>
                  <li className="roadMap_list_conts">
                    Launch of V4( Debt marketplace).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      <section className="featuredIn_section">
        <div className="container">
          <div className="feauturedIn_area">
            <div className="feauturedIn_area_head">Feautured In</div>
            <div className="feauturedIn_area_body">
              <div className="feauturedIn_area_body_cont1">
                <img
                  src="/img/FeaturedInLogos/FeaturedInLogos_1.svg"
                  alt=""
                  className="featuredIn_logo_img"
                />
              </div>
              <div className="feauturedIn_area_body_cont1">
                <img
                  src="/img/FeaturedInLogos/FeaturedInLogos_2.svg"
                  alt=""
                  className="featuredIn_logo_img"
                />
              </div>
              <div className="feauturedIn_area_body_cont1">
                <img
                  src="/img/FeaturedInLogos/FeaturedInLogos_3.svg"
                  alt=""
                  className="featuredIn_logo_img"
                />
              </div>
              <div className="feauturedIn_area_body_cont1">
                <img
                  src="/img/FeaturedInLogos/FeaturedInLogos_4.svg"
                  alt=""
                  className="featuredIn_logo_img"
                />
              </div>
              <div className="feauturedIn_area_body_cont1">
                <img
                  src="/img/FeaturedInLogos/FeaturedInLogos_5.svg"
                  alt=""
                  className="featuredIn_logo_img"
                />
              </div>
              <div className="feauturedIn_area_body_cont1">
                <img
                  src="/img/FeaturedInLogos/FeaturedInLogos_6.svg"
                  alt=""
                  className="featuredIn_logo_img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      <section className="join_community_section">
        <div className="container">
          <div className="join_community_area">
            <div className="join_community_area1">
              <div className="join_community_area1_head">
                Join our Community
              </div>
              <div className="join_community_area1_para">
                To Get Support, Latest news, Announcement And Quick Updates on
                Easyfi
              </div>
              <div className="join_community_area1_btn">
                <button>
                  Join Telegram <EastIcon className="arrow_join_icon" />
                </button>
              </div>
            </div>
            <div className="join_community_area2">
              <div className="join_us_icon_div">
                <TelegramIcon className="arrow_telegram_icon" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
