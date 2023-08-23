import React from "react";
import PropTypes from "prop-types";
import "../../../css/paging.css";

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
    <div className="demo">
      <br />
      <nav className="pagination-outer" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              aria-label="Previous"
              disabled={number <= 0}
              onClick={() => handlePageChange(number - 1)}
            >
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {Array.from({ length: totalPages }).map((item, index) => (
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                key={index}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              aria-label="Next"
              disabled={number >= totalPages - 1}
              onClick={() => handlePageChange(number + 1)}
            >
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
