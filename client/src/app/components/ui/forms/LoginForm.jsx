import React, { useEffect } from 'react';
import TextField from '../../common/form/TextField';
import CheckboxField from '../../common/form/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn,
  selectError,
} from '../../../store/usersSlice';
import { useForms } from '../../../hooks/useForms';
import { validatorConfigLogin } from '../../../utils/validator';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(selectError());
  const { register, handleSubmit, errors } = useForms({
    state: {
      defaultState: { email: '', password: '', stayOn: false },
      errors: validatorConfigLogin,
    },
    error: loginError,
  });

  const onSubmit = (data, path) => {
    if (errors.isValid) return;
    dispatch(logIn({ payload: data.defaultState, path }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Электронная почта" {...register('email')} />
      <TextField label="Пароль" type="password" {...register('password')} />
      <CheckboxField {...register('stayOn')}>
        Оставаться в системе
      </CheckboxField>
      <button
        type="submit"
        disabled={Object.keys(errors.fields).length || loginError}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
