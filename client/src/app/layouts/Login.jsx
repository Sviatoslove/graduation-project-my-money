import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import { LoginForm, RegisterForm } from '../components/ui';

const Login = () => {

  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((state) => (state === 'register' ? 'login' : 'register'))
  }

  return (
    <Container>
      {formType === 'register' ? (
            <>
              <h3 className='mb-4 text-center'>Регистрация</h3>
              <RegisterForm />
              <p>
                Вы уже считаете вместе с нами?
                <a className='signUp_button' role='button' onClick={toggleFormType}>
                  Продолжить вести учёт
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className='mb-4 text-center'>Вход в аккаунт</h3>
              <LoginForm />
              <p style={{margin:'5px 0 0 0'}}>
                Вы ещё не с нами?
                <a className='signUp_button' role='button' onClick={toggleFormType}>
                  Присоединяйтесь
                </a>
              </p>
            </>
          )}
    </Container>
  );
};

export default Login;
