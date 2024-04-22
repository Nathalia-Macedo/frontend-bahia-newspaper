import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/Logo Jornal da Bahia2.png";
import styles from "./style.module.scss";
import { MdFacebook} from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";
import { NavBarSection } from "../NavBarSection";

export const Footer = () => {
    return(
        <footer>
            <div className="container">
                    <NavBarSection/>
                <div className={styles.flexBox}>
                    <span>
                        <Link to="/">
                            <img src={Logo} 
                                alt="Logo do jornal" 
                                width="300" />
                        </Link>
                        <div>
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
                        </div>
                    </span>
                </div>
            </div>
        </footer>
    );
};
