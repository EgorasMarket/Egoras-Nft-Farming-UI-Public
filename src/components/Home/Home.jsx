import React, { useState, useEffect } from "react";

// import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CasinoIcon from "@mui/icons-material/Casino";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WhyPeopleTrustUs from "./WhyPeopleTrustUs/WhyPeopleTrustUs";
// import Carousel from "react-multi-carousel";
import NumberScroller from "react-number-scroller";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Marquee from "react-fast-marquee";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FlipCountdown from "@rumess/react-flip-countdown";
import "./countdown.css";
import WaveAnimation from "./WaveAnimation/WaveAnimation";
import "../../css/home.css";
import { PersonTwoTone } from "@material-ui/icons";
import { numberWithCommas } from "../../static";
import "./Logos.css";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [numberFrom, setNumberFrom] = useState(7990000);
  const [numberTo, setNumberTo] = useState(8000000);
  const [numberFromFund, setNumberFromFund] = useState(990000);
  const [numberToFund, setNumberToFund] = useState(1000000);
  const [aboutVideoModal, setAboutVideoModal] = useState(false);
  // const [uiMode, setUiMode] = useState(localStorage.getItem("uiMode"));
  // const []
  const assets = [
    // {
    //   img: "/img/eusd-icon-dollar.svg",
    //   name: "Egoras Naira",
    //   type: "Engn",
    //   eusd_Avail: "100M",
    //   stable: "0.50%",
    //   ratio: "170%",
    // },
    {
      img: "/img/egc-icon.svg",
      name: "Egoras Credit",
      type: "EGC",
      eusd_Avail: "90M",
      stable: "0.0%",
      ratio: "120%",
    },
  ];
  // console.log(localStorage.getItem("uiMode"), "homee local");
  // var uiMode = localStorage.getItem("uiMode");
  const toggleAboutVideoModal = () => {
    setAboutVideoModal(!aboutVideoModal);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };
  const FeaturedLogos = [
    {
      img: "/img/featured_logos/featured1.svg",
    },
    {
      img: "/img/featured_logos/featured2.svg",
    },
    {
      img: "/img/featured_logos/featured3.svg",
    },
    {
      img: "/img/featured_logos/featured4.svg",
    },
    {
      img: "/img/featured_logos/featured5.svg",
    },
    {
      img: "/img/featured_logos/featured6.svg",
    },
    {
      img: "/img/featured_logos/featured7.svg",
    },
  ];
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const results = assets.filter((person) =>
      person.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const [categoryBtn, setCategoryBtn] = useState("All");

  const triggerAll = () => {
    setCategoryBtn("All");
  };

  const triggerPopular = () => {
    setCategoryBtn("Popular");
  };
  const triggerStable = () => {
    setCategoryBtn("Stable");
  };

  return (
    <div>
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}

      {/* third section start */}
      <section className="earning-section">
        <div className="container">
          <div className="nft-area2">
            <div className="nft-txt-area2 " style={{ width: "100%" }}>
              <div className="span-txts">
                <p className="span4a-txts">
                  Liquidity for <span className="real_life">Real-life</span>{" "}
                  assets.
                </p>
                <p className="span4b-txts">
                  Egoras is a decentralized organization built to enable anyone
                  to get funding or sell any real-life asset easily.
                </p>
              </div>
              <div className="stake-hero-btns">
                <a href="/dashboard" className="stake-hero-btn2">
                  Launch App <ExitToAppIcon className="exit-to-app" />
                </a>
                <a href="/dashboard/whitepaper" className="stake-hero-btn1">
                  Read Docs
                </a>
              </div>
              {/* <FlipCountdown
                className="flip-countdown"
                titlePosition="bottom"
                yearTitle="Year"
                monthTitle="Months"
                dayTitle="Days"
                hourTitle="Hours"
                minuteTitle="Minutes"
                secondTitle="Seconds"
                hideYear
                // hideMonth
                size="small"
                endAt={"2022-07-03 08:00:00"}
              /> */}
            </div>
            <div
              className="nft-img-area2"
              style={{ display: "inline-flex", width: "100%" }}
            ></div>
          </div>
        </div>
        {/* <img src="/img/blur-drop.png" alt="" className="blurDrop-token" /> */}
        <img src="/img/hero_bg_bg.png" alt="" className="blurDrop-token2" />
        {/* <img src="/img/banner-bg.png" alt="" className="blurDrop-token3" /> */}

        <div className="floating_images_cont">
          <img src="/img/floating_cube1.svg" alt="" className="float_cube1" />
          <img src="/img/floating_cube2.svg" alt="" className="float_cube2" />
          <img
            src="/img/floating_layers_img.svg"
            alt=""
            className="float_layer1"
          />
          <img src="/img/floating_shadow.png" alt="" className="float_shadow" />
          <img src="/img/floating_circle.png" alt="" className="float_circle" />
          <img
            src="/img/floating_circle2.png"
            alt=""
            className="float_circle2"
          />
        </div>
        {/* <WaveAnimation /> */}

        <div className="floating_absolute_div">
          <div className="floating_div_cont_area">
            <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">
                Total Transactions
              </div>
              <div className="floating_div_cont_area1_cont2">50 Txns</div>
            </div>
            <span class="vertical_rule"></span>
            <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">
                Total Assets Value
              </div>
              <div className="floating_div_cont_area1_cont2">
                <NumberScroller
                  step={1}
                  timeout={1000}
                  from={numberFrom}
                  to={numberTo}
                  toLocaleStringProps={["en-US"]}
                />{" "}
                Engn
              </div>
            </div>
            <span class="vertical_rule"></span>
            <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">
                Total Amount funded
              </div>
              <div className="floating_div_cont_area1_cont2">
                <NumberScroller
                  step={1}
                  timeout={1000}
                  from={numberFromFund}
                  to={numberToFund}
                  toLocaleStringProps={["en-US"]}
                />{" "}
                Engn
              </div>
            </div>
            <span class="vertical_rule"></span>
            <div className="floating_div_cont_area1">
              <div className="floating_div_cont_area1_cont1">
                Estimated APY:
              </div>
              <div className="floating_div_cont_area1_cont2">13%</div>
            </div>
          </div>
        </div>
      </section>
      {/* third section end */}
      {/* ========================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* ========================== */}
      {/* ========================== */}

      <section className="real_world_adoption">
        <div className="container">
          <div className="real_world_adoption_area">
            <div className="real_world_adoption_area1">
              {aboutVideoModal === true ? (
                <div className="about_video_div">
                  <div className="container">
                    <CloseIcon
                      className="close_About_video_modal"
                      onClick={toggleAboutVideoModal}
                    />

                    <div className="about_video_player">
                      <iframe
                        src="https://player.vimeo.com/video/702600317?h=836afd9a85&amp;badge=0&amp;autopause=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                        }}
                        // title="EGORAS TRILLER .MP4"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="about_video_thumbnail_cont">
                <div className="about_video_thumbnail_cont_bg">
                  <img
                    src="/img/logoVideoThumbnail.svg"
                    alt=""
                    className="thumbnail_img"
                  />
                  <div className="wrap">
                    <img
                      src="/img/play_thumbnail_btn.svg"
                      alt=""
                      className="thumbnail_btn"
                      onClick={toggleAboutVideoModal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="real_world_adoption_area2">
              <div className="real_world_adoption_area2_title">
                Real World Adoption
              </div>
              <div className="real_world_adoption_area2_para">
                Egoras is the fastest growing decentralized organization in the
                world with thousands of people using the protocol to access
                liquidity to real world assets.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}

      {/* =================== */}
      {/* <WhyPeopleTrustUs /> */}
      {/* ==================== */}
      {/* ==================== */}

      <section className="whyEgorasSection">
        <div className="container">
          <div className="why_egoras_area">
            <div className="whyEgoras_heading">Why Egoras</div>
            <div className="whyEgoras_body">
              <div className="whyEgoras_body_cont1">
                <div className="whyEgoras_body_cont1_text">
                  Banks don't accept assets like electrical appliances as
                  collateral to access loans.
                </div>
                <div className="whyEgoras_body_cont1_img">
                  <img
                    src="/img/dont_accept_img.svg"
                    className="whyEgoras_body_cont1_img_image"
                    alt=""
                  />
                </div>
              </div>
              <div className="whyEgoras_body_cont1">
                <div className="whyEgoras_body_cont1_text">
                  Difficulty to sell real world assets like cars, electronics
                  e.t.c.
                </div>
                <div className="whyEgoras_body_cont1_img">
                  <img
                    src="/img/dont_accept_img.svg"
                    className="whyEgoras_body_cont1_img_image"
                    alt=""
                  />
                </div>
              </div>
              <div className="whyEgoras_body_cont1">
                <div className="whyEgoras_body_cont1_text">
                  Banks use humulating measures to recover uncollateralized
                  loans.
                </div>
                <div className="whyEgoras_body_cont1_img">
                  <img
                    src="/img/dont_accept_img.svg"
                    className="whyEgoras_body_cont1_img_image"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}

      {/* third section start */}

      {/* fourth section start */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}

      {/* <section className="collateral-assets-section">
        <div className="container"></div>
      </section> */}

      {/* third section start */}

      {/* fourth section start */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* ==================== */}
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}

      {/* third section start */}

      {/* fourth section start */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* <section className="governance_landing_section">
        <div className="container">
          <div className="governance">
            <div className="how_it_works_title_cont">
              <div className="how_it_works_title">
                Governed by the community
              </div>
              <div className="how_it_works_para">
                Aave is a fully decentralized, community governed protocol with
                110,720 token holders.
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      <section className="featured_section">
        <div className="custom_container">
          <div className="featured_logos_area">
            <div className="featured_in_head">Featured In</div>
            {/* Carousel start==============================
==============================================
============================= */}
            <Carousel
              responsive={responsive}
              className="featured_logos"
              showDots={false}
              //   infinite={false}
              autoPlay={true}
              // autoPlaySpeed={10000}
              infinite={true}
              draggable={true}
              swipeable={true}
            >
              {FeaturedLogos.map((data) => (
                <div className="featured_in_logos_cont">
                  {" "}
                  <img src={data.img} alt="" className="featured_logo" />
                </div>
              ))}
            </Carousel>
            <div className="featured_logos_mobile">
              {FeaturedLogos.map((data) => (
                <div className="featured_in_logos_cont">
                  {" "}
                  <img src={data.img} alt="" className="featured_logo" />
                </div>
              ))}
            </div>
            {/* Carousel end==============================
==============================================
============================= */}
          </div>
        </div>
      </section>
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      <section className="getStartedSection">
        <div className="container">
          <div className="getStarted_area">
            <div className="getStarted_title">Sounds Interesting ?</div>
            <a href="/dashboard" className="getStarted_btn">
              <button className="get_started_button">Get started</button>
            </a>
            <img
              src="/img/get_old_tech_bg.png"
              alt=""
              className="get_old_tech_bg"
            />
          </div>
        </div>
      </section>
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}

      {/* ============== */}
      {/* ============== */}
      {/* ============== */}
      {/* ============== */}

      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
    </div>
  );
};

export default Home;
