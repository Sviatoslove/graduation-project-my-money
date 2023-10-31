import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/common/Button';

const CategoryCard = ({
  _id: id,
  name,
  content,
  icon,
  iconColor,
  textColor,
  bgColor,
  remove,
}) => {
  return (
    <div className="col">
      <div className={`card h-100 bg-${bgColor} br-50 item-categories position-relative`}>
        <div className="wrapper-icon-category d-flex">
        <i className={`${icon} card-img-top fs-56px text-${iconColor} w-content mx-auto`} />
          </div>
        <div className="card-body mx-auto">
          <h5 className={`card-title text-${textColor} ff-BS fs-4 card-title-categories w-content`}>{name}</h5>
          {content && (
            <div className="card-text">
              <p className="h6">Описание:</p> <p className="ff-BS">{content}</p>
            </div>
          )}
        </div>
        <Button
            dataType="remove"
            color={textColor}
            iconColor={bgColor}
            classes="btn-sm p-1 h-mc btrr-50 btn-item-categories position-absolute top-0 end-0"
            onClick={()=>remove(id)}
            id={id}
            icon="bi bi-trash"
          />
      </div>
    </div>
  );
};

CategoryCard.propTypes={
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  remove: PropTypes.func,
}

export default CategoryCard;
