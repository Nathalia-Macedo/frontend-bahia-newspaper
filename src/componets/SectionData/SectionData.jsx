// import React, { useState, useEffect } from "react";
// import "./SectionData.css"; // Importando o arquivo CSS para estilização
// import { Spinner } from "react-bootstrap";

// export function SessionData() {
//   const [tags, setTags] = useState([]);
//   const [topNews, setTopNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [description, setDescription] = useState(""); // Estado para armazenar a descrição do anúncio
//   const [fileBase64, setFileBase64] = useState(""); // Estado para armazenar a imagem em base64
//   const [link, setLink] = useState(""); // Estado para armazenar o link do anúncio

//   useEffect(() => {
//     fetchTags();
//     fetchTopNews();
//   }, []);

//   const fetchTags = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://34.125.197.110:3333/tag", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTags(data);
//       } else {
//         console.error("Erro ao buscar tags:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar tags:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTopNews = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://34.125.197.110:3333/post", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Ordena as postagens pelo número de visualizações em ordem decrescente
//         const sortedNews = data.sort((a, b) => b.post_view_count - a.post_view_count);
//         // Pega os três primeiros títulos
//         const topThreeTitles = sortedNews.slice(0, 3).map(post => post.title);
//         setTopNews(topThreeTitles);
//       } else {
//         console.error("Erro ao buscar as notícias mais lidas:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar as notícias mais lidas:", error);
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0]; // Obtém o arquivo selecionado pelo usuário
//     console.log("Arquivo selecionado:", file); // Log para verificar se o arquivo foi selecionado corretamente
//     if (file) {
//       setFileBase64(file)
     
//     }
//   };
  
  
 
  

//   const handleAddAdvertisement = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("description", description);
//       formData.append("files", fileBase64); // Envia a imagem em base64
//       formData.append("link", link);
//       console.log(fileBase64)
//       const response = await fetch("http://34.125.197.110:3333/ad/new", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       const data = await response.json()
//       console.log(data)
//       if (response.ok) {
//         console.log("Anúncio criado com sucesso!");
//         // Limpa os campos após o envio bem-sucedido
//         setDescription("");
//         setFileBase64("");
//         setLink("");
    
//         // Resetar o valor do input do tipo arquivo para limpar a seleção
//         const inputElement = document.querySelector('input[type="file"]');
//         if (inputElement) {
//           inputElement.value = ""; // Define o valor do input como uma string vazia
//         }
//       } else {
//         console.error("Erro ao criar anúncio:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Erro ao criar anúncio:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-spinner-section">
//           <Spinner/>
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container_section">
//       <div className="content">
//         <div className="tags">
//           <h3>Tags:</h3>
//           <ul className="tag-list">
//             {tags.map((tag) => (
//               <li key={tag.id} className="tag-item">{tag.name}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="other-content">
//           <div className="advertisement">
//             <h3>Inserir Anúncio:</h3>
//             <div className="input-container">
//               <input type="text" placeholder="Link do site" value={link} onChange={(e) => setLink(e.target.value)} className="ad-input" />
//               <input type="file" accept="image/*, video/*" onChange={handleFileChange} className="ad-input" />
//               <input type="text" placeholder="Descrição do anúncio" value={description} onChange={(e) => setDescription(e.target.value)} className="ad-input" />
//               <button className="add-button" onClick={handleAddAdvertisement}>Adicionar Anúncio</button>
//             </div>
//           </div>
//         </div>
     
//         <div className="top-news">
//           <h3>Notícias Mais Lidas:</h3>
//           <ul className="news-list">
//             {topNews.map((title, index) => (
//               <li key={index} className="news-item">{title}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import "./SectionData.css"; // Importando o arquivo CSS para estilização
import { Spinner } from "react-bootstrap";

export function SessionData() {
  const [tags, setTags] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(""); // Estado para armazenar a descrição do anúncio
  const [fileBase64, setFileBase64] = useState(""); // Estado para armazenar a imagem em base64
  const [link, setLink] = useState(""); // Estado para armazenar o link do anúncio

  useEffect(() => {
    fetchTags();
    fetchTopNews();
  }, []);

  const fetchTags = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/tag", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Ordena as tags por ordem alfabética
        const sortedTags = data.sort((a, b) => a.name.localeCompare(b.name));
        setTags(sortedTags);
      } else {
        console.error("Erro ao buscar tags:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopNews = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.125.197.110:3333/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Ordena as postagens pelo número de visualizações em ordem decrescente
        const sortedNews = data.sort((a, b) => b.post_view_count - a.post_view_count);
        // Pega os três primeiros títulos
        const topThreeTitles = sortedNews.slice(0, 3).map(post => post.title);
        setTopNews(topThreeTitles);
      } else {
        console.error("Erro ao buscar as notícias mais lidas:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar as notícias mais lidas:", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Obtém o arquivo selecionado pelo usuário
    console.log("Arquivo selecionado:", file); // Log para verificar se o arquivo foi selecionado corretamente
    if (file) {
      setFileBase64(file)
    }
  };

  const handleAddAdvertisement = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("description", description);
      formData.append("files", fileBase64); // Envia a imagem em base64
      formData.append("link", link);
      console.log(fileBase64)
      const response = await fetch("http://34.125.197.110:3333/ad/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log("Anúncio criado com sucesso!");
        // Limpa os campos após o envio bem-sucedido
        setDescription("");
        setFileBase64("");
        setLink("");
    
        // Resetar o valor do input do tipo arquivo para limpar a seleção
        const inputElement = document.querySelector('input[type="file"]');
        if (inputElement) {
          inputElement.value = ""; // Define o valor do input como uma string vazia
        }
      } else {
        console.error("Erro ao criar anúncio:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar anúncio:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner-section">
          <Spinner/>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container_section">
      <div className="content">
        <div className="tags">
          <h3>Tags:</h3>
          <ul className="tag-list">
            {tags.map((tag) => (
              <li key={tag.id} className="tag-item">{tag.name}</li>
            ))}
          </ul>
        </div>
        <div className="other-content">
          <div className="advertisement">
            <h3>Inserir Anúncio:</h3>
            <div className="input-container">
              <input type="text" placeholder="Link do site" value={link} onChange={(e) => setLink(e.target.value)} className="ad-input" />
              <input type="file" accept="image/*, video/*" onChange={handleFileChange} className="ad-input" />
              <input type="text" placeholder="Descrição do anúncio" value={description} onChange={(e) => setDescription(e.target.value)} className="ad-input" />
              <button className="add-button" onClick={handleAddAdvertisement}>Adicionar Anúncio</button>
            </div>
          </div>
        </div>
     
        <div className="top-news">
          <h3>Notícias Mais Lidas:</h3>
          <ul className="news-list">
            {topNews.map((title, index) => (
              <li key={index} className="news-item">{title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
