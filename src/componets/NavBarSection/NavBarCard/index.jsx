import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { categoryAtom } from "../../../state/dataAtomo";
import { PostContext } from "../../../providers/PostContexto";

export const NavBarCard = ({index, category, objects}) => {
    const [ updateCategory,  setUpdateCategory] = useAtom(categoryAtom);
    const {  setFilteredPost, postList} = useContext(PostContext)

    const navigate = useNavigate();
    
    const update = (category) => {
        const filtered = postList.filter(post => post.category === category) 
        setFilteredPost(filtered)
        setUpdateCategory(category)
        navigate(`/post/${objects[0].id}`)
    }
    
    return(
        <li>
            <button className="btn" onClick={() => update(category)}>{category}</button>            
        </li>
    );
};
