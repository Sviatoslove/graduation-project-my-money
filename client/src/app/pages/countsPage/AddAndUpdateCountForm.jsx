import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import SelectedField from '../../components/common/form/SelectedField';
import {
  countCreate,
  countUpdate,
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
} from '../../store/countsSlice';
import AvatarsField from '../../components/common/form/AvatarsField';
import currency from '../../mock/currency';
import countsIconsMock from '../../mock/countsIcons';
import formatDataCountsIcons from '../../utils/formatDataCountsIcons';
import { RadioField } from '../../components/common/form';
import Button from '../../components/common/Button';

const CountsForm = ({ currentCount, closeForm }) => {
  const dispatch = useDispatch();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());
  const initialState = currentCount
    ? currentCount
    : {
        name: '',
        content: '',
        type: '',
        currency: '',
        icon: '',
        totalBalance: 'true',
      };

  const [data, setData] = useState(initialState);
  const [errors] = useState({});

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  }, []);

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCount) {
      dispatch(countUpdate(data));
    } else {
      dispatch(countCreate(data));
    }
    closeForm();
  };

  const countsIcons = [formatDataCountsIcons(countsIconsMock)];

  return (
    <>
      {countsDataLoaded ? (
        <div
          className={
            'container rounded-3 shadow-lg p-5 counts-add-page ' +
            (currentCount !== '' ? 'active' : '')
          }
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {currentCount !== '' ? 'Редактирование счёта' : 'Создание счёта'}
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
              value={data.type}
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
            <RadioField
              options={[
                { label: 'Учитывать', value: 'true' },
                { label: 'Не учитывать', value: 'false' },
              ]}
              value={data.totalBalance}
              name="totalBalance"
              onChange={handleChange}
              label="Учитывать счёт в общем балансе"
            />

            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <Button
              type="submit"
              classes="w-100 mx-auto"
              // disabled={isValid || enterError}
            >
              {!currentCount ? 'Создать' : 'Обновить'}
            </Button>
            <Button classes="w-100 mx-auto mt-2" color='warning' onClick={closeForm}>
              Назад
            </Button>
          </form>
        </div>
      ) : (
        'Loading'
      )}
    </>
  );
};

CountsForm.defaultProps = {
  currentCount: '',
};

CountsForm.propTypes = {
  type: PropTypes.string,
  currentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  closeForm: PropTypes.func,
};

export default CountsForm;
