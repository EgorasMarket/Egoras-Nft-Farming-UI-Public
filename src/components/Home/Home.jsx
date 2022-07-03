import React, { useState, useEffect } from 'react';

// import React from "react";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CasinoIcon from '@mui/icons-material/Casino';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Carousel from "react-multi-carousel";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Marquee from 'react-fast-marquee';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import SearchIcon from '@mui/icons-material/Search';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FlipCountdown from '@rumess/react-flip-countdown';
import './countdown.css';
import WaveAnimation from './WaveAnimation/WaveAnimation';
import '../../css/home.css';
import { PersonTwoTone } from '@material-ui/icons';
import './Logos.css';
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      img: '/img/egc-icon.svg',
      name: 'Egoras Credit',
      type: 'EGC',
      eusd_Avail: '90M',
      stable: '0.50%',
      ratio: '120%',
    },
  ];

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
      img: '/img/featured_logos/featured1.svg',
    },
    {
      img: '/img/featured_logos/featured2.svg',
    },
    {
      img: '/img/featured_logos/featured3.svg',
    },
    {
      img: '/img/featured_logos/featured4.svg',
    },
    {
      img: '/img/featured_logos/featured5.svg',
    },
    {
      img: '/img/featured_logos/featured6.svg',
    },
    {
      img: '/img/featured_logos/featured7.svg',
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
      person.name
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const [categoryBtn, setCategoryBtn] = useState('All');

  const triggerAll = () => {
    setCategoryBtn('All');
  };

  const triggerPopular = () => {
    setCategoryBtn('Popular');
  };
  const triggerStable = () => {
    setCategoryBtn('Stable');
  };

  return (
    <div>
      {/* =================================================================================================================================================================================================================================================================== */}
      {/* Tokens Section Start */}

      {/* third section start */}
      <section className="earning-section">
        <div className="container">
          <div className="nft-area2">
            <div className="nft-txt-area2 " style={{ width: '100%' }}>
              <div className="span-txts">
                <p className="span4a-txts">
                  Grow your portfolio with Egoras
                </p>
                <p className="span4b-txts">
                  Build your portfolio with Egoras Interest-free
                  Cryptoloans or earn attractive APY when you stake
                  your crypto.
                </p>
              </div>
              <div className="stake-hero-btns">
                <a href="/dashboard" className="stake-hero-btn1">
                  Launch App <ExitToAppIcon className="exit-to-app" />
                </a>
                <a
                  href="/dashboard/whitepaper"
                  className="stake-hero-btn2"
                >
                  Read White-Paper
                </a>
              </div>
              <FlipCountdown
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
                endAt={'2022-07-03 13:00:00'}
              />
            </div>
            <div
              className="nft-img-area2"
              style={{ display: 'inline-flex', width: '100%' }}
            >
              <img
                src="/img/egr-stake-coina.png"
                alt=""
                style={{ width: '80%', margin: 'auto' }}
              />
            </div>
          </div>
        </div>
        {/* <img src="/img/blur-drop.png" alt="" className="blurDrop-token" /> */}
        <img
          src="/img/hero_bg_bg.png"
          alt=""
          className="blurDrop-token2"
        />
        {/* <img src="/img/banner-bg.png" alt="" className="blurDrop-token3" /> */}

        <div className="floating_images_cont">
          <img
            src="/img/floating_cube1.svg"
            alt=""
            className="float_cube1"
          />
          <img
            src="/img/floating_cube2.svg"
            alt=""
            className="float_cube2"
          />
          <img
            src="/img/floating_layers_img.svg"
            alt=""
            className="float_layer1"
          />
          <img
            src="/img/floating_shadow.png"
            alt=""
            className="float_shadow"
          />
          <img
            src="/img/floating_circle.png"
            alt=""
            className="float_circle"
          />
          <img
            src="/img/floating_circle2.png"
            alt=""
            className="float_circle2"
          />
        </div>
        {/* <WaveAnimation /> */}
      </section>
      {/* third section end */}
      {/* ========================== */}
      {/* ========================== */}
      {/* ========================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* =================== */}
      {/* fourth section start */}
      {/* <section className="second-eusd-token-section">
        <div className="container">
          <div className="nft-area3">
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1a btc-color">
                  <h1 className="btc-card-txt-weight">BTC</h1>
                  <div className="btc-card-fees-figure">
                    <h6 className="fees-figure">Stability Fee: 3.00%</h6>
                    <h6 className="fees-figure">Min Collat:.Ratio: 175%</h6>
                  </div>
                  <img
                    src="/img/btc-3d-icon.svg"
                    alt=""
                    className="btc-3d-icon"
                  />
                </div>
                <div className="key-features-cards-area1a eth-color">
                  <h1 className="btc-card-txt-weight">ETH</h1>
                  <div className="btc-card-fees-figure">
                    <h6 className="fees-figure">Stability Fee: 3.00%</h6>
                    <h6 className="fees-figure">Min Collat:.Ratio: 175%</h6>
                  </div>
                  <img
                    src="/img/eth-3d-icon.svg"
                    alt=""
                    className="eth-3d-icon"
                  />
                </div>
                <div className="key-features-cards-area1a egr-color">
                  <h1 className="btc-card-txt-weight">EGR</h1>
                  <div className="btc-card-fees-figure">
                    <h6 className="fees-figure">Stability Fee: 3.00%</h6>
                    <h6 className="fees-figure">Min Collat:.Ratio: 175%</h6>
                  </div>
                  <img
                    src="/img/egr-3d-icon.svg"
                    alt=""
                    className="egr-3d-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/blur-drop.png" alt="" className="blurDrop-token" />
      </section> */}
      {/* fourth section end */}

      <section className="second-eusd-token-section" id="features">
        <div className="container">
          {/* <div className="key_features_section_title">
            Explore endless possibilities with Egoras crypto loan.
          </div> */}
          <div className="nft-area3">
            <div className="key-features-cards-area">
              <div className="key-features-cards-area-flex">
                <div className="key-features-cards-area1">
                  <div className="key_features_image">
                    <img
                      src="/img/hsh2.svg"
                      alt=""
                      className="key_features_img"
                    />
                  </div>
                  <div className="key_features_txts">
                    <div className="key-features-cards-area1-header">
                      {' '}
                      Staking
                    </div>
                    <p className="key-features-cards-area1-para">
                      Earn up to 60% APY when you stake EGR or
                      different assets in a decentralised and
                      non-custodial manner.
                    </p>
                  </div>
                </div>
                <div className="key-features-cards-area1 flex_rev_me">
                  <div className="key_features_txts">
                    <div className="key-features-cards-area1-header">
                      {' '}
                      Interest-Free CryptoLoans
                    </div>
                    <p className="key-features-cards-area1-para">
                      Why sell your crypto at loss. Deposit 25+ crypto
                      collaterals to borrow eNGN interest-free.
                    </p>
                  </div>
                  <div className="key_features_image">
                    <img
                      src="/img/nft_image-BINANCE.svg"
                      alt=""
                      className="key_features_img"
                    />
                  </div>
                </div>
                <div className="key-features-cards-area1">
                  <div className="key_features_image">
                    <img
                      src="/img/swap_crypt.svg"
                      alt=""
                      className="key_features_img"
                    />
                  </div>
                  <div className="key_features_txts">
                    <div className="key-features-cards-area1-header">
                      {' '}
                      Swap
                    </div>
                    <p className="key-features-cards-area1-para">
                      Buy/Sell over 25+ crypto asset to increase your
                      exposure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/img/blur-drop.png"
          alt=""
          className="blurDrop-token"
        />
      </section>

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

      <section className="collateral-assets-section">
        <div className="container">
          <div className="assets-container">
            <div className="assets-cont-head-area">
              <div className="assets-cont-header-arae-btns">
                <button
                  className={
                    categoryBtn === 'All'
                      ? 'assets-header1'
                      : 'assets-header2'
                  }
                  onClick={triggerAll}
                >
                  All assets
                </button>
                {/* <button
                  className={
                    categoryBtn === "Stable"
                      ? "assets-header1"
                      : "assets-header2"
                  }
                  onClick={triggerStable}
                >
                  Stablecoins
                </button> */}
              </div>

              <div className="search-input">
                {' '}
                <input
                  type="search"
                  name="search"
                  id="searchCollaterals"
                  className="assets-header3"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                ></input>{' '}
                <SearchIcon className="search-icon" />
              </div>
            </div>
            <table className="assets-table">
              <thead className="assets-category-titles">
                <tr className="assets">
                  <th className="assets-category-titles-heading1">
                    Asset
                  </th>
                  <th className="assets-category-titles-heading1">
                    Type
                  </th>
                  <th className="assets-category-titles-heading1 right">
                    ENGN Available
                  </th>
                  <th className="assets-category-titles-heading1 right">
                    Stable Fee
                  </th>
                  <th className="assets-category-titles-heading1 right">
                    Min Coll.Ratio
                  </th>
                  <th className="assets-category-titles-heading1 right"></th>
                </tr>
              </thead>

              {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================

                
              </div> */}
              <tbody
                className="assets-table-body popular-categories"
                id="popular-categories"
              >
                {' '}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
                {searchResults.map((asset) => (
                  <tr className="assets-category-row">
                    <td className="assets-category-data">
                      <div className="assets-data">
                        <img
                          src={asset.img}
                          alt=""
                          className="assets-list-icon"
                        />

                        <div className="assets-data-name">
                          {asset.name}
                        </div>
                      </div>
                    </td>
                    <td className="assets-category-data1">
                      <div className="assets-data-name">
                        {asset.type}
                      </div>
                    </td>
                    <td className="assets-category-data1b">
                      <div className="assets-data-name ">
                        {asset.eusd_Avail}
                      </div>
                    </td>
                    <td className="assets-category-data1b stable-content">
                      <div className="assets-data-name ">
                        {asset.stable}
                      </div>
                    </td>
                    <td className="assets-category-data1b ratio-content">
                      <div className="assets-data-name ">
                        {asset.ratio}
                      </div>
                    </td>
                    <td className="assets-category-data-last">
                      <div className="assets-data-name-last">
                        <a
                          href={`/vault/${asset.type}/ENGN`}
                          className="assets-collateralize-button"
                          style={{ border: 'none' }}
                        >
                          Open Vault
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* =============== */}
                {/* =============== */}
                {/* =============== */}
              </tbody>
              {/* {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}} */}
            </table>
          </div>
        </div>
      </section>

      {/* third section start */}

      {/* fourth section start */}

      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}

      <section className="how_it_works_section" id="howitworks">
        <div className="container">
          <div className="how_it_works_section_div">
            <div className="how_it_works_title_cont">
              <div className="how_it_works_title">How it works</div>
              <div className="how_it_works_para">
                Egoras is a fully decentralized, community governed
                protocol with 110,720 token holders.
              </div>
            </div>
            <div className="how_it_works_area">
              <div className="how_it_works_area1">
                <div className="how_it_works_area_cont1">
                  <div className="how_it_works_area_cont1_image">
                    <img
                      src="/img/connectWallet_img.png"
                      alt=""
                      className="how_it_works_area_cont1_img"
                    />
                  </div>
                  <div className="how_it_works_area_cont1_title">
                    Connect Wallet
                  </div>
                  <div className="how_it_works_area_cont1_para">
                    Gauge community sentiment on a new proposal
                    through a Snapshot.
                  </div>

                  <a href="" className="visit_app_link_2">
                    How to create Snapshot
                  </a>

                  <div className="cont1_number">1</div>
                </div>
                <div className="how_it_works_area_cont1">
                  <div className="how_it_works_area_cont1_image">
                    <img
                      src="/img/openVault_img.png"
                      alt=""
                      className="how_it_works_area_cont1_img"
                    />
                  </div>
                  <div className="how_it_works_area_cont1_title">
                    Open Vault
                  </div>
                  <div className="how_it_works_area_cont1_para">
                    Gauge community sentiment on a new proposal
                    through a Snapshot.
                  </div>

                  <a href="" className="visit_app_link_2">
                    How to create Snapshot
                  </a>

                  <div className="cont1_number">2</div>
                </div>
                <div className="how_it_works_area_cont1">
                  <div className="how_it_works_area_cont1_image">
                    <img
                      src="/img/generate_engn_img.png"
                      alt=""
                      className="how_it_works_area_cont1_img"
                    />
                  </div>
                  <div className="how_it_works_area_cont1_title">
                    Generate ENGN
                  </div>
                  <div className="how_it_works_area_cont1_para">
                    Gauge community sentiment on a new proposal
                    through a Snapshot.
                  </div>

                  <a href="" className="visit_app_link_2">
                    How to create Snapshot
                  </a>

                  <div className="cont1_number">3</div>
                </div>
              </div>
              {/* <div className="how_it_works_area2"></div> */}
            </div>
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
                  {' '}
                  <img
                    src={data.img}
                    alt=""
                    className="featured_logo"
                  />
                </div>
              ))}
            </Carousel>
            <div className="featured_logos_mobile">
              {FeaturedLogos.map((data) => (
                <div className="featured_in_logos_cont">
                  {' '}
                  <img
                    src={data.img}
                    alt=""
                    className="featured_logo"
                  />
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
            <div className="getStarted_title">
              Get crypto loan today
            </div>
            <a href="/dashboard" className="getStarted_btn">
              <button className="get_started_button">
                Get started
              </button>
            </a>
          </div>
        </div>
        <WaveAnimation />
        <img
          src="/img/get_old_tech_bg.png"
          alt=""
          className="get_old_tech_bg"
        />
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
