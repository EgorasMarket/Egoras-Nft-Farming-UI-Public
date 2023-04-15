import React from "react";
import "./DashboardMarketStyles/MarketCheckout.css";
const DashBoardMarketCheckoutPage = () => {
  const PurchaseProduct = async () => {
    // console.log(productDetail.productType, account, "PurchaseProduct");
    // let quantity = 1;
    // let transactionHash = "0x6ED527b0a92f117f4a4E05a6dF9313CDd4a6aB412";
    // let product_id = productDetail.product_id;
    // const res = await PROCESS_PRODUCT_PURCHASE({
    //   quantity,
    //   transactionHash,
    //   product_id,
    //   user: account,
    //   order_type: "DIRECT",
    // });
    // if (res.success) {
    //   alert("successful purchase");
    // }
    /// BUY WITH BLOCKCHAIN
    // if (productDetail.productType == "INDIRECT") {
    //   res = await BuyIndirectProduct(
    //     productDetail.index_id,
    //     quantity,
    //     library.getSigner()
    //   );
    // } else {
    //   res = await BuyDirectProduct(
    //     productDetail.index_id,
    //     quantity,
    //     library.getSigner()
    //   );
    // }
    // console.log(res);
    // if (res.status == true) {
    //   console.log("Success message");
    // } else {
    //   console.log("Error occured from Blockchain");
    // }
    // const response = await GET_UPLOADED_PRODUCT_BY_ID(address);
    // if (response.success) {
    //   setLoading(false);
    //   setProductDetail(response.data);
    //   const img = JSON.parse(response.data.product_images);
    //   for (const data of img) {
    //     const payload = {
    //       original: data,
    //       thumbnail: data,
    //     };
    //     image.push(payload);
    //   }
    //   console.log(image);
    // }
  };
  const numDivsToDuplicate = 6;
  const divToDuplicate = (
    <div className="checkoutPage_body2_area_body_cont1">
      <div className="checkoutPage_body2_area_body_cont1_image_div">
        <img
          src="/img/dummy_iphone_img.png"
          alt=""
          className="checkoutPage_body2_area_body_cont1_image"
        />
      </div>
      <div className="checkoutPage_body2_area_body_cont1_text">
        <div className="checkoutPage_body2_area_body_cont1_text_title">
          Iphone 13 pro max
        </div>
        <div className="checkoutPage_body2_area_body_cont1_text_para1">
          <div className="checkoutPage_body2_area_body_cont1_text_para1_title">
            Seller
          </div>
          <div className="checkoutPage_body2_area_body_cont1_text_para1_para">
            MartGp...
          </div>
        </div>
        <div className="checkoutPage_body2_area_body_cont1_text_para1">
          <div className="checkoutPage_body2_area_body_cont1_text_para1_title">
            Type
          </div>
          <div className="checkoutPage_body2_area_body_cont1_text_para1_para">
            Indirect
          </div>
        </div>
        <div className="checkoutPage_body2_area_body_cont1_text_amount">
          25eusd
        </div>
      </div>
    </div>
  );
  const duplicatedDivs = Array.from(
    { length: numDivsToDuplicate },
    (_, index) => <div key={index}>{divToDuplicate}</div>
  );

  return (
    <div className="other2 asset_other2">
      <section className="product_detail_section ">
        <div className="container">
          <div className="checkoutPage_header">Checkout</div>
          <div className="checkoutPage_body">
            <div className="checkoutPage_body1">
              <div className="checkoutPage_body1_cont1">
                <div className="checkoutPage_body1_cont1_head">
                  Billing Info
                </div>
                <div className="checkoutPage_body1_cont1_body">
                  <div className="checkoutPage_body1_cont1_body_body1">
                    <div className="checkoutPage_body1_cont1_body_cont1">
                      Personal Details
                    </div>
                    <div className="checkoutPage_body1_cont1_body_cont1_body">
                      <span className="checkoutPage_body1_cont1_body_cont1_body_span">
                        Name: John Doe{" "}
                      </span>
                      <span className="checkoutPage_body1_cont1_body_cont1_body_span">
                        Phone No: +234 816 402 0234
                      </span>
                    </div>
                  </div>
                  <div className="checkoutPage_body1_cont1_body_btn_div">
                    <button className="checkoutPage_body1_cont1_body_btn">
                      Update
                    </button>
                  </div>
                </div>
                <div className="checkoutPage_body1_cont1_body">
                  <div className="checkoutPage_body1_cont1_body_body1">
                    <div className="checkoutPage_body1_cont1_body_cont1">
                      Shipping Address
                    </div>
                    <div className="checkoutPage_body1_cont1_body_cont1_body">
                      <span>
                        8b lord emmanuel drive Rumomasi Port-Harcourt Rivers
                        State Nigeria
                      </span>
                    </div>
                  </div>
                  <div className="checkoutPage_body1_cont1_body_btn_div">
                    <button className="checkoutPage_body1_cont1_body_btn">
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="checkoutPage_body1_cont1">
                <div className="checkoutPage_body1_cont1">
                  <div className="checkoutPage_body1_cont1_head">
                    Choose Payment Method
                  </div>
                  <div className="payment_method_div">
                    <div className="payment_method_div_cont1">
                      <div className="payment_method_div_cont1_div1">
                        <input type="radio" id="radio-1" name="radio" />
                        <label
                          className="payment_method_area1_cont1_label"
                          for="radio-1"
                        ></label>
                      </div>
                      <div className="payment_method_div_cont1_div2">
                        {" "}
                        Pay Via Metamask
                      </div>
                    </div>
                    <div className="payment_method_div_cont1">
                      <div className="payment_method_div_cont1_div1">
                        <input type="radio" id="radio-2" name="radio" />
                        <label
                          className="payment_method_area1_cont1_label"
                          for="radio-2"
                        ></label>
                      </div>
                      <div className="payment_method_div_cont1_div2">
                        {" "}
                        Pay Via Fort
                      </div>
                    </div>
                  </div>
                  {/* ========== */}
                  {/* ========== */}
                  {/* ========== */}
                  {/* ========== */}
                  <div className="proceedToPayDiv">
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">Item(s)</div>
                      <div className="proceedToPayDiv1_value">4</div>
                    </div>
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">Sub Total</div>
                      <div className="proceedToPayDiv1_value">100eusd</div>
                    </div>
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">
                        Non Membership Fee
                      </div>
                      <div className="proceedToPayDiv1_value">0eusd</div>
                    </div>
                    <div className="proceedToPayDiv1">
                      <div className="proceedToPayDiv1_title">Total</div>
                      <div className="proceedToPayDiv1_value">100eusd</div>
                    </div>
                    <div className="proceedToPayDiv_btn_div">
                      <button className="proceedToPayDiv_btn">Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkoutPage_body2">
              <div className="checkoutPage_body2_area">
                <div className="checkoutPage_body2_area_title">
                  Your Order
                  <span className="checkoutPage_body2_area_title_span">
                    6 item(s)
                  </span>
                </div>
                <div className="checkoutPage_body2_area_body">
                  {duplicatedDivs}
                </div>
                <div className="checkoutPage_body2_area_total">
                  <div className="checkoutPage_body2_area_total_title">
                    Sub Total
                  </div>
                  <div className="checkoutPage_body2_area_total_amount">
                    100eusd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardMarketCheckoutPage;
