import React from 'react';
import PropTypes from 'prop-types';
import { useSettings } from '../../../hooks/useSettings';

const ContainerShow = ({ children, classes, type }) => {
  const { show, add } = useSettings();
  if (type === 'add') {
    return (
      <>
        {add && (
          <div className={'scaleTransition ' + classes}>{children}</div>
        )}
      </>
    );
  }

  if (type === 'show') {
    return (
      <>
        {!show && <div className={'scaleTransition ' + classes}>{children}</div>}
      </>
    );
  }

  <div className={'scaleTransition ' + classes}>{children}</div>;
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
