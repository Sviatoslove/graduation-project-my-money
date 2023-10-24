import React from 'react'
import PropTypes from 'prop-types'

const TitleNavbar = ({ name }) => {
  return <div style={{ fontWeight: 'bold', fontSize: '2em' }}>{name}</div>
}

TitleNavbar.propTypes = {
  path: PropTypes.string
}

export default TitleNavbar
