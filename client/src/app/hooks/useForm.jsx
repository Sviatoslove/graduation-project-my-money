import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const FormsContext = React.createContext();

const useForms = () => useContext(FormsContext);

const FormsProvider = ({ children }) => {
  const location = useLocation()
  const [show, setShow] = useState('');
  const [add, setAdd] = useState(false);
  const [statusOperation, setStatusOperation] = useState('decrement');


  const appearanceForm = () => {
    setAdd(true);
    setShow('show');
  };

  useEffect(()=>{
    setShow('');
    setAdd(false)
  },[location.pathname])

  const disAppearanceForm = () => {
    setShow('');
    setTimeout(() => setAdd(false), 500);
  };

  const handleClick = (e) => {
    const { target } = e;
    const btnType = target.closest('button').dataset.type;
    if (btnType === 'add') {
      appearanceForm();
    } else {
      setStatusOperation(btnType);
    }
  };

  const transform = show ? 'scale(0)' : '';

  return (
    <FormsContext.Provider
      value={{
        show,
        add,
        appearanceForm,
        disAppearanceForm,
        transform,
        handleClick,
        statusOperation
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
