import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { getInputClasses } from '../../../utils'

const TextField = ({ label, value, name, type, onChange, error, dataType }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((state) => !state)
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group'>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          className={getInputClasses('form-control', error)}
        />
        {dataType && <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          className={getInputClasses('form-control', error)}
        />}
             
        {type === 'password' && (
          <button
            className='btn btn-outline-secondary'
            type='button'
            onClick={toggleShowPassword}
            disabled={!value}
          >
            <i className={'bi bi-eye' + (!showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
  dataType:''
}

TextField.propTypes = {
  dataType:PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string
}

export default TextField
