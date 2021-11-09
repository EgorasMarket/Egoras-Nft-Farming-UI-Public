import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Home/Header";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home/Home";
import CountDown from "./components/Home/CountDown";
// import Footer from "./components/Home/Footer.jsx";
import "../src/App.css";
function App() {
  return (
    <Router>
      <div className="App-header">
        <Header />
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route exact path="/">
            <CountDown />
          </Route>
          <Dashboard />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
