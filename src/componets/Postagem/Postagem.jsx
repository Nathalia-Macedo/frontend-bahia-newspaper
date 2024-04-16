import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toast from "react-bootstrap/Toast";
import './Postagem.css';

function ModalAddPostagem() {
  //definindo as variáveis que serão necessa´rias para armazenar valores digitados pelo usuário
  const [agendar, setAgendar] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagens, setImagens] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsCriadas, setTagsCriadas] = useState([]);
  const [erro, setErro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [token, setToken] = useState("");
  const [showToast, setShowToast] = useState(false); // Estado para controlar a exibição do Toast

  useEffect(() => {
    // Buscar token do localStorage, precisaremos dele para cada uma das nossas requisições
    const authToken = localStorage.getItem("token");
    //Guardando o token na variavel token
    setToken(authToken);

    // Carregar categorias ao montar o componente e passando o token
    fetchCategories(authToken);
  }, []);//sem dependencias ja que isso é pra ser feito somente uma vez ao abrir o modal de postagens


  //A função fetchCategories faz o consumo da api, e recebe o token como parâmetro
  const fetchCategories = async (authToken) => {
    try {
      const response = await fetch("http://34.125.197.110:3333/category", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      //se der tudo certo, guardamos os dados dentro de categorias
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
        //senão, lançamos uma mensagem de erro
      } else {
        throw new Error("Erro ao carregar categorias");
      }
      //O erro é capturado pelo catch, mostrado no console e no espaço reservado do erro
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setErro("Erro ao carregar categorias");
    }
  };

  // Função para enviar postagem
  const enviarPostagem = async () => {
    try {
        //os unicos campos que não podem ir vazios são titulo, conteudo e categoria
        //caso estejam vazios, mandamos a mensagem de erro e saimos da função

      if(!titulo||!conteudo||!categoria){
        setErro('Preencha todos os campos')
        return
      }

      //caso não caia no if, pegamos o token no localStorage
      const token = localStorage.getItem('token');
      //criamos um formData
      //adicionamos nele objetos, com pares chave valor, sendo que as chaves
      //precisam ser passadas da mesma forma que esta na documentação
      const formData = new FormData();
      formData.append('title', titulo);
      formData.append('content', conteudo);
      formData.append('category_id', categoria);

      //apesar de não ser obrigatório enviar imagens, caso elas estejam presentes, precisamos percorrer as imagens
      //e adicioná-las ao formData, novamente com a chave com o mesmo nome requerido no parâmetro

      for (let i = 0; i < imagens.length; i++) {
        formData.append('files', imagens[i], imagens[i].name);
      }

      //fazendo o consumo da api, passando o token para mostrar que temos permissão para fazer o consumo
      const response = await fetch("http://34.125.197.110:3333/post", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
     
      //convertendo a resposta para objeto javascript novamente e guardando isso dentro de data
      const data = await response.json();
      console.log("Postagem enviada com sucesso!");
      //retornamos o id do post caso dê tudo certo
      return data.id;
      //se der erro,lançamos o erro
    } catch (error) {
      console.error("Erro ao enviar postagem:", error);
      throw error;
    }
  };

  const obterIdTags = async (tagsDigitadas) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://34.125.197.110:3333/tag", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter as tags");
      }
  
      const data = await response.json();
  
      // Mapear todas as tags digitadas para seus IDs correspondentes
      const tagsIds = tagsDigitadas.map((tagDigitada) => {
        const tag = data.find((tag) => tag.name === tagDigitada);
        return tag ? tag.id : null;
      });
  
      // Remover IDs nulos e retornar array de IDs
      return tagsIds.filter((id) => id !== null);
    } catch (error) {
      console.error("Erro ao obter IDs das tags:", error);
      throw error;
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Enviar postagem
      const postId = await enviarPostagem();
  
      // Enviar categoria para a API de vinculação de categoria
      const token = localStorage.getItem('token');
      const categoryId = categorias.find(cat => cat.name === categoria)?.id;
      console.log(postId)
      console.log(categoryId)
      const responseCategoria = await fetch(`http://34.125.197.110:3333/post/category/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ category_id: categoryId }),
      }).then(responseCategoria => responseCategoria.json())
      .then(dados => {
        if (!dados) {
          throw new Error('Erro ao vincular categoria ao post');
        }
      });
  
      // Obter IDs das tags digitadas pelo usuário
      const tagsIds = await obterIdTags([...tags, ...tagsCriadas]);
      console.log(tagsIds);
  
      // Vincular todas as tags à postagem
      await Promise.all(tagsIds.map(async (tagId) => {
        const response = await fetch(`http://34.125.197.110:3333/post/tag/${postId}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ tag_id: tagId }),
        });
        const data = await response.json();
        console.log(data);
      }));
  
      setShowToast(true); // Exibe o Toast de sucesso
  
      // Limpar todos os campos após o envio da postagem
      setTitulo("");
      setConteudo("");
      setCategoria("");
      setImagens([]);
      setTagInput("");
      setTags([]);
  
      setErro('');
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };
  

  // Função para obter o ID das tags digitadas pelo usuário
  // const obterIdTags = async (tagsDigitadas) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch("http://34.125.197.110:3333/tag", {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Erro ao obter as tags");
  //     }

  //     const data = await response.json();

  //     // Filtrar as tags digitadas pelo usuário e obter o ID de cada uma
  //     const tagsIds = tagsDigitadas.map((tagDigitada) => {
  //       const tag = data.find((tag) => tag.name === tagDigitada);
  //       return tag ? tag.id : null;
  //     });


  //     return tagsIds.filter((id) => id !== null); // Remover IDs nulos
  //   } catch (error) {
  //     console.error("Erro ao obter IDs das tags:", error);
  //     throw error;
  //   }
  // };


  

  // const handleSubmit = async () => {
  //   try {
  //     // Enviar postagem
  //     const postId = await enviarPostagem();


  //     // Enviar categoria para a API de vinculação de categoria
  //     const token = localStorage.getItem('token');
  //     const categoryId = categorias.find(cat => cat.name === categoria)?.id;
  //     console.log(postId)
  //     console.log(categoryId)
  //     const responseCategoria = await fetch(`http://34.125.197.110:3333/post/category/${postId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ category_id: categoryId }),
  //     }).then(responseCategoria => responseCategoria.json())
  //     .then(dados => {
        
      
  //       if (!dados) {
  //         throw new Error('Erro ao vincular categoria ao post');
  //       }
      
  //     })
      
      

  //     // Obter IDs das tags digitadas pelo usuário
  //     const tagsIds = await obterIdTags([...tags, ...tagsCriadas]);
  //     console.log(tagsIds)

  //     // Vincular tags à postagem
  //     const tagRequests = tagsIds.map(tagId =>
  //       fetch(`http://34.125.197.110:3333/post/tag/${postId}/`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ tag_id: tagId }),
  //       }).then(response => response.json())
  //       .then(dados => console.log(dados))
  //     )
      
  //     setShowToast(true); // Exibe o Toast de sucesso
  //     setTitulo("");
  //     setConteudo("");
  //     setCategoria("");
  //     setImagens([]);
  //     setTagInput("");
  //     setTags([]);
    

  //     setErro('');
  //   } catch (error) {
  //     console.error("Erro ao enviar formulário:", error);
  //   }
  // };

  // Função para adicionar tag à lista de tags
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const newTag = event.target.value.trim();

      // Verificar se a tag já existe na lista de tags criadas
      if (tagsCriadas.includes(newTag)) {
        // Se existir, apenas adiciona à lista de tags
        setTags([...tags, newTag]);
      } else {
        // Se não existir, cria a tag na API
        try {
          const tagId = await criarTag(newTag);
          setTagsCriadas([...tagsCriadas, newTag]);
          setTags([...tags, newTag]); // Adiciona a nova tag à lista de tags
        } catch (error) {
          // Se a tag já existir na API, apenas adiciona à lista de tags
          if (error.message === 'Failed to create tag: Tag already exists') {
            setTags([...tags, newTag]);
          } else {
            console.error("Erro ao criar tag:", error);
            setErro("Erro ao criar tag");
          }
        }
      }
      setTagInput(''); // Limpar o campo de entrada de tags após adicionar
    }
  };

  // Função para criar tag
  const criarTag = async (tagName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://34.125.197.110:3333/tag", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: tagName })
      });

      if (!response.ok) {
        throw new Error('Failed to create tag: Tag already exists');
      }

      const data = await response.json();
      console.log("Tag criada com sucesso!");
      return data.id;
    } catch (error) {
      console.error("Erro ao criar tag:", error);
      throw error;
    }
  };

  // Função para remover tag da lista de tags
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Função para lidar com a seleção de imagens
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImagens(files);
  };

 // Função para abrir uma nova aba e exibir os detalhes da postagem
 const abrirVisualizacao = () => {
  // Montar o HTML com as informações da postagem
  const html = `
    <html>
      <head>
        <title>${titulo}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }
          .postagem {
            max-width: 600px;
            margin: 0 auto;
          }
          .postagem img {
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="postagem">
          <h1>${titulo}</h1>
          <p>${conteudo}</p>
          <div>
            ${imagens.map((imagem, index) => `
              <div
                style="margin-bottom: 20px;"
                id="img-${index}"
                draggable="true"
                onDragStart="dragStart(event)"
                onDragOver="dragOver(event)"
                onDrop="drop(event)"
              >
                <img src="${URL.createObjectURL(imagem)}" alt="Imagem da postagem">
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      <script>
        let draggedItem;

        function dragStart(event) {
          draggedItem = event.target.id;
        }

        function dragOver(event) {
          event.preventDefault();
        }

        function drop(event) {
          event.preventDefault();
          const targetId = event.target.id;
          const draggedElement = document.getElementById(draggedItem);
          const targetElement = document.getElementById(targetId);
          const container = targetElement.parentNode;

          container.insertBefore(draggedElement, targetElement.nextSibling);
        }
      </script>
    </html>
  `;

  // Abrir uma nova aba com o HTML montado
  const novaAba = window.open('');
  novaAba.document.write(html);
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
        <div className="mb-3">
          <label htmlFor="tagsInput" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="tagsInput"
            placeholder="Digite as tags e pressione Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag-item">
                <span>{tag}</span>
                <button onClick={() => handleRemoveTag(tag)}>&times;</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sidePost"> 
        <div className="mb-3  d-flex justify-content-between" style={{ width: '50%' }}>
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
              <option value="" disabled selected>Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3" style={{ width: '50%' }}>
          <label htmlFor="imagensInput" className="form-label">
            Imagens
          </label>
          <input
            type="file"
            id="imagensInput"
            className="form-control custom-input"
            multiple
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn-admin" onClick={abrirVisualizacao}>Visualizar</button>
        <button className="btn-admin" onClick={handleSubmit} >
          {agendar ? "Agendar" : "Postar Agora"}
        </button>
      </div>
      
      {/* Toast para exibir mensagem de sucesso */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: 'green',
          color: 'white'
        }}
        delay={3000}
        autohide
      >
        <Toast.Body>Sua postagem foi enviada com sucesso.</Toast.Body>
      </Toast>
    </div>
  );
}

export default ModalAddPostagem;
