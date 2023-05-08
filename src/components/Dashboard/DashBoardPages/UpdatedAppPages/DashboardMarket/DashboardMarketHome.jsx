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
import { GET_ALL_UPLOADED_PRODUCTS } from "../../../../../services/productServices";
import ProductModel from "./ProductModel";
export const MarketHeader = () => {
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + "/product/all-categories",
        null,
        config
      );
      console.log(response);
      console.log(response.data.data.allCategories);
      setCategories(response.data.data.allCategories);
    } catch (error) {
      console.log(error.response);
    }
  }, []);
  return (
    <div className="dashboardMarketPlaceHeader no-bg">
      <div className="container">
        <div className="dashboardMarketPlaceHeader_area">
          <div className="dashboardMarketPlaceHeader_div1">
            <input
              type="search"
              placeholder="Search products"
              name=""
              id=""
              className="dashboardMarketPlaceHeader_div1_search_input"
            />
            <SearchOutlinedIcon className="dashboardMarketPlaceHeader_div1_search_input_icon" />
          </div>
          <AppsIcon className="dashboardMarketPlaceHeader_div2_categories_icon" />
          <div className="dashboardMarketPlaceHeader_div2_categories">
            {categories.map((data) => (
              <div className="dashboardMarketPlaceHeader_div2_categories_cont1">
                {data.product_category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const DashboardMarketHome = () => {
  const [products, setProducts] = useState([]);

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
  const Product = [
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
    },
  ];
  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + "/product/new/Phones & Tablets",
        null,
        config
      );
      console.log(response);
      // console.log(response.getAllUploadedProduct);
    } catch (error) {
      console.log(error.response);
    }
  }, []);
  console.log(Product);
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
                        {products.map((data) => (
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
