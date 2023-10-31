import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { getActiveElment } from '../../../utils/formatDataForAvatarsFields';

const AvatarsField = ({ label, name, value, valueIconColor, valueTextColor, nameCategory, valueBgColor, options, onChange }) => {
  console.log('options:', options)
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState();
  const prevRef = useRef();
  const [showClassesIncBt, setShowClassesIncBt] = useState('');
  const [showClassesDecBt, setShowClassesDecBt] = useState('-fill');

  useEffect(() => {
    if(!active) {
      setActive(getActiveElment(value, name))
    }
    prevRef.current = active;
    toggleActive();
  });

  const prevActive = prevRef.current;

  const handleClick = ({ target }) => {
    setActive(target.closest('button'));
    onChange({
      target: {
        name: target.closest('button').name,
        value: target.closest('button').dataset.value,
      },
    });
  };

  const toggleActive = () => {
    if (prevActive !== active) {
      prevActive?.classList.remove('active');
    }
    active?.classList.add('active');
  };

  const drawingAvatars = (n) => {
    if (typeof options[n][n] === 'object') {
      return options[n].map((item) => {
        if(item.userId) {
          return <Button
          name={name}
          
          
          />
        }
        return (
          <Button
            name={name}
            icon={item.name}
            dataType={name}
            key={item._id}
            onClick={handleClick}
            iconFontSize="46px"
            

            dataValue={item.color ? item.color : item.name}
            outline={item.color ? false : true}
            color={valueBgColor ? valueBgColor : item.color}
            textColor={valueTextColor}
            iconColor={valueIconColor}
            classes={"avatar border-0 m-1 br-5 categories d-flex flex-column"}
            width={item.color ? '16px' : ''}
            height={item.color ? '24px' : '105px'}
          >{nameCategory && nameCategory.slice(0,4)}</Button>
        );
      });
    }

    return options[n].map((item) => {
      return (
        <Button
          name={name}
          outline={true}
          imgFontSize={'52px'}
          dataType={name}
          dataValue={item}
          imgSrc={item}
          key={item}
          onClick={handleClick}
          classes={"avatar border-0 bg-transparent br-10"}
          zIndex={0}
        />
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
