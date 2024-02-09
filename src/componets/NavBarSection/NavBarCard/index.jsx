import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { categoryAtom } from "../../../state/dataAtomo";
import { PostContext } from "../../../providers/PostContexto";
import styles from "./style.module.scss";

export const NavBarCard = ({index, category, objects}) => {
    const [ updateCategory,  setUpdateCategory] = useAtom(categoryAtom);

    const {  setFilteredPost} = useContext(PostContext)
    // console.log(objects)

    const navigate = useNavigate();
    
    const update = (category) => {
        const filtered = objects.filter(post => post.category === category) 
        setFilteredPost(filtered)
        setUpdateCategory(category)
        navigate(`/post/${objects[0].id}`)
    }
    
    return(
        <li className={styles.categories}>
            <button onClick={() => update(category)}>{category.toUpperCase()}</button>            
        </li>
    );
};
