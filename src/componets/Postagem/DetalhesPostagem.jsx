// import React, { useState, useEffect } from 'react';
// import './DetalhesPostagem.css';
// import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// import ConfirmDeleteModal from '../Confirmacao/Confirmacao';
// import Spinner from 'react-bootstrap/Spinner';
// import EdicaoPostagem from './EdicaoPostagem';

// function DetalhesPostagem({ postId, updatePostagens }) {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loadingPosts, setLoadingPosts] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const fetchPost = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://34.125.197.110:3333/post/${postId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPost(data);
//       } else {
//         console.error("Erro ao buscar detalhes da postagem:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar detalhes da postagem:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [postId]);

//   // const handleDeletePost = async () => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const response = await fetch(`http://34.125.197.110:3333/post/${postId}`, {
//   //       method: 'DELETE',
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });

//   //     if (response.ok) {
//   //       setShowDeleteModal(false);
//   //       setLoadingPosts(true);
//   //       await fetchPost();
//   //       if (updatePostagens) {
//   //         updatePostagens();
//   //       }
//   //     } else {
//   //       console.error("Erro ao excluir postagem:", response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error("Erro ao excluir postagem:", error);
//   //   } finally {
//   //     setLoadingPosts(false);
//   //   }
//   // };
//   const handleDeletePost = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://34.125.197.110:3333/post/${postId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         setShowDeleteModal(false);
//         setLoadingPosts(true);
//         await fetchPost();
//         if (updatePostagens) {
//           updatePostagens();
//         }
//         setShowModal(false); // Fechar o modal de edição, se estiver aberto
//         // Aqui, chamamos a função setShowDetalhesModal para fechar o modal de detalhes
//         setShowDetalhesModal(false);
//       } else {
//         console.error("Erro ao excluir postagem:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Erro ao excluir postagem:", error);
//     } finally {
//       setLoadingPosts(false);
//     }
// };


//   const toggleEditing = () => {
//     setShowModal(!showModal);
//   };

//   const handleHideModal = () => {
//     setShowModal(false);
//   };

//   if (loading) {
//     return <Spinner animation="border" role="status" />;
//   }

//   if (!post) {
//     return <div>Nenhuma postagem encontrada para o ID fornecido.</div>;
//   }

//   return (
//     <div className="detalhes-postagem">
//         <div className="content-container">
//             {!showModal && (
//                 <>
//                     <h2>{post.title}</h2>
//                     <p>{post.content}</p>
//                     <p>Data de publicação: {new Date(post.publishedAt).toLocaleString()}</p>
//                     <p>Visualizações: {post.post_view_count}</p>
//                     <p>Tags: {post.tags ? post.tags.map(tag => tag.name).join(', ') : ''}</p>
//                     <div className="icons">
//                         <FaPencilAlt className="edit-icon" onClick={toggleEditing} />
//                         <FaTrash className="delete-icon" onClick={() => setShowDeleteModal(true)} />
//                     </div>
//                     <ConfirmDeleteModal
//                         show={showDeleteModal}
//                         onHide={() => setShowDeleteModal(false)}
//                         entityName="postagem"
//                         onConfirmDelete={handleDeletePost}
//                     />
//                 </>
//             )}
//             {showModal && (
//                 <EdicaoPostagem
//                     post={post}
//                     onHide={handleHideModal}
//                     onSave={(updatedPost) => {
//                         console.log("Post atualizado");
//                         setShowModal(false);
//                     }}
//                 />
//             )}
//             {loadingPosts && <Spinner animation="border" role="status" />}
//         </div>
//     </div>
// );

// }

// export default DetalhesPostagem;
import React, { useState, useEffect } from 'react';
import './DetalhesPostagem.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import ConfirmDeleteModal from '../Confirmacao/Confirmacao';
import Spinner from 'react-bootstrap/Spinner';
import EdicaoPostagem from './EdicaoPostagem';

function DetalhesPostagem({ postId, updatePostagens }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://89.116.214.37:3333/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
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
      const response = await fetch(`http://89.116.214.37:3333/post/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setLoadingPosts(true);
        await fetchPost();
        if (updatePostagens) {
          updatePostagens();
        }
        setShowModal(false);
      } else {
        console.error("Erro ao excluir postagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const toggleEditing = () => {
    setShowModal(!showModal);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="detalhes-postagem">
        <div className="content-container">
          <Spinner animation="border" role="status" className="spinner-container" />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="detalhes-postagem">Nenhuma postagem encontrada para o ID fornecido.</div>;
  }

  return (
    <div className="detalhes-postagem">
      <div className="content-container">
        {!showModal && (
          <>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Data de publicação: {new Date(post.publishedAt).toLocaleString()}</p>
            <p>Visualizações: {post.post_view_count}</p>
            <p>Tags: {post.tags ? post.tags.map(tag => tag.name).join(', ') : ''}</p>
            <div className="icons">
              <FaPencilAlt className="edit-icon" onClick={toggleEditing} />
              <FaTrash className="delete-icon" onClick={() => setShowDeleteModal(true)} />
            </div>
            <ConfirmDeleteModal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              entityName="postagem"
              onConfirmDelete={handleDeletePost}
            />
          </>
        )}
        {showModal && (
          <EdicaoPostagem
            post={post}
            onHide={handleHideModal}
            onSave={(updatedPost) => {
              console.log("Post atualizado");
              setShowModal(false);
            }}
          />
        )}
        {loadingPosts && (
          <div className="spinner-container">
            <Spinner animation="border" role="status" />
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalhesPostagem;

