// HelpPage.js

import React from 'react';
import './HelpPage.css';
import HelpQuestion from '../../componets/QuestionHelp/QuestionHelp';
import logo from '../../assets/imgs/Logo.png';

export function HelpPage() {
    return (
        <div className="help-page">
            <nav className="help-nav">
                <img src={logo} alt="Logo" className="logo" />
                <ul className="nav-links">
                    <li><a href="#funcionalidades">Funcionalidades</a></li>
                    <li><a href="#como-navegar">Como Navegar</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </nav>
          
            <section id="como-navegar" className="help-section">
                <h2>Categorias</h2>
                <HelpQuestion
    question={'Como adicionar novas categorias?'}
    answer={`
        Para adicionar novas categorias, vá na aba categorias - adicionar categoria.

        As categorias já são configuradas para ter o formato Camel Case (primeira letra maiúscula).
        Não é possível adicionar categoria sem descrição, nem categorias que já existem!
    `}
/> <HelpQuestion
    question={'Como visualizar todas as categorias?'}
    answer={`
        Para adicionar visualizar todas as categorias existentes, vá na aba categorias - Visualizar categorias.

        Também é possível apagar uma categoria a partir dessa aba, basta clicar na lixeira referente a categoria que você quer apagar.
      
        ATENÇÃO: Ao apagar uma categoria, as postagens que estavam com aquela categoria ficam vazias!
    `}></HelpQuestion>

    

                    
            </section>
            <section id="contato" className="help-section">
                <h2>Funcionários</h2>
                <HelpQuestion
    question={'Como Adicionar funcionários?'}
    answer={`
        Para adicionar um novo funcionário, vá na aba Funcionários - Adicionar funcionário. Para cadastrar um funcionário, é necessário nome, email, senha e confirmação da senha. Caso tenha erro em algum dos dados (email sem @ ou .com, senha e confirmação de senha não coincidem, ou então tentar cadastrar um email já cadastrado) não é possível!
    `}
/>
<HelpQuestion
    question={'Como visualizar os funcionários?'}
    answer={`
        Para adicionar um novo funcionário, vá na aba Funcionários - Adicionar funcionário. Para cadastrar um funcionário, é necessário nome, email, senha e confirmação da senha. Caso tenha erro em algum dos dados (email sem @ ou .com, senha e confirmação de senha não coincidem, ou então tentar cadastrar um email já cadastrado) não é possível!
    `}
/>
            </section>
        </div>
    );
}
