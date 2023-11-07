import React from "react";
import PropTypes from "prop-types";
// import { formatDataForFields, getInputClasses } from '../../../utils'

const SelectedField = ({
  label,
  value,
  defaultOption,
  options,
  error,
  name,
  onChange,
  valueTwo,
  disabled
}) => {
  const optionsArray = Object.values(options)?.map((optionName) => ({
    name: optionName.name,
    value: optionName._id,
  }));

  return (
    <div className="mb-4 d-flex flex-column text-center">
      <label htmlFor={name} className="form-label">
       <strong>{label}</strong> 
      </label>
      <select
        className="form-select-lg"
        // className={getInputClasses('form-select', error)}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        disabled={disabled}
      >
        <option disabled={defaultOption === 'Choose..' ? true : false} value="">
          {defaultOption}
        </option>
        {optionsArray?.map((option) => {
          if (valueTwo) {
            if (option.value !== valueTwo) {
              return (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              );
            }
          } else {
            return (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectedField.defaultProps = {
  defaultOption: "Choose...",
};

SelectedField.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  value: PropTypes.string,
  valueTwo: PropTypes.string,
  disabled: PropTypes.bool,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SelectedField;
