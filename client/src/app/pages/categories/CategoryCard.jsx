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
    <div className="col position-relative">
      <div className={`card h-100 bg-${bgColor}`}>
        <i className={`${icon} card-img-top fs-1 text-${iconColor}  ms-2`} />
        <div className="card-body">
          <h5 className={`card-title text-${textColor} ff-BS fs-4`}>{name}</h5>
          {content && (
            <div className="card-text">
              <p className="h6">Описание:</p> <p className="ff-BS">{content}</p>
            </div>
          )}
        </div>
      </div>
      
      <Button
            dataType="remove"
            color="light"
            classes="btn-sm position-absolute top-0 end-0"
            onClick={remove}
            id={id}
            icon="bi bi-trash"
          />
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
