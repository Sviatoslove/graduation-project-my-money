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
import { useForms } from './useForm';
import localStorageService from '../services/localStorage.service';

const TablesContext = React.createContext();

const useTables = () => useContext(TablesContext);

const TablesProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {statusOperation} = useForms()
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const operationsDataLoading = useSelector(selectOperationsDataLoaded());
  const operations = useSelector(selectOperations());
  const [currentPage, setCurrentPage] = useState(1);
  const [masterCount, setMasterCount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'asc' });

  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (isLoggedIn && !operationsDataLoading) dispatch(loadOperations());
  }, [isLoggedIn]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleCategoriesSelect = (item) => {
    if (setSearchQuery) setSearchQuery('');
    setSelectedCategory(item);
  };

  const handleSearchChange = ({ target }) => {
    if (setSelectedCategory) setSelectedCategory();
    setSearchQuery(target.value);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    if (setSearchQuery) setSearchQuery('');
    setSelectedCategory();
  };

  const filterOperations = (data) => {
    if(data) {
      const dataArr = Object.values(data)
      const filteredOper = searchQuery
      ? dataArr.filter((operation) =>
          operation.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedCategory
      ? dataArr.filter((operation) =>
          (operation.category, selectedCategory._id) ? operation.category : ''
        )
      : dataArr;
    return (
      operations &&
      filteredOper.filter((operation) => operation.status === statusOperation).filter(op=> op.countId === masterCount._id)
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

  const operationCrop = paginate(sortedOperations, currentPage, pageSize);

  return (
    <TablesContext.Provider
      value={{
        selectedCategory,
        handleSort,
        sortBy,
        operations,
        operationCrop,
        count,
        pageSize,
        currentPage,
        handlePageChange,
        masterCount,
        setMasterCount
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
