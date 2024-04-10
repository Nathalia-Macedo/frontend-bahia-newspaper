import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalAddEstagiario(props) {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');
    const [camposVazios, setCamposVazios] = useState(false);
    const [senhasDiferentes, setSenhasDiferentes] = useState(false);
    const [erroAPI, setErroAPI] = useState('');
    const [showToast, setShowToast] = useState(false); // Estado para controlar a exibição do toast

    const handleSubmitEstagiario = async () => {
        if (!nome || !email || !confirmarSenha || !senha) {
            setCamposVazios(true);
            setSenhasDiferentes(false);
            setErroAPI('');
            return;
        } else if (senha !== confirmarSenha) {
            setSenhasDiferentes(true);
            setCamposVazios(false);
            setErroAPI('');
            return;
        } else if (!email.includes('@') || !email.includes('.com')) {
            // Verifica se o email contém pelo menos um "@" e ".com"
            setErroAPI('O email deve conter "@" e ".com"');
            setCamposVazios(false);
            setSenhasDiferentes(false);
            return;
        }  else {
            setCamposVazios(false);
            setSenhasDiferentes(false);
            setErroAPI('');
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://34.125.197.110:3333/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: nome,
                        email: email,
                        password: senha
                    })
                });

                if (response.ok) {
                    setShowToast(true); // Exibe o toast se o usuário for criado com sucesso
                    setNome('');
                    setEmail('');
                    setSenha('');
                    setConfirmarSenha('');
                } else {
                    setErroAPI('Email já cadastrado.');
                }
            } catch (error) {
                setErroAPI('Email já cadastrado.');
                console.log('Erro ao criar usuário:', error);
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
            {camposVazios && <p style={{ color: "red" }}>Preencha todos os campos antes de continuar.</p>}
            {senhasDiferentes && <p style={{ color: "red" }}>As senhas digitadas não coincidem.</p>}
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
          
            <button className="btn-admin" onClick={handleSubmitEstagiario}>Cadastrar Estagiário</button>

            {/* Toast para mostrar mensagem de sucesso */}
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                
                style={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 1000,
                    backgroundColor:"green",
                    color:"white"
                }}
            >
               
                <Toast.Body>O usuário foi criado com sucesso!</Toast.Body>
            </Toast>
        </div>
    );
}

export default ModalAddEstagiario;
