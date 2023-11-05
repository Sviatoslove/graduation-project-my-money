import React from 'react';
import CountsForm from './CountsForm';
import TranslationsForm from '../translationsPage/TranslationsForm';
import { useForms } from '../../hooks/useForm';

const FormForCount = () => {
  const { typeForm } = useForms();
  return (
    <>
      {typeForm === 'translationsAdd' ? (
        <TranslationsForm />
      ) : (
        <CountsForm />
      )}
    </>
  );
};

export default FormForCount;
