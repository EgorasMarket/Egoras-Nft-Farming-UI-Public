import React, { useState } from "react";
// import { dummyData } from "../../app/static";
import "./Table.css";

const Table = ({
  ThLength,
  ThName,
  thChildren,
  defaultTh,
  dummyData,
  TdDataProps,
  tdOnClick,
  typeOfTable,
  TableDataChild,
}) => {
  const thElements = [];
  for (let i = 0; i < ThLength; i++) {
    let className = "tableStyle_heading_titles";
    if (i === 0) className += " tableStyle_heading_titles_first";
    if (i === ThLength - 1) className += " tableStyle_heading_titles_last";
    thElements.push(
      <th key={i} className={className}>
        {ThName[i] || "Column " + (i + 1)}
      </th>
    );
  }

  const dataElements = dummyData.map((data, i) => {
    const tdElements = Object.keys(data)
      .filter((k) => TdDataProps.includes(k))
      .map((item, index) => {
        let className = "tableStyle_body_row_data";
        if (index === 0) className += " tableStyle_body_row_data_first";
        if (index === TdDataProps.length - 1)
          className += " tableStyle_body_row_data_last";
        console.log(data[item]);
        return (
          <td key={index} className={className} onClick={tdOnClick}>
            {data[item]}
          </td>
        );
      });
    return (
      <tr key={i} className="tableStyle_body_row">
        {tdElements}
      </tr>
    );
  });

  const dataElements2 = dummyData.map((data, i) => {
    const tdElements = Object.keys(data)
      .filter((k) => TdDataProps.includes(k))
      .map((item, index) => {
        let className = "tableStyle_body_row_data";
        if (index === 0) className += " tableStyle_body_row_data_first";
        if (index === TdDataProps.length - 1)
          className += " tableStyle_body_row_data_last";
        console.log(data[item]);
        return TableDataChild;
      });
    return (
      <tr key={i} className="tableStyle_body_row">
        {tdElements}
      </tr>
    );
  });

  return (
    <table className="tableStyle_table">
      <thead className="tableStyle_titles">
        <tr className="tableStyle_title_div">
          {defaultTh == true ? thElements : thChildren}
        </tr>
      </thead>
      {typeOfTable === "default" ? (
        <tbody className="tableStyle_body">{dataElements}</tbody>
      ) : typeOfTable === "custom" ? (
        <tbody className="tableStyle_body">{dataElements2}</tbody>
      ) : null}
    </table>
  );
};

export default Table;
