import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmDeleteModal from "../Confirmacao/Confirmacao";
import './VerPostagem.css'
function PostagensModal() {
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar a exibição do modal de confirmação
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const handleDeletePost = (postId) => {
    setPostIdToDelete(postId); // Define o ID da postagem a ser excluída
    setShowConfirmModal(true); // Abre o modal de confirmação
  };

  useEffect(() => {
    fetchPostagens();
  }, []);

  const confirmDeleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/post/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Atualize a lista de postagens removendo a postagem excluída
        const updatedPostagens = postagens.filter((postagem) => postagem.id !== postIdToDelete);
        setPostagens(updatedPostagens);
      } else {
        console.error("Erro ao excluir postagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    } finally {
      // Feche o modal de confirmação
      setShowConfirmModal(false);
    }
  };

  const fetchPostagens = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        formatPostagensData(data); // Formata os dados das postagens
        setPostagens(data);
      } else {
        console.error("Erro ao buscar postagens:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar a data das postagens
  const formatPostagensData = (data) => {
    data.forEach((postagem) => {
      // Formata a data de publicação para exibir apenas a data no formato correto
      const publishedDate = new Date(postagem.publishedAt).toLocaleDateString('pt-BR');
      postagem.publishedAt = publishedDate;

      // Adiciona uma nova propriedade para armazenar apenas o horário de publicação
      const publishedTime = new Date(postagem.publishedAt).toLocaleTimeString('pt-BR');
      postagem.publishedTime = publishedTime;
    });
  };

  return (
    <>
      <div className="" id="postagensModal" tabIndex="-1" aria-labelledby="postagensModalLabel" aria-hidden="true">
        <div className="">
          <div className="">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : postagens.length === 0 ? (
                <div className="text-center">
                  <h3>Nenhuma postagem a ser exibida</h3>
                  <span>Vá para a aba de adicionar postagem</span>
                </div>
              ) : (
                <table className="table">
                  <thead className="center">
                    <tr>
                      <th>Título</th>
                      <th>Conteúdo</th>
                      <th>Categoria</th>
                      <th>Data de Publicação</th>
                      <th>Ações</th> {/* Nova coluna para as ações */}
                    </tr>
                  </thead>
                  <tbody>
                    {postagens.map((postagem, index) => (
                      <tr key={index}>
                        <td>{postagem.title}</td>
                        <td>
                          <div className="scrollable-content">
                          {postagem.content}
                          </div>
                        </td>
                        <td>
                          {postagem.categories.map((categoria, index) => (
                            <span key={index}> {categoria.name}</span>
                          ))}
                        </td>
                        <td>{postagem.publishedAt}</td>
                        <td>
                          <BsPencilSquare className="edit-icon" /> {/* Ícone de lápis */}
                          <BsTrash
                            className="delete-icon"
                            onClick={() => handleDeletePost(postagem.id)} // Passa o ID da postagem para a função handleDeletePost
                          />        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        entityName="postagem"
        onConfirmDelete={confirmDeleteHandler} // Chame a função que realizará a exclusão da postagem
      />
    </>
  );
}

export default PostagensModal;
