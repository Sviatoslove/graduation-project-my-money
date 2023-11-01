import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const AvatarsField = ({
  label,
  name,
  value,
  valueIconColor,
  valueTextColor,
  nameCategory,
  valueBgColor,
  options,
  onChange,
}) => {
  const [index, setIndex] = useState(0);
  const [showClassesIncBt, setShowClassesIncBt] = useState('');
  const [showClassesDecBt, setShowClassesDecBt] = useState('-fill');

  const handleClick = ({ target }) => {
    const activeBtn = target.closest('div').querySelector('.active');
    activeBtn?.classList.remove('active');
    onChange({
      target: {
        name: target.closest('button').name,
        value: target.closest('button').dataset.value,
      },
    });
    target.closest('button')?.classList.add('active');
  };

  const drawingAvatars = (n) => {
    return options[n].map((item) => {
      const active = value === (item.imgSrc || item.icon) ? 'active' : '';
      let settingsBtn = {
        name: name,
        key: item._id,
        dataValue: item.imgSrc || item.icon || item.color,
        onClick: handleClick,
        outline: true,
        classes: `avatar border-0 bg-transparent br-10 ${active}`,
        zIndex: 0,
        ...item,
      };
      if (item.dataType === 'iconsForCategories') {
        const activeColor = value === item.color ? 'active' : '';
        settingsBtn = {
          ...settingsBtn,
          name: name,
          outline: item.color ? false : true,
          bgColor: valueBgColor ? valueBgColor : item.color,
          classes: `avatar border-0 m-1 br-5 categories d-flex flex-column ${active} ${activeColor}`,
          textColor: valueTextColor,
          iconColor: valueIconColor,
          width: item.color ? '16px' : '',
          height: item.color ? '24px' : '105px',
          children: nameCategory && nameCategory.slice(0, 4),

        };
      }
      if (item.dataType === 'category') {
        const active = value === item._id ? 'active' : '';
        settingsBtn = {
          ...settingsBtn,
          name: name,
          dataValue: item._id,
          classes: `avatar border-0 m-1 br-5 categories d-flex flex-column ${active} text-center`,
          children: item.name,
        };
      }

      return (
        <Button {...settingsBtn}/>
      );
    });
  };

  const handleIncrement = () => {
    if (!index) setShowClassesDecBt('');
    if (index === options.length - 2) setShowClassesIncBt('-fill');
    if (index < options.length - 1) setIndex((prevState) => ++prevState);
  };

  const handleDecrement = () => {
    if (index === options.length - 1) setShowClassesIncBt('');
    if (index === 1) setShowClassesDecBt('-fill');
    if (index > 0) setIndex((prevState) => --prevState);
  };

  return (
    <div className="mb-1">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mt-2 justify-content-center">
        {drawingAvatars(index)}
      </div>
      {options.length > 1 && (
        <div className="text-center mt-2">
          <button
            className="lh-1 p-0 btn btn-outline-secondary w-50"
            type="button"
            onClick={handleDecrement}
            disabled={showClassesDecBt}
          >
            <i className={'fs-3 bi bi-skip-backward' + showClassesDecBt}></i>
          </button>
          <button
            className="lh-1 p-0 btn btn-outline-secondary w-50"
            type="button"
            onClick={handleIncrement}
            disabled={showClassesIncBt}
          >
            <i className={'fs-3 bi bi-skip-forward' + showClassesIncBt}></i>
          </button>
        </div>
      )}
    </div>
  );
};

AvatarsField.defaultProps = {
  type: 'image',
};

AvatarsField.propTypes = {
  nameCategory: PropTypes.string,
  valueBgColor: PropTypes.string,
  valueTextColor: PropTypes.string,
  valueIconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
};

export default AvatarsField;
