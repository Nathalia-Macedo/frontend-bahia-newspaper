import { useParams } from "react-router-dom";

export const PostPage = () => {
    const params = useParams();
    console.log(params);
    return (
        <>
            <h1>Post Page</h1>
        </>
    );
};