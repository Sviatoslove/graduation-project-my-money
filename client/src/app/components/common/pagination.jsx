import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  countsLikes,
  likesPage,
  currentPage,
  onPageChange
}) => {
  const num = likesPage ? countsLikes.length : itemsCount
  const pagesCount = Math.ceil(num / pageSize);
  const pages = _.range(1, pagesCount + 1);

  const slicePages = ()=> {
    if(pagesCount > 6) {
      if(currentPage < pagesCount/2) pages.splice(currentPage + 2, pagesCount-5, '...' )
      else if(currentPage >= pagesCount/2) pages.splice(2, currentPage-2,'...', currentPage-1,currentPage )
    }
    return pages
  }

  if (pagesCount <= 1 || isNaN(pagesCount) || (countsLikes && countsLikes.length < pageSize))
    return null;
  return (
    <nav className="pagination-counts align-self-end ms-5 me-auto">
      <ul className="pagination">
        {slicePages().map((page, idx) => (
          <li
            role="button"
            key={idx}
            className={"page-item " + (page === currentPage ? "active" : "")}
          >
            <button
              className="page-link"
              onClick={() => {
              onPageChange(page);
              }}
              disabled={page === '...'}
            >
              {page}
            </button>
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
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onPageChange: PropTypes.func,

};

export default Pagination;
