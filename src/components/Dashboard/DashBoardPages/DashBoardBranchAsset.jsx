import React from "react";
import "../../../css/dashboard_branch_assets.css";
import { Link } from "react-router-dom";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
const DashBoardBranchAsset = () => {
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  const data2 = [
    {
      uv2: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4100,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4200,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4300,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4400,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4200,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4500,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4600,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4700,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4500,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4600,
      pv: 2400,
      amt: 2400,
    },

    {
      uv2: 4600,
      pv: 2400,
      amt: 2400,
    },
    {
      uv2: 4800,
      pv: 2400,
      amt: 2400,
    },
  ];
  return (
    <div className="other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}

      <section className=" no-bg no_paddd">
        <div className="container relative">
          <div className="pool_deatail_area">
            <div className="pool_lending_pages_links">
              <Link
                to="/dashboard/lend/pool/detail"
                className="pool_lend_details_link"
              >
                Overview {">"}
              </Link>
              <Link
                to="/dashboard/lend/pool/detail/branch/asset"
                className="pool_lend_details_link"
              >
                Assets {">"}
              </Link>
              <Link
                to="/dashboard/lend/pool/detail/transactions"
                className="pool_lend_details_link"
              >
                Transactions {">"}
              </Link>
            </div>
            <div className="pool_detail_heading">
              <div className="pool_detail_heading_area1">
                <img
                  src="/img/pool_asset_icon.png"
                  alt=""
                  className="pool_detail_heading_area1_img"
                />
                <div className="pool_detail_heading_area1_txt_cont">
                  <div className="pool_detail_heading_area1_txt_cont_1">
                    Branch Series 3 (1754 Factory){" "}
                    {/* <div className="pool_detail_investmentcapacity_box">
                      {" "}
                      41.2M Engn
                    </div> */}
                  </div>
                  <div className="pool_detail_heading_area1_txt_cont_2">
                    Assets
                  </div>
                </div>
              </div>
            </div>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <div className="pool_detail_assets_body_layer_1">
              <div className="pool_detail_assets_body_layer_1_cont1">
                <div className="pool_detail_assets_body_layer_1_cont1_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Asset Value
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    8,336,195 Engn
                  </div>
                </div>
                <div className="pool_detail_assets_body_layer_1_cont1_sub_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    Pool reserve
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1">
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1a">
                      0 Engn
                    </div>
                    <div className="pool_detail_assets_body_layer_1_cont1_sub_heading_1b">
                      Max: 4,000,000 Engn
                    </div>
                  </div>
                </div>
              </div>
              <div className="pool_detail_assets_body_layer_1_cont1">
                <div className="pool_detail_assets_body_layer_1_cont1_heading">
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Pool Value
                  </div>
                  <div className="pool_detail_assets_body_layer_1_cont1_heading_1">
                    Jun 3, 2022 - present
                  </div>
                </div>
                <div className="assets_chart_area">
                  {/* <ResponsiveContainer width="100%" height="100%"> */}
                  <AreaChart
                    width={730}
                    height={150}
                    data={data2}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#60c589"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="95%"
                          stopColor="#60c589"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    {/* <XAxis dataKey="name" /> */}
                    {/* <YAxis /> */}
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv2"
                      stroke="#166235"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                  {/* </ResponsiveContainer> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardBranchAsset;
