import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { displayDate } from '../../utils';
import Button from '../../components/common/Button';
import currency from '../../mock/currency';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountsData, selectCountsData, selectCountsDataStatus } from '../../store/countsSlice';

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
        <div className="text-center">
          <img
            src={count.icon}
            className="card-img-top"
            alt="icon"
            style={{ width: '100px' }}
          />
          <h5 className="card-title">{count.name}</h5>
          <hr />
        </div>
        <div className="card-body d-flex flex-column p-0 text-center">
          <div className="card-body-content p-2 flex-grow-1">
            {countsDataLoaded ? <p className="card-text">Тип счёта: {countsData[count.type].name}</p> : 'Loadinf...'}
            
            <p className="card-text">Описание: {count.content}</p>
            <p className="card-text">Создан: {displayDate(count.createdAt)}</p>
            <p className="card-text">
              Обновлён: {displayDate(count.updatedAt)}
            </p>
          </div>
          <div className="card-footer position-relative">
            <small className="text-body-secondary">
              Баланс: {count.balance}{' '}
              <img src={currency[count.currency].icon} alt="img" style={{ width: '24px' }} />
            </small>

            <i
              className={
                'fs-24 position-absolute top-50 end-0 translate-middle-y bi bi-eye' +
                (count.totalBalance === 'true' ? '' : '-slash')
              }
            ></i>
          </div>
        </div>
        <div
          className="btn-group-settings btn-group-vertical position-absolute top-0 end-0"
          role="group"
          aria-label="Vertical button group"
        >
          <Button
            dataType="edit"
            color="light"
            classes="btn-sm"
            onClick={onChange}
            id={count._id}
            icon="bi bi-gear"
          />
          <Button
            dataType="like"
            color="light"
            classes="btn-sm"
            onClick={onChange}
            id={count._id}
            icon={'bi bi-heart' + (count.like ? '-fill' : '')}
          />

          <Button
            dataType="remove"
            color="light"
            classes="btn-sm"
            onClick={onChange}
            id={count._id}
            icon="bi bi-trash"
          />
        </div>
      </div>
    </div>
  );
};

CountCard.propTypes = {
  count: PropTypes.object,
  onChange: PropTypes.func,
};

export default CountCard;
