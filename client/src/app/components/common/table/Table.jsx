import React from 'react'
import PropTypes from 'prop-types'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

const Table = ({columns, data}) => {
  return (
    <table className='table text-center align-middle'>
      <TableHeader {...{ columns }} />
      <TableBody {...{ columns, data }} />
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default Table
