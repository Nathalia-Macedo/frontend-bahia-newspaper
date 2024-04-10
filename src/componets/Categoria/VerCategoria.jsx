import React, { useState, useEffect } from "react";

function VerCategoriasModal() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
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
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.name}</td>
                  <td>{categoria.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default VerCategoriasModal;
