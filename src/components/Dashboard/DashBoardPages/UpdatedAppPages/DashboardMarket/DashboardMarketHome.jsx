import React, { useEffect, useState } from "react";
import "../UpdatedAppPagesStyles/dashboardMarketHome.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Carousel from "react-multi-carousel";
import { numberWithCommas } from "../../../../static/static";
import { GET_ALL_UPLOADED_PRODUCTS } from "../../../../../services/productServices";
import ProductModel from "./ProductModel";
export const MarketHeader = () => {
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
          <div className="dashboardMarketPlaceHeader_div2_categories">
            <div className="dashboardMarketPlaceHeader_div2_categories_cont1">
              Mobile Phones
            </div>
            <div className="dashboardMarketPlaceHeader_div2_categories_cont1">
              Computers
            </div>
            <div className="dashboardMarketPlaceHeader_div2_categories_cont1">
              TVs & Audio
            </div>
            <div className="dashboardMarketPlaceHeader_div2_categories_cont1">
              Home Appliances
            </div>
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
      breakpoint: { max: 600, min: 0 },
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
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      txnHash:
        "0x7e0801a3b653d57e065dbacc13ede59ed01163e1d3582dbf07902da8eb3dc718",
    },
  ];

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
                      src="/img/dummyMarketImages/2023_Family_KV_Horizontal_notxt_vF-1.webp"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    />
                    <img
                      src="/img/dummyMarketImages/marketHeroBanner1.webp"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    />
                    <img
                      src="/img/dummyMarketImages/marketHeroBanner2.webp"
                      alt=""
                      className="dashboardMarketPlaceBody1_cont1_img"
                    />
                    <img
                      src="/img/dummyMarketImages/marketHeroBanner3.webp"
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
                        />
                      ))}
                    </Carousel>
                  </div>
                </div>
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                <div className="dashboardMarketPlaceBody2_div1">
                  <div className="dashboardMarketPlaceBody2_div1_head">
                    Phones & Tablets
                    <span className="dashboardMarketPlaceBody2_div1_head_span">
                      View Category
                    </span>
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
                      {Product.slice(0.8).map((data) => (
                        <div
                          className="dashboardMarketPlaceBody2_div1_body_card"
                          key={data.id}
                        >
                          <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
                            <img
                              src={data.img}
                              alt=""
                              className="dashboardMarketPlaceBody2_div1_body_card_img"
                            />
                          </div>
                          <div className="dashboardMarketPlaceBody2_div1_body_card_body">
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
                              {data.title}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
                              {/* {data.amount} eUSD */}
                              {numberWithCommas(
                                parseFloat(data.amount).toFixed(2)
                              )}{" "}
                              eUSD
                              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount_span">
                                {" "}
                                ~ (₦{data.amount * 750})
                              </span>{" "}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
                              {`${data.txnHash.slice(
                                0,
                                6
                              )}...${data.txnHash.slice(63, 66)}`}
                              <OpenInNewIcon className="tx_hash_link_icon" />
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
                              <a
                                href={`/app/market/product/details/${data.txnHash}/${data.title}`}
                              >
                                {" "}
                                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                                  Purchase
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                <div className="dashboardMarketPlaceBody2_div1">
                  <div className="dashboardMarketPlaceBody2_div1_head">
                    Computers
                    <span className="dashboardMarketPlaceBody2_div1_head_span">
                      View Category
                    </span>
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
                      {Product.slice(0.8).map((data) => (
                        <div
                          className="dashboardMarketPlaceBody2_div1_body_card"
                          key={data.id}
                        >
                          <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
                            <img
                              src={data.img}
                              alt=""
                              className="dashboardMarketPlaceBody2_div1_body_card_img"
                            />
                          </div>
                          <div className="dashboardMarketPlaceBody2_div1_body_card_body">
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
                              {data.title}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
                              {data.amount} eUSD
                              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount_span">
                                {" "}
                                ~ (₦{data.amount * 750})
                              </span>{" "}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
                              {`${data.txnHash.slice(
                                0,
                                6
                              )}...${data.txnHash.slice(63, 66)}`}
                              <OpenInNewIcon className="tx_hash_link_icon" />
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
                              <a
                                href={`/app/market/product/details/${data.txnHash}/${data.title}`}
                              >
                                {" "}
                                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                                  Purchase
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                <div className="dashboardMarketPlaceBody2_div1">
                  <div className="dashboardMarketPlaceBody2_div1_head">
                    TVs & Audio{" "}
                    <span className="dashboardMarketPlaceBody2_div1_head_span">
                      View Category
                    </span>
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
                      {Product.slice(0.8).map((data) => (
                        <div
                          className="dashboardMarketPlaceBody2_div1_body_card"
                          key={data.id}
                        >
                          <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
                            <img
                              src={data.img}
                              alt=""
                              className="dashboardMarketPlaceBody2_div1_body_card_img"
                            />
                          </div>
                          <div className="dashboardMarketPlaceBody2_div1_body_card_body">
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
                              {data.title}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
                              {data.amount} eUSD
                              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount_span">
                                {" "}
                                ~ (₦{data.amount * 750})
                              </span>{" "}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
                              {`${data.txnHash.slice(
                                0,
                                6
                              )}...${data.txnHash.slice(63, 66)}`}
                              <OpenInNewIcon className="tx_hash_link_icon" />
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
                              <a
                                href={`/app/market/product/details/${data.txnHash}/${data.title}`}
                              >
                                {" "}
                                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                                  Purchase
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                {/* =============================== */}
                <div className="dashboardMarketPlaceBody2_div1">
                  <div className="dashboardMarketPlaceBody2_div1_head">
                    Home Appliances
                    <span className="dashboardMarketPlaceBody2_div1_head_span">
                      View Category
                    </span>
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
                      {Product.slice(0.8).map((data) => (
                        <div
                          className="dashboardMarketPlaceBody2_div1_body_card"
                          key={data.id}
                        >
                          <div className="dashboardMarketPlaceBody2_div1_body_card_img_div">
                            <img
                              src={data.img}
                              alt=""
                              className="dashboardMarketPlaceBody2_div1_body_card_img"
                            />
                          </div>
                          <div className="dashboardMarketPlaceBody2_div1_body_card_body">
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_title">
                              {data.title}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount">
                              {data.amount} eUSD
                              <span className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_amount_span">
                                {" "}
                                ~ (₦{data.amount * 750})
                              </span>{" "}
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_txHash">
                              {`${data.txnHash.slice(
                                0,
                                6
                              )}...${data.txnHash.slice(63, 66)}`}
                              <OpenInNewIcon className="tx_hash_link_icon" />
                            </div>
                            <div className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn_div">
                              <a
                                href={`/app/market/product/details/${data.txnHash}/${data.title}`}
                              >
                                {" "}
                                <button className="dashboardMarketPlaceBody2_div1_body_card_body_cont1_btn">
                                  Purchase
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
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
