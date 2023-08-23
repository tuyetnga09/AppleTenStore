import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;

  const { number, totalPages } = pagination;

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div>
      <button
        disabled={number <= 0}
        onClick={() => handlePageChange(number - 1)}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((item, index) => (
        <button key={index} onClick={() => handlePageChange(index)}>
          {index + 1}
        </button>
      ))}
      <button
        disabled={number >= totalPages - 1}
        onClick={() => handlePageChange(number + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
