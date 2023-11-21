import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadUser,
  selectIsLoggedIn,
  selectUser,
  selectUserLoadingStatus,
} from '../../../store/usersSlice';
import localStorageService from '../../../services/localStorage.service';
import LoadingSpinners from '../../common/LoadingSpinners';
import {
  loadCategories,
  selectCategoriesDataloaded,
} from '../../../store/categoriesSlice';
import {
  loadOperations,
  selectOperationsDataLoaded,
} from '../../../store/operationsSlice';
import { loadCounts, selectCountsStatus } from '../../../store/countsSlice';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const usersLoadingStatus = useSelector(selectUserLoadingStatus());
  const operationsDataLoaded = useSelector(selectOperationsDataLoaded());
  const countsDataLoaded = useSelector(selectCountsStatus());
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const user = useSelector(selectUser());
  const masterCount = user?.masterCount;

  if (masterCount) localStorageService.setMasterCount(masterCount);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUser());
      if (!operationsDataLoaded) dispatch(loadOperations());
      if (!categoriesDataLoaded) dispatch(loadCategories());
      if (!countsDataLoaded) dispatch(loadCounts());
    }
  }, []);

  if (
    !operationsDataLoaded &&
    !categoriesDataLoaded &&
    !countsDataLoaded
  ) {
    return (
      <LoadingSpinners
        style={{ width: '96px', height: '96px' }}
        classesSpinner=""
        number={5}
      />
    );
  }
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
