import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/Logo.png";
import styles from "./style.module.scss";
import { MdFacebook} from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { NavBarSection } from "../NavBarSection";

export const Footer = () => {
    return(
        <footer>
            <div className="container">
                    <NavBarSection/>
                <div className={styles.flexBox}>
                    <section>
                        <Link to="/">
                            <img src={Logo} 
                                alt="Logo do jornal" 
                            />
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
                        </span>
                        <strong >
                            <h3 className="title two">Equipe:</h3>
                            <Link
                                className="title two" 
                                to="/equipe" 
                                >Ver equipe completa
                            </Link>
                        </strong>
                    </section>
                </div>
            </div>
        </footer>
    );
};
