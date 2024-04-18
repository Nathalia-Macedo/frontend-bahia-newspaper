import { PostSection } from "../../componets/sections/PosteSection";
import styles from "./style.module.scss";
import { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostContext";
import { DefaultTemplate } from "../../componets/DefaultTemplate";
import { useParams } from "react-router-dom";
import { Api } from "../../../services/api";
import Loading from "../../assets/spinner/Loading.svg";

export const PostPage = () => {
    const { loading, setLoading, filteredPost } = useContext(PostContext);
    console.log(filteredPost)

    const { id } = useParams();
    //   Requizisao para trazer  as postagens por id

    useEffect(() => {
        scrollTo(0, 0);
        const getPosts = async () => {
            try {
                setLoading(true);
                await Api.get(`/post/${id}`, 
                );                        
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, [id, setLoading]);


    return (
        <DefaultTemplate>
        <main className="container">
            <div className={styles.postPage}>
                {loading ? (
                    // <p className="title one"></p>
                    <img src={Loading} alt="Carregando..." />
                    
                ) : (
                    <>
                    {filteredPost && filteredPost.length> 0 ? (
                        <PostSection post={filteredPost[0]} />

                    ) : (
                        <p className="title three">Escolha uma Notícia .</p>
                    )}
                    </>
                )}
            </div>

        </main>
        </DefaultTemplate>
    );
};

