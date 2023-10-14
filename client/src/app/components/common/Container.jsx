import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, classContainer, classRow, classCol}) => {
  return (
    <div className={classContainer}>
      <div className={classRow}>
        <div className={classCol}>{children}</div>
      </div>
    </div>
  );
};

Container.defaultProps = {
  classContainer: 'container mt-5',
  classRow: 'row',
  classCol: 'col-md-6 offset-md-3 shadow-custom p-4 br-10 bc-white'
};

Container.propTypes = {
  classContainer: PropTypes.string,
  classRow: PropTypes.string,
  classCol: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Container;
