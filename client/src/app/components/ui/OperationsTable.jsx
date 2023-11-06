import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '../common/table/Table';
import CategoryCard from '../../pages/categories/CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategoriesIcons,
  selectCategoriesIconsDataloaded,
  loadСategoriesIcons,
} from '../../store/categoriesSlice';
import LoadingSpinners from '../common/LoadingSpinners';
import { Button } from '../common/buttons';
import { operationRemove } from '../../store/operationsSlice';
import { useTables } from '../../hooks/useTable';

const OperationsTable = () => {
  const dispatch = useDispatch();
  const { categories } = useTables();

  const categoriesIconsDataLoaded = useSelector(
    selectCategoriesIconsDataloaded()
  );
  const categoriesIcons = useSelector(selectCategoriesIcons());

  useEffect(() => {
    if (!categoriesIconsDataLoaded) dispatch(loadСategoriesIcons());
  }, []);

  const categorySettings = (id) => {
    return {
      ...categories[id],
      classesForIcon: 'fs-42px me-2',
      classesForCol: 'w-content ms-auto',
      classesForWrapp: 'd-flex align-items-center px-4 w-300px',
      classesForCardBody: '',
      classesForName: 'mx-auto ',
    };
  };

  const handleRemove = (e) => {
    const { target } = e;
    const operId = target.closest('button').id;
    dispatch(operationRemove(operId));
  };

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
          <CategoryCard
            table={'true'}
            category={categorySettings(operation?.categoryId)}
            categoriesIcons={categoriesIcons}
          />
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
    delete: {
      name: '',
      component: (operation) => (
        <Button
          outline={true}
          bgColor="secondary"
          iconSize={'32px'}
          imgSrc="https://img.icons8.com/arcade/32/delete-sign.png"
          onClick={handleRemove}
          id={operation._id}
        />
      ),
    },
  };
  if (!categories) {
    return (
      <LoadingSpinners number={3} style={{ width: '56px', height: '56px' }} />
    );
  }
  return <Table columns={columns} />;
};

OperationsTable.propTypes = {
  categories: PropTypes.object,
};

export default OperationsTable;
