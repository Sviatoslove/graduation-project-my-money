import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children, classes }) => {
  return (
    <div className={classes}>
        {children}
    </div>
  )
}

Container.defaultProps = {
  classes: 'container w-98 mh-94vh d-flex mx-auto mt-4 d-flex flex-column',
}

Container.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Container
