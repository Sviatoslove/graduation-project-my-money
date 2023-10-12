import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children, classContainer, classRow }) => {
  return (
    <div className={'container mt-5 ' + classContainer}>
      <div className={classRow}>{children}</div>
    </div>
  )
}

Container.defaultProps = {
  classContainer: '',
  classRow: ''
}

Container.propTypes = {
  classContainer: PropTypes.string,
  classRow: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Container