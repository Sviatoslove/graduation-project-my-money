import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const FormsContext = React.createContext();

const useForms = () => useContext(FormsContext);

const FormsProvider = ({ children }) => {
  const [show, setShow] = useState('');
  const [countAdd, setCountAdd] = useState(false);

  const appearanceCountsForm = () => {
    setCountAdd(true);
    setShow('show');
  };

  const disAppearanceCountsForm = () => {
    setShow('');
    setTimeout(() => setCountAdd(false), 500);
  };

  const transform = show ? 'scale(0)' : '';

  return (
    <FormsContext.Provider
      value={{
        show,
        countAdd,
        appearanceCountsForm,
        disAppearanceCountsForm,
        transform,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};

FormsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export { FormsProvider, useForms };
