import React from 'react';
import PropTypes from 'prop-types';
import { BtnsGroup } from '../../components/common/buttons';

const CategoryCard = ({
  _id: id,
  name,
  content,
  icon,
  iconColor,
  bgColor,
  textColor,
  remove,
  table,
  classesForIcon,
  classesForWrapp,
  classesForCardBody,
  classesForName
}) => {

  return (
    <div className="col">
      <div
        className={`${classesForWrapp} h-100 bg-${bgColor} br-50 item-categories position-relative`}
      >
        <div className="wrapper-icon-category d-flex">
          <i
            className={`${icon} card-img-top ${classesForIcon} text-${iconColor} w-content mx-auto`}
          />
        </div>
        <div className={`card-body mx-auto ${classesForCardBody}`}>
          <h5
            className={`card-title text-${textColor} ff-BS fs-4 card-title-categories w-content text-break ${classesForName}`}
          >
            {name}
          </h5>
          {!table && content &&  (
            <div className="card-text">
              <p className="h6">Описание:</p> <p className="ff-BS">{content}</p>
            </div>
          )}
        </div>
        {!table && (
          <BtnsGroup
            count={3}
            id={id}
            dataType={['edit', 'like', 'remove']}
            classes="btn-sm p-1"
            classesEl={['btrr-50', '', 'bbrr-50']}
            func={[null, null, () => remove(id)]}
            icon={['bi bi-gear', 'bi bi-heart', 'bi bi-trash']}
            iconColor={bgColor}
            bgColor={textColor}
            classesForIcon={'24px'}
          />
        )}
      </div>
    </div>
  );
};

CategoryCard.defaultProps={
  classesForIcon: 'fs-56px',
  classesForWrapp: 'card',
  classesForCardBody: '',
  classesForName: ''

}

CategoryCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  remove: PropTypes.func,
  table: PropTypes.string,
  classesForIcon: PropTypes.string,
  classesForWrapp: PropTypes.string,
  classesForCardBody: PropTypes.string,
  classesForName: PropTypes.string,

};

export default CategoryCard;
