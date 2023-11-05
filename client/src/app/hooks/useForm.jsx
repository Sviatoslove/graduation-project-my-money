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
  const [typeForm, setTypeForm] = useState(false);
  const [statusOperation, setStatusOperation] = useState('decrement');
  const [currentEssence, setCurrentEssence] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

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
    console.log('handleClick:')
    const { target } = e;
    const btnType = target.closest('button').dataset.type;
    if (btnType === 'add') {
      appearanceForm();
    } else {
      setCurrentPage(1)
      setStatusOperation(btnType);
    }
  };

  const essenceHandleToEdit = (e, currentEssence) => {
    console.log('currentEssence:', currentEssence)
    const { target } = e
    const btn = target.closest('button')
    const btnType = btn.dataset.type;
    const essence = btn.dataset.essence;
    const idEssence = btn.id;
    switch (btnType) {
      case 'add':
        setCurrentEssence(currentEssence);
        setTypeForm(btnType);
        appearanceForm();
        break;
      case 'edit':
        setCurrentEssence(currentEssence);
        setTypeForm(btnType);
        appearanceForm();
        break;
      case 'like':
        let editedEssence
        if(essence === 'category') {
          editedEssence = Object.values(currentEssence).reduce((acc, item)=> acc={...acc, [item.dataType]:{...item, like: item.like ? !item.like : true}}, {})
          dispatch(categoriesUpdate(editedEssence['category']))
          dispatch(categoriesIconsUpdate(editedEssence['iconsForCategories']))
        } else {
          editedEssence = { ...currentEssence, like: currentEssence.like ? !currentEssence.like : true };
          if(essence === 'count') dispatch(countUpdate(editedEssence));
        }
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
        currentEssence,
        essenceHandleToEdit, currentPage, setCurrentPage,
        handlePageChange
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
