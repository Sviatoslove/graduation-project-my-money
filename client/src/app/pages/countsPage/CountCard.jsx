import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { displayDate } from '../../utils';
import currency from '../../mock/currency';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
} from '../../store/countsSlice';
import Badge from '../../components/common/Badge';
import { BtnsGroup } from '../../components/common/buttons';
import localStorageService from '../../services/localStorage.service';

const CountCard = ({ count, onChange }) => {
  const dispatch = useDispatch();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  }, []);

  return (
    <div className="col position-relative">
      <div className="card h-100 d-flex p-3 border-0 item-count">
        <div className="position-absolute top-0 start-2 translate-end flex-column d-flex">
          {count.like && (
            <div className="mt-2 w-48px">
            <i
              className={
                'like-for-card bi bi-heart-fill text-danger fs-1 mx-auto lh-0 w-content'
              }
            />
            </div>
          )}
          {count._id === localStorageService.getMasterCount() && (
            <div className="">
            <img
            className='like-for-card'
              src="https://img.icons8.com/plasticine/48/statue-of-liberty.png"
              alt="logo"
            />
          </div>

          )}
        </div>

        <div className="text-center">
          <img
            src={count.icon}
            className="card-img-top"
            alt="icon"
            style={{ width: '100px' }}
          />
          <h5 className="card-title ff-roboto ls-1">{count.name}</h5>
          <hr />
        </div>
        <div className="card-body d-flex flex-column p-0 text-center">
          <div className="card-body-content p-2 flex-grow-1">
            {countsDataLoaded ? (
              <div className="card-text">
                Тип счёта: <Badge {...countsData[count.type]} />
              </div>
            ) : (
              'Loading...'
            )}

            <div className="card-text">
              <p className="h6">Описание:</p>{' '}
              <p className="ff-BS">{count.content}</p>
            </div>
            <p className="card-text">Создан: {displayDate(count.createdAt)}</p>
            <p className="card-text">
              Обновлён: {displayDate(count.updatedAt)}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary d-flex align-items-center">
              <p className="fw-bold ls-2 fs-5">Баланс:</p>
              <div className="flex-grow-1 justify-content-center d-flex">
                <p className="fw-bold ls-1 fs-4 align-items-center d-flex">
                  {count.balance}{' '}
                  <img
                    src={currency[count.currency]?.icon}
                    alt="img"
                    style={{ width: '40px' }}
                  />
                </p>
              </div>
            </small>
          </div>
        </div>
        <BtnsGroup
          count={4}
          id={count._id}
          dataType={['like', 'edit', 'remove', 'masterCount']}
          dataEssence={'count'}
          classes="btn-sm"
          func={(e) => onChange(e, count)}
          icon={[
            'bi bi-heart' + (count.like ? '-fill' : ''),
            'bi bi-pencil-square',
            'bi bi-trash',
            '',
          ]}
          imgSrc={[
            '',
            '',
            '',
            `https://img.icons8.com/material-${
              count._id === localStorageService.getMasterCount()
                ? 'rounded'
                : 'outlined'
            }/24/master.png`,
          ]}
          bgColor="light"
          iconSize={'24px'}
        />
      </div>
    </div>
  );
};

CountCard.propTypes = {
  count: PropTypes.object,
  onChange: PropTypes.func,
};

export default CountCard;
