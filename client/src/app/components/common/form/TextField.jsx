import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getInputClasses } from '../../../utils';

const TextField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  style,
  placeholder,
  classes,
  widthInput,
  labelClasses,
  inputClasses
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
    if(name !== 'numOperations') {
      if (target.value === '0') target.value = '';
    }
  };

  return (
    <div className="mb-2">
      <label className={labelClasses} htmlFor={name}>{label}</label>
      <div className="input-group position-relative" style={style}>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          onChange={onChange}
          onClick={cleanInput}
          value={value}
          className={inputClasses + ' min-w-180px '+ getInputClasses('form-control', error)}
          style={{width: widthInput}}
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
  inputClasses: PropTypes.string,
  labelClasses: PropTypes.string,
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
