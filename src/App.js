import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Home/Header";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home/Home";
import { loadUser } from "./actions/auth";
import Admin from "./components/Admin/Admin";
import AboutUs from "./components/Home/AboutUs";
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
  const [dashboard, setDashboard] = useState(false);
  const [admin, setAdmin] = useState(false);
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
  const linksActive = window.location.pathname;
  const urlArr = linksActive.split("/");

  useEffect(() => {
    if (linksActive === "/dashboard") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/egc") {
      window.location.href = "/";
    }
    if (linksActive === "/dashboard/") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/stake") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/user") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/swap") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/earn/pool/detail") {
      setDashboard(true);
      return;
    }
    if (
      linksActive ===
      "/dashboard/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setDashboard(true);
      return;
    }
    if (
      linksActive ===
      "/dashboard/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/earn/pool/" + urlArr[4] + "/detail") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/earn/pool/detail/transactions") {
      setDashboard(true);
      return;
    }
    // if (linksActive === "/dashboard/add") {
    //   setActiveMenuName("Liquidity");
    // }
    if (linksActive === "/dashboard/whitepaper") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/user/referral") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/earn") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/dashboard/stake/vault/" + urlArr[4] + "/ENGN") {
      setDashboard(true);
      return;
    }
    if (
      linksActive ===
      "/dashboard/stake/deposit_vault/" + urlArr[4] + "/ENGN"
    ) {
      setDashboard(true);
      return;
    }
    if (linksActive === "/admin/") {
      setAdmin(true);
      return;
    }
    if (linksActive === "/admin") {
      setAdmin(true);
      return;
    }
    if (linksActive === "/admin/assets") {
      setAdmin(true);
      return;
    }
    if (linksActive === "/admin/transactions") {
      setAdmin(true);
      return;
    }
  });
  useEffect(() => {
    store.dispatch(loadUser());
  });

  // useEffect(() => {
  //   if (account) {
  //     localStorage.setItem("WA_ST", account);
  //     localStorage.setItem("myName", account);
  //   }
  // }, [account]);
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
              <Route exact path="/about" component={AboutUs} />
              {admin == true ? (
                <Admin check={cClass} togglemakeDark={togglemakeDark} />
              ) : null}
              {dashboard == true ? (
                <Dashboard check={cClass} togglemakeDark={togglemakeDark} />
              ) : null}

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
