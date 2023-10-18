import React from "react";
import PropTypes from "prop-types";
import { getInputClasses } from "../../../utils";

const CheckboxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ target: { name, value: !value } });
  };

  return (
    <div className="form-check mb-2">
      <input
        className="form-check-input"
        type="checkbox"
        checked={value}
        id={name}
        onChange={handleChange}
      />
      <label
        className={getInputClasses("form-check-label", error)}
        htmlFor={name}
      >
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CheckboxField;
