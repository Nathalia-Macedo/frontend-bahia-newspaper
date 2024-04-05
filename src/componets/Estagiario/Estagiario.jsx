import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalAddEstagiario(props) {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');
    const [camposVazios, setCamposVazios] = useState(false); // Estado para controlar a exibição da mensagem de campos vazios
    const [senhasDiferentes, setSenhasDiferentes] = useState(false); // Estado para controlar a exibição da mensagem de senhas diferentes
    const [erroAPI, setErroAPI] = useState(''); // Estado para controlar a exibição de erros da API

    const handleSubmitEstagiario = async () => {
        console.log('ta entrando')
        if (!nome || !email || !confirmarSenha || !senha) {
            // Define o estado para exibir a mensagem de campos vazios
            setCamposVazios(true);
            setSenhasDiferentes(false); // Reseta o estado de senhas diferentes
            setErroAPI(''); // Reseta o estado de erros da API
            return;
        } else if (senha !== confirmarSenha) {
            // Define o estado para exibir a mensagem de senhas diferentes
            setSenhasDiferentes(true);
            setCamposVazios(false); // Reseta o estado de campos vazios
            setErroAPI(''); // Reseta o estado de erros da API
            return;
        } else {
            // Se todos os campos estiverem preenchidos e as senhas forem iguais, envie o formulário
            setCamposVazios(false);
            setSenhasDiferentes(false);
            setErroAPI(''); // Reseta o estado de erros da API
            
            try {
                const response = await fetch('https://backend-bahia-newspaper.onrender.com/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: nome,
                        email: email,
                        password: senha
                    })
                }).then(response => response.json())
                .then(dados => {
                    console.log(dados)
                })
                // Se o usuário for criado com sucesso, mostra uma mensagem de sucesso ou executa alguma ação necessária
                console.log('Usuário criado com sucesso');
            } catch (error) {
                // Se houver algum erro durante a requisição, define o estado para exibir o erro
                setErroAPI('Erro ao criar usuário. Por favor, tente novamente mais tarde.');
                console.error('Erro ao criar usuário:', error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "nome") {
            setNome(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "senha") {
            setSenha(value);
        } else if (name === "confirmarSenha") {
            setConfirmarSenha(value);
        }
    }

    return (
        <div className='containerModal'>
            {/* Exibe a mensagem de campos vazios se o estado for verdadeiro */}
            {camposVazios && <p style={{ color: "red" }}>Preencha todos os campos antes de continuar.</p>}
            {/* Exibe a mensagem de senhas diferentes se o estado for verdadeiro */}
            {senhasDiferentes && <p style={{ color: "red" }}>As senhas digitadas não coincidem.</p>}
            {/* Exibe a mensagem de erro da API se houver */}
            {erroAPI && <p style={{ color: "red" }}>{erroAPI}</p>}
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Nome</label>
                <input type="email" className="form-control custom-input" value={nome} onChange={handleChange} name="nome" id="nomelInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email</label>
                <input type="email" className="form-control custom-input" value={email} onChange={handleChange} name="email" id="emailInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="senhaInput" className="form-label">Senha</label>
                <input type="password" className="form-control custom-input" value={senha} onChange={handleChange} name="senha" id="senhaInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmarSenhaInput" className="form-label">Confirmação de Senha</label>
                <input type="password" className="form-control custom-input" value={confirmarSenha} onChange={handleChange} name="confirmarSenha" id="confirmarSenhaInput" />
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
            <button className="btn-admin" onClick={handleSubmitEstagiario}>Cadastrar Estagiário</button>
        </div>
    );
}

export default ModalAddEstagiario;
