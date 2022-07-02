import React, { useState, useEffect } from "react";
import axios from "axios";
// import { config } from "../../../actions/Config";
import { config } from "../../actions/Config";
import { API_URL as api_url } from "../../actions/types";
export const UserContext = React.createContext();

export const Context = ({ children }) => {
  const [Branches, setBranches] = useState([]);
  const [loans, setLoans] = useState([]);
  //   const [txnhash, setTxnHash] = useState("");

  useEffect(() => {
    axios
      .get(api_url + "/api/lend/all", null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful");

        setBranches(data.data.payload);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  useEffect(() => {
    axios
      .get(api_url + "/api/loan/all", null, config)
      .then((data) => {
        console.log(data.data.data, "powerful");

        setLoans(data.data.data);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        Branches,
        loans,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
