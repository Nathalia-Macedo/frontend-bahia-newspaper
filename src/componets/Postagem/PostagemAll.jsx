import React, { useState, useEffect } from "react";
import orderBy from 'lodash/orderBy';
import './PostagemAll.css';

import { FaSearchPlus, FaFilter } from 'react-icons/fa';
import ModalComponent from "../Modal/Modal";
import DetalhesPostagem from "./DetalhesPostagem";

function PostagemAll() {
  const [postagensOriginais, setPostagensOriginais] = useState([]);
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postagensPorPagina] = useState(5);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [showFiltroOpcoes, setShowFiltroOpcoes] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [postIdSelecionado, setPostIdSelecionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  useEffect(() => {
    fetchPostagens();
  }, [currentPage]); 

  const fetchPostagens = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://89.116.214.37:3333/post?page=${currentPage}&limit=${postagensPorPagina}`, {
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

  const updatePostagens = async () => {
    // Rechama a função fetchPostagens para buscar novamente as postagens atualizadas
    await fetchPostagens();
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

  const handleDetalhesClick = (postId) => {
    setPostIdSelecionado(postId);
    setShowDetalhesModal(true);
  };


  const handleSearchInputChange = (event) => {
    const searchTermValue = event.target.value;
    const searchTermNormalized = searchTermValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setSearchTerm(searchTermNormalized);
  
    const filteredPostagens = postagensOriginais.filter((postagem) => {
      const titleNormalized = postagem.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const contentNormalized = postagem.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const tagsNormalized = (postagem.tags || []).map(tag => tag.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      return titleNormalized.includes(searchTermNormalized) || 
             contentNormalized.includes(searchTermNormalized) || 
             (tagsNormalized.length > 0 && tagsNormalized.some(tag => tag.includes(searchTermNormalized)));
    });
  
    setPostagens(filteredPostagens);
  };
  
//   //estabelecendo uma função que aceita um objeto de evento como argumento
//   const handleSearchInputChange = (event) => {
//     /*Estamos normalizando o valor do campo de busca neste 
//     caso. O valor do campo de busca atual é representado por 
//     event.target.value. Para tornar a busca insensível a 
//     maiúsculas/minúsculas, toLowerCase() transforma todas as 
//     letras em minúsculas. A normalização ("NFD") é usada para
//      separar os caracteres acentuados ou especiais em formas 
//      básicas , como acentos. 
//  */
//     const searchTermNormalized = event.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
//     /*Esta linha informa o estado do termo de busca usando o 
//     valor do campo de busca atual. Isso é para garantir que o
//      estado esteja sincronizado com as informações fornecidas
//       pelo usuário .
//  */
//     setSearchTerm(event.target.value);

// /*Aqui, estamos criando uma nova lista chamada Posts Filtrados que conterá apenas coisas que passaram pelo filtro.
//  */
//     const filteredPostagens = postagensOriginais.filter((postagem) => {
//       /*O título de cada postagem da lista Original foi
//        normalizado nesta linha , da mesma forma que fizemos 
//        com o termo de busca.  */
//       const titleNormalized = postagem.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//       // De forma semelhante, normalizamos o conteúdo de cada
//       // postagem de acordo com o procedimento adotado para o
//       // título.
//       const contentNormalized = postagem.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//       // Os nomes das tags associadas a cada postagem são
//        //normalizados nesta linha. Para evitar erros, a 
//        //expressão postagem.tags || [] retorna um array vazio
//        // se uma postagem não tiver tags.
//       const tagsNormalized = (postagem.tags || []).map(tag => tag.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
//       //Aqui, verificamos o título ,
//       // o conteúdo ou qualquer uma das
//       // tags da postagem contém o termo de busca 
//       //normalizado. A função include() pode identificar se 
//       //uma string contém outra string. A função "some()" é 
//       //usada para determinar se pelo menos um elemento de um
//       // array atende a uma condição específica.
//       return titleNormalized.includes(searchTermNormalized) || 
//              contentNormalized.includes(searchTermNormalized) || 
//              (tagsNormalized.length > 0 && tagsNormalized.some(tag => tag.includes(searchTermNormalized)));
//     });

//     // Por fim, atualizamos o estado das postagens usando a
//     // lista filtrada das postagens. Isso significará que 
//     //apenas as postagens que cumprem os requisitos de 
//     //pesquisa serão mostradas na interface.
//     setPostagens(filteredPostagens);
//   };
  
  
  

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  const totalPages = Math.ceil(postagensOriginais.length / postagensPorPagina);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * postagensPorPagina;
  const endIndex = Math.min(startIndex + postagensPorPagina, postagensOriginais.length);

  return (
    <div className="container_post">
      <div className="init-post-table">
        <input
          className="search-post"
          type="text"
          placeholder="O que você está procurando?"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
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
          <th>Ativo</th>
            <th>Título</th>
            <th>Conteúdo</th>
            <th>Categorias</th>
            <th>Visualizações</th>
            <th>Data de publicação</th>
            <th>Mais Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {/* Adicione a célula indicando se a postagem está ativa ou não */}
    
          {postagens.slice(startIndex, endIndex).map((postagem) => (
           
            <tr key={postagem.id}>
               <td>{postagem.published ? "Sim" : "Não"}</td>
              <td>{postagem.title}</td>
              <td><div className="scrollable-content">{postagem.content}</div></td>
              <td>
                {postagem.categories.map((categoria, index) => (
                  <span key={index}>{categoria.name}</span>
                ))}
              </td>
              <td>{postagem.post_view_count}</td>
              <td>{new Date(postagem.publishedAt).toLocaleDateString("pt-BR")}</td>
              <td className="center cursor_all" onClick={() => handleDetalhesClick(postagem.id)}><FaSearchPlus /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" style={{display:"flex",justifyContent:'space-between'}}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
      <ModalComponent
  show={showDetalhesModal}
  handleClose={() => setShowDetalhesModal(false)}
  modalTitle="Detalhes da Postagem"
  modalContent={
    <DetalhesPostagem
      postId={postIdSelecionado}
      updatePostagens={updatePostagens}
      setShowDetalhesModal={setShowDetalhesModal} // Passando a função setShowDetalhesModal
    />
  }
  modalSize="md"
  position="right"
/>



    </div>
  );
}

export default PostagemAll;