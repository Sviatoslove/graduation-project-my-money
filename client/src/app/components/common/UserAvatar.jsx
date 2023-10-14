import React from 'react'
import PropTypes from 'prop-types'

const UserAvatar = ({ image, height }) => {
  return (
    <img
      src={image}
      className='rounded-circle shadow-1-strong me-3'
      alt='avatar'
      height={height}
    />
  )
}

UserAvatar.propTypes = {
  image: PropTypes.string,
  height: PropTypes.string
}

export default UserAvatar
