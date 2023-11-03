import React, { useEffect } from 'react';
import Table from '../common/table/Table';
import CategoryCard from '../../pages/categories/CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCategories,
  selectCategories,
  selectCategoriesDataloaded,
} from '../../store/categoriesSlice';
import LoadingSpinners from '../common/LoadingSpinners';

const OperationsTable = () => {
  const dispatch = useDispatch();
  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categories = useSelector(selectCategories());
  const categorySettings = (id) => {
    return {
      ...categories[id],
      classesForIcon: 'fs-42px me-2',
      classesForWrapp: 'd-flex align-items-center px-4 w-300px',
      classesForCardBody: '',
      classesForName: 'mx-auto ',
    };
  };

  useEffect(() => {
    if (!categoriesDataLoaded) dispatch(loadCategories());
  }, []);

  if (!categoriesDataLoaded)
    return (
      <LoadingSpinners number={3} style={{ width: '56px', height: '56px' }} />
    );

  const columns = {
    number: {
      name: 'Номер',
      component: (operation, idx) => idx + 1,
    },
    time: {
      path: 'date',
      name: 'Время',
      component: (operation) => operation.date.split('T')[1],
    },
    date: {
      name: 'Дата',
      component: (operation) =>
        operation.date
          .split('T')[0]
          .replaceAll('-', '.')
          .split('.')
          .reverse()
          .join('.'),
    },
    category: {
      name: 'Категория',
      component: (operation) => (categories[operation.categoryId] ? 
        <CategoryCard
          table={'true'}
          {...categorySettings(operation?.categoryId)}
        /> : 'category not found'
      ),
    },
    content: {
      name: 'Примечание',
      component: (operation) => (categories[operation.categoryId] ?
        <p className="w-80 mx-auto text-secondary">
          {!categories[operation.categoryId].content &&
            'Ничего примечательного здесь нет'}
        </p>: 'category not found'
      ),
    },
    balance: {
      path: 'balance',
      name: 'Cумма',
    },
  };

  return <Table columns={columns} />;
};

export default OperationsTable;
