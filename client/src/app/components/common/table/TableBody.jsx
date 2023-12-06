import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTables } from '../../../hooks/useTable';
import { Button } from '../buttons';

const TableBody = ({ columns, data }) => {
  const { dataCategory, searchQuery, filteredOperations, clearFilter } =
    useTables();
  const renderContent = (item, column, idx) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === 'function') {
        return component(item, idx);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <>
      <tbody className="table-group-divider">
        {data?.map((item, idx) => (
          <tr key={item._id}>
            {Object.keys(columns).map((column, id) => {
              return (
                <td className='bg-transparent' key={id + item._id}>
                  {renderContent(item, column, idx)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
      {(dataCategory.category || searchQuery) && (
        <tfoot>
          <tr>
            {Object.keys(columns).map((column, id) => {
              if (!id)
                return (
                  <td key={id + id*10}>
                    <strong>Итого:</strong>
                  </td>
                );
              else if (id === Object.keys(columns).length - 2)
                return (
                  <td key={id*10}>
                    <strong>
                      {filteredOperations.reduce(
                        (acc, item) => (acc = acc + item.balance),
                        0
                      )}
                    </strong>
                  </td>
                );
              else if (id === Object.keys(columns).length - 1)
                return (
                  <td key={id*109+id}>
                    <Button
                      outline={true}
                      bgColor="secondary"
                      iconSize={'32px'}
                      imgSrc="https://img.icons8.com/arcade/32/delete-sign.png"
                      onClick={clearFilter}
                    />
                  </td>
                );
              return <td key={id}></td>;
            })}
          </tr>
        </tfoot>
      )}
    </>
  );
};

TableBody.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default TableBody;
