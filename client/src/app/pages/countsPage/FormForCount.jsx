import React from 'react';
import PropTypes from 'prop-types';
import CountsForm from './CountsForm';
import TranslationsForm from '../translationsPage/TranslationsForm';
import { useForms } from '../../hooks/useForm';

const FormForCount = ({ counts, closeForm }) => {
  const { typeForm } = useForms();
  return (
    <>
      {typeForm === 'translationsAdd' ? (
        <TranslationsForm closeForm={closeForm} />
      ) : (
        <CountsForm counts={counts} closeForm={closeForm} />
      )}
    </>
  );
};

FormForCount.propTypes = {
  counts: PropTypes.object,
  closeForm: PropTypes.func,
  type: PropTypes.string,
};

export default FormForCount;
