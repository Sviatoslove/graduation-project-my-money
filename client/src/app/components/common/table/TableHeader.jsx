import React from 'react';
import PropTypes from 'prop-types';
import { useTables } from '../../../hooks/useTable';

const TableHeader = ({ columns }) => {
  const { sortBy: selectedSort, handleSort: onSort } = useTables();
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderSortArrow = (item) => {
    if (selectedSort.path === item) {
      return selectedSort.order === 'asc' ? 'up-fill' : 'down-fill';
    }
  };

  return (
    <thead className=''>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            className={'bg-transparent w-content bi bi-caret-' + renderSortArrow(columns[column].path)}
            key={column}
            onClick={() =>
              columns[column].path
                ? handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
