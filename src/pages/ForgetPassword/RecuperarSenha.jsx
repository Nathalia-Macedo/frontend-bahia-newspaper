import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import './RecuperarSenha.css';
import { useNavigate } from 'react-router-dom';

export function RecuperarSenha() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    function handleBackLogin(){
        navigate('/login')
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email) {
            setError('Campo de email obrigatório.');
            return;
        }
        if (!email.includes('@') || !email.includes('.com')) {
            setError('Email inválido.');
            return;
        }

        try {
            const response = await fetch('http://34.125.197.110:3333/user/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();
            if (response.ok) {
                setUserId(data.userId);
                setShowCodeInput(true);
                setSuccess("Email enviado com sucesso!"); // Define a mensagem de sucesso da API
            } else {
                setError('Usuário não encontrado. Tente novamente'); // Define a mensagem de erro da API
            }
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao enviar solicitação de recuperação de senha.');
        }
    };

    const handleSendNewPassword = async () => {
        try {
            const response = await fetch(`http://34.125.197.110:3333/user/password/new/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ get_codePassword: code, password: newPassword }),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setSuccess("Senha redefinida com sucesso"); // Define a mensagem de sucesso da API
                navigate('/login')
            } else {
                setError("Algo está errado. Tente novamente"); // Define a mensagem de erro da API
            }
        } catch (error) {
            console.error('Erro ao enviar nova senha:', error);
            setError('Erro ao enviar nova senha.');
        }
    };

    return (
        <main className="contentForget">
            <h1>Recuperação de Senha</h1>
            <p>Esqueceu sua senha? Digite o email cadastrado abaixo. Um código será enviado para seu email.</p>

            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
                </div>
                <button className="btn-admin-forget" type="submit">Enviar</button>
            </form>
            <button className="back_button" onClick={handleBackLogin}>Voltar</button>

            {showCodeInput && (
                <div className="input-wrapper">
                    <label>Código:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

                    <label>Nova Senha:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                    <button className="btn-admin" onClick={handleSendNewPassword}>Enviar Nova Senha</button>
                </div>
            )}

            <Toast 
                show={error !== null} 
                onClose={() => setError(null)} 
                style={{ position: 'fixed', top: 20, right: 20, backgroundColor: 'red', color: 'white' }}
                delay={3000}
                autohide
            >
                <Toast.Body>{error}</Toast.Body>
            </Toast>

            <Toast 
                show={success !== null} 
                onClose={() => setSuccess(null)} 
                style={{ position: 'fixed', top: 20, right: 20, backgroundColor: 'green', color: 'white' }}
                delay={3000}
                autohide
            >
                <Toast.Body>{success}</Toast.Body>
            </Toast>
        </main>
    );
}
