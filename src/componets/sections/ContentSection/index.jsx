import { useContext } from "react";
import { PostContext } from "../../../providers/PostContexto";

export const ContentSection = () => {
    const {  postList } = useContext(PostContext);
// preciso renderizar um unico conteudo pos imagem
    // console.log(postList)
    return postList ?(
        <section>
            <h1>{postList.title}</h1>
            <span>{postList.author}</span>
            <p>{postList.content}</p>
        </section>
    ) : null;
};