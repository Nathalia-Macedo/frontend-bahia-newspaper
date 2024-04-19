import React, { useState } from "react";
import './UpdateModal.css'

function UpdateModal({ show, onClose, phrase, options, placeholder, onUpdate }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setNewValue("");
    setError(""); // Limpa o erro ao trocar a opção
  };

  const handleInputChange = (event) => {
    setNewValue(event.target.value);
    if (selectedOption === "Email") {
      if (!event.target.value.includes("@") || !event.target.value.includes(".com")) {
        setError("O email deve conter '@' e '.com'");
      } else {
        setError("");
      }
    }
  };

  const handleUpdate = () => {
    if (selectedOption === "Email" && !newValue.includes("@") && !newValue.includes(".com")) {
      setError("O email deve conter '@' e '.com'");
      return;
    }

    onUpdate(selectedOption, newValue); // Passa os valores selecionados para a função onUpdate
    onClose(); // Fecha o modal
  };

  return (
    <div className={`update-modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{phrase}</h2>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option disabled selected value="">Selecione...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <input type="text" placeholder={placeholder} value={newValue} onChange={handleInputChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="btn-admin" onClick={handleUpdate}>Atualizar dados</button>
      </div>
    </div>
  );
}

export default UpdateModal;
