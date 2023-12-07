import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser, updateUser } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { countsDestroyed } from '../store/countsSlice';
import { categoriesDestroyed } from '../store/categoriesSlice';
import { operationsDestroyed } from '../store/operationsSlice';
import localStorageService from '../services/localStorage.service';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser());
  const pageSizeOperationsUser = user?.pageSizeOperations;
  const pageSizeOperations = localStorageService.getPageSize();

  useEffect(() => {
    if (
      pageSizeOperationsUser === undefined ||
      pageSizeOperationsUser !== pageSizeOperations
    ) {
      dispatch(updateUser({payload:{ ...user, pageSizeOperations }}));
    }
    setTimeout(()=>{
      dispatch(logOut());
      dispatch(countsDestroyed());
      dispatch(categoriesDestroyed());
      dispatch(operationsDestroyed());
      navigate('/');
    },0)
  }, []);

  return <h2>Loading...</h2>;
};

export default LogoutPage;
