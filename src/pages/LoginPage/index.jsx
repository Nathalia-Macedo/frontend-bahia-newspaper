import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/Logo Jornal da Bahia.png';
import './Login.css';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [autenticado, setAutenticado] = useState(false);
    const [erroAutenticacao, setErroAutenticacao] = useState(false);
    const [carregando, setCarregando] = useState(false); // Estado para controlar a exibição da bolinha de carregamento

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCarregando(true); // Ativa a bolinha de carregamento

        const dadosUsuario = {
            email: email,
            password: senha
        };

        try {
            const response = await fetch('https://backend-bahia-newspaper.onrender.com/user/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosUsuario),
            });

            if (response.ok) {
                const dados = await response.json();
                console.log(dados);
                setAutenticado(true);
                console.log('Usuário autenticado com sucesso!');
                
                // Redefine o estado de erroAutenticacao para falso
                setErroAutenticacao(false);
            } else {
                const data = await response.json();
                setErroAutenticacao(true);
                console.error('Falha ao autenticar usuário:', data.message || response.statusText);
            }
        } catch (error) {
            setErroAutenticacao(true);
            console.error('Erro ao fazer login:', error);
        } finally {
            setCarregando(false); // Desativa a bolinha de carregamento após a resposta ser recebida
        }
    };

    return (
        <main className="container_login">
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
                {carregando && ( // Exibe a bolinha de carregamento se estiver carregando
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                )}
                {erroAutenticacao && (
                    <div className="alert alert-warning" role="alert">
                        Email ou senha incorretos
                    </div>
                )}
                <Link to="/forget_password">Esqueceu a Senha?</Link>
                <button type="submit">Entrar</button>
            </form>
        </main>
    );
}
