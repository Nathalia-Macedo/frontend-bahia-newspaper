import React, { useState } from "react";
import { Form } from "react-bootstrap";
import './RecuperarSenha.css';

export function RecuperarSenha() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);

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
    
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUserId(data.userId);
                setShowCodeInput(true); // Exibir a entrada para o código após enviar o email
            } else {
                throw new Error('Failed to retrieve user ID');
            }
        } catch (error) {
            console.error('Erro:', error);
            setError(error.message || 'Erro ao enviar solicitação de recuperação de senha.');
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
            }).then(response => response.json())
            .then(dados => console.log(dados))
            console.log(userId)
            // if (!response.ok) {
            //     throw new Error('Failed to send new password');
            // }

            // A senha foi atualizada com sucesso
        } catch (error) {
            console.error('Erro ao enviar nova senha:', error);
            setError(error.message || 'Erro ao enviar nova senha.');
        }
    };

    return (
        <main className="contentForget">
            <h1>Recuperação de Senha</h1>
            <p>Esqueceu sua senha? Digite o email cadastrado abaixo. Um código será enviado para seu email.</p>

            <form onSubmit={handleSubmit}>
                {error && <span className="error">{error}</span>}
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
                </div>
                <button className="btn-admin" type="submit">Enviar</button>
            </form>

            {showCodeInput && (
                <div className="code-input">
                    <label>Código:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

                    <label>Nova Senha:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                    <button className="btn-admin" onClick={handleSendNewPassword}>Enviar Nova Senha</button>
                </div>
            )}
        </main>
    );
}
