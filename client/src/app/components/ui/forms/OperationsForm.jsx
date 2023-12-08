import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../common/form/TextField';
import AvatarsField from '../../common/form/AvatarsField';
import Button from '../../common/buttons/Button';
import {
  selectCategoriesDataloaded,
  loadCategories,
  selectCategories,
} from '../../../store/categoriesSlice';
import { useSettings } from '../../../hooks/useSettings';
import LoadingSpinners from '../../common/LoadingSpinners';
import getDate from '../../../utils/getDate';
import {
  operationCreate,
  operationUpdate,
} from '../../../store/operationsSlice';
import localStorageService from '../../../services/localStorage.service';
import { useForms } from '../../../hooks/useForms';
import Badge from '../../common/Badge';
import { validatorConfigOperations } from '../../../utils/validator';
import { selectSuccessNetwork } from '../../../store/usersSlice';
import { SelectedField } from '../../common/form';
import { useLocation, useNavigate } from 'react-router-dom';

let badge;

const OperationsForm = () => {
  const {
    disAppearanceForm,
    statusOperation,
    currentEssence,
    show,
    setSuccessToast,
    setSettingsToast,
    successToast,
  } = useSettings();
  const dispatch = useDispatch();
  const successNetwork = useSelector(selectSuccessNetwork());
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
        status: statusOperation,
        date: `${getDate().split('.').reverse().join('-')}T${
          hour < 10 ? '0' + hour : hour
        }:${minutes < 10 ? '0' + minutes : minutes}`,
        dataType: 'operations',
      };
  const { register, data, handleSubmit, errors, errorsForm } = useForms({
    state: {
      defaultState: initialState,
      errors: validatorConfigOperations,
    },
    essence: currentEssence,
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
    } = categories[data.defaultState.categoryId];
    badge = { color, iconColor, icon, key };
    if (currentEssence) {
      dispatch(operationUpdate(data.defaultState));
    } else {
      const countId = localStorageService.getMasterCount();
      const newOperation = {
        ...data.defaultState,
        countId,
        userId: localStorageService.getUserId(),
      };
      if (countId) dispatch(operationCreate({ payload: newOperation }));
      else
        dispatch(
          operationCreate({ payload: newOperation, contentError: countId })
        );
    }
    disAppearanceForm();
  };

  return (
    <div
      className={
        'top-50 rounded-3 w-664px shadow-lg py-3 px-5 wrapper-form ' + show
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">
          {currentEssence ? 'Редактирование операции' : 'Создание операции'}
        </h3>
        <TextField label="Сумма" {...register('balance')} />
        <SelectedField
          label="Выбери статус категории расходы/доходы"
          options={[
            { name: 'Расходы', _id: 'decrement' },
            { name: 'Доходы', _id: 'increment' },
          ]}
          value={statusOperation}
          {...register('status')}
        />
        <AvatarsField
          label="Выбери категорию"
          options={filteredCategories}
          classesInputGroup={''}
          count={16}
          iconSize="30px"
          {...register('categoryId')}
        />
        <TextField label="Комментарий" {...register('content')} />
        <TextField label="Дата" type="datetime-local" {...register('date')} />
        {!errors.isValid &&errorsForm && (
          <p className="text-danger text-center">
            <strong>{errorsForm}</strong>
          </p>
        )}
        <Button
          type="submit"
          classes="w-100 mx-auto mt-2"
          disabled={!!Object.keys(errors.fields).length || errorsForm}
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
  );
};

export default OperationsForm;
