import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrencyField,
  SelectedField,
  TextField,
} from '../../components/common/form';
import Button from '../../components/common/buttons/Button';
import {
  selectCounts,
} from '../../store/countsSlice';
import getDate from '../../utils/getDate';
import currency from '../../mock/currency';
import getExchangeRates from '../../utils/getExchangeRates';
import {
  translationCreate,
} from '../../store/translationsSlice';
import LoadingBtn from '../../components/common/LoadingBtn';
import { useSettings } from '../../hooks/useSettings';
import { useForms } from '../../hooks/useForms';
import { validatorConfigTranslations } from '../../utils/validator';
import { selectSuccessNetwork } from '../../store/usersSlice';

const TranslationsForm = () => {
  const dispatch = useDispatch();
  const {
    show,
    disAppearanceForm,
    setSettingsToast,
    setSuccessToast,
    successToast
  } = useSettings();
  const inputBalanceTo = useRef();
  const [convertCurrency, setConvertCurrency] = useState();
  const [pending, setPending] = useState(false);
  const [valueConverted, setValueConverted] = useState();
  const successNetwork = useSelector(
    selectSuccessNetwork()
  );

  const { register, data, handleSubmit, errors } = useForms(
    {
      defaultState: {
        fromCount: '0',
        toCount: '',
        content: '',
        date: getDate().split('.').reverse().join('-'),
        balanceFrom: 0,
        balanceTo: 0,
        dataType: 'translations'
      },
      errors: validatorConfigTranslations,
    },
    '',
    valueConverted
  );

  const counts = {
    0: {
      name: 'Пополнение счёта',
      _id: '0',
    },
    ...useSelector(selectCounts()),
  };

  useEffect(() => {
    if (successNetwork && successToast === null) {
      setSuccessToast(successNetwork);
      setSettingsToast({
        type: 'successNetwork',
      });
    }
  }, [successNetwork]);

  const currencyIdFrom = counts[data.defaultState?.fromCount]?.currency;
  const fromCurrency = currency[currencyIdFrom];
  const currencyIdTo = counts[data.defaultState?.toCount]?.currency;
  const toCurrency = currency[currencyIdTo];

  useEffect(() => {
    if (data.defaultState.toCount) {
      const countFrom = counts[data.defaultState.fromCount];
      const countTo = counts[data.defaultState.toCount];
      if (countFrom.currency !== countTo.currency) setConvertCurrency(true);
      else setConvertCurrency(false);
    }
    if (data.defaultState.fromCount === '0') setConvertCurrency(false);
    setValueConverted('');
  }, [data.defaultState.fromCount, data.defaultState.toCount]);

  useEffect(() => {
    if (valueConverted > 0) setValueConverted('');
  }, [data.defaultState.balanceFrom]);

  const handleConverter = async () => {
    setPending(true);
    const { result } = await getExchangeRates(
      fromCurrency,
      toCurrency,
      data.defaultState.balanceFrom,
      data.defaultState.date
    );
    setValueConverted(Math.floor(result));
    setPending(false);
  };

  const onSubmit = (data) => {
    disAppearanceForm()
    let balanceTo = valueConverted;
    if (data.defaultState.fromCount === '0' || fromCurrency === toCurrency)
      balanceTo = data.defaultState.balanceFrom;
    const newData = { ...data.defaultState, balanceTo: balanceTo };
    dispatch(translationCreate(newData));
  };
  
  return (
    <div
      className={
        'rounded-3 w-664px h-content shadow-lg p-5 wrapper-form ' + show
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">Создайте перевод</h3>
        <SelectedField
          label="Название счёта с которого хотите перевести"
          valueTwo={data.defaultState.toCount}
          options={Object.values(counts)}
          {...register('fromCount')}
        />
        <SelectedField
          label="Название счёта на который хотите перевести"
          valueTwo={data.defaultState.fromCount}
          options={Object.values(counts).slice(1)}
          {...register('toCount')}
        />
        <TextField label="Комментарий" {...register('content')} />
        <div className="d-flex">
          <div className="w-100">
            <CurrencyField
              label="Сумма для перевода"
              type="number"
              {...register('balanceFrom')}
              balance={
                data.defaultState.fromCount !== '0' &&
                counts[data.defaultState?.fromCount]?.balance
              }
              value={
                data.defaultState.fromCount !== '0' &&
                counts[data.defaultState.fromCount].balance <
                  data.defaultState.balanceFrom
                  ? counts[data.defaultState.fromCount].balance
                  : data.defaultState.balanceFrom
              }
              icon={
                data.defaultState.fromCount === '0'
                  ? toCurrency?.icon
                  : fromCurrency?.icon
              }
            />
          </div>
          {convertCurrency && (
            <CurrencyField
              label="Значение по курсу"
              type="text"
              {...register('balanceTo')}
              value={!valueConverted ? '0' : valueConverted}
              icon={toCurrency?.icon}
              convert={convertCurrency}
              handleClick={handleConverter}
              inputBalanceTo={inputBalanceTo}
            />
          )}
        </div>
        <Button
          outline={true}
          bgColor="success"
          classes={
            'mb-3 br-5 w-100' + (convertCurrency ? ' opacity-1' : ' opacity-0')
          }
          disabled={!data.defaultState.balanceFrom > 0}
          onClick={handleConverter}
        >
          {pending ? (
            <LoadingBtn label="Секундочку, уже скоро пересчитаю..." />
          ) : (
            'Конвертировать'
          )}
        </Button>
        <TextField label="Дата" type="date" {...register('date')} />
        <Button
          type="submit"
          dataType="create"
          classes="w-100 mx-auto"
          disabled={!!(Object.keys(errors.fields).length - (valueConverted ? 0 : 1))}
        >
          Создать
        </Button>
        <Button
          classes="w-100 mx-auto mt-2"
          bgColor="warning"
          onClick={disAppearanceForm}
        >
          Назад
        </Button>
      </form>
    </div>
  );
};

export default TranslationsForm;
