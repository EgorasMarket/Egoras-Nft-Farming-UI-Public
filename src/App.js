import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Home/Header";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home/Home";
import { loadUser } from "./actions/auth";

import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { Provider } from "react-redux";

import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useEagerConnect, useInactiveListener } from "./hooks";
import { injected, walletconnect } from "./connectors";
// import { class, walletconnect } from "./connectors";
// import OpenVaultPage from "./components/Dashboard/DashBoardPages/OpenVaultPage";
import Footer from "./components/Home/Footer.jsx";
import "../src/App.css";
import store from "./store";
import Referal from "./components/Referral/Referal";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  const [cClass, setCClass] = useState(false);
  // localStorage.setItem("uiMode", "dark");
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
      <Provider store={store}>
        {/* <Provider> */}
        <Router>
          <div
            className={cClass === true ? "dark " : "App-header"}
            // className="dark"
          >
            <Header togglemakeDark={togglemakeDark} check={cClass} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/referal/:ref" component={Referal} />
              <Dashboard check={cClass} togglemakeDark={togglemakeDark} />
              {/* <Route component={Dashboard} /> */}
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
