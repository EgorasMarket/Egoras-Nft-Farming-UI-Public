import React from "react";
import "./switchtoggle.css";
const SwitchToggle2 = ({ checkBox, darkMode }) => {
  return (
    <div>
      <label class="switch2">
        <input
          type="checkbox"
          checked={checkBox == true ? true : false}
          // onClick={darkMode}
        />
        <span class="slider2 round" onClick={darkMode}></span>
      </label>
    </div>
  );
};

export default SwitchToggle2;
