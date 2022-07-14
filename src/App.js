import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Home/Header";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home/Home";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useEagerConnect, useInactiveListener } from "./hooks";
import { injected, walletconnect } from "./connectors";
// import { class, walletconnect } from "./connectors";
// import OpenVaultPage from "./components/Dashboard/DashBoardPages/OpenVaultPage";
import Footer from "./components/Home/Footer.jsx";
import "../src/App.css";
function App() {
  const [cClass, setCClass] = useState(false);
  // localStorage.setItem("uiMode", "light");
  useEffect(() => {
    if (localStorage.getItem("uiMode") === "light") {
      setCClass(false);
    } else {
      setCClass(true);
    }
  });
  const togglemakeDark = () => {
    if (localStorage.getItem("uiMode") == "light") {
      localStorage.setItem("uiMode", "dark");
      setCClass(true);
    } else {
      localStorage.setItem("uiMode", "light");
      setCClass(false);
    }
    console.log(localStorage.getItem("uiMode"));
  };
  //...

  function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <div
          className={cClass === true ? "dark " : "App-header"}
          // className="dark"
        >
          <Header togglemakeDark={togglemakeDark} check={cClass} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Dashboard check={cClass} togglemakeDark={togglemakeDark} />
            {/* <Route component={Dashboard} /> */}
          </Switch>
          <Footer />
        </div>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
