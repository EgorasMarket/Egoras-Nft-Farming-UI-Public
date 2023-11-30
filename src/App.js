import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Home/Header";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
// import MemberShipPage from "./components/Home/MemberShip/MemberShipPage";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Provider } from "react-redux";

import { Web3Provider } from "@ethersproject/providers";
import Footer from "./components/Home/Footer.jsx";
import "../src/App.css";
import store from "./store";
import Referal from "./components/Referral/Referal";
// import PaywithFort from "./components/Home/MemberShip/SubSteps/PaywithFort";
import { socket } from "./socket";

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
    socket.connect();

    socket.on("connect", () => {
      // alert("socket connected");

      socket.on("goodluck", (data) => {
        alert(JSON.stringify(data));
        // if (data === 1) {
        //   alert("Payment made");
        // } else {
        //   alert("Payment incompletee");
        // }
      });
      socket.on("second", (data) => {
        alert(data);
      });
    });
    // socket.on("testing", (data) => {
    //   alert(JSON.stringify(data));
    // });

    return () => {
      // socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log(localStorage.tank);
  }, []);

  useEffect(() => {
    if (linksActive === "/app") {
      setDashboard(true);
      return;
    }
    console.log(urlArr);
    if (urlArr[2] === "market") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/staking/egc") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/") {
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
    if (linksActive === "/app/user") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/swap") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/earn/pool/detail") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/sell") {
      setDashboard(true);
      return;
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setDashboard(true);
      return;
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/earn/pool/detail/transactions") {
      setDashboard(true);
      return;
    }
    // if (linksActive === "/app/add") {
    //   setActiveMenuName("Liquidity");
    // }
    if (linksActive === "/app/whitepaper") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/user/referral") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/earn") {
      setDashboard(true);
      return;
    }
    if (linksActive === "/app/stake/vault/" + urlArr[4] + "/ENGN") {
      setDashboard(true);
      return;
    }

    if (linksActive === "/app/stake/deposit_vault/" + urlArr[4] + "/ENGN") {
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
    if (urlArr[1] === "admin") {
      setAdmin(true);
      return;
    }
    if (urlArr[1] === "app") {
      setDashboard(true);
      return;
    }
  });

  const [cClass, setCClass] = useState(false);
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
          <div className={cClass === true ? "dark " : "App-header"}>
            {urlArr[1] === "app" ? null : (
              <Header togglemakeDark={togglemakeDark} check={cClass} />
            )}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/referal/:ref" component={Referal} />
              {/* <Route exact path="/pay-with-fort" component={PaywithFort} /> */}
              {/* <Route exact path="/membership/sub" component={MemberShipPage} />CYNTAX
               */}
              {admin == true ? (
                <Admin check={cClass} togglemakeDark={togglemakeDark} />
              ) : null}
              {dashboard == true ? (
                <Dashboard check={cClass} togglemakeDark={togglemakeDark} />
              ) : null}
            </Switch>
            {urlArr[1] === "app" ? null : <Footer />}
          </div>
        </Router>
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
