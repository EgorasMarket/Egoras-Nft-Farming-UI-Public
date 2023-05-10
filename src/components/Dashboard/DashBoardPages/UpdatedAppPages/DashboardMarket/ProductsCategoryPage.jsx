import React, { useEffect, useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { API_URL } from "../../../../../actions/types";
import axios from "axios";
import { config } from "../../../../../actions/Config";
import { numberWithCommas } from "../../../../../static";
import Paginate from "../../Paginate";
import ProductModel from "./ProductModel";
import "./DashboardMarketStyles/ProductCategoryPage.css";
const ProductsCategoryPage = ({ match }) => {
  const [toggleList, setToggleList] = useState("grid");
  const [allBrands, setAllBrands] = useState([]);
  const [Product, setProduct] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showMartGptProducts, setShowMartGptProducts] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const { category } = match.params;
  console.log(category);
  const ToggleProductList = (e) => {
    let activeIcon = e.currentTarget.id;
    setToggleList(activeIcon);
  };

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
  const handleMartGptCheckboxChange = (event) => {
    setShowMartGptProducts(event.target.checked);
  };
  const handleSort = (event) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  let filteredProducts = Product;

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.includes(product.product_brand)
    );
  }

  if (showMartGptProducts) {
    filteredProducts = filteredProducts.filter(
      (product) => product.productType === "INDIRECT"
    );
  }
  // if (sortByAmount === "highToLow") {
  //   filteredProducts = filteredProducts.sort(
  //     (a, b) => b.final_amount - a.final_amount
  //   );
  // } else if (sortByAmount === "lowToHigh") {
  //   filteredProducts = filteredProducts.sort(
  //     (a, b) => a.final_amount - b.final_amount
  //   );
  // }
  if (sortOrder === "asc") {
    filteredProducts = filteredProducts.sort(
      (a, b) => a.final_amount - b.final_amount
    );
  } else if (sortOrder === "desc") {
    filteredProducts = filteredProducts.sort(
      (a, b) => b.final_amount - a.final_amount
    );
  }
  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + `/product/product-by-category/${category}`,
        null,
        config
      );
      console.log(response);
      console.log(response.data.data);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);
  useEffect(async () => {
    try {
      const response = await axios.get(
        API_URL + `/product/all-brands-by-category/${category}`,
        null,
        config
      );
      console.log(response);
      console.log(response.data.data.allBrands);
      setAllBrands(response.data.data.allBrands);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 15;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);
  const currentTransactions = filteredProducts.slice(offset, offset + PER_PAGE);

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
          <div className="productCategoryPageDiv_cont2 no-bg no_paddd">
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
                        {allBrands.map((data) => (
                          <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_cont1">
                            <div className="checkBox_agree_div_bodyb ">
                              <input
                                type="checkbox"
                                id={data.product_brand}
                                name={data.product_brand}
                                value={data.product_brand}
                                checked={selectedBrands.includes(
                                  data.product_brand
                                )}
                                onChange={handleBrandCheckboxChange}
                              />
                              <label
                                htmlFor={data.product_brand}
                                className="checkBox_agree_div_body_label"
                              >
                                <span className="checkBox_agree_div_body_label_span">
                                  {data.product_brand}
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
                      Sort By Price
                    </div>
                    <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body">
                      <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_display">
                        <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_cont1">
                          <div className="checkBox_agree_div_bodyb radio-button">
                            <input
                              type="radio"
                              id="asc"
                              name="radio-group"
                              value="asc"
                              onChange={handleSort}
                            />
                            <label for="asc"> Low to High</label>
                          </div>
                        </div>
                      </div>
                      <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_display">
                        <div className="productCategoryPageDiv_cont2_div_cont1_body_1_body_brands_cont1">
                          <div className="checkBox_agree_div_bodyb radio-button">
                            <input
                              type="radio"
                              id="desc"
                              name="radio-group"
                              value="desc"
                              onChange={handleSort}
                            />
                            <label for="desc"> High to Low</label>
                          </div>
                        </div>
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
                            id="martGpt"
                            name="checkbox"
                            checked={showMartGptProducts}
                            onChange={handleMartGptCheckboxChange}
                          />
                          <label
                            for="martGpt"
                            className="checkBox_agree_div_body_label"
                          >
                            <span className="checkBox_agree_div_body_label_span">
                              MartGpt
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
                        {category}
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
                    {currentTransactions.map((data) => (
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
                  </div>
                  <div className="productCategoryPageDiv_cont2_div_cont2_div3_paginate">
                    <Paginate
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
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
