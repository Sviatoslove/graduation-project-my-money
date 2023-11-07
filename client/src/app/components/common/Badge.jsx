import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  name,
  textColor,
  color,
  text,
  classes,
  balance,
  imgSrc,
  iconSize,
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
                className="me-2"
                src={imgSrc}
                alt="img"
                style={{ width: iconSize }}
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
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgSrc: PropTypes.string,
  iconSize: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

export default Badge;
