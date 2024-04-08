import React, { useState } from "react";
import { Form } from "react-bootstrap";
import './RecuperarSenha.css';

export function RecuperarSenha() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            setError('Campo de email obrigatório.');
            return;
        }
        if (!email.includes('@') || !email.includes('.com')) {
            setError('Email inválido.');
            return;
        }
    
        fetch('https://backend-bahia-newspaper.onrender.com/user/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
        .then(response => {
            
          response.json();
          console.log(response)
        })
        .then(dados => {
            console.log('Dados da resposta:', dados);
            // Aqui você pode fazer o que quiser com os dados da resposta
        })
        .catch(error => {
            console.error('Erro:', error);
            setError(error.message || 'Erro ao enviar solicitação de recuperação de senha.');
        });
    }
    
    
    

    return (
        <main className="contentForget">
             {error && <span className="error">{error}</span>}
            <Form className="w-75" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
                </Form.Group>
                <button className="btn-admin" type="submit">Enviar</button>
            </Form>
        </main>
    );
}
