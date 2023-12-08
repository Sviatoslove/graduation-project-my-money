import React from 'react';
import CountsForm from '../components/ui/forms/CountsForm';
import TranslationsForm from '../components/ui/forms/TranslationsForm';
import { useSettings } from '../hooks/useSettings';
import CategoriesForm from '../components/ui/forms/CategoriesForm';
import OperationsForm from '../components/ui/forms/OperationsForm';
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
