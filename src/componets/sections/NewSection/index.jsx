import { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { PostContext } from "../../../providers/PostContext";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const NewSection = () => {
    const { mostViewedPosts } = useContext(PostContext);

    // Função para formatar a data
    function formattedDate(date) {
        return format(new Date(date), "EEEE, dd/MM/yyyy - HH'h'mm", { locale: ptBR });
    }

    return (
        <section>
            <div className={styles.flexBox}>
                <ul>
                    {mostViewedPosts.slice(0, 1).map(post => (
                        <li key={post.id}>
                            <div>
                                {post.categories && post.categories.length > 0 && (
                                    <p className="category">Notícia: {post.categories[0].name}</p>
                                )}
                                <h3 className="title post">{post.title}</h3>
                                <p className="created-at">{formattedDate(post.createdAt)}</p>
                                <div className={styles.image}>
                                    {post.videoUrls && post.videoUrls.length > 0 && (
                                        <span className={styles.image}>
                                            {post.videoUrls.map((url, index) => (
                                                <video key={index} controls>
                                                    <source src={url} type="video/mp4" />
                                                </video>
                                            ))}
                                        </span>
                                    )}
                                    {post.photoUrls && post.photoUrls.length > 0 && (
                                        <div className={styles.image}>
                                            {post.photoUrls.map((url, index) => (
                                                <img key={index} src={url} alt={`Imagem ${index}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="paragraph text">{post.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default NewSection;
// export const NewSection = () => {
//     const { mostViewedPosts, setMostViewedPosts } = useContext(PostContext);

//     // const formattedDate = format(new Date(post.createdAt), "EEEE, dd/MM/yyyy - HH'h'mm", {locale: ptBR}).toString();
//     // const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

//       // Função para formatar a data
//         function formattedDate(date) {
//         return format(new Date(date), "EEEE, dd/MM/yyyy - HH'h'mm", { locale: ptBR });
//     }
//     return (
//         <section >
//             <div className={styles.flexBox}>        
//                 <ul>
//                     {mostViewedPosts.slice(0,1).map(post => (
//                         <li key={post.id}>
//                             <div>
//                                 {post.categories && post.categories.length > 0 && (
//                                     <p className="category">Notícia: {post.categories[0].name}</p>
//                                 )}
//                                 <h3 className="title post">{post.title}</h3>
//                                 <p className="title post">{formattedDate(post.createdAt)}</p>
//                                 <div className={styles.image}>
//                                     {post.videoUrls && post.videoUrls.length > 0 && (
//                                         <span className={styles.image}>
//                                             {post.videoUrls.map((url, index) => (
//                                                 <video key={index} controls>
//                                                     <source src={url} type="video/mp4" />
//                                                 </video> 
//                                             ))}
//                                         </span>
//                                     )}
//                                     {post.photoUrls && post.photoUrls.length > 0 && (
//                                         <div className={styles.image}>
//                                             {post.photoUrls.map((url, index) => (
//                                                 <img key={index} src={url} alt={`Imagem ${index}`} />
//                                             ))}
//                                         </div>
//                                     )}
//                                     </div>
//                                 <p className="paragraph text">{post.content}</p>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </section>
//     );
// };

