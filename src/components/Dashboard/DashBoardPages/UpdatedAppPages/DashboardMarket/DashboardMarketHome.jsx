import React, { useEffect, useState, useRef } from "react";
import "../UpdatedAppPagesStyles/dashboardMarketHome.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Mousewheel,
  Pagination,
  Keyboard,
  Navigation,
} from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
// import "swiper/css/effect-fade";

const DashboardMarketHome = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProduct2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [products4, setProducts4] = useState([]);
  const [products5, setProducts5] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef(null);
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

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex);
    console.log(swiper.activeIndex);
  };
  const handleNavButtonClick = (index) => {
    setActiveSlideIndex(index);
    swiperRef.current.slideTo(index);
  };
  return (
    // <div className="other2 asset_other2">
    <section className="marketHomeUpdateSection">
      <div
        className="marketHomeUpdateSection_area"
        style={{ backgroundImage: "url(/img/market_update_img1_bg.png)" }}
      >
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          keyboard={true}
          speed={900}
          updateOnWindowResize={true}
          modules={[EffectFade, Mousewheel, Keyboard, Navigation, Pagination]}
          className="PowerSwiper"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide
            className="marketHomeUpdateSection_area1 "
            id="egr-3000A"
          >
            <img
              src="/img/egr_gen_market_img1.png"
              alt=""
              className="marketHomeUpdateSection_area1_img"
            />
            <div className="marketHomeUpdateSection_area1_details">
              <div className="marketHomeUpdateSection_area1_details_1">
                EGR-3000 (Auto)
              </div>
              <div className="marketHomeUpdateSection_area1_details_2">
                <div className="marketHomeUpdateSection_area1_details_2_area1">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    Automatic
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Type
                  </div>
                </div>
                <div className="marketHomeUpdateSection_area1_details_2_area1">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    3.0kva
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Rating
                  </div>
                </div>
                <div className="marketHomeUpdateSection_area1_details_2_area1_last">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    Petrol & Gas
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Fuel
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="marketHomeUpdateSection_area1 "
            id="egr-3000M"
          >
            <img
              src="/img/egr_gen_market_img2.png"
              alt=""
              className="marketHomeUpdateSection_area1_img2"
            />
            <div className="marketHomeUpdateSection_area1_details">
              <div className="marketHomeUpdateSection_area1_details_1">
                EGR-3000 (Manual)
              </div>
              <div className="marketHomeUpdateSection_area1_details_2">
                <div className="marketHomeUpdateSection_area1_details_2_area1">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    Manual
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Type
                  </div>
                </div>
                <div className="marketHomeUpdateSection_area1_details_2_area1">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    3.0kva
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Rating
                  </div>
                </div>
                <div className="marketHomeUpdateSection_area1_details_2_area1_last">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    Petrol & Gas
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Fuel
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="marketHomeUpdateSection_area1 "
            id="egr-8000A"
          >
            <img
              src="/img/egr_gen_market_img1.png"
              alt=""
              className="marketHomeUpdateSection_area1_img"
            />
            <div className="marketHomeUpdateSection_area1_details">
              <div className="marketHomeUpdateSection_area1_details_1">
                EGR-8000 (Auto)
              </div>
              <div className="marketHomeUpdateSection_area1_details_2">
                <div className="marketHomeUpdateSection_area1_details_2_area1">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    8.5kva
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Horse Power
                  </div>
                </div>
                <div className="marketHomeUpdateSection_area1_details_2_area1">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    13.5kva
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Horse Power
                  </div>
                </div>
                <div className="marketHomeUpdateSection_area1_details_2_area1_last">
                  <div className="marketHomeUpdateSection_area1_details_2_area1_title">
                    35.5kva
                  </div>
                  <div className="marketHomeUpdateSection_area1_details_2_area1_para">
                    Horse Power
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="marketHomeUpdateSection_area1_details2">
          <div className="marketHomeUpdateSection_area1_details2_area1">
            <div className="marketHomeUpdateSection_area1_details2_area1_cont1">
              <div
                className={
                  activeSlideIndex == 0
                    ? "marketHomeUpdateSection_area1_details2_area1_cont1_area1_active"
                    : "marketHomeUpdateSection_area1_details2_area1_cont1_area1"
                }
                onClick={() => handleNavButtonClick(0)}
              >
                EGR-3000(A)
              </div>
              <div
                className={
                  activeSlideIndex == 1
                    ? "marketHomeUpdateSection_area1_details2_area1_cont1_area1_active"
                    : "marketHomeUpdateSection_area1_details2_area1_cont1_area1"
                }
                onClick={() => handleNavButtonClick(1)}
              >
                EGR-3000(M)
              </div>
              <div
                className={
                  activeSlideIndex == 2
                    ? "marketHomeUpdateSection_area1_details2_area1_cont1_area1_active"
                    : "marketHomeUpdateSection_area1_details2_area1_cont1_area1"
                }
                onClick={() => handleNavButtonClick(2)}
              >
                EGR-8000(A)
              </div>
            </div>
            <div className="marketHomeUpdateSection_area1_details2_area1_cont2">
              <div
                className={
                  activeSlideIndex == 0
                    ? "marketHomeUpdateSection_area1_details2_area1_cont2_area1_active"
                    : "marketHomeUpdateSection_area1_details2_area1_cont2_area1"
                }
              ></div>
              <div
                className={
                  activeSlideIndex == 1
                    ? "marketHomeUpdateSection_area1_details2_area1_cont2_area1_active"
                    : "marketHomeUpdateSection_area1_details2_area1_cont2_area1"
                }
              ></div>
              <div
                className={
                  activeSlideIndex == 2
                    ? "marketHomeUpdateSection_area1_details2_area1_cont2_area1_active"
                    : "marketHomeUpdateSection_area1_details2_area1_cont2_area1"
                }
              ></div>
            </div>
          </div>
          <div className="marketHomeUpdateSection_area1_details2_area2">
            <a
              href={
                activeSlideIndex == 0
                  ? "/app/market/product/details/c930ccb9-cc44-48fd-86fe-543980bf6ccf/Egoras%20Dual%20Fuel%20Generator%20EGR-3000e2%20(Automatic)"
                  : activeSlideIndex == 1
                  ? "/app/market/product/details/07ab8443-a5a3-4931-94ee-f4ed6ea66bf9/Egoras%20Dual%20Fuel%20Generator%20EGR-3000%20(Manual)"
                  : activeSlideIndex == 2
                  ? "/app/market/product/details/f3ecf5db-378d-4c72-b315-2bd340eca088/Egoras%208kva%20sound%20proof%20Dual%20Fuel%20Generator"
                  : "#"
              }
              className="marketHomeUpdateSection_area1_details2_area2_link"
            >
              <ShoppingCartIcon className="marketHomeUpdateSection_area1_details2_area2_link_icon" />{" "}
              Purchase
            </a>
          </div>
        </div>
      </div>
    </section>
    // </div>
  );
};

export default DashboardMarketHome;
