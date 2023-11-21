import React, { useRef, useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import sparkline from "@fnando/sparkline";
import PropTypes from "prop-types"; // ES6
const propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};

const Sparkline = (props) => {
  const sparklineRef = useRef(null);
  const [currentDatapoint, setCurrentDatapoint] = useState(props.values[0]);

  const options = {
    onmousemove: (event, datapoint) => {
      if (datapoint.timestamp !== currentDatapoint.timestamp) {
        setCurrentDatapoint(() => datapoint);
      }
      console.log(datapoint);
    },
    onmouseout: (event) => {
      setCurrentDatapoint(() => props.values[0]);
    },
  };

  const sortedValues = props.values.sort((a, b) => a.timestamp - b.timestamp);
  useEffect(() => {
    // initialize sparkline on mount after the element has rendered
    try {
      sparkline(sparklineRef.current, sortedValues, options);
    } catch (err) {
      console.error(err);
    }
  }, [sortedValues]);

  const getText = (datapoint) => {
    const dateString = new Date(datapoint.timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${dateString}: ${datapoint.value}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <svg
        ref={sparklineRef}
        viewBox="0 0 100 30"
        width="100%"
        height="30%"
        // width="500"
        // height="200"
        // preserveAspectRatio="none"
        // style={{
        //   paddingBottom: "92%",
        // }}
        // preserveAspectRatio="none"
        strokeWidth="0.5"
        fill="#ecfff4"
        cursorWidth="0.5"
        stroke="#22ad62"
        // stroke={props.darkView == true ? "#000" : "229e54"}
        className="chart_svg"
        strokeLinecap="round"
      ></svg>
      <div>{currentDatapoint?.timestamp ? getText(currentDatapoint) : ""}</div>
    </div>
  );
};

Sparkline.propTypes = propTypes;

// const values = [];
// for (let i = 0; i < 100; i++) {
//   values.push({
//     timestamp: faker.date.recent(30).getTime(),
//     value: faker.finance.amount(),
//   });
// }

export default Sparkline;
// ReactDOM.render(<Sparkline values={values} />, document.querySelector("body"));
