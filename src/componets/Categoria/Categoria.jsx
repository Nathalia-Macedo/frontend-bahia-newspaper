import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";

function ModalAddCategoria() {
    const [categoriaNome, setCategoriaNome] = useState("");
    const [categoriaDescricao, setCategoriaDescricao] = useState("");
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [categoriasExistente, setCategoriasExistente] = useState([]);
  
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://34.125.197.110:3333/category", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Dados recebidos:", data);
                    const nomesCategorias = data.map(categoria => categoria.name);
                    console.log("Nomes das categorias:", nomesCategorias);
                    setCategoriasExistente(nomesCategorias);
                } else {
                    throw new Error('Erro ao buscar categorias existentes.');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchCategorias();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCategoriaNomeChange = (event) => {
        setCategoriaNome(capitalizeFirstLetter(event.target.value));
    };

    const handleCategoriaDescricaoChange = (event) => {
        setCategoriaDescricao(capitalizeFirstLetter(event.target.value));
    };

    const handleSubmit = async () => {
        if (!categoriaNome || !categoriaDescricao) {
            console.log('entrou no if')
            setShowToast(true)
            setMessage("Erro: Por favor, preencha todos os campos.");
            return;
        }
        if (categoriasExistente.includes(categoriaNome)) {
            setMessage(" Erro: Categoria já existe.");
            setShowToast(true)
            return;
        }

        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://34.125.197.110:3333/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: categoriaNome,
                    description: categoriaDescricao
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar categoria.');
            }

            // Espera a resposta JSON antes de prosseguir
            const data = await response.json();
            console.log("Resposta da adição da categoria:", data);
            setShowToast(true);
            setMessage('Categoria Adicionada com sucesso!');
            setCategoriaNome("");
            setCategoriaDescricao("");
        } catch (error) {
            console.error('Erro:', error);
            setMessage("Erro ao adicionar categoria.");
            setShowToast(true);
        }
    };

    return (
        <div className="containerModal">
            <div className="mb-3">
                <label htmlFor="categoriaNome" className="form-label">Nome da Categoria</label>
                <input type="text" className="form-control custom-input" id="categoriaNome" value={categoriaNome} onChange={handleCategoriaNomeChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="categoriaDescricao" className="form-label">Descrição da Categoria</label>
                <textarea className="form-control custom-input" id="categoriaDescricao" value={categoriaDescricao} onChange={handleCategoriaDescricaoChange} rows="3"></textarea>
            </div>
            <button className="btn-admin" onClick={handleSubmit}>Adicionar Categoria</button>

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
                    backgroundColor: message.includes("Erro") ? "red" : "green", // Altera a cor do background para vermelho se houver mensagem de erro
                    color: "white"
                }}
            >
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
}

export default ModalAddCategoria;
