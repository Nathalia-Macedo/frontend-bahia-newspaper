import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ContentSection } from "../../componets/sections/ContentSection";
import { PostSection } from "../../componets/sections/PosteSection";
import { PostContext } from "../../providers/PostContexto";
import { useContext } from "react";
import { BannerSection } from "../../componets/sections/BannerSection";

export const PostPage = () => {
    const { loading} = useContext(PostContext);
    return (
        <>
        
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    {/* <BannerSection/> */}
                    {/* <ContentSection/> */}
                    <PostSection/>
                </>
            )}
        </>
    );
};