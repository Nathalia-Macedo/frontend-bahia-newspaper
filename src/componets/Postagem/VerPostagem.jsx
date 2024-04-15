import React, { useState, useEffect } from "react";

function PostagensModal() {
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostagens();
  }, []);

  const fetchPostagens = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
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

  return (
    <div className="" id="postagensModal" tabIndex="-1" aria-labelledby="postagensModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="">
          <div className="">
            <h5 className="modal-title" id="postagensModalLabel">Postagens</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Conteúdo</th>
                    <th>Imagens</th>
                    <th>Categoria</th>
                    <th>Data de Publicação</th>
                  </tr>
                </thead>
                <tbody>
                  {postagens.map((postagem, index) => (
                    <tr key={index}>
                      <td>{postagem.titulo}</td>
                      <td>{postagem.conteudo}</td>
                      <td>{postagem.imagens.join(", ")}</td>
                      <td>{postagem.categoria}</td>
                      <td>{postagem.data_publicacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostagensModal;
