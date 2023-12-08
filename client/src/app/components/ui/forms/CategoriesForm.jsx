import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../common/form/TextField';
import AvatarsField from '../../common/form/AvatarsField';
import Button from '../../common/buttons/Button';
import {
  categoriesUpdate,
  categoriesCreate,
} from '../../../store/categoriesSlice';
import { useSettings } from '../../../hooks/useSettings';
import colorsIconsForCategories from '../../../mock/colorIconsForCategories';
import { useForms } from '../../../hooks/useForms';
import { validatorConfigCategories } from '../../../utils/validator';
import Badge from '../../common/Badge';
import { selectSuccessNetwork } from '../../../store/usersSlice';
import { useLocation } from 'react-router-dom';
import { SelectedField } from '../../common/form';

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    show,
    disAppearanceForm,
    statusOperation,
    currentEssence,
    setSuccessToast,
    setSettingsToast,
    successToast,
    appearanceForm,
    setTypeForm,
    setCurrentEssence,
    colors,
  } = useSettings();

  const categoriesIcons = currentEssence['iconsForCategories'];
  const successNetwork = useSelector(selectSuccessNetwork());

  const initialState = currentEssence['categories']
    ? currentEssence['categories']
    : {
        name: '',
        content: '',
        icon: '',
        status: statusOperation,
        ...colors,
      };

  const { register, data, handleSubmit, errors, errorsForm } = useForms({
    state: {
      defaultState: initialState,
      errors: validatorConfigCategories,
    },
    essence: currentEssence['categories'],
    fields: [
      'name',
      'content',
      'icon',
      'status',
      'iconColor',
      'textColor',
      'bgColor',
    ],
  });

  useEffect(() => {
    if (successNetwork && successToast === null) {
      setSuccessToast(successNetwork);
      const { bgColor: color, iconColor, icon, _id: key } = data.defaultState;
      const badge = { color, iconColor, icon, key };
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
    const img = Object.values(categoriesIcons).find(
      (icon) => icon.icon === data.defaultState.icon
    );
    if (currentEssence['categories']) {
      dispatch(categoriesUpdate({ payload: data.defaultState }));
    } else {
      dispatch(
        categoriesCreate({
          ...data.defaultState,
          dataType: 'categories',
          iconId: img._id,
          like: img.like,
        })
      );
    }
    if (location.pathname === '/' || location.pathname === '/charts') {
      disAppearanceForm();
      setTimeout(() => {
        setCurrentEssence('');
        setTypeForm('operations');
        appearanceForm();
      }, 501);
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
        'rounded-3 w-700px mh-790px shadow-lg py-3 px-5 wrapper-form ' + show
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
          label="Выбери аватарку"
          {...register('icon')}
          {...avatarsFieldProps}
          options={categoriesIcons}
          count={36}
          iconSize="24px"
        />
        <AvatarsField
          label="Выбери цвет иконки"
          options={colorsIconsForCategories}
          count={23}
          {...register('iconColor')}
        />
        <AvatarsField
          label="Выбери цвет текста иконки"
          options={colorsIconsForCategories}
          count={23}
          {...register('textColor')}
        />
        <AvatarsField
          label="Выбери цвет фона иконки"
          options={colorsIconsForCategories}
          count={23}
          {...register('bgColor')}
        />
        {!errors.isValid && errorsForm && (
          <p className="text-danger text-center">
            <strong>{errorsForm}</strong>
          </p>
        )}
        <Button
          type="submit"
          classes="w-100 mx-auto mt-4"
          disabled={!!Object.keys(errors.fields).length || errorsForm}
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
