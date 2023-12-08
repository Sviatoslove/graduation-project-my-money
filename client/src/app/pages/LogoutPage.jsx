import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { countsDestroyed } from '../store/countsSlice';
import { categoriesDestroyed } from '../store/categoriesSlice';
import { operationsDestroyed } from '../store/operationsSlice';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(logOut());
      dispatch(countsDestroyed());
      dispatch(categoriesDestroyed());
      dispatch(operationsDestroyed());
      navigate('/');
  }, []);

  return <h2>Loading...</h2>;
};

export default LogoutPage;
