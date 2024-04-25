import React, { useState, useEffect } from "react";
import "./SectionData.css"; // Importando o arquivo CSS para estilização

export function SessionData() {
  const [tags, setTags] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setTags(data);
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

  if (loading) {
    return <div>Carregando...</div>;
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
              <input type="text" placeholder="Link do site" className="ad-input" />
              <input type="file" accept="image/*, video/*" className="ad-input" />
              <button className="add-button">Adicionar Anúncio</button>
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
