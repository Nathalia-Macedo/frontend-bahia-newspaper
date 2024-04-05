import React from 'react';
import "./Modal.css";

function ModalComponent({ show, handleClose, modalTitle, modalContent, error }) {
  if (!show) {
    return null;
  }

  const modalClassName = error ? 'custom-modal error' : 'custom-modal';

  return (
    <div className={modalClassName}>
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h5 className="modal-title">{modalTitle}</h5>
          <button type="button" className="btn-close" onClick={handleClose} aria-label="Close">X</button>
        </div>
        <div className="custom-modal-body">{modalContent}</div>
        <div className="custom-modal-footer"></div>
      </div>
    </div>
  );
}

export default ModalComponent;
