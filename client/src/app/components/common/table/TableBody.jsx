import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ columns, data }) => {
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
      {Object.values(data)?.map((item,idx) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column, id) => {
            return(<td key={id + item._id + idx}>{renderContent(item, column, idx)}</td>
          )})}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default TableBody
