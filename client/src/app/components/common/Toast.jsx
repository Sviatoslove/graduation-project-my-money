import React, { useEffect } from 'react';
import { useForms } from '../../hooks/useForms';
import getDate from '../../utils/getDate';
import { displayDate } from '../../utils';
import Badge from './Badge';
import { useDispatch } from 'react-redux';
import { clearError } from '../../store/usersSlice';

const Toast = () => {
  const dispatch = useDispatch()
  const { toast, setToast } = useForms();
  const { imgSrc, icon, title, date, content, error, show } = toast;

  const handleClick = () => {
    dispatch(clearError(''))
  };

  useEffect(() => {
    if (show === 'hide') {
      setTimeout(() => setToast(''), 600);
    }
  }, [show]);

  return (
    <div className={'toast-container position-absolute p-3 ' + show}>
      <div
        id="liveToast"
        className={'toast ' + show + ' shadow-' + (error ? 'danger ' : 'success ')}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          {!icon && !imgSrc && <Badge color={error ? 'danger' : 'success'} classes={'me-2 br-5 fs-2 shadow-' + (error ? 'danger' : 'success')}/>}
          {icon && <i className={icon} />}
          {imgSrc && <img src={imgSrc} className="rounded me-2" alt="logo" />}
          <strong className="me-auto">{title}</strong>
          <strong>
            {!date
              ? getDate().split('-').reverse().join('.')
              : displayDate(date)}
          </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={handleClick}
          ></button>
        </div>
        <div className={'toast-body text-center'}><strong className={ 'text-' + (error ? 'danger':'success')}>{content}</strong></div>
      </div>
    </div>
  );
};

export default Toast;
