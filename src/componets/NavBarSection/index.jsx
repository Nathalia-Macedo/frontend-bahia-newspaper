import { useContext, useState } from "react";
import { PostContext } from "../../providers/PostContext";
import { NavBarCard } from "./NavBarCard";
import styles from "./style.module.scss";



export const NavBarSection = () => {
    const [category, setCategory] = useState('');
    const {  postList } = useContext(PostContext);
    
    // cria uma lista de categorias únicas, Set garante que ela apareca apenas uma vez
    const uniqueCategories = [...new Set(postList.map(object => object.category))];

    return (
        <section >
            <div >
                <ul className={styles.flexBox}>
                {uniqueCategories.map((category) => (
                    <NavBarCard key={category}  category={category} setCategory={setCategory}  />
                ))}
                </ul>
            </div>
        </section>
    );
};

// {uniqueCategories.map((category) => {
//     const filteredPosts = postList.filter(objeto => objeto.category === category);
//     return(
//         <NavBarCard key={category} category={category}  objects={filteredPosts}/> 
//     );
// })}