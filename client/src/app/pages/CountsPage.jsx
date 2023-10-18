import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/usersSlice';
import { Link } from 'react-router-dom';
import addIcon from '../../assets/icons/patch-plus-fill.svg'

const CountsPage = () => {
  const user = useSelector(selectUser());

  return (
    <>
      {!user.counts && (
        <>
          <h1 className="position-absolute top-50 start-50 translate-middle">
            Добавьте свой превый счёт
          </h1>
          <Link
            type="button"
            className="btn btn-primary position-absolute translate-middle shadow-lg p-2"
            style={{ right: '5%', bottom: '5%' }}
            to="/counts/add"
          >
            <img src={addIcon} alt="AddCount" className='text-success' aria-hidden="true" />
          </Link>
        </>
      )}
    </>
  );
};

export default CountsPage;
