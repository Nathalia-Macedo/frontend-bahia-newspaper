import React, { useState } from "react";

function ModalAddCategoria() {
    const [categoriaNome, setCategoriaNome] = useState("");
    const [categoriaDescricao, setCategoriaDescricao] = useState("");
    const [erro, setErro] = useState("");

    const handleCategoriaNomeChange = (event) => {
        setCategoriaNome(event.target.value);
    };

    const handleCategoriaDescricaoChange = (event) => {
        setCategoriaDescricao(event.target.value);
    };

    const handleSubmit = async () => {
        if (!categoriaNome || !categoriaDescricao) {
            setErro("Por favor, preencha todos os campos.");
            return;
        }

        // Reset error message
        setErro("");

        try {
            const response = await fetch("http://34.125.197.110:3333/category/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: categoriaNome,
                    description: categoriaDescricao
                })
            }).then(response => response.json())
            .then(dados => console.log(dados))

            if (!response.ok) {
                throw new Error('Erro ao adicionar categoria.');
            }

            const data = await response.json();
            console.log(data); // Aqui você pode fazer algo com os dados da resposta
        } catch (error) {
            console.error('Erro:', error);
            setErro("Ocorreu um erro ao adicionar a categoria. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <div className="containerModal">
            {erro && <div className="alert alert-danger">{erro}</div>}
            <div className="mb-3">
                <label htmlFor="categoriaNome" className="form-label">Nome da Categoria</label>
                <input type="text" className="form-control custom-input" id="categoriaNome" value={categoriaNome} onChange={handleCategoriaNomeChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="categoriaDescricao" className="form-label">Descrição da Categoria</label>
                <textarea className="form-control custom-input" id="categoriaDescricao" value={categoriaDescricao} onChange={handleCategoriaDescricaoChange} rows="3"></textarea>
            </div>
            <button className="btn-admin" onClick={handleSubmit}>Adicionar Categoria</button>
        </div>
    );
}

export default ModalAddCategoria;
