import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import AvatarsField from '../../components/common/form/AvatarsField';
import Button from '../../components/common/buttons/Button';
import {
  loadСategoriesIcons,
  categoriesUpdate,
  categoriesCreate,
  selectCategoriesIcons,
  selectCategoriesIconsDataloaded,
} from '../../store/categoriesSlice';
import { useForms } from '../../hooks/useForm';
import colorsIconsForCategories from '../../mock/colorIconsForCategories';
import LoadingSpinners from '../../components/common/LoadingSpinners';
import { formatDataForAvatarsFields } from '../../utils/formatData';

const CategoriesForm = ({ status, categoriesIcons, categories, closeForm }) => {
  const dispatch = useDispatch();
  const { show, idCurrentEssence } = useForms();

  const initialState = idCurrentEssence
    ? categories[idCurrentEssence]
    : {
        name: '',
        content: '',
        icon: '',
        iconColor: 'dark',
        textColor: 'light',
        bgColor: 'primary',
      };
  const [data, setData] = useState(initialState);
  console.log('data:', data);


  const [errors] = useState({});

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const icon = Object.values(categoriesIcons).find(icon=> icon.icon === data.icon)
    console.log('icon:', icon)
    if (idCurrentEssence) {
      dispatch(categoriesUpdate({ ...data, iconId: icon._id}));//!!!!!!!!!!! Потом удалить iconId: icon._id
    } else {
      dispatch(
        categoriesCreate({ ...data, status: status, dataType: 'category', iconId: icon._id})
      );
    }
    closeForm();
  };

  return (
    <>
      {/* { ( */}
        <div
          className={
            'rounded-3 w-516px mh-866px shadow-lg py-3 px-5 wrapper-form ' +
            show
          }
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {idCurrentEssence !== ''
                ? 'Редактирование категории'
                : 'Создание категории'}
            </h3>
            <TextField
              label="Название категории"
              value={data.name}
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Комментарий"
              value={data.content}
              name="content"
              onChange={handleChange}
              error={errors.content}
            />
            <AvatarsField
              label="Выбери аватарку"
              name="icon"
              nameCategory={data.name}
              valueIconColor={data.iconColor}
              valueTextColor={data.textColor}
              valueBgColor={data.bgColor}
              value={data.icon}
              options={formatDataForAvatarsFields(10, categoriesIcons)}
              onChange={handleChange}
            />
            <AvatarsField
              label={'Выбери цвет иконки'}
              name="iconColor"
              value={data.iconColor}
              options={formatDataForAvatarsFields(12, colorsIconsForCategories)}
              onChange={handleChange}
              // error={errors.toCount}
            />
            <AvatarsField
              label={'Выбери цвет текста иконки'}
              name="textColor"
              value={data.textColor}
              options={formatDataForAvatarsFields(12, colorsIconsForCategories)}
              onChange={handleChange}
              // error={errors.toCount}
            />
            <AvatarsField
              label={'Выбери цвет фона иконки'}
              name="bgColor"
              value={data.bgColor}
              options={formatDataForAvatarsFields(12, colorsIconsForCategories)}
              onChange={handleChange}
              // error={errors.toCount}
            />
            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <Button
              type="submit"
              classes="w-100 mx-auto mt-4"
              // disabled={isValid || enterError}
            >
              {!idCurrentEssence ? 'Создать' : 'Обновить'}
            </Button>
            <Button
              classes="w-100 mx-auto mt-2"
              bgColor="warning"
              onClick={closeForm}
            >
              Назад
            </Button>
          </form>
        </div>
      {/* // ) : ( */}
        {/* // <LoadingSpinners number={3} classesSpinner="spinner-grow-lg" /> */}
      {/* // )} */}
    </>
  );
};

CategoriesForm.propTypes = {
  status: PropTypes.string,
  categories: PropTypes.object,
  categoriesIcons: PropTypes.object,
  closeForm: PropTypes.func,
};

export default CategoriesForm;
