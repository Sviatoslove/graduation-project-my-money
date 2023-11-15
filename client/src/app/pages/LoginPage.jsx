import React, { useState } from "react";
import { LoginForm, RegisterForm } from "../components/ui";
import { useForms } from "../hooks/useForms";

const LoginPage = () => {
const {formType, toggleFormType} = useForms()
  return (
    <>
      {formType === "register" ? (
        <>
          <h3 className="mb-4 text-center">Регистрация</h3>
          <RegisterForm />
          <p>
            Вы уже считаете вместе с нами?
            <a className="signUp_button" role="button" onClick={toggleFormType}>
              Продолжить вести учёт
            </a>
          </p>
        </>
      ) : (
        <>
          <h3 className="mb-4 text-center">Вход в аккаунт</h3>
          <LoginForm />
          <p style={{ margin: "5px 0 0 0" }}>
            Вы ещё не с нами?
            <a className="signUp_button" role="button" onClick={toggleFormType}>
              Присоединяйтесь
            </a>
          </p>
        </>
      )}
    </>
  );
};

export default LoginPage;
