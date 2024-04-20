import { BsDisplay, BsPlus } from "react-icons/bs";
import React, { useState, useEffect, useRef } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmDeleteModal from "../Confirmacao/Confirmacao";
import UpdateModal from "../UpdateModal/UpdateModal";
import './VerPostagem.css';

function PostagensModal() {
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [keywordOption, setKeywordOption] = useState("");
  const inputFileRef = useRef(null); // Referência ao input de arquivo


  const handleDeletePost = (postId) => {
    setPostIdToDelete(postId);
    setShowConfirmModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  useEffect(() => {
    fetchPostagens();
  }, []);
  
  const fetchPostagens = async () => {
    try {
      setLoading(true); // Definir loading como true antes de iniciar a busca
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        formatPostagensData(data);
        setPostagens(data);
      } else {
        console.error("Erro ao buscar postagens:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setLoading(false); // Definir loading como false após a conclusão da busca
    }
  };

 
  
  const confirmDeleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/post/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      if (response.ok) {
        const updatedPostagens = postagens.filter((postagem) => postagem.id !== postIdToDelete);
        setPostagens(updatedPostagens);
      } else {
        console.error("Erro ao excluir postagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    } finally {
      setShowConfirmModal(false);
    }
  };


  const formatPostagensData = (data) => {
    data.forEach((postagem) => {
      const publishedDate = new Date(postagem.publishedAt).toLocaleDateString('pt-BR');
      postagem.publishedAt = publishedDate;

      const publishedTime = new Date(postagem.publishedAt).toLocaleTimeString('pt-BR');
      postagem.publishedTime = publishedTime;
    });
  };

  const handleKeywordOptionChange = (event) => {
    setKeywordOption(event.target.value);
  };

  const handleAddKeyword = async (postId, keyword) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/tag", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const tags = await response.json();
        const existingTag = tags.find(tag => tag.name === keyword);

        if (existingTag) {
          console.log("A tag já existe:", existingTag);
        } else {
          console.log("A tag ainda não existe. Adicione-a aqui...");
        }
      } else {
        console.error("Erro ao buscar tags:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar tags:", error);
    }
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
                      <th>Palavras-chave</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postagens.map((postagem, index) => (
                      <tr key={index}>
                        <td className="content-cell-title center">
                          <div className="scrollable-content">
                            {postagem.title}
                          </div>
                          </td>
                        <td className="content-cell">
                          <div className="scrollable-content center">
                            {postagem.content}
                          </div>
                        </td>
                        <td className="center">
                          {postagem.categories.map((categoria, index) => (
                            <span key={index}> {categoria.name}</span>
                          ))}
                        </td>
                        <td className="center">{postagem.publishedAt}</td>
                        <td>
                          <ul>
                            <div className="justify">
                          <BsPlus className="add-icon " onClick={() => handleAddKeyword(postagem.id)} />
                          </div>{postagem.tags.map((tag, index) => (
                              <li key={index}>{tag.name}</li>
                            ))}
                        
                          </ul>
                          
                        </td>
                        <td className="center">
                          <BsPencilSquare
                            className="edit-icon"
                            onClick={() => handleEditPost(postagem)}
                          />
                          <BsTrash
                            className="delete-icon"
                            onClick={() => handleDeletePost(postagem.id)}
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
        onConfirmDelete={confirmDeleteHandler}
      />

      {selectedPost && (
        <UpdateModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          phrase="Atualizar post"
          options={["Adicionar palavra-chave", "Remover palavra-chave"]}
          placeholder="Nova palavra-chave"
          onUpdate={(option, newValue) => {
            if (option === "Adicionar palavra-chave") {
              handleAddKeyword(selectedPost.id, newValue);
            } else {
              // Implemente a lógica para remover a palavra-chave
            }
          }}
        />
      )}
    </>
  );
}

export default PostagensModal;

