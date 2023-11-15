import React, { useEffect } from 'react';
import TextField from '../common/form/TextField';
import CheckboxField from '../common/form/CheckboxField';
import { useDispatch } from 'react-redux';
import { clearError, logIn } from '../../store/usersSlice';
import { useAuth } from '../../hooks/useAuth';
import { useForms } from '../../hooks/useForms';
import { validatorConfigLogin } from '../../utils/validator';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { setToast, loginError } = useForms();
  const { register, handleSubmit, errors } = useAuth(
    {
      defaultState: { email: '', password: '', stayOn: false },
      errors: validatorConfigLogin,
    },
    loginError,
    clearError
  );

  useEffect(() => {
    if (loginError)
      setToast({
        title: 'Сообщение от сервера',
        content: loginError,
        error: true,
        show: 'show',
      });
    if (!loginError && loginError !== null)
      setToast((state) => ({ ...state, show: 'hide' }));
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
        disabled={errors.isValid || loginError}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
