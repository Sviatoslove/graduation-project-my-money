import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTables } from '../../../hooks/useTable';

const TableBody = ({ columns, data }) => {
  const { selectedCategory, searchQuery } = useTables();
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
              return <td key={id}>{renderContent(item, column, idx)}</td>;
            })}
          </tr>
        ))}
      </tbody>
      {(selectedCategory || searchQuery) && (
        <tfoot>
          <tr>
            {Object.keys(columns).map((column, id) => {
              if (!id)
                return (
                  <td key={id}>
                    <strong>Итого:</strong>
                  </td>
                );
              else if (id === Object.keys(columns).length - 2)
                return (
                  <td key={id}>
                    <strong>
                      {data.reduce(
                        (acc, item) => (acc = acc + item.balance),
                        0
                      )}
                    </strong>
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
