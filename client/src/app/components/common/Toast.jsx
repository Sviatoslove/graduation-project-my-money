import React, { useEffect } from 'react';
import { useForms } from '../../hooks/useForms';
import getDate from '../../utils/getDate';
import { displayDate } from '../../utils';
import Badge from './Badge';

const Toast = () => {
  const { toast, setError } = useForms();
  const { imgSrc, icon, iconSize, title, date, content, error, show, badge } = toast;

  const handleClick = () => {
    setError('');
  };

  return (
    <div className={'toast-container position-absolute p-3 ' + show}>
      <div
        id="liveToast"
        className={
          'toast ' + show + ' shadow-' + (error ? 'danger ' : 'success ')
        }
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <Badge
            color={error ? 'danger' : 'success'}
            classes={'me-2 br-5 fs-2 shadow-' + (error ? 'danger' : 'success')}
          />
          <strong className="me-auto">{title}</strong>
          <strong>
            {!date
              ? getDate().split('-').reverse().join('.')
              : displayDate(date)}
          </strong>
          {toast.typeForm === 'auth' && (
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={handleClick}
            ></button>
          )}
        </div>
        <div
          className={
            'toast-body text-center align-items-center d-flex w-content mx-auto p-1'
          }
        >
              {badge && badge
          }
          {imgSrc && (
            <img
              src={imgSrc}
              className="rounded me-2"
              alt="logo"
              style={{ width: iconSize }}
            />
          )}
          {icon && <i className={icon} style={{ fontSize: iconSize }} />}
          <strong className={'fs-5 text-' + (error ? 'danger' : 'success')}>
            {content}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Toast;
