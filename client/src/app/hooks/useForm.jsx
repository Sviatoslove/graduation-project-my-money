import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { operationRemove, operationUpdate } from '../store/operationsSlice';
import { categoriesIconsUpdate, categoriesRemove, categoriesUpdate } from '../store/categoriesSlice';
import { countRemove, countUpdate } from '../store/countsSlice';
import { useDispatch } from 'react-redux';

const FormsContext = React.createContext();

const useForms = () => useContext(FormsContext);

const FormsProvider = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [show, setShow] = useState('');
  const [add, setAdd] = useState(false);
  const [statusOperation, setStatusOperation] = useState('decrement');
  const [typeForm, setTypeForm] = useState('');
  const [idCurrentEssence, setIdCurrentEssence] = useState('');



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

  const countsHandleToEdit = (e, currentEssence) => {
    console.log('currentEssence:', currentEssence)
    const { target } = e
    const btn = target.closest('button')
    const btnType = btn.dataset.type;
    const essence = btn.dataset.essence;
    const idEssence = btn.id;
    switch (btnType) {
      case 'add':
        setIdCurrentEssence('');
        setTypeForm(btnType);
        appearanceForm();
        break;
      case 'edit':
        setIdCurrentEssence(idEssence);
        setTypeForm(btnType);
        appearanceForm();
        break;
      case 'like':
        const editedEssence = { ...currentEssence, like: currentEssence.like ? !currentEssence.like : true };
        if(essence === 'count') dispatch(countUpdate(editedEssence));
        if(essence === 'operation') dispatch(operationUpdate(editedEssence));
        if(essence === 'category') dispatch(categoriesIconsUpdate(editedEssence))
        break;
      case 'remove':
        if(essence === 'count') dispatch(countRemove(idEssence));
        if(essence === 'operation') dispatch(operationRemove(idEssence));
        if(essence === 'category') dispatch(categoriesRemove(idEssence));
        break;
      case 'translationsAdd':
        setTypeForm(btnType);
        appearanceForm();
        break;
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
        statusOperation,
        typeForm,
        idCurrentEssence,
        countsHandleToEdit
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
