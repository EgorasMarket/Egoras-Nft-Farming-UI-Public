import React, { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TokenModal } from "../DashBoardPages/TokenModal/TokenModal";
// import { ConnectWallet } from "../../auth/ConnectWallet";
import { ConnectWallet } from "../../auth/ConnectWallet";
import "../../../css/dashboardAddLiquidity.css";
const DashboardAddLiquidtyPage = () => {
  const [modal, setModal] = useState(false);
  const [connected, setConnected] = useState(false);

  const toggleModal = () => {
    if (modal === true) {
      setModal(false);
    } else if (modal === false) {
      setModal(true);
    }
  };
  return (
    <div className="other2">
      {/* Tokens Section Start */}
      <section className=" no-bg">
        <div className="container">
          <div className="liquidity_area">
            <div className="liquidity_cont">
              <div className="liquidity_cont_head">
                <div className="liquidity_cont_head_text">Add Liquidity</div>
                <SettingsIcon className="settings_icon" />
              </div>
              <div className="liquidity_cont_body">
                <div className="liquidity_cont_body_conts">
                  <div className="tips_layer">
                    <div className="tips_writeUp">
                      <span className="tip_sub_head">Tip: </span> When you add
                      liquidity, you will receive pool tokens representing your
                      position. These tokens automatically earn fees
                      proportional to your share of the pool, and can be
                      redeemed at any time.
                    </div>
                  </div>
                  <div className="input_amnt_layer">
                    <div className="amnt_input">
                      <input
                        type="number"
                        name="number"
                        id="number"
                        placeholder="000"
                        className="amnt_input_field"
                        autocomplete="off"
                      />
                      <button
                        className="display_tokens_drop"
                        onClick={toggleModal}
                      >
                        <img
                          src="/img/egc-icon.svg"
                          alt=""
                          className="asset_icon"
                        />{" "}
                        EGC <ArrowDropDownIcon className="drop_down_icon" />
                      </button>
                    </div>
                  </div>
                  {/* <div className="plus_icon_layer"> */}
                  <AddIcon className="plus_icon_layer" />

                  {/* </div> */}
                  <div className="input_amnt_layer">
                    <div className="amnt_input">
                      <input
                        type="number"
                        name="number"
                        id="number"
                        placeholder="000"
                        className="amnt_input_field"
                        autocomplete="off"
                      />
                      <button
                        className="display_tokens_drop display_tokens_drop_not_select "
                        onClick={toggleModal}
                      >
                        Select a token{" "}
                        <ArrowDropDownIcon className="drop_down_icon" />
                      </button>
                    </div>
                  </div>
                  <div className="connect_btn_div">
                    <ConnectWallet
                      isHome="false"
                      connect_btn="connect_btn"
                      connect_btn_class="connect_btn_div"
                      onClick={() => setConnected(true)}
                      className="connect_btn"
                      btn_txt="Enter an amount"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {modal == true ? <TokenModal toggleTokenModal={toggleModal} /> : null}
    </div>
  );
};

export default DashboardAddLiquidtyPage;
