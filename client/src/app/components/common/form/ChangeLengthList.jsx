import React from 'react';
import TextField from './TextField';
import { useTables } from '../../../hooks/useTable';
import localStorageService from '../../../services/localStorage.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../../store/usersSlice';

const ChangeLengthList = () => {
  const { pageSize, setPageSize } = useTables();
  const dispatch = useDispatch();
  const user = useSelector(selectUser());

  const handleChange = ({ target }) => {
    const pageSizeOperations = target.value;
    if (pageSizeOperations < 5) pageSizeOperations = 5;
    if (pageSizeOperations > 100) pageSizeOperations = 100;
    setPageSize(pageSizeOperations);
    localStorageService.setPageSize(pageSizeOperations);
    dispatch(updateUser({ payload: { ...user, pageSizeOperations } }));
  };
  return (
    <TextField
      label="Количество операций на странице"
      name="numOperations"
      type="number"
      value={pageSize}
      onChange={handleChange}
      labelClasses="mb-2"
      inputClasses="shadow-custom text-center"
    />
  );
};

export default ChangeLengthList;
