import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  name,
  textColor,
  color,
  text,
  classes, imgClasses,
  balance,
  imgSrc,
  iconSize,icon, iconColor
}) => {
  return (
    <>
      {balance || balance === 0 ? (
        <span
          className={`justify-content-center badge bg-${color} ${textColor} ${classes} d-flex align-items-center`}
        >
          <span>{balance}</span>
          <img src={imgSrc} alt="img" style={{ width: iconSize }} />
        </span>
      ) : (
        <h3 className={"m-0"}>
          <span
            className={`badge bg-${color} ${textColor} ${classes} d-flex align-items-center justify-content-center`}
          >
            {imgSrc && (
              <img
                className={imgClasses?imgClasses:"me-2"}
                src={imgSrc}
                alt="img"
                style={{ width: iconSize }}
              />
            )}
            {icon && (
              <i
                className={iconSize + icon + ` text-${iconColor}`}
                alt="img"
              />
            )}
            <span>{text ? text : name}</span>
          </span>
        </h3>
      )}
    </>
  );
};

Badge.propTypes = {
  classes: PropTypes.string,
  imgClasses: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgSrc: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

export default Badge;
