import React from 'react'
import PropTypes from 'prop-types'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

const Table = ({columns}) => {
  return (
    <table className='table text-center align-middle'>
      <TableHeader {...{ columns }} />
      <TableBody {...{ columns }} />
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.object,
}

export default Table
