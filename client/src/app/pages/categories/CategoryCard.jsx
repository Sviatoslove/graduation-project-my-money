import React from 'react';
import PropTypes from 'prop-types';
import { BtnsGroup } from '../../components/common/buttons';
import { useSettings } from '../../hooks/useSettings';

const CategoryCard = ({ category, categoriesIcons, table }) => {
  const {
    _id: id,
    name,
    content,
    icon,
    iconColor,
    bgColor,
    textColor,
    classesForCol,
    classesForIcon,
    classesForWrapp,
    classesForCardBody,
    classesForName,
    like
  } = category;

  const { essenceHandleToEdit } = useSettings();
  return (
    <div className={"col " + classesForCol}>
      <div
        className={`${
          classesForWrapp ? classesForWrapp : 'card'
        } h-100 bg-${bgColor} br-50 item-categories position-relative min-w-210px w-maxc mw-300 shadow-lg`}
      >
        {!table && like && (
          <i
            className={`bi bi-heart-fill text-${iconColor} position-absolute top-7 start-7 translate-end fs-2 like-for-card`}
          />
        )}
        <div className="wrapper-icon-category d-flex">
          <i
            className={`${icon} card-img-top ${
              classesForIcon ? classesForIcon : 'fs-56px'
            } text-${iconColor} w-content mx-auto`}
          />
        </div>
        <div className={`card-body mx-auto ${classesForCardBody}`}>
          <h5
            className={`card-title text-${textColor} ff-BS fs-4 card-title-categories w-content text-break ${classesForName} w-maxc mw-268 m-0`}
          >
            {name}
          </h5>
          {!table && content && (
            <div className="card-text">
              <p className="ff-BS w-maxc mw-268">{content}</p>
            </div>
          )}
        </div>
        {!table && (
          <BtnsGroup
            count={3}
            id={id}
            dataType={['like', 'categories', 'remove']}
            classes="btn-sm p-1"
            classesEl={['btrr-50', '', 'bbrr-50']}
            classesGroup="h-i px-2"
            func={[
              (e) =>
                essenceHandleToEdit(e, category),
                (e) =>
                essenceHandleToEdit(e, {
                  [category.dataType]: category,
                  [categoriesIcons[category.iconId]?.dataType]: categoriesIcons,
                }),
                (e) =>
                essenceHandleToEdit(e, category),
            ]}
            icon={[
              'bi bi-heart' +
                (category?.like ? '-fill' : ''),
              'bi bi-pencil-square',
              'bi bi-trash',
            ]}
            iconColor={bgColor}
            bgColor={textColor}
            iconSize={'24px'}
          />
        )}
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object,
  categoriesIcons: PropTypes.object,
  table: PropTypes.string,
};

export default CategoryCard;
