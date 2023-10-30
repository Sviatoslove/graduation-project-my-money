import React from 'react';
import PropTypes from 'prop-types';

const StatusCategories = ({ status, onClick }) => {
  return (
    <ul className="nav nav-tabs nav-tabs justify-content-evenly mt-4 border-primary ff-roboto">
      <li className="nav-item border-4">
        <button
          className={
            'nav-link border-primary bbc-tr ' +
            (status === 'decrement' ? 'active' : 'border-0')
          }
          aria-current="true"
          onClick={onClick}
          data-type="decrement"
        >
          Расходы
        </button>
      </li>
      <li className="nav-item">
        <button
          className={
            'nav-link border-primary bbc-tr ' +
            (status === 'decrement' ? 'border-0' : 'active')
          }
          onClick={onClick}
          data-type="increment"
        >
          Доходы
        </button>
      </li>
    </ul>
  );
};

StatusCategories.propTypes = {
  status: PropTypes.string,
  onClick: PropTypes.func,
};

export default StatusCategories;
