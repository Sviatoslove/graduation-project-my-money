import React from 'react';
import PropTypes from 'prop-types';
import { useSettings } from '../../../hooks/useSettings';

const ContainerScale = ({ children, classes }) => {
  const { transform } = useSettings();
  return (
    <div className={'scaleTransition ' + classes} style={{ transform: transform }}>
      {children}
    </div>
  );
};

ContainerScale.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerScale;
