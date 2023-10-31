import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import AvatarsField from '../../components/common/form/AvatarsField';
import Button from '../../components/common/Button';
import {
  categoriesUpdate,
  categoriesCreate,
  selectCategoriesDataloaded,
  loadCategories,
  selectCategories,
} from '../../store/categoriesSlice';
import { useForms } from '../../hooks/useForm';
import { formatDataForIconsCategories } from '../../utils';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import getDate from '../../utils/getDate';

const OperationsForm = ({ currentOperation }) => {
  const { disAppearanceForm, statusOperation, handleClick } = useForms();

  const dispatch = useDispatch();
  const { show } = useForms();
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categories = useSelector(selectCategories());
  const filteredCategories =
    categories &&
    Object.values(categories).filter(
      (category) => category.status === statusOperation
    );

  const initialState = currentOperation
    ? currentOperation
    : {
        balance: 0,
        category: '',
        content: '',
        date: getDate(),
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
    if (currentOperation) {
      dispatch(categoriesUpdate(data));
    } else {
      dispatch(categoriesCreate({ ...data, status: statusOperation }));
    }
    disAppearanceForm();
  };

  return (
    <>
      {categoriesDataLoaded ? (
        <div
          className={
            'rounded-3 shadow-lg py-3 px-5 wrapper-form ' +
            show
          }
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {currentOperation !== ''
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
              name="category"
              options={formatDataForIconsCategories(10, filteredCategories)}
              onChange={handleChange}
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
              type="date"
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
              {!currentOperation ? 'Создать' : 'Обновить'}
            </Button>
            <Button
              classes="w-100 mx-auto mt-2"
              color="warning"
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

OperationsForm.defaultProps = {
  currentOperation: '',
};

OperationsForm.propTypes = {
  currentOperation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default OperationsForm;
