import React from "react";
import Pagination from "react-paginate";

function Paginate({ pageCount, handlePageClick }) {
  return (
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
    />
  );
}

export default Paginate;
