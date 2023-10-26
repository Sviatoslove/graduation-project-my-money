import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ name, textColor, color }) => {
  return (
    <h3>
      <span className={`badge bg-${color} ${textColor}`}>{name}</span>
    </h3>
  );
};

Badge.propTypes = {
  name: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

export default Badge;
