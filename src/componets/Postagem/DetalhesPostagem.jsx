import React, { useState, useEffect } from 'react';
import './DetalhesPostagem.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import ConfirmDeleteModal from '../Confirmacao/Confirmacao';
import Spinner from 'react-bootstrap/Spinner';

function DetalhesPostagem({ postId, updatePostagens }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showModal, setShowModal] = useState(true);


  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        const data = await response.json();
        console.log(data)
        setPost(data);
      } else {
        console.error("Erro ao buscar detalhes da postagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da postagem:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/post/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setShowDeleteModal(false);
        setLoadingPosts(true);

        // Após excluir o post, recarregamos os detalhes da postagem
        await fetchPost();
        if (updatePostagens) {
          updatePostagens(); // Atualiza a lista de postagens no componente pai
          setShowModal(false);

        }
      } else {
        console.error("Erro ao excluir postagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    } finally {
      setLoadingPosts(false);

    }
  };

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  if (!post) {
    return <div>Nenhuma postagem encontrada para o ID fornecido.</div>;
  }

  return (
    <div className="detalhes-postagem">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Data de publicação: {new Date(post.publishedAt).toLocaleString()}</p>
      <p>Visualizações: {post.post_view_count}</p>
      <p>Tags: {post.tags ? post.tags.map(tag => tag.name).join(', ') : ''}</p>
      <div className="icons">
        <FaPencilAlt className="edit-icon" />
        <FaTrash className="delete-icon" onClick={() => setShowDeleteModal(true)} />
      </div>
      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        entityName="postagem"
        onConfirmDelete={handleDeletePost}
      />
      {loadingPosts && <Spinner animation="border" role="status" />}
    </div>
  );
}

export default DetalhesPostagem;
