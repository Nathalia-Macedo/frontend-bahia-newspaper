import React, { useState, useEffect } from "react";
import orderBy from 'lodash/orderBy';
import './PostagemAll.css';
import { MdDateRange } from 'react-icons/md';
import { MdLabel } from 'react-icons/md';
import { FaSearchPlus, FaFilter } from 'react-icons/fa';

function PostagemAll() {
  const [postagensOriginais, setPostagensOriginais] = useState([]);
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postagensPorPagina] = useState(10);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [ordenacao, setOrdenacao] = useState(""); 
  const [showFiltroOpcoes, setShowFiltroOpcoes] = useState(false);

  useEffect(() => {
    fetchPostagens();
  }, []); 

  const fetchPostagens = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/post?page=1&limit=${postagensPorPagina}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPostagensOriginais(data);
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

  const filtrarPostagensPorData = (postagens) => {
    if (!dataInicio || !dataFim) {
      return postagens; 
    }
    const dataInicioTimestamp = new Date(dataInicio).getTime();
    const dataFimTimestamp = new Date(dataFim).getTime();
    return postagens.filter(postagem => {
      const postagemTimestamp = new Date(postagem.publishedAt).getTime();
      return postagemTimestamp >= dataInicioTimestamp && postagemTimestamp <= dataFimTimestamp;
    });
  };

  const handleFiltrarClick = () => {
    const postagensFiltradas = filtrarPostagensPorData(postagensOriginais);
    setPostagens(postagensFiltradas);
  };

  const handleOrdenacaoChange = (event) => {
    const novaOrdenacao = event.target.value;
    setOrdenacao(novaOrdenacao);
    if (novaOrdenacao === "maisCliques") {
      ordenarPorMaisCliques();
    } else if (novaOrdenacao === "menosCliques") {
      ordenarPorMenosCliques();
    } else if (novaOrdenacao === "MaisRecentes") {
      ordenarPorMaisRecentes(); 
    } else if (novaOrdenacao === "MaisAntigas") {
      ordenarPorMaisAntigas();
    } else {
      setPostagens(postagensOriginais);
    }
  };

  const ordenarPorMaisAntigas = () => {
    const postagensOrdenadas = orderBy(postagens, ['publishedAt'], ['asc']);
    setPostagens(postagensOrdenadas);
  };

  const ordenarPorMaisRecentes = () => {
    const postagensOrdenadas = orderBy(postagens, ['publishedAt'], ['desc']);
    setPostagens(postagensOrdenadas);
  };

  const ordenarPorMenosCliques = () => {
    const postagensOrdenadas = orderBy(postagens, ['post_view_count'], ['asc']);
    setPostagens(postagensOrdenadas);
  };

  const ordenarPorMaisCliques = () => {
    const postagensOrdenadas = orderBy(postagens, ['post_view_count'], ['desc']);
    setPostagens(postagensOrdenadas);
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="container_post">
      <div className="init-post-table">
        <input className="search-post" type="text" placeholder="O que está procurando?" />
        <div className="filter-options">
          <div onClick={() => setShowFiltroOpcoes(!showFiltroOpcoes)} className="filter-icon">
            <FaFilter />
          </div>
          {showFiltroOpcoes && (
            <div className="options-menu">
              <span>Adicionar Filtro</span>
              <div className="filter-option" onClick={handleFiltrarClick}>
                <MdDateRange />
                <span>Data</span>
              </div>
              <div className="filter-option" onClick={handleFiltrarClick}>  
                <MdLabel />
                <span>Tags</span>
              </div>
            </div>
          )}
        </div>
        <select className="order-select" value={ordenacao} onChange={handleOrdenacaoChange}>
          <option value="">Selecione uma opção de ordenação</option>
          <option value="MaisRecentes">Mais recentes</option>
          <option value="MaisAntigas">Mais antigas</option>
          <option value="maisCliques">Mais cliques</option>
          <option value="menosCliques">Menos cliques</option>
        </select>
      </div>

      <table className="post-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Conteúdo</th>
            <th>Categorias</th>
            <th>Visualizações</th>
            <th>Data de publicação</th> 
            <th>Mais Detalhes</th> 
          </tr>
        </thead>
        <tbody>
          {filtrarPostagensPorData(postagens).map((postagem) => (
            <tr key={postagem.id}>
              <td>{postagem.title}</td>
              <td><div className="scrollable-content">{postagem.content}</div></td>
              <td>
                {postagem.categories.map((categoria, index) => (
                  <span key={index}>{categoria.name}</span>
                ))}
              </td>
              <td>{postagem.post_view_count}</td>
              <td>{new Date(postagem.publishedAt).toLocaleDateString("pt-BR")}</td>
              <td className="center"><FaSearchPlus/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostagemAll;
