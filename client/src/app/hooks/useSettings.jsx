import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { operationRemove } from '../store/operationsSlice';
import { categoriesRemove, categoriesUpdate } from '../store/categoriesSlice';
import { countRemove, countUpdate } from '../store/countsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  clearSuccessNetwork,
  selectError,
  selectSuccessNetwork,
  selectUser,
  updateUser,
} from '../store/usersSlice';
import { translationRemove } from '../store/translationsSlice';
import localStorageService from '../services/localStorage.service';
import getDate from '../utils/getDate';
import Badge from '../components/common/Badge';
import { getColorsForCategories } from '../utils/getColorForCategories';

const SettingsContext = React.createContext();

const useSettings = () => useContext(SettingsContext);

const SettingsProvider = ({ children }) => {
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
  const [colors, setColors] = useState();
  const user = useSelector(selectUser());
  const errorGlobal = useSelector(selectError());
  const successNetwork = useSelector(selectSuccessNetwork());
  const startClearFunc = () => {
    switch (settingsToast?.type) {
      case 'successNetwork': {
        dispatch(clearSuccessNetwork());
        break;
      }
      default:
        if (error !== null) dispatch(clearError());
        break;
    }
    setSettingsToast(null);
    setError(null);
    setSuccessToast(null);
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
      if (settingsToast?.type !== 'auth') {
        setTimeout(() => {
          setToast((state) => ({ ...state, show: 'hide' }));
          startClearFunc();
        }, 3000);
      }
    }
  }, [error, successToast]);

  useEffect(() => {
    if (errorGlobal && successToast === null) {
      setError(errorGlobal.error ? errorGlobal.error : errorGlobal);
      setSettingsToast({
        type: errorGlobal?.type ? errorGlobal?.type : 'errorGlobal',
      });
    }
    if (
      successNetwork &&
      (successNetwork[1] === 'remove' ||
        successNetwork[1] === 'updateMasterCount')
    ) {
      setSuccessToast(successNetwork[0]);
      setSettingsToast({
        imgSrc: successNetwork[2] ? successNetwork[2] : '',
        iconSize: '56px',
        type: 'successNetwork',
      });
    }
  }, [errorGlobal, successNetwork]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const toggleFormType = () => {
    setFormType((state) => (state === 'register' ? 'login' : 'register'));
    dispatch(clearError());
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
    if (essence === 'counts') {
      if (idEssence === user.masterCount) {
        localStorageService.removeMasterCount();
        dispatch(updateUser({ payload: { ...user, masterCount: '' } }));
      }
      dispatch(countRemove(idEssence));
    }
    if (essence === 'operations') dispatch(operationRemove(idEssence));
    if (essence === 'categories') dispatch(categoriesRemove(idEssence));
    if (essence === 'translations') dispatch(translationRemove(idEssence));
    setSettingsModal({ showModal: false });
  };

  const essenceHandleToEdit = (e, currentEssence) => {
    const { target } = e;
    const btn = target.closest('button');
    const btnType = btn?.dataset.type;
    const essence = currentEssence?.dataType;
    const idEssence = btn?.id;
    switch (btnType) {
      case 'operations':
        setCurrentEssence(currentEssence);
        setTypeForm(btnType);
        appearanceForm();
        break;
      case 'categories': {
        if (location.pathname === '/') {
          disAppearanceForm();
          setTimeout(() => {
            setCurrentEssence(currentEssence);
            setTypeForm(btnType);
            appearanceForm();
          }, 501);
        } else {
          setCurrentEssence(currentEssence);
          setTypeForm(btnType);
          appearanceForm();
        }
        setColors(getColorsForCategories())
        break;
      }
      case 'translations':
        setTypeForm(btnType);
        appearanceForm();
        break;
      case 'counts':
        setTypeForm(btnType);
        setCurrentEssence(currentEssence);
        appearanceForm();
        break;
      case 'masterCount':
        if (idEssence !== user.masterCount) {
          localStorageService.setMasterCount(idEssence);
          const newUser = { ...user, masterCount: idEssence };
          dispatch(
            updateUser({
              payload: newUser,
              type: 'updateMasterCount',
              iconCount: currentEssence.icon,
            })
          );
        }
        break;
      case 'like':
        const editedEssence = {
          ...currentEssence,
          like: currentEssence.like ? !currentEssence.like : true,
        };
        if (essence === 'categories') dispatch(categoriesUpdate({payload:editedEssence, btnType }));
        if (essence === 'counts') dispatch(countUpdate({payload:editedEssence, btnType }));
        break;
      case 'remove':
        const titleModal = {
          categories: 'категории',
          counts: 'счёта',
          operations: 'операции',
          translations: 'перевода',
        };
        const contentModal = {
          categories: {
            start: 'категорию: ',
            name: currentEssence?.name,
            color: currentEssence?.textColor,
            badge: (
              <Badge
                color={currentEssence.bgColor}
                iconColor={currentEssence.iconColor}
                icon={currentEssence.icon}
                classes='br-50 '
                iconSize='fs-2 '
              />
            ),
            end: ' и все связанные с ней операции?',
          },
          counts: {
            start: 'счёт: ',
            name: currentEssence?.name,
            color: currentEssence?.color,
            badge: (
              <Badge
                imgSrc={currentEssence.icon}
                color={currentEssence.color}

                iconSize='46px'
                classes='br-50 '
                imgClasses='m'
              />
            ),
            end: ' и все связанные с ним операции и переводы?',
          },
          operations: {
            start: 'операцию от ',
            name: getDate(currentEssence?.date),
            end: '?',
          },
          translations: {
            start: 'перевод от ',
            name: getDate(currentEssence?.date),
            end: '?',
          },
        };
        setSettingsModal({
          showModal: true,
          titleModal: `Удаление ${titleModal[essence]}:`,
          contentStart: 'Вы уверены, что желаете удалить ',
          contentModal: contentModal[essence],
          onChangeModal: () => onChangeModal(essence, idEssence),
          onClose: () => setSettingsModal({ showModal: false }),
        });
        break;
      default:
        setCurrentEssence(currentEssence);
        appearanceForm();
        break;
    }
  };

  const transform = show ? 'scale(0)' : 'scale(1)';

  return (
    <SettingsContext.Provider
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
        successToast,
        startClearFunc,
        setTypeForm,
        setStatusOperation,
        colors
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettings };
