import React from 'react';
import PropTypes from 'prop-types';
import { useForms } from '../../../hooks/useForm';

const ContainerShow = ({ children, classes, type }) => {
  const { show, countAdd } = useForms();
  if (type === 'add') {
    return (
      <>
        {countAdd && (
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
