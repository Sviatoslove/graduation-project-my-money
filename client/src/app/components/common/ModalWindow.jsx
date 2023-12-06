import React, { useRef } from 'react';
import { useSettings } from '../../hooks/useSettings';

const ModalWindow = () => {
  const { settingsModal } = useSettings();
  const {
    showModal,
    titleModal,
    contentStart,
    contentModal,
    onChangeModal,
    onClose,
  } = settingsModal;
  return (
    <div
      className={'modal fade bg-modal d-block ' + (showModal ? 'show' : '')}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog shadow-modal br-10">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="d-flex align-items-center modal-title fs-5 mx-auto"
              id="staticBackdropLabel"
            >
              <strong>{titleModal}</strong>
              <div className="w-content me-2 ms-2">
                {contentModal?.badge && contentModal.badge}
              </div>
            </h1>
          </div>
          <div className="modal-body ff-roboto">
            <div className="d-flex">
              {contentStart} {contentModal?.start}
              <div
                className={
                  'flex-grow-1 text-center text-' +
                  contentModal?.color
                }
              >
                {contentModal?.name}
              </div>
            </div>
              {contentModal?.end}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success shadow-success"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              type="button"
              className="btn btn-danger shadow-danger"
              onClick={onChangeModal}
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
