import React from 'react';
import TextField from './TextField';
import { useTables } from '../../../hooks/useTable';
import localStorageService from '../../../services/localStorage.service';

const ChangeLengthList = () => {
  const { pageSize, setPageSize } = useTables();
  const handleChange = ({ target }) => {
    if (target.value < 5) target.value = 5;
    if (target.value > 100) target.value = 100;
    setPageSize(target.value);
    localStorageService.setPageSize(target.value)
  };
  return (
    <TextField
      label="Количество операций на странице"
      name="numOperations"
      type="number"
      value={pageSize}
      onChange={handleChange}
      labelClasses='mb-2'
      inputClasses="shadow-custom text-center"
    />
  );
};

export default ChangeLengthList;
