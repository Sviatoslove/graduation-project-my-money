import React from 'react';
import PropTypes from 'prop-types';
import { useForms } from '../../hooks/useForm';

const StatusAll = ({classes}) => {
  const {statusOperation, handleClick} = useForms()

  return (
    <ul className={"nav nav-tabs nav-tabs justify-content-evenly border-primary border-2 ff-roboto " + classes}>
      <li className="nav-item border-5 bbc-tr">
        <button
          className={
            'nav-link border-primary bbc-tr border-2 ' +
            (statusOperation === 'decrement' ? 'active' : 'border-0')
          }
          aria-current="true"
          onClick={handleClick}
          data-type="decrement"
        >
          Расходы
        </button>
      </li>
      <li className="nav-item">
        <button
          className={
            'nav-link border-primary bbc-tr ' +
            (statusOperation === 'decrement' ? 'border-0' : 'active')
          }
          onClick={handleClick}
          data-type="increment"
        >
          Доходы
        </button>
      </li>
    </ul>
  );
};

StatusAll.propTypes={
  classes: PropTypes.string
}

export default StatusAll;
