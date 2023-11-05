import React, { useEffect } from 'react';
import Table from '../common/table/Table';
import CategoryCard from '../../pages/categories/CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCategories,
  selectCategories,
  selectCategoriesDataloaded,
  selectCategoriesIcons,
  selectCategoriesIconsDataloaded,
  loadСategoriesIcons,
} from '../../store/categoriesSlice';
import LoadingSpinners from '../common/LoadingSpinners';
import { Button } from '../common/buttons';
import { useForms } from '../../hooks/useForm';

const OperationsTable = () => {
  const dispatch = useDispatch();
  const {essenceHandleToEdit} = useForms();

  const categoriesDataLoaded = useSelector(selectCategoriesDataloaded());
  const categories = useSelector(selectCategories());
  const categoriesIconsDataLoaded = useSelector(
    selectCategoriesIconsDataloaded()
  );
  const categoriesIcons = useSelector(selectCategoriesIcons());
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
    if (!categoriesIconsDataLoaded) dispatch(loadСategoriesIcons());
  }, []);

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
      component: (operation) =>
        categories[operation.categoryId] ? (
          <Button dataType="edit" onClick={(e)=>essenceHandleToEdit(e, operation)} outline={true} classes={'bg-transparent border-0 p-0 br-50'}>
            <CategoryCard
              table={'true'}
              category={categorySettings(operation?.categoryId)}
              categoriesIcons={categoriesIcons}
            />
          </Button>
        ) : (
          'category not found'
        ),
    },
    content: {
      name: 'Примечание',
      component: (operation) =>
        categories[operation.categoryId] ? (
          <p className="w-80 mx-auto text-secondary">
            {!categories[operation.categoryId].content &&
              'Ничего примечательного здесь нет'}
          </p>
        ) : (
          'category not found'
        ),
    },
    balance: {
      path: 'balance',
      name: 'Cумма',
    },
  };
  if (!categoriesDataLoaded) {
    return (
      <LoadingSpinners number={3} style={{ width: '56px', height: '56px' }} />
    );
  }
  return <Table columns={columns} />;
};

export default OperationsTable;
