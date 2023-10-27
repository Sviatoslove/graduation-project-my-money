import React from 'react';
import PropTypes from 'prop-types';
import AddAndUpdateCountForm from './AddAndUpdateCountForm';
import TranslationsForm from './TranslationsForm';

const FormForCount = ({ currentCount, closeForm, type }) => {
  return (
    <>
      {type === 'translationsAdd' ? (
        <TranslationsForm 
        closeForm={closeForm}

        />
      ) : (
        <AddAndUpdateCountForm
          currentCount={currentCount}
          closeForm={closeForm}
        />
      )}
    </>
  );
};

FormForCount.propTypes = {
  currentCount: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  closeForm: PropTypes.func,
  type: PropTypes.string,
};

export default FormForCount;
