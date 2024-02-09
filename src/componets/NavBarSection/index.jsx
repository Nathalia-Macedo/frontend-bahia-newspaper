import { useContext } from "react";
import { PostContext } from "../../providers/PostContexto";
import { NavBarCard } from "./NavBarCard";
import styles from "./style.module.scss";

export const NavBarSection = () => {
    const {  postList } = useContext(PostContext);
    
    // cria uma lista de categorias únicas
    const uniqueCategories = [...new Set(postList.map(objeto => objeto.category))];
    return (
        <section >
            <div >
                <ul className={styles.flexBox}>
                    {uniqueCategories.map((category, index) => {
                        const filteredPosts = postList.filter(objeto => objeto.category === category);
                        return(
                            <NavBarCard key={index} category={category}  objects={filteredPosts}/> 
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

