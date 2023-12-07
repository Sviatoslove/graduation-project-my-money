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
import { useTables } from '../../hooks/useTable';
import { useSettings } from '../../hooks/useSettings';
import getDate from '../../utils/getDate';

const OperationsTable = () => {
  const dispatch = useDispatch();
  const { categories, operationCrop, pageSize, currentPage } = useTables();
  const { essenceHandleToEdit } = useSettings();

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
      classesForCol: 'w-content mx-auto',
      classesForWrapp: 'd-flex align-items-center px-4 w-300px',
      classesForCardBody: '',
      classesForName: 'mx-auto ',
    };
  };

  const columns = {
    number: {
      name: 'Номер',
      component: (operation, idx) => {
        let num = idx + 1;
        if (currentPage > 1) num = +pageSize * (currentPage - 1) + num;
        return (
          <img src={`https://img.icons8.com/arcade/56/${num}.png`} alt={num} />
        );
      },
    },
    time: {
      path: 'date',
      name: 'Время',
      component: (operation) => operation.date.split('T')[1],
    },
    date: {
      name: 'Дата',
      component: (operation) => getDate(operation.date),
    },
    category: {
      name: 'Категория',
      component: (operation) =>
        categories[operation.categoryId] ? (
          <Button
            outline={true}
            classes='p-0 br-50 border-0'
            dataType='operations'
            dataEssence='operation'
            onClick={(e) => essenceHandleToEdit(e, operation)}
          >
            <CategoryCard
              table='true'
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
      component: (operation) => (
        <p
          className={`w-80 mx-auto text-${
            !operation.content ? 'body-tertiary' : 'dark'
          }`}
        >
          {!operation.content ? (
            'Ничего примечательного'
          ) : (
            <strong>{operation.content}</strong>
          )}
        </p>
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
          dataType={'remove'}
          bgColor="secondary"
          iconSize={'32px'}
          imgSrc="https://img.icons8.com/arcade/32/delete-sign.png"
          onClick={(e) => essenceHandleToEdit(e, operation)}
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
  return <Table columns={columns} data={operationCrop} />;
};

OperationsTable.propTypes = {
  categories: PropTypes.object,
};

export default OperationsTable;
