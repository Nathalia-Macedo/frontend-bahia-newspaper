import { Link } from "react-router-dom";
import { MdFacebook } from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";
import { SearchForm } from "../SearchForm";
import { NavBarSection } from "../NavBarSection";
import Logo from "../../assets/Logo.jpeg";
import styles from "./style.module.scss"

export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                        <img src={Logo} alt="Logo do jornal" width="200" />
                    </Link>
                    <div>
                        <Link to=""target="_blank" rel="noopener noreferrer"><FaInstagram/></Link>
                        <Link to=""target="_blank" rel="noopener noreferrer"><FaSquareXTwitter/></Link>
                        <Link to=""target="_blank" rel="noopener noreferrer"><MdFacebook/></Link>
                        <Link to=""target="_blank" rel="noopener noreferrer"><FaWhatsapp/></Link>
                    </div>
                    <div>
                        <SearchForm/>
                    </div>

                </div>
                <NavBarSection/>
            </div>
        </header>
    );
};







