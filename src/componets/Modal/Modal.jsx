import React from 'react';
<<<<<<< HEAD
import "./Modal.css";

function ModalComponent({ show, handleClose, modalTitle, modalContent, error }) {
=======
import "./Modal.css"
function ModalComponent({ show, handleClose, modalTitle, modalContent }) {
>>>>>>> b61b034ebe26ce0b89dcbed2524e15d57867c77f
  if (!show) {
    return null;
  }

<<<<<<< HEAD
  const modalClassName = error ? 'custom-modal error' : 'custom-modal';

  return (
    <div className={modalClassName}>
=======
  return (
    <div className="custom-modal">
>>>>>>> b61b034ebe26ce0b89dcbed2524e15d57867c77f
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h5 className="modal-title">{modalTitle}</h5>
          <button type="button" className="btn-close" onClick={handleClose} aria-label="Close">X</button>
        </div>
        <div className="custom-modal-body">{modalContent}</div>
<<<<<<< HEAD
        <div className="custom-modal-footer"></div>
=======
        <div className="custom-modal-footer">
        </div>
>>>>>>> b61b034ebe26ce0b89dcbed2524e15d57867c77f
      </div>
    </div>
  );
}

export default ModalComponent;
