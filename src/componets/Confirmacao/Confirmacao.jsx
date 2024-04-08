import React from "react";
import "./Confirmacao.css"; // Importe o arquivo CSS correspondente

function ConfirmDeleteModal({ show, onHide, entityName, onConfirmDelete }) {
  return (
    <div className={`confirm-delete-modal ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar exclusão</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <p>Tem certeza de que deseja excluir o(a) <strong>{entityName}</strong>?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={onConfirmDelete}>Excluir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
