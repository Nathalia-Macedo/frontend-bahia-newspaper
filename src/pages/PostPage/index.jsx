import { PostSection } from "../../componets/sections/PosteSection";
import styles from "./style.module.scss";
import { useContext } from "react";
import { PostContext } from "../../providers/PostContext";
import { DefaultTemplate } from "../../componets/DefaultTemplate";

export const PostPage = () => {
    const { loading} = useContext(PostContext);
    return (
        <DefaultTemplate>
            <div className={styles.postPage}>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        <PostSection/>
                    </>
                )}
            </div>
        </DefaultTemplate>
    );
};
