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
    const [ads, setAds] = useState([]);


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
                const { data } = await Api.get(`/post/`);
                const publishedPosts = data.filter(post => post.published === true);
                // Extrai os últimos 10 posts                
                const lastTenPosts = publishedPosts.slice(0, 10);
                setPostList(lastTenPosts)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, [id, setLoading]);

    useEffect(() => {
        const advertisement = async () => {
        try {
            setLoading(true); 
            const response = await Api.get("/ad");
            const adsData = response.data;
            const sortedAds = adsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setAds(sortedAds.slice(0, 4));
        } catch (error) {
            console.error('Erro ao obter os anúncios:', error);
        } finally {
            setLoading(false); 
            }
        }
        advertisement();
    }, []);
    

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
            ads,
            setAds
        }}
        >
            {children}
        </PostContext.Provider>
    );
};
