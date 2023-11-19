import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/common/form/TextField';
import AvatarsField from '../../components/common/form/AvatarsField';
import Button from '../../components/common/buttons/Button';
import {
  categoriesUpdate,
  categoriesCreate,
  selectSuccessNetworkCategories,
} from '../../store/categoriesSlice';
import { useSettings } from '../../hooks/useSettings';
import colorsIconsForCategories from '../../mock/colorIconsForCategories';
import { useForms } from '../../hooks/useForms';
import { validatorConfigCategories } from '../../utils/validator';
import Badge from '../../components/common/Badge';

let badge;

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const {
    show,
    disAppearanceForm,
    statusOperation,
    currentEssence,
    setSuccessToast,
    setSettingsToast,
    successToast
  } = useSettings();

  const categoriesIcons = currentEssence['iconsForCategories'];
  const successNetworkCategories = useSelector(
    selectSuccessNetworkCategories()
  );

  const initialState = currentEssence['categories']
    ? currentEssence['categories']
    : {
        name: '',
        content: '',
        icon: '',
        iconColor: 'dark',
        textColor: 'light',
        bgColor: 'primary',
      };
  const { register, data, handleSubmit, errors } = useForms({
    defaultState: initialState,
    errors: validatorConfigCategories,
  });

  useEffect(() => {
    if (successNetworkCategories && successToast === null) {
      setSuccessToast(successNetworkCategories);
      setSettingsToast({
        badge: (
          <Badge
            {...badge}
            iconSize="fs-1 "
            classes="br-50 text-center me-2 ms-3 mb-1"
          />
        ),
        iconSize: '56px',
        timeOut: true,
        typeForm: 'categories',
      });
    }
  }, [successNetworkCategories]);
  
  const onSubmit = (data) => {
    const img = Object.values(categoriesIcons).find(
      (icon) => icon.icon === data.defaultState.icon
    );
    const { bgColor: color, iconColor, icon, _id: key } = data.defaultState;
    badge = { color, iconColor, icon, key };
    if (currentEssence['categories']) {
      dispatch(categoriesUpdate(data.defaultState));
    } else {
      dispatch(
        categoriesCreate({
          ...data.defaultState,
          status: statusOperation,
          dataType: 'categories',
          iconId: img._id,
          like: img.like,
        })
      );
    }
    disAppearanceForm();
  };

  const {
    bgColor: valueBgColor,
    iconColor: valueIconColor,
    name: nameCategory,
    textColor: valueTextColor,
  } = data.defaultState;
  const avatarsFieldProps = {
    valueBgColor,
    valueIconColor,
    nameCategory,
    valueTextColor,
  };

  return (
    <div
      className={
        'rounded-3 w-700px mh-989px shadow-lg py-3 px-5 wrapper-form ' + show
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">
          {currentEssence['categories']
            ? 'Редактирование категории'
            : 'Создание категории'}
        </h3>
        <TextField label="Название категории" {...register('name')} />
        <TextField label="Комментарий" {...register('content')} />
        <AvatarsField
          label="Выбери аватарку"
          {...register('icon')}
          {...avatarsFieldProps}
          options={categoriesIcons}
          count={30}
          iconSize="30px"
        />
        <AvatarsField
          label="Выбери цвет иконки"
          options={colorsIconsForCategories}
          count={12}
          {...register('iconColor')}
        />
        <AvatarsField
          label="Выбери цвет текста иконки"
          options={colorsIconsForCategories}
          count={12}
          {...register('textColor')}
        />
        <AvatarsField
          label="Выбери цвет фона иконки"
          options={colorsIconsForCategories}
          count={12}
          {...register('bgColor')}
        />
        <Button
          type="submit"
          classes="w-100 mx-auto mt-4"
          disabled={!!Object.keys(errors.fields).length}
        >
          {!currentEssence['categories'] ? 'Создать' : 'Обновить'}
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

export default CategoriesForm;
