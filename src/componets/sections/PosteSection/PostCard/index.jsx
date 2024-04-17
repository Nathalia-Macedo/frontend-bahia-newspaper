export const PostCard = ({post}) => {

    return post ? (
        <li>
            {post.photoUrls && post.photoUrls.length > 0 && (
                <div className="image-container">
                    {post.photoUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Imagem ${index}`} />
                    ))}
                </div>
            )}
            {post.categories && post.categories.length > 0 && (
                <p className="category">Categoria: {post.categories[0].name}</p>
            )}
            <h3 className="title post">{post.title}</h3>
            <p className="paragraph">{post.content}</p>
            <p className="created-at">Criado em: {post.createdAt}</p>
        </li>
    ): null;
};


