import { useState, useEffect } from 'react';

export const useFields = (essence, data, fields) => {
  const [errorsForm, setErrorsForm] = useState('');
  const checkUniqField = () => {
  const array = fields ? fields : Object.keys(data)
    if (essence) {
      for (const fieldName of array) {
        if (data[fieldName] == essence[fieldName]) {
          setErrorsForm('Измените любое из полей');
        } else {
          setErrorsForm('');
          return;
        }
      }
    }
  };

  useEffect(() => {
    checkUniqField();
  }, [data, essence]);

  return {
    errorsForm,
  };
};
