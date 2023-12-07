import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
  return (
    <div className="mb-1">
      <label className="d-block form-label">{label}</label>
      {options.map((option) => (
        <div
          key={option.label + "_" + option.value}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.label + "_" + option.value}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
          />
          <label
            className="form-check-label"
            htmlFor={option.label + "_" + option.value}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.defaultProps = {
  label: "Выберите пол",
};

RadioField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default RadioField;
