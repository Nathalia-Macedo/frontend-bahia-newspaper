import './Admin.css';
import ModalComponent from '../../componets/Modal/Modal';
import React, { useState, useEffect, useRef } from 'react';
import LargeInput from '../../componets/Input/Input';
import  ModalAddEstagiario  from '../../componets/Estagiario/Estagiario';
import ModalAddPermissoes from '../../componets/Permissoes/Permissoes';
import ModalAddCategoria from '../../componets/Categoria/Categoria';
import ModalAddPostagem from '../../componets/Postagem/Postagem';
import VerEstagiarios from '../../componets/Estagiario/VerEstagiario';
import VerCategoriasModal from '../../componets/Categoria/VerCategoria';
export function Admin() {
  
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [agendar, setAgendar] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); // Novo estado para controlar o modal de erro
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const filesRef = useRef(null);


  // Função para renderizar o conteúdo do modal com base no tipo selecionado
function renderModalContent(modalType) {
  
  switch (modalType) {
    case "estagiario":
      return <ModalAddEstagiario />;
    case "postagem":
      return <ModalAddPostagem/>;
    case "permissao":
      return <ModalAddPermissoes/>
    case "categoria":
        return <ModalAddCategoria/>
    case "ver estagiarios":
        return <VerEstagiarios/>
     case "ver categorias":
      console.log(modalType)
        return <VerCategoriasModal/>
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
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Ver Estagiários",renderModalContent('ver estagiarios'))}>Ver todos os estagiários</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Postagens
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={() =>  handleOpenModal("Criar Postagem",renderModalContent('postagem'))}>Agendar/Adicionar nova Postagem</a></li>
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
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Criar Categoria",renderModalContent('categoria'))}>Adicionar Categoria</a></li>
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Ver Categorias",renderModalContent('ver categorias'),<VerCategoriasModal/>)}
>Visualizar Categorias</a></li>
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
      {/* <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        modalTitle="Criar Permissão"
        modalContent={modalContent === 'permissao'? <ModalAddPermissoes /> : null}
      /> */}

     
    </>
  );



 
  

}


