import React, { useState, useEffect } from "react";
import axios from "axios";
// import { config } from "../../../actions/Config";
import { config } from "../../actions/Config";
import { API_URL as api_url } from "../../actions/types";
export const UserContext = React.createContext();

export const Context = ({ children, branchId }) => {
  const [Branches, setBranches] = useState([]);

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

  return (
    <UserContext.Provider
      value={{
        Branches,
        // loans,
        branchId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
