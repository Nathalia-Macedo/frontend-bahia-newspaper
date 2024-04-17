import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../services/api";

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {
    const [value, setValue] = useState("");
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPost, setFilteredPost] = useState(null);
    const [mostViewedPosts, setMostViewedPosts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);


    const { id } = useParams();

    //Requizisao para trazer todas as categorias
    useEffect(() => {
        scrollTo(0, 0);
        const getCategories = async () => {
            try {
                setLoading(true);
                const { data } = await Api.get("/category/", 
                );
                
                setCategoryList(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    //Requizisao para trazer todas as postagens 
    useEffect(() => {
        scrollTo(0, 0);
        const getPosts = async () => {
            try {
                setLoading(true);
                const { data } = await Api.get(`/post/`
                );
                // Extrai os últimos 5 posts                
                const lastTenPosts = data.slice(0, 5);
                setPostList(lastTenPosts)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, [id, setLoading]);


    return (
    <PostContext.Provider
        value={{
            loading,
            setLoading,
            setPostList,
            postList,
            categoryList,
            setCategoryList,
            filteredPost,
            mostViewedPosts,
            setFilteredPost,
            setValue,
            value,
            setMostViewedPosts,
        }}
        >
            {children}
        </PostContext.Provider>
    );
};
