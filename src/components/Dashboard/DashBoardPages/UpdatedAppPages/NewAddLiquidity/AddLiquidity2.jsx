import React, { useState } from "react";
import NewAddLiquidity from "./NewAddLiquidity";
import NewRemoveLiquidity from "./NewRemoveLiquidity";
const AddLiquidity2 = () => {
  const [activeTab, setActiveTab] = useState("add");

  const ToggleActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  return (
    <div className="addLiquidity2_div">
      <div className="other2">
        <section className=" no-bg no_paddd">
          <div className="container relative">
            <div className="swapDivCont">
              <div className="liquidity_areab">
                <div className="liquidity_area_tabs">
                  <div
                    className={
                      activeTab === "add"
                        ? "liquidity_area_tabs_1_active"
                        : "liquidity_area_tabs_1"
                    }
                    id="add"
                    onClick={ToggleActiveTab}
                  >
                    Add Liquidity
                  </div>
                  <div
                    id="remove"
                    className={
                      activeTab === "remove"
                        ? "liquidity_area_tabs_1_active"
                        : "liquidity_area_tabs_1"
                    }
                    onClick={ToggleActiveTab}
                  >
                    Remove Liquidity
                  </div>
                  <div
                    className={
                      activeTab === "add"
                        ? "liquidity_area_tabs_1_active1"
                        : "liquidity_area_tabs_1_active2"
                    }
                  ></div>
                </div>
                {activeTab === "add" ? <NewAddLiquidity /> : null}{" "}
                {activeTab === "remove" ? <NewRemoveLiquidity /> : null}{" "}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddLiquidity2;
