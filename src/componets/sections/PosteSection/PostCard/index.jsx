import styles from "./style.module.scss";
import { format} from "date-fns";
import { ptBR } from 'date-fns/locale';

export const PostCard = ({post}) => {

     // Verifica se a postagem está definida
    if (!post) {
        return null;
    }
    // Formata a data da postagem
    const formattedDate = format(new Date(post.createdAt), "EEEE, dd/MM/yyyy - HH'h'mm", {locale: ptBR}).toString();
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <li className={styles.liContainer}>
            {post.categories && post.categories.length > 0 && (
                <p className="category">Notícia: {post.categories[0].name}</p>
            )}
            <h3 className="title post">{post.title}</h3>
            <p className="created-at">{capitalizedDate}</p>
            {post.photoUrls && post.photoUrls.length > 0 && (
                <div >
                    {post.photoUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Imagem ${index}`} />
                    ))}
                </div>
            )}
            <p className="paragraph">{post.content}</p>
        </li>
    );
};


