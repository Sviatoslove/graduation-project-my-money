import React from 'react';
import PropTypes from 'prop-types';
import { useSettings } from '../../../hooks/useSettings';

const ContainerScale = ({ children, classes, zIndex, left }) => {
  const { transform } = useSettings();
  return (
    <div className={'scaleTransition ' + classes} style={{ transform: transform, zIndex:zIndex, left:left }}>
      {children}
    </div>
  );
};

ContainerScale.propTypes = {
  left: PropTypes.string,
  classes: PropTypes.string,
  zIndex: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerScale;
