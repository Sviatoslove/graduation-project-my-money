import React from "react";
import PropTypes from "prop-types";
import { getInputClasses } from "../../../utils";
import Button from "../buttons/Button";

const CurrencyField = ({
  label,
  value,
  name,
  type,
  onChange,
  error,
  convert,
  icon,
  handleClick,
  inputBalanceToCount,
}) => {
  const cleanInput = (e) => {
    const { target } = e;
    if (target.type === "number" && target.value === "0") target.value = "";
    if (target.type === "text") target.blur();
  };

  return (
    <div className="mb-2 w-100 d-flex flex-column">
      <label className="flex-grow-1" htmlFor={name}>
        {label}
      </label>
      <div className="input-group flex-column">
        <div className="d-flex">
          <input
            ref={inputBalanceToCount}
            type={type}
            id={name}
            name={name}
            onChange={onChange}
            onClick={cleanInput}
            value={value}
            className={"w-100 " + getInputClasses("form-control", error)}
          />
          {icon && (
            <Button
              outline={true}
              classes="secondary border-0 p-0"
              imgSrc={icon}
              iconSize="34px"
              disabled
            />
          )}
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

CurrencyField.defaultProps = {
  type: "text",
};

CurrencyField.propTypes = {
  inputBalanceToCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  icon: PropTypes.string,
  convert: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  error: PropTypes.string,
  type: PropTypes.string,
};

export default CurrencyField;
