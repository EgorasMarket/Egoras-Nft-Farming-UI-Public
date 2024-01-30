import React, { useState, useRef, useEffect } from "react";
import { parseEther, formatEther } from "@ethersproject/units";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedSuccessModal from "../../Dashboard/DashBoardPages/UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedSuccessModal";
import UpdatedErrorModal from "../../Dashboard/DashBoardPages/UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedErrorModal";
import ProcurreUpload from "./ProcurreUpload";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { listProcurementProduct } from "../../../web3/index2";

const AdminProcurreProduct = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const [prodName, setProdName] = useState("");
  const [prodAmount, setProdAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [prodCount, setProdCount] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [route, setRoute] = useState("");

  const sendProductToBlockchain = async (prodId) => {
    const conCatProdName = ` ${prodName}_${sellAmount}_${prodCount}`;
    console.log(conCatProdName);
    const res = await listProcurementProduct(
      conCatProdName,
      parseEther(prodAmount.toString(), "wei").toString(),
      parseEther(sellAmount.toString(), "wei").toString(),
      parseEther(prodCount.toString(), "wei").toString(),
      library.getSigner()
    );
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setRoute("/admin/upload/procurrement");
      setSuccessMessage(
        "You've successfully placed " + prodName + " for governance"
      );
    } else {
      setErrorModal(true);
      setErrorMessage(res.message);
      setIsLoading(false);
      setDisable(false);
    }
  };

  const handleNameChange = (event) => {
    setProdName(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleSaleAmountChange = (event) => {
    setProdAmount(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleSellAmountChange = (event) => {
    setSellAmount(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };
  const handleProdCountChange = (event) => {
    setProdCount(event.target.value);
    console.log(event.target.value);
    //console.log(event.target.value);
  };

  const CloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          <div className="sell_container">
            <ProcurreUpload
              Disable={Disable}
              UploadProduct={sendProductToBlockchain}
              isLoading={isLoading}
              account={account}
              prodCount={prodCount}
              handleSaleAmountChange={handleSaleAmountChange}
              handleSellAmountChange={handleSellAmountChange}
              handleProdCountChange={handleProdCountChange}
              prodAmount={prodAmount}
              sellAmount={sellAmount}
              handleNameChange={handleNameChange}
              prodName={prodName}
            />
          </div>
        </div>
      </section>
      {errorModal ? (
        <UpdatedErrorModal
          errorMessage={errorMessage}
          closeModal={CloseErrorModal}
        />
      ) : null}
      {successModal ? (
        <UpdatedSuccessModal
          btnRoute={true}
          successMessage={successMessage}
          route={route}
        />
      ) : null}
    </div>
  );
};

export default AdminProcurreProduct;
