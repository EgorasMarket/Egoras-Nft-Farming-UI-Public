import React from "react";
import LoadingIcons from "react-loading-icons";
import "./spalshScreen.css";
export const SplashScreen = () => {
  return (
    <div>
      <div className="hold_On_div">
        <div className="hold_On_div_div_txt">
          <LoadingIcons.Puff
            fill="#22ad62"
            stroke="#22ad62"
            height="100"
            width="100"
          />
          {/* Please hold on...{" "}
          <span className="hold_On_div_div_txt_para">
            We are getting things ready.
          </span> */}
        </div>
      </div>
    </div>
  );
};
