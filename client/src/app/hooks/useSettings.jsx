import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  clearErrorOperations,
  clearSuccessNetworkOperations,
  operationRemove,
} from '../store/operationsSlice';
import { categoriesRemove, categoriesUpdate, clearErrorCategories, clearSuccessNetworkCategories } from '../store/categoriesSlice';
import {
  clearErrorCounts,
  clearSuccessNetworkCounts,
  countRemove,
  countUpdate,
} from '../store/countsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorAuth, selectUser, updateUser } from '../store/usersSlice';
import {
  clearErrorTranslations,
  clearSuccessNetworkTranslations,
  translationRemove,
} from '../store/translationsSlice';
import localStorageService from '../services/localStorage.service';
import getDate from '../utils/getDate';
import { displayDate } from '../utils';

const FormsContext = React.createContext();

const useSettings = () => useContext(FormsContext);

const FormsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );
  const [show, setShow] = useState('');
  const [add, setAdd] = useState(false);
  const [toast, setToast] = useState('');
  const [typeForm, setTypeForm] = useState(false);
  const [statusOperation, setStatusOperation] = useState('decrement');
  const [currentEssence, setCurrentEssence] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const [settingsToast, setSettingsToast] = useState(null);
  const [settingsModal, setSettingsModal] = useState({});
  const user = useSelector(selectUser());

  const startClearFunc = () => {
    if (error === '') setError(null);
    if (successToast === '') setSuccessToast(null);
    switch (settingsToast?.typeForm) {
      case 'auth': {
        if (error !== null) dispatch(clearErrorAuth());
        break;
      }
      case 'counts': {
        if (error !== null) dispatch(clearErrorCounts());
        else dispatch(clearSuccessNetworkCounts());
        break;
      }
      case 'operations': {
        if (error !== null) dispatch(clearErrorOperations());
        else dispatch(clearSuccessNetworkOperations());
        break;
      }
      case 'translations': {
        if (error !== null) dispatch(clearErrorTranslations());
        else dispatch(clearSuccessNetworkTranslations());
        break;
      }
      case 'categories': {
        if (error !== null) dispatch(clearErrorCategories());
        else dispatch(clearSuccessNetworkCategories());
        break;
      }
    }
  };

  useEffect(() => {
    if (error || successToast) {
      setToast({
        title: 'Сообщение от сервера',
        content: error ? error : successToast,
        error: Boolean(error),
        show: 'show',
        ...settingsToast,
      });
      if (settingsToast?.typeForm !== 'auth') {
        setTimeout(() => {
          setToast((state) => ({ ...state, show: 'hide' }));
          setSuccessToast('');
          setError('');
          setSettingsToast(null);
          startClearFunc();
        }, 3000);
      }
    }
    if (
      (!error && error !== null) ||
      (!successToast && successToast !== null)
    ) {
      setToast((state) => ({ ...state, show: 'hide' }));
      setTimeout(() => {
        startClearFunc();
      }, 600);
    }
  }, [error, successToast]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const toggleFormType = () => {
    setFormType((state) => (state === 'register' ? 'login' : 'register'));
    dispatch(clearErrorAuth());
    if (toast.show === 'show')
      setToast((state) => ({ ...state, show: 'hide' }));
  };

  const appearanceForm = () => {
    setAdd(true);
    setShow('show');
  };

  useEffect(() => {
    setShow('');
    setAdd(false);
  }, [location.pathname]);

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
      setCurrentPage(1);
      setStatusOperation(btnType);
    }
  };

  const onChangeModal = (essence, idEssence) => {
    if (essence === 'count') dispatch(countRemove(idEssence))
    if (essence === 'operation') dispatch(operationRemove(idEssence));
    if (essence === 'category') dispatch(categoriesRemove(idEssence));
    if (essence === 'translation') dispatch(translationRemove(idEssence));
    setSettingsModal({ showModal: false })
  };

  const essenceHandleToEdit = (e, currentEssence) => {
    const { target } = e;
    const btn = target.closest('button');
    const btnType = btn?.dataset.type;
    const essence = btn?.dataset.essence;
    const idEssence = btn?.id;
    const titleModal = {
      category: 'категории',
      count: 'счёта',
      operation: 'операции',
      translation: 'перевода',
    };
    const contentModal = {
      category: `категорию: ${currentEssence?.name}`,
      count: `счёт ${currentEssence?.name} и все связанные с ним операции и переводы`,
      operation: `операцию от ${getDate(currentEssence?.date)} числа`,
      translation: `перевод от ${displayDate(currentEssence?.createdAt)}`,
    };
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
      case 'masterCount':
        localStorageService.setMasterCount(idEssence);
        const newUser = { ...user, masterCount: idEssence };
        dispatch(updateUser(newUser));
        break;
      case 'like':
        const editedEssence = {
          ...currentEssence,
          like: currentEssence.like ? !currentEssence.like : true,
        };
        if (essence === 'category') dispatch(categoriesUpdate(editedEssence));
        if (essence === 'count') dispatch(countUpdate(editedEssence));
        break;
      case 'remove':
        setSettingsModal({
          showModal: true,
          titleModal: `Удаление ${titleModal[essence]}:`,
          contentModal: `Вы уверены, что желаете удалить ${contentModal[essence]}?`,
          onChangeModal: () => onChangeModal(essence, idEssence),
          onClose: () => setSettingsModal({ showModal: false }),
        });
        break;
      case 'translationsAdd':
        setTypeForm(btnType);
        appearanceForm();
        break;
    }
  };

  const transform = show ? 'scale(0)' : 'scale(1)';

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
        essenceHandleToEdit,
        currentPage,
        setCurrentPage,
        handlePageChange,
        setCurrentEssence,
        toast,
        setToast,
        formType,
        toggleFormType,
        setError,
        setSettingsToast,
        settingsToast,
        setSuccessToast,
        settingsModal,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};

export { FormsProvider, useSettings };