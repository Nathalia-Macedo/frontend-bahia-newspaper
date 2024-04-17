import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/imgs/publicidade-1.jpg"
import React, { useContext, useState } from "react";
import { PostContext } from "../../../providers/PostContext";

export const AsideLeft = () => {
    const {  postList, setFilteredPost} = useContext(PostContext);
    const navigate = useNavigate()
    // Ordenar os posts por data de criação
    const sortedPosts = postList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Manipulador de evento para lidar com o clique em uma imagem de post
    const handleClick = (postId, e) => {
        e.preventDefault();
        const post = sortedPosts.find(post => post.id === postId);
        if (post) {
            setFilteredPost([post]);
            navigate(`/post/${postId}`); 
        } else {
            console.log("Post não encontrado.");
        }
    };
    return (
        <aside className={styles.leftAside}>
            <ul>
                <h1 className="title center">RAPIDINHAS</h1>
                {sortedPosts.slice(0,2).map((post) => (
                <li 
                    key={post.id}>
                    {/* Renderização condicional da imagem do post */}
                    {post.photoUrls && post.photoUrls.map((photoUrl,index) => (
                        <img 
                            key={index} 
                            src={photoUrl}  
                            alt={`Imagem ${index}` } 
                            onClick={(e) => handleClick(post.id, e)}
                        />
                    ))}
                    <div > 
                        {/* Renderização condicional das categorias do post */}                
                        {post.categories && post.categories.map((category) => (
                            <h1
                                key={category.id}
                                className="title two"
                            >
                                {category.name}
                            </h1>
                        ))}
                        </div>
                        {/* Título do post */}
                        <p  className="paragraph small">
                        {post.title}
                    </p>
                </li>
                ))}
            </ul>
            {/*  imagem estática */}
            <span >
                <img src={img} alt="" />
            </span>
        </aside>
    );
};

