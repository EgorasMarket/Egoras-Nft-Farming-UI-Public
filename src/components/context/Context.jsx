import React, { useState, useEffect } from "react";
import axios from "axios";
// import { config } from "../../../actions/Config";
import { config } from "../../actions/Config";
import { API_URL as api_url } from "../../actions/types";
export const UserContext = React.createContext();

export const Context = ({ children }) => {
  const [account, setAccount] = useState("My account is here check it ");
  useEffect(() => {
    axios
      .get(api_url + "/v1/rewards/get/reward/by/" + 23, null, config)
      .then((data) => {
        console.log(data, "powerful");

        setAccount(data.data.data);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);
  return (
    <UserContext.Provider
      value={{
        account,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
