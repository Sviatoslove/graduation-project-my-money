import React from 'react';
import PropTypes from 'prop-types';
import { useSettings } from '../../../hooks/useSettings';

const ContainerShow = ({ children, classes }) => {
  const { add } = useSettings();
  return (
    <>{add && <div className={'scaleTransition ' + classes}>{children}</div>}</>
  );
};

ContainerShow.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ContainerShow;
