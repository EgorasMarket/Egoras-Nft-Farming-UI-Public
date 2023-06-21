import React, { useEffect, useState } from "react";
import "../UpdatedAppPagesStyles/dashboardMarketHome.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppsIcon from "@mui/icons-material/Apps";
import Carousel from "react-multi-carousel";
import Blockies from "react-blockies";
import { API_URL } from "../../../../../actions/types";
import axios from "axios";
import { config } from "../../../../../actions/Config";
import { numberWithCommas } from "../../../../static/static";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { GET_ALL_UPLOADED_PRODUCTS } from "../../../../../services/productServices";
import ProductModel from "./ProductModel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DashboardMarketHome = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProduct2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [products4, setProducts4] = useState([]);
  const [products5, setProducts5] = useState([]);

  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1320 },
      items: 5,
    },
    desktop2: {
      breakpoint: { max: 1320, min: 990 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 990, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 350 },
      items: 2,
    },
    smallerMobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await GET_ALL_UPLOADED_PRODUCTS();
      console.log(response.data);
      setProducts(response.data.getAllUploadedProduct);
    };

    fetchData();
  }, []);

  const responsiveHero = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1320 },
      items: 1,
    },
    desktop2: {
      breakpoint: { max: 1320, min: 990 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 990, min: 600 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + "/product/product-by-category/Phones & Tablets",
        null,
        config
      );
      console.log(response);
      console.log(response.data.data);
      setProduct2(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
    try {
      const response2 = await axios.get(
        API_URL + "/product/product-by-category/Computers",
        null,
        config
      );
      console.log(response2);
      console.log(response2.data.data);
      setProducts3(response2.data.data);
    } catch (error) {
      console.log(error.response);
    }
    try {
      const response4 = await axios.get(
        API_URL + "/product/product-by-category/Machineries",
        null,
        config
      );
      console.log(response4);
      console.log(response4.data.data);
      setProducts5(response4.data.data);
    } catch (error) {
      console.log(error.response);
    }
    try {
      const response3 = await axios.get(
        API_URL + "/product/product-by-category/Electronics",
        null,
        config
      );
      console.log(response3);
      console.log(response3.data.data);
      setProducts4(response3.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);
  return (
    <div className="other2 asset_other2">
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="dashboardMarketPlaceContainer">
            <div className="dashboardMarketPlaceBody">
              <div className="dashboardMarketPlaceBody1">
                <div className="dashboardMarketPlaceBody1_cont1">
                  <Carousel
                    responsive={responsiveHero}
                    showDots={true}
                    //   infinite={false}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    pauseOnHover={true}
                    infinite={true}
                    draggable={true}
                    swipeable={true}
                    className="product_carousel"
                  >
                    <img
                      src="/img/marketBanners/ABOUT IT.png"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    />
                    <img
                      src="/img/marketBanners/1p.png"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    />
                    {/* <img
                      src="/img/marketBanners/2.png"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    /> */}
                    <img
                      src="/img/marketBanners/2p.png"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    />
                  </Carousel>
                </div>
                <div className="dashboardMarketPlaceBody1_cont2">
                  <div className="dashboardMarketPlaceBody1_cont2_head">
                    Top Brands
                  </div>
                  <div className="dashboardMarketPlaceBody1_cont2_body">
                    <img
                      src="/img/brand_images/brand_img4_light.svg"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont2_body_img"
                    />
                    <img
                      src="/img/brand_images/brand_img3.svg"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont2_body_img"
                    />
                    <img
                      src="/img/brand_images/brand_img2.svg"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont2_body_img"
                    />
                    <img
                      src="/img/brand_images/brand_img1.svg"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont2_body_img"
                    />
                    <img
                      src="/img/brand_images/brand_img5.svg"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont2_body_img"
                    />
                    <img
                      src="/img/brand_images/brand_img6.svg"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont2_body_img"
                    />
                  </div>
                </div>
              </div>
              {/* ==========-----------========== */}
              {/* ==========-----------========== */}
              {/* ==========-----------========== */}
              {/* ==========-----------========== */}
              <div className="dashboardMarketPlaceBody2">
                {products.length <= 0 ? null : (
                  <div className="dashboardMarketPlaceBody2_div1">
                    <div className="dashboardMarketPlaceBody2_div1_head">
                      Recent Products
                    </div>
                    <div className="dashboardMarketPlaceBody2_div1_body">
                      <Carousel
                        responsive={responsive1}
                        showDots={false}
                        //   infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={10000}
                        pauseOnHover={true}
                        infinite={false}
                        draggable={true}
                        swipeable={true}
                        className="product_carousel"
                      >
                        {products.slice(0, 6).map((data) => (
                          <ProductModel
                            key={data.product_id}
                            amount={data.final_amount}
                            id={data.product_id}
                            img={data.product_images}
                            title={data.product_name}
                            txnHash={data.transaction_hash}
                            numberWithCommas={numberWithCommas}
                            prodState={data.product_state}
                            productType={data.productType}
                            seller={data.user_wallet}
                            productQuantity={data.quantity}
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}

                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {products2.length <= 0 ? null : (
                  <div className="dashboardMarketPlaceBody2_div1">
                    <div className="dashboardMarketPlaceBody2_div1_head">
                      Phones & Tablets
                      <a href={`/app/market/product/category/Phones & Tablets`}>
                        <span className="dashboardMarketPlaceBody2_div1_head_span">
                          View Category
                        </span>
                      </a>
                    </div>
                    <div className="dashboardMarketPlaceBody2_div1_body">
                      <Carousel
                        responsive={responsive1}
                        showDots={false}
                        //   infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={10000}
                        pauseOnHover={true}
                        infinite={false}
                        draggable={true}
                        swipeable={true}
                        className="product_carousel"
                      >
                        {products2.slice(0, 6).map((data) => (
                          <ProductModel
                            key={data.product_id}
                            amount={data.final_amount}
                            id={data.product_id}
                            img={data.product_images}
                            title={data.product_name}
                            txnHash={data.transaction_hash}
                            numberWithCommas={numberWithCommas}
                            prodState={data.product_state}
                            productType={data.productType}
                            seller={data.user_wallet}
                            productQuantity={data.quantity}
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {products3.length <= 0 ? null : (
                  <div className="dashboardMarketPlaceBody2_div1">
                    <div className="dashboardMarketPlaceBody2_div1_head">
                      Computers
                      <a href={`/app/market/product/category/Computers`}>
                        <span className="dashboardMarketPlaceBody2_div1_head_span">
                          View Category
                        </span>
                      </a>
                    </div>
                    <div className="dashboardMarketPlaceBody2_div1_body">
                      <Carousel
                        responsive={responsive1}
                        showDots={false}
                        //   infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={10000}
                        pauseOnHover={true}
                        infinite={false}
                        draggable={true}
                        swipeable={true}
                        className="product_carousel"
                      >
                        {products3.slice(0, 6).map((data) => (
                          <ProductModel
                            key={data.product_id}
                            amount={data.final_amount}
                            id={data.product_id}
                            img={data.product_images}
                            title={data.product_name}
                            txnHash={data.transaction_hash}
                            numberWithCommas={numberWithCommas}
                            prodState={data.product_state}
                            productType={data.productType}
                            seller={data.user_wallet}
                            productQuantity={data.quantity}
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {products4.length <= 0 ? null : (
                  <div className="dashboardMarketPlaceBody2_div1">
                    <div className="dashboardMarketPlaceBody2_div1_head">
                      Electronics
                      <a href={`/app/market/product/category/Electronics`}>
                        <span className="dashboardMarketPlaceBody2_div1_head_span">
                          View Category
                        </span>
                      </a>
                    </div>
                    <div className="dashboardMarketPlaceBody2_div1_body">
                      <Carousel
                        responsive={responsive1}
                        showDots={false}
                        //   infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={10000}
                        pauseOnHover={true}
                        infinite={false}
                        draggable={true}
                        swipeable={true}
                        className="product_carousel"
                      >
                        {products4.slice(0, 6).map((data) => (
                          <ProductModel
                            key={data.product_id}
                            amount={data.final_amount}
                            id={data.product_id}
                            img={data.product_images}
                            title={data.product_name}
                            txnHash={data.transaction_hash}
                            numberWithCommas={numberWithCommas}
                            prodState={data.product_state}
                            productType={data.productType}
                            seller={data.user_wallet}
                            productQuantity={data.quantity}
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {products5.length <= 0 ? null : (
                  <div className="dashboardMarketPlaceBody2_div1">
                    <div className="dashboardMarketPlaceBody2_div1_head">
                      Machineries
                      <a href={`/app/market/product/category/Electronics`}>
                        <span className="dashboardMarketPlaceBody2_div1_head_span">
                          View Category
                        </span>
                      </a>
                    </div>
                    <div className="dashboardMarketPlaceBody2_div1_body">
                      <Carousel
                        responsive={responsive1}
                        showDots={false}
                        //   infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={10000}
                        pauseOnHover={true}
                        infinite={false}
                        draggable={true}
                        swipeable={true}
                        className="product_carousel"
                      >
                        {products5.slice(0, 6).map((data) => (
                          <ProductModel
                            key={data.product_id}
                            amount={data.final_amount}
                            id={data.product_id}
                            img={data.product_images}
                            title={data.product_name}
                            txnHash={data.transaction_hash}
                            numberWithCommas={numberWithCommas}
                            prodState={data.product_state}
                            productType={data.productType}
                            seller={data.user_wallet}
                            productQuantity={data.quantity}
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
              </div>
              {/* ==========-----------========== */}
              {/* ==========-----------========== */}
              {/* ==========-----------========== */}
              {/* ==========-----------========== */}
              <div className="dashboardMarketPlaceBody3">
                <div className="dashboardMarketPlaceBody3_cont1">
                  <img
                    src="/img/dummyMarketImages/bottom_banner1.png"
                    alt=""
                    className="dashboardMarketPlaceBody3_cont1_img"
                  />
                </div>

                <div className="dashboardMarketPlaceBody3_cont1">
                  <img
                    src="/img/dummyMarketImages/bottom_banner1.png"
                    alt=""
                    className="dashboardMarketPlaceBody3_cont1_img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardMarketHome;
