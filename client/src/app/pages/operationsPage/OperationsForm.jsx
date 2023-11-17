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
import { useForms } from '../../hooks/useForms';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import getDate from '../../utils/getDate';
import {
  operationCreate,
  operationUpdate,
  selectErrorOperations,
  selectSuccessNetworkOperations,
} from '../../store/operationsSlice';
import localStorageService from '../../services/localStorage.service';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../components/common/Badge';
import { validatorConfigOperations } from '../../utils/validator';

let categoryId;

const OperationsForm = () => {
  const {
    disAppearanceForm,
    statusOperation,
    currentEssence,
    show,
    setError,
    setSuccessToast,
    setSettingsToast,
  } = useForms();
  const dispatch = useDispatch();
  const successNetworkOperations = useSelector(
    selectSuccessNetworkOperations()
  );
  const errorOperations = useSelector(selectErrorOperations());
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
        date: `${getDate()}T${hour < 10 ? '0' + hour : hour}:${
          minutes < 10 ? '0' + minutes : minutes
        }`,
      };
  const { register, data, handleSubmit, errors } = useAuth(
    {
      defaultState: initialState,
      errors: validatorConfigOperations,
    },
    errorOperations
  );

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
  }, []);

  useEffect(() => {
    if (errorOperations) {
      setError(errorOperations);
      setSettingsToast({
        typeForm: 'operations',
      });
    }
    if (successNetworkOperations) {
      setSuccessToast(successNetworkOperations);
      setSettingsToast({
        badge: (
          <Badge
            key={categories[categoryId]._id}
            icon={categories[categoryId].icon}
            iconSize="fs-1 "
            color={categories[categoryId].bgColor}
            iconColor={categories[categoryId].iconColor}
            classes="br-50 text-center me-2 mb-1"
          />
        ),
        iconSize: '56px',
        timeOut: true,
        typeForm: 'operations',
      });
    }
  }, [errorOperations, successNetworkOperations]);

  const onSubmit = (data) => {
    categoryId = data.defaultState.categoryId;
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
              classesInputGroup={'mh-352px'}
              count={32}
              iconSize="56px"
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
              disabled={!!Object.keys(errors.fields).length || errorOperations}
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
