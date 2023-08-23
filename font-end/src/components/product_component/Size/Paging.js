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

  const { page, limit, totalRows } = pagination;

  const totalPages = Math.ceil(totalRows / limit);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div>
      <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
        Prev
      </button>
      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
