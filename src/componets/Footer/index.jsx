import { Link } from "react-router-dom";
import { MdSearch, MdFacebook } from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";
import Logo from "../../assets/logo-jornalBa.png";
import styles from "./style.module.scss";

export const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                            <img src={Logo} alt="Logo do jornal" width="200" />
                    </Link>
                    {/* <Link><FaInstagram/></Link>
                    <Link><FaSquareXTwitter/></Link>
                    <Link><MdFacebook/></Link>
                    <Link><FaWhatsapp/></Link> */}
                    {/* <form>
                        <input 
                            type="text"
                            placeholder="Digitar Pesquisa"
                        />
                    </form>
                    <button type="submit">
                        <MdSearch size={25} />
                    </button> */}
                </div>
            </div>
        </footer>
    );
};