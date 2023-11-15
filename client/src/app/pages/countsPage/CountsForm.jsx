import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import SelectedField from '../../components/common/form/SelectedField';
import {
  clearErrorCounts,
  countCreate,
  countUpdate,
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
} from '../../store/countsSlice';
import AvatarsField from '../../components/common/form/AvatarsField';
import currency from '../../mock/currency';
import countsIconsMock from '../../mock/countsIcons';
import Button from '../../components/common/buttons/Button';
import { useForms } from '../../hooks/useForms';
import { formatDataCountsIcons } from '../../utils/formatData';
import { useAuth } from '../../hooks/useAuth';
import { validatorConfigCounts } from '../../utils/validator';

const CountsForm = () => {
  const dispatch = useDispatch();
  const { show, currentEssence, disAppearanceForm, errorCounts } = useForms();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());

  const initialState = currentEssence
    ? currentEssence
    : {
        name: '',
        content: '',
        type: '652e4f70498ed451c3f23b9b',
        currency: '67rdca3eeb7f6fgeed471198',
        icon: '',
      };

  const { register, handleSubmit, errors } = useAuth(
    {
      defaultState: initialState,
      errors: validatorConfigCounts,
    },
    errorCounts,
    clearErrorCounts
  );

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  }, []);

  const onSubmit = (data) => {
    if (currentEssence) {
      dispatch(countUpdate(data));
    } else {
      dispatch(countCreate(data));
    }
    disAppearanceForm();
  };

  const countsIcons = formatDataCountsIcons(countsIconsMock);

  return (
    <>
      {countsDataLoaded ? (
        <div className={'rounded-3 w-700px shadow-lg p-5 wrapper-form ' + show}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">
              {currentEssence ? 'Редактирование счёта' : 'Создание счёта'}
            </h3>
            <TextField label="Название счёта" {...register('name')} />
            <TextField label="Комментарий" {...register('content')} />
            <SelectedField
              label="Выбери тип счёта"
              options={countsData}
              {...register('type')}
            />
            <SelectedField
              label="Выбери валюту счёта"
              options={currency}
              {...register('currency')}
            />
            <AvatarsField
              label="Выбери аватарку"
              options={countsIcons}
              count={16}
              {...register('icon')}
            />
            <Button
              type="submit"
              classes="w-100 mx-auto"
              disabled={errors.isValid || errorCounts}
            >
              {!currentEssence ? 'Создать' : 'Обновить'}
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
      ) : (
        'Loading'
      )}
    </>
  );
};

export default CountsForm;
