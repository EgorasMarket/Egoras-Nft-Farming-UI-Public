import React, { useState } from "react";
// import { dummyData } from "./data";
// import { dummyData } from "../../../app/static";
import Pagination from "react-paginate";
import "../Table.css";

function TableWithPagination({
  ThLength,
  ThName,
  thChildren,
  defaultTh,
  dummyData,
  TdDataProps,
  tdOnClick,
  typeOfTable,
  TableDataChild,
  ItemsToRender,
  CustomTdComponent,
}) {
  const itemsPerPage = ItemsToRender;
  const [currentData, setCurrentData] = useState(
    dummyData.slice(0, itemsPerPage)
  );
  const [pageCount, setPageCount] = useState(
    Math.ceil(dummyData.length / itemsPerPage)
  );

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * itemsPerPage);
    setCurrentData(dummyData.slice(offset, offset + itemsPerPage));
  };

  const dataElements = currentData.map((data, i) => {
    const tdElements = Object.keys(data)
      .filter((k) => TdDataProps.includes(k))
      .map((item, index) => {
        let className = "tableStyle_body_row_data";
        if (index === 0) className += " tableStyle_body_row_data_first";
        if (index === TdDataProps.length - 1)
          className += " tableStyle_body_row_data_last";
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
  const dataElements2 = currentData.map((data, i) => {
    const tdElements = Object.keys(data)
      .filter((k) => TdDataProps.includes(k))
      .map((item, index) => {
        let className = "tableStyle_body_row_data";
        if (index === 0) className += " tableStyle_body_row_data_first";
        if (index === TdDataProps.length - 1)
          className += " tableStyle_body_row_data_last";
        // use the custom TD component if the current item is "Name"
        return item === "Name" ? (
          <CustomTdComponent
            key={index}
            className={className}
            data={data[item]}
          />
        ) : (
          <td key={index} className={className} onClick={tdOnClick}>
            {data[item]}
          </td>
        );
      });
  });
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

  return (
    <div className="tablePaginationDiv" style={{ width: "100%" }}>
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
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        nextLabel="Next >"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="< Prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        // renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default TableWithPagination;
