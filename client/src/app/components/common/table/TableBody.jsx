import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useTables } from '../../../hooks/useTable'

const TableBody = ({ columns }) => {
  const {operationCrop} = useTables()

  const renderContent = (item, column, idx) => {
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === 'function') {
        return component(item, idx)
      }
      return component
    }
    return _.get(item, columns[column].path)
  }

  return (
    <tbody className="table-group-divider">
      {Object.values(operationCrop)?.map((item,idx) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column, idx)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  columns: PropTypes.object.isRequired
}

export default TableBody
