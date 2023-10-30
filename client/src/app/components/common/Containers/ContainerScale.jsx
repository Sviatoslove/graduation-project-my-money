import React from 'react';
import PropTypes from 'prop-types';
import { useForms } from '../../../hooks/useForm';

const ContainerScale = ({ children, classes }) => {
  const { transform } = useForms();
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
