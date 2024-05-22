import { Link, Navigate, useNavigate } from "react-router-dom";
import {  MdSearch } from "react-icons/md";
import { NavBarSection } from "../NavBarSection";
import Logo from "../../assets/imgs/Logo.png";
import styles from "./style.module.scss";
import { PostContext } from "../../providers/PostContext";
import { useContext, useState } from "react";
import { FaWhatsapp, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';


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
            <div className="container1">
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
                <span className={styles.containerIcons}>
                        <Link 
                            to="https://wa.me/557193485952"
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FaWhatsapp size={25} color="#25D366" />
                        </Link>
                        <Link 
                            to="https://www.instagram.com/jornaldabahia.ba?utm_source=qr&igsh=MWxmd3p2dG12dnM4YQ%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer">
                            <FaInstagram size={25} color="#E4405F" /> 
                        </Link>
                        <Link 
                            to="https://twitter.com/jornaldabahia01?t=ywFx66CkQyp5JaJSdIISqA&s=08"
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FaTwitter size={25} color="#1DA1F2" /> 
                        </Link>
                        <Link 
                            to="mailto:seuemail@dominio.com"
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FaEnvelope size={25} color="#D44638" /> 
                        </Link>
                </span>
                <NavBarSection/>
            </div>
        </header>
    );
};








