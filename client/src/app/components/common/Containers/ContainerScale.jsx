import React from 'react';
import PropTypes from 'prop-types';
import { useSettings } from '../../../hooks/useSettings';

const ContainerScale = ({ children, classes, zIndex }) => {
  const { transform } = useSettings();
  return (
    <div className={'scaleTransition ' + classes} style={{ transform: transform, zIndex:zIndex }}>
      {children}
    </div>
  );
};

ContainerScale.propTypes = {
  classes: PropTypes.string,
  zIndex: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerScale;
