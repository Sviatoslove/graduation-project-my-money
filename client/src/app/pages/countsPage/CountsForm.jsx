import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import SelectedField from '../../components/common/form/SelectedField';
import {
  countCreate,
  countUpdate,
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
  selectErrorCounts,
  selectSuccessNetworkCounts,
} from '../../store/countsSlice';
import AvatarsField from '../../components/common/form/AvatarsField';
import currency from '../../mock/currency';
import countsIconsMock from '../../mock/countsIcons';
import Button from '../../components/common/buttons/Button';
import { useForms } from '../../hooks/useForms';
import { formatDataCountsIcons } from '../../utils/formatData';
import { useAuth } from '../../hooks/useAuth';
import { validatorConfigCounts } from '../../utils/validator';

let icon;

const CountsForm = () => {
  const dispatch = useDispatch();
  const {
    show,
    currentEssence,
    disAppearanceForm,
    setSettingsToast,
    setError,
    setSuccessToast,
  } = useForms();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());
  const countsSuccessNetwork = useSelector(selectSuccessNetworkCounts());
  const errorCounts = useSelector(selectErrorCounts());

  const initialState = currentEssence
    ? currentEssence
    : {
        name: '',
        content: '',
        type: '652e4f70498ed451c3f23b9b',
        currency: '67rdca3eeb7f6fgeed471198',
        icon: '',
      };

  const { register, data, handleSubmit, errors } = useAuth(
    {
      defaultState: initialState,
      errors: validatorConfigCounts,
    },
    errorCounts
  );

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  }, []);

  useEffect(() => {
    if (errorCounts) {
      setError(errorCounts);
      setSettingsToast({
        typeForm: 'counts',
      });
    }
    if (countsSuccessNetwork) {
      setSuccessToast(countsSuccessNetwork);
      setSettingsToast({
        imgSrc: icon,
        iconSize: '56px',
        timeOut: true,
        typeForm: 'counts',
      });
    }
  }, [errorCounts, countsSuccessNetwork]);

  const onSubmit = (data) => {
    icon = data.defaultState.icon;
    disAppearanceForm();
    if (currentEssence) {
      dispatch(countUpdate(data.defaultState));
    } else {
      dispatch(countCreate(data.defaultState));
    }
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
              disabled={!!Object.keys(errors.fields).length || errorCounts}
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
