import React, { useState } from "react";
import { Form } from "react-bootstrap";
import './RecuperarSenha.css';

export function RecuperarSenha() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    let token = localStorage.getItem('token')


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        console.log(email);
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
            })
    
            // if (!response.ok) {
            //     throw new Error('Failed to retrieve data');
            // }
            const data = await response.json();
            console.log('Dados da resposta:', data);
            // Aqui você pode fazer o que quiser com os dados da resposta
        } catch (error) {
            console.error('Erro:', error);
            setError(error.message || 'Erro ao enviar solicitação de recuperação de senha.');
        }
    };
    
    
    
    

    return (
        <main className="contentForget">
             {error && <span className="error">{error}</span>}
                <div className="mb-3" controlId="exampleForm.ControlInput1">
                    <label>Email:</label>
                    <input type="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
                </div>
                <button className="btn-admin" onClick={handleSubmit} type="button">Enviar</button>
        </main>
    );
}
