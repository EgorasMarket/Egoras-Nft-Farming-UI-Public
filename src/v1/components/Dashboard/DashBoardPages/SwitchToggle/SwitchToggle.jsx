import React from "react";
import "./switchtoggle.css";
const SwitchToggle = ({ checkBox, doUnluck }) => {
  return (
    <div>
      <label class="switch">
        {checkBox === true ? (
          <>
            {" "}
            <input
              type="checkbox"
              // id={id}
              checked={checkBox === true ? true : false}
            />
            <span class="slider round"></span>
          </>
        ) : (
          <>
            {" "}
            <input
              // id={id}
              type="checkbox"
              checked={checkBox === true ? true : false}
              onClick={doUnluck}
            />
            <span class="slider round" onClick={doUnluck}></span>
          </>
        )}
      </label>
    </div>
  );
};

export default SwitchToggle;
