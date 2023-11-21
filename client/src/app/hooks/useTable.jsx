import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadOperations,
  selectOperations,
  selectOperationsDataLoaded,
} from '../store/operationsSlice';
import _ from 'lodash';
import { paginate } from '../utils';
import LoadingSpinners from '../components/common/LoadingSpinners';
import { selectIsLoggedIn } from '../store/usersSlice';
import { useSettings } from './useSettings';
import {
  loadCategories,
  selectCategories,
  selectCategoriesDataloaded,
} from '../store/categoriesSlice';
import getDate from '../utils/getDate';
import { loadCounts, selectCounts, selectCountsStatus } from '../store/countsSlice';

const TablesContext = React.createContext();

const useTables = () => useContext(TablesContext);

const TablesProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { statusOperation } = useSettings();
  let filteredCategories = [];

  const [currentPage, setCurrentPage] = useState(1);
  const [masterCount, setMasterCount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' });
  const [dataCategory, setCategoryData] = useState({
    category: '',
  });

  const isLoggedIn = useSelector(selectIsLoggedIn());

  const operations = useSelector(selectOperations());
  const categories = useSelector(selectCategories());
  const counts = useSelector(selectCounts());

  useEffect(() => {
    setCurrentPage(1);
  }, [dataCategory, searchQuery]);

  useEffect(() => {
    if (isLoggedIn) {

    }
  }, [isLoggedIn]);

  const handleChange = ({ target }) => {
    setCategoryData((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSearchChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    if (setSearchQuery) setSearchQuery('');
    if (dataCategory)
      setCategoryData({
        category: '',
      });
  };

  const filterOperations = (data) => {
    if (data) {
      const dataArr = Object.values(data);
      const filteredOper = searchQuery
        ? dataArr.filter((operation) => {
            const ddMmYyyyArr = getDate(operation.date);
            if (!isNaN(Number(searchQuery))) {
              return ddMmYyyyArr.includes(searchQuery.trim());
            }
            return operation.content
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim());
          })
        : dataArr;
      return (
        operations &&
        categories &&
        filteredOper
          .filter((op) => op.countId === masterCount?._id)
          .filter((operation) => {
            if (operation.status === statusOperation) {
              filteredCategories.push(categories[operation?.categoryId]);
              return operation;
            }
          })
          .filter((op) => {
            if (dataCategory.category) {
              if (dataCategory.category === op.categoryId) return op;
            } else return op;
          })
      );
    }
  };

  const filteredOperations = filterOperations(operations);
  const count = filteredOperations?.length;

  const sortedOperations = _.orderBy(
    filteredOperations,
    [sortBy.path],
    [sortBy.order]
  );

  const pageSize = 10;

  const operationCrop = paginate(sortedOperations, currentPage, pageSize);

  useEffect(() => {
    if (count && operationCrop && !operationCrop?.length)
      setCurrentPage((state) => state - 1);
  }, [count]);

  if (isLoggedIn && !categories && categories !== null)
    return <LoadingSpinners number={3} />;

  return (
    <TablesContext.Provider
      value={{
        handleSort,
        sortBy,
        operations,
        operationCrop,
        count,
        pageSize,
        currentPage,
        handlePageChange,
        masterCount,
        setMasterCount,
        dataCategory,
        categories,
        counts,
        handleChange,
        filteredCategories,
        isLoggedIn,
        searchQuery,
        handleSearchChange,
        setSearchQuery,
        filteredOperations,
        clearFilter,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};

TablesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export { TablesProvider, useTables };
