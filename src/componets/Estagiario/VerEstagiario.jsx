import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BsPencilSquare, BsTrash } from "react-icons/bs"; // Importa os ícones de lápis e lixeira
import './VerEstagiario.css';
import ConfirmDeleteModal from "../Confirmacao/Confirmacao";
import UpdateModal from "../UpdateModal/UpdateModal";

function VerEstagiarios() {
  const [estagiarios, setEstagiarios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o indicador de loading
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [estagiarioToDelete, setEstagiarioToDelete] = useState(null);
  const [selectedEstagiarioId, setSelectedEstagiarioId] = useState(null); // Estado para armazenar o ID do estagiário selecionado
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newEmail, setNewEmail] = useState(""); // Estado para armazenar o novo email digitado
  const [newUsername, setNewUsername] = useState(""); // Estado para armazenar o novo nome de usuário digitado

  useEffect(() => {
    fetchEstagiarios();
  }, []);

  const fetchEstagiarios = async () => {
    try {
      const token = localStorage.getItem("token"); // Obter token do localStorage
      const response = await fetch("http://34.125.197.110:3333/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Incluir token nas headers
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
      setLoading(false); // Define o estado de loading como false quando a requisição é concluída
    }
  };

  const handleDeleteIconClick = (estagiario) => {
    setEstagiarioToDelete(estagiario);
    setShowConfirmDeleteModal(true);
  };

  const handleUpdateData = async (selectedOption, newValue) => {
    setLoading(true); // Define o estado de loading como true antes de iniciar a atualização

    try {
      const token = localStorage.getItem("token"); // Obter token do localStorage
      const id = selectedEstagiarioId; // Id do estagiário selecionado, certifique-se de ter esse valor disponível no escopo
      const body = {}; // Objeto que conterá os dados a serem atualizados

      // Verifique qual opção foi selecionada e defina os valores correspondentes no corpo da requisição
      if (selectedOption === "Email") {
        body.email = newValue;
      } else if (selectedOption === "Nome de usuário") {
        body.username = newValue;
      }

      // Faça a requisição PUT para atualizar os dados do estagiário
      const response = await fetch(`http://34.125.197.110:3333/user/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Incluir token nas headers
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        console.log("Dados do estagiário atualizados com sucesso.");
        // Atualize a lista de estagiários buscando novamente os dados
        fetchEstagiarios();
      } else {
        console.error("Erro ao atualizar dados do estagiário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do estagiário:", error);
    } finally {
      // Feche o modal de atualização
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
        console.log("Estagiário excluído com sucesso.");
        // Atualize a lista de estagiários buscando novamente os dados
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
      <h1>Estagiários</h1>
      {loading ? ( // Renderiza o spinner de loading enquanto os dados estão sendo carregados
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
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
                        <BsPencilSquare className="icon-pencil" onClick={() => {setSelectedEstagiarioId(estagiario.id); setShowUpdateModal(true);}} /> {/* Ícone de lápis */}
                        <BsTrash className="icon-trash" onClick={() => handleDeleteIconClick(estagiario)} /> {/* Ícone de lixeira */}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      <ConfirmDeleteModal
        show={showConfirmDeleteModal}
        onHide={handleCloseModal}
        entityName={estagiarioToDelete ? estagiarioToDelete.username : ""}
        onConfirmDelete={() => handleDeleteEstagiario(estagiarioToDelete)} // Aqui você deve passar a função que lida com a exclusão do estagiário
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
