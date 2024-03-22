export const PostCard = ({post}) => {

    return post ? (
        <li>
            <h3 className="title post">{post.title}</h3>
            <p className="paragraph">{post.content}</p>
        </li>
    ): null;
};

