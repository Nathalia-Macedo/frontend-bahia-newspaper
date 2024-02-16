import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryAtom } from "../../../state/dataAtomo";

import styles from "./style.module.scss";
import { PostContext } from "../../../providers/PostContext";

export const NavBarCard = ({ category,  setCategory}) => {
  const [updateCategory, setUpdateCategory] = useAtom(categoryAtom);
  const { postList, setFilteredPost } = useContext(PostContext);
  const navigate = useNavigate();

  const update = () => {
    const filteredPosts = postList.filter(post => post.category === category);
    setFilteredPost(filteredPosts); // Define os posts filtrados como a lista fornecida
    setUpdateCategory(category); // Atualiza a categoria selecionada
    setCategory(category);
    navigate(`/post/${filteredPosts[0].id}`); // Navega para o primeiro post na lista
  };

  return (
    <li className={styles.categories}>
        <button onClick={update}>{category.toUpperCase()}</button>
    </li>
  );
};
