export const PostCard = ({post}) => {
    
    return post ? (
        <li>
            <h3 className="title post">{post.title}</h3>
            <h3 className="paragraph">{post.content}</h3>
        </li>
    ): null;
};

