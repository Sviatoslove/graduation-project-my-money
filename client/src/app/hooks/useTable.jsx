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
import {
  loadCategories,
  selectCategories,
  selectCategoriesDataloaded,
} from '../store/categoriesSlice';

const TablesContext = React.createContext();

const useTables = () => useContext(TablesContext);

const TablesProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { statusOperation } = useForms();
  let filteredCategories = [];

  const [currentPage, setCurrentPage] = useState(1);
  const [masterCount, setMasterCount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'asc' });
  const [dataCategory, setCategoryData] = useState({
    category: '',
  });

  const isLoggedIn = useSelector(selectIsLoggedIn());
  const operationsDataLoading = useSelector(selectOperationsDataLoaded());
  const operations = useSelector(selectOperations());
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categories = useSelector(selectCategories());

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (isLoggedIn && !operationsDataLoading) dispatch(loadOperations());
    if (isLoggedIn && !categoriesDataLoaded) dispatch(loadCategories());
  }, [isLoggedIn]);

  const handleChange = ({ target }) => {
    setCategoryData((state) => ({
      ...state,
      [target.name]: target.value,
    }));
    // setErrors(null)
  };

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
    if (data) {
      const dataArr = Object.values(data);
      const filteredOper = searchQuery
        ? dataArr.filter((operation) =>
            operation.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : dataArr;
      return (
        operations &&
        filteredOper
          .filter((op) => op.countId === masterCount._id)
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

  const pageSize = 11;

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
        setMasterCount,
        dataCategory,
        categories,
        handleChange,
        categoriesDataLoaded,
        filteredCategories,
        isLoggedIn,
        searchQuery,
        handleSearchChange,
        setSearchQuery
      }}
    >
      {/* {!isLoggedIn || operationsDataLoading && categoriesDataLoaded ? (
        children
      ) : (
        <LoadingSpinners style={{ width: '56px', height: '56px' }} number={3} />
      )} */}
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
