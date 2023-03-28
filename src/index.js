import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Context } from "./components/context/Context.jsx";
import Zendesk from "react-zendesk";
const zendesk_key = "tcnJFYgY0Yngh4N5j505mVG0jBAukCiGAdrs48E1";

const setting = {
  color: {
    theme: "#000",
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help",
    },
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } },
    ],
  },
};
ReactDOM.render(
  <Context>
    <React.StrictMode>
      <Zendesk
        defer
        zendeskKey={zendesk_key}
        {...setting}
        onLoaded={() => {
          console.log("zendesk is running, initiated by newnation");
        }}
      />
      <App />
    </React.StrictMode>
  </Context>,
  document.getElementById("root")
);

// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// <!-- Start of sharpman-tech Zendesk Widget script -->

// <!-- End of sharpman-tech Zendesk Widget script -->
