import './Admin.css';
import ModalComponent from '../../componets/Modal/Modal';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';

import  ModalAddEstagiario  from '../../componets/Estagiario/Estagiario';
import ModalAddPermissoes from '../../componets/Permissoes/Permissoes';
import ModalAddCategoria from '../../componets/Categoria/Categoria';
import ModalAddPostagem from '../../componets/Postagem/Postagem';
import VerEstagiarios from '../../componets/Estagiario/VerEstagiario';
import VerCategoriasModal from '../../componets/Categoria/VerCategoria';
import PostagensModal from '../../componets/Postagem/VerPostagem';
import {useNavigate } from 'react-router-dom'
import AdminSession from '../../componets/AdminSection/AdminSection';
import PostagemAll from '../../componets/Postagem/PostagemAll';
import { FaUsers,FaNewspaper,FaSignOutAlt,FaEye} from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { SessionData } from '../../componets/SectionData/SectionData';





 export  function Admin() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [agendar, setAgendar] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); // Novo estado para controlar o modal de erro
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const filesRef = useRef(null);

  const dataSquare = [
    
    {
      title: 'Qtd de Categorias',
      endpoint: 'http://34.125.197.110:3333/category',
      buttonText: 'Ver Detalhes',
      onClick: () => fetchCategoryData,
    },
    
      {
        title: 'Qtd de Postagens',
        endpoint: 'http://34.125.197.110:3333/post',
        buttonText: 'Ver Detalhes',
        onClick: async () => {
          const token = localStorage.getItem('token');
          const numPostagens = await fetchPostagens(token); // Adicione os parênteses para chamar a função
          console.log('Número de postagens:', numPostagens); // Apenas para depuração
          setNumberOfPostagens(numPostagens); // Defina o estado com o número de postagens
        }
        
    },{
      title: 'Qtd de Funcionários',
      endpoint: 'http://34.125.197.110:3333/user',
      buttonText: 'Ver Detalhes',
      onClick: () =>fetchEmployeeData 
    },{
      title: 'Qtd de Anúncios',
      endpoint: 'http://34.125.197.110:3333/user',
      buttonText: 'Ver Detalhes',
      onClick: () =>fetchEmployeeData 
    }

  ]

  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [numberOfCategories, setNumberOfCategories] = useState(0);
  const username = localStorage.getItem('user')


  const fetchPostagens = async (token) => {
    try {
      const response = await fetch("http://34.125.197.110:3333/post", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch postagens');
      }
  
      const data = await response.json();
      return data.length; // Retorna a quantidade de postagens
    } catch (error) {
      console.error('Error fetching postagens:', error);
      throw error;
    }
  };
  

  const fetchCategoryData = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://34.125.197.110:3333/category', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        return response.json();
      })
      .then(data => {
        setNumberOfCategories(data.length);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchCategoryData();
    const intervalId = setInterval(() => {
      fetchEmployeeData();
      fetchCategoryData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);



  const fetchEmployeeData = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://34.125.197.110:3333/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then(data => {
        setNumberOfEmployees(data.length);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
    }
  };


  const handleLogout = () => {
    // Apague a chave token do localStorage
    localStorage.removeItem('token');
    // Redirecione para a tela de login
    navigate('/login');
  };



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
        return <VerCategoriasModal/>
      case "ver postagens":
            return <PostagensModal/>
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

    let token = localStorage.getItem('token')
   

  return token?  (
    <>
      <nav className="navbar navbar-expand-lg bg-dark " >
        <div className="container-fluid ">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                
                <a className="nav-link dropdown-toggle" id='font' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="icone-azul" >   <FaUsers/> </span>  Funcionários
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" id='dropdown-item ' href="#" onClick={() => handleOpenModal("Adicionar Estagiário",renderModalContent('estagiario'))}><span style={{marginRight:'10px'}} className='icone-azul'>
                    <AiOutlinePlusCircle/>
                    </span>Adicionar estagiário</a></li>
                  <li><a className="dropdown-item" id='dropdown-item' href="#" onClick={() => handleOpenModal("Ver Estagiários",renderModalContent('ver estagiarios'))}><span style={{marginRight:'10px'}} className='icone-azul'><FaEye/></span>Ver todos os estagiários</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id='font' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="icone-azul">
  <FaNewspaper />
</span>  Postagens
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" id='dropdown-item' href="#" onClick={() =>  handleOpenModal("Criar Postagem",renderModalContent('postagem'))}> <span style={{marginRight:'10px'}} className='icone-azul'>
                    <AiOutlinePlusCircle/>
                    </span>Adicionar nova Postagem</a></li>
                  <li><a className="dropdown-item"  href="#" id='dropdown-item' onClick={() =>  handleOpenModal("Ver Postagens",renderModalContent('ver postagens'))}><span style={{marginRight:'10px'}} className='icone-azul'><FaEye/></span>Ver todas as postagens</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id='font' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <span className='icone-azul'>
                 <AiOutlineUnorderedList/>
                  </span> Categorias
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" id='dropdown-item' href="#" onClick={() => handleOpenModal("Criar Categoria",renderModalContent('categoria'))}><span style={{marginRight:'10px'}} className='icone-azul'>
                    <AiOutlinePlusCircle/>
                    </span>Adicionar Categoria</a></li>
                  <li><a className="dropdown-item" id='dropdown-item' href="#" onClick={() => handleOpenModal("Ver Categorias",renderModalContent('ver categorias'),<VerCategoriasModal/>)}
><span style={{marginRight:'10px'}} className='icone-azul'><FaEye/></span>Visualizar Categorias</a></li>
                </ul>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Permissões
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Criar Permissão",renderModalContent('permissao'), <ModalAddPermissoes/>)}> Criar permissão</a></li>
                  <li><a className="dropdown-item" href="#">Listar Permissões</a></li>
                </ul>
              </li> */}

            </ul>
<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
  {/* Outros itens da barra de navegação */}
  <li className="nav-item">
    <button className="nav-link" id='font' onClick={handleLogout} > Sair <span className='icone-vermelho'>
      <FaSignOutAlt/>
      </span></button>
  </li>
  <li className="nav-item align-items-center d-flex">
    {/* Seja Bem vindo {username} */}
  </li>
</ul>

          </div>
        </div>
      </nav>
      <main className='main_admin'>
      <AdminSession dataSquares={dataSquare}/>
      </main>
      
        <ModalComponent
        show={showModal}
        handleClose={handleCloseModal}
        modalTitle={modalData.title}
        modalContent={modalData.content}
        scrollable={true}
        modalSize='lg'
      />

      
      <ModalComponent
        show={showErrorModal} // Aqui use a lógica adequada para mostrar o modal de erro
        handleClose={() => setShowErrorModal(false)} // Aqui use a lógica adequada para fechar o modal de erro
        modalTitle="Erro"
        modalContent="Por favor, preencha todos os campos."
        error={true} // Esta propriedade indica que é um modal de erro
      />  
      
              <SessionData/>
              <PostagemAll/>
      
     
    </> ) :   (
    <div className="unauthorized-container">
      <div className='person_error'>
      <h1>401</h1>
      <h1 className="unauthorized-heading">Não autorizado</h1>
      <p className="unauthorized-message">Faça login para ter acesso à tela de administrador</p>
      <button className="unauthorized-button" onClick={() => navigate('/login')}>Ir para tela de login</button>
      </div>


     
    </div>
  );
    
  ;



 
  

}



