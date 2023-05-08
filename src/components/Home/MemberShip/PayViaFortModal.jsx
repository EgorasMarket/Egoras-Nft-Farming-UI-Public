import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { numberWithCommas } from "../../../static";
import { GENERATE_QR_CODE_LINK } from "../../../services/generalServices";
import { socket } from "../../../socket";
import UpdatedErrorModal from "../../Dashboard/DashBoardPages/UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "../../Dashboard/DashBoardPages/UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedSuccessModal";

const PayViaFortModal = ({
  togglePayViaFortDiv,
  message,
  code,
  data,
  account,
  prodType,
}) => {
  const [loading, setLoading] = useState(true);
  const [qr_link, setQrLink] = useState("");
  const [status, setStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successRoute, setSuccessRoute] = useState("");
  const [qr_dataObj, setQr_dataObj] = useState("");
  const fetchShortCode = async () => {
    if (!data.account) {
      alert("Please connect wallet first");
      //handle uninitialized account
      return;
    }

    const res = await GENERATE_QR_CODE_LINK(data);
    console.log(res, "nabb");

    if (res.success) {
      setQrLink(res.data);
      setLoading(false);

      return;
    }
  };

  useEffect(() => {
    socket.on(account, (data) => {
      console.log(data);
      alert(data);
    });
  }, [account]);
  useEffect(() => {
    console.log(prodType);
    if (prodType === "DIRECT") {
      setSuccessRoute("/app/user/p2p_sales");
      return;
    }
    if (prodType === "INDIRECT") {
      setSuccessRoute("/app/user/sales");
      return;
    }
    if (data.type === "membership") {
      setSuccessRoute("/app");
      return;
    }
  }, [data]);

  useEffect(() => {
    socket.on(`${account}/${data.type}`, (data) => {
      // alert(data);
      console.log(data);
      if (data.response === 1) {
        console.log("Payment made");
        console.log(data);
        // alert("Payment made");
        setStatus("Payment made");
        setSuccessModal(true);
        setSuccessMessage("Payment Successful");
        // setSuccessRoute("/app/user/p2p_sales");
      } else {
        console.log(data);

        console.log("Payment incompletee");
        // alert("Payment incompletee");
        setStatus("Payment failed couldn't complete payment");
        setErrorModal(true);
        setErrorMessage("Payment failed couldn't complete payment");
      }
    });

    // if (data.type === "product") {
    //   socket.on("purchase-status", (data) => {
    //     // alert(data);
    //     if (data === 1) {
    //       alert("Payment made");
    //       setStatus("Payment made");
    //     } else {
    //       alert("Payment incomplete");
    //       setStatus("Payment failed couldn't complete payment");
    //     }
    //   });
    // }

    // alert(JSON.stringify(data));
    //  call the api and generate a qr data
    fetchShortCode();
  }, []);
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied Code ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }
  console.log(data, "data,data,data");
  return (
    <>
      <div className="payViaFortDiv">
        <div
          className="payViaFortDiv_close_div"
          onClick={togglePayViaFortDiv}
        ></div>
        <div className="payViaFortDiv_area">
          <div className="qr_amount_area">
            {numberWithCommas(parseFloat(data.data.amount).toFixed(2))}{" "}
            {data.data.symbol}
          </div>
          <div className="payViaFortDiv_area_1">
            <QRCode
              quietZone={5}
              value={qr_link}
              // bgColor="#151422"
              eyeColor="#140f22"
              // fgColor="#c3c1da"
              bgColor="#c3c1da"
              fgColor="#231a3b"
              logoImage="/img/martgpt_logo_icon.svg"
              eyeRadius={[
                [5, 5, 0, 5],
                [5, 5, 5, 0],
                [5, 0, 5, 5],
              ]}
              removeQrCodeBehindLogo={true}
              logoPadding={5}
              logoWidth={15}
              logoPaddingStyle="circle"
              // qrStyle="dots"
            />
            {/* <QRCode quietZone={10} value={`${JSON.stringify(data)}`} /> */}
          </div>
          <div className="payViaFortDiv_area_2">{message}</div>
          <div className="payViaFortDiv_area_3_input_div">
            <div className="payViaFortDiv_area_3">Or copy this code.</div>
            <div className="payViaFortDiv_area_3_input_cont">
              <input
                type="text"
                value={qr_link}
                className="payViaFortDiv_area_3_input_div_input"
                id="myInput"
              />
              <button
                className="payViaFortDiv_area_3_input_cont_btn"
                onClick={copyText}
                onMouseOut={outFunc}
              >
                Copy
                <span className="tooltiptext2" id="myTooltip"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
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
          route={successRoute}
        />
      ) : null}
    </>
  );
};

export default PayViaFortModal;
