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
  useEffect(() => {
    axios
      .get(api_url + "/api/lend/all", null, config)
      .then((data) => {
        console.log(data.data.payload, "powerful");

        setBranches(data.data.payload);
        // setBranchDetails({
        //   branchName: data.data.payload[0].name,
        //   amount: data.data.payload[0].amount,
        //   funded: data.data.payload[0].funded,
        // });
        let babara = data.data.payload[0].name.includes("Rumukwrushi");
        let babara2 = data.data.payload[0].name.includes("Agip");
        let babara3 = data.data.payload[0].name.includes("Oyigbo");
        console.log(data.data.payload[0].name);
        setRumuName(babara);
        setAgipName(babara2);
        setOyName(babara3);

        console.log(babara);
        console.log(babara, babara2, babara3);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);

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
