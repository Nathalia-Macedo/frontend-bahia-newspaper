import { Link, Navigate, useNavigate } from "react-router-dom";
import {  MdSearch } from "react-icons/md";
import { NavBarSection } from "../NavBarSection";
import Logo from "../../assets/imgs/LogoBa.png";
import styles from "./style.module.scss";
import { PostContext } from "../../providers/PostContext";
import { useContext, useState } from "react";

export const Header = () => {
    const {  postList , setFilteredPost } = useContext(PostContext);
    const [value, setValue] = useState("");
    const navigate = useNavigate();


    const submit = (e) => {
        e.preventDefault();
    
        const filteredPost = postList.filter(post =>
            post.content.toLowerCase().includes(value.toLowerCase()) ||
            post.title.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredPost.length > 0) {
            navigate(`/post/${filteredPost[0].id}`);
            setFilteredPost(filteredPost);
        }else {
            console.log("Nenhum post encontrado para esta pesquisa.");
        }
        setValue("");
    }
    return (
        <header>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                        <img src={Logo} alt="Logo do jornal"/>
                    </Link>
                    <form onSubmit={submit}>
                        <input
                            className="input" 
                            type="text"
                            placeholder="BUSCAR NO SITE"
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                        <button type="submit">
                            <MdSearch size={25} />
                        </button>
                    </form>
                </div>
                <NavBarSection/>
            </div>
        </header>
    );
};








