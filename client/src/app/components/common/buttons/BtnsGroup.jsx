import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { getArray } from '../../../utils/formatData';

const BtnsGroup = ({
  _id: id,
  count,
  dataType,
  classes,
  classesEl,
  func,
  icon,
  iconColor,
  bgColor,
  textColor,
  iconSize,
}) => {
  const countArr = getArray(count);
  const getValue = (variable, idx) => Array.isArray(variable) ? variable[idx] : variable;
  return (
    <div
      className="btn-group-settings btn-group-vertical h-i btn-item-categories position-absolute top-0 end-0"
      role="group"
      aria-label="Vertical button group"
    >
      {countArr.map((el, idx) => {
        const settings = {
          id: id,
          dataType: getValue(dataType, idx),
          classes: classes,
          classesEl:getValue(classesEl, idx),
          onClick: getValue(func, idx),
          icon: getValue(icon, idx),
          iconColor:getValue(iconColor, idx),
          bgColor: getValue(bgColor, idx),
          textColor: getValue(textColor, idx),
          iconSize: iconSize,
        };

        return <Button key={idx} {...settings} />;
      })}
    </div>
  );
};

BtnsGroup.propTypes = {
  id: PropTypes.string,
  count: PropTypes.number,
  dataType: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  classes: PropTypes.string,
  classesEl: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  func: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.array]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  iconColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  bgColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  iconSize: PropTypes.string,
};

export default BtnsGroup;
