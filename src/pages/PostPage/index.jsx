import { PostSection } from "../../componets/sections/PosteSection";
import styles from "./style.module.scss";
import { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostContext";
import { DefaultTemplate } from "../../componets/DefaultTemplate";
import { useParams } from "react-router-dom";
import { Api } from "../../../services/api";

export const PostPage = () => {
    const { loading, setLoading, } = useContext(PostContext);

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
            <div className={styles.postPage}>
                {loading ? (
                    <p className="title one">Carregando...</p>
                ) : (
                    <>
                        <PostSection/>
                    </>
                )}
            </div>
        </DefaultTemplate>
    );
};

