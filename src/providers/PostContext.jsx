import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogApi } from "../../services/api";

export const PostContext = createContext({});

export const PostProvider = ({children}) => {

    const [value, setValue] = useState("");
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPost, setFilteredPost] = useState(null);
    const [currentPost, setCurrentPost] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();
        
    useEffect(() => {
        scrollTo(0, 0);
        const getPosts = async () =>{
            try {
                setLoading(true);
                const { data } = await blogApi.get("/news")
                let newData = data.filter(post => post.id !== Number(id));
                newData.reverse();
                // newData.length = 1;
                setPostList(newData);
            } catch (error) {
                console.error(error);
            }finally{
                setLoading(false);
            }
        };

        getPosts();
    }, [id])


    return(
        <PostContext.Provider value={{loading, setPostList, postList, filteredPost, currentPost,  setFilteredPost, setValue, value}}>
            {children}
        </PostContext.Provider>
    )
}