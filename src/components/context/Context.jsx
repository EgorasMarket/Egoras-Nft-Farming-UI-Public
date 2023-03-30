import React, { useState, useEffect } from "react";
import axios from "axios";
// import { config } from "../../../actions/Config";
import { config } from "../../actions/Config";
import { API_URL as api_url } from "../../actions/types";
export const UserContext = React.createContext();

export const Context = ({ children, branchId }) => {
  const [Branches, setBranches] = useState([]);
  //   const [txnhash, setTxnHash] = useState("");
  const [rumuName, setRumuName] = useState(false);
  const [agipName, setAgipName] = useState(false);
  const [oyName, setOyName] = useState(false);

  return (
    <UserContext.Provider
      value={{
        Branches,
        rumuName,
        agipName,
        oyName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
