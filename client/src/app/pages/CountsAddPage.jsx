import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../components/common/form/TextField';
import SelectedField from '../components/common/form/SelectedField';
import { useDispatch, useSelector } from 'react-redux';
import {
  countCreate,
  countUpdate,
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
} from '../store/countsSlice';
import AvatarsField from '../components/common/form/AvatarsField';
import currency from '../mock/currency';
import countsIconsMock from '../mock/countsIcons';
import formatDataCountsIcons from '../utils/formatDataCountsIcons';
import { Link, useNavigate } from 'react-router-dom';

const CountsAddPage = ({ currentCount, onChange, onChangeAnimation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());

  const initialState = currentCount
    ? currentCount
    : {
        name: '',
        content: '',
        type: '',
        currency: 'RUB',
        icon: '',
        balance: 0,
      };

  const [data, setData] = useState(initialState);
  const [errors] = useState({});

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  });

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCount) {
      dispatch(countUpdate(data));
      onChangeAnimation({down: true, scale: false})
    } else {
      dispatch(countCreate(data));
      navigate('/counts');
    }
  };

  const countsIcons = [formatDataCountsIcons(countsIconsMock)];

  const style = currentCount ? { marginTop: 0 } : { marginTop: '100px' };

  return (
    <>
      {countsDataLoaded ? (
        <div
          className={
            'container rounded-3 shadow-lg p-5 ' +
            (currentCount !== '' ? 'active counts-add-page' : 'w-50')
          }
          style={style}
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {currentCount ? 'Редактирование счёта' : 'Создание счёта'}
            </h3>
            <TextField
              label="Название счёта"
              value={data.name}
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Комментарий к счёту"
              value={data.content}
              name="content"
              onChange={handleChange}
              error={errors.content}
            />
            <SelectedField
              label="Выбери тип счёта"
              options={countsData}
              name="type"
              onChange={handleChange}
              value={data.count}
              error={errors.count}
            />
            <SelectedField
              label="Выбери валюту счёта"
              options={currency}
              name="currency"
              onChange={handleChange}
              value={data.currency}
              error={errors.currency}
            />
            <AvatarsField
              label="Выбери аватарку"
              name="icon"
              value={data.icon}
              onChange={handleChange}
              options={countsIcons}
            />
            <TextField
              type="number"
              label="Баланс счёта"
              value={data.balance}
              name="balance"
              onChange={handleChange}
              error={errors.balance}
            />

            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <button
              type="submit"
              // disabled={isValid || enterError}
              className="btn btn-primary w-100 mx-auto"
            >
              {!currentCount ? 'Создать' : 'Обновить'}
            </button>
            {currentCount ? (
              <button
                className="btn btn-warning w-100 mx-auto mt-2"
                onClick={onChange}
              >
                Назад
              </button>
            ) : (
              <Link
                type="button"
                className="btn btn-warning w-100 mx-auto mt-2"
                to="/counts"
              >
                Назад
              </Link>
            )}
          </form>
        </div>
      ) : (
        'Loading'
      )}
    </>
  );
};

CountsAddPage.defaultProps = {
  currentCount: '',
};

CountsAddPage.propTypes = {
  currentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  onChangeAnimation: PropTypes.func
};

export default CountsAddPage;
