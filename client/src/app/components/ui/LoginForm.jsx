import React, { useEffect } from 'react';
import TextField from '../common/form/TextField';
import CheckboxField from '../common/form/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn,
  selectAuthError,
} from '../../store/usersSlice';
import { useAuth } from '../../hooks/useAuth';
import { useForms } from '../../hooks/useForms';
import { validatorConfigLogin } from '../../utils/validator';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { setError, setSettingsToast, timeOut } = useForms();
  const loginError = useSelector(selectAuthError());
  const { register, handleSubmit, errors } = useAuth(
    {
      defaultState: { email: '', password: '', stayOn: false },
      errors: validatorConfigLogin,
    },
    loginError,
  );

  useEffect(() => {
    if (loginError) {
      setError(loginError);
      setSettingsToast({ typeForm: 'auth', timeOut:true });
    }
  }, [loginError]);

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
