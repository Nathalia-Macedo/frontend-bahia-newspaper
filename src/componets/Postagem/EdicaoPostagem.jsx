import React, { useState, useEffect } from 'react';
import './EdicaoPostagem.css';

function EdicaoPostagem({ post, onHide, onSave }) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [novaTag, setNovaTag] = useState('');
  const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState('');


  useEffect(() => {
    if (post) {
      setTitulo(capitalizeFirstLetter(post.title));
      setConteudo(capitalizeFirstLetter(post.content));
      setTags(post.tags ? post.tags.map(tag => tag.name) : []);
      setStatus(post.status || '');
    }

    // Buscar categorias da API
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
      }
    };

    fetchCategorias();

  }, [post]);


  const handleChangeCategoria = (event) => {
    const categoriaSelecionada = event.target.value;
    setCategoriaSelecionada(categoriaSelecionada);
    // Encontre o ID da categoria selecionada
    const categoria = categorias.find(cat => cat.name === categoriaSelecionada);
    if (categoria) {
      console.log(categoria)
      setCategoriaSelecionadaId(categoria.id);
    }
  };
  const updatePostCategoria = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(post.id)
      const response = await fetch(`http://34.125.197.110:3333/post/category/${post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category_id: categoriaSelecionadaId }),
      })

      const data = await response.json()
      console.log(data)
   
      if (response.ok) {
        console.log('Categoria da postagem atualizada com sucesso');
      } else {
        console.error("Erro ao atualizar categoria da postagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao atualizar categoria da postagem:", error);
    }
  };
  
  

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://34.125.197.110:3333/post/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: titulo, content: conteudo }),
      });

      const data = await response.json()
      console.log(`Dados novos: ${data.id}`)

      if (response.ok) {
        await updatePostCategoria();
        onSave(); // Chama a função onSave após salvar os dados
        console.log('tudo certo com o post')
      } else {
        console.error("Erro ao enviar dados atualizados da postagem:", response.statusText);
        console.log(post.id)
        console.log(titulo)
        console.log(conteudo)
      }
    } catch (error) {
      console.error("Erro ao enviar dados atualizados da postagem:", error);
    }
  };

  const handleBack = () => {
    onHide(); // Esconder o modal de edição
  };

  const handleChangeTitulo = (newTitulo) => {
    setTitulo(newTitulo);
  };

  const handleChangeConteudo = (newConteudo) => {
    setConteudo(newConteudo);
  };

  const handleNovaTagChange = (event) => {
    setNovaTag(event.target.value);
  };

  const handleNovaTagKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (!tags.includes(novaTag)) {
        const tagExists = await checkTagExists(novaTag);
        console.log(tagExists)
        if (!tagExists) {
          const newTagCreated = await createNewTag(novaTag);
          if (newTagCreated) {
            setTags([...tags, novaTag]);
          }
        } else {
          setTags([...tags, novaTag]);
        }
      }
      setNovaTag('');
    }
  };

  const checkTagExists = async (tagName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/tag", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.some(tag => tag.name === tagName);
      } else {
        console.error("Erro ao verificar se a tag existe:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar se a tag existe:", error);
      return false;
    }
  };

  const createNewTag = async (tagName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/tag", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: tagName }),
      });
      if (response.ok) {
        console.log('criada')
        return true;
      } else {
        console.error("Erro ao criar nova tag:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Erro ao criar nova tag:", error);
      return false;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="" id="edicaoPostagemModal" tabIndex="-1" aria-labelledby="edicaoPostagemModalLabel" aria-hidden="true">
      <div className="modal-content-edition ">
        <div className="modal-header">
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onHide}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => handleChangeTitulo(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="conteudo" className="form-label">Conteúdo</label>
            <textarea className="form-control" id="conteudo" rows="3" value={conteudo} onChange={(e) => handleChangeConteudo(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags</label>
            <ul className='tag-list-edition'>
              {tags.map((tagName, index) => (
                <li key={index}>{tagName}</li>
              ))}
            </ul>
            <input
              type="text"
              className="form-control"
              id="novaTag"
              placeholder="Nova Tag"
              value={novaTag}
              onChange={handleNovaTagChange}
              onKeyPress={handleNovaTagKeyPress}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoria</label>
                      <select
            className="form-select"
            id="categoria"
            value={categoriaSelecionada}
            onChange={handleChangeCategoria}          >

              <option disabled selected value="">Selecione uma categoria</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.name}>{categoria.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="publicado">Publicado</option>
              <option value="rascunho">Rascunho</option>
            </select>
          </div>
        </div>
        <div className="modal-footer-edition">
          <button className="btn " id='btn-admin-edition' data-bs-dismiss="modal" onClick={handleBack}>Voltar</button>
          <button type="button" className="btn " id='btn-admin-save' onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default EdicaoPostagem;
