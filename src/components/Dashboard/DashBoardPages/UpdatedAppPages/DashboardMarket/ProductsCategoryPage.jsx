import React, { useEffect, useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { numberWithCommas } from "../../../../../static";
import { ProductModel2 } from "./ProductModel";
import "./DashboardMarketStyles/ProductCategoryPage.css";
const ProductsCategoryPage = () => {
  const [toggleList, setToggleList] = useState("grid");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const ToggleProductList = (e) => {
    let activeIcon = e.currentTarget.id;
    setToggleList(activeIcon);
  };
  const Product = [
    {
      id: "1",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
      brand: "Apple",
    },
    {
      id: "2",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Samsung",
    },
    {
      id: "3",
      img: "/img/dummyMarketImages/xiaomi_dummy_phone.webp",
      title: "Xiaomi 12 Pro 5G - 6.73",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Xiaomi",
    },
    {
      id: "4",
      img: "/img/dummyMarketImages/tecno_dummy_phone.jpeg",
      title: "Tecno Phantom V Fold",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Tecno",
    },
    {
      id: "5",
      img: "/img/dummyMarketImages/infinix_dummy_phone.webp",
      title: "Infinix Zero X Pro - 6.67",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Infinix",
    },
    {
      id: "6",
      img: "/img/dummyMarketImages/dummy_huwei.jpeg",
      title: "Huawei P50 Pro 8GB RAM 256GB ROM",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Huawei",
    },
    {
      id: "7",
      img: "/img/dummyMarketImages/oraimo_headset.jpeg",
      title: "Oraimo Headphone OEB-H65D",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Oraimo",
    },
    {
      id: "8",
      img: "/img/dummyMarketImages/PhoneDummyImage.png",
      title: "Apple Iphone 13pro max",
      amount: 1200,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      prodState: "New",
      brand: "Apple",
    },
    {
      id: "9",
      img: "/img/dummyMarketImages/PhoneDummyImage2.png",
      title: "Samsung galaxy s22",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Samsung",
    },
    {
      id: "10",
      img: "/img/dummyMarketImages/xiaomi_dummy_phone.webp",
      title: "Xiaomi 12 Pro 5G - 6.73",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Xiaomi",
    },
    {
      id: "11",
      img: "/img/dummyMarketImages/tecno_dummy_phone.jpeg",
      title: "Tecno Phantom V Fold",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Tecno",
    },
    {
      id: "12",
      img: "/img/dummyMarketImages/infinix_dummy_phone.webp",
      title: "Infinix Zero X Pro - 6.67",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Infinix",
    },
    {
      id: "13",
      img: "/img/dummyMarketImages/dummy_huwei.jpeg",
      title: "Huawei P50 Pro 8GB RAM 256GB ROM",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Huawei",
    },
    {
      id: "14",
      img: "/img/dummyMarketImages/oraimo_headset.jpeg",
      title: "Oraimo Headphone OEB-H65D",
      amount: 800,
      seller: "MartGpt",
      prodState: "Refurb",
      brand: "Oraimo",
    },
  ];
  const brands = [
    { id: 1, brand: "Samsung", items: "2,729" },
    { id: 2, brand: "Apple", items: "2,158" },
    { id: 3, brand: "Oraimo", items: "1,461" },
    { id: 4, brand: "Otter Box", items: "737" },
    { id: 5, brand: "Xiaomi", items: "672" },
    { id: 6, brand: "Baseus", items: "670" },
    { id: 7, brand: "Tecno", items: "625" },
    { id: 8, brand: "Baofeng", items: "576" },
    { id: 9, brand: "Xundd", items: "572" },
    { id: 10, brand: "Huawei", items: "570" },
    { id: 11, brand: "A&S", items: "522" },
    { id: 12, brand: "Budi", items: "479" },
    { id: 13, brand: "SanDisk", items: "476" },
    { id: 14, brand: "Infinix", items: "458" },
    { id: 15, brand: "New Age", items: "432" },
    { id: 16, brand: "Nillkin", items: "385" },
    { id: 17, brand: "Nokia", items: "376" },
    { id: 18, brand: "Itel", items: "355" },
    { id: 19, brand: "ScreenGuard", items: "344" },
    { id: 20, brand: "Zealot", items: "309" },
  ];
  const handleBrandCheckboxChange = (event) => {
    const brand = event.target.value;
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(
          (selectedBrand) => selectedBrand !== brand
        );
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const filteredProducts =
    selectedBrands.length > 0
      ? Product.filter((product) => selectedBrands.includes(product.brand))
      : Product;
  return (
    <div className="other2 asset_other2">
      <div className="productCategoryPageDiv">
        <div className="productCategoryPageDiv_cont1">
          <div className="container-fluid">
            <img
              src="/img/categoryDisplayDummyImg/PhonesDummyBanner.jpeg"
              alt=""
              className="productCategoryPageDiv_cont1_img"
            />
          </div>
        </div>
        <div className=" productCategoryPageDiv_cont2">
          <div className="productCategoryPageDiv_cont2 no-bg">
            <div className="container">
              <div className="productCategoryPageDiv_cont2_div">
                <div className="productCategoryPageDiv_cont2_div_cont1">
                  <div className="productCategoryPageDiv_cont2_div_cont1_body_1">
                    <div className="productCategoryPageDiv_cont2_div_cont1_body_1_title">
                      Brand
                    </div>
                    <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body">
                      <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_search">
                        <input
                          type="search"
                          placeholder="Search Brand..."
                          className="brandSearchInput"
                        />
                      </div>
                      <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_display">
                        {brands.map((data) => (
                          <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_cont1">
                            <div className="checkBox_agree_div_bodyb ">
                              <input
                                type="checkbox"
                                id={data.brand}
                                name={data.brand}
                                value={data.brand}
                                checked={selectedBrands.includes(data.brand)}
                                onChange={handleBrandCheckboxChange}
                              />
                              <label
                                htmlFor={data.brand}
                                className="checkBox_agree_div_body_label"
                              >
                                <span className="checkBox_agree_div_body_label_span">
                                  {data.brand}
                                </span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="productCategoryPageDiv_cont2_div_cont1_body_1">
                    <div className="productCategoryPageDiv_cont2_div_cont1_body_1_title">
                      Sold By
                    </div>
                    <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body">
                      <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_cont1">
                        <div className="checkBox_agree_div_bodyb ">
                          <input
                            type="checkbox"
                            id="1"
                            name="checkbox"
                            // checked={checkAgree}
                            // onChange={toggleCheckAgree}
                          />
                          <label
                            for="1"
                            className="checkBox_agree_div_body_label"
                          >
                            <span className="checkBox_agree_div_body_label_span">
                              Sold By MartGpt
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="productCategoryPageDiv_cont2_div_cont2">
                  <div className="productCategoryPageDiv_cont2_div_cont2_head">
                    <div className="productCategoryPageDiv_cont2_div_cont2_div1">
                      <div className="productCategoryPageDiv_cont2_div_cont2_div1_title">
                        Phones & Tablets
                      </div>
                      <div className="productCategoryPageDiv_cont2_div_cont2_div1_toggle">
                        <WidgetsIcon
                          id="grid"
                          className={
                            toggleList === "grid"
                              ? "widget_icon_active"
                              : "widget_icon"
                          }
                          onClick={ToggleProductList}
                        />
                        <ViewListIcon
                          id="list"
                          className={
                            toggleList === "list"
                              ? "widget_icon_active"
                              : "widget_icon"
                          }
                          onClick={ToggleProductList}
                        />
                      </div>
                    </div>
                    <div className="productCategoryPageDiv_cont2_div_cont2_div2">
                      {filteredProducts.length} results
                    </div>
                  </div>
                  <div className="productCategoryPageDiv_cont2_div_cont2_div3">
                    {filteredProducts.map((data) => (
                      <ProductModel2
                        key={data.id}
                        amount={data.amount}
                        id={data.id}
                        img={data.img}
                        title={data.title}
                        txnHash={data.seller}
                        numberWithCommas={numberWithCommas}
                        prodState={data.prodState}
                        productType="DIRECT"
                        seller={data.seller}
                        productQuantity={20}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
