import { Link } from "react-router-dom";
import { MdFacebook, MdSearch } from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";
import { NavBarSection } from "../NavBarSection";
import Logo from "../../assets/imgs/Logo Jornal da Bahia.png";
import styles from "./style.module.scss";
import { PostContext } from "../../providers/PostContext";
import { useContext } from "react";

export const Header = () => {

    const { setFilteredPost, postList, filteredPost, value, setValue } = useContext(PostContext);

    const submit = (e) => {
        e.preventDefault();
        setFilteredPost(value);
        setValue("");
    }

    return (
        <header>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                        <img src={Logo} alt="Logo do jornal"/>
                    </Link>
                    <span>
                        <Link 
                            to=""
                            target="_blank"
                            rel="noopener noreferrer">
                            <FaInstagram size={25}/>
                        </Link>
                        <Link 
                            to=""
                            target="_blank" 
                            rel="noopener noreferrer">
                                <FaSquareXTwitter size={25}/>
                        </Link>
                        <Link 
                            to=""
                            target="_blank" 
                            rel="noopener noreferrer">
                                <MdFacebook size={25}/>
                        </Link>
                        <Link 
                            to=""
                            target="_blank" 
                            rel="noopener noreferrer">
                                <FaWhatsapp size={25}/>
                        </Link>
                        <form onSubmit={submit}>
                            <input 
                                type="text"
                                placeholder="Digitar Pesquisa"
                                onChange={(e) => setValue(e.target.value)}
                                required
                            />
                            <button className="" type="submit">
                                <MdSearch size={25} />
                            </button>
                        </form>
                    </span>
                </div>
                <NavBarSection/>
            </div>
        </header>
    );
};







