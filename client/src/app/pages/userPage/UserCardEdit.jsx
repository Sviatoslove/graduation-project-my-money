import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AvatarsField,
  RadioField,
  TextField,
} from '../../components/common/form';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAvatars,
  selectAvatars,
  selectAvatarsDataStatus,
} from '../../store/avatarsSlice';
import { selectSuccessNetwork, updateUser } from '../../store/usersSlice';
import { useForms } from '../../hooks/useForms';
import { validatorConfigUser } from '../../utils/validator';
import { useSettings } from '../../hooks/useSettings';
import UserAvatar from '../../components/common/UserAvatar';

const UserCardEdit = ({user}) => {
  const dispatch = useDispatch();
  const {
    setSettingsToast,
    setSuccessToast,
    successToast
  } = useSettings();
  const [show, setShow] = useState('');
  const { register, data, handleSubmit, errors } = useForms({defaultState: user, errors: validatorConfigUser});
  const successNetwork = useSelector(selectSuccessNetwork());
  const avatarsDataStatus = useSelector(selectAvatarsDataStatus());
  const avatars = useSelector(selectAvatars());


  useEffect(() => {
    if (!avatarsDataStatus) {
      dispatch(loadAvatars());
    }
  }, []);

  useEffect(() => {
    if (successNetwork && successToast === null) {
      setSuccessToast(successNetwork);
      setSettingsToast({
        badge:  <UserAvatar image={data.defaultState.avatar} height="56px" />,
        typeForm: 'successNetwork',
      });
    }
  }, [successNetwork]);

  const onSubmit = (data) => {
    if (errors.isValid) return
    dispatch(updateUser({payload: data.defaultState}));
    setShow('');
  };

  const handleToEdit = () => {
    show ? setShow('') : setShow('show');
  };


  if (avatarsDataStatus) {
    return (
      <div className={'d-flex align-items-center justify-content-around mx-auto rounded-3 border-0 user-edit ' + show}>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '520px' }}>
          <div className="d-flex justify-content-between">
            <TextField
              label="Имя"
              {...register('name')}
              style={{width:'250px',zIndex:0}}
            />
            <TextField
              label="Электронная почта"
              {...register('email')}
              style={{width:'250px',zIndex:0}}
            />
          </div>
          <AvatarsField
            label="Выбери аватарку"
            options={avatars}
            count={12}
            {...register('avatar')}
          />
          <RadioField
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
            {...register('sex')}
          />
          <button
            type="submit"
            className="btn btn-primary w-100 mx-auto mb-3"
            disabled={!!Object.keys(errors.fields).length}
          >
            Обновить
          </button>
        </form>
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={handleToEdit}
          style={{ zIndex: 1 }}
        >
          <i
            className={show ? 'bi bi-x-circle' : 'bi bi-gear'}
            style={{ fontSize: '32px' }}
          ></i>
        </button>
      </div>
    );
  }
};

UserCardEdit.propTypes={
  user: PropTypes.object
}

export default UserCardEdit;
