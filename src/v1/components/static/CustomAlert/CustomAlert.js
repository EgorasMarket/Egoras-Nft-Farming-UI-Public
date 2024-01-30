import React, { useState, useEffect, Fragment } from "react";
import "./customAlert.css";
export const CustomAlert = (props) => {
  useEffect(() => {
    setTimeout(function () {
      // closeAlert();
      props.closeAlert();
    }, 5000);
  }, [props.closeAlert]);
  return (
    <div className="alert_cont">
      <div
        className={
          props.alertType === "danger" ? "setAlertErr" : "setAlertSuccess"
        }
      >
        {props.alert}
      </div>
    </div>
  );
};

// export default CustomAlert
