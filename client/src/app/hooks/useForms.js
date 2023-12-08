import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from './useSettings';
import { useFields } from './useFields';

const useForms = ({ state, error, valueConverted, essence , fields}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(state);
  const { setToast, startClearFunc, setStatusOperation } = useSettings();
  const errors = { fields: {}, isValid: false };

  const { errorsForm } = useFields(essence, data.defaultState, fields);

  const register = (field) => ({
    value: data.defaultState[field],
    name: field,
    error: errors.fields[field],
    onChange: ({ target }) => {
      if (error) {
        setToast((state) => ({ ...state, show: 'hide' }));
        startClearFunc();
      }
      if (field === 'status') {
        setStatusOperation(target.value);
        setData((state) => ({
          ...state,
          defaultState: { ...state.defaultState, ['categoryId']: '' },
        }));
      }
      return setData((state) => ({
        ...state,
        defaultState: { ...state.defaultState, [field]: target.value },
      }));
    },
  });

  const validate = (validateMethod, fieldName, value) => {
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof value === 'boolean' && fieldName !== 'stayOn')
          errors.isValid = !value;
        else if (typeof value === 'string')
          errors.isValid = value.trim() === '';
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        errors.isValid = !emailRegExp.test(value);
        break;
      }
      case 'isUpperSymbol': {
        const upperRegExp = /[A-Z]+/g;
        errors.isValid = !upperRegExp.test(value);
        break;
      }
      case 'isContainDigit': {
        let digitRegExp;
        if (fieldName === 'password') digitRegExp = /\d+/g;
        else digitRegExp = /^\d+$/;
        errors.isValid = !digitRegExp.test(value);
        break;
      }
      case 'min': {
        errors.isValid =
          value.length < data.errors[fieldName][validateMethod].length;
        break;
      }
      case 'minBalance': {
        if (valueConverted)
          errors.isValid =
            valueConverted < data.errors[fieldName][validateMethod].value;
        else
          errors.isValid = value < data.errors[fieldName][validateMethod].value;
        break;
      }
      default:
        break;
    }
    if (errors.isValid && !errors.fields[fieldName])
      errors.fields[fieldName] = data.errors[fieldName][validateMethod].message;
  };

  for (const [fieldName, value] of Object.entries(data.defaultState)) {
    for (const validateMethod in data.errors[fieldName]) {
      validate(validateMethod, fieldName, value);
    }
  }

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const path = {
      navigate,
      redirect: location.state ? location.state.from?.pathname : '/',
    };
    onSubmit(data, path);
  };

  return { register, data, handleSubmit, errors, errorsForm };
};

export { useForms };
