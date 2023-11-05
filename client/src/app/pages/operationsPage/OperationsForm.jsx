import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import AvatarsField from '../../components/common/form/AvatarsField';
import Button from '../../components/common/buttons/Button';
import {
  categoriesUpdate,
  categoriesCreate,
  selectCategoriesDataloaded,
  loadCategories,
  selectCategories,
} from '../../store/categoriesSlice';
import { useForms } from '../../hooks/useForm';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import getDate from '../../utils/getDate';
import { operationCreate, operationUpdate } from '../../store/operationsSlice';
import localStorageService from '../../services/localStorage.service';

const OperationsForm = () => {
  const { disAppearanceForm, statusOperation, currentEssence } = useForms();
  const dispatch = useDispatch();
  const { show } = useForms();
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categories = useSelector(selectCategories());
  const filteredCategories =
    categories &&
    Object.values(categories).filter(
      (category) => category.status === statusOperation
    );

  const [hour, minutes] = [new Date().getHours(), new Date().getMinutes()];

  const initialState = currentEssence
    ? currentEssence
    : {
        balance: 0,
        categoryId: '',
        content: '',
        date: `${getDate()}T${hour < 10 ? '0' + hour : hour}:${
          minutes < 10 ? '0' + minutes : minutes
        }`,
      };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
  }, []);

  const [errors] = useState({});

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEssence) {
      dispatch(operationUpdate(data));
    } else {
      dispatch(
        operationCreate({
          ...data,
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
            'rounded-3 w-664px shadow-lg py-3 px-5 wrapper-form ' + show
          }
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {currentEssence
                ? 'Редактирование операции'
                : 'Создание операции'}
            </h3>
            <TextField
              label="Сумма"
              value={data.balance}
              name="balance"
              onChange={handleChange}
              error={errors.balance}
            />
            <AvatarsField
              label="Выбери категорию"
              name="categoryId"
              value={data.categoryId}
              options={filteredCategories}
              onChange={handleChange}
              count={12}
            />
            <TextField
              label="Комментарий"
              value={data.content}
              name="content"
              onChange={handleChange}
              error={errors.content}
            />
            <TextField
              name="date"
              type="datetime-local"
              label="Дата"
              value={data.date}
              onChange={handleChange}
              // error={errors.date}
            />

            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <Button
              type="submit"
              classes="w-100 mx-auto mt-4"
              // disabled={isValid || enterError}
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
        <LoadingSpinners number={3} classesSpinner="spinner-grow-lg" />
      )}
    </>
  );
};

export default OperationsForm;
