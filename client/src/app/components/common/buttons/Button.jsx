import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForms } from '../../../hooks/useForm';

const Button = ({
  imgSrc,
  icon,
  zIndex,
  dataType,
  bgColor,
  textColor,
  outline,
  classes,
  id,
  type,
  disabled,
  link,
  iconSize,
  onClick,
  children,
  name,
  width,
  height,
  iconColor,
  dataValue,
  dataRate,
  dataEssence,
  classesEl,
  like,
}) => {
  return (
    <>
      {!link ? (
        <button
          name={name}
          type={type}
          data-type={dataType}
          data-value={dataValue}
          data-essence={dataEssence}
          data-rate={dataRate}

          className={`btn btn-${
            outline ? 'outline-' : ''
          }${bgColor} ${classes} ${classesEl} text-${textColor}`}

          onClick={onClick}

          style={{ zIndex: zIndex, width: width, height: height }}
          id={id}
          disabled={disabled}
        >
          {like && (
            <i
              className={
                'bi bi-heart' +
                (like ? '-fill' : '') +
                ' p-0 text-danger position-absolute top-0 end-0'
              }
              style={{ fontSize: '20px' }}
            />
          )}
          {imgSrc && (
            <img src={imgSrc} alt="image" style={{ width: iconSize }} />
          )}
          {icon && (
            <i
              className={`${icon} text-${iconColor} mx-auto p-0` }
              style={{ fontSize: iconSize }}
            />
          )}
          <strong className="mx-auto mt-0">{children}</strong>
        </button>
      ) : (
        <Link
          to={link}
          className={`text-center ${classes} btn btn-${
            outline ? 'outline-' : ''
          }${bgColor}`}
          onClick={onClick}
        >
          {imgSrc && <img src={imgSrc} alt="image" />}
          {icon && <i className={icon} style={{ fontSize: iconSize }}></i>}
          {children}
        </Link>
      )}
    </>
  );
};

Button.defaultProps = {
  imgSrc: '',
  icon: '',
  dataType: '',
  bgColor: 'primary',
  outline: false,
  classes: '',
  id: '',
  link: '',
  type: 'button',
  iconSize: '56px',
  zIndex: 1,
  disabled: false,
};

Button.propTypes = {
  like: PropTypes.bool,
  dataEssence: PropTypes.string,
  dataRate: PropTypes.number,
  classesEl: PropTypes.string,
  dataValue: PropTypes.string,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  name: PropTypes.string,
  imgSrc: PropTypes.string,
  icon: PropTypes.string,
  dataType: PropTypes.string,
  bgColor: PropTypes.string,
  outline: PropTypes.bool,
  classes: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  type: PropTypes.string,
  iconSize: PropTypes.string,
  zIndex: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Button;
