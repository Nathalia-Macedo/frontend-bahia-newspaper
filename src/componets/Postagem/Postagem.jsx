import React, { useState, useEffect } from "react";

function ModalAddPostagem() {
  const [agendar, setAgendar] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagens, setImagens] = useState([]);
  const [erro, setErro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Buscar token do localStorage
    const authToken = localStorage.getItem("token");
    setToken(authToken);

    // Carregar categorias ao montar o componente
    fetchCategories(authToken);
  }, []);

  const fetchCategories = async (authToken) => {
    try {
      const response = await fetch("http://34.125.197.110:3333/category", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        throw new Error("Erro ao carregar categorias");
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setErro("Erro ao carregar categorias");
    }
  };

  const handleSubmit = async () => {
    if (!titulo || !conteudo || !categoria) {
      setErro("Todos os campos precisam ser preenchidos.");
      return;
    }

    // Encontrar o ID da categoria selecionada
    const categoriaSelecionada = categorias.find((cat) => cat.name === categoria);
    if (!categoriaSelecionada) {
      setErro("Categoria inválida.");
      return;
    }

    const formData = new FormData();
    formData.append("title", titulo);
    formData.append("content", conteudo);
    formData.append("category", categoriaSelecionada.id); // Enviando o ID da categoria
    console.log(categoriaSelecionada.id)
    if (imagens.length > 0) {
      for (let i = 0; i < imagens.length; i++) {
        formData.append("files", imagens[i]);
      }
    }

    sendFormData(formData);
  };

  const sendFormData = async (formData) => {
    try {
      const response = await fetch("http://34.125.197.110:3333/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Formulário enviado com sucesso!");
      } else {
        throw new Error("Erro ao enviar formulário");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErro("Erro ao enviar formulário");
    }
  };

  return (
    <div className="containerModal">
      {erro && <p style={{ color: "red", marginBottom: "10px" }}>{erro}</p>}
      <div className="mb-3">
        <label htmlFor="agendarInput" className="form-label">
          Agendar ou Postar Agora?
        </label>
        <select
          className="form-select"
          id="agendarInput"
          onChange={(e) => setAgendar(e.target.value === "agendar")}
        >
          <option value="agendar" disabled>Agendar</option>
          <option value="postar-agora">Postar Agora</option>
        </select>
      </div>
      <div id="dataHoraFields">
        <div
          className="mb-3 dive"
          style={{ display: agendar ? "flex" : "none" }}
        >
          <label htmlFor="dataInput" className="form-label">
            Data
          </label>
          <input
            type="date"
            className="form-control custom-input"
            id="dataInput"
            key={agendar ? "data" : "none"}
          />
        </div>
        <div
          className="mb-3 dive"
          style={{ display: agendar ? "flex" : "none" }}
        >
          <label htmlFor="horarioInput" className="form-label">
            Horário
          </label>
          <input
            type="time"
            className="form-control custom-input"
            id="horarioInput"
            key={agendar ? "horario" : "none"}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="tituloInput" className="form-label">
          Título da Postagem
        </label>
        <input
          type="text"
          className="form-control custom-input"
          id="tituloInput"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="conteudoInput" className="form-label">
          Conteúdo da Postagem
        </label>
        <textarea
          className="form-control custom-input"
          id="conteudoInput"
          rows="2"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3 d-flex justify-content-between">
        <div className="mb-3 more">
          <label htmlFor="categoriaInput" className="form-label">
            Categoria
          </label>
          <select
            className="form-select"
            id="categoriaInput"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="imagemInput" className="form-label">
            Imagem
          </label>
          <input
            type="file"
            className="form-control custom-input"
            id="imagemInput"
            accept="image/*"
            multiple
            onChange={(e) => setImagens([...imagens, ...e.target.files])}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn-admin">Visualizar</button>
        <button className="btn-admin" onClick={handleSubmit}>
          {agendar ? "Agendar" : "Postar Agora"}
        </button>
      </div>
    </div>
  );
}

export default ModalAddPostagem;
