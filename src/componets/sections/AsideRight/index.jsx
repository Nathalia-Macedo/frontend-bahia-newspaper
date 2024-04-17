import { useContext, useEffect } from "react";
import img from "../../../assets/imgs/publicidade-1.jpg"
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { PostContext } from "../../../providers/PostContext";
import { Api } from "../../../../services/api";

export const AsideRight = () => {

    const {  mostViewedPosts, filteredPost, setLoading, setMostViewedPosts} = useContext(PostContext);

    useEffect(() => {
        scrollTo(0, 0);
        const fetchMostViewedPosts = async () => {
            try {
                setLoading(true);
                const response = await Api.get(`/filter/post/views`);                
                const lastTenPosts = response.data.slice(0, 2);
                setMostViewedPosts(lastTenPosts)

            } catch (error) {
                console.error('Erro ao obter as postagens mais visualizadas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMostViewedPosts();
    }, []);


    console.log()
    return (
        <aside className={styles.rightAside}>
            <ul>
                <h1 className="title center">MAIS LIDAS</h1>
                {mostViewedPosts.map((obj, index) => (
                <li key={index}>
                        <img key={index} src={obj.photoUrls[0] ? obj.photoUrls[0] : ""}  alt={`Imagem ${index}`} />
                        
                    <p className="paragraph small">{obj.title}</p>
                </li>
                ))}
            </ul>
            <span>
                <img src={img} alt="" />
            </span>
        </aside>
    );
};

