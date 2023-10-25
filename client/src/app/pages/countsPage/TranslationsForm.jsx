import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  CurrencyField,
  SelectedField,
  TextField,
} from '../../components/common/form';
import Button from '../../components/common/Button';
import { selectCounts } from '../../store/countsSlice';
import getDate from '../../utils/getDate';
import currency from '../../mock/currency';
import getExchangeRates from '../../utils/getExchangeRates';

const TranslationsForm = ({ closeForm }) => {
  const [convertCurrency, setConvertCurrency] = useState();
  const [pending, setPending] = useState(false);
  console.log('pending:', pending);
  const [valueConverted, setValueConverted] = useState();
  console.log('valueConverted:', valueConverted);
  const [data, setData] = useState({
    fromCount: '0',
    toCount: '',
    content: '',
    date: getDate(),
    balanceFromCount: 0,
    balanceToCount: 0,
  });

  const counts = {
    '0': {
      name: 'Пополнение счёта',
      _id: '0',
      currency: '67rdca3eeb7f6fgeed471198',
    },
    ...useSelector(selectCounts()),
  };
  
  const fromCurrency = currency[counts[data.fromCount].currency];
  console.log('fromCurrency:', fromCurrency)
  const toCurrency = currency[counts[data?.toCount]?.currency];
  console.log('toCurrency:', toCurrency)

  useEffect(() => {
    if (data.toCount) {
      const countFrom = counts.find((count) => data.fromCount === count._id);
      const countTo = counts.find((count) => data.toCount === count._id);
      if (countFrom.currency !== countTo.currency) setConvertCurrency(true);
      else setConvertCurrency(false);
    }
    data.balanceFromCount = 0;
    setValueConverted('');
  }, [data.fromCount, data.toCount]);

  useEffect(() => {
    if (valueConverted > 0) setValueConverted('');
  }, [data.balanceFromCount]);

  const handleChange = ({ target }) => {
    // console.log('target:', target)

    setData((state) => ({
      ...state,
      [target.name]: target.value,
    }));
    // setErrors(null)
  };

  // console.log('data:', data);

  const handleConverter = async () => {
    setPending(true);
    const { result } = await getExchangeRates(
      fromCurrency,
      toCurrency,
      data.balanceFromCount,
      data.date
    );
    setValueConverted(Math.floor(result));
    setPending(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...data, currency: '' };

    console.log('data:', data);

    // closeForm();
  };

  return (
    <div className="container rounded-3 shadow-lg p-5 counts-add-page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Создайте перевод</h3>
        <SelectedField
          name="fromCount"
          type="translations"
          label="Название счёта с которого хотите перевести"
          value={data.fromCount}
          valueTwo={data.toCount}
          options={counts}
          onChange={handleChange}
          // error={errors.fromCount}
        />
        <SelectedField
          name="toCount"
          type="translations"
          label="Название счёта на который хотите перевести"
          value={data.toCount}
          valueTwo={data.fromCount}
          options={Object.values(counts).slice(1)}
          onChange={handleChange}
          // error={errors.toCount}
        />
        <TextField
          name="content"
          label="Комментарий"
          value={data.content}
          onChange={handleChange}
          // error={errors.content}
        />
        <div className='d-flex'>
          <CurrencyField
            name="balanceFromCount"
            type="number"
            label="Сумма для перевода"
            value={data.balanceFromCount}
            icon={fromCurrency?.icon}
            onChange={handleChange}
            // error={errors.date}
          />
          {convertCurrency && (
            <CurrencyField
              name="balanceToCount"
              type="text"
              label="Значение по курсу"
              value={
                !valueConverted
                  ? pending
                    ? 'Loading...'
                    : '0'
                  : valueConverted
              }
              icon={toCurrency?.icon}
              convert={convertCurrency}
              onChange={handleChange}
              handleClick={handleConverter}
              // error={errors.date}
            />
          )}
        </div>
        {convertCurrency && (
          <Button
            outline={true}
            color="success"
            classes={'mb-3 br-5 w-100'}
            disabled={!data.balanceFromCount > 0}
            onClick={handleConverter}
          >
            Конвертировать
          </Button>
        )}
        <TextField
          name="date"
          type="date"
          label="Дата"
          value={data.date}
          onChange={handleChange}
          // error={errors.date}
        />

        {/* {enterError && <p className="text-danger">{enterError}</p>} */}
        <Button
          type="submit"
          dataType="create"
          classes="w-100 mx-auto"
          // disabled={isValid || enterError}
        >
          Создать
        </Button>
        <Button
          classes="w-100 mx-auto mt-2"
          color="warning"
          onClick={closeForm}
        >
          Назад
        </Button>
      </form>
    </div>
  );
};

TranslationsForm.propTypes = {
  closeForm: PropTypes.func,
};

export default TranslationsForm;
