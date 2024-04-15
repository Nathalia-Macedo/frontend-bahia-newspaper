import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmDeleteModal from '../Confirmacao/Confirmacao'; // Importe o modal de confirmação

function VerCategoriasModal() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      setLoading(false);
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

      })

      console.log(categoriaToDelete)

      if (response.ok) {
        // Atualizar a lista de categorias após a exclusão
        fetchCategorias();
        const data = await response.json(); // Se você precisar dos dados da resposta
         console.log(data);
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
                    <BsPencilSquare style={{ marginRight: '5px'  }} />
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
    </>
  );
}

export default VerCategoriasModal;
