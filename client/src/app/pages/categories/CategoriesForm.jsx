import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import AvatarsField from '../../components/common/form/AvatarsField';
import Button from '../../components/common/buttons/Button';
import {
  categoriesUpdate,
  categoriesCreate,
} from '../../store/categoriesSlice';
import { useForms } from '../../hooks/useForms';
import colorsIconsForCategories from '../../mock/colorIconsForCategories';

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const {
    show,
    disAppearanceForm,
    statusOperation,
    currentEssence,
  } = useForms();

  const categoriesIcons = currentEssence['iconsForCategories'];
  console.log('categoriesIcons:', categoriesIcons)

  const initialState = currentEssence['category']
    ? currentEssence['category']
    : {
        name: '',
        content: '',
        icon: '',
        iconColor: 'dark',
        textColor: 'light',
        bgColor: 'primary',
      };
  const [data, setData] = useState(initialState);

  const [errors] = useState({});

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const icon = Object.values(categoriesIcons).find(
      (icon) => icon.icon === data.icon
    );
    if (currentEssence['category']) {
      dispatch(categoriesUpdate(data));
    } else {
      dispatch(
        categoriesCreate({
          ...data,
          status: statusOperation,
          dataType: 'category',
          iconId: icon._id,
          like: icon.like,
        })
      );
    }
    disAppearanceForm();
  };

  return (
    <>
      {/* { ( */}
      <div
        className={
          'rounded-3 w-700px mh-989px shadow-lg py-3 px-5 wrapper-form ' + show
        }
      >
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">
            {currentEssence['category']
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
            options={categoriesIcons}
            count={40}
            onChange={handleChange}
            classesInputGroup={'mh-352px'}
          />
          <AvatarsField
            label={'Выбери цвет иконки'}
            name="iconColor"
            value={data.iconColor}
            options={colorsIconsForCategories}
            count={12}
            onChange={handleChange}
            // error={errors.toCount}
          />
          <AvatarsField
            label={'Выбери цвет текста иконки'}
            name="textColor"
            value={data.textColor}
            options={colorsIconsForCategories}
            count={12}
            onChange={handleChange}
            // error={errors.toCount}
          />
          <AvatarsField
            label={'Выбери цвет фона иконки'}
            name="bgColor"
            value={data.bgColor}
            options={colorsIconsForCategories}
            count={12}
            onChange={handleChange}
            // error={errors.toCount}
          />
          {/* {enterError && <p className="text-danger">{enterError}</p>} */}
          <Button
            type="submit"
            classes="w-100 mx-auto mt-4"
            // disabled={isValid || enterError}
          >
            {!currentEssence['category'] ? 'Создать' : 'Обновить'}
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
      {/* // ) : ( */}
      {/* // <LoadingSpinners number={3} classesSpinner="spinner-grow-lg" /> */}
      {/* // )} */}
    </>
  );
};

export default CategoriesForm;
