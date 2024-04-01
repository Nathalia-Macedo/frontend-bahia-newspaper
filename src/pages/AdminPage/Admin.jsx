import './Admin.css';
import ModalComponent from '../../componets/Modal/Modal';
import { useState, useEffect } from 'react';

export function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [agendar, setAgendar] = useState(true);

  useEffect(() => {
    const dataHoraFields = document.getElementById('dataHoraFields');
    if (dataHoraFields) {
      dataHoraFields.style.display = agendar ? 'flex' : 'none';
    }
  }, [agendar]);

  const handleOpenModal = (title, content) => {
    setModalData({ title, content });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAgendarChange = (event) => {
    const value = event.target.value === 'agendar';
    setAgendar(value);
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
                  <li><a className="dropdown-item" href="#" onClick={() => handleOpenModal("Adicionar Estagiário", renderConteudoModalAddEstagiario())}>Adicionar estagiário</a></li>
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
            </ul>
          </div>
        </div>
      </nav>
      <ModalComponent
        show={showModal}
        handleClose={handleCloseModal}
        modalTitle={modalData.title}
        modalContent={modalData.content}
        scrollable={true}
      />
    </>
  );

  function renderConteudoModalAddEstagiario() {
    return (
      <div className='containerModal'>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="email" className="form-control custom-input" id="emailInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="senhaInput" className="form-label">Senha</label>
          <input type="password" className="form-control custom-input" id="senhaInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmarSenhaInput" className="form-label">Confirmação de Senha</label>
          <input type="password" className="form-control custom-input" id="confirmarSenhaInput" />
        </div>
        <div className="mb-3">
          <label className="form-label">Permissões</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="permissao" id="somenteLeitura" value="Somente Leitura" />
            <label className="form-check-label" htmlFor="somenteLeitura">Somente Leitura</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="permissao" id="permissaoTotal" value="Permissão Total" />
            <label className="form-check-label" htmlFor="permissaoTotal">Permissão Total</label>
          </div>
        </div>
        <button className="btn-admin">Cadastrar Estagiário</button>
      </div>
    );
  }

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
          <input type="text" className="form-control custom-input" id="tituloInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="conteudoInput" className="form-label">Conteúdo da Postagem</label>
          <textarea className="form-control custom-input" id="conteudoInput" rows="2"></textarea>
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
          <input type="file" className="form-control custom-input" id="imagemInput" accept="image/*" />
        </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn-admin">Visualizar</button>
          <button className="btn-admin">{agendar ? 'Agendar' : 'Postar Agora'}</button>
        </div>
      </div>
    );
  }
}
