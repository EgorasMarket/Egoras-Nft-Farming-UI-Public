// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

// let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.TradingView) {
      new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_side_toolbar: false,
        container_id: "tradingview_12345",
      });
    }
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ display: "block" }}>
      <div
        id="tradingview_12345"
        className="tradingview-widget"
        style={{ display: "block" }}
      ></div>
    </div>
  );
}
