import React from 'react';
import CountsForm from './CountsForm';
import TranslationsForm from '../translationsPage/TranslationsForm';
import { useSettings } from '../../hooks/useSettings';

const FormForCount = () => {
  const { typeForm } = useSettings();
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
