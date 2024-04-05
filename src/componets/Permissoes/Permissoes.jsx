import React, { useState } from 'react';

function ModalAddPermissoes({ handleSubmit }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = async () => {
        // Verificar se os campos estão preenchidos
        if (!nome || !descricao) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
            return;
        }
    
        // Limpar a mensagem de erro
        setErrorMessage('');
    
        // Enviar os dados para a API
        try {
            const response = await fetch('https://backend-bahia-newspaper.onrender.com/permission/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    description: descricao
                })
            }).then(response=>response.json())
            .then(dados => console.log(dados))

            
    
            // Verificar se a resposta está vazia
            const responseData = response ? await response.json() : null;

            if (response.ok) {
                console.log('Permissão cadastrada com sucesso.', responseData && responseData.permission);
                // Limpar os campos após o envio
                setNome('');
                setDescricao('');
            } else {
                console.error('Erro ao cadastrar permissão.', responseData);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
        }
    };

    return (
        <div className="custom-modal-body">
            {/* Exibir mensagem de erro, se houver */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="mb-3">
                <label htmlFor="nomeInputPermissao" className="form-label">Nome da permissão</label>
                <input
                    type="text"
                    className="form-control"
                    id="nomeInputPermissao"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome da permissão"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="descricaoInputPermissao" className="form-label">Descrição da permissão</label>
                <input
                    type="text"
                    className="form-control"
                    id="descricaoInputPermissao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Digite a descrição da permissão"
                />
            </div>
            <div className="custom-modal-footer">
                <button type="button" className="btn-admin" onClick={handleFormSubmit}>Cadastrar Permissão</button>
            </div>
        </div>
    );
}

export default ModalAddPermissoes;
