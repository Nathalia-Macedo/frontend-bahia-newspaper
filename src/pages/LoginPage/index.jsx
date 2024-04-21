// Importe useState e useEffect do React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/imgs/LogoBa.png';
import { Toast } from 'react-bootstrap'; // Importe o Toast do react-bootstrap
import './Login.css';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false); 
    const [showErroToast, setShowErroToast] = useState(false); // Adicione o estado para controlar a exibição do toast de erro
    const [erroMensagem, setErroMensagem] = useState(''); // Adicione o estado para armazenar a mensagem de erro

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErroMensagem(''); // Limpe a mensagem de erro ao enviar o formulário
        setShowErroToast(false); // Oculte o toast de erro

        // Validação do formato de email
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErroMensagem('Email inválido.'); // Defina a mensagem de erro
            setShowErroToast(true); // Exiba o toast de erro
            return;
        }

        if (email.trim() === '' || senha.trim() === '') {
            setErroMensagem('Preencha todos os campos.'); // Defina a mensagem de erro
            setShowErroToast(true); // Exiba o toast de erro
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
                setErroMensagem("Email ou senha incorretos"); // Defina a mensagem de erro recebida do servidor
                setShowErroToast(true); // Exiba o toast de erro
                console.error('Falha ao autenticar usuário:', data.message || response.statusText);
            }
        } catch (error) {
            setErroMensagem('Erro ao fazer login.'); // Defina a mensagem de erro
            setShowErroToast(true); // Exiba o toast de erro
            console.error('Erro ao fazer login:', error);
        } finally {
            setCarregando(false); 
        }
    };

    // UseEffect para ocultar o Toast após 10 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowErroToast(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [showErroToast]);

    return (
        <>
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
                   
                    <button className='login_button' type="submit">Entrar</button>
                    <Link className='forget' to="/forget_password">Esqueceu a Senha?</Link>
                </form>
            </div>
        </main>

         {/* Toast de erro */}
         <Toast 
             show={showErroToast} 
             onClose={() => setShowErroToast(false)} 
             style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'red', color: 'white' }}
         >
             <Toast.Body>{erroMensagem}</Toast.Body>
         </Toast>

    
     </>
    );
}
