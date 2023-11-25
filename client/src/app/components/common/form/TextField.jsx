import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getInputClasses } from '../../../utils';

const TextField = ({
  label,
  value,
  name,
  type,
  onChange,
  error,
  style,
  placeholder,
  classes,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const cleanInput = (e) => {
    const { target } = e;
    if (target.className.includes('chartBar')) {
      target.blur();
      target.previousElementSibling.focus();
    }
    if (!target.className.includes('chartBar') && target.type !== 'number') {
      target.onblur = function () {
        if(target.nextElementSibling) {
          target.nextElementSibling.style.zIndex = 0;
        }
      };
    }
    if (target.value === '0') target.value = '';
  };

  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>
      <div className="input-group position-relative" style={style}>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          onChange={onChange}
          onClick={cleanInput}
          value={value}
          className={getInputClasses('form-control', error)}
        />

        {placeholder && (
          <input
            type="text"
            id={name}
            name={name}
            onClick={cleanInput}
            className={'form-control ' + classes}
            placeholder={placeholder}
          />
        )}

        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
            disabled={!value}
          >
            <i className={'bi bi-eye' + (!showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
  dataType: '',
};

TextField.propTypes = {
  widthInput: PropTypes.string,
  classes: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
};

export default TextField;
