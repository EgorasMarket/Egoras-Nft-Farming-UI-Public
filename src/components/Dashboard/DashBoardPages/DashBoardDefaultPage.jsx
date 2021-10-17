import React, { useState, useEffect } from "react";
import InputOutlinedIcon from "@material-ui/icons/InputOutlined";
// import SiMastercard from
// import { SiMastercard, SiVisa } from "react-icons/si";
import "../../../css/dashBoarddefaultpage.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const DashBoardDefaultPage = () => {
  const [click, setClick] = useState();

  const changeOnclick = () => {};

  return (
    <div className="dashboard-home">
      <section className="homeProfile-section">
        <div className="container">
          <div className="dashboard-area1">
            <div className="dashboard-area1-cont1">
              {/* <img
                src="/img/game-bg.svg"
                alt=""
                className="dashboard-area1-cont1-img"
              /> */}

              <div className="dash-area1-cont1-header">
                <div className="dash-area1-cont1-header1">Online: 1003</div>
                <div className="dash-area1-cont1-header1">
                  <p className="balance"> Balance: 2,000 </p>

                  <img
                    src="/img/egoras-favicon.svg"
                    alt=""
                    className="egr-fav-icon-head"
                  />
                </div>
              </div>
              <div className="dash-area1-cont1-body-area1">
                <div className="dash-area1-cont1-body-area1a">
                  Max Bet: 55.6{" "}
                  <img
                    src="/img/egoras-favicon.svg"
                    alt=""
                    className="egr-fav-icon-head2"
                  />{" "}
                  | Max Profit: 55.6{" "}
                  <img
                    src="/img/egoras-favicon.svg"
                    alt=""
                    className="egr-fav-icon-head2"
                  />
                </div>
                <div className="dash-area1-cont1-body-area1b">
                  <button className="dash-area1-cont1-body-area1b-btna">
                    1.12x
                  </button>
                  <button className="dash-area1-cont1-body-area1b-btnb">
                    1.35x
                  </button>
                </div>
              </div>
              <div className="dash-area1-cont1-body-area2">
                <div className="dash-area1-cont1-body-area2a">2.45x</div>
              </div>
              <div className="dash-area1-cont1-body-area3">
                <div className="dash-area1-cont1-body-area3a">
                  <div className="bet">Bet:</div>
                  <input
                    type="number"
                    name=""
                    step="0.01"
                    id=""
                    defaultValue="0.003"
                    className="number-input"
                  />
                  <img
                    src="/img/egoras-favicon.svg"
                    alt=""
                    className="egr-fav-icon"
                  />
                </div>
                <div className="dash-area1-cont1-body-area3a">
                  <div className="bet">Pay Out:</div>
                  <input
                    type="number"
                    name="number"
                    step="0.01"
                    id=""
                    defaultValue="0.005"
                    className="number-input"
                  />
                  <img
                    src="/img/egoras-favicon.svg"
                    alt=""
                    className="egr-fav-icon"
                  />
                </div>
              </div>

              <div className="dash-area1-cont1-body-area4">
                <div className="switch-btn">
                  Auto:
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div className="stop-btn">
                  <button className="dash-area1-cont1-body-area4a-btn">
                    STOP
                  </button>
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* ===================== */}
            {/* dashboard second container start */}
            <div className="dashboard-area1-cont2">
              <div className="dash-area1-cont2-header">
                <div className="dash-area1-cont2-header1">Profits</div>
              </div>
              <div className="dash-area1-cont2-titles">
                <div className="title1">User</div>
                <div className="title2">Bet</div>
                <div className="title3">Profit</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Ekene</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
            </div>
            {/* dashboard second container end */}
          </div>
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          {/* ======================= */}
          <div className="dashboard-area2">
            {/* dashboard second container start */}
            <div className="dashboard-area1-cont3">
              <div className="dash-area1-cont2-header2">
                <div className="dash-area1-cont2-header1">Profits</div>
              </div>
              <div className="dash-area1-cont2-titles">
                <div className="title1">User</div>
                <div className="title2">Bet</div>
                <div className="title3">Profit</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Ekene</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
            </div>
            {/* dashboard second container end */}
            {/* ==================== */}
            {/* ==================== */}
            {/* ==================== */}
            {/* dashboard second container start */}
            <div className="dashboard-area1-cont3">
              <div className="dash-area1-cont2-header2">
                <div className="dash-area1-cont2-header1">Profits</div>
              </div>
              <div className="dash-area1-cont2-titles">
                <div className="title1">User</div>
                <div className="title2">Bet</div>
                <div className="title3">Profit</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Ekene</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles3">
                <div className="title1">John</div>
                <div className="title2">10,000</div>
                <div className="title3">0.2355</div>
              </div>
              {/* ============= */}
              {/* ============= */}
              <div className="dash-area1-cont2-titles2">
                <div className="title1">Morgan</div>
                <div className="title2">20,000</div>
                <div className="title3">0.0255</div>
              </div>
            </div>
            {/* dashboard second container end */}
          </div>
        </div>
      </section>
      {/* =================================================== */}
      {/* =================================================== */}
      {/* =================================================== */}
      {/* =================================================== */}
    </div>
  );
};

export default DashBoardDefaultPage;
