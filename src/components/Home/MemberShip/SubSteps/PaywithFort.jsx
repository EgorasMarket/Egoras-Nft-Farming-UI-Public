import React, { useEffect, useState } from "react";
import { GENERATE_QR_CODE_DATA } from "../../../../services/generalServices";

import { QRCode } from "react-qrcode-logo";
import { GENERATE_QR_LINK } from "../../../../services/productServices";
import { socket } from "../../../../socket";
const PaywithFort = () => {
  const [generated_text, setGeneratedText] = useState("");
  const [status, setStatus] = useState("Listening for payment ...");

  const [test, setTest] = useState([]);

  const listener = () => {
    const address = "0x1eD8d75fbAb7Dc60d708c69fE0743396467a86F4";
    const payload = {
      initiator: "web-app",
      user: address,
    };

    socket.emit("subscribe_membership", payload);
  };

  const fetchGeneratedLink = async () => {
    // const payload = {
    //   type: "membership",
    //   userWallet: "0x1eD8d75fbAb7Dc60d708c69fE0743396467a86F4",
    //   data: {
    //     quantity: 1,
    //     amount: 1000,
    //     symbol: "EGC",
    //     user: "0x1eD8d75fbAb7Dc60d708c69fE0743396467a86F4",
    //     product_id: "c505c80e-5b41-4dd9-b9fc-798787866k86",
    //   },
    // };
    // const postData = await GENERATE_QR_LINK(payload);
    // setGeneratedText(postData);
    // console.log(postData, "chima");
  };

  useEffect(() => {
    //listen for fort response

    socket.on("membership", (data) => {
      // alert(data);
      if (data === 1) {
        setStatus("Payment made");
      } else {
        setStatus("Payment failed couldn't complete payment");
      }
    });
  }, []);

  const mockRequest = {
    type: "membership",
    Data: {
      Quantity: 1,
      amount: 10,
      Symbol: "EGC",
      User: "0xxkskdksdjsjkd",
      product_id: "“20ldlkdfa”",
    },
  };
  return (
    <div
      className="selectPlanDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <h2> Scan this code on Fort App</h2>
      <QRCode value={mockRequest} />

      <button onClick={listener}> generate code </button>

      <p> {generated_text}</p>
      {/* <button> simulate us</button> */}

      <p>{status}</p>

      {/* {qrImage && <img src={qrImage} alt="qr data" />} */}
    </div>
  );
};

export default PaywithFort;
