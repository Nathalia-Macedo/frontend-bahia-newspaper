import { Link} from "react-router-dom"


export const PostCard = ({post}) => {
    
    return(
            <li>
                <h3 className="title one">{post.title}</h3>
                <h3 className="paragraph">{post.content}</h3>
            </li>
    );
};