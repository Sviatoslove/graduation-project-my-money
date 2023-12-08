import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '../../common/form/TextField';
import RadioField from '../../common/form/RadioField';
import CheckboxField from '../../common/form/CheckboxField';
import { selectError, signUp } from '../../../store/usersSlice';
import { validatorConfigRegister } from '../../../utils/validator';
import { useForms } from '../../../hooks/useForms';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const errorRegister = useSelector(selectError());
  const { register, handleSubmit, errors } = useForms(
   { state: {
      defaultState: {
        email: '',
        name: '',
        password: '',
        sex: 'male',
        stayOn: false,
        license: false,
      },
      errors: validatorConfigRegister,
    },
   error: errorRegister
  });

  const onSubmit = (data, path) => {
    if (errors.isValid) return;
    dispatch(signUp({ payload: data.defaultState, path }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Электронная почта" {...register('email')} />
      <TextField label="Имя" {...register('name')} />
      <TextField label="Пароль" type="password" {...register('password')} />
      <RadioField
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
        {...register('sex')}
      />
      <CheckboxField {...register('stayOn')}>
        Оставаться в системе
      </CheckboxField>
      <CheckboxField {...register('license')}>
        Согласен с <a href="">лицензионным соглашением</a>
      </CheckboxField>
      <button
        type="submit"
        disabled={Object.keys(errors.fields).length || errorRegister}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default RegisterForm;
