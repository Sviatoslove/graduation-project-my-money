import React from 'react';
import CountsForm from '../pages/countsPage/CountsForm';
import TranslationsForm from '../pages/translationsPage/TranslationsForm';
import { useSettings } from '../hooks/useSettings';
import CategoriesForm from '../pages/categories/CategoriesForm';
import OperationsForm from '../pages/operationsPage/OperationsForm';
import { ContainerShow } from '../components/common/Containers';

const FormLayout = () => {
  const { typeForm } = useSettings();
  return (
    <ContainerShow>
      {typeForm === 'translations' && <TranslationsForm />}
      {typeForm === 'counts' && <CountsForm />}
      {typeForm === 'categories' && <CategoriesForm />}
      {typeForm === 'operations' && <OperationsForm />}
    </ContainerShow>
  );
};

export default FormLayout;
