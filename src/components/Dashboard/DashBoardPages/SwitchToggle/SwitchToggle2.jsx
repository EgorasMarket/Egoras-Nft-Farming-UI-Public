import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
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
        <span class="slider2 round" onClick={darkMode}>
          {checkBox == false ? (
            <LightModeIcon className="lightMode_icon" />
          ) : (
            <DarkModeIcon className="darkMode_icon" />
          )}
        </span>
      </label>
    </div>
  );
};

export default SwitchToggle2;
