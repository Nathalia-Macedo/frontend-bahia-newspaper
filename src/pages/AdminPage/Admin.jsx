import './Admin.css';
import ModalComponent from '../../componets/Modal/Modal';
import React, { useState, useEffect, useRef } from 'react';
import LargeInput from '../../../../jornal/src/componets/Input/Input';
import  ModalAddEstagiario  from '../../componets/Estagiario/Estagiario';
import ModalAddPermissoes from '../../componets/Permissoes/Permissoes';

export function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [agendar, setAgendar] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); // Novo estado para controlar o modal de erro
  const categoriaNome = useRef(null)
  const categoriaDescricao = useRef(null)
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const filesRef = useRef(null);


  // Função para renderizar o conteúdo do modal com base no tipo selecionado
function renderModalContent(modalType) {
  switch (modalType) {
    case "estagiario":
      return <ModalAddEstagiario />;
    case "postagem":
      return renderConteudoModalAddPostagem();
    case "categoria":
      return renderConteudoModalAddCategoria();
    case "permissao":
      return <ModalAddPermissoes/>
      default:
      return null;
  }
}
  
  const teste = (e) => {
    // console.log(`${e.target.value}`)
    setTitle(e.target.value);
    setContent(e.target.value);
  };
  
  const handleSubmit = async () => {
    console.log(`${titleRef.current.value}, ${contentRef.current.value}, ${filesRef.current.value}`);
    
    if (!titleRef.current.value || !contentRef.current.value || !filesRef.current.value) {
      // Exibe o modal de erro se algum campo não estiver preenchido
      setShowErrorModal(true);
      
      setTimeout(() => setShowErrorModal(false), 10000); // Fecha o modal após 10 segundos
      return;
    }
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('content', contentRef.current.value);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    try {
      const consumo = await fetch(`https://backend-bahia-newspaper.onrender.com/post/`, {
        method: 'POST',
        body: formData
      })
      .then(consumo => consumo.json())
      .then(dados => console.log(dados));
      
      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    const dataHoraFields = document.getElementById('dataHoraFields');
    if (dataHoraFields) {
      dataHoraFields.style.display = agendar ? 'flex' : 'none';
    }
  }, [agendar]);
  
  const handleOpenModal = (title, content, modalType) => {
    setModalData({ title, content });
    setModalContent(modalType);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleAgendarChange = (event) => {
    const value = event.target.value === 'agendar';
    setAgendar(value);
  };

  const handleCategoriaNomeChange = (event) => {
    setCategoriaNome(e.target.value);
  };

  const handleCategoriaDescricaoChange = (event) => {
    setCategoriaDescricao(event.target.value);
  };

   
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Funcionários
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Adicionar Estagiário",renderModalContent('estagiario'))}>Adicionar estagiário</a></li>
                  <li><a className="dropdown-item" href="#">Atualizar informações de estagiário</a></li>
                  <li className="dropdown-divider"></li>
                  <li><a className="dropdown-item" href="#" >Excluir estagiário</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Postagens
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Adicionar Postagem", renderConteudoModalAddPostagem())}>Agendar/Adicionar nova Postagem</a></li>
                  <li><a className="dropdown-item" href="#">Visualizar postagens agendadas</a></li>
                  <li><a className="dropdown-item" href="#">Procurar postagem</a></li>
                  <li className="dropdown-divider"></li>
                  <li><a className="dropdown-item" href="#">Excluir postagem</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorias
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Adicionar Categoria", renderConteudoModalAddCategoria)}>Adicionar Categoria</a></li>
                  <li><a className="dropdown-item" href="#">Visualizar Categorias</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Permissões
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Criar Permissão",renderModalContent('permissao'), <ModalAddPermissoes/>)}> Criar permissão</a></li>
                  <li><a className="dropdown-item" href="#">Listar categorias</a></li>
                  <li><a className="dropdown-item" href="#"> Atualizar categoria</a></li>
                  <li><a className="dropdown-item" href="#"> Deletar categoria</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className='principalAdmin'>
        <LargeInput/>
      </main>
      <ModalComponent
        show={showModal}
        handleClose={handleCloseModal}
        modalTitle={modalData.title}
        modalContent={modalData.content}
        scrollable={true}
      />
      <ModalComponent
        show={showErrorModal} // Aqui use a lógica adequada para mostrar o modal de erro
        handleClose={() => setShowErrorModal(false)} // Aqui use a lógica adequada para fechar o modal de erro
        modalTitle="Erro"
        modalContent="Por favor, preencha todos os campos."
        error={true} // Esta propriedade indica que é um modal de erro
      />
      <ModalAddEstagiario/>
      {/* <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        modalTitle="Criar Permissão"
        modalContent={modalContent === 'permissao'? <ModalAddPermissoes /> : null}
      /> */}

     
    </>
  );

  

  function renderConteudoModalAddPostagem() {
    return (
      <div className='containerModal'>
        <div className="mb-3">
          <label htmlFor="agendarInput" className="form-label">Agendar ou Postar Agora?</label>
          <select className="form-select" id="agendarInput" onChange={handleAgendarChange}>
            <option value="agendar">Agendar</option>
            <option value="postar-agora">Postar Agora</option>
          </select>
        </div>
        <div id="dataHoraFields">
          <div className="mb-3 dive" style={{ display: agendar ? 'flex' : 'none' }}>
            <label htmlFor="dataInput" className="form-label">Data</label>
            <input type="date" className="form-control custom-input" id="dataInput" key={agendar ? 'data' : 'none'} />
          </div>
          <div className="mb-3 dive" style={{ display: agendar ? 'flex' : 'none' }}>
            <label htmlFor="horarioInput" className="form-label">Horário</label>
            <input type="time" className="form-control custom-input" id="horarioInput" key={agendar ? 'horario' : 'none'} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tituloInput" className="form-label">Título da Postagem</label>
          <input ref={titleRef} type="text" className="form-control custom-input"  id="tituloInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="conteudoInput" className="form-label">Conteúdo da Postagem</label>
          <textarea ref={contentRef} className="form-control custom-input"  id="conteudoInput" rows="2"></textarea>
        </div>
        <div className=' mb-3 d-flex justify-content-between'>
          <div className="mb-3 more">
            <label htmlFor="categoriaInput" className="form-label">Categoria</label>
            <select className="form-select" id="categoriaInput">
              <option value="politica">Política</option>
              <option value="rapidinhas">Rapidinhas</option>
              <option value="economia">Economia</option>
              <option value="brasil">Brasil</option>
              <option value="mundo">Mundo</option>
              <option value="esportes">Esportes</option>
              <option value="bahia">Bahia</option>
              <option value="salvador">Salvador</option>
              <option value="artigos">Artigos</option>
              <option value="entreterimento">Entretenimento</option>
              <option value="serviços">Serviços</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="imagemInput" className="form-label">Imagem</label>
            <input ref={filesRef} type="file" className="form-control custom-input"  id="imagemInput" accept="image/*" multiple />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn-admin">Visualizar</button>
          <button className="btn-admin" onClick={handleSubmit}>{agendar ? 'Agendar' : 'Postar Agora'}</button>
        </div>
      </div>
    );
  }

  function renderConteudoModalAddCategoria() {
    return (
      <div className="containerModal">
        <div className="mb-3">
          <label htmlFor="categoriaNome" className="form-label">Nome da Categoria</label>
          <input type="text" className="form-control custom-input" id="categoriaNome" ref={categoriaNome} onChange={handleCategoriaNomeChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="categoriaDescricao" className="form-label">Descrição da Categoria</label>
          <textarea className="form-control custom-input" id="categoriaDescricao" ref={categoriaDescricao}  onChange={handleCategoriaDescricaoChange} rows="3"></textarea>
        </div>
        <button className="btn-admin">Adicionar Categoria</button>
      </div>
    );
  }
}
