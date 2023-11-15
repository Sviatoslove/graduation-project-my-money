import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '../common/form/TextField';
import RadioField from '../common/form/RadioField';
import CheckboxField from '../common/form/CheckboxField';
import { clearError, signUp } from '../../store/usersSlice';
import { validatorConfigRegister } from '../../utils/validator';
import { useForms } from '../../hooks/useForms';
import { useAuth } from '../../hooks/useAuth';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { errorRegister, setToast } = useForms();

  const { register, handleSubmit, errors } = useAuth(
    {
      defaultState: {
        email: '',
        name: '',
        password: '',
        sex: 'male',
        license: false,
      },
      errors: validatorConfigRegister,
    },
    errorRegister,
    clearError
  );

  useEffect(() => {
    if (errorRegister)
      setToast({
        title: 'Сообщение от сервера',
        content: errorRegister,
        error: true,
        show: 'show',
      });
    if (!errorRegister && errorRegister !== null)
      setToast((state) => ({ ...state, show: 'hide' }));
  }, [errorRegister]);

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
      <CheckboxField {...register('license')}>
        Согласен с <a href="">лицензионным соглашением</a>
      </CheckboxField>
      <button
        type="submit"
        disabled={errors.isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default RegisterForm;
