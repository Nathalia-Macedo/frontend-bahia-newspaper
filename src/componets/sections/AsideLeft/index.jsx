import styles from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/imgs/publicidade-1.jpg"
import React, { useContext, useState } from "react";
import { PostContext } from "../../../providers/PostContext";

export const AsideLeft = () => {
    const {  postList, setFilteredPost} = useContext(PostContext);
    const navigate = useNavigate()
    // const [visible, setVisible] = useState(true); 

    const sortedPosts = postList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const handleClick = (postId) => {
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
                {sortedPosts.slice(0,2).map((post, index) => (
                <li 
                    key={index}>
                    {post.photoUrls && post.photoUrls.map((photoUrl,index) => (
                        <img 
                            key={index} 
                            src={photoUrl}  
                            alt={`Imagem ${index}` } 
                        />
                    ))}
                    <Link  
                        to={`/post/${post.id}`}
                        className="link"
                        onClick={handleClick}
                    >
                        {post.categories && post.categories.map((category) => (
                        <div key={category.id}>
                            <h1 className="title two">{category.name}</h1>
                        </div>
                        ))}
                    </Link>
                    <p
                        className="paragraph small"
                        onClick={() => handleClick(post.id)}
                    >
                        {post.title}
                    </p>
                </li>
                ))}
            </ul>
            <span >
                <img src={img} alt="" />
            </span>
        </aside>
    );
};

