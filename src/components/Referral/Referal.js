import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
// import { useCookies } from "react-cookie";

export const Referal = ({ match }) => {
  //   const [ref, setRef] = useState("");

  useEffect(() => {
    //console.log(match.params);
    localStorage.setItem("tank", match.params.ref);
  }, []);
  if (typeof localStorage.tank !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div></div>
    </Fragment>
  );
};

export default Referal;
