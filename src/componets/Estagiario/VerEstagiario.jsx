import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BsPencilSquare, BsTrash } from "react-icons/bs"; // Importa os ícones de lápis e lixeira
import './VerEstagiario.css';
import ConfirmDeleteModal from "../Confirmacao/Confirmacao";
import UpdateModal from "../UpdateModal/UpdateModal";
import Toast from "react-bootstrap/Toast";

function VerEstagiarios() {
  const [estagiarios, setEstagiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [estagiarioToDelete, setEstagiarioToDelete] = useState(null);
  const [selectedEstagiarioId, setSelectedEstagiarioId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  useEffect(() => {
    fetchEstagiarios();
  }, []);

  const fetchEstagiarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEstagiarios(data);
      } else {
        console.error("Erro ao buscar estagiários:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar estagiários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIconClick = (estagiario) => {
    setEstagiarioToDelete(estagiario);
    setShowConfirmDeleteModal(true);
  };

  const handleUpdateData = async (selectedOption, newValue) => {
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      const id = selectedEstagiarioId;
      let body = {}; // Inicialize body como um objeto vazio
  
      if (selectedOption === "Email") {
        body.email = newValue;
        body.username = ""; // Defina o username como uma string vazia
      } else if (selectedOption === "Nome de usuário") {
        body.username = newValue;
        body.email = ""; // Defina o email como uma string vazia
      }
  
      const response = await fetch(`http://34.125.197.110:3333/user/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        setShowUpdateToast(true);
        fetchEstagiarios();
      } else {
        console.error("Erro ao atualizar dados do estagiário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do estagiário:", error);
    } finally {
      setShowUpdateModal(false);
    }
  };
  

  const handleCloseModal = () => {
    setShowConfirmDeleteModal(false);
    setShowUpdateModal(false);
  };

  const handleAddEstagiarioClick = () => {
    setShowUpdateModal(true);
  };

  const handleDeleteEstagiario = async (estagiario) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/user/${estagiario.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setShowDeleteToast(true);
        fetchEstagiarios();
      } else {
        console.error("Erro ao excluir estagiário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir estagiário:", error);
    } finally {
      setShowConfirmDeleteModal(false);
    }
  };

  return (
    <div className="table-container">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      ) : (
        <div className="table-wrapper">
          {estagiarios.length === 0 ? (
            <div>
              <p>Nenhum estagiário cadastrado. Vá para a opção Adicionar Estagiário</p>
            </div>
          ) : (
            <table className="estagiarios-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {estagiarios.map((estagiario, index) => (
                  <tr key={index}>
                    <td>{estagiario.username}</td>
                    <td className="especial">
                      {estagiario.email}
                      <span className="icon-container">
                        <BsPencilSquare className="icon-pencil" onClick={() => {setSelectedEstagiarioId(estagiario.id); setShowUpdateModal(true);}} />
                        <BsTrash className="icon-trash" onClick={() => handleDeleteIconClick(estagiario)} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Toast de exclusão de estagiário */}
      <Toast
        onClose={() => setShowDeleteToast(false)}
        show={showDeleteToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "green",
          color:"white"
        }}
      >
       
      
        <Toast.Body>Estagiário excluído com sucesso!</Toast.Body>
      </Toast>

      {/* Toast de atualização de dados */}
      <Toast
        onClose={() => setShowUpdateToast(false)}
        show={showUpdateToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "green",
          color:"white"
        }}
      >
     
        <Toast.Body>Dados atualizados com sucesso!</Toast.Body>
      </Toast>

      <ConfirmDeleteModal
        show={showConfirmDeleteModal}
        onHide={handleCloseModal}
        entityName={estagiarioToDelete ? estagiarioToDelete.username : ""}
        onConfirmDelete={() => handleDeleteEstagiario(estagiarioToDelete)}
      />

      {showUpdateModal && (
        <UpdateModal
          show={showUpdateModal}
          onClose={handleCloseModal}
          phrase="O que gostaria de atualizar do estagiário?"
          options={["Email", "Nome de usuário"]}
          placeholder="Digite o novo valor aqui"
          onUpdate={handleUpdateData}
        />
      )}
    </div>
  );
}

export default VerEstagiarios;
