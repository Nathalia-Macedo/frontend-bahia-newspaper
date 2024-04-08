import React, { useState } from "react";
import './UpdateModal.css'
function UpdateModal({ show, onClose, phrase, options, placeholder, onUpdate }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setNewValue("");
  };

  const handleInputChange = (event) => {
    setNewValue(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate(selectedOption, newValue); // Passa os valores selecionados para a função onUpdate
    onClose(); // Fecha o modal
  };

  return (
    <div className={`update-modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{phrase}</h2>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Selecione...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <input type="text" placeholder={placeholder} value={newValue} onChange={handleInputChange} />
        <button className="btn-admin" onClick={handleUpdate}>Atualizar dados</button>
      </div>
    </div>
  );
}

export default UpdateModal;
