import React from 'react';
import PropTypes from 'prop-types';

const ContainerCards = ({ children, colsNumber, gap, classes, newClasses }) => {
  return (
    <div
      className={
        !newClasses
          ? `row row-cols-1 row-cols-md-${colsNumber} g-${gap} justify-content-center scaleTransition ` +
            classes
          : newClasses
      }
    >
      {children}
    </div>
  );
};

ContainerCards.propTypes = {
  gap: PropTypes.string,
  colsNumber: PropTypes.string,
  newClasses: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerCards;
