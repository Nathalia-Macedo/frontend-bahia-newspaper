import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { PostContext } from "../../../providers/PostContext";

export const AsideLeft = () => {
    const {  postList, setFilteredPost, loading, ads, setAds} = useContext(PostContext);
    const navigate = useNavigate()


    const sortedPosts = postList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const handleAds = (link) => {
        window.open(link, '_blank');
    }

    const handleClick = (postId, e) => {
        e.preventDefault();
        const post = sortedPosts.find(post => post.id === postId);
        if (post) {
            setFilteredPost([post]);
            navigate(`/post/${postId}`); 
        } else {
            console.error("Post não encontrado.", error);
        }
    };
    return (
        <aside className={styles.leftAside}>
            <ul>
                <h1 className="title center">RAPIDINHAS</h1>
                {sortedPosts.slice(0,3).map((post) => (
                <li 
                    key={post.id}
                    className={styles.lists}
                    onClick={(e) => handleClick(post.id, e)}
                    >
                    {post.photoUrls && post.photoUrls.map((photoUrl,index) => (
                        <img 
                            key={index} 
                            src={photoUrl}  
                            alt={`Imagem ${index}` } 
                            
                        />
                    ))}
                    <div className={styles.titles}> 
                        {/* Renderização condicional das categorias do post */}                
                        {post.categories && post.categories.map((category) => (
                            <h1
                                key={category.id}
                                className="title two"
                            >
                                {category.name}
                            </h1>
                        ))}
                        {/* Título do post */}
                        <p  className="paragraph small">
                            {post.title}
                        </p>
                    </div>
                </li>
                ))}
            
            {ads.slice(0,1).map((ad, index) => (
                <span 
                className={styles.imageUrls}
                key={index} onClick={() => handleAds(ad.link)} style={{ cursor: "pointer" }}>
                    {ad.videoUrl.length > 0 && (
                    <video className={styles.imageUrls} controls>
                        <source src={ad.videoUrl} type="video/mp4" />
                    </video>
                    )}
                    {ad.imageUrl.length > 0 && (
                    <img className={styles.imageUrls} src={ad.imageUrl} alt={`Anúncio ${index + 1}`} />
                    )}
                </span>
            ))} 
            </ul> 
        </aside>
    );
};

