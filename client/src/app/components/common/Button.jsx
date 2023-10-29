import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  imgSrc,
  icon,
  zIndex,
  dataType,
  color,
  outline,
  classes,
  id,
  type,
  disabled,
  link,
  iconFontSize,
  imgFontSize,
  onClick,
  children,
  name
}) => {
  return (
    <>
      {!link ? (
        <button
          name={name}
          type={type}
          data-type={dataType}
          className={`btn btn-${outline ? "outline-" : ""}${color} ${classes}`}
          onClick={onClick}
          style={{ zIndex: zIndex }}
          id={id}
          disabled={disabled}
        >
          {imgSrc && (
            <img src={imgSrc} alt="image" style={{ width: imgFontSize }} />
          )}
          {icon && <i className={icon} style={{ fontSize: iconFontSize }}></i>}
          {children}
        </button>
      ) : (
        <Link
          to={link}
          className={`text-center ${classes} btn btn-${
            outline ? "outline-" : ""
          }${color}`}
        >
          {imgSrc && <img src={imgSrc} alt="image" />}
          {icon && <i className={icon} style={{ fontSize: iconFontSize }}></i>}
          {children}
        </Link>
      )}
    </>
  );
};

Button.defaultProps = {
  imgSrc: "",
  icon: "",
  dataType: "",
  color: "primary",
  outline: false,
  classes: "",
  id: "",
  link: "",
  type: "button",
  iconFontSize: "24px",
  zIndex: 1,
  disabled: false,
};

Button.propTypes = {
  name: PropTypes.string,
  imgFontSize: PropTypes.string,
  imgSrc: PropTypes.string,
  icon: PropTypes.string,
  dataType: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  classes: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  iconFontSize: PropTypes.string,
  zIndex: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Button;
