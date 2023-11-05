import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useForms } from "../../hooks/useForm";

const Pagination = ({
  itemsCount,
  pageSize,
  countsLikes,
  likesPage
}) => {
  const {currentPage, handlePageChange} = useForms()
  const num = likesPage ? countsLikes.length : itemsCount
  const pagesCount = Math.ceil(num / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount <= 1 || isNaN(pagesCount) || (countsLikes && countsLikes.length < pageSize))
    return null;
  return (
    <nav className="pagination-counts align-self-end ms-5 me-auto">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            role="button"
            key={page}
            className={"page-item " + (page === currentPage ? "active" : "")}
          >
            <a
              className="page-link"
              onClick={() => {
                handlePageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  likesPage: PropTypes.string,
  countsLikes: PropTypes.array,
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
