import React, { useState, useMemo, useEffect } from "react";
import differenceInSeconds from "date-fns/differenceInSeconds";

const Timer = ({ deadline }) => {
  const ONE_DAY = 60 * 60 * 24;
  const ONE_HOUR = 60 * 60;
  const ONE_MINUTE = 60;
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const diffInSeconds = differenceInSeconds(deadline, currentTime);

  const getCoundown = () => {
    if (diffInSeconds <= 1) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    const days = Math.floor(diffInSeconds / ONE_DAY);
    const hours = Math.floor((diffInSeconds - days * ONE_DAY) / ONE_HOUR);
    const minutes = Math.floor(
      (diffInSeconds - days * ONE_DAY - hours * ONE_HOUR) / ONE_MINUTE
    );
    const seconds =
      diffInSeconds - days * ONE_DAY - hours * ONE_HOUR - minutes * ONE_MINUTE;
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countdown = useMemo(getCoundown, [currentTime]);

  useEffect(() => {
    setInterval(() => {
      const now = new Date().getTime();
      setCurrentTime(now);
    }, 1000);
  }, []);

  return (
    <div>
      <span style={{ fontSize: "18px", fontWeight: "700", color: "#229e54" }}>
        {countdown.days}
        <span
          className="time_tick"
          style={{ fontSize: "14px", fontWeight: "400", color: "#000" }}
        >
          dd
        </span>{" "}
        :{" "}
      </span>
      <span style={{ fontSize: "18px", fontWeight: "700", color: "#229e54" }}>
        {countdown.hours}
        <span
          className="time_tick"
          style={{ fontSize: "14px", fontWeight: "400", color: "#000" }}
        >
          hr
        </span>{" "}
        :{" "}
      </span>
      <span style={{ fontSize: "18px", fontWeight: "700", color: "#229e54" }}>
        {countdown.minutes}
        <span
          className="time_tick"
          style={{ fontSize: "14px", fontWeight: "400", color: "#000" }}
        >
          mm
        </span>{" "}
        :{" "}
      </span>
      <span style={{ fontSize: "18px", fontWeight: "700", color: "#229e54" }}>
        {countdown.seconds}
        <span
          className="time_tick"
          style={{ fontSize: "14px", fontWeight: "400", color: "#000" }}
        >
          ss
        </span>
      </span>
    </div>
  );
};

export default Timer;
