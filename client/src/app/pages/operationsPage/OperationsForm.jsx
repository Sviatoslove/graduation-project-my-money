import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import AvatarsField from '../../components/common/form/AvatarsField';
import Button from '../../components/common/buttons/Button';
import {
  selectCategoriesDataloaded,
  loadCategories,
  selectCategories,
} from '../../store/categoriesSlice';
import { useSettings } from '../../hooks/useSettings';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import getDate from '../../utils/getDate';
import {
  operationCreate,
  operationUpdate,
} from '../../store/operationsSlice';
import localStorageService from '../../services/localStorage.service';
import { useForms } from '../../hooks/useForms';
import Badge from '../../components/common/Badge';
import { validatorConfigOperations } from '../../utils/validator';
import { selectSuccessNetwork } from '../../store/usersSlice';

let badge;

const OperationsForm = () => {
  const {
    disAppearanceForm,
    statusOperation,
    currentEssence,
    show,
    setSuccessToast,
    setSettingsToast,
    successToast
  } = useSettings();
  const dispatch = useDispatch();
  const successNetwork = useSelector(
    selectSuccessNetwork()
  );
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categories = useSelector(selectCategories());
  const filteredCategories =
    categories &&
    Object.values(categories).filter(
      (category) => category.status === statusOperation
    );

  const [hour, minutes] = [new Date().getHours(), new Date().getMinutes()];

  const initialState = currentEssence
    ? { ...currentEssence, prevBalance: currentEssence.balance }
    : {
        balance: 0,
        categoryId: '',
        content: '',
        date: `${getDate().split('.').reverse().join('-')}T${
          hour < 10 ? '0' + hour : hour
        }:${minutes < 10 ? '0' + minutes : minutes}`,
        dataType: 'operations'
      };
  const { register, data, handleSubmit, errors } = useForms({
    defaultState: initialState,
    errors: validatorConfigOperations,
  });

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
  }, []);

  useEffect(() => {
    if (successNetwork && successToast === null) {
      setSuccessToast(successNetwork);
      setSettingsToast({
        badge: (
          <Badge
            {...badge}
            iconSize="fs-1 "
            classes="br-50 text-center me-2 ms-3 mb-1"
          />
        ),
        iconSize: '56px',
        type: 'successNetwork',
      });
    }
  }, [successNetwork]);

  const onSubmit = (data) => {
    const {
      bgColor: color,
      iconColor,
      icon,
      _id: key,
    } = categories[data.defaultState.categoryId]
    badge = { color, iconColor, icon, key };
    if (currentEssence) {
      dispatch(operationUpdate(data.defaultState));
    } else {
      dispatch(
        operationCreate({
          ...data.defaultState,
          status: statusOperation,
          countId: localStorageService.getMasterCount(),
          userId: localStorageService.getUserId(),
        })
      );
    }
    disAppearanceForm();
  };

  return (
    <>
      {categoriesDataLoaded ? (
        <div
          className={
            'top-60 rounded-3 w-664px shadow-lg py-3 px-5 wrapper-form ' + show
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">
              {currentEssence ? 'Редактирование операции' : 'Создание операции'}
            </h3>
            <TextField label="Сумма" {...register('balance')} />
            <AvatarsField
              label="Выбери категорию"
              options={filteredCategories}
              classesInputGroup={''}
              count={30}
              iconSize="30px"
              {...register('categoryId')}
            />
            <TextField label="Комментарий" {...register('content')} />
            <TextField
              label="Дата"
              type="datetime-local"
              {...register('date')}
            />
            <Button
              type="submit"
              classes="w-100 mx-auto mt-4"
              disabled={!!Object.keys(errors.fields).length}
            >
              {currentEssence ? 'Обновить' : 'Создать'}
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
        <LoadingSpinners number={3} classesSpinner="spinner-grow-lg" />
      )}
    </>
  );
};

export default OperationsForm;
