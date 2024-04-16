import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/imgs/LogoBa.png';
import './Login.css';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroAutenticacao, setErroAutenticacao] = useState(false);
    const [carregando, setCarregando] = useState(false); 

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErroAutenticacao(false);

        if (email.trim() === '' || senha.trim() === '') {
            setErroAutenticacao(true);
            console.error('Email ou senha vazios.');
            return; 
        }
        setCarregando(true); 

        const dadosUsuario = {
            email: email,
            password: senha
        };

        try {
            const response = await fetch('http://34.125.197.110:3333/user/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosUsuario),
            });

            if (response.ok) {
                const dados = await response.json();
                console.log(dados);
                console.log('Usuário autenticado com sucesso!');

                // Armazene o token no localStorage
                localStorage.setItem('token', dados.token);
                localStorage.setItem('user',dados.username)

                // Navegue para a página de admin ou faça outra ação necessária após autenticação bem-sucedida
                navigate('/admin');
            } else {
                const data = await response.json();
                setErroAutenticacao(true);
                console.error('Falha ao autenticar usuário:', data.message || response.statusText);
            }
        } catch (error) {
            setErroAutenticacao(true);
            console.error('Erro ao fazer login:', error);
        } finally {
            setCarregando(false); 
        }
    };

    return (
        <main className="container_login">
        <div className='container_main'>
            <div className="div_image_login">
                <img src={logo} alt="#" />
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Digite seu email: " 
                    value={email} 
                    onChange={handleEmailChange}
                />
                <input 
                    type="password" 
                    placeholder="Digite sua senha: " 
                    value={senha} 
                    onChange={handleSenhaChange}
                />
                {carregando && (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                )}
                {erroAutenticacao && (
                    <div className="alert alert-warning" role="alert">
                        Email ou senha incorretos
                    </div>
                )}
                 <button type="submit">Entrar</button>
                <Link className='forget' to="/forget_password">Esqueceu a Senha?</Link>
               
            </form>
            </div>
        </main>
    );
}
