import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

function ModalAddCategoria() {
    const [categoriaNome, setCategoriaNome] = useState("");
    const [categoriaDescricao, setCategoriaDescricao] = useState("");
    const [erro, setErro] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleCategoriaNomeChange = (event) => {
        // Transforma a primeira letra para maiúscula e atualiza o estado
        setCategoriaNome(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
    };

    const handleCategoriaDescricaoChange = (event) => {
        // Transforma a primeira letra para maiúscula e atualiza o estado
        setCategoriaDescricao(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
    };

    const handleSubmit = async () => {
        if (!categoriaNome || !categoriaDescricao) {
            setErro("Por favor, preencha todos os campos.");
            return;
        }else if(!categoriaNome && !categoriaDescricao){
            setErro('Todos os campos devem ser preenchidos')
            return
        }

        // Reset error message
        setErro("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://34.125.197.110:3333/category/", {
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

            setShowToast(true); // Exibir o toast quando a categoria for adicionada com sucesso
            setCategoriaNome(""); // Limpar os campos após adicionar a categoria
            setCategoriaDescricao("");
        } catch (error) {
            console.error('Erro:', error);
            setErro("Categoria já cadastrada");
        }
    };

    return (
        <div className="containerModal">
            {erro && <p style={{ color: "red" }}>{erro}</p>} {/* Renderizar a mensagem de erro se houver */}
            <div className="mb-3">
                <label htmlFor="categoriaNome" className="form-label">Nome da Categoria</label>
                <input type="text" className="form-control custom-input" id="categoriaNome" value={categoriaNome} onChange={handleCategoriaNomeChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="categoriaDescricao" className="form-label">Descrição da Categoria</label>
                <textarea className="form-control custom-input" id="categoriaDescricao" value={categoriaDescricao} onChange={handleCategoriaDescricaoChange} rows="3"></textarea>
            </div>
            <button className="btn-admin" onClick={handleSubmit}>Adicionar Categoria</button>

            {/* Toast de categoria adicionada com sucesso */}
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
                    backgroundColor: "green",
                    color: "white"
                }}
            >
                <Toast.Body>Categoria adicionada com sucesso!</Toast.Body>
            </Toast>
        </div>
    );
}

export default ModalAddCategoria;
