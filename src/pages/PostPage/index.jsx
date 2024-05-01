import { PostSection } from "../../componets/sections/PosteSection";
import styles from "./style.module.scss";
import { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostContext";
import { DefaultTemplate } from "../../componets/DefaultTemplate";
import { useParams } from "react-router-dom";
import { Api } from "../../../services/api";
import Spinner from "react-bootstrap/Spinner";

export const PostPage = () => {
    const { loading, setLoading, filteredPost } = useContext(PostContext);
    

    const { id } = useParams();


    useEffect(() => {
        scrollTo(0, 0);
        const getPostById = async () => {
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
        getPostById();
    }, [id, setLoading]);


    return (
        <DefaultTemplate>
            <div className={styles.postPage}>
                {loading ? (
                    <Spinner  animation="border" role="status" />
                    
                ) : (
                    <>
                    {filteredPost && filteredPost.length> 0 ? (
                        <PostSection post={filteredPost[0]} />

                    ) : (
                        <p className="title three">Escolha uma Notícia.</p>
                    )}
                    </>
                )}
            </div>
        </DefaultTemplate>
    );
};

