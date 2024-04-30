import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../../providers/PostContext";


export const NavBarCard = ({ category}) => {
  const { setFilteredPost , postList} = useContext(PostContext);
  const navigate = useNavigate();
  const [updateCategory,setUpdateCategory] = useState('');

  const update = () => {
    const filteredPosts = postList.filter(post => post.categories && post.categories.length > 0 && post.categories[0].name === category );

    if(filteredPosts.length > 0) {
      setFilteredPost(filteredPosts); 
      navigate(`/post/${filteredPosts[0].id}`); // Navega para o primeiro post na lista
      setUpdateCategory(category); 
    }else {
      console.log("Nenhum post encontrado para esta categoria.");
    }
  };

  return (
      <li>
          <button className="btn" onClick={() => update()}>{category}</button>
      </li>
  )
};
