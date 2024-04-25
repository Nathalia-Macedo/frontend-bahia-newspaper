import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Toast from 'react-bootstrap/Toast'; // Importe o Toast do React Bootstrap
import ConfirmDeleteModal from '../Confirmacao/Confirmacao'; // Importe o modal de confirmação
import UpdateModal from '../UpdateModal/UpdateModal'; // Importe o modal de atualização

function VerCategoriasModal() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false); // Adicione o estado para controlar a exibição do Toast
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Adicione o estado para controlar a exibição do modal de atualização
  const [categoriaToUpdate, setCategoriaToUpdate] = useState(null); // Adicione o estado para armazenar o ID da categoria a ser atualizada
  const [updateError, setUpdateError] = useState(""); // Adicione o estado para armazenar a mensagem de erro de atualização

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        console.error("Erro ao buscar categorias:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false); // Desativar loading aqui após a obtenção dos dados
    }
  };
  

  const handleDeleteClick = (id) => {
    setCategoriaToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/category/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: categoriaToDelete })
      });

      if (response.ok) {
        // Atualizar a lista de categorias após a exclusão
        fetchCategorias();
        setShowToast(true); // Exibir o Toast quando a categoria for excluída com sucesso
      } else {
        console.error("Erro ao excluir categoria:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    } finally {
      // Esconder o modal de confirmação após a exclusão
      setShowConfirmModal(false);
    }
  };

  const handleUpdateClick = (id) => {
    setCategoriaToUpdate(id);
    setShowUpdateModal(true);
  };

  const handleUpdateCategoria = async (nome, descricao, campoAtualizado,categoriaToUpdate) => {
    // Verifica se foi fornecido tanto o nome quanto a descrição
    if (!nome && !descricao) {
      setUpdateError("É necessário fornecer um valor para atualização.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const endpoint = `http://34.125.197.110:3333/category/${categoriaToUpdate}`;
      const body = {};
  
      // Adiciona o campo atualizado ao corpo da requisição
      if (campoAtualizado === "nome") {
        body.name = nome;
        body.description = categorias.find(cat => cat.id === categoriaToUpdate)?.description;
      } else if (campoAtualizado === "descricao") {
        body.name = categorias.find(cat => cat.id === categoriaToUpdate)?.name;
        body.description = descricao;
      }
  
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        // Atualizar a lista de categorias após a atualização
        fetchCategorias();
        setShowToast(true); // Exibir o Toast quando a categoria for atualizada com sucesso
      } else {
        console.error("Erro ao atualizar categoria:", response.statusText);
        console.log(categoriaToUpdate)
      }
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
    } finally {
      // Esconder o modal de atualização após a atualização
      setShowUpdateModal(false);
    }
  };
  

  return (
    <>
      <div style={{ maxHeight: "298px", overflowY: "auto" }}>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome da Categoria</th>
                <th>Descrição da Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.name}</td>
                  <td>{categoria.description}</td>
                  <td>
                    <BsPencilSquare style={{ marginRight: '5px'  }} onClick={() => handleUpdateClick(categoria.id)} />
                    <BsTrash style={{cursor: 'pointer'}} onClick={() => handleDeleteClick(categoria.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal de confirmação */}
      <ConfirmDeleteModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        entityName={`categoria "${categorias.find(cat => cat.id === categoriaToDelete)?.name}"`}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* Toast de categoria excluída com sucesso */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'green',
          color: 'white'
        }}
      >
        <Toast.Body>Categoria excluída com sucesso!</Toast.Body>
      </Toast>

      {/* Modal de atualização */}
      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        phrase="Atualizar Categoria"
        options={["Nome", "Descrição"]}
        placeholder="Novo valor"
        onUpdate={handleUpdateCategoria}
      />
    </>
  );
}

export default VerCategoriasModal;
