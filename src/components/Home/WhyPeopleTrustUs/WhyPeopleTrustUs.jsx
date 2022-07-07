import React from "react";
import "./WPTU.css";
const WhyPeopleTrustUs = () => {
  const Steps = [
    {
      stepImg: "/img/icon-tick.svg",
      stepTitle:
        "Banks don't accept assets like electrical appliances as collateral to access loans",
      // stepTxt: "Instant payment after evaluation of device.",
    },
    {
      stepImg: "/img/icon-tick.svg",

      stepTitle:
        "Difficulty to sell real world assets like cars, electronics e.t.c",
      // stepTxt: "We buy devices instantly at awesome prices.",
    },
    {
      stepImg: "/img/icon-tick.svg",

      stepTitle:
        "Banks use humulating measures to recover uncollateralized loans.",
      // stepTxt:
      //   "Book appointments at the nearest Ella branch within your locality.",
    },
    {
      stepImg: "/img/icon-tick.svg",

      stepTitle:
        "Egoras bridges assets like cars, household electronics to block-chain.",
      // stepTxt:
      //   "Our advanced AI tech will make the perfect value for your devices.",
    },
    {
      stepImg: "/img/icon-tick.svg",

      stepTitle:
        "Egoras enables anyone to get loans with any real world assets without banks or other intermediaries.",
      // stepTxt:
      //   "Our advanced AI tech will make the perfect value for your devices.",
    },
    {
      stepImg: "/img/icon-tick.svg",

      stepTitle:
        "Egoras enables anyone to sell any kind of asset easily in minutes..",
      // stepTxt:
      //   "Our advanced AI tech will make the perfect value for your devices.",
    },
  ];
  return (
    <div className="WPTU_div">
      <div className="container">
        <div className="WPTU_Area1_body">
          <div className="WPTU_Area">
            <div className="WPTU_Area1">
              <div className="WPTU_Area1_head">Why Egoras?</div>
              <div className="WPTU_Area1_Body_steps">
                {Steps.map((data) => (
                  <div className="WPTU_Area1_Body_step1_cont">
                    <img
                      src={data.stepImg}
                      className="WPTU_Area1_Body_step1_cont_icon"
                    />
                    <div className="WPTU_Area1_Body_step1_cont_txt_div">
                      <div className="WPTU_Area1_Body_step1_cont_txt_div_title">
                        {data.stepTitle}
                      </div>
                      <div className="WPTU_Area1_Body_step1_cont_txt_div_para">
                        {data.stepTxt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="WPTU_Area2">
              <img src="/img/why_us_grid.png" alt="" className="WPTU_img1" />
              <img src="/img/why_us_img2.png" alt="" className="WPTU_img2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyPeopleTrustUs;
