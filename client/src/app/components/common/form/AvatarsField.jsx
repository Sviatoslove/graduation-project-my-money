import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import {
  formatDataForAvatarsFields,
  getFindActiveIndex,
} from '../../../utils/formatData';
import { useSettings } from '../../../hooks/useSettings';
import addIcon from '../../../../assets/icons/patch-plus-fill.svg';
import { useTables } from '../../../hooks/useTable';

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
  count,
  classesInputGroup,
  iconSize,
  error,
}) => {
  const { typeForm, essenceHandleToEdit } = useSettings();
  const buttonAddStatus = typeForm === 'operations';
  const { categoriesIcons } = useTables();
  const formatOptions = formatDataForAvatarsFields(count, options);
  const [index, setIndex] = useState(
    getFindActiveIndex(value, formatOptions) || 0
  );
  const [showClassesIncBt, setShowClassesIncBt] = useState(
    index === formatOptions?.length ? '-fill' : ''
  );
  const [showClassesDecBt, setShowClassesDecBt] = useState(
    index === 0 ? '-fill' : ''
  );

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

  const handleIncrement = () => {
    if (!index) setShowClassesDecBt('');
    if (index === formatOptions.length - 2) setShowClassesIncBt('-fill');
    if (index < formatOptions.length - 1) setIndex((prevState) => ++prevState);
  };

  const handleDecrement = () => {
    if (index === formatOptions.length - 1) setShowClassesIncBt('');
    if (index === 1) setShowClassesDecBt('-fill');
    if (index > 0) setIndex((prevState) => --prevState);
  };

  const drawingAvatars = (n) => {
    if (formatOptions) {
      return formatOptions[n]?.map((item) => {
        const active = value === (item.imgSrc || item.icon) ? 'active' : '';
        let settingsBtn = {
          name: name,
          key: item._id,
          dataValue: item.imgSrc || item.icon || item.color,
          onClick: handleClick,
          outline: true,
          classes: `avatar border-0 bg-transparent br-10 ${active}`,
          zIndex: 0,
          iconSize,
          ...item,
        };
        if (item.dataType === 'iconsForCategories') {
          const activeColor = value === item.color ? 'active' : '';
          settingsBtn = {
            ...settingsBtn,
            name: name,
            outline: item.color ? false : true,
            bgColor: valueBgColor ? valueBgColor : item.color,
            classes: `avatar border-0 m-1 br-5 categories d-flex flex-column ${active} ${activeColor} px-2 py-0`,
            textColor: valueTextColor,
            iconColor: valueIconColor,
            width: item.color ? '16px' : '',
            height: item.color ? '16px' : '60px',
            children: nameCategory && nameCategory.slice(0, 2),
          };
        }
        if (item.dataType === 'categories') {
          const active = value === item._id ? 'active' : '';
          settingsBtn = {
            ...settingsBtn,
            name: name,
            dataValue: item._id,
            classes: `avatar border-0 m-1 br-5 categories d-flex flex-column ${active} text-center h-content`,
            children: item.name.slice(0, 8),
          };
        }

        return <Button {...settingsBtn} />;
      });
    }
    if (!formatOptions && buttonAddStatus) {
      return (
        <Button
          bgColor="primary"
          classes="shadow-lg p-2 w-content br-5"
          dataType="categories"
          onClick={(e) =>
            essenceHandleToEdit(e, {
              ['iconsForCategories']: categoriesIcons,
            })
          }
          imgSrc={addIcon}
          iconSize={'30px'}
        />
      );
    }
  };

  return (
    <div className="mb-1">
      <label htmlFor={name}>{label}</label>
      <div
        className={
          'input-group mt-2 align-content-center justify-content-center ' +
          classesInputGroup
        }
      >
        {drawingAvatars(index)}
        {formatOptions && buttonAddStatus && (
          <div className="my-auto ">
            <Button
              bgColor="primary"
              classes="shadow-lg p-2 w-content br-5 ms-2"
              dataType="categories"
              onClick={(e) =>
                essenceHandleToEdit(e, {
                  ['iconsForCategories']: categoriesIcons,
                })
              }
              imgSrc={addIcon}
              iconSize={'30px'}
            />
          </div>
        )}
        {error && <div className="invalid-feedback p-2 d-block">{error}</div>}
      </div>
      {formatOptions && formatOptions.length > 1 && (
        <div className="text-center mt-2">
          <button
            className={
              'lh-1 p-0 btn btn' +
              (showClassesDecBt ? '-outline' : '') +
              '-secondary w-50'
            }
            type="button"
            onClick={handleDecrement}
            disabled={showClassesDecBt}
          >
            <i className={'fs-3 bi bi-skip-backward' + showClassesDecBt}></i>
          </button>
          <button
            className={
              'lh-1 p-0 btn btn' +
              (showClassesIncBt ? '-outline' : '') +
              '-secondary w-50'
            }
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
  error: PropTypes.string,
  nameCategory: PropTypes.string,
  valueBgColor: PropTypes.string,
  valueTextColor: PropTypes.string,
  valueIconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
  count: PropTypes.number,
  classesInputGroup: PropTypes.string,
};

export default AvatarsField;
