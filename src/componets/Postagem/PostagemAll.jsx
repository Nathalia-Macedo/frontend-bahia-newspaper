import React, { useState, useEffect } from "react";
import orderBy from 'lodash/orderBy';
import './PostagemAll.css'

function PostagemAll() {
  const [postagensOriginais, setPostagensOriginais] = useState([]);
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postagensPorPagina] = useState(10);
  const [ordenacao, setOrdenacao] = useState(""); // Estado para controlar a opção de ordenação selecionada

  useEffect(() => {
    fetchPostagens();
  }, []); // Chamada apenas uma vez quando o componente for montado

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
        setPostagens(data); // Define as postagens iniciais
      } else {
        console.error("Erro ao buscar postagens:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setLoading(false);
    }
  };



  // Função para lidar com a mudança na opção de ordenação
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
        ordenarPorMaisAntigas(); // Chamada da função para ordenar por datas mais antigas
      }else {
      // Se nenhuma opção for selecionada, manter as postagens na ordem original
      setPostagens(postagensOriginais);
    }
  };

  // Adicione uma nova função para ordenar por datas mais antigas
const ordenarPorMaisAntigas = () => {
    const postagensOrdenadas = orderBy(postagens, ['publishedAt'], ['asc']);
    setPostagens(postagensOrdenadas);
  };
  

  // Adicione uma nova função para ordenar por datas mais antigas
const ordenarPorMaisRecentes = () => {
    const postagensOrdenadas = orderBy(postagens, ['publishedAt'], ['desc']);
    setPostagens(postagensOrdenadas);
  };

  // Função para ordenar as postagens de acordo com a quantidade de cliques (do menor para o maior)
  const ordenarPorMenosCliques = () => {
    const postagensOrdenadas = orderBy(postagens, ['post_view_count'], ['asc']);
    setPostagens(postagensOrdenadas);
  };

  // Função para ordenar as postagens de acordo com a quantidade de cliques (do maior para o menor)
  const ordenarPorMaisCliques = () => {
    const postagensOrdenadas = orderBy(postagens, ['post_view_count'], ['desc']);
    setPostagens(postagensOrdenadas);
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div style={{ width: "95%", margin: "0 auto", padding:"2rem", borderRadius:'5px', border: "1px solid #ccc", maxHeight: "500px", overflowY: "auto" }}>

      <div className="init_post_table">
        <input type="text" placeholder="O que está procurando?" />
   
        <select className="custom-select" value={ordenacao} onChange={handleOrdenacaoChange}>
          <option value="">Selecione uma opção de ordenação</option>
          <option value="MaisRecentes">Mais recentes</option>
          <option value="MaisAntigas">Mais antigas</option>
          <option value="maisCliques">Mais cliques</option>
          <option value="menosCliques">Menos cliques</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Título</th>
            <th style={{ width: "300px" }}>Conteúdo</th>
            <th style={{ width: "100px" }}>Categorias</th>
            <th style={{ width: "100px" }}>Palavras-Chave</th>
            <th style={{ width: "100px" }}>Quantidade de cliques</th>
            <th style={{ width: "100px" }}>Data de publicação</th> 
          </tr>
        </thead>
        <tbody>
          {postagens.map((postagem) => (
            <tr key={postagem.id}>
              <td>{postagem.title}</td>
              <td><div className="scrollable-content">{postagem.content}</div></td>
              <td>
                {postagem.categories.map((categoria, index) => (
                  <span key={index}>{categoria.name}</span>
                ))}
              </td>
              <td>
                {postagem.tags.map((tag, index) => (
                  <li style={{listStyle:'none'}} key={index}>{tag.name}</li>
                ))}
              </td>
              <td>{postagem.post_view_count}</td>
              <td>{new Date(postagem.publishedAt).toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostagemAll;
