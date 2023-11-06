import React from 'react';
import PropTypes from 'prop-types';
import { BtnsGroup } from '../../components/common/buttons';
import { useForms } from '../../hooks/useForm';

const CategoryCard = ({ onClick, category, categoriesIcons, table }) => {
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
  } = category;
  const { essenceHandleToEdit } = useForms();
  return (
    <div className={"col " + classesForCol}>
      <div
        className={`${
          classesForWrapp ? classesForWrapp : 'card'
        } h-100 bg-${bgColor} br-50 item-categories position-relative min-w-210 w-maxc mw-300 shadow-lg`}
      >
        {!table && category.like && (
          <i
            className={`bi bi-heart-fill text-${iconColor} position-absolute top-7 start-7 translate-end fs-2`}
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
            dataType={['like', 'edit', 'remove']}
            dataEssence={category.dataType}
            classes="btn-sm p-1"
            classesEl={['btrr-50', '', 'bbrr-50']}
            classesGroup="h-i px-2"
            func={[
              (e) =>
                essenceHandleToEdit(e, {
                  [category.dataType]: category,
                  [categoriesIcons[category.iconId].dataType]:
                    categoriesIcons[category.iconId],
                }),
                (e) =>
                essenceHandleToEdit(e, {
                  [category.dataType]: category,
                  [categoriesIcons[category.iconId].dataType]: categoriesIcons,
                }),
              essenceHandleToEdit,
            ]}
            icon={[
              'bi bi-heart' +
                (categoriesIcons[category.iconId]?.like ? '-fill' : ''),
              'bi bi-gear',
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
  onClick: PropTypes.func,
};

export default CategoryCard;
